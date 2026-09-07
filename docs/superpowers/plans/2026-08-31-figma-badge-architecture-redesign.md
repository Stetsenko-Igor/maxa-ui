# Figma Badge Architecture Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current 1,656-master Figma Badge system with one token-correct `.Badge` set containing 276 variants and independent optional content properties.

**Architecture:** Reuse the existing no-icon medium/high masters from both Badge sets, normalize their anatomy to `Left icon -> Text padding -> Right icon -> Close`, then combine them under `Shape=Pill|Tag`. Keep optional content out of the variant matrix through Boolean and independent instance-swap properties; use private `_Badge dot` and `_Badge close X` subcomponents only.

**Tech Stack:** Figma Plugin API through `use_figma`, MAXA Foundation variables and local components, `figma-use`, `figma-generate-library`, `get_metadata`, `get_screenshot`, and a local JSON state ledger.

---

## Scope and Execution Rules

- Target Figma file: `ODH3pmxkKyP8pAslgDb15s`.
- Target page: `156:58` (`Badge`).
- Approved design contract: `docs/superpowers/specs/2026-08-31-figma-badge-architecture-redesign-design.md`.
- This is a Figma-only migration. Do not modify React, CSS, token JSON, generated token artifacts, or canonical repository component specs.
- Every `use_figma` call must include `skillNames: "figma-use,figma-generate-library"`.
- Figma mutations are strictly sequential. If subagents are used, only one execution worker may write to Figma; reviewers are read-only.
- Call `await figma.setCurrentPageAsync(page)` exactly once in every Figma script.
- Return every created, mutated, or deleted node ID from each mutating call.
- Stop after any tool error. Inspect the error and current metadata before retrying.
- Use Figma version-history checkpoints instead of Git commits for remote design mutations.
- The repository is used only for this plan/spec. The temporary ledger lives outside Git.

## File and Remote-State Map

- Read: `docs/superpowers/specs/2026-08-31-figma-badge-architecture-redesign-design.md` — approved contract.
- Read: `/private/tmp/design-system-state-badge-update-20260831.json` — previous Badge migration state.
- Create: `/private/tmp/design-system-state-badge-redesign-20260831.json` — exact node IDs, batches, checkpoints, audits, and cleanup targets for this migration.
- Modify: Figma node `170:704` — current `.Badge / Pill color` source set.
- Modify: Figma node `975:66` — current `.Badge / Badge color` source set, treated as the Tag-shaped source.
- Modify: Figma node `928:3015` — current `_Badge close X` set.
- Create: one private `_Badge dot` component on page `156:58`.
- Create: one canonical `.Badge` component set on page `156:58`.
- Create and remove: temporary migration proof and QA instances on page `156:58`.

### Task 1: Preflight Inventory and Recovery Ledger

**Files and nodes:**
- Read: `docs/superpowers/specs/2026-08-31-figma-badge-architecture-redesign-design.md`
- Read: `/private/tmp/design-system-state-badge-update-20260831.json`
- Create: `/private/tmp/design-system-state-badge-redesign-20260831.json`
- Inspect: Figma `156:58`, `170:704`, `975:66`, `928:3015`

- [ ] **Step 1: Load the implementation prerequisites**

Read `figma-use/SKILL.md`, its required Plugin API, gotchas, component-pattern, variable-pattern, and design-system references, then read `figma-generate-library/SKILL.md` and its discovery/component-creation references. Do not call `use_figma` before completing these reads.

- [ ] **Step 2: Run a read-only preflight scan**

Use one `use_figma` call with this inspection shape:

