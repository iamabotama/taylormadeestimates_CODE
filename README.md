# Taylor Made Estimates — Source Code

Professional Xactimate estimating services website for Taylor Made Estimates.

**Live site:** [www.taylormadeestimates.com](https://www.taylormadeestimates.com)

---

## Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 7 |
| Styling | Tailwind CSS 4 + shadcn/ui |
| Fonts | Outfit (headings/body) + JetBrains Mono (accents) |
| Language | TypeScript |
| Package manager | pnpm |

---

## CI/CD Pipeline

Every push to `main` automatically:

1. Installs dependencies (`pnpm install`)
2. Builds the Vite app (`pnpm run build`)
3. Pushes the built `dist/public/` folder to the [`taylormadeestimates.com`](https://github.com/iamabotama/taylormadeestimates.com) repo
4. GitHub Pages serves the result at `www.taylormadeestimates.com`

### Required GitHub Secret

Before the pipeline works, add one secret to this repo:

| Secret name | Value |
|---|---|
| `DEPLOY_TOKEN` | A GitHub Personal Access Token (classic) with `repo` scope |

**To create the token:**
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click **Generate new token (classic)**
3. Give it a name (e.g. `tme-deploy`), set expiration as desired
4. Check the **`repo`** scope (full control of private repositories)
5. Click **Generate token** and copy it
6. Go to this repo → Settings → Secrets and variables → Actions → **New repository secret**
7. Name: `DEPLOY_TOKEN`, Value: paste the token

---

## Local Development

```bash
pnpm install
pnpm dev
```

The dev server starts at `http://localhost:3000`.

---

## Project Structure

```
client/
  public/       ← favicon, robots.txt
  src/
    pages/      ← Page components (Home.tsx)
    components/ ← Reusable UI components
      sections/ ← Page sections (Hero, Services, About, etc.)
    contexts/   ← React contexts
    hooks/      ← Custom hooks
    lib/        ← Utilities
    App.tsx     ← Routes
    index.css   ← Global styles + design tokens
server/         ← Placeholder (static site, not used)
shared/         ← Shared constants
```

---

## Key Design Decisions

- **Blueprint watermark animation** — SVG canvas behind the hero section, 40% opacity, 15 simultaneous elements, pre-populated on load
- **Inline SVG logos** — both standard and inverted versions are inlined in components to avoid CSS class scoping issues with external SVG files
- **No backend dependency** — this is a pure static site; if a backend is ever added, that decision should be made explicitly
