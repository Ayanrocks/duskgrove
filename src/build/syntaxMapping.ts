/**
 * @file syntaxMapping.ts
 * @description Maps abstract `ColorTokenSet` syntax tokens to standard TextMate grammars.
 * Enforces design guideline: `fontStyle: "italic"` is strictly reserved for comments.
 */

import { ColorTokenSet } from "../tokens/types.js";

/**
 * TextMate token rule structure conforming to VS Code theme specification.
 */
export interface TextMateTokenRule {
  name?: string;
  scope: string | string[];
  settings: {
    foreground?: string;
    fontStyle?: string;
  };
}

/**
 * Generates the complete array of TextMate token rules for a given variant token set.
 *
 * @param tokens - The variant token set
 * @returns Array of TextMate token styling rules
 */
export function generateSyntaxColors(tokens: ColorTokenSet): TextMateTokenRule[] {
  const { syntax, semantic } = tokens;

  return [
    // Comments: strictly italicized for visual distinction
    {
      name: "Comments and comment punctuation",
      scope: [
        "comment",
        "comment.line",
        "comment.block",
        "comment.block.documentation",
        "punctuation.definition.comment",
      ],
      settings: {
        foreground: syntax.comment,
        fontStyle: "italic",
      },
    },

    // Keywords & Storage: strictly non-italic per accessibility guidelines
    {
      name: "Keywords, control flow, and storage modifiers",
      scope: [
        "keyword",
        "keyword.control",
        "keyword.other",
        "storage",
        "storage.type",
        "storage.modifier",
      ],
      settings: {
        foreground: syntax.keyword,
      },
    },

    // Strings & Characters
    {
      name: "Strings, quoted values, and template literals",
      scope: [
        "string",
        "string.quoted",
        "string.quoted.single",
        "string.quoted.double",
        "string.template",
        "punctuation.definition.string",
      ],
      settings: {
        foreground: syntax.string,
      },
    },

    // Numbers & Constants
    {
      name: "Numbers, numeric units, and language constants",
      scope: [
        "constant",
        "constant.numeric",
        "constant.language",
        "constant.character",
        "constant.other",
      ],
      settings: {
        foreground: syntax.numberConstant,
      },
    },

    // Functions & Methods
    {
      name: "Function definitions, invocations, and built-in functions",
      scope: [
        "entity.name.function",
        "support.function",
        "meta.function-call",
        "variable.function",
      ],
      settings: {
        foreground: syntax.function,
      },
    },

    // Types, Classes, and Interfaces
    {
      name: "Types, classes, interfaces, primitives, and namespaces",
      scope: [
        "entity.name.type",
        "entity.name.class",
        "entity.name.namespace",
        "entity.name.scope-resolution",
        "entity.other.inherited-class",
        "support.type",
        "support.class",
      ],
      settings: {
        foreground: syntax.typeClass,
      },
    },

    // Variables & Parameters
    {
      name: "Variables, parameters, and identifiers",
      scope: ["variable", "variable.other", "variable.parameter", "meta.parameter"],
      settings: {
        foreground: syntax.variable,
      },
    },

    // Operators & Punctuation
    {
      name: "Operators, delimiters, and punctuation",
      scope: [
        "keyword.operator",
        "punctuation",
        "punctuation.separator",
        "punctuation.terminator",
        "meta.brace",
      ],
      settings: {
        foreground: syntax.operatorPunctuation,
      },
    },

    // HTML / XML / JSX Tags
    {
      name: "Markup and component tags",
      scope: ["entity.name.tag", "meta.tag"],
      settings: {
        foreground: syntax.tag,
      },
    },

    // HTML / XML / CSS Attributes
    {
      name: "Attributes and object properties",
      scope: ["entity.other.attribute-name", "meta.attribute", "support.type.property-name"],
      settings: {
        foreground: syntax.attribute,
      },
    },

    // Markdown / Documentation Headings
    {
      name: "Markdown headings",
      scope: [
        "heading.1.markdown",
        "heading.2.markdown",
        "heading.3.markdown",
        "entity.name.section.markdown",
      ],
      settings: {
        foreground: syntax.keyword,
      },
    },

    // Markdown Links & URLs
    {
      name: "Markdown links and raw URLs",
      scope: ["markup.underline.link", "string.other.link"],
      settings: {
        foreground: syntax.function,
      },
    },

    // Markdown Bold
    {
      name: "Markdown bold text",
      scope: ["markup.bold"],
      settings: {
        foreground: syntax.numberConstant,
        fontStyle: "bold",
      },
    },

    // Markdown Italic
    {
      name: "Markdown italic text",
      scope: ["markup.italic"],
      settings: {
        foreground: syntax.typeClass,
        fontStyle: "italic",
      },
    },

    // JSON Keys
    {
      name: "JSON property keys",
      scope: [
        "support.type.property-name.json",
        "source.json meta.structure.dictionary.json > string.quoted.json",
      ],
      settings: {
        foreground: syntax.attribute,
      },
    },

    // Invalid / Deprecated scopes (matching semantic error/warning)
    {
      name: "Invalid syntax or deprecated constructs",
      scope: ["invalid", "invalid.illegal"],
      settings: {
        foreground: semantic.error,
      },
    },
    {
      name: "Deprecated syntax",
      scope: ["invalid.deprecated"],
      settings: {
        foreground: semantic.warning,
      },
    },
  ];
}
