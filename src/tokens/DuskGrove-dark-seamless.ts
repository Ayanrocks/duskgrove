/**
 * @file DuskGrove-dark-seamless.ts
 * @description Seamless dark variant for DuskGrove.
 * Blends editor and sidebar into an unbroken twilight woodland canopy field (#121810),
 * paired with dusky heather (#474056) and sage canopy highlights (#B9C6AE).
 */

import { ColorTokenSet } from "./types.js";

export const DuskGroveDarkSeamless: ColorTokenSet = {
  meta: {
    id: "DuskGrove-dark-seamless",
    label: "DuskGrove - Forest (Seamless)",
    type: "dark",
    seamless: true,
  },
  ui: {
    bgEditor: "#121810",
    bgSidebar: "#121810",
    bgSelection: "#474056",
    bgPanel: "#474056",
    border: "#757083",
    fgMuted: "#8A95A5",
    fgPrimary: "#B9C6AE",
    accentHighlight: "#BE9E5F",
  },
  // Design rationale: Two hue families carry structural accents — warm orange (`keyword`, `tag`, `attribute`)
  // for declarative/structural constructs, and sage/teal (`function`, `typeClass`, `numberConstant`)
  // for callable and type definitions. `string` is locked to steel-blue/azure (`#82A6C0`, 205°),
  // giving string literals distinct chromatic separation (44° clear of teal) while matching the
  // mid-range saturation/lightness band. `variable` is a dedicated low-saturation warm gray (`#A2A096`, ~5% S)
  // so identifiers read as calm neutral body text. `comment` and `operatorPunctuation` stay desaturated
  // and low-contrast by design.
  syntax: {
    keyword: "#E2A06E",
    string: "#82A6C0",
    numberConstant: "#C2CBA0",
    function: "#72B5A0",
    typeClass: "#8FC9B8",
    variable: "#A2A096",
    comment: "#5B6A5E",
    operatorPunctuation: "#6C7A70",
    tag: "#C97D46",
    attribute: "#D9B98A",
  },
  semantic: {
    error: "#D9707A",
    warning: "#E0B168",
    info: "#8AB4D8",
    success: "#8FC98A",
  },
};
