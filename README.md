# DuskGrove

<p align="center">
  <img src="images/icon.png" alt="DuskGrove Icon" width="128" height="128" />
</p>

<p align="center">
  <strong>A modular, elegant dark VS Code color theme inspired by twilight forest canopies.</strong>
</p>

<p align="center">
  <a href="https://github.com/duskgrove/duskgrove-theme/actions"><img src="https://github.com/duskgrove/duskgrove-theme/workflows/CI/badge.svg" alt="CI Status" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License: MIT" /></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=duskgrove.duskgrove"><img src="https://img.shields.io/badge/vscode-%5E1.85.0-blue" alt="VS Code Version" /></a>
</p>

---

## Overview

**DuskGrove** is an atmospheric, deeply legible dark VS Code theme inspired by twilight falling over evergreen woodland canopies. Designed with low eye fatigue and high semantic distinction in mind, it combines rich forest shadows with soft botanical and twilight tones.

### Aesthetic & Palette

| Token Role                 | Color Name                 |    Hex    |                             Preview                             |
| :------------------------- | :------------------------- | :-------: | :-------------------------------------------------------------: |
| **Editor Background**      | Deep Forest Canvas         | `#121810` | ![#121810](https://via.placeholder.com/15/121810/000000?text=+) |
| **Sidebar Background**     | Pine Bark                  | `#1A2116` | ![#1A2116](https://via.placeholder.com/15/1A2116/000000?text=+) |
| **Selection & Panel**      | Dusky Heather              | `#474056` | ![#474056](https://via.placeholder.com/15/474056/000000?text=+) |
| **Primary Foreground**     | Lichen Canopy              | `#B9C6AE` | ![#B9C6AE](https://via.placeholder.com/15/B9C6AE/000000?text=+) |
| **Muted Foreground**       | Cool Mist Slate            | `#8A95A5` | ![#8A95A5](https://via.placeholder.com/15/8A95A5/000000?text=+) |
| **Border & Dividers**      | Twilight Slate             | `#757083` | ![#757083](https://via.placeholder.com/15/757083/000000?text=+) |
| **Accent Highlight**       | Warm Amber Gold            | `#BE9E5F` | ![#BE9E5F](https://via.placeholder.com/15/BE9E5F/000000?text=+) |
| **Keywords**               | Heather Lavender           | `#A68FD1` | ![#A68FD1](https://via.placeholder.com/15/A68FD1/000000?text=+) |
| **Strings**                | Sprout Green               | `#A3C98F` | ![#A3C98F](https://via.placeholder.com/15/A3C98F/000000?text=+) |
| **Numbers & Constants**    | Amber Honey                | `#D9B97A` | ![#D9B97A](https://via.placeholder.com/15/D9B97A/000000?text=+) |
| **Functions**              | Mountain Stream            | `#8AB4D8` | ![#8AB4D8](https://via.placeholder.com/15/8AB4D8/000000?text=+) |
| **Types & Classes**        | Glacial Sage               | `#7FC4B8` | ![#7FC4B8](https://via.placeholder.com/15/7FC4B8/000000?text=+) |
| **Variables**              | Birch Leaf Grey            | `#C7CDB9` | ![#C7CDB9](https://via.placeholder.com/15/C7CDB9/000000?text=+) |
| **Comments**               | Forest Understory (Italic) | `#5F665A` | ![#5F665A](https://via.placeholder.com/15/5F665A/000000?text=+) |
| **Operators & Delimiters** | Stone Grey                 | `#6F6A7A` | ![#6F6A7A](https://via.placeholder.com/15/6F6A7A/000000?text=+) |
| **Tags**                   | Wild Rose Quartz           | `#D18FA8` | ![#D18FA8](https://via.placeholder.com/15/D18FA8/000000?text=+) |
| **Attributes**             | Golden Ochre               | `#C9A875` | ![#C9A875](https://via.placeholder.com/15/C9A875/000000?text=+) |
| **Error**                  | Berry Red                  | `#D9707A` | ![#D9707A](https://via.placeholder.com/15/D9707A/000000?text=+) |
| **Warning**                | Autumn Gold                | `#E0B168` | ![#E0B168](https://via.placeholder.com/15/E0B168/000000?text=+) |
| **Info**                   | Creek Blue                 | `#8AB4D8` | ![#8AB4D8](https://via.placeholder.com/15/8AB4D8/000000?text=+) |
| **Success**                | Meadow Green               | `#8FC98A` | ![#8FC98A](https://via.placeholder.com/15/8FC98A/000000?text=+) |

---

## Architecture & Scalability

DuskGrove is structured so that **color values exist in exactly one place**: `src/tokens/`.

The build engine (`src/build/`) transforms semantic tokens into:

1. **Workbench UI colors** (`colors` in `themes/*.json`) via `uiMapping.ts`.
2. **TextMate syntax scopes** (`tokenColors` in `themes/*.json`) via `syntaxMapping.ts`.
3. **LSP semantic highlights** (`semanticTokenColors` in `themes/*.json`) via `semanticTokenMapping.ts`.

All intermediate lightness and alpha values are computed mathematically (using HSL in `colorUtils.ts`), eliminating arbitrary one-off color literals.

```
src/
├── tokens/                     # SOURCE OF TRUTH (one file per variant)
│   ├── types.ts                # Strict ColorTokenSet TypeScript interface
│   ├── DuskGrove-dark.ts       # DuskGrove Dark palette definition
│   └── index.ts                # Central variant registry array
├── build/                      # PURE COMPILER & MAPPING RULES
│   ├── colorUtils.ts           # HSL lighten/darken & alpha calculation
│   ├── uiMapping.ts            # Maps tokens to VS Code workbench colors
│   ├── syntaxMapping.ts        # Maps tokens to TextMate scopes
│   ├── semanticTokenMapping.ts # Maps tokens to LSP semantic tokens
│   ├── buildTheme.ts           # Assembles the full theme JSON
│   └── generate.ts             # CLI builder: compiles themes & updates package.json
└── validate/                   # QUALITY GATES
    ├── schema.ts               # Zod validation matching VS Code theme schema
    └── contrast.ts             # WCAG 2.1 relative luminance & contrast checks
```

---

## How to Add a New Theme Variant (4 Steps)

Adding a completely new theme variant (such as `DuskGrove Light` or `DuskGrove High Contrast`) requires **zero changes** to compiler logic, workbench mappings, or TextMate rules.

### Step 1: Create a token file

Create `src/tokens/DuskGrove-light.ts` conforming to `ColorTokenSet`:

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
    accentHighlight: "#C78C26",
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

### Step 2: Register the variant

Open `src/tokens/index.ts` and add your variant to `tokenVariants`:

```ts
import { DuskGroveLight } from "./DuskGrove-light.js";

export const tokenVariants: ColorTokenSet[] = [
  DuskGroveDark,
  DuskGroveLight, // <- Simply append here
];
```

### Step 3: Run the build generator

```bash
npm run build:themes
```

The generator will:

- Check WCAG contrast compliance (`contrast.ts`).
- Validate the generated structure against the VS Code schema (`schema.ts`).
- Output `themes/DuskGrove-light-color-theme.json`.
- Automatically synchronize the `contributes.themes` array in `package.json`.

### Step 4: Run the test suite

```bash
npm test
```

All automated tests will verify your new variant's schema and contrast ratios!

---

## Local Development & Testing

### Installation

```bash
npm install
```

### Build Theme Artifacts

```bash
npm run build:themes
```

### Run Tests

```bash
npm test
```

### Typecheck & Lint

```bash
npm run typecheck
npm run lint
npm run format:check
```

### Package Extension (.vsix)

```bash
npm run package
```

---

## Security & Trust Properties

1. **Zero Runtime Code:** DuskGrove ships only static JSON theme definitions. No extension host JavaScript/TypeScript is executed at runtime.
2. **Minimal Surface Area:** All dependencies are `devDependencies` only and excluded from packaging via `.vscodeignore`.
3. **Reproducible Builds:** Themes are deterministically compiled from token files.
4. **Accessible by Design:** All colors are verified against WCAG AA standards (≥ 4.5:1 for primary text, ≥ 3.0:1 for muted text and semantic indicators).

---

## License

[MIT](LICENSE) © DuskGrove Contributors
