/**
 * @file semanticTokenMapping.ts
 * @description Maps abstract `ColorTokenSet` to VS Code LSP `semanticTokenColors`.
 * Ensures rich semantic fidelity across language servers (e.g. TypeScript, Rust-Analyzer, Pyright).
 */

import { ColorTokenSet } from "../tokens/types.js";

/**
 * Detailed style object for semantic tokens.
 */
export interface SemanticTokenStyle {
  foreground?: string;
  fontStyle?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}

/**
 * Generates the semanticTokenColors dictionary for a given token set.
 *
 * @param tokens - The variant token set
 * @returns Record of semantic token selectors to hex colors or style descriptors
 */
export function generateSemanticTokenColors(
  tokens: ColorTokenSet,
): Record<string, string | SemanticTokenStyle> {
  const { syntax } = tokens;

  return {
    // Functions & Callables
    function: syntax.function,
    "function.declaration": syntax.function,
    method: syntax.function,
    "method.declaration": syntax.function,
    macro: syntax.function,

    // Variables & Parameters
    variable: syntax.variable,
    "variable.declaration": syntax.variable,
    "variable.readonly": syntax.variable,
    "variable.defaultLibrary": syntax.variable,
    parameter: syntax.variable,

    // Properties & Members
    property: syntax.attribute,
    "property.declaration": syntax.attribute,
    "property.readonly": syntax.attribute,
    enumMember: syntax.numberConstant,

    // Types & Structure
    class: syntax.typeClass,
    interface: syntax.typeClass,
    enum: syntax.typeClass,
    type: syntax.typeClass,
    typeParameter: syntax.typeClass,
    struct: syntax.typeClass,
    namespace: syntax.typeClass,

    // Literals & Keywords
    keyword: syntax.keyword,
    string: syntax.string,
    number: syntax.numberConstant,
    operator: syntax.operatorPunctuation,

    // Comments: strictly italic
    comment: {
      foreground: syntax.comment,
      fontStyle: "italic",
    },
  };
}
