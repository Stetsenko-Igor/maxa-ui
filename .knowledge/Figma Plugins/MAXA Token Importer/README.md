# MAXA Token Importer v6

This version:
- imports collections, modes, values and aliases
- supports dot-notation aliases through `aliasDefaults`
- creates text styles from `Typography`
- creates shadow effect styles from `effects.shadows`
- runs built-in migration maps before import so renamed variables/styles keep their Figma IDs when possible
- removes legacy `Typography/*` text styles after migrating to top-level typography groups
- removes legacy `Shadows dark/*` effect styles
- binds text styles to typography variables when available
- accepts drag-and-drop token files from `packages/tokens/figma`
- keeps the import result log visible without scrolling
- can optionally load the latest pushed `packages/tokens/figma/import-bundle.json` from GitHub
- can optionally remove stale variables during import when **Remove stale variables during import** is checked

Example alias defaults:
```json
{
  "aliasDefaults": {
    "Color modes": "Primitives",
    "Spacing": "Primitives"
  }
}
```

Expected input:

- a single flattened import bundle JSON
- or `manifest.json` plus the referenced token JSON files
- fastest local workflow: click **Choose files** or drag `packages/tokens/figma/import-bundle.json`
- fallback workflow: paste JSON manually
- published workflow: click **Load latest from GitHub** to fetch the last pushed bundle:
  - `https://raw.githubusercontent.com/Stetsenko-Igor/maxa-ui/main/packages/tokens/figma/import-bundle.json`
- cleanup workflow: enable **Remove stale variables during import** only when the bundle should become the source of truth for the imported collections

Shadow behavior:

- `packages/tokens/figma/import-bundle.json` may include `effects.shadows`
- the plugin creates/updates Figma Effect Styles:
  - `Shadows/xs` through `Shadows/3xl`
- shadow effects are not Figma variables; they are effect styles because Figma variables do not represent a complete reusable shadow stack
- dark-mode elevation should usually be handled with surfaces, borders, overlays, or opacity instead of a parallel `Shadows dark/*` style group

Migration safety:

- Figma links are preserved by internal style and variable IDs, not by display names.
- Future token/style renames should use a migration map and rename existing Figma entities before creating replacements.
- The current importer includes migration maps for known early renames:
  - `Color modes/text/primary` -> `Color modes/text/text-primary`
  - `Color modes/fg/primary` -> `Color modes/foreground/fg-primary`
  - `Color modes/bg/surface` -> `Color modes/background/bg-surface`
  - `Color modes/border/primary` -> `Color modes/border/border-primary`
  - `Color modes/action/primary` -> `Color modes/action/action-primary`
  - legacy `Color modes/bg/secondary` and `Color modes/bg/inset` -> prefixed `background/bg-*` targets
  - legacy `Color modes/bg/*-solid` -> prefixed `background/bg-*-strong` targets
  - `Typography/...` text styles -> top-level typography style groups
- Value-only updates should update existing variables/styles in place.
- Deletions should be staged through a deprecated state first, for example `_Deprecated/...`, and removed only after consumers are migrated.
- Direct deletion is acceptable only during early setup when the affected styles are known to be unused.

Network access:

- the plugin manifest allows only `https://raw.githubusercontent.com`
- Figma plugins cannot read local repo files directly by path
- GitHub Raw is useful for shared/stable imports, but local drag-and-drop is usually faster while iterating
