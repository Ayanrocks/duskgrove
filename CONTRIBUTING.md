# Contributing to DuskGrove

Thank you for your interest in contributing to **DuskGrove**! We welcome bug reports, color palette improvements, accessibility reviews, and new theme variants.

---

## Code of Conduct

All contributors are expected to uphold our [Code of Conduct](CODE_OF_CONDUCT.md) to ensure an inclusive, respectful, and welcoming environment for everyone.

---

## Development Workflow

### Prerequisites

- **Node.js**: `>= 20.0.0`
- **npm**: `>= 9.0.0`

### Setup

```bash
git clone https://github.com/Ayanrocks/duskgrove.git
cd duskgrove
npm install
```

### Available Scripts

- `npm run build:themes` — Compiles all variants from `src/tokens/` into `themes/*.json` and synchronizes `package.json`.
- `npm test` — Executes the Vitest test suite (compiler outputs, contrast checks, and schema validation).
- `npm run typecheck` — Validates TypeScript types across the codebase.
- `npm run lint` — Runs ESLint across all TypeScript source files.
- `npm run format:check` — Verifies code formatting with Prettier.
- `npm run format` — Formats files using Prettier.
- `npm run package` — Validates packaging via `@vscode/vsce package --no-dependencies`.

---

## Adding a New Theme Variant

DuskGrove is architected so that adding a new variant **never** requires touching compiler logic, workbench mappings, or TextMate grammars.

Follow these 4 simple steps:

### 1. Create the token file

Add a new file in `src/tokens/` (e.g. `src/tokens/DuskGrove-desert.ts`) implementing `ColorTokenSet`:

```ts
import { ColorTokenSet } from "./types.js";

export const DuskGroveDesert: ColorTokenSet = {
  meta: {
    id: "DuskGrove-desert",
    label: "DuskGrove - Desert",
    type: "dark",
  },
  ui: {
    bgEditor: "#1A1714",
    bgSidebar: "#231F1A",
    bgSelection: "#4D4036",
    bgPanel: "#4D4036",
    border: "#7D7063",
    fgMuted: "#9C9287",
    fgPrimary: "#D6CABA",
    accentHighlight: "#D49B45",
  },
  syntax: {
    keyword: "#E69C62",
    tag: "#D47B4A",
    attribute: "#E0BF85",
    function: "#6CA899",
    typeClass: "#88C7B5",
    numberConstant: "#C8CE97",
    string: "#7EA7BA",
    variable: "#ABA398",
    comment: "#6E685E",
    operatorPunctuation: "#7E756B",
  },
  semantic: {
    error: "#D96868",
    warning: "#E0AA48",
    info: "#68A5D6",
    success: "#76B874",
  },
};
```

### 2. Register the variant

Open `src/tokens/index.ts` and add your variant to `tokenVariants`:

```ts
import { DuskGroveDesert } from "./DuskGrove-desert.js";

export const tokenVariants: ColorTokenSet[] = [
  ...existingVariants,
  DuskGroveDesert, // <- Register here
];
```

### 3. Build themes

Run the theme generator:

```bash
npm run build:themes
```

The build generator will:

- Validate your palette against WCAG AA contrast rules (`contrast.ts`).
- Validate the generated JSON structure against the VS Code theme schema (`schema.ts`).
- Output `themes/DuskGrove-desert-color-theme.json`.
- Automatically synchronize the `contributes.themes` array in `package.json`.

### 4. Verify and test

```bash
npm test
npm run typecheck
npm run lint
```

---

## Accessibility & Contrast Standards

Every theme variant must pass our automated WCAG 2.1 AA contrast suite:

- **Primary Text (`fgPrimary`)**: Minimum contrast of **4.5:1** against `bgEditor`.
- **Muted Text & UI Chrome (`fgMuted`, `accentHighlight`, borders)**: Minimum contrast of **3.0:1** against editor canvas and sidebar.
- **Syntax Roles**: Primary code tokens (keywords, functions, strings, types, numbers, variables) must meet $\ge 4.5:1$, and de-emphasized roles (comments, operators) must meet $\ge 3.0:1$.

---

## Pull Request & Release Guidelines

1. **Test First**: Ensure `npm test`, `npm run typecheck`, `npm run lint`, and `npm run format:check` pass cleanly.
2. **Conventional Commits**: Format commit messages in the imperative mood using [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` for new features or theme variants
   - `fix:` for color corrections or bug fixes
   - `docs:` for documentation updates
   - `refactor:` for internal restructuring without observable changes
   - `test:` for test additions or updates
   - `chore:` for maintenance, dependency updates, and releases
3. **Changelog**: Add an entry under `[Unreleased]` in [`CHANGELOG.md`](CHANGELOG.md).
4. **Pre-flight Check**: Consult [`docs/PRODUCTION_CHECKLIST.md`](docs/PRODUCTION_CHECKLIST.md) before submitting releases.
