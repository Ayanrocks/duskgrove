/**
 * @file schema.test.ts
 * @description Unit tests for Zod schema validation of VS Code theme outputs.
 */

import { describe, it, expect } from "vitest";
import * as fs from "node:fs";
import * as path from "node:path";
import { DuskGroveDark, DuskGroveDarkSeamless } from "../src/tokens/index.js";
import { buildTheme } from "../src/build/buildTheme.js";
import { validateTheme, vsCodeThemeSchema } from "../src/validate/schema.js";

describe("Theme schema validation", () => {
  it("successfully validates the compiled DuskGroveDark theme", () => {
    const theme = buildTheme(DuskGroveDark);
    expect(() => validateTheme(theme)).not.toThrow();

    const validated = validateTheme(theme);
    expect(validated.name).toBe("DuskGrove - Forest");
    expect(validated.type).toBe("dark");
  });

  it("successfully validates the compiled DuskGroveDarkSeamless theme", () => {
    const theme = buildTheme(DuskGroveDarkSeamless);
    expect(() => validateTheme(theme)).not.toThrow();

    const validated = validateTheme(theme);
    expect(validated.name).toBe("DuskGrove - Forest (Seamless)");
    expect(validated.type).toBe("dark");
  });

  it("rejects themes missing a name", () => {
    const theme = buildTheme(DuskGroveDark);
    const invalidTheme = { ...theme, name: "" };

    expect(() => validateTheme(invalidTheme)).toThrow();
  });

  it("rejects themes with invalid hex color strings", () => {
    const theme = buildTheme(DuskGroveDark);
    const invalidTheme = {
      ...theme,
      colors: {
        ...theme.colors,
        "editor.background": "rgb(0,0,0)", // not a hex string
      },
    };

    expect(() => validateTheme(invalidTheme)).toThrow();
  });

  it("rejects themes with unsupported type classifications", () => {
    const theme = buildTheme(DuskGroveDark);
    const invalidTheme = {
      ...theme,
      type: "neon-cyberpunk",
    };

    expect(() => validateTheme(invalidTheme)).toThrow();
  });

  it("rejects themes with empty tokenColors array", () => {
    const theme = buildTheme(DuskGroveDark);
    const invalidTheme = {
      ...theme,
      tokenColors: [],
    };

    expect(() => validateTheme(invalidTheme)).toThrow();
  });

  it("validates all generated theme JSON files on disk", () => {
    const themeFilenames = [
      "DuskGrove-dark-color-theme.json",
      "DuskGrove-dark-seamless-color-theme.json",
      "DuskGrove-ocean-color-theme.json",
      "DuskGrove-ocean-seamless-color-theme.json",
      "DuskGrove-lavender-color-theme.json",
      "DuskGrove-lavender-seamless-color-theme.json",
      "DuskGrove-forest-light-color-theme.json",
    ];

    for (const filename of themeFilenames) {
      const themePath = path.resolve(__dirname, `../themes/${filename}`);
      if (fs.existsSync(themePath)) {
        const rawContent = fs.readFileSync(themePath, "utf-8");
        const parsed = JSON.parse(rawContent);

        const result = vsCodeThemeSchema.safeParse(parsed);
        expect(
          result.success,
          `Schema validation failed on disk artifact ${filename}: ${result.error}`,
        ).toBe(true);
      }
    }
  });
});
