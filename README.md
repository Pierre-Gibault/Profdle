# Profdle

Guess the right professors !

Built with **Next.js** and **TypeScript**.

## Features

- Search and guess a professor by name
- Dropdown suggestions while typing
- Comparison row with color feedback (green/yellow/red)

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS

## Project Structure

- `app/page.tsx` – main game page
- `app/component/GuessCard.tsx` – row rendering and comparison logic
- `public/professors.json` – professors dataset
- `.github/workflows/deploy-pages.yml` – CI/CD to GitHub Pages

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Install

```bash
npm install
```

### Run in development

```bash
npm run dev
```

Open `http://localhost:3000`.

### Build

```bash
npm run build
```

## Data Format

`public/professors.json` expects entries like:

```json
{
  "picturePath": "/images/professors/prof.jpg",
  "name": "Dr. Alice Johnson",
  "subject": ["Mathematics", "Calculus"],
  "isUTBM": true,
  "rating": 4,
  "difficulty": 3,
  "semesters": [1, 2, 3]
}
```

## Deployment (GitHub Pages)

This repo includes `.github/workflows/deploy-pages.yml` to build and deploy automatically on push to `main`.

### Required setup

1. Go to **Settings → Pages**
2. Set **Source** to **GitHub Actions**
3. Push to `main`

The workflow builds the static export (`out/`) and publishes it.

## Notes

- For static export with `next/image`, set `images.unoptimized = true` in `next.config.ts`.
- If deploying to a repo path (not root domain), configure `basePath` and `assetPrefix`.

## License

Add your preferred license here.