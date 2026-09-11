/**
 * @file DuskGrove-ocean.ts
 * @description Ocean variant for DuskGrove.
 * Rotates background-family hue to 215° (ocean blue) at Forest's fixed 20% saturation:
 * deep abyssal ocean shadows (#101318) and ocean ridge panel (#161B21),
 * while preserving all syntax, semantic, text, and accent tokens verbatim.
 */

import { ColorTokenSet } from "./types.js";
import { DuskGroveDark } from "./DuskGrove-dark.js";

export const DuskGroveOcean: ColorTokenSet = {
  meta: {
    id: "DuskGrove-ocean",
    label: "DuskGrove - Ocean",
    type: "dark",
  },
  ui: {
    ...DuskGroveDark.ui,
    bgEditor: "#101318",
    bgSidebar: "#161B21",
  },
  syntax: { ...DuskGroveDark.syntax },
  semantic: { ...DuskGroveDark.semantic },
};
