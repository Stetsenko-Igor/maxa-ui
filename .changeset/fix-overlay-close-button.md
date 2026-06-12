---
"@maxa/ui": patch
"@maxa/tokens": patch
---

Fix the Dialog/Drawer corner close button. The button was positioned with negative offsets outside the content box (clipped by `overflow: hidden`) and rendered a bare "×" text glyph. Now: positioned inside the corner via new `--dialog-close-offset` / `--drawer-close-offset` tokens, renders a proper 20px X icon (inline SVG, `currentColor`), and gains an active-state surface via `--dialog-close-bg-active` / `--drawer-close-bg-active`. Matches the Figma Button Close component (48px hit area, 20px icon, hover/pressed states).