```js
const page = await figma.getNodeByIdAsync('156:58')
if (!page || page.type !== 'PAGE') throw new Error('Badge page 156:58 not found')
await figma.setCurrentPageAsync(page)

const [pillSet, tagSet, closeSet] = await Promise.all([
  figma.getNodeByIdAsync('170:704'),
  figma.getNodeByIdAsync('975:66'),
  figma.getNodeByIdAsync('928:3015'),
])

for (const node of [pillSet, tagSet, closeSet]) {
  if (!node || node.type !== 'COMPONENT_SET') {
    throw new Error('Expected Badge component set is missing')
  }
}

const sourceComponentIds = new Set([
  ...pillSet.children.map(node => node.id),
  ...tagSet.children.map(node => node.id),
])
const instances = page
  .findAllWithCriteria({ types: ['INSTANCE'] })
  .filter(node => node.mainComponent && sourceComponentIds.has(node.mainComponent.id))

return {
  page: { id: page.id, name: page.name },
  sets: [pillSet, tagSet, closeSet].map(set => ({
    id: set.id,
    name: set.name,
    childCount: set.children.length,
    propertyDefinitions: set.componentPropertyDefinitions,
  })),
  sourceInstances: instances.map(node => ({
    id: node.id,
    name: node.name,
    mainComponentId: node.mainComponent.id,
    properties: node.componentProperties,
  })),
}
```

Expected: Pill count `828`, Tag-shaped count `828`, close count `4`, and no missing sets.

- [ ] **Step 3: Record exact anatomy and token bindings**

Inspect one `Icon=False` source master and one master for each old `Icon` value at `medium` emphasis. Return child IDs, names, types, component-property references, bound variables, icon main-component keys, close reactions, and root radius. Record exact stable child-identification rules in the ledger; do not rely on fuzzy names during mutation.

Expected source geometry:

- Pill radius `9999`;
- Tag-shaped radius `6`;
- Dot slot `8 x 8` with `6 x 6` ellipse;
- sizes `20`, `24`, and `28` px;
- current text layers bound to `text-*` roles;
- current icon/Dot/close layers bound to `fg-*` roles.

- [ ] **Step 4: Create the recovery ledger**

Write the returned data with `apply_patch` to `/private/tmp/design-system-state-badge-redesign-20260831.json` using this complete top-level structure:

```json
{
  "runId": "figma-badge-architecture-redesign-20260831",
  "fileKey": "ODH3pmxkKyP8pAslgDb15s",
  "pageId": "156:58",
  "phase": "preflight",
  "sourceSets": {
    "pill": "170:704",
    "tag": "975:66",
    "close": "928:3015"
  },
  "sourceCounts": {
    "pill": 828,
    "tag": 828,
    "close": 4
  },
  "sourceInstances": [],
  "canonicalSourceIds": [],
  "obsoleteSourceIds": [],
  "batches": [],
  "createdNodeIds": {},
  "mutatedNodeIds": [],
  "deletedNodeIds": [],
  "checkpoints": [],
  "audits": {}
}
```

Populate `sourceInstances`, source IDs, and anatomy results from the actual scan before continuing.

- [ ] **Step 5: Capture the recovery checkpoint**

Capture screenshots of both current public sets and call:

```js
const result = await figma.saveVersionHistoryAsync(
  'Before Badge architecture redesign',
  'Snapshot of the two 828-variant Badge sets before the 276-variant migration.'
)
return { checkpoint: result }
```

Append the returned checkpoint to the ledger.

### Task 2: Prove the Swappable Dot Foreground Contract

**Files and nodes:**
- Modify: `/private/tmp/design-system-state-badge-redesign-20260831.json`
- Create: private Figma component `_Badge dot`
- Create and remove: temporary `_Badge dot proof` master and instance

- [ ] **Step 1: Create `_Badge dot` from current token-bound geometry**

Clone the existing source Dot frame identified in Task 1, move the clone to a clear page position, and convert it to a component with `figma.createComponentFromNode`. Preserve its 8 x 8 slot, centered 6 x 6 ellipse, width/height variable bindings, and foreground fill binding. Name it `_Badge dot`, set a concise component description, and set `hiddenFromPublishing = true`.

Return the new component ID and ellipse ID and record both in the ledger.

- [ ] **Step 2: Build a temporary real swap proof**

Clone one `Appearance=purple, Emphasis=medium, Size=sm, Icon=False` master into a standalone, non-publishable proof component. Expose its hidden leading icon, preserve its existing purple `fg` override, instantiate the proof component, and call `swapComponent(dotComponent)` on the leading icon instance inside the real proof instance.

Return:

