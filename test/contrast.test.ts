/**
 * @file contrast.test.ts
 * @description Unit tests for WCAG 2.1 contrast calculations and theme variant readability.
 */

import { describe, it, expect } from "vitest";
import {
  calculateContrastRatio,
  calculateLuminance,
  validateVariantContrast,
} from "../src/validate/contrast.js";
import { DuskGroveDark, tokenVariants } from "../src/tokens/index.js";
import { ColorTokenSet } from "../src/tokens/types.js";
import { buildTheme } from "../src/build/buildTheme.js";

describe("WCAG relative luminance and contrast engine", () => {
  it("computes standard luminances correctly", () => {
    expect(calculateLuminance("#000000")).toBeCloseTo(0, 4);
    expect(calculateLuminance("#FFFFFF")).toBeCloseTo(1, 4);
  });

  it("calculates contrast ratio between extremes correctly", () => {
    const blackAndWhiteRatio = calculateContrastRatio("#000000", "#FFFFFF");
    expect(blackAndWhiteRatio).toBe(21);

    const sameColorRatio = calculateContrastRatio("#121810", "#121810");
    expect(sameColorRatio).toBe(1);
  });

  it("ensures DuskGroveDark passes all WCAG contrast thresholds", () => {
    const report = validateVariantContrast(DuskGroveDark);

    expect(report.passed).toBe(true);

    const fgPrimaryCheck = report.checks.find((c) => c.name === "fgPrimary vs bgEditor");
    expect(fgPrimaryCheck?.passed).toBe(true);
    expect(fgPrimaryCheck?.ratio).toBeGreaterThanOrEqual(4.5);

    const fgMutedCheck = report.checks.find((c) => c.name === "fgMuted vs bgEditor");
    expect(fgMutedCheck?.passed).toBe(true);
    expect(fgMutedCheck?.ratio).toBeGreaterThanOrEqual(3.0);

    const accentEditorCheck = report.checks.find((c) => c.name === "accentHighlight vs bgEditor");
    expect(accentEditorCheck?.passed).toBe(true);
    expect(accentEditorCheck?.ratio).toBeGreaterThanOrEqual(3.0);

    const accentSidebarCheck = report.checks.find((c) => c.name === "accentHighlight vs bgSidebar");
    expect(accentSidebarCheck?.passed).toBe(true);
    expect(accentSidebarCheck?.ratio).toBeGreaterThanOrEqual(3.0);

    const panelActiveFgCheck = report.checks.find(
      (c) => c.name === "panelTitle.activeForeground vs panel.background",
    );
    expect(panelActiveFgCheck?.passed).toBe(true);
    expect(panelActiveFgCheck?.ratio).toBeGreaterThanOrEqual(3.0);

    const panelInactiveFgCheck = report.checks.find(
      (c) => c.name === "panelTitle.inactiveForeground vs panel.background",
    );
    expect(panelInactiveFgCheck?.passed).toBe(true);
    expect(panelInactiveFgCheck?.ratio).toBeGreaterThanOrEqual(3.0);

    const panelActiveBorderCheck = report.checks.find(
      (c) => c.name === "panelTitle.activeBorder vs panel.background",
    );
    expect(panelActiveBorderCheck?.passed).toBe(true);
    expect(panelActiveBorderCheck?.ratio).toBeGreaterThanOrEqual(3.0);

    const semanticChecks = report.checks.filter((c) => c.name.startsWith("semantic."));
    for (const check of semanticChecks) {
      expect(check.passed, `Check ${check.name} failed with ratio ${check.ratio}`).toBe(true);
      expect(check.ratio).toBeGreaterThanOrEqual(3.0);
    }
  });

  it("ensures all 10 syntax roles pass contrast thresholds against bgEditor", () => {
    const bg = DuskGroveDark.ui.bgEditor;
    const syntax = DuskGroveDark.syntax;

    // Body-weight / primary syntax roles (>= 4.5:1)
    const primaryRoles: Array<keyof typeof syntax> = [
      "keyword",
      "string",
      "numberConstant",
      "function",
      "typeClass",
      "variable",
      "tag",
      "attribute",
    ];

    for (const role of primaryRoles) {
      const ratio = calculateContrastRatio(syntax[role], bg);
      expect(
        ratio,
        `Syntax role ${role} (${syntax[role]}) failed contrast check: ${ratio} < 4.5:1`,
      ).toBeGreaterThanOrEqual(4.5);
    }

    // De-emphasized roles (>= 3.0:1)
    const deEmphasizedRoles: Array<keyof typeof syntax> = ["comment", "operatorPunctuation"];

    for (const role of deEmphasizedRoles) {
      const ratio = calculateContrastRatio(syntax[role], bg);
      expect(
        ratio,
        `Syntax role ${role} (${syntax[role]}) failed contrast check: ${ratio} < 3.0:1`,
      ).toBeGreaterThanOrEqual(3.0);
    }
  });

  it("confirms variable specifically satisfies bgEditor (>=4.5:1) and bgSelection contrast", () => {
    const editorRatio = calculateContrastRatio(
      DuskGroveDark.syntax.variable,
      DuskGroveDark.ui.bgEditor,
    );
    expect(editorRatio).toBeGreaterThanOrEqual(4.5);
    expect(editorRatio).toBeCloseTo(6.88, 1);

    const selectionRatio = calculateContrastRatio(
      DuskGroveDark.syntax.variable,
      DuskGroveDark.ui.bgSelection,
    );
    expect(selectionRatio).toBeGreaterThanOrEqual(3.0);
  });

  it("confirms string specifically satisfies bgEditor with >= 4.5:1 (approx 7.0:1)", () => {
    const stringRatio = calculateContrastRatio(
      DuskGroveDark.syntax.string,
      DuskGroveDark.ui.bgEditor,
    );
    expect(stringRatio).toBeGreaterThanOrEqual(4.5);
    expect(stringRatio).toBeCloseTo(7.02, 1);
  });

  it("confirms accentHighlight satisfies both bgEditor and bgSidebar non-text UI contrast (>= 3.0:1)", () => {
    const editorRatio = calculateContrastRatio(
      DuskGroveDark.ui.accentHighlight,
      DuskGroveDark.ui.bgEditor,
    );
    expect(editorRatio).toBeGreaterThanOrEqual(3.0);
    expect(editorRatio).toBeCloseTo(7.08, 1);

    const sidebarRatio = calculateContrastRatio(
      DuskGroveDark.ui.accentHighlight,
      DuskGroveDark.ui.bgSidebar,
    );
    expect(sidebarRatio).toBeGreaterThanOrEqual(3.0);
    expect(sidebarRatio).toBeCloseTo(6.48, 1);
  });

  it("confirms panelTitle elements satisfy contrast requirements against panel.background (bgEditor)", () => {
    const theme = buildTheme(DuskGroveDark);
    const panelBg = theme.colors["panel.background"];
    expect(panelBg).toBe(DuskGroveDark.ui.bgEditor);

    const activeFgRatio = calculateContrastRatio(
      theme.colors["panelTitle.activeForeground"],
      panelBg,
    );
    expect(activeFgRatio).toBeGreaterThanOrEqual(3.0);
    expect(activeFgRatio).toBeCloseTo(10.1, 1);

    const inactiveFgRatio = calculateContrastRatio(
      theme.colors["panelTitle.inactiveForeground"],
      panelBg,
    );
    expect(inactiveFgRatio).toBeGreaterThanOrEqual(3.0);
    expect(inactiveFgRatio).toBeCloseTo(5.95, 1);

    const activeBorderRatio = calculateContrastRatio(
      theme.colors["panelTitle.activeBorder"],
      panelBg,
    );
    expect(activeBorderRatio).toBeGreaterThanOrEqual(3.0);
    expect(activeBorderRatio).toBeCloseTo(7.08, 1);
  });

  it("validates that all registered variants pass contrast checks", () => {
    for (const variant of tokenVariants) {
      const report = validateVariantContrast(variant);
      expect(
        report.passed,
        `Variant ${variant.meta.id} failed contrast checks: ${JSON.stringify(report.checks.filter((c) => !c.passed))}`,
      ).toBe(true);
    }
  });

  it("accurately catches unreadable colors in failing variants", () => {
    const unreadableVariant: ColorTokenSet = {
      ...DuskGroveDark,
      meta: { id: "bad-contrast", label: "Bad Contrast", type: "dark" },
      ui: {
        ...DuskGroveDark.ui,
        // fgPrimary nearly identical to bgEditor (#121810)
        fgPrimary: "#141a12",
      },
    };

    const report = validateVariantContrast(unreadableVariant);
    expect(report.passed).toBe(false);

    const failedCheck = report.checks.find((c) => c.name === "fgPrimary vs bgEditor");
    expect(failedCheck?.passed).toBe(false);
    expect(failedCheck?.ratio).toBeLessThan(4.5);
  });
});
