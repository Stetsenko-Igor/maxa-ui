# MAXA Token Importer v5

This version:
- imports collections, modes, values and aliases
- supports dot-notation aliases through `aliasDefaults`
- creates text styles from `Typography`
- binds text styles to typography variables when available
- accepts drag-and-drop token files from `packages/tokens/figma`
- keeps the import result log visible without scrolling
- can optionally load the latest pushed `packages/tokens/figma/import-bundle.json` from GitHub

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

Network access:

- the plugin manifest allows only `https://raw.githubusercontent.com`
- Figma plugins cannot read local repo files directly by path
- GitHub Raw is useful for shared/stable imports, but local drag-and-drop is usually faster while iterating
