# Vassago Live Test

An isolated, static design prototype for the next Vassago search experience.

## What this is

- A GitHub Pages-compatible frontend
- A responsive search and AI-answer interface
- Interactive filters, suggestions, theme switching, and topic cards
- Mock content only—no production APIs, credentials, user data, or existing Vassago services

## Run locally

Serve the directory with any static server, for example:

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Deployment

The repository is designed to publish directly from the `main` branch with GitHub Pages.

## Architecture direction

GitHub Pages hosts the static frontend. A future backend should be deployed separately and provide search, grounded AI synthesis, accounts, and protected integrations over a versioned API.
