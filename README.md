# Vassago Live Test

An isolated Next.js preview for the next Vassago search experience.

## What this is

- A statically exported Next.js App Router frontend
- React, TypeScript, and Tailwind CSS
- A responsive search and AI-answer interface
- Interactive filters, suggestions, theme switching, follow-ups, feedback, and topic cards
- Mock content only—no production APIs, credentials, user data, or existing Vassago services

## Run locally

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

Validation commands:

```bash
npm run lint
npm run typecheck
npm run build
```

## Deployment

Pushes to `main` run the Pages workflow in `.github/workflows/deploy-pages.yml`. It validates the project, creates the static export in `out/`, and deploys that artifact to GitHub Pages.

## Architecture direction

GitHub Pages hosts the static frontend. Search and answer content is clearly marked as curated preview data. A future isolated backend should provide SearXNG search and grounded AI synthesis over a versioned API; production services remain out of scope.
