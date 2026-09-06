/**
 * @file buildTheme.test.ts
 * @description Unit tests for theme compiler and token completeness.
 */

import { describe, it, expect } from "vitest";
import { DuskGroveDark, tokenVariants } from "../src/tokens/index.js";
import { buildTheme } from "../src/build/buildTheme.js";
import { ColorTokenSet } from "../src/tokens/types.js";

describe("buildTheme compiler", () => {
  it("compiles DuskGroveDark into a valid theme structure", () => {
    const theme = buildTheme(DuskGroveDark);

    expect(theme.name).toBe("DuskGrove");
    expect(theme.type).toBe("dark");
    expect(theme.semanticHighlighting).toBe(true);
    expect(typeof theme.colors).toBe("object");
    expect(Array.isArray(theme.tokenColors)).toBe(true);
    expect(typeof theme.semanticTokenColors).toBe("object");
  });

  it("populates all required workbench UI colors", () => {
    const theme = buildTheme(DuskGroveDark);

    const requiredKeys = [
      "editor.background",
      "editor.foreground",
      "sideBar.background",
      "sideBar.foreground",
      "activityBar.background",
      "statusBar.background",
      "editor.selectionBackground",
      "editorLineNumber.foreground",
      "editorLineNumber.activeForeground",
      "tab.activeBackground",
      "tab.inactiveBackground",
      "panel.border",
      "focusBorder",
      "editorCursor.foreground",
      "titleBar.activeBackground",
    ];

    for (const key of requiredKeys) {
      expect(theme.colors[key], `Missing UI key: ${key}`).toBeDefined();
      expect(theme.colors[key]).toMatch(/^#[0-9A-Fa-f]{6,8}$/);
    }
  });

  it("correctly handles font styles: italic for comments, non-italic for keywords", () => {
    const theme = buildTheme(DuskGroveDark);

    // Comments must have fontStyle: "italic"
    const commentRule = theme.tokenColors.find((rule) => {
      const scopes = Array.isArray(rule.scope) ? rule.scope : [rule.scope];
      return scopes.includes("comment");
    });
    expect(commentRule).toBeDefined();
    expect(commentRule?.settings.fontStyle).toBe("italic");

    // Keywords must NOT have italic fontStyle
    const keywordRule = theme.tokenColors.find((rule) => {
      const scopes = Array.isArray(rule.scope) ? rule.scope : [rule.scope];
      return scopes.includes("keyword");
    });
    expect(keywordRule).toBeDefined();
    expect(keywordRule?.settings.fontStyle).toBeUndefined();
  });

  it("populates semanticTokenColors for language server highlighting", () => {
    const theme = buildTheme(DuskGroveDark);

    const expectedTokens = [
      "function",
      "variable",
      "parameter",
      "property",
      "class",
      "interface",
      "enum",
      "type",
    ];

    for (const token of expectedTokens) {
      expect(theme.semanticTokenColors[token], `Missing semantic token: ${token}`).toBeDefined();
    }
  });

  it("has no missing or undefined token values in registered variants", () => {
    for (const variant of tokenVariants) {
      // Validate meta
      expect(variant.meta.id).toBeTruthy();
      expect(variant.meta.label).toBeTruthy();
      expect(variant.meta.type).toMatch(/^(dark|light|hc-dark|hc-light)$/);

      // Validate UI tokens
      for (const [key, value] of Object.entries(variant.ui)) {
        expect(value, `Missing UI token: ${key} in ${variant.meta.id}`).toMatch(
          /^#[0-9A-Fa-f]{6}$/,
        );
      }

      // Validate syntax tokens
      for (const [key, value] of Object.entries(variant.syntax)) {
        expect(value, `Missing syntax token: ${key} in ${variant.meta.id}`).toMatch(
          /^#[0-9A-Fa-f]{6}$/,
        );
      }

      // Validate semantic tokens
      for (const [key, value] of Object.entries(variant.semantic)) {
        expect(value, `Missing semantic token: ${key} in ${variant.meta.id}`).toMatch(
          /^#[0-9A-Fa-f]{6}$/,
        );
      }
    }
  });

  it("compiles an arbitrary new variant seamlessly without modifying build logic", () => {
    const customVariant: ColorTokenSet = {
      meta: { id: "custom-nordic", label: "Custom Nordic", type: "dark" },
      ui: {
        bgEditor: "#1e222a",
        bgSidebar: "#181b21",
        bgSelection: "#3e4451",
        bgPanel: "#181b21",
        border: "#282c34",
        fgMuted: "#5c6370",
        fgPrimary: "#abb2bf",
      },
      syntax: {
        keyword: "#c678dd",
        string: "#98c379",
        numberConstant: "#d19a66",
        function: "#61afef",
        typeClass: "#e5c07b",
        variable: "#e06c75",
        comment: "#5c6370",
        operatorPunctuation: "#abb2bf",
        tag: "#e06c75",
        attribute: "#d19a66",
      },
      semantic: {
        error: "#e06c75",
        warning: "#e5c07b",
        info: "#61afef",
        success: "#98c379",
      },
    };

    const compiled = buildTheme(customVariant);
    expect(compiled.name).toBe("Custom Nordic");
    expect(compiled.colors["editor.background"]).toBe("#1e222a");
    expect(compiled.colors["editor.foreground"]).toBe("#abb2bf");
  });
});
