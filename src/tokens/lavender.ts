/**
 * @file lavender.ts
 * @description Lavender variants for DuskGrove.
 * Reuses Forest's structural UI and semantic colors while rotating the editor
 * and sidebar surfaces to a deep lavender hue. Syntax colors are brightened
 * independently to retain separation on the new background.
 */

import { DuskGroveDark } from "./DuskGrove-dark.js";
import { ColorTokenSet } from "./types.js";

export const DuskGroveLavender: ColorTokenSet = {
  meta: {
    id: "DuskGrove-lavender",
    label: "DuskGrove - Lavender",
    type: "dark",
  },
  ui: {
    ...DuskGroveDark.ui,
    bgEditor: "#131018",
    bgSidebar: "#1A1622",
  },
  syntax: {
    keyword: "#E8B38A",
    tag: "#CF8B5A",
    attribute: "#E2CAA6",
    function: "#86BFAD",
    typeClass: "#A8D5C8",
    numberConstant: "#D0D7B7",
    string: "#97B5CB",
    variable: "#B0AEA6",
    comment: "#657668",
    operatorPunctuation: "#77867B",
  },
  semantic: { ...DuskGroveDark.semantic },
};

export const DuskGroveLavenderSeamless: ColorTokenSet = {
  meta: {
    id: "DuskGrove-lavender-seamless",
    label: "DuskGrove - Lavender (Seamless)",
    type: "dark",
    seamless: true,
  },
  ui: {
    ...DuskGroveLavender.ui,
    bgSidebar: DuskGroveLavender.ui.bgEditor,
  },
  syntax: { ...DuskGroveLavender.syntax },
  semantic: { ...DuskGroveLavender.semantic },
};
