# DuskGrove Production Release Checklist

A rigorous pre-flight checklist for releasing updates to the **DuskGrove** VS Code theme extension on the Visual Studio Code Marketplace and Open VSX Registry.

---

## 1. Versioning & Semantic Versioning

- [ ] **Determine Release Increment**:
  - `PATCH` (e.g. `0.4.1` → `0.4.2`): Bug fixes, contrast fine-tuning, token adjustments without new features.
  - `MINOR` (e.g. `0.4.2` → `0.5.0`): New theme variants (e.g., Forest Light, Lavender, Ocean), new UI tokens, backwards-compatible additions.
  - `MAJOR` (e.g. `0.5.0` → `1.0.0`): Stable production milestone, major token schema refactoring.
- [ ] **Synchronize `package.json`**:
  - Update `"version"` in `package.json`.
- [ ] **Update `CHANGELOG.md`**:
  - Move items from `[Unreleased]` to `[x.y.z] - YYYY-MM-DD`.
  - Document all additions, modifications, accessibility contrast updates, and theme variants.
  - Follow [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) standards.

---

## 2. Manifest & Metadata Integrity

- [ ] **`package.json` Field Audit**:
  - `"name"`: `duskgrove`
  - `"displayName"`: `DuskGrove`
  - `"description"`: Clear, descriptive summary under 120 characters.
  - `"publisher"`: Verified publisher ID matching Marketplace credentials (`Ayanrocks`).
  - `"icon"`: Relative path pointing to `images/icon.png` (512x512 or 256x256 PNG).
  - `"repository"`: Valid GitHub URL.
  - `"categories"`: `["Themes"]`.
  - `"keywords"`: Relevant discoverability terms (e.g. `theme`, `color-theme`, `dark`, `forest`, `accessible`, `contrast`, `light`).
  - `"contributes.themes"`: Every generated theme JSON listed with exact label, `uiTheme` (`vs-dark` or `vs`), and path.
  - `"engines.vscode"`: Minimum compatible VS Code engine (`^1.85.0`).

---

## 3. Build & Compiler Verification

- [ ] **Token Source of Truth**:
  - Ensure all new palette tokens are declared strictly in `src/tokens/`.
  - Verify that `src/tokens/index.ts` exports all active variants in `tokenVariants`.
- [ ] **Compile Themes**:
  ```bash
  npm run build:themes
  ```
  - Confirm all JSON files in `themes/` are generated deterministically with zero drift.

---

## 4. Quality Gates & Automated Tests

- [ ] **Vitest Suite**:
  ```bash
  npm test
  ```
  - **Compiler tests** pass (`test/buildTheme.test.ts`).
  - **VS Code Schema validation** passes for all 7 theme JSONs (`test/schema.test.ts`).
  - **WCAG 2.1 AA Contrast validation** passes for all variants (`test/contrast.test.ts`):
    - Body text / foreground: $\ge 4.5:1$
    - Muted text & chrome indicators: $\ge 3.0:1$
    - Syntax tokens: $\ge 4.5:1$ for primary roles, $\ge 3.0:1$ for de-emphasized roles.
- [ ] **Typecheck**:
  ```bash
  npm run typecheck
  ```
  - Zero TypeScript compilation errors (`tsc --noEmit`).
- [ ] **Linting & Formatting**:
  ```bash
  npm run lint
  npm run format:check
  ```
  - Zero ESLint warnings or errors. Prettier formatting validated across all source and config files.

---

## 5. Package Cleanliness & Payload Audit

- [ ] **Ignore Rules Validation**:
  - Verify `.vscodeignore` excludes:
    - Source code (`src/**`, `test/**`, `tsconfig.json`)
    - Configs (`.eslintrc*`, `.prettier*`, `.editorconfig`)
    - Dev assets (`docs/**`, `.github/**`)
    - Package artifacts (`*.vsix`, `.git*`, `coverage/`, `*.log`, `.DS_Store`)
- [ ] **Payload Dry Run**:
  ```bash
  npx @vscode/vsce ls
  ```
  - Confirm the packaged file list contains **only**:
    - `package.json`
    - `README.md`
    - `LICENSE`
    - `CHANGELOG.md`
    - `themes/*.json` (all 7 variants)
    - `images/icon.png` and required preview images.

---

## 6. Build & Verify Package (`.vsix`)

- [ ] **Assemble VSIX Package**:
  ```bash
  npm run package
  ```
  - Confirm the `.vsix` file is created without warnings.
- [ ] **Inspect Package Size**:
  - Ensure total package size is reasonable (< 3 MB with high-res screenshots).

---

## 7. Local In-Editor Verification

- [ ] **Install VSIX Locally**:
  ```bash
  code --install-extension duskgrove-<version>.vsix
  ```
- [ ] **Visual Smoke Test**:
  - Open VS Code with various languages (TypeScript, Python, Go, Rust, Markdown, JSON, HTML/CSS).
  - Cycle through all themes via `Cmd+K Cmd+T`:
    1. DuskGrove - Forest
    2. DuskGrove - Forest (Seamless)
    3. DuskGrove - Ocean
    4. DuskGrove - Ocean (Seamless)
    5. DuskGrove - Lavender
    6. DuskGrove - Lavender (Seamless)
    7. DuskGrove - Forest Light
  - Verify:
    - Tab bar, editor canvas, sidebar, status bar, and bottom panel rendering.
    - Active tab and split panel borders (`accentHighlight`).
    - Comment italic rendering.
    - Notification badges and search highlights.
- [ ] **Uninstall Test Extension**:
  ```bash
  code --uninstall-extension Ayanrocks.duskgrove
  ```

---

## 8. Release & Publishing

- [ ] **Git Hygiene**:
  - Clean working directory (`git status`).
  - Create release commit: `chore(release): bump version to x.y.z`.
  - Create git tag: `git tag -a vx.y.z -m "Release vx.y.z"`.
  - Push branch and tag: `git push origin main --tags`.
- [ ] **Publish to Visual Studio Code Marketplace**:
  ```bash
  npx @vscode/vsce publish
  ```
  _(Requires `VSCE_PAT` Personal Access Token configured or logged in via `vsce login Ayanrocks`)_
- [ ] **Publish to Open VSX Registry (Optional / Recommended)**:
  ```bash
  npx ovsx publish
  ```

---

## 9. Post-Release Verification

- [ ] **Marketplace Listing**:
  - Visit `https://marketplace.visualstudio.com/items?itemName=Ayanrocks.duskgrove`.
  - Verify icon, badges, preview screenshots, theme description, and changelog render properly.
- [ ] **In-App Update**:
  - Confirm extension appears in VS Code extension search and updates smoothly.

