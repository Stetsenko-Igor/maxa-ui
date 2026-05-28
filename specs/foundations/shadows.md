# Shadows

## Overview

Shadow tokens define the elevation system for MAXA UI. Use shadows to communicate depth and layering — primarily on overlay surfaces (dropdowns, modals, drawers, tooltips) and interactive cards.

The visual hierarchy is two-dimensional: background color tiers (`bg/page → bg/surface → bg/float → bg/muted`) handle surfaces, and shadow tokens add depth to floating elements.

## Token reference

| Token | CSS value (light) | Use case |
|-------|------------------|----------|
| `--shadow-xs` | `0px 1px 2px 0px rgba(0,0,0,.05)` | Small cards, subtle lift |
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,.10), 0 1px 2px -1px rgba(0,0,0,.10)` | Dropdowns, select menus |
| `--shadow-md` | `0 4px 6px -1px rgba(0,0,0,.10), 0 2px 4px -2px rgba(0,0,0,.06)` | Tooltips, popovers |
| `--shadow-lg` | `0 12px 16px -4px rgba(0,0,0,.08), …` | Modals, drawers |
| `--shadow-xl` | `0 20px 24px -4px rgba(0,0,0,.08), …` | Full-screen overlays |
| `--shadow-2xl` | `0 24px 48px -12px rgba(0,0,0,.18), …` | Hero cards, featured elements |
| `--shadow-3xl` | `0 32px 64px -12px rgba(0,0,0,.14), …` | Reserved / maximum elevation |

Dark mode overrides are defined in the same file (`shadows.css`) with 2–3× opacity to compensate for dark surfaces not diffusing light.

## Usage rules

- **Never** use shadow tokens directly in component CSS. Define a component token (e.g., `--dropdown-shadow: var(--shadow-sm)`) and reference that.
- **Never** hardcode `box-shadow` values — always use `var(--shadow-*)`.
- Choose shadow level to match z-axis intent, not visual preference.
- Modals → `--shadow-lg`. Dropdowns → `--shadow-sm`. Tooltips → `--shadow-md`.

## Layer assignment

| Layer | Shadow | Z-index range |
|-------|--------|---------------|
| Inline content | none | — |
| Sticky / fixed | `--shadow-xs` | 100–199 |
| Dropdowns, selects | `--shadow-sm` | 200–299 |
| Tooltips, popovers | `--shadow-md` | 300–399 |
| Modals, drawers | `--shadow-lg` | 400–499 |
| Toasts, notifications | `--shadow-xl` | 500–599 |

## Source

Values derived from Untitled UI v8 Figma reference (Foundations → Effect styles → Shadows).
