/**
 * @file DuskGrove-ocean-seamless.ts
 * @description Seamless ocean variant for DuskGrove.
 * Blends editor canvas and sidebar into an unbroken deep ocean surface (#101318).
 * Expresses sidebar equals editor structurally to preserve palette invariants.
 */

import { ColorTokenSet } from "./types.js";
import { DuskGroveOcean } from "./DuskGrove-ocean.js";

export const DuskGroveOceanSeamless: ColorTokenSet = {
  meta: {
    id: "DuskGrove-ocean-seamless",
    label: "DuskGrove - Ocean (Seamless)",
    type: "dark",
    seamless: true,
  },
  ui: {
    ...DuskGroveOcean.ui,
    bgSidebar: DuskGroveOcean.ui.bgEditor,
  },
  syntax: { ...DuskGroveOcean.syntax },
  semantic: { ...DuskGroveOcean.semantic },
};
