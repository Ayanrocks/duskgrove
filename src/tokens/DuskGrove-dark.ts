/**
 * @file DuskGrove-dark.ts
 * @description Default dark variant for DuskGrove.
 * Inspired by twilight woodland canopies: deep mossy forest shadows (#121810),
 * pine bark (#1A2116), dusky heather (#474056), and sage canopy highlights (#B9C6AE).
 */

import { ColorTokenSet } from "./types.js";

export const DuskGroveDark: ColorTokenSet = {
  meta: {
    id: "DuskGrove-dark",
    label: "DuskGrove",
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
  syntax: {
    keyword: "#A68FD1",
    string: "#A3C98F",
    numberConstant: "#D9B97A",
    function: "#8AB4D8",
    typeClass: "#7FC4B8",
    variable: "#C7CDB9",
    comment: "#5F665A",
    operatorPunctuation: "#6F6A7A",
    tag: "#D18FA8",
    attribute: "#C9A875",
  },
  semantic: {
    error: "#D9707A",
    warning: "#E0B168",
    info: "#8AB4D8",
    success: "#8FC98A",
  },
};
