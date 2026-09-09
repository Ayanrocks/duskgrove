/**
 * @file uiMapping.ts
 * @description Maps abstract `ColorTokenSet` UI and semantic tokens to VS Code workbench color keys.
 * Uses programmatic color math (lighten/darken/withAlpha) to derive nuanced UI states.
 */

import { ColorTokenSet } from "../tokens/types.js";
import { darken, lighten, withAlpha } from "./colorUtils.js";

/**
 * Generates the complete VS Code workbench `colors` map for a given token set.
 *
 * @param tokens - The variant token set
 * @returns Record of official VS Code color keys to hex color values
 */
export function generateUiColors(tokens: ColorTokenSet): Record<string, string> {
  const { ui, semantic } = tokens;

  // Programmatically derived shades for cohesive hierarchy
  const editorLineHighlight = withAlpha(ui.bgSelection, 0.25);
  const selectionAlpha = withAlpha(ui.bgSelection, 0.6);
  const selectionInactiveAlpha = withAlpha(ui.bgSelection, 0.35);
  const findMatchAlpha = withAlpha(tokens.syntax.numberConstant, 0.4);
  const findMatchHighlightAlpha = withAlpha(tokens.syntax.numberConstant, 0.2);

  const buttonBg = lighten(ui.bgSelection, 10);
  const buttonHover = lighten(ui.bgSelection, 18);
  const secondaryButtonBg = ui.bgSidebar;
  const secondaryButtonHover = lighten(ui.bgSidebar, 6);

  const inputBg = darken(ui.bgEditor, 2);
  const listHover = withAlpha(ui.bgSelection, 0.3);
  const listActive = withAlpha(ui.bgSelection, 0.7);

  const indentGuide = withAlpha(ui.border, 0.25);
  const indentGuideActive = withAlpha(ui.fgMuted, 0.6);

  const scrollbarBg = withAlpha(ui.bgSelection, 0.3);
  const scrollbarHover = withAlpha(ui.bgSelection, 0.5);

  const subtleBorder = withAlpha(tokens.syntax.comment, 0.2);

  return {
    // Base & Focus
    focusBorder: ui.accentHighlight,
    "sash.hoverBorder": ui.accentHighlight,
    foreground: ui.fgPrimary,
    "selection.background": selectionAlpha,
    "widget.shadow": withAlpha("#000000", 0.5),

    // Window & Title Bar
    "titleBar.activeBackground": ui.bgSidebar,
    "titleBar.activeForeground": ui.fgPrimary,
    "titleBar.inactiveBackground": ui.bgSidebar,
    "titleBar.inactiveForeground": ui.fgMuted,
    "titleBar.border": subtleBorder,

    // Activity Bar
    "activityBar.background": darken(ui.bgSidebar, 3),
    "activityBar.foreground": ui.fgPrimary,
    "activityBar.inactiveForeground": ui.fgMuted,
    "activityBar.border": subtleBorder,
    "activityBarBadge.background": ui.accentHighlight,
    "activityBarBadge.foreground": ui.bgEditor,

    // Side Bar
    "sideBar.background": ui.bgSidebar,
    "sideBar.foreground": ui.fgPrimary,
    "sideBar.border": subtleBorder,
    "sideBarTitle.foreground": ui.fgPrimary,
    "sideBarTitle.border": "#00000000",
    "sideBarSectionHeader.background": ui.bgSidebar,
    "sideBarSectionHeader.foreground": ui.fgMuted,
    "sideBarSectionHeader.border": subtleBorder,

    // Editor Canvas
    "editor.background": ui.bgEditor,
    "editor.foreground": ui.fgPrimary,
    "editorCursor.foreground": ui.accentHighlight,
    "editorLineNumber.foreground": ui.fgMuted,
    "editorLineNumber.activeForeground": ui.fgPrimary,
    "editor.lineHighlightBackground": editorLineHighlight,
    "editor.selectionBackground": selectionAlpha,
    "editor.selectionHighlightBackground": selectionInactiveAlpha,
    "editor.inactiveSelectionBackground": selectionInactiveAlpha,
    "editor.wordHighlightBackground": withAlpha(ui.bgSelection, 0.4),
    "editor.wordHighlightStrongBackground": withAlpha(ui.bgSelection, 0.6),
    "editor.findMatchBackground": findMatchAlpha,
    "editor.findMatchHighlightBackground": findMatchHighlightAlpha,
    "editorWhitespace.foreground": withAlpha(ui.fgMuted, 0.3),
    "editorIndentGuide.background1": indentGuide,
    "editorIndentGuide.activeBackground1": indentGuideActive,
    "editorRuler.foreground": withAlpha(ui.border, 0.4),
    "editorBracketMatch.background": withAlpha(ui.bgSelection, 0.5),
    "editorBracketMatch.border": ui.accentHighlight,

    // Tabs & Editor Groups
    "editorGroupHeader.tabsBackground": ui.bgSidebar,
    "editorGroupHeader.tabsBorder": "#00000000",
    "editorGroupHeader.border": "#00000000",
    "editorGroup.border": subtleBorder,
    "tab.activeBackground": ui.bgEditor,
    "tab.activeForeground": ui.fgPrimary,
    "tab.activeBorderTop": ui.accentHighlight,
    "tab.unfocusedActiveBorderTop": withAlpha(ui.accentHighlight, 0.5),
    "tab.inactiveBackground": ui.bgSidebar,
    "tab.inactiveForeground": ui.fgMuted,
    "tab.border": "#00000000",
    "tab.hoverBackground": lighten(ui.bgSidebar, 4),
    "tab.unfocusedActiveBackground": ui.bgEditor,
    "tab.unfocusedActiveForeground": ui.fgMuted,

    // Bottom Panel & Output
    "panel.background": ui.bgEditor,
    "panel.border": subtleBorder,
    "panelTitle.activeBorder": ui.accentHighlight,
    "panelTitle.activeForeground": ui.fgPrimary,
    "panelTitle.inactiveForeground": ui.fgMuted,
    "panelSection.border": subtleBorder,
    "panelSectionHeader.background": ui.bgEditor,
    "panelSectionHeader.foreground": ui.fgMuted,
    "panelSectionHeader.border": subtleBorder,

    // Status Bar
    "statusBar.background": darken(ui.bgSidebar, 5),
    "statusBar.foreground": ui.fgPrimary,
    "statusBar.border": subtleBorder,
    "statusBar.debuggingBackground": tokens.syntax.numberConstant,
    "statusBar.debuggingForeground": ui.bgEditor,
    "statusBar.noFolderBackground": darken(ui.bgSidebar, 5),
    "statusBarItem.hoverBackground": withAlpha(ui.fgPrimary, 0.15),
    "statusBarItem.remoteBackground": tokens.syntax.typeClass,
    "statusBarItem.remoteForeground": ui.bgEditor,

    // Lists & Trees (Explorer, Quick Open)
    "list.activeSelectionBackground": listActive,
    "list.activeSelectionForeground": ui.fgPrimary,
    "list.inactiveSelectionBackground": listHover,
    "list.inactiveSelectionForeground": ui.fgPrimary,
    "list.hoverBackground": listHover,
    "list.hoverForeground": ui.fgPrimary,
    "list.focusBackground": listActive,
    "list.focusForeground": ui.fgPrimary,
    "list.highlightForeground": tokens.syntax.function,

    // Input Controls & Dropdowns
    "input.background": inputBg,
    "input.foreground": ui.fgPrimary,
    "input.border": ui.border,
    "input.placeholderForeground": ui.fgMuted,
    "inputOption.activeBorder": tokens.syntax.function,
    "dropdown.background": inputBg,
    "dropdown.foreground": ui.fgPrimary,
    "dropdown.border": ui.border,

    // Buttons & Badges
    "button.background": buttonBg,
    "button.foreground": ui.fgPrimary,
    "button.hoverBackground": buttonHover,
    "button.secondaryBackground": secondaryButtonBg,
    "button.secondaryForeground": ui.fgPrimary,
    "button.secondaryHoverBackground": secondaryButtonHover,
    "badge.background": tokens.syntax.function,
    "badge.foreground": ui.bgEditor,

    // Scrollbar & Breadcrumbs
    "scrollbarSlider.background": scrollbarBg,
    "scrollbarSlider.hoverBackground": scrollbarHover,
    "scrollbarSlider.activeBackground": ui.accentHighlight,
    "minimapSlider.activeBackground": ui.accentHighlight,
    "breadcrumb.background": ui.bgEditor,
    "breadcrumb.foreground": ui.fgMuted,
    "breadcrumb.focusForeground": ui.fgPrimary,
    "breadcrumb.activeSelectionForeground": ui.fgPrimary,

    // Diagnostics & Notifications
    "editorError.foreground": semantic.error,
    "editorWarning.foreground": semantic.warning,
    "editorInfo.foreground": semantic.info,
    "notifications.background": ui.bgSidebar,
    "notifications.foreground": ui.fgPrimary,
    "notifications.border": ui.border,
    "notificationLink.foreground": tokens.syntax.function,

    // Git Decorations
    "gitDecoration.addedResourceForeground": semantic.success,
    "gitDecoration.modifiedResourceForeground": semantic.warning,
    "gitDecoration.deletedResourceForeground": semantic.error,
    "gitDecoration.untrackedResourceForeground": tokens.syntax.string,
    "gitDecoration.ignoredResourceForeground": ui.fgMuted,

    // Integrated Terminal ANSI Colors
    "terminal.background": ui.bgEditor,
    "terminal.foreground": ui.fgPrimary,
    "terminal.ansiBlack": ui.bgEditor,
    "terminal.ansiRed": semantic.error,
    "terminal.ansiGreen": semantic.success,
    "terminal.ansiYellow": semantic.warning,
    "terminal.ansiBlue": tokens.syntax.function,
    "terminal.ansiMagenta": tokens.syntax.keyword,
    "terminal.ansiCyan": tokens.syntax.typeClass,
    "terminal.ansiWhite": ui.fgPrimary,
    "terminal.ansiBrightBlack": ui.fgMuted,
    "terminal.ansiBrightRed": lighten(semantic.error, 8),
    "terminal.ansiBrightGreen": lighten(semantic.success, 8),
    "terminal.ansiBrightYellow": lighten(semantic.warning, 8),
    "terminal.ansiBrightBlue": lighten(tokens.syntax.function, 8),
    "terminal.ansiBrightMagenta": lighten(tokens.syntax.keyword, 8),
    "terminal.ansiBrightCyan": lighten(tokens.syntax.typeClass, 8),
    "terminal.ansiBrightWhite": lighten(ui.fgPrimary, 10),
  };
}
