# Button Migration Plugin — Phase 1

> Status: implemented (v1 working)
> Purpose: migrate existing legacy Figma Button components from old local styles / hardcoded values to the approved MAXA semantic token model.

## Goal

The plugin migrates existing Button components in two safe stages:

1. `Analyze`
2. `Apply`

It does not behave like a blind auto-restyling tool. Migration is predictable, reviewable, and repeatable.

## Plugin Location

`.knowledge/Figma Plugins/MAXA Button Migration/`

Files:
- `code.js` — main plugin logic
- `ui.html` — plugin UI
- `manifest.json` — plugin manifest (`documentAccess: dynamic-page`)

## Current Status

Phase 1 is working. The following bindings are applied per component:

| Role | Token | Figma field |
|------|-------|-------------|
| surface fill | `Button/{variant}/bg` | fills (COLOR variable) |
| border stroke | `Button/{variant}/border` | strokes (COLOR variable) |
| label color | `Button/{variant}/text` | fills (COLOR variable) |
| leading icon color | `Button/{variant}/icon` | fills (COLOR variable) |
| trailing icon color | `Button/{variant}/icon` | fills (COLOR variable) |
| height | `Button/size/{size}/height` | height (NUMBER variable) |
| horizontal padding | `Button/size/{size}/padding-x` | paddingLeft + paddingRight |
| gap | `Button/size/{size}/gap` | itemSpacing |
| border radius | `Button/size/{size}/radius` | cornerRadius |
| font size | `Button/size/{size}/text` | fontSize (FLOAT variable) |
| line height | `Button/size/{size}/line-height` | lineHeight (FLOAT variable) |
| font style (weight) | `Button/size/{size}/weight` | fontStyle (STRING variable) |
| font family | `Button/font-family` | fontFamily (STRING variable) |

All 13 roles bind successfully. `fontWeight` is skipped as a STRING-typed NUMBER alternative; `fontStyle` is used instead.

## Key Technical Notes

### documentAccess: dynamic-page

All sync Figma APIs that touch nodes are blocked. Required async replacements:

- `node.fillStyleId = ''` → `await node.setFillStyleIdAsync('')`
- `node.strokeStyleId = ''` → `await node.setStrokeStyleIdAsync('')`
- `node.textStyleId = ''` → `await node.setTextStyleIdAsync('')`
- `figma.getNodeById(id)` → `await figma.getNodeByIdAsync(id)`

### Variable resolvedType in Figma

Figma uses `FLOAT` (not `NUMBER`) as `resolvedType` for number variables imported from the token system. All number guards in the plugin use `resolvedType !== 'NUMBER' && resolvedType !== 'FLOAT'`.

### Icon detection

During both Analyze and Apply, icons are found using `findIconCandidates()` which uses `collectIconsShallow()`. This stops at INSTANCE boundaries and only pushes nodes that pass `isLikelyIconNode()` (type INSTANCE/VECTOR/FRAME/GROUP, width/height ≤ 32px, no TEXT children). This prevents double-matching the INSTANCE and its child VECTOR as two separate icons.

### Icon color binding

For icon color roles, the plugin:
1. Gets the stored `sourceNode.id` from the analysis phase
2. Fetches the live node with `figma.getNodeByIdAsync(id)`
3. Walks up via `findNearestInstanceAncestor()` to reach the icon INSTANCE
4. If the INSTANCE has no fills, descends to `findFirstColoredDescendant()` and binds there

### textStyleId clearing and font preservation

Before binding `fontSize` and `lineHeight` variables on a TEXT node:
1. The existing `fontName` is saved (family + style)
2. `textStyleId` is cleared with `setTextStyleIdAsync('')` — required or `setBoundVariable` is ignored
3. `fontName` is restored after clearing, so family and weight are not lost

### fontStyle binding

Figma API does not support binding to `fontWeight` directly. The correct field is `fontStyle`, which accepts STRING variables (e.g., `"SemiBold"`). The token `Button/size/{size}/weight` is a STRING variable aliasing `Typography/Font weight/semibold`.

### fontFamily binding

`Button/font-family` is a STRING variable aliasing `Typography/Font family/body`. It binds to the `fontFamily` field on TEXT nodes via `setBoundVariable('fontFamily', variable)`.

## Phase 1 Scope

Phase 1 covers:

1. `Buttons/Button`
2. `Buttons/Button destructive`
3. `Buttons/Icon button`

Out of scope for Phase 1:

- dropdown/menu buttons
- split buttons
- close buttons
- Input, Badge, Alert, or other component families

## Two-Stage Workflow

### Stage 1: Analyze

`Analyze` does not modify any node. It inspects the selection and produces:

- family candidate (`Buttons/Button`, `Buttons/Button destructive`, `Buttons/Icon button`, `unknown`)
- variant candidate
- size candidate (from height: 32→sm, 40→md, 48→lg)
- state candidate
- confidence (high / medium / low)
- anatomy: surface layer, label layer, border layer, leading/trailing icon layers
- legacy dependencies: old styles, hardcoded fills/strokes/text
- planned assignment list with token paths

Supports both `COMPONENT` and `COMPONENT_SET` selections.

### Stage 2: Apply

`Apply` runs only after analysis. It:

- imports library variables from the published MAXA Component-based Tokens collection
- binds variables to fills, strokes, text fields, and size fields
- clears old text styles before binding typography variables
- preserves font name across style clearing

## Required Figma Library

The plugin requires the MAXA design file with the published **Component-based Tokens** collection (79+ variables) added as a Team Library. Without this, `getAvailableLibraryVariableCollectionsAsync` will not return the collection and all bindings fail.

Workflow:
1. Open `Manage libraries` in the Figma file
2. Enable the MAXA Component-based Tokens library
3. If variables appear in the library panel but not in the plugin, remove and re-add the library to force resync

## Token Files

- `packages/tokens/figma/component-button-light.json` — Light mode button tokens
- `packages/tokens/figma/component-button-dark.json` — Dark mode button tokens

After editing token files:
1. `pnpm figma:bundle` — rebuild `import-bundle.json`
2. Import bundle in MAXA Token Importer plugin to update Figma variables
3. Re-run the migration plugin on buttons

## Success Criteria

Phase 1 is complete when:

- `Analyze` correctly identifies Button candidates without modifying anything
- `Apply` binds all 13 token roles to the correct Figma variable fields
- All bindings are visible in Figma's variable panel per node
- `fontFamily`, `fontStyle`, `fontSize`, and `lineHeight` are all variable-bound on the label TEXT node
- Icon color bindings work for both leading and trailing icon instances
