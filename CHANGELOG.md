# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
