# Plan: Notes Study Quiz (QVAC bounty app)

App: a CLI study tool that quizzes the user from their own notes, using
Tether's QVAC SDK to run the model on-device (Node.js, `@qvac/sdk`).
See [rules.md](rules.md) for the full bounty requirements checklist.

QVAC calls used: `loadModel` + `completion` (generate quiz questions from
notes, then grade the user's typed answers).

## Step 1 — Scaffold the repo
- `git init`
- `package.json` with `@qvac/sdk` (>= 0.19.0) as a declared dependency
- `LICENSE` (MIT)
- `.gitignore` (node_modules, downloaded model cache)
- `README.md` stub
- `notes.txt` — sample notes file to quiz from
- Commit 1: "Scaffold repo"

## Step 2 — Build the app
`index.js` CLI:
- Read notes from a local `.txt`/`.md` file (path via CLI arg, default `notes.txt`)
- `loadModel` to load a local model
- `completion` call: generate N quiz questions + answers from the notes text
- Interactive loop: print each question, read the user's typed answer from stdin
- `completion` call: grade the typed answer against the stored answer
- Print a final score
- Commit 2: "Implement quiz generation and grading with QVAC"

## Step 3 — Verify and document
- Run the app end-to-end locally, confirm on-device inference (model download
  + quiz output visible in terminal)
- Take a screenshot or short screen recording of it running
- Fill in `README.md`: install steps, run steps, exact SDK version used
- Commit 3 (+ fixups if needed): "Add README and verify run"

## Step 4 — Publish and submit
- Push to a public GitHub repo
- Confirm: public, license present, README complete, >= 3 commits authored by me,
  code is original (not copied from qvac-examples)
- Post on X: link the repo, tag @qvac
- Submit: repo URL, X post URL, screenshot/recording, 1-2 line description of
  what the app does and which QVAC functions it calls, optional "why I built it" line
