# MAXA Token Importer v5

This version:
- imports collections, modes, values and aliases
- supports dot-notation aliases through `aliasDefaults`
- creates text styles from `Typography`
- binds text styles to typography variables when available
- accepts drag-and-drop token files from `packages/tokens/figma`
- can load the latest `packages/tokens/figma/import-bundle.json` directly from GitHub

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
- you can paste JSON or drag files into the plugin UI
- or click **Load latest from GitHub** to fetch:
  - `https://raw.githubusercontent.com/Stetsenko-Igor/maxa-ui/main/packages/tokens/figma/import-bundle.json`

Network access:

- the plugin manifest allows only `https://raw.githubusercontent.com`
- Figma plugins cannot read local files from the repo directly, so GitHub Raw is the no-copy-paste path
