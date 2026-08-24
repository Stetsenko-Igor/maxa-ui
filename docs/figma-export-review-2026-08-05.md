# Figma Export Review — 2026-08-05

## Source

- Export: `maxa-figma-export-2026-08-05.json`
- SHA-256: `a6acd43b0b8cf1f516c40425bdf5f0ca3d798ad41f8f9a019bcfdb56bb6e4a9b`
- Initial diff: 54 changes

> **2026-08-24 product-calibration follow-up:** The export change to
> `Colors/Neutral/50 = #FAFAFA` remains valid for neutral surface tints. A new
> `Colors/Neutral/75 = #F5F6FA` primitive was added, and Light
> `background/bg-page` now aliases Neutral/75 to match the live product
> Designer background without changing Neutral/50 consumers.

## Integrated export changes

### Neutral primitives and semantics

- `Colors/Neutral/50`: `#F5F6FA` → `#FAFAFA`
- Added `Colors/Neutral/925`: `#232324`
- Light `text/text-disabled`: `Neutral/400` → `Neutral/500`
- Dark `background/bg-neutral-surface`: `Neutral/950` → `Neutral/925`
- The export confirms that the deprecated Slate primitive family is absent.

### Table component model

- Row backgrounds now own the resting and interaction fills.
- Added `row-bg` and `row-bg-striped`.
- Removed the independent `cell-bg`; body cells are transparent.
- Added `striped` to `TableRow` as an explicit state.
- Replaced `sort-icon` with shared `fg` plus `fg-disabled` for disabled icon state.
- Updated body and footer text to `text-secondary`.
- Added `footer-text-caption` and replaced `caption-text` with `text-caption`.
- Footer background now resolves to `bg-surface`.

The runtime CSS also had eight pre-existing values that differed from the Figma Table source. Header typography, default row height, cell icon size, cell padding, and caption padding now match the Figma values.

### Variable scopes and Alert action

- Applied the exported `ALL_FILLS` scopes to Orange, Red, and Yellow primitives.
- Applied fill-and-stroke scopes to the neutral Alert action tokens.
- Kept the exported destructive intent for the neutral Alert action, but routed it through the canonical `action/action-destructive` roles.

## Approved changes applied after the export

The export predates the production-matched palette decision, so the agreed palette values intentionally supersede its Blue, Green, Red, and Brand values.

- Blue: 12 steps, with `Blue/500 = #0576DA`, `Blue/700 = #04549B`, and `Blue/800 = #073F72`.
- Green: 11 steps, with `Green/500 = #30AA50`, `Green/700 = #227939`, and `Green/800 = #1E6131`.
- Red: 11 steps, with `Red/500 = #D31510`, `Red/700 = #960F0B`, and `Red/800 = #78100D`.
- Brand: 11 steps anchored at `Brand/500 = #31E5C2`.
- Light solid action states use adjacent `500 → 600 → 700` steps for default, hover, and active across Blue, Green, and Red.
- Light neutral actions use `Neutral/300 → 400 → 450`, keeping Secondary visibly interactive without the previous jump into dark gray.
- Dark solid action states retain the approved lighter-on-interaction pattern; neutral actions use the smoother `Neutral/800 → 700 → 600` progression.
- State-aware on-color text roles preserve WCAG contrast as green, yellow, and dark neutral actions cross from light to strong fills.
- The approved Blue/100 migration is applied to `background/bg-info-subtle` and `action/action-primary-subtle`; its hover uses the retained Blue/150 step and active uses Blue/200.

## Alert feedback architecture

The reusable `Color modes/feedback/*` namespace is retained as a domain semantic recipe for Alert and future feedback surfaces. Equal resolved values in generic semantic families are intentional role overlap, not duplicate meaning.

- All 36 `Component-based/Alert/color/*` variables alias `Color modes/feedback/*` roles.
- The 33 feedback variables alias approved primitives directly, avoiding semantic-to-semantic chains and allowing independent tuning.
- Generic background, border, foreground, text, and action roles remain available for non-feedback surfaces.
- Two duplicate Figma variables named `Alert/color/neutral/action` and `action-hover` remain removed; the canonical neutral action IDs are preserved and route through `feedback/neutral/action*`.
- Dark Alert aliases are calibrated by resolved color against the published component, not by applying one numeric scale pattern to every palette. The current surface recipe is Blue `700/600/400`, Green `800/700/500`, Orange `900/700/600`, Red `700/500/300`, and Neutral `900/800/500` for background, border, and accent respectively.
- Warning Alert actions intentionally stay Orange rather than Yellow: Light uses Orange `700/700`, while Dark uses Orange `400/300` for default and hover.

## Button interaction finalization

- `.Button - Main / Light Mode` and `.Button - Main / Dark Mode` remain unchanged as static production-reference sets.
- The token-bound `.🟢 Button / Light Mode` set receives the semantic state updates through its existing aliases.
- Outline is transparent at rest. `Button/outline/bg-surface` and the React `outlineSurface` prop provide the explicit surface-filled option.
- Social Button keeps its own `background/bg-surface` alias and therefore does not inherit Outline transparency.

Four copied Table descriptions from the export remain normalized to describe their actual roles (`row-bg`, `row-bg-striped`, `fg-disabled`, and `footer-text-caption`).

## Verification

- Figma read-back confirms the agreed primitive anchors (including the added `Neutral/450 = #C9C9C9`), the restored feedback recipes, Alert aliases, and zero duplicate local variable names.
- Live variable scopes match the import bundle for the finalized neutral and on-color roles.
- Figma screenshots confirm the applied palette board and intact Alert variants in Light and Dark.
- Token tests pass after regeneration of the import bundle and generated token references.
- A raw diff against the original export now intentionally reports the post-export palette, semantic, and Alert deduplication decisions; scope drift is zero.
