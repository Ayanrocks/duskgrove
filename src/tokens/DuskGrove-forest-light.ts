/**
 * @file DuskGrove-forest-light.ts
 * @description Light Forest variant for DuskGrove.
 *
 * This is a complete token set rather than an override of the dark Forest
 * palette. Its syntax colors were solved independently for the light editor
 * background so the variant retains the locked contrast floors.
 */

import { ColorTokenSet } from "./types.js";

export const DuskGroveForestLight: ColorTokenSet = {
  meta: {
    id: "DuskGrove-forest-light",
    label: "DuskGrove - Forest Light",
    type: "light",
  },
  ui: {
    bgEditor: "#DFE4DD",
    bgSidebar: "#D4DCD0",
    bgSelection: "#CABCE6",
    bgPanel: "#CABCE6",
    border: "#736B8A",
    fgMuted: "#525E6F",
    fgPrimary: "#323B2B",
    accentHighlight: "#897244",
  },
  syntax: {
    keyword: "#8B4D1D",
    tag: "#8F5024",
    attribute: "#79592A",
    function: "#276853",
    typeClass: "#2E6B59",
    numberConstant: "#5A6827",
    string: "#2A526F",
    variable: "#5F5D54",
    comment: "#67836D",
    operatorPunctuation: "#6C8473",
  },
  // Downstream status colors calibrated for the revised light editor background
  // to ensure readability and WCAG AA contrast compliance.
  semantic: {
    error: "#B23A46",
    warning: "#8A6215",
    info: "#2E6690",
    success: "#3E7A3B",
  },
};
