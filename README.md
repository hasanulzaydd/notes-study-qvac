# notes-study-qvac

A CLI study tool that quizzes you from your own notes, running entirely
on-device with Tether's [QVAC SDK](https://github.com/tetherto/qvac) —
no API keys, no cloud calls, no usage bill.

It reads a notes file you give it, asks a local LLM to turn the notes into
quiz questions, then asks you those questions one by one in the terminal
and uses the same local model to grade your answers.

## What it does / QVAC functions used

Loads a local model with `loadModel`, then uses `completion` twice per
session: once to generate quiz questions from your notes, and once per
question to grade your typed answer.

## Requirements

- Node.js >= 22.17, npm >= 10.9
- `@qvac/sdk` version `0.20.0` (declared in `package.json`, requires >= 0.19.0)
- ~1 GB free disk space for the model (downloaded automatically on first run)

## Install

```bash
git clone https://github.com/hasanulzaydd/notes-study-qvac.git
cd notes-study-qvac
npm install
```

## Run

```bash
npm start
```

or point it at your own notes file:

```bash
node index.js my-notes.txt
```

On the first run, QVAC downloads the local model (Llama 3.2 1B Instruct,
~770 MB) into `~/.qvac`. After that it loads from disk, so later runs start
instantly. The app then prints generated quiz questions one at a time,
waits for your typed answer, and grades it — all inference happens on your
own machine.

### Optional: put the model cache on a different drive

If your system drive is low on space, QVAC's cache directory can be
redirected by setting `SNAP_USER_COMMON` to a folder on another drive before
running the app, e.g. (Windows PowerShell):

```powershell
$env:SNAP_USER_COMMON = "D:\qvac-home"
npm start
```

This is optional and only affects where the model file is stored locally.

## License

MIT — see [LICENSE](LICENSE).
