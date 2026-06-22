// DeepSight — Forensics-document design system
// Warm off-white paper, Space Mono display, red-only accent

export const C = {
  // Backgrounds — warm trace-paper hierarchy
  bg0:    "#F7F6F3",   // page base (warm white)
  bg1:    "#EFEDE9",   // panel
  bg2:    "#E7E4DF",   // nested panel / code bg
  bg3:    "#0C0C0C",   // inverse (terminal black)

  // Ink
  ink:    "#111111",   // primary text
  inkMid: "#555555",   // secondary
  inkLow: "#999999",   // tertiary / labels
  white:  "#FAFAF8",   // text on dark bg

  // Borders
  rule:   "#D6D3CD",   // hairline
  ruleDim:"#E3E0DA",   // faint

  // Accent — single, bold, intentional
  red:    "#D42B1E",   // FAKE / danger / primary CTA
  redDim: "#F5E0DE",   // red tint bg
  green:  "#1A7A3A",   // REAL / success
  greenDim:"#DCF0E3",

  // Data
  amber:  "#A05C1A",   // warning / uncertain
};

export const font = {
  display: "'Space Mono', 'Courier New', monospace",
  body:    "'Inter', 'Segoe UI', sans-serif",
  mono:    "'Space Mono', 'Courier New', monospace",
};

export const radius = { none: 0, sm: 2, md: 4, lg: 6 };

export const size = {
  navH: 56,
  maxW: 1120,
};