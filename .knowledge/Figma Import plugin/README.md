# MAXA Token Importer v3

This version:
- imports collections, modes, values and aliases
- supports dot-notation aliases through `aliasDefaults`
- creates text styles from `Typography`
- binds text styles to typography variables when available
- accepts drag-and-drop token files from `packages/tokens/figma`

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
