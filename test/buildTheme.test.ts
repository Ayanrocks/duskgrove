/**
 * @file buildTheme.test.ts
 * @description Unit tests for theme compiler and token completeness.
 */
import { describe, it, expect } from "vitest";
import {
  DuskGroveDark,
  DuskGroveDarkSeamless,
  DuskGroveOcean,
  DuskGroveOceanSeamless,
  tokenVariants,
} from "../src/tokens/index.js";
import { buildTheme } from "../src/build/buildTheme.js";
import { ColorTokenSet } from "../src/tokens/types.js";

describe("buildTheme compiler", () => {
  it("compiles DuskGroveDark into a valid theme structure", () => {
    const theme = buildTheme(DuskGroveDark);

    expect(theme.name).toBe("DuskGrove - Forest");
    expect(theme.type).toBe("dark");
    expect(theme.semanticHighlighting).toBe(true);
    expect(typeof theme.colors).toBe("object");
    expect(Array.isArray(theme.tokenColors)).toBe(true);
    expect(typeof theme.semanticTokenColors).toBe("object");
  });

  it("guards variable from accidental drift into foreground or accent families", () => {
    expect(DuskGroveDark.syntax.variable).not.toBe(DuskGroveDark.ui.fgPrimary);
    expect(DuskGroveDark.syntax.variable).not.toBe(DuskGroveDark.syntax.function);
    expect(DuskGroveDark.syntax.variable).not.toBe(DuskGroveDark.syntax.keyword);
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
      "sash.hoverBorder",
      "tab.activeBorderTop",
      "panelTitle.activeBorder",
      "editorBracketMatch.border",
      "scrollbarSlider.activeBackground",
      "minimapSlider.activeBackground",
      "activityBarBadge.background",
    ];

    for (const key of requiredKeys) {
      expect(theme.colors[key], `Missing UI key: ${key}`).toBeDefined();
      expect(theme.colors[key]).toMatch(/^#[0-9A-Fa-f]{6,8}$/);
    }
  });

  it("wires accentHighlight to all designated UI chrome keys", () => {
    const theme = buildTheme(DuskGroveDark);
    const expectedAccent = DuskGroveDark.ui.accentHighlight;

    const accentKeys = [
      "sash.hoverBorder",
      "tab.activeBorderTop",
      "panelTitle.activeBorder",
      "focusBorder",
      "editorCursor.foreground",
      "editorBracketMatch.border",
      "scrollbarSlider.activeBackground",
      "minimapSlider.activeBackground",
      "activityBarBadge.background",
    ];

    for (const key of accentKeys) {
      expect(theme.colors[key], `Key ${key} does not match accentHighlight`).toBe(expectedAccent);
    }
  });

  it("ensures accentHighlight is never applied to syntax or semantic token colors", () => {
    const theme = buildTheme(DuskGroveDark);
    const accent = DuskGroveDark.ui.accentHighlight.toLowerCase();

    // TextMate token rules must never use accentHighlight
    for (const rule of theme.tokenColors) {
      if (rule.settings.foreground) {
        expect(rule.settings.foreground.toLowerCase()).not.toBe(accent);
      }
    }

    // Semantic tokens must never use accentHighlight
    for (const [token, value] of Object.entries(theme.semanticTokenColors)) {
      const color = typeof value === "string" ? value : value.foreground;
      if (color) {
        expect(color.toLowerCase(), `Semantic token ${token} uses accentHighlight`).not.toBe(
          accent,
        );
      }
    }
  });

  it("maps panel.background to bgEditor and maintains selection isolation", () => {
    const theme = buildTheme(DuskGroveDark);
    expect(theme.colors["panel.background"]).toBe(DuskGroveDark.ui.bgEditor);
    expect(theme.colors["panel.background"]).not.toBe(DuskGroveDark.ui.bgSelection);
    expect(theme.colors["panelSectionHeader.background"]).toBe(DuskGroveDark.ui.bgEditor);
    expect(theme.colors["editor.selectionBackground"]).toBeDefined();
  });

  it("configures subtle resting container borders derived from comment token at 20% opacity (#5B6A5E33)", () => {
    const theme = buildTheme(DuskGroveDark);
    const subtleBorderKeys = [
      "titleBar.border",
      "sideBar.border",
      "sideBarSectionHeader.border",
      "activityBar.border",
      "editorGroup.border",
      "panel.border",
      "panelSection.border",
      "panelSectionHeader.border",
      "statusBar.border",
    ];

    for (const key of subtleBorderKeys) {
      expect(theme.colors[key], `Key ${key} must match subtleBorder #5B6A5E33`).toBe("#5B6A5E33");
    }
  });

  it("maintains transparent borders for tabs and sidebar title", () => {
    const theme = buildTheme(DuskGroveDark);
    const transparentBorderKeys = [
      "sideBarTitle.border",
      "tab.border",
      "editorGroupHeader.tabsBorder",
      "editorGroupHeader.border",
    ];

    for (const key of transparentBorderKeys) {
      expect(theme.colors[key], `Key ${key} must be fully transparent`).toBe("#00000000");
    }
  });

  it("correctly handles font styles: italic for comments, non-italic for keywords", () => {
    const theme = buildTheme(DuskGroveDark);

    // Comments must have fontStyle: "italic" across all standard scopes
    const commentRule = theme.tokenColors.find((rule) => {
      const scopes = Array.isArray(rule.scope) ? rule.scope : [rule.scope];
      return scopes.includes("comment");
    });
    expect(commentRule).toBeDefined();
    expect(commentRule?.settings.fontStyle).toBe("italic");

    const scopes = Array.isArray(commentRule?.scope) ? commentRule.scope : [commentRule?.scope];
    expect(scopes).toContain("comment");
    expect(scopes).toContain("comment.line");
    expect(scopes).toContain("comment.block");
    expect(scopes).toContain("comment.block.documentation");

    // Semantic tokens must also enforce italic for comments
    expect(theme.semanticTokenColors.comment).toEqual({
      foreground: DuskGroveDark.syntax.comment,
      fontStyle: "italic",
    });

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
        accentHighlight: "#ebcb8b",
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

  it("compiles DuskGroveDarkSeamless into a valid theme structure with seamless border neutralization", () => {
    const theme = buildTheme(DuskGroveDarkSeamless);

    expect(theme.name).toBe("DuskGrove - Forest (Seamless)");
    expect(theme.type).toBe("dark");
    expect(theme.semanticHighlighting).toBe(true);

    // Unbroken color canvas: editor and sidebar backgrounds match exactly
    expect(theme.colors["editor.background"]).toBe("#121810");
    expect(theme.colors["sideBar.background"]).toBe("#121810");
    expect(theme.colors["editorGroupHeader.tabsBackground"]).toBe("#121810");
    expect(theme.colors["tab.activeBackground"]).toBe("#121810");
    expect(theme.colors["tab.inactiveBackground"]).toBe("#121810");

    // Seam between sidebar and editor is neutralized to transparent
    expect(theme.colors["sideBar.border"]).toBe("#00000000");

    // Generic borders for UI chrome remain intact and untouched
    expect(theme.colors["input.border"]).toBe(DuskGroveDarkSeamless.ui.border);
    expect(theme.colors["dropdown.border"]).toBe(DuskGroveDarkSeamless.ui.border);
    expect(theme.colors["notifications.border"]).toBe(DuskGroveDarkSeamless.ui.border);
    expect(DuskGroveDarkSeamless.ui.border).toBe("#757083");
  });

  it("preserves resting container borders for DuskGroveDark while neutralizing only DuskGroveDarkSeamless", () => {
    const defaultTheme = buildTheme(DuskGroveDark);
    const seamlessTheme = buildTheme(DuskGroveDarkSeamless);

    expect(defaultTheme.colors["sideBar.border"]).toBe("#5B6A5E33");
    expect(seamlessTheme.colors["sideBar.border"]).toBe("#00000000");
  });

  it("ensures DuskGroveDarkSeamless syntax and semantic tokens match DuskGroveDark verbatim", () => {
    expect(DuskGroveDarkSeamless.syntax).toEqual(DuskGroveDark.syntax);
    expect(DuskGroveDarkSeamless.semantic).toEqual(DuskGroveDark.semantic);
    expect(DuskGroveDarkSeamless.ui.bgSidebar).toBe("#121810");
    expect(DuskGroveDarkSeamless.ui.bgSidebar).toBe(DuskGroveDarkSeamless.ui.bgEditor);
    expect(DuskGroveDark.ui.bgSidebar).toBe("#1A2116");
  });

  it("compiles DuskGroveOcean and matches all 26 ground-truth keys", () => {
    const theme = buildTheme(DuskGroveOcean);

    expect(theme.name).toBe("DuskGrove - Ocean");
    expect(theme.type).toBe("dark");

    const expectedOceanKeys: Record<string, string> = {
      "titleBar.activeBackground": "#161B21",
      "titleBar.inactiveBackground": "#161B21",
      "activityBar.background": "#101318",
      "activityBarBadge.foreground": "#101318",
      "sideBar.background": "#161B21",
      "sideBarSectionHeader.background": "#161B21",
      "editor.background": "#101318",
      "editorGroupHeader.tabsBackground": "#161B21",
      "tab.activeBackground": "#101318",
      "tab.inactiveBackground": "#161B21",
      "tab.hoverBackground": "#1F252E",
      "tab.unfocusedActiveBackground": "#101318",
      "panel.background": "#101318",
      "panelSectionHeader.background": "#101318",
      "statusBar.background": "#0C0F12",
      "statusBar.debuggingForeground": "#101318",
      "statusBar.noFolderBackground": "#0C0F12",
      "statusBarItem.remoteForeground": "#101318",
      "input.background": "#0C0F12",
      "dropdown.background": "#0C0F12",
      "button.secondaryBackground": "#161B21",
      "badge.foreground": "#101318",
      "breadcrumb.background": "#101318",
      "notifications.background": "#161B21",
      "terminal.background": "#101318",
      "terminal.ansiBlack": "#101318",
    };

    for (const [key, value] of Object.entries(expectedOceanKeys)) {
      expect(theme.colors[key], `Ocean Normal key ${key} mismatch`).toBe(value);
    }
  });

  it("compiles DuskGroveOceanSeamless and matches all 26 ground-truth keys", () => {
    const theme = buildTheme(DuskGroveOceanSeamless);

    expect(theme.name).toBe("DuskGrove - Ocean (Seamless)");
    expect(theme.type).toBe("dark");

    const expectedSeamlessKeys: Record<string, string> = {
      "titleBar.activeBackground": "#101318",
      "titleBar.inactiveBackground": "#101318",
      "activityBar.background": "#101318",
      "activityBarBadge.foreground": "#101318",
      "sideBar.background": "#101318",
      "sideBarSectionHeader.background": "#101318",
      "editor.background": "#101318",
      "editorGroupHeader.tabsBackground": "#101318",
      "tab.activeBackground": "#101318",
      "tab.inactiveBackground": "#101318",
      "tab.hoverBackground": "#1F252E",
      "tab.unfocusedActiveBackground": "#101318",
      "panel.background": "#101318",
      "panelSectionHeader.background": "#101318",
      "statusBar.background": "#0C0F12",
      "statusBar.debuggingForeground": "#101318",
      "statusBar.noFolderBackground": "#0C0F12",
      "statusBarItem.remoteForeground": "#101318",
      "input.background": "#0C0F12",
      "dropdown.background": "#0C0F12",
      "button.secondaryBackground": "#101318",
      "badge.foreground": "#101318",
      "breadcrumb.background": "#101318",
      "notifications.background": "#101318",
      "terminal.background": "#101318",
      "terminal.ansiBlack": "#101318",
    };

    for (const [key, value] of Object.entries(expectedSeamlessKeys)) {
      expect(theme.colors[key], `Ocean Seamless key ${key} mismatch`).toBe(value);
    }
  });

  it("diffing DuskGroveOcean against DuskGroveDark shows exactly the 26 keys", () => {
    const forestTheme = buildTheme(DuskGroveDark);
    const oceanTheme = buildTheme(DuskGroveOcean);

    const diffKeys: string[] = [];
    const allKeys = new Set([
      ...Object.keys(forestTheme.colors),
      ...Object.keys(oceanTheme.colors),
    ]);
    for (const key of allKeys) {
      if (forestTheme.colors[key] !== oceanTheme.colors[key]) {
        diffKeys.push(key);
      }
    }

    expect(diffKeys.length).toBe(26);
  });

  it("diffing DuskGroveOceanSeamless against DuskGroveOcean shows exactly the 8 keys", () => {
    const oceanTheme = buildTheme(DuskGroveOcean);
    const seamlessTheme = buildTheme(DuskGroveOceanSeamless);

    const diffKeys: string[] = [];
    const allKeys = new Set([
      ...Object.keys(oceanTheme.colors),
      ...Object.keys(seamlessTheme.colors),
    ]);
    for (const key of allKeys) {
      if (oceanTheme.colors[key] !== seamlessTheme.colors[key]) {
        diffKeys.push(key);
      }
    }

    const expected8Keys = [
      "titleBar.activeBackground",
      "titleBar.inactiveBackground",
      "sideBar.background",
      "sideBarSectionHeader.background",
      "editorGroupHeader.tabsBackground",
      "tab.inactiveBackground",
      "button.secondaryBackground",
      "notifications.background",
    ].sort();

    expect(diffKeys.sort()).toEqual(expected8Keys);
  });
});
