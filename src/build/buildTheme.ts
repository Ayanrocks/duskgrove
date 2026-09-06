/**
 * @file buildTheme.ts
 * @description Core compiler combining UI, syntax, and semantic token mappings into a VS Code theme JSON object.
 */

import { ColorTokenSet } from "../tokens/types.js";
import { generateUiColors } from "./uiMapping.js";
import { generateSyntaxColors, TextMateTokenRule } from "./syntaxMapping.js";
import { generateSemanticTokenColors, SemanticTokenStyle } from "./semanticTokenMapping.js";

/**
 * Complete VS Code Theme JSON specification.
 */
export interface VSCodeTheme {
  name: string;
  type: "dark" | "light" | "hc";
  semanticHighlighting: boolean;
  colors: Record<string, string>;
  tokenColors: TextMateTokenRule[];
  semanticTokenColors: Record<string, string | SemanticTokenStyle>;
}

/**
 * Normalizes internal variant type to VS Code theme type schema.
 *
 * @param type - Variant type
 * @returns VS Code type classification
 */
function mapThemeType(type: "dark" | "light" | "hc-dark" | "hc-light"): "dark" | "light" | "hc" {
  if (type === "hc-dark" || type === "hc-light") {
    return "hc";
  }
  return type;
}

/**
 * Compiles a `ColorTokenSet` into a declarative VS Code theme JSON structure.
 *
 * @param tokens - The variant token set to compile
 * @returns Fully compiled VSCodeTheme object ready for serialization
 */
export function buildTheme(tokens: ColorTokenSet): VSCodeTheme {
  return {
    name: tokens.meta.label,
    type: mapThemeType(tokens.meta.type),
    semanticHighlighting: true,
    colors: generateUiColors(tokens),
    tokenColors: generateSyntaxColors(tokens),
    semanticTokenColors: generateSemanticTokenColors(tokens),
  };
}