```js
return {
  createdNodeIds: [dotComponent.id, proofMaster.id, proofInstance.id],
  swappedLeadingId: swappedLeading.id,
  dotDescendantBindings: swappedLeading
    .findAll(() => true)
    .filter(node => 'boundVariables' in node)
    .map(node => ({ id: node.id, name: node.name, boundVariables: node.boundVariables })),
}
```

- [ ] **Step 3: Validate foreground persistence visually and structurally**

Capture the proof instance screenshot and inspect its descendant fill binding. Expected: Dot resolves to the same purple foreground as the ordinary leading icon, never gray.

If the fill override is lost, stop and rename the Dot ellipse layer to match the foreground-bearing layer in the default icon, rebuild the proof, and rerun the same validation. Do not continue until the real instance swap preserves the `fg` binding.

- [ ] **Step 4: Remove only the temporary proof nodes**

Delete the proof master and proof instance by the exact IDs returned in Step 2. Keep `_Badge dot`. Return deleted IDs and verify that both proof IDs resolve to `null` while the Dot component still exists.

- [ ] **Step 5: Save the Dot checkpoint**

Save Figma version history as `Badge Dot swap verified` and record the checkpoint and final Dot IDs in the ledger.

### Task 3: Select and Normalize the 276 Canonical Masters

**Files and nodes:**
- Modify: `/private/tmp/design-system-state-badge-redesign-20260831.json`
- Modify: 138 masters from `170:704`
- Modify: 138 masters from `975:66`

- [ ] **Step 1: Select canonical source masters deterministically**

Select only masters whose old properties satisfy:

```js
const keep =
  component.variantProperties.Icon === 'False' &&
  ['medium', 'high'].includes(component.variantProperties.Emphasis)
```

Expected: `138` Pill masters and `138` Tag-shaped masters. Record the 276 exact IDs as `canonicalSourceIds`; record the other 1,380 IDs as `obsoleteSourceIds` without deleting them.

- [ ] **Step 2: Partition the canonical IDs into safe mutation batches**

Create ordered ledger batches of at most eight components. Order by Shape, Emphasis, Size, Intent, then Appearance. Expected: 35 batches total, with the final batch containing four components.

- [ ] **Step 3: Normalize one batch per sequential `use_figma` call**

For every component ID in the current ledger batch:

1. Resolve the component by exact ID.
2. Load fonts used by its label before reparenting text.
3. Remove obsolete direct component-property references from descendants.
4. Move the existing leading icon instance to the component root.
5. Create a horizontal auto-layout `Text padding` frame.
6. Move the existing label text into `Text padding`.
7. Bind left and right Text padding to `Spacing/spacing-xxs` (`2`).
8. Move the existing trailing icon instance to the root after `Text padding`.
9. Keep the existing close instance as the final root child.
10. Remove the old direct Dot frame and the now-empty `Content` wrapper.
11. Preserve root fill, height, padding, gap, typography, and all existing color bindings.
12. Hide leading icon, trailing icon, and close by default.

The final direct-child order must be exactly:

```text
Leading icon instance
Text padding frame
Trailing icon instance
Close instance
```

Return every mutated/created/deleted ID and append the batch status to the ledger before starting the next batch.

- [ ] **Step 4: Rename each normalized master**

Map source set and size values exactly:

```js
const shape = sourceSetId === '170:704' ? 'Pill' : 'Tag'
const size = {
  sm: 'sm - 20',
  md: 'md - 24',
  lg: 'lg - 28',
}[oldSize]

component.name = [
  `Shape=${shape}`,
  `Intent=${oldIntent}`,
  `Appearance=${oldAppearance}`,
  `Emphasis=${oldEmphasis}`,
  `Size=${size}`,
].join(', ')
```

Expected: no canonical master name contains `Icon=` or `Emphasis=low`.

- [ ] **Step 5: Validate every completed batch**

After each batch, return direct-child order, geometry, radius, variable bindings, and hidden-state values. Stop immediately if any label is missing, any root binding changed, any wrapper remains, or any content slot is out of order.

### Task 4: Combine the Canonical Set and Add Its Public API

**Files and nodes:**
- Modify: `/private/tmp/design-system-state-badge-redesign-20260831.json`
- Create: canonical Figma component set `.Badge`

