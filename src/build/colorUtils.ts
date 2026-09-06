/**
 * @file colorUtils.ts
 * @description Mathematical color manipulation utilities for consistent palette derivation.
 * Provides HSL-based lighten/darken operations and hex alpha compositing.
 */

export interface RgbColor {
  r: number;
  g: number;
  b: number;
}

export interface HslColor {
  h: number;
  s: number;
  l: number;
}

/**
 * Parses a 3, 6, or 8 character hex color into RGB components.
 *
 * @param hex - Color hex string (with or without leading #)
 * @returns RGB object with values in range [0, 255]
 */
export function hexToRgb(hex: string): RgbColor {
  const sanitized = hex.replace(/^#/, "");

  if (sanitized.length === 3) {
    const r = parseInt(sanitized[0] + sanitized[0], 16);
    const g = parseInt(sanitized[1] + sanitized[1], 16);
    const b = parseInt(sanitized[2] + sanitized[2], 16);
    return { r, g, b };
  }

  if (sanitized.length === 6 || sanitized.length === 8) {
    const r = parseInt(sanitized.slice(0, 2), 16);
    const g = parseInt(sanitized.slice(2, 4), 16);
    const b = parseInt(sanitized.slice(4, 6), 16);
    return { r, g, b };
  }

  throw new Error(`Invalid hex color string: "${hex}"`);
}

/**
 * Formats RGB components into a standard 6-digit uppercase hex string.
 *
 * @param r - Red component [0, 255]
 * @param g - Green component [0, 255]
 * @param b - Blue component [0, 255]
 * @returns Uppercase hex string, e.g. "#1A2116"
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (val: number) => Math.max(0, Math.min(255, Math.round(val)));
  const toHex = (val: number) => clamp(val).toString(16).padStart(2, "0").toUpperCase();
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Converts RGB components to HSL representation.
 *
 * @param r - Red [0, 255]
 * @param g - Green [0, 255]
 * @param b - Blue [0, 255]
 * @returns HSL object with h in [0, 360], s in [0, 100], l in [0, 100]
 */
export function rgbToHsl(r: number, g: number, b: number): HslColor {
  const normalizedR = r / 255;
  const normalizedG = g / 255;
  const normalizedB = b / 255;

  const max = Math.max(normalizedR, normalizedG, normalizedB);
  const min = Math.min(normalizedR, normalizedG, normalizedB);
  const delta = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    switch (max) {
      case normalizedR:
        h = (normalizedG - normalizedB) / delta + (normalizedG < normalizedB ? 6 : 0);
        break;
      case normalizedG:
        h = (normalizedB - normalizedR) / delta + 2;
        break;
      case normalizedB:
        h = (normalizedR - normalizedG) / delta + 4;
        break;
    }

    h = h / 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/**
 * Converts HSL components to RGB representation.
 *
 * @param h - Hue [0, 360]
 * @param s - Saturation [0, 100]
 * @param l - Lightness [0, 100]
 * @returns RGB object with values in range [0, 255]
 */
export function hslToRgb(h: number, s: number, l: number): RgbColor {
  const normalizedH = (h % 360) / 360;
  const normalizedS = Math.max(0, Math.min(100, s)) / 100;
  const normalizedL = Math.max(0, Math.min(100, l)) / 100;

  if (normalizedS === 0) {
    const grey = Math.round(normalizedL * 255);
    return { r: grey, g: grey, b: grey };
  }

  const hue2rgb = (p: number, q: number, t: number): number => {
    let normalizedT = t;
    if (normalizedT < 0) normalizedT += 1;
    if (normalizedT > 1) normalizedT -= 1;
    if (normalizedT < 1 / 6) return p + (q - p) * 6 * normalizedT;
    if (normalizedT < 1 / 2) return q;
    if (normalizedT < 2 / 3) return p + (q - p) * (2 / 3 - normalizedT) * 6;
    return p;
  };

  const q =
    normalizedL < 0.5
      ? normalizedL * (1 + normalizedS)
      : normalizedL + normalizedS - normalizedL * normalizedS;
  const p = 2 * normalizedL - q;

  const r = Math.round(hue2rgb(p, q, normalizedH + 1 / 3) * 255);
  const g = Math.round(hue2rgb(p, q, normalizedH) * 255);
  const b = Math.round(hue2rgb(p, q, normalizedH - 1 / 3) * 255);

  return { r, g, b };
}

/**
 * Lightens a hex color by a specified lightness percentage.
 *
 * @param hex - Starting hex color
 * @param percent - Lightness increment percentage (e.g. 5 for +5% lightness)
 * @returns New hex color string
 */
export function lighten(hex: string, percent: number): string {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const newL = Math.min(100, Math.max(0, hsl.l + percent));
  const newRgb = hslToRgb(hsl.h, hsl.s, newL);
  return rgbToHex(newRgb.r, newRgb.g, newRgb.b);
}

/**
 * Darkens a hex color by a specified lightness percentage.
 *
 * @param hex - Starting hex color
 * @param percent - Lightness decrement percentage (e.g. 5 for -5% lightness)
 * @returns New hex color string
 */
export function darken(hex: string, percent: number): string {
  return lighten(hex, -percent);
}

/**
 * Adds an alpha channel to a 6-character hex color string.
 *
 * @param hex - 6-character hex color string
 * @param alpha - Alpha value between 0.0 (transparent) and 1.0 (opaque)
 * @returns 8-character hex color string (e.g. #12181080)
 */
export function withAlpha(hex: string, alpha: number): string {
  const base = hex.startsWith("#") ? hex.slice(0, 7) : `#${hex.slice(0, 6)}`;
  const clamped = Math.max(0, Math.min(1, alpha));
  const alphaHex = Math.round(clamped * 255)
    .toString(16)
    .padStart(2, "0")
    .toUpperCase();
  return `${base}${alphaHex}`;
}
