# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # dev server (http://localhost:4321)
npm run build      # production build
npm run preview    # preview production build
npm run lint       # prettier check + eslint
npm run format     # auto-format with prettier
```

No test suite is configured.

## Architecture

Astro 6 SSR site (French, `fr-FR`) using the Node standalone adapter. Tailwind CSS v4 is loaded via `@tailwindcss/vite` — there is no `tailwind.config.*` file; configuration lives in CSS.

**Path alias:** `@/` maps to `src/`.

### Design tokens & styling

All design tokens are CSS custom properties defined in `src/styles/tokens/*.css` (colors, spacing, radius, typography) and imported via `src/styles/tokens/index.css`. `src/styles/global.css` imports Tailwind and exposes the tokens to Tailwind through an `@theme inline` block, so Tailwind utilities like `bg-primary` or `p-spacing-100` map to the CSS vars. Add new tokens in the appropriate token file, then mirror them in the `@theme inline` block in `global.css` if Tailwind access is needed.

Typography uses two Google Fonts loaded via `astro:assets` `<Font />` component (not a `<link>`):

- `--font-family-body` → Montserrat (`--font-montserrat`)
- `--font-family-title` → Philosopher (`--font-philosopher`)

### Layout

`src/layout/Layout.astro` is the base shell for all pages. It injects fonts, global CSS, canonical URL, OG tags, and wraps content with `<LayoutHeader>` and `<LayoutFooter>` (both use `transition:persist`).

`LayoutHeader` accepts a `variant` prop (`'default' | 'transparent'`). The transparent variant is used on hero/full-screen pages (e.g. `index.astro`) where the header overlays a background image. The header uses CSS scroll-driven animation (`animation-timeline: scroll(root)`) to collapse padding and add shadow as the user scrolls.

### Site content

Business contact details and the app name live in `src/config/contact.ts` — update there to propagate everywhere.

### Deployment

Docker build outputs a Node standalone server running on port 80 (`HOST=0.0.0.0`, `PORT=80`). The built entry point is `dist/server/entry.mjs`.
