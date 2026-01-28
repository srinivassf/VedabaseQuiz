# Vedabase Quiz (JS-only)

This is a JavaScript-only Next.js (App Router) project for hosting self-study quizzes.

## Deploy on Vercel (recommended)

1. Create a new GitHub repository (e.g., `VedabaseQuiz`).
2. Upload **all files/folders in this project** to the repo root (so `package.json` is in the root).
3. In Vercel: **Add New Project** -> Import your GitHub repo -> **Deploy**.

### Important Vercel settings
- **Framework preset**: Next.js (auto-detected)
- **Root Directory**: leave blank (repo root)

## Run locally (optional)

```bash
npm install
npm run dev
```

## Where quizzes live

Quiz JSON files are in:
- `data/quizzes/bg/...`
- `data/quizzes/sb/...`

Each quiz page is served at:
- `/quiz/<slug>/`

- Deployment trigger


