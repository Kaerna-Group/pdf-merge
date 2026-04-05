# PDF Merge Studio

Browser-only PDF merger built with React, Vite, TypeScript, Tailwind CSS, and `pdf-lib`.

## Features

- Upload multiple PDF files
- Add files by drag-and-drop
- Sort new uploads alphabetically by default
- Reorder files with drag-and-drop sorting
- Remove files from the queue
- Merge PDFs entirely in the browser
- Download the final `merged.pdf`
- Popup settings modal with `light`, `dark`, and `system` theme profiles
- Theme preference persisted in `localStorage`
- Ready for Vercel, Netlify, and GitHub Pages

## Project Structure

```text
pdf-merge/
+- .github/
¦  L- workflows/
¦     L- deploy-pages.yml
+- public/
+- src/
¦  +- components/
¦  ¦  +- ActionBar.tsx
¦  ¦  +- AppBackground.tsx
¦  ¦  +- ErrorBanner.tsx
¦  ¦  +- FileDropzone.tsx
¦  ¦  +- FileList.tsx
¦  ¦  +- FileListItem.tsx
¦  ¦  +- HeroSection.tsx
¦  ¦  +- ProgressBar.tsx
¦  ¦  +- SettingsButton.tsx
¦  ¦  +- SettingsModal.tsx
¦  ¦  L- ThemeToggle.tsx
¦  +- hooks/
¦  ¦  +- usePdfMerge.ts
¦  ¦  L- useTheme.ts
¦  +- services/
¦  ¦  L- mergePdfs.ts
¦  +- types/
¦  ¦  +- pdf.ts
¦  ¦  L- theme.ts
¦  +- utils/
¦  ¦  +- file.ts
¦  ¦  L- format.ts
¦  +- App.tsx
¦  +- main.tsx
¦  L- styles.css
+- .gitignore
+- index.html
+- netlify.toml
+- package.json
+- README.md
+- tsconfig.app.json
+- tsconfig.json
+- tsconfig.node.json
+- vercel.json
L- vite.config.ts
```

## Run Locally

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## Deployment

### GitHub Pages

Automatic deployment is included in `.github/workflows/deploy-pages.yml`.

1. Push the repository to GitHub.
2. Open `Settings -> Pages`.
3. Set `Source` to `GitHub Actions`.
4. Push to `main` or `master`.

The workflow configures the correct base path for Pages, builds the app, and deploys `dist/` automatically.

## Architecture Overview

- `App.tsx` composes the page from high-level components only.
- `hooks/usePdfMerge.ts` owns queue state, merge actions, progress, errors, and download URL lifecycle.
- `hooks/useTheme.ts` owns theme preference persistence and DOM theme synchronization.
- `components/SettingsModal.tsx` provides the popup settings surface for choosing a theme profile.
- `services/mergePdfs.ts` encapsulates the PDF merging workflow with `pdf-lib`.
