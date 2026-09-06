/**
 * @file gloaming-dark.ts
 * @description Default dark variant for Gloaming (DuskGrove).
 * Inspired by twilight woodland canopies: deep mossy forest shadows (#121810),
 * pine bark (#1A2116), dusky heather (#474056), and sage canopy highlights (#B9C6AE).
 */

import { ColorTokenSet } from "./types.js";

export const GloamingDark: ColorTokenSet = {
  meta: {
    id: "gloaming-dark",
    label: "Gloaming",
    type: "dark",
  },
  ui: {
    bgEditor: "#121810",
    bgSidebar: "#1A2116",
    bgSelection: "#474056",
    bgPanel: "#474056",
    border: "#757083",
    fgMuted: "#8A95A5",
    fgPrimary: "#B9C6AE",
  },
  // Design rationale: two hue families only — a warm orange family (`keyword`, `tag`, `attribute`)
  // for declarative/structural constructs, and a sage/teal family (`function`, `typeClass`,
  // string, `numberConstant`, `variable`) for everything else, with `variable` intentionally
  // matching `ui.fgPrimary` so the most frequent token type recedes into body text rather
  // than competing for attention. `comment` and `operatorPunctuation` stay desaturated and
  // low-contrast by design.
  syntax: {
    keyword: "#E2A06E",
    string: "#A9C9A0",
    numberConstant: "#C2CBA0",
    function: "#72B5A0",
    typeClass: "#8FC9B8",
    variable: "#B9C6AE",
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

export const DuskGroveDark = GloamingDark;
