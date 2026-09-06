/**
 * @file generate.ts
 * @description CLI generation script that builds VS Code color theme JSON files from registered token variants.
 * Validates output against the theme schema and synchronizes `package.json` theme contributions.
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import * as prettier from "prettier";
import { tokenVariants } from "../tokens/index.js";
import { buildTheme } from "./buildTheme.js";
import { validateTheme } from "../validate/schema.js";
import { validateVariantContrast } from "../validate/contrast.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "../..");
const THEMES_DIR = path.join(ROOT_DIR, "themes");
const PACKAGE_JSON_PATH = path.join(ROOT_DIR, "package.json");

/**
 * Maps variant type to VS Code manifest uiTheme identifier.
 */
function getUiThemeId(type: "dark" | "light" | "hc-dark" | "hc-light"): string {
  switch (type) {
    case "dark":
      return "vs-dark";
    case "light":
      return "vs";
    case "hc-dark":
      return "hc-black";
    case "hc-light":
      return "hc-light";
  }
}

/**
 * Executes the theme compilation process across all registered variants.
 */
export async function generateThemes(): Promise<void> {
  console.log(`🌲 Building DuskGrove theme variants (${tokenVariants.length} registered)...`);

  // Ensure output directory exists
  if (!fs.existsSync(THEMES_DIR)) {
    fs.mkdirSync(THEMES_DIR, { recursive: true });
  }

  const manifestThemes: Array<{
    label: string;
    uiTheme: string;
    path: string;
  }> = [];

  for (const variant of tokenVariants) {
    const filename = `${variant.meta.id}-color-theme.json`;
    const outputPath = path.join(THEMES_DIR, filename);

    console.log(`  -> Compiling [${variant.meta.id}] (${variant.meta.label})...`);

    // 1. Compile theme
    const theme = buildTheme(variant);

    // 2. Validate against schema
    validateTheme(theme);

    // 3. Validate WCAG contrast
    const contrastReport = validateVariantContrast(variant);
    if (!contrastReport.passed) {
      const failures = contrastReport.checks
        .filter((c) => !c.passed)
        .map((c) => `     - ${c.name}: ratio ${c.ratio} (expected >= ${c.requiredRatio})`)
        .join("\n");
      throw new Error(`Contrast validation failed for variant "${variant.meta.id}":\n${failures}`);
    }

    // 4. Write theme JSON formatted with Prettier
    const rawJson = JSON.stringify(theme, null, 2) + "\n";
    const prettierConfig = (await prettier.resolveConfig(outputPath)) || {};
    const formattedJson = await prettier.format(rawJson, {
      ...prettierConfig,
      parser: "json",
    });
    fs.writeFileSync(outputPath, formattedJson, "utf-8");
    console.log(`     Wrote ${path.relative(ROOT_DIR, outputPath)}`);

    // 5. Track for package.json contributes.themes
    manifestThemes.push({
      label: variant.meta.label,
      uiTheme: getUiThemeId(variant.meta.type),
      path: `./themes/${filename}`,
    });
  }

  // 6. Synchronize package.json contributes.themes
  if (fs.existsSync(PACKAGE_JSON_PATH)) {
    const rawPkg = fs.readFileSync(PACKAGE_JSON_PATH, "utf-8");
    const pkg = JSON.parse(rawPkg);

    pkg.contributes = pkg.contributes || {};
    pkg.contributes.themes = manifestThemes;

    fs.writeFileSync(PACKAGE_JSON_PATH, JSON.stringify(pkg, null, 2) + "\n", "utf-8");
    console.log("  -> Synchronized package.json contributes.themes array.");
  }

  console.log("✨ Successfully generated all theme variants!\n");
}

// Execute CLI run if invoked directly
generateThemes().catch((error) => {
  console.error("❌ Theme generation failed:", error);
  process.exit(1);
});
