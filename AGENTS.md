# Agentic Development Guidelines

This document serves as the primary source of truth for all AI agents and developers working on this Personal Portfolio repository. Strictly adhere to these guidelines to maintain codebase integrity, consistency, and performance.

## 1. Project Overview & Architecture

**Stack:**
- **Framework:** Astro (latest stable)
- **Styling:** Tailwind CSS (v4, via `@tailwindcss/vite`)
- **Language:** TypeScript (Strict Mode)
- **Package Manager:** pnpm
- **Deployment:** Static (SSG) output to `dist/`

**Directory Structure:**
- `src/components/sections/`: Modular landing page sections (Hero, About, etc.).
- `src/layouts/`: Global layouts (BaseLayout).
- `src/content/`: Content Collections (Markdown/Frontmatter).
- `src/pages/`: Route definitions (Single Page `index.astro`).
- `src/styles/`: Global styles and Tailwind imports.

## 2. Build, Lint & Test Commands

Use `pnpm` for all script execution.

### Core Commands
- **Start Development Server:**
  ```bash
  pnpm dev
  ```
  *Runs the local Astro server on port 4321.*

- **Build for Production:**
  ```bash
  pnpm build
  ```
  *Generates static files in `dist/`. Always run this before pushing significant changes to ensure build stability.*

- **Preview Production Build:**
  ```bash
  pnpm preview
  ```
  *Serves the contents of `dist/` locally.*

### Quality Assurance
- **Lint Code:**
  ```bash
  pnpm lint
  ```
  *Runs ESLint with `eslint-plugin-astro`. Fixes should be applied manually or via `--fix` if confident.*

- **Format Code:**
  ```bash
  pnpm format
  ```
  *Runs Prettier across the project. Run this before every commit.*

### Testing
*Note: No automated testing framework (Vitest/Playwright) is currently configured.*

- **Running Tests (Future):**
  If tests are added, the standard command will be:
  ```bash
  pnpm test
  ```
- **Running a Single Test (Future Standard):**
  When a test runner is implemented, use the following pattern to isolate tests:
  ```bash
  pnpm test -- -t "name of test"
  # or for file specific
  pnpm test -- path/to/file.test.ts
  ```

## 3. Code Style & Standards

### Formatting & Syntax
- **Indentation:** 2 spaces.
- **Quotes:** Single quotes preferred for JS/TS; Double quotes for HTML attributes.
- **Semicolons:** Always use semicolons.
- **Trailing Commas:** ES5 compatible (objects, arrays).
- **Line Length:** Soft limit at 120 characters; let Prettier handle wrapping.

### Naming Conventions
- **Files:**
  - Astro Components: `PascalCase.astro` (e.g., `Hero.astro`)
  - Markdown Content: `kebab-case.md` (e.g., `personal-portfolio.md`)
  - Utilities/Scripts: `camelCase.ts` or `kebab-case.ts`
- **Variables/Functions:** `camelCase` (e.g., `fetchProjects`, `isLoading`).
- **Constants:** `UPPER_SNAKE_CASE` for global constants; `camelCase` for local immutable variables.
- **Types/Interfaces:** `PascalCase` (e.g., `ProjectData`, `Props`).

### TypeScript & Types
- **Strict Mode:** Enabled. Do not disable `strict` in `tsconfig.json`.
- **Explicit Types:** Define interfaces for all Component Props.
  ```typescript
  interface Props {
    title: string;
    isFeatured?: boolean;
  }
  const { title, isFeatured = false } = Astro.props;
  ```
- **Avoid `any`:** Use `unknown` or specific types. Narrow types properly.
- **Type Imports:** Use `import type { ... }` when possible to assist tree-shaking.

### Imports Order
Group imports in the following order, separated by a blank line:
1.  **System/Framework:** `astro:*`, `react`, etc.
2.  **External Libraries:** Third-party npm packages.
3.  **Internal Components:** `../components/...`
4.  **Internal Assets/Styles:** `../styles/...`, images.

```astro
---
import { Image } from 'astro:assets';
import { getCollection } from 'astro:content';

import Icon from '../components/Icon.astro';
import '../styles/global.css';
---
```

### Astro Specifics
- **Frontmatter:** Keep logic (fetching data, processing props) inside the `---` fence at the top.
- **Directives:** Use `client:load` or `client:visible` sparingly. This is a static portfolio; avoid client-side JS unless critical for interactivity (e.g., mobile menu).
- **Styles:** Prefer Tailwind utility classes over `<style>` blocks.
- **Scoped Styles:** If `<style>` is needed, keep it scoped (default behavior).

### Tailwind CSS
- **Ordering:** Follow the semantic order: Layout -> Box Model -> Typography -> Visuals -> Misc. (e.g., `block w-full p-4 text-center bg-white`).
- **Responsiveness:** Mobile-first approach. Base classes first, then `md:`, `lg:` modifiers.
  - *Bad:* `md:block hidden`
  - *Good:* `hidden md:block`
- **Arbitrary Values:** Avoid `w-[123px]` unless necessary. Use theme values.

## 4. Error Handling & Stability

- **Graceful Degradation:** Ensure the site works without JavaScript where possible.
- **Missing Data:** Handle optional props or missing content collection fields safely.
  ```tsx
  {project.data.image && <img src={project.data.image} />}
  ```
- **Broken Links:** Use `astro check` (implied in build) to validate links.

## 5. Agent Operation Protocols

1.  **Read Before Write:** Always use `read_file` or `grep` to understand the context of the file and its imports before editing.
2.  **Atomic Changes:** Focus on one task at a time. Do not combine refactoring with feature addition.
3.  **Verify:** After editing, run `pnpm build` to ensure no build errors were introduced. Run `pnpm lint` to ensure style consistency.
4.  **No Secrets:** Never commit `.env` files or hardcode API keys.
5.  **Clean Up:** Remove unused files or debug statements before finishing the task.
6.  **Commit Messages:** (If asked to commit) Use imperative mood: "Add Hero section", "Fix mobile navigation layout".

## 6. Known Constraints & Rules
- **No Test Suite:** Do not attempt to run `npm test` or `pnpm test` as it will fail. Manual verification of the UI is required.
- **Parallax:** Implemented via CSS `background-attachment: fixed` in `global.css`. Be mindful of mobile support; fallback to `scroll` on touch devices via media queries is already handled in global styles.
- **Images:** All images in `public/` or `src/assets/`. Use accessible `alt` text.

---
*This file is auto-generated and maintained by the primary coding agent. Update it if project patterns change.*
