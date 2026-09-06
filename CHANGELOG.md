# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
