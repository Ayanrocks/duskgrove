/**
 * @file types.ts
 * @description Core token interfaces defining the contract for all DuskGrove theme variants.
 * Any new variant (e.g. Light, High Contrast) must satisfy `ColorTokenSet`.
 */

/**
 * Metadata identifying a theme variant.
 */
export interface ThemeMeta {
  /** Unique variant identifier used in file naming, e.g. "DuskGrove-dark" */
  id: string;
  /** Human-readable display label shown in VS Code theme picker, e.g. "DuskGrove" */
  label: string;
  /** VS Code base theme type classification */
  type: "dark" | "light" | "hc-dark" | "hc-light";
}

/**
 * Workbench UI surface tokens.
 */
export interface UiTokens {
  /** Background of the code editor canvas */
  bgEditor: string;
  /** Background of sidebars, tree views, and explorer */
  bgSidebar: string;
  /** Selection highlights in editor and lists */
  bgSelection: string;
  /** Background of bottom panels, output, and terminal */
  bgPanel: string;
  /** Structural borders between workbench sections */
  border: string;
  /** Secondary text, inactive tabs, and line numbers */
  fgMuted: string;
  /** Primary text, active tab labels, and prominent UI elements */
  fgPrimary: string;
}

/**
 * Syntax highlighting tokens consumed by TextMate scope mappings.
 */
export interface SyntaxTokens {
  /** Language keywords, storage types, and flow control */
  keyword: string;
  /** String literals and interpolated template strings */
  string: string;
  /** Numeric values, booleans, and character constants */
  numberConstant: string;
  /** Function names, method calls, and invocations */
  function: string;
  /** Classes, interfaces, type aliases, and type annotations */
  typeClass: string;
  /** Local variables, parameters, and identifiers */
  variable: string;
  /** Inline and block code comments */
  comment: string;
  /** Operators (+, -, =) and punctuation (braces, commas, semicolons) */
  operatorPunctuation: string;
  /** HTML/XML/JSX element tag names */
  tag: string;
  /** HTML/XML/JSX attributes and CSS properties */
  attribute: string;
}

/**
 * Semantic status and diagnostic feedback tokens.
 */
export interface SemanticTokens {
  /** Errors, lint failures, and git deletions */
  error: string;
  /** Warnings, caution alerts, and git modifications */
  warning: string;
  /** Informational badges, hints, and suggestions */
  info: string;
  /** Success states, passing tests, and git additions */
  success: string;
}

/**
 * Complete token set contract that every DuskGrove variant must satisfy.
 */
export interface ColorTokenSet {
  meta: ThemeMeta;
  ui: UiTokens;
  syntax: SyntaxTokens;
  semantic: SemanticTokens;
}
