/**
 * @file index.ts
 * @description Central variant registry. All theme variants are registered here.
 * Adding a new variant to DuskGrove requires only adding a token file and registering it in `tokenVariants`.
 */

import { ColorTokenSet } from "./types.js";
import { DuskGroveDark } from "./DuskGrove-dark.js";
import { DuskGroveDarkSeamless } from "./DuskGrove-dark-seamless.js";
import { DuskGroveOcean } from "./DuskGrove-ocean.js";
import { DuskGroveOceanSeamless } from "./DuskGrove-ocean-seamless.js";
import { DuskGroveLavender, DuskGroveLavenderSeamless } from "./lavender.js";
import { DuskGroveForestLight } from "./DuskGrove-forest-light.js";

export * from "./types.js";
export * from "./DuskGrove-dark.js";
export * from "./DuskGrove-dark-seamless.js";
export * from "./DuskGrove-ocean.js";
export * from "./DuskGrove-ocean-seamless.js";
export * from "./lavender.js";
export * from "./DuskGrove-forest-light.js";

/**
 * Registry of all DuskGrove color variants.
 */
export const tokenVariants: ColorTokenSet[] = [
  DuskGroveDark,
  DuskGroveDarkSeamless,
  DuskGroveOcean,
  DuskGroveOceanSeamless,
  DuskGroveLavender,
  DuskGroveLavenderSeamless,
  DuskGroveForestLight,
];
