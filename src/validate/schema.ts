/**
 * @file schema.ts
 * @description Zod schema definitions validating VS Code theme JSON outputs against official specifications.
 */

import { z } from "zod";

/**
 * Validates a 3, 6, or 8 digit hexadecimal color string.
 */
export const hexColorSchema = z
  .string()
  .regex(
    /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/,
    "Must be a valid 3-, 6-, or 8-digit hexadecimal color string starting with #",
  );

/**
 * Validates TextMate scope settings.
 */
export const textMateSettingsSchema = z.object({
  foreground: hexColorSchema.optional(),
  fontStyle: z
    .string()
    .regex(/^(italic|bold|underline|italic bold|bold italic|)$/)
    .optional(),
});

/**
 * Validates a single TextMate syntax highlighting rule.
 */
export const textMateRuleSchema = z.object({
  name: z.string().optional(),
  scope: z.union([z.string(), z.array(z.string())]),
  settings: textMateSettingsSchema,
});

/**
 * Validates semantic token style object or direct hex color string.
 */
export const semanticTokenStyleSchema = z.union([
  hexColorSchema,
  z.object({
    foreground: hexColorSchema.optional(),
    fontStyle: z.string().optional(),
    bold: z.boolean().optional(),
    italic: z.boolean().optional(),
    underline: z.boolean().optional(),
  }),
]);

/**
 * Validates the complete compiled VS Code Theme JSON structure.
 */
export const vsCodeThemeSchema = z.object({
  name: z.string().min(1, "Theme name is required"),
  type: z.enum(["dark", "light", "hc"]),
  semanticHighlighting: z.literal(true),
  colors: z.record(hexColorSchema),
  tokenColors: z.array(textMateRuleSchema).min(1, "Must contain at least one TextMate token rule"),
  semanticTokenColors: z.record(semanticTokenStyleSchema),
});

export type ValidatedVSCodeTheme = z.infer<typeof vsCodeThemeSchema>;

/**
 * Validates a theme object against the schema and throws a structured error on failure.
 *
 * @param theme - The raw theme object to validate
 * @returns Parsed and validated theme object
 */
export function validateTheme(theme: unknown): ValidatedVSCodeTheme {
  return vsCodeThemeSchema.parse(theme);
}
