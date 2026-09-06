# Contributing to DuskGrove

Thank you for your interest in contributing to **DuskGrove**! We welcome bug reports, improvements, and new theme variants.

## Development Workflow

### Prerequisites

- Node.js >= 20.0.0
- npm >= 9.0.0

### Setup

```bash
git clone https://github.com/duskgrove/duskgrove-theme.git
cd duskgrove-theme
npm install
```

### Available Scripts

- `npm run build:themes` — Compiles all variants from `src/tokens/` into `themes/*.json` and syncs `package.json`.
- `npm run typecheck` — Validates TypeScript types across the project.
- `npm run lint` — Runs ESLint across all TypeScript source files.
- `npm run format:check` — Verifies code formatting with Prettier.
- `npm run format` — Automatically formats files using Prettier.
- `npm test` — Executes the Vitest test suite (compiler, contrast checks, schema validation).
- `npm run package` — Validates packaging via `@vscode/vsce package --no-dependencies`.

---

## Adding a New Theme Variant

DuskGrove is architected so that adding a new variant **never** requires touching compiler logic, workbench mappings, or TextMate grammars.

Follow these 4 simple steps:

1. **Create the token file**
   Add a new file in `src/tokens/` (e.g. `src/tokens/DuskGrove-light.ts`):

   ```ts
   import { ColorTokenSet } from "./types.js";

   export const DuskGroveLight: ColorTokenSet = {
     meta: {
       id: "DuskGrove-light",
       label: "DuskGrove Light",
       type: "light",
     },
     ui: {
       bgEditor: "#F4F6F2",
       bgSidebar: "#E9EDE6",
       bgSelection: "#C9D4C2",
       bgPanel: "#E9EDE6",
       border: "#B2BDB0",
       fgMuted: "#6B7568",
       fgPrimary: "#232A20",
     },
     syntax: {
       keyword: "#6D4C9F",
       string: "#3E7A28",
       numberConstant: "#94681A",
       function: "#24689E",
       typeClass: "#1F7A6A",
       variable: "#2A3626",
       comment: "#7F8A7C",
       operatorPunctuation: "#544E5E",
       tag: "#993B5D",
       attribute: "#8C6321",
     },
     semantic: {
       error: "#B82E3B",
       warning: "#9E6814",
       info: "#24689E",
       success: "#2E7D32",
     },
   };
   ```

2. **Register the variant**
   Open `src/tokens/index.ts` and add your variant to `tokenVariants`:

   ```ts
   import { DuskGroveLight } from "./DuskGrove-light.js";

   export const tokenVariants: ColorTokenSet[] = [DuskGroveDark, DuskGroveLight];
   ```

3. **Build themes**
   Run the theme generator:

   ```bash
   npm run build:themes
   ```

   This will validate your palette against WCAG contrast rules and the VS Code schema, generate `themes/DuskGrove-light-color-theme.json`, and automatically update `package.json`.

4. **Verify and test**
   ```bash
   npm test
   ```

---

## Pull Request Guidelines

- Ensure `npm test`, `npm run typecheck`, `npm run lint`, and `npm run format:check` pass cleanly.
- Keep commits atomic and formatted using Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`, `test:`).
- Document new additions in `CHANGELOG.md`.
