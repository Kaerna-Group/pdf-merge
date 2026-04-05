# PDF Merge Studio

Browser-only PDF merger built with React, Vite, TypeScript, and `pdf-lib`.

## Features

- Upload multiple PDF files
- Add files by drag-and-drop
- Reorder files with drag-and-drop sorting
- Remove files from the queue
- Merge PDFs entirely in the browser
- Download the final `merged.pdf`
- Progress indicator and friendly error handling
- Ready for Vercel, Netlify, and GitHub Pages

## Project Structure

```text
pdf-merge/
├─ public/
├─ src/
│  ├─ components/
│  │  ├─ ActionBar.tsx
│  │  ├─ ErrorBanner.tsx
│  │  ├─ FileDropzone.tsx
│  │  ├─ FileList.tsx
│  │  ├─ FileListItem.tsx
│  │  └─ ProgressBar.tsx
│  ├─ services/
│  │  └─ mergePdfs.ts
│  ├─ types/
│  │  └─ pdf.ts
│  ├─ utils/
│  │  ├─ file.ts
│  │  └─ format.ts
│  ├─ App.tsx
│  ├─ main.tsx
│  └─ styles.css
├─ .gitignore
├─ index.html
├─ netlify.toml
├─ package.json
├─ README.md
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
├─ vercel.json
└─ vite.config.ts
```

## Run Locally

```bash
npm install
npm run dev
```

The dev server will print a local URL, usually `http://localhost:5173`.

## Production Build

```bash
npm run build
npm run preview
```

The production-ready static files will be generated in `dist/`.

## Deployment

### Vercel

1. Import the repository into Vercel.
2. Keep the framework preset as `Vite`.
3. Use:
   - Build command: `npm run build`
   - Output directory: `dist`

### Netlify

1. Import the repository into Netlify.
2. Use:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. The included `netlify.toml` is already configured for SPA routing.

### GitHub Pages

For project-page deployment under a repository path, build with a base path:

```bash
$env:VITE_BASE_PATH="/pdf-merge/"
npm run build
```

Then publish the contents of `dist/` to GitHub Pages. If you use GitHub Actions or a Pages deploy action, set the same `VITE_BASE_PATH` environment variable in the build step.

## Architecture Overview

- `App.tsx` orchestrates state, user actions, progress, and the download URL lifecycle.
- `components/` contains focused UI building blocks for upload, sorting, actions, progress, and errors.
- `services/mergePdfs.ts` encapsulates the PDF merging workflow with `pdf-lib`.
- `utils/` contains file validation and formatting helpers.
- `types/` stores shared application types for clean component contracts.

## Notes

- All PDF processing happens locally in the browser.
- No files are uploaded to any server.
- The generated file name is fixed to `merged.pdf`.
