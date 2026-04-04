# Aurora Site

Marketing and distribution site for the **Aurora** browser extensions: prompt automation helpers for **Meta AI** and **Midjourney**. Visitors can read documentation, compare extensions, and download packaged `.zip` builds ready to load in Chrome (Developer mode).

---

## What this project is

This repository folder hosts a **single-page React application** that:

- Presents the Aurora product (home, documentation, download).
- Serves **official extension packages** as static files under `/extension/*.zip`.
- Runs an automated **build pipeline** that copies the source extensions from sibling folders (`Aurora Meta`, `Aurora MidJourney`), **obfuscates** all JavaScript, and produces the zip archives consumed by the download page.

The extensions themselves are **not** implemented here; they live in parallel directories at the workspace root. This site is the **distribution and documentation** layer.

---

## Architecture (high level)

```
Aurora Site/
├── client/                    # Main Vite + React app
│   ├── public/
│   │   └── extension/         # Generated: aurora-meta.zip, aurora-midjourney.zip
│   ├── scripts/
│   │   └── build-extensions.mjs
│   ├── src/
│   │   ├── App.jsx
│   │   ├── routes/
│   │   ├── pages/
│   │   ├── sections/          # e.g. home, documention, donwload (Hero blocks)
│   │   └── components/
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

**Runtime flow**

1. User opens the site (static or dev server).
2. **Download** page offers two cards (Meta vs Midjourney). On **large viewports** (Tailwind `lg` and up, ≥1024px), “Baixar .zip” triggers a file download from `/extension/<name>.zip`. On smaller screens, the UI blocks the download and asks the user to use a desktop browser (extensions are installed from desktop Chrome).

**Build flow**

1. `npm run build:extensions` (or full `npm run build`) runs `scripts/build-extensions.mjs`.
2. The script reads `../../Aurora Meta` and `../../Aurora MidJourney`, copies to a temp directory, obfuscates every `.js` file with `javascript-obfuscator`, then zips each tree as `aurora-meta.zip` / `aurora-midjourney.zip` into `client/public/extension/`.
3. Vite copies `public/` as-is into `dist/`, so production deploys include the zips at `dist/extension/*.zip`.

---

## Tech stack

| Layer | Choice |
|--------|--------|
| UI | **React 19** |
| Bundler / dev server | **Vite 8** |
| Styling | **Tailwind CSS 4** (`@tailwindcss/vite`) |
| Routing | **React Router 7** |
| Icons | **lucide-react** |
| Extension packaging | **Node** script + **archiver** (zip) + **javascript-obfuscator** |
| Linting | **ESLint 9** (flat config) |

No backend is required for the public site: everything can be hosted as static files (e.g. GitHub Pages, Netlify, S3 + CloudFront).

---

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start Vite dev server (ensure `public/extension/*.zip` exist—run `build:extensions` once if downloads 404). |
| `npm run build:extensions` | Regenerate obfuscated zips from `Aurora Meta` / `Aurora MidJourney`. |
| `npm run build` | `build:extensions` then `vite build` → output in `client/dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | ESLint. |

---

## Requirements

- **Node.js** (LTS recommended) and npm.
- Sibling folders at the Aurora workspace root: **`Aurora Meta`** and **`Aurora MidJourney`** (paths are hard-coded in `build-extensions.mjs` relative to `client/scripts`).

---

## Local development

```bash
cd client
npm install
npm run build:extensions   # creates public/extension/*.zip
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`). Visit the download route and test large-window behavior for zip downloads.

---

## Deployment notes

- Ship the contents of **`client/dist/`** after `npm run build`.
- Ensure **`extension/aurora-meta.zip`** and **`extension/aurora-midjourney.zip`** are present in `dist` (they are produced automatically by the build script).
- If the site uses a non-root `base` path, set `base` in `vite.config.js`; the download page uses `import.meta.env.BASE_URL` when linking to zips.

---

## Relationship to other Aurora folders

| Folder | Role |
|--------|------|
| **Aurora Meta** | Chrome extension: Meta AI prompt queue + automatic image downloads. |
| **Aurora MidJourney** | Chrome extension: Midjourney prompt queue only (no bundled download automation). |
| **Aurora Site** (this) | Web presence + obfuscated zip distribution + docs UX. |

---

## License / branding

Product and site content belong to the project owner. Extension source licenses (if any) should be stated in each extension’s own README.