- [ ] **Step 1: Extract the normalized masters from their legacy sets**

Move the 276 canonical components to the page in ledger order, using exact IDs. Reset each moved node's page position explicitly. Verify the old component sets now contain only IDs listed in `obsoleteSourceIds`.

- [ ] **Step 2: Combine the 276 components**

Call `figma.combineAsVariants(canonicalComponents, page)`, name the result `.Badge`, and set its description to:

```text
Compact MAXA status or metadata label. Choose Pill or Tag shape, medium or high emphasis, and a semantic or appearance color. Optional leading/trailing icons and removable close are component properties; Dot is available only in the leading icon swap.
```

Lay the children out in a readable grid after combining. Resize the component set from actual child bounds, not a formula.

Expected variant definitions:

- `Shape`: `Pill`, `Tag`
- `Emphasis`: `medium`, `high`
- `Size`: `sm - 20`, `md - 24`, `lg - 28`
- unchanged valid `Intent` and `Appearance` values

- [ ] **Step 3: Remove inherited direct property definitions**

Inspect `.Badge.componentPropertyDefinitions`. Delete any inherited `Icon`, shared `Icon swap`, obsolete removable key, or stale label key with `deleteComponentProperty`. Do not delete variant properties.

- [ ] **Step 4: Add the six approved direct properties**

Add properties on the new component set and capture every returned key string:

```js
const labelKey = badgeSet.addComponentProperty('Label', 'TEXT', 'Badge')
const leftVisibleKey = badgeSet.addComponentProperty('Icon left', 'BOOLEAN', false)
const leftSwapKey = badgeSet.addComponentProperty('Icon left swap', 'INSTANCE_SWAP', leftDefaultKey)
const rightVisibleKey = badgeSet.addComponentProperty('Icon right', 'BOOLEAN', false)
const rightSwapKey = badgeSet.addComponentProperty('Icon right swap', 'INSTANCE_SWAP', rightDefaultKey)
const removableKey = badgeSet.addComponentProperty('Removable', 'BOOLEAN', false)
```

Use the actual default icon component keys discovered in Task 1. Never guess property-key suffixes. Record all returned keys in the ledger.

- [ ] **Step 5: Link property references in safe batches**

Process at most eight masters per call. For each master:

```js
label.componentPropertyReferences = { characters: labelKey }
leading.componentPropertyReferences = {
  visible: leftVisibleKey,
  mainComponent: leftSwapKey,
}
trailing.componentPropertyReferences = {
  visible: rightVisibleKey,
  mainComponent: rightSwapKey,
}
close.componentPropertyReferences = { visible: removableKey }
```

Expected: all 276 masters reference the same six set-level property keys.

- [ ] **Step 6: Configure preferred swap values**

Configure the existing MAXA icon component set as the preferred source for both icon swaps. Add `_Badge dot` as a preferred value for `Icon left swap` only. Inspect definitions afterward and verify that the Dot key does not appear in `Icon right swap` preferred values.

- [ ] **Step 7: Save the canonical-set checkpoint**

Save version history as `Badge canonical 276-variant set created` and record the new `.Badge` set ID and checkpoint in the ledger.

### Task 5: Simplify and Rebind `_Badge close X`

**Files and nodes:**
- Modify: `/private/tmp/design-system-state-badge-redesign-20260831.json`
- Modify: Figma `928:3015`

- [ ] **Step 1: Compare the four existing close variants**

Inspect `Type=Pill color|Badge color` across `State=Default|Hover`. Verify that the Type axis does not change geometry, reaction behavior, or any visual property that must differ by Shape.

Expected: only two unique state behaviors are required.

- [ ] **Step 2: Keep one Default and one Hover identity**

Keep the exact Default and Hover component IDs selected in the ledger. Remove the duplicate Type pair only after confirming no page instance references those duplicate component IDs.

- [ ] **Step 3: Recombine as two state variants**

Rename the retained components `State=Default` and `State=Hover`, combine them as `_Badge close X`, and preserve the Default `MOUSE_ENTER -> CHANGE_TO Hover` reaction and reciprocal Hover exit behavior already present in the source.

