/**
 * @file schema.test.ts
 * @description Unit tests for Zod schema validation of VS Code theme outputs.
 */

import { describe, it, expect } from "vitest";
import * as fs from "node:fs";
import * as path from "node:path";
import { GloamingDark, DuskGroveDark } from "../src/tokens/index.js";
import { buildTheme } from "../src/build/buildTheme.js";
import { validateTheme, vsCodeThemeSchema } from "../src/validate/schema.js";

describe("Theme schema validation", () => {
  it("successfully validates the compiled GloamingDark theme", () => {
    const theme = buildTheme(GloamingDark);
    expect(() => validateTheme(theme)).not.toThrow();

    const validated = validateTheme(theme);
    expect(validated.name).toBe("Gloaming");
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

  it("validates any generated theme JSON file on disk", () => {
    const themePath = path.resolve(__dirname, "../themes/gloaming-dark-color-theme.json");

    if (fs.existsSync(themePath)) {
      const rawContent = fs.readFileSync(themePath, "utf-8");
      const parsed = JSON.parse(rawContent);

      const result = vsCodeThemeSchema.safeParse(parsed);
      expect(result.success, `Schema validation failed on disk artifact: ${result.error}`).toBe(
        true,
      );
    }
  });
});
