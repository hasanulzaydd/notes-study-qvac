import { readFileSync } from 'node:fs';
import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import {
  loadModel,
  completion,
  unloadModel,
  LLAMA_3_2_1B_INST_Q4_0,
} from '@qvac/sdk';

const NUM_QUESTIONS = 4;

async function ask(modelId, history, { silent = false } = {}) {
  const result = completion({ modelId, history, stream: true });
  let text = '';
  for await (const token of result.tokenStream) {
    if (!silent) process.stdout.write(token);
    text += token;
  }
  if (!silent) process.stdout.write('\n');
  return text;
}

function parseQuestions(raw) {
  // Expect lines like "Q: ...\nA: ..." repeated; fall back gracefully.
  const pairs = [];
  const lines = raw.split('\n').map((l) => l.trim()).filter(Boolean);
  let currentQ = null;
  for (const line of lines) {
    const qMatch = line.match(/^Q\d*[:.)]\s*(.+)/i);
    const aMatch = line.match(/^A\d*[:.)]\s*(.+)/i);
    if (qMatch) {
      currentQ = qMatch[1];
    } else if (aMatch && currentQ) {
      pairs.push({ question: currentQ, answer: aMatch[1] });
      currentQ = null;
    }
  }
  return pairs;
}

async function main() {
  const notesPath = process.argv[2] || 'notes.txt';
  const notes = readFileSync(notesPath, 'utf-8');

  console.log(`Loading local model (first run downloads it)...`);
  const modelId = await loadModel({
    modelSrc: LLAMA_3_2_1B_INST_Q4_0,
    onProgress: (p) => {
      if (p.percentage != null) {
        process.stdout.write(`\rDownloading model: ${p.percentage.toFixed(0)}%   `);
      }
    },
  });
  console.log('\nModel loaded.\n');

  console.log('Generating quiz questions from your notes...');
  const genPrompt = [
    {
      role: 'user',
      content:
        `Read these notes and write exactly ${NUM_QUESTIONS} short quiz questions ` +
        `with their correct answers, based only on the notes below. ` +
        `Format strictly as repeating lines:\nQ: <question>\nA: <answer>\n\n` +
        `Notes:\n${notes}`,
    },
  ];
  // Generated silently so the answers aren't spoiled before you're asked.
  const rawQuiz = await ask(modelId, genPrompt, { silent: true });
  const questions = parseQuestions(rawQuiz);
  console.log(`Ready: ${questions.length} questions.\n`);

  if (questions.length === 0) {
    console.log('Could not parse any questions from the model output. Exiting.');
    await unloadModel({ modelId });
    return;
  }

  const rl = createInterface({ input: stdin, output: stdout });
  let score = 0;

  for (const [i, { question, answer }] of questions.entries()) {
    console.log(`\nQuestion ${i + 1}: ${question}`);
    let userAnswer;
    try {
      userAnswer = await rl.question('Your answer: ');
    } catch {
      console.log('\nInput ended early, stopping quiz here.');
      break;
    }

    console.log('Grading...');
    const gradePrompt = [
      {
        role: 'user',
        content:
          `Question: ${question}\n` +
          `Correct answer: ${answer}\n` +
          `Student answer: ${userAnswer}\n\n` +
          `Reply with exactly one line: "CORRECT" if the student answer is ` +
          `substantially right, or "INCORRECT - <brief correction>" otherwise.`,
      },
    ];
    const verdict = await ask(modelId, gradePrompt);
    if (verdict.toUpperCase().includes('CORRECT') && !verdict.toUpperCase().includes('INCORRECT')) {
      score += 1;
    }
  }

  rl.close();
  console.log(`\nFinal score: ${score} / ${questions.length}`);

  await unloadModel({ modelId });
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