Expected: close set count `2`, only variant property `State`, root size `16 x 16`.

- [ ] **Step 4: Validate parent foreground overrides**

Create one medium-purple and one high-purple real Badge instance with `Removable=true`. Verify the close vector resolves respectively to the purple `fg-*` and `fg-on-color` bindings supplied by the parent Badge.

### Task 6: Migrate Existing In-File Badge Instances

**Files and nodes:**
- Modify: `/private/tmp/design-system-state-badge-redesign-20260831.json`
- Modify: exact Figma instance IDs recorded in Task 1

- [ ] **Step 1: Define the deterministic migration map**

Use these mappings:

```text
Old Pill set              -> Shape=Pill
Old Badge color set       -> Shape=Tag
Emphasis=low              -> Emphasis=medium
Size=sm                   -> Size=sm - 20
Size=md                   -> Size=md - 24
Size=lg                   -> Size=lg - 28
Icon=False                -> Icon left=false, Icon right=false
Icon=Dot                  -> Icon left=true, Icon left swap=_Badge dot, Icon right=false
Icon=Icon leading         -> Icon left=true, preserve old leading swap, Icon right=false
Icon=Icon trailing        -> Icon left=false, Icon right=true, preserve old trailing swap
Removable                 -> preserve current Boolean value
Label                     -> preserve current text value
```

- [ ] **Step 2: Migrate instances in batches of at most eight**

For each instance, capture old properties in the ledger, switch it to the matching canonical master, then set the direct property values from the map. Return every mutated instance ID and its new `mainComponent.id` and `componentProperties`.

- [ ] **Step 3: Verify migration completeness**

Rescan page instances. Expected: zero in-file instances reference any `obsoleteSourceIds`; every migrated instance points to a component whose parent is the canonical `.Badge` set.

- [ ] **Step 4: Screenshot migrated examples**

Capture representative migrated instances for False, Dot, leading icon, trailing icon, and Removable. Expected: labels are preserved, low instances now render as medium, and no icon/Dot/close is gray.

### Task 7: Delete the Obsolete Matrix Safely

**Files and nodes:**
- Modify: `/private/tmp/design-system-state-badge-redesign-20260831.json`
- Delete: exact IDs in `obsoleteSourceIds`
- Delete: empty legacy component sets after validation

- [ ] **Step 1: Run the destructive-action guard**

Before deletion, verify all of the following in one read-only call:

- canonical `.Badge` exists and has 276 children;
- all 276 canonical component IDs are absent from `obsoleteSourceIds`;
- zero in-file instances reference obsolete IDs;
- the Dot proof passed;
- the close set has two variants;
- the previous Figma recovery checkpoint exists in the ledger.

If any check fails, do not delete anything.

- [ ] **Step 2: Delete obsolete masters by exact ledger IDs**

Resolve each obsolete ID with `getNodeByIdAsync`, verify its parent is one of the two legacy sets, then remove it. Process deletion in bounded batches and return every deleted ID.

- [ ] **Step 3: Delete only the now-empty legacy sets**

Verify `170:704` and `975:66` contain no children, then remove those exact set IDs. Never delete a set by name search.

- [ ] **Step 4: Verify cleanup**

Expected on page `156:58`:

- one public `.Badge` set with 276 variants;
- one private `_Badge dot` component;
- one private `_Badge close X` set with two variants;
- no `.Badge / Pill color` set;
- no `.Badge / Badge color` set;
- no `_Badge layout` component;
- no temporary proof nodes.

Save version history as `Badge legacy matrix removed`.

### Task 8: Structural, Token, Interaction, and Visual QA

**Files and nodes:**
- Modify: `/private/tmp/design-system-state-badge-redesign-20260831.json`
- Create and remove: temporary `_Badge QA` frame and real Badge instances

- [ ] **Step 1: Run the exhaustive structural audit**

Audit every master and return failures only. Assert:

```text
variant count = 276
Shape values = Pill, Tag
Emphasis values = medium, high
Size values = sm - 20, md - 24, lg - 28
Icon variant property absent
low emphasis absent
direct child count = 4
direct child order = leading, Text padding, trailing, close
left/right swap keys are different
Dot absent from right preferred values
```

