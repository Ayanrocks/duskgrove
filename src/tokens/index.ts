/**
 * @file index.ts
 * @description Central variant registry. All theme variants are registered here.
 * Adding a new variant to DuskGrove requires only adding a token file and registering it in `tokenVariants`.
 */

import { ColorTokenSet } from "./types.js";
import { GloamingDark } from "./gloaming-dark.js";

export * from "./types.js";
export * from "./gloaming-dark.js";

export const DuskGroveDark: ColorTokenSet = {
  ...GloamingDark,
  meta: {
    id: "DuskGrove-dark",
    label: "DuskGrove",
    type: "dark",
  },
};

/**
 * Registry of all DuskGrove / Gloaming color variants.
 */
export const tokenVariants: ColorTokenSet[] = [GloamingDark, DuskGroveDark];
