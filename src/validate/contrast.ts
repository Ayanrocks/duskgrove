/**
 * @file contrast.ts
 * @description WCAG 2.1 relative luminance and contrast ratio validation engine.
 * Ensures all theme variants adhere to strict readability standards.
 */

import { ColorTokenSet } from "../tokens/types.js";
import { hexToRgb } from "../build/colorUtils.js";

/**
 * Result descriptor for a single contrast assertion.
 */
export interface ContrastCheckItem {
  name: string;
  foreground: string;
  background: string;
  ratio: number;
  requiredRatio: number;
  passed: boolean;
}

/**
 * Comprehensive contrast validation report for a theme variant.
 */
export interface ContrastReport {
  variantId: string;
  passed: boolean;
  checks: ContrastCheckItem[];
}

/**
 * Calculates WCAG 2.1 relative luminance for a given hex color.
 *
 * @see https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 * @param hex - Color hex string
 * @returns Relative luminance value between 0.0 and 1.0
 */
export function calculateLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);

  const linearize = (channel: number): number => {
    const sRGB = channel / 255;
    return sRGB <= 0.04045 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  };

  const rLinear = linearize(r);
  const gLinear = linearize(g);
  const bLinear = linearize(b);

  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
}

/**
 * Calculates the WCAG contrast ratio between two colors.
 *
 * @param foregroundHex - Foreground color hex
 * @param backgroundHex - Background color hex
 * @returns Contrast ratio formatted to two decimal places (e.g. 4.54)
 */
export function calculateContrastRatio(foregroundHex: string, backgroundHex: string): number {
  const l1 = calculateLuminance(foregroundHex);
  const l2 = calculateLuminance(backgroundHex);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  const ratio = (lighter + 0.05) / (darker + 0.05);
  return Math.round(ratio * 100) / 100;
}

/**
 * Validates all required contrast ratios for a theme variant against the editor background.
 *
 * Requirements:
 * - `fgPrimary` vs `bgEditor` >= 4.5:1 (WCAG AA normal text)
 * - `fgMuted` vs `bgEditor` >= 3.0:1 (WCAG AA large text / UI elements)
 * - `semantic.error` vs `bgEditor` >= 3.0:1
 * - `semantic.warning` vs `bgEditor` >= 3.0:1
 * - `semantic.info` vs `bgEditor` >= 3.0:1
 * - `semantic.success` vs `bgEditor` >= 3.0:1
 *
 * @param tokens - The variant token set to validate
 * @returns Complete contrast report with pass/fail status
 */
export function validateVariantContrast(tokens: ColorTokenSet): ContrastReport {
  const bg = tokens.ui.bgEditor;

  const checks: ContrastCheckItem[] = [
    {
      name: "fgPrimary vs bgEditor",
      foreground: tokens.ui.fgPrimary,
      background: bg,
      ratio: calculateContrastRatio(tokens.ui.fgPrimary, bg),
      requiredRatio: 4.5,
      passed: false,
    },
    {
      name: "fgMuted vs bgEditor",
      foreground: tokens.ui.fgMuted,
      background: bg,
      ratio: calculateContrastRatio(tokens.ui.fgMuted, bg),
      requiredRatio: 3.0,
      passed: false,
    },
    {
      name: "semantic.error vs bgEditor",
      foreground: tokens.semantic.error,
      background: bg,
      ratio: calculateContrastRatio(tokens.semantic.error, bg),
      requiredRatio: 3.0,
      passed: false,
    },
    {
      name: "semantic.warning vs bgEditor",
      foreground: tokens.semantic.warning,
      background: bg,
      ratio: calculateContrastRatio(tokens.semantic.warning, bg),
      requiredRatio: 3.0,
      passed: false,
    },
    {
      name: "semantic.info vs bgEditor",
      foreground: tokens.semantic.info,
      background: bg,
      ratio: calculateContrastRatio(tokens.semantic.info, bg),
      requiredRatio: 3.0,
      passed: false,
    },
    {
      name: "semantic.success vs bgEditor",
      foreground: tokens.semantic.success,
      background: bg,
      ratio: calculateContrastRatio(tokens.semantic.success, bg),
      requiredRatio: 3.0,
      passed: false,
    },
  ];

  // Evaluate pass/fail for each check
  for (const check of checks) {
    check.passed = check.ratio >= check.requiredRatio;
  }

  const allPassed = checks.every((check) => check.passed);

  return {
    variantId: tokens.meta.id,
    passed: allPassed,
    checks,
  };
}