Expected: `failures: []`.

- [ ] **Step 2: Run the exhaustive token-role audit**

For all 276 masters, inspect resolved/bound variables on root fill, label fill, both icon slots, and close. Assert:

- root uses the existing background role for its color outcome and emphasis;
- label variable names contain `text` and never `fg`;
- icon, Dot-compatible slot, and close variable names contain `fg` and never `text`;
- high emphasis uses `text-on-color` and `fg-on-color`;
- Pill radius binding resolves to `radius-full`;
- Tag radius binding resolves to `radius-sm`;
- Text padding resolves to `spacing-xxs` on both sides.

Expected: `tokenFailures: []`.

- [ ] **Step 3: Build a real-instance QA grid**

Create a temporary `_Badge QA` auto-layout frame containing real instances that cover:

- both Shapes;
- both Emphasis values;
- all three Sizes;
- neutral, semantic success, warning, error, and representative decorative appearances;
- no icon, ordinary leading icon, Dot leading, ordinary trailing icon, both icons, Removable, and trailing icon plus Removable.

All optional content must be changed through instance properties, not manual layer visibility.

- [ ] **Step 4: Validate interaction behavior**

Inspect reactions on the close subcomponent and a real removable Badge instance. Expected: close Default changes to Hover; no Badge root has Hover, Pressed, Disabled, or Focus variants or reactions.

- [ ] **Step 5: Capture visual evidence**

Capture the `.Badge` set and `_Badge QA` frame. Check for:

- no clipped labels;
- centered icons and Dot;
- balanced Text padding with either icon slot toggled;
- right icon and close remaining visually distinct when both are enabled;
- correct 20/24/28 px heights;
- correct Pill and Tag radii;
- no gray fallback icons, Dot, or close control.

- [ ] **Step 6: Remove the QA frame**

Delete the exact `_Badge QA` frame ID and all temporary instances. Verify the ID resolves to `null` and no `placeholder=true` nodes remain on the page.

### Task 9: Finalize State and Handoff

**Files and nodes:**
- Modify: `/private/tmp/design-system-state-badge-redesign-20260831.json`
- Inspect: canonical `.Badge`, `_Badge dot`, `_Badge close X`

- [ ] **Step 1: Run the final metadata summary**

Return:

```json
{
  "badgeSetName": ".Badge",
  "badgeVariantCount": 276,
  "shapeValues": ["Pill", "Tag"],
  "emphasisValues": ["medium", "high"],
  "sizeValues": ["sm - 20", "md - 24", "lg - 28"],
  "directProperties": [
    "Label",
    "Icon left",
    "Icon left swap",
    "Icon right",
    "Icon right swap",
    "Removable"
  ],
  "dotPlacement": "leading only",
  "closeVariantCount": 2,
  "structuralFailures": 0,
  "tokenFailures": 0,
  "obsoleteInstanceReferences": 0
}
```

Use actual queried values; fail if the query cannot produce this exact result.

- [ ] **Step 2: Save final version history**

Save:

```js
const result = await figma.saveVersionHistoryAsync(
  'Badge architecture redesign complete',
  'One 276-variant Badge set with Pill/Tag shapes, medium/high emphasis, independent icon slots, leading Dot swap, and removable close.'
)
return { checkpoint: result }
```

- [ ] **Step 3: Finalize the ledger**

Set:

```json
{
  "phase": "complete",
  "pendingValidations": [],
  "audits": {
    "badgeVariantCount": 276,
    "closeVariantCount": 2,
    "structuralFailures": 0,
    "tokenFailures": 0,
    "obsoleteInstanceReferences": 0,
    "visualQaPassed": true,
    "dotSwapForegroundPassed": true
  }
}
```

Preserve all IDs, deletion records, and version-history checkpoints already recorded in the ledger.

- [ ] **Step 4: Report completion**

Report the final `.Badge`, `_Badge dot`, and `_Badge close X` node IDs; counts; QA results; final version-history checkpoint; and any known Figma-only versus repository semantic differences. Do not claim repository synchronization because it is explicitly out of scope.
