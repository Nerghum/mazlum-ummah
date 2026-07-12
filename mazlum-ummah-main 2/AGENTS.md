# Mazlum Ummah — Agent Guide

## Commands

| Action       | Command                                                                                 |
| ------------ | --------------------------------------------------------------------------------------- |
| Dev server   | `pnpm dev` (uses `--turbo`)                                                             |
| Build        | `pnpm build` (uses `--turbo`)                                                           |
| Lint         | `pnpm lint` (ESLint with next/core-web-vitals + TS)                                     |
| Format       | `pnpm format` (Prettier — semicolons, double quotes, trailingComma es5, printWidth 100) |
| Format check | `pnpm format:check`                                                                     |

No test framework configured.

## Tech Stack

- **Next.js 16.2.6** (App Router), **pnpm 11.5.0**, **React 19.2.4**
- **Tailwind CSS v4** via `@tailwindcss/postcss` — no config file needed, uses CSS-first config
- **shadcn/ui** (radix-nova style) — comps in `components/ui/`, alias `@/`
- **Icons**: lucide-react

## Architecture

### Routing (`app/(root)/`)

- `/` — Home page composing BreakingNews, NewsSection, CrisisStats, etc.
- `/news/[slug]` — Category pages (sudan, gaza, middle-east, africa)
- `/news/[slug]/[details]` — Individual article pages
- `/news` redirects to `/news/sudan`
- Other routes: `/blogs`, `/blogs/[slug]`, `/gallery`, `/contact`, `/notice`, `/media-achievements`, `/get-involved`, `/privacy-policy`, `/terms-and-conditions`

### i18n (custom, no library)

- **`messages/{bn,en}.json`** — translation files. `bn` is default.
- **`LocaleProvider`** wraps layout, sets `NEXT_LOCALE` cookie
- **`useTranslations()`** hook returns `t("key")` function. Supports dot-notation and `{param}` interpolation.
- **`useLocale()`** hook returns `{ locale, setLocale }`
- Both hooks require `LocaleProvider` context (provided in root layout)

### Styling Patterns

- **Per-component CSS**: each component folder has `style.css` imported via `import "./style.css"` — no CSS modules, global class names
- **CSS modules** used only in `styles/` folder (wrapper.module.css, hero.module.css, etc.)
- **Tailwind**: available via `app/globals.css`, not widely used yet
- **`cn()`** utility from `@/lib/utils` (clsx + tailwind-merge)
- **Shadows palette**: CSS vars `--customShadows-*`, `--shadows-*`
- **Color palette**: CSS vars `--palette-*` (MUI-like theme)

### Component Patterns

- Co-located CSS: `ComponentName/style.css` alongside `ComponentName/index.tsx`
- Class naming: BEM-like (`section-header__title`) or kebab-case (`breaking-news-label`)
- No generic CSS resets in components — globals.css has `* { margin: 0; padding: 0; font-family: UbuntuSans, Bornomala, sans-serif; }`
- Headings (`h1`–`h6`) reset to `font-size: inherit; font-weight: inherit`

### Data & Content

- **`data/gallery-data.ts`** — gallery items array
- **`messages/*.json`** — all copy text (headlines, descriptions, dates, nav labels)
- **`resources/`** is gitignored (raw HTML backups)

### Fonts

- Two local woff2 fonts from `lib/fonts/`:
  - **UbuntuSans** (`--font-ubuntu`) — Latin text
  - **Bornomala** (`--font-bornomala`) — Bengali text, has Regular (400) + Bold (700)
- Defined as CSS `@font-face` in `app/globals.css` AND as next/font/local in `lib/fonts.ts` (both needed)

### Config & Tooling

- `tsconfig.json`: strict mode, `@/*` → root, `bundler` moduleResolution
- `components.json`: shadcn config
- `next.config.ts`: only custom image `remotePatterns`
- `pnpm-workspace.yaml`: allows `msw`, `sharp`, `unrs-resolver` builds
- `.prettierrc`: semicolons, double quotes, tabWidth 2, trailingComma es5, printWidth 100
- ESLint: flat config (`eslint.config.mjs`), next/core-web-vitals + typescript

### Image Loading

All external image hosts must be listed in `next.config.ts` `remotePatterns`. Currently allowed: images.unsplash.com, picsum.photos, img.youtube.com, ichef.bbci.co.uk, ps.w.org, encrypted-tbn0.gstatic.com.

Add new hosts there to avoid Next.js image errors.

### Section Title Font Sizes

On the home page, section heading fonts should be consistent:
| Title | Mobile | Desktop (1024px+) |
|---|---|---|
| Breaking News | 1.5rem | 3rem |
| SectionHeader (Today's News, Sudan, Gaza, Middle East) | 1.5rem | 3rem |
| Crisis heading | 1.5rem | 3rem |
