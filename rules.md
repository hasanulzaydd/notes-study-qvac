# QVAC Bounty Rules ($17, "Build a local AI app with Tether's QVAC SDK")

Source: bounty listing pasted by user on 2026-09-23. Keep this file as the single
source of truth for what "done" means — check every item before submitting.

## Goal
Build a small app that uses QVAC to run AI **directly on the device** (no API,
no cloud inference, no server calls). QVAC is Tether's open-source local AI SDK
(`npm install @qvac/sdk` or `pip install tetherto-qvac-sdk`). The model downloads
locally the first time the app runs.

Idea we're building: **a study tool that quizzes the user from their own notes.**

## Hard technical requirements
- [ ] `@qvac/sdk` is a **declared dependency** in `package.json` (or
      `tetherto-qvac-sdk` in Python requirements), version **>= 0.19.0**.
- [ ] Code calls `loadModel`, **plus at least one** of:
      `completion`, `embed`, `transcribe`, `textToSpeech`, `translate`,
      `diffusion`, `ocr`, `classify`, `upscale`, `finetune`,
      `ragIngest` / `ragSearch`, `video`, `vla`.
      (Our app uses `loadModel` + `completion` to generate/grade quiz
      questions from notes.)
- [ ] **All inference runs on-device.** If any cloud AI service does the work,
      the submission is rejected. No OpenAI/Anthropic/etc. API calls anywhere
      in the app.
- [ ] The reviewers verify the SDK functions we call actually exist in the SDK
      — don't invent method names, use only what's documented.

## Repo requirements
- [ ] Public GitHub repo.
- [ ] Open-source license file (e.g. MIT).
- [ ] README with: install steps, run steps, and the exact QVAC SDK version used.
- [ ] **At least 3 commits, authored by the user** (not squashed into one,
      not authored by someone else).
- [ ] Code must be **original** — not a fork or near-copy of
      `tetherto/qvac-examples`, and not a duplicate of another submitter's app.

## Submission checklist
- [ ] URL of the public GitHub repo.
- [ ] URL of an X post that **links the repo** and **tags @qvac**.
- [ ] A screenshot or short screen recording of the app running with the
      AI output visible on screen.
- [ ] 1–2 lines: what the app does and which QVAC function(s) it calls.
- [ ] Optional 1 line: why you built it.
- [ ] Screenshots/recordings attached to the submission.
- [ ] Optional, no effect on payout: star https://github.com/tetherto/qvac.

## Reference links
- Quickstart: https://docs.qvac.tether.io/sdk/getting-started/quickstart/
- Examples repo (read for patterns, do NOT copy): https://github.com/tetherto/qvac-examples
- Source: https://github.com/tetherto/qvac
- npm package: https://www.npmjs.com/package/@qvac/sdk
- All docs in one file (good for pasting into an AI agent): https://docs.qvac.tether.io/llms-full.txt

## Non-negotiables (keep it simple)
- One QVAC function beyond `loadModel` is enough — do not add extra SDK calls
  "for completeness."
- No API keys, no `.env` cloud secrets, no network calls to an LLM provider.
- Do not copy code from qvac-examples — read it for the pattern, write our own.
