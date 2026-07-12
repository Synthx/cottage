# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # dev server (http://localhost:4321)
npm run build      # production build
npm run preview    # preview production build
npm run lint       # prettier check + eslint + astro check (type check)
npm run format     # auto-format with prettier
```

No test suite is configured. Requires Node >= 24.

The Astro docs MCP server is wired up in `.mcp.json` (`astro` → `https://mcp.docs.astro.build/mcp`) — use it to look up Astro APIs.

## Architecture

Astro 7 SSR site (French, `fr-FR`) using the Node standalone adapter. Tailwind CSS v4 is loaded via `@tailwindcss/vite` — there is no `tailwind.config.*` file; configuration lives in CSS. SVGs are optimized at build time via the experimental `svgOptimizer` (`astro.config.mjs`).

**Path alias:** `@/` maps to `src/`. Note local imports include the file extension (e.g. `@/config/contact.ts`).

### Design tokens & styling

All design tokens are CSS custom properties defined in `src/styles/tokens/*.css` (colors, spacing, radius, typography) and imported via `src/styles/tokens/index.css`. `src/styles/global.css` imports Tailwind and exposes the tokens to Tailwind through an `@theme inline` block, so Tailwind utilities like `bg-primary` or `p-spacing-100` map to the CSS vars. Add new tokens in the appropriate token file, then mirror them in the `@theme inline` block in `global.css` if Tailwind access is needed.

Typography uses two Google Fonts loaded via `astro:assets` `<Font />` component (not a `<link>`):

- `--font-family-body` → Montserrat (`--font-montserrat`)
- `--font-family-title` → Philosopher (`--font-philosopher`)

### Layout

`src/layout/Layout.astro` is the base shell for all pages. It injects fonts, global CSS, canonical URL, OG tags, and wraps content with `<LayoutHeader>` and `<LayoutFooter>` (both use `transition:persist`).

`LayoutHeader` accepts a `variant` prop (`'default' | 'transparent'`). The transparent variant is used on hero/full-screen pages (e.g. `index.astro`) where the header overlays a background image. The header uses CSS scroll-driven animation (`animation-timeline: scroll(root)`) to collapse padding and add shadow as the user scrolls.

### Component methodology — Atomic Design

Components follow Brad Frost's Atomic Design methodology, composing UI from the smallest building blocks up to full pages. When adding or refactoring components, classify them by level:

- **Atoms** — indivisible primitives with no dependency on other components (a link, icon, button, label). e.g. `components/action/Link.astro`, `components/InlineSvgIcon.astro`.
- **Molecules** — small groups of atoms working as a unit (a titled section header, a breadcrumb, a card). e.g. `components/pages/SectionTitle.astro`, `Breadcrumb.astro`, `PhotoCard.astro`, `Accordion.astro`.
- **Organisms** — larger, self-contained sections composed of molecules and atoms (a full page section). e.g. the `home/*Section.astro` and `sleep/*Section.astro` components under `components/pages/`.
- **Templates** — the page-level layout/shell that arranges organisms without real content. Here this is `layout/Layout.astro` (plus `LayoutHeader`/`LayoutFooter`).
- **Pages** — concrete instances of templates with real content and data, i.e. everything under `src/pages/`.

Build upward: reach for an existing lower-level component before creating a new one, and keep atoms/molecules content-agnostic so they stay reusable. Prefer composition over duplication.

### Components & page styling

- `src/components/pages/` holds page-building blocks (molecules and organisms): shared ones live at the top level (`SectionTitle`, `Breadcrumb`, `Accordion`, `PhotoCard`, `FixedBackgroundSection`), and per-page organism sections live in subfolders named after the page (`home/`, `sleep/`).
- Component-scoped CSS goes in `<style>` blocks inside the `.astro` file (using the design tokens); reusable cross-component CSS lives in `src/styles/components/*.css`, aggregated by `index.css` and pulled into `global.css`.

### Content collections

Bedrooms are an Astro content collection defined in `src/content.config.ts` using the `glob` loader over `src/content/bedrooms/*.md`. Each entry's frontmatter is Zod-validated (`order`, `name`, `image`, `capacity`, `surface`, `bed`, `price`, `href`, optional `amenities`) with the body as the Markdown description.

### Site content

Business contact details and the app name live in `src/config/contact.ts` (`CONTACT_EMAIL`, `CONTACT_PHONE`, `APP_NAME`, `ADDRESS`) — update there to propagate everywhere.

### Deployment

Docker build outputs a Node standalone server running on port 80 (`HOST=0.0.0.0`, `PORT=80`). The built entry point is `dist/server/entry.mjs`.
