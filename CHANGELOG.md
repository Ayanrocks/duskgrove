# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **`accentHighlight` UI Token**: Introduced a dedicated highlight and accent color (`#BE9E5F`, warm golden-yellow, H40° S42% L56%) for UI chrome indicators, borders, cursor, and active sliders.
  - **Design Rationale**: Derived from the warm declarative keyword family (`#E2A06E`, H26° S67% L66%), nudged toward golden-yellow hue (40°) and calibrated down 20% in brightness across RGB channels after in-editor testing to prevent glare against `ui.bgEditor` (`#121810`), while maintaining clear distinction from `attribute` (`#D9B98A`, S51%) and `keyword` (S67%).
  - **Key Mappings**:
    - `sash.hoverBorder`: Active split panel resize indicator.
    - `tab.activeBorderTop`: Active editor tab top border indicator.
    - `panelTitle.activeBorder`: Active bottom panel indicator.
    - `focusBorder`: Keyboard focus outline.
    - `editorCursor.foreground`: Primary text cursor.
    - `editorBracketMatch.border`: Matching-bracket outline.
    - `scrollbarSlider.activeBackground`: Scrollbar thumb dragging state.
    - `minimapSlider.activeBackground`: Minimap slider active/dragging state.
    - `activityBarBadge.background`: Activity bar notification badge.
  - **Accessibility & Contrast**: Verified comfortable non-text UI contrast against canvas `ui.bgEditor` (7.08:1) and `ui.bgSidebar` (6.48:1), well above the WCAG 3.0:1 requirement without competing with body text.

### Changed

- **Panel Background Decoupled to `bgEditor`**: Repointed `panel.background` and `panelSectionHeader.background` from `ui.bgPanel` (`#474056`) to `ui.bgEditor` (`#121810`).
  - **Rationale**: Eliminates the unintended purple block behind the bottom panel container and tab strip (Problems / Output / Debug Console / Terminal / Ports / Test Results), ensuring the panel surface seamlessly extends the dark editor canvas.
  - **Selection Isolation**: Preserved `ui.bgSelection` (`#474056`) exclusively for genuine editor text and list selection highlights.
  - **Contrast Verification**: Verified that `panelTitle.activeForeground` (10.1:1), `panelTitle.inactiveForeground` (5.95:1), and `panelTitle.activeBorder` (7.08:1) comfortably exceed WCAG AA requirements ($\ge 3.0:1$) against `panel.background` (`#121810`).
- **Subtle Organic Container, Window & Sidebar Section Borders (`#5B6A5E33`)**: Applied `#5B6A5E33` (derived from `syntax.comment` at 20% alpha) to container, title bar, and sidebar section borders (`titleBar.border`, `sideBar.border`, `sideBarSectionHeader.border`, `editorGroup.border`, `activityBar.border`, `panel.border`, `panelSection.border`, `panelSectionHeader.border`, and `statusBar.border`). Provides an organic, low-brightness resting divider above the Explorer header and between collapsible sidebar sections.
- **Preserved Transparent Tab & Sidebar Title Borders**: Kept `sideBarTitle.border`, `tab.border`, `editorGroupHeader.tabsBorder`, and `editorGroupHeader.border` as `#00000000` (eliminating the seam below the Explorer title).

## [0.4.0] - 2026-09-08

### Changed

- **Locked In `string` Token**: Finalized `syntax.string` to steel-blue/azure (`#82A6C0`, HSL ≈ 205°, 33%, 63%).
  - **Chromatic Distinction**: Sits 44° clear of the teal zone occupied by `function` (`#72B5A0`, 161°) and `typeClass` (`#8FC9B8`, 162°), eliminating hue collision while maintaining harmonious mid-range saturation and lightness (~30–35% S, ~60–68% L).
  - **Adjacency Balance**: Resolves visual collision with warm keywords (`#E2A06E`, 26°) and numbers (`#C2CBA0`, 73°) in typical expressions (e.g. `const key = "value"`).
  - **Contrast Compliance**: Maintains strong 7.02:1 contrast against canvas background `ui.bgEditor` (`#121810`), providing comfortable legibility for multiline and long string literals.
- **DuskGrove Unification**: Renamed all working-title references from "Gloaming" to "DuskGrove" across token files, identifiers, display names, and theme JSON artifacts.

## [0.3.0] - 2026-09-06

### Changed

- **Dedicated Neutral for `variable`**: Updated `syntax.variable` from foreground-matched (`#B9C6AE`) to a dedicated warm-neutral gray tone (`#A2A096`, ~5% saturation).
  - **Rationale**: Eliminates perceived "too much green" across files with heavy identifier density, ensuring pervasive identifiers read as calm, uncolored body text.
  - **Hierarchy Restoration**: Sharpens the visual contrast between accent roles (warm orange declarative family vs. sage/teal callable/value family) and identifier references.
  - **Accessibility & Contrast**: Maintained strong 6.88:1 contrast ratio against canvas background `ui.bgEditor` (`#121810`), and verified 3.75:1 contrast against selection highlight `ui.bgSelection` (`#474056`).
- **Regression Guard**: Added test assertions ensuring `syntax.variable` remains distinct from `ui.fgPrimary`, `syntax.function`, and `syntax.keyword`.

## [0.2.0] - 2026-09-06

### Changed

- **Syntax Palette Redesign**: Replaced initial syntax token colors with an original, from-scratch redesign specifically architected to break away from Material Theme color-role conventions (e.g., purple keywords, green strings, blue functions, teal types).
- **Two-Family Color Strategy**: Syntax highlighting is now organized into two intentional hue families:
  - Warm orange family (`keyword` `#E2A06E`, `tag` `#C97D46`, `attribute` `#D9B98A`) for declarative and structural constructs.
  - Sage/teal family (`function` `#72B5A0`, `typeClass` `#8FC9B8`, `string` `#A9C9A0`, `numberConstant` `#C2CBA0`, `variable` `#B9C6AE`) for referential and value-bearing tokens.
  - Set `syntax.variable` to deliberately match `ui.fgPrimary` (`#B9C6AE`), allowing pervasive identifiers to blend naturally into body text without visual fatigue.
  - Retained low-contrast desaturated tones for `comment` (`#5B6A5E`) and `operatorPunctuation` (`#6C7A70`).
- **Contrast Compliance**: Verified that all ten syntax tokens pass WCAG AA readability standards against `bgEditor` (`#121810`), with contrast ratios ranging between 7.59:1 and 10.61:1 for primary roles and $\ge 3.0:1$ for de-emphasized roles.

## [0.1.0] - 2026-09-06

### Added

- Initial release of **DuskGrove** dark VS Code color theme.
- Modular token system (`ColorTokenSet`) separating palette definitions from compiler and mapping logic.
- Pure mapping architecture for VS Code workbench UI (`uiMapping.ts`), TextMate syntax scopes (`syntaxMapping.ts`), and LSP semantic token highlighting (`semanticTokenMapping.ts`).
- Programmatic color ramp utilities for HSL lighten/darken operations and alpha compositing (`colorUtils.ts`).
- Automated CLI compilation pipeline (`generate.ts`) with schema validation and `package.json` contributes synchronization.
- Automated WCAG 2.1 relative luminance and contrast ratio validation engine (`contrast.ts`).
- Strict Zod schema validation (`schema.ts`) mirroring official VS Code theme contribution requirements.
- Full test suite verifying compiler output, TextMate font styling, token completeness, schema conformity, and WCAG AA contrast compliance.
- Zero runtime code architecture packaging only declarative static JSON for maximum security.
