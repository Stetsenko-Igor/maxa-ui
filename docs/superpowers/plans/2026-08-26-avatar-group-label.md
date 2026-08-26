# Avatar Group and Avatar Label Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add token-bound `Avatar Group` and `Avatar Label` component families to the existing MAXA Foundation Figma file while reusing the redesigned Avatar master.

**Architecture:** Keep the existing `Avatar` component set as the atom and build both new families entirely from nested Avatar instances. `Avatar Group` uses a Size × Visible avatars variant matrix plus an overflow visibility property; `Avatar Label` uses three size variants plus text and description visibility properties. All Figma writes are incremental, return every affected node ID, and are followed by structural and visual validation.

**Tech Stack:** Figma Design, Figma Plugin API through `use_figma`, MAXA Foundation variables and text styles, local state ledger in `/private/tmp`.

---

## File and State Map

- Modify remotely: Figma file `ODH3pmxkKyP8pAslgDb15s`
- Modify remotely: page `818:675` (`Avatar`)
- Reuse remotely: component set `818:774` (`Avatar`)
- Create locally during execution: `/private/tmp/maxa-avatar-compositions-state.json`
- Reference: `docs/superpowers/specs/2026-08-26-avatar-group-label-design.md`

Every `use_figma` call must pass:

```json
{
  "fileKey": "ODH3pmxkKyP8pAslgDb15s",
  "skillNames": "figma-use,figma-generate-library"
}
```

## Known Foundation Assets

```javascript
const SOURCE = {
  pageId: "818:675",
  avatarSetId: "818:774",
  sizes: {
    "xs - 24": "VariableID:344:67",
    "sm - 32": "VariableID:344:68",
    "md - 40": "VariableID:344:69",
    "lg - 48": "VariableID:344:70",
    "xl - 64": "VariableID:344:71",
  },
  overlap: "VariableID:344:73",
  ringWidth: "VariableID:1:355",
  ringColor: "VariableID:91:70",
  textPrimary: "VariableID:1:371",
  textSecondary: "VariableID:1:372",
  gapTight: "VariableID:1:355",
  gapInline: "VariableID:1:358",
  textStyles: {
    mdLabel: "S:6cb20c710411c23e97c70b670cc1df181b95a2e7,",
    mdDescription: "S:41b518477cedbe4bb6b877adf8508d7f75587dba,",
    lgLabel: "S:5c0af84fe36742e3673bf8b10817ab67136412c8,",
    lgDescription: "S:fc739ac93b786b5217e872868696a147e79e02c1,",
    xlLabel: "S:473a307abec3f721dede38eab581904aaa8a2723,",
    xlDescription: "S:41e12ff0e9e8cd47344ec0a685647c9c7411269f,",
  },
};
```

### Task 1: Establish the Execution Ledger and Baseline

**Files:**
- Create: `/private/tmp/maxa-avatar-compositions-state.json`
- Read: `docs/superpowers/specs/2026-08-26-avatar-group-label-design.md`

- [ ] **Step 1: Create the state ledger**

Create the file with `apply_patch` using this initial content:

```json
{
  "runId": "2026-08-26-avatar-compositions",
  "fileKey": "ODH3pmxkKyP8pAslgDb15s",
  "pageId": "818:675",
  "avatarSetId": "818:774",
  "renamedAvatarVariantIds": [],
  "groupVariantIdsBySize": {},
  "avatarGroupSetId": null,
  "avatarLabelSetId": null,
  "validation": {}
}
```

- [ ] **Step 2: Capture the baseline metadata**

Call `get_metadata` for `818:774` and verify:

- component set name is `Avatar`
- child count is `180`
- Size options still include `lg - 64` and `xl - 48`
- no existing `Avatar Group` or `Avatar Label` set is present on page `818:675`

Expected result: a stable pre-write baseline with no duplicate target families.

### Task 2: Correct the Avatar Numeric Size Suffixes

**Files:**
- Modify remotely: Figma component set `818:774`
- Modify: `/private/tmp/maxa-avatar-compositions-state.json`

- [ ] **Step 1: Rename the two affected Size options**

Run this `use_figma` code:

```javascript
const avatarSet = await figma.getNodeByIdAsync("818:774");
if (!avatarSet || avatarSet.type !== "COMPONENT_SET") throw new Error("Avatar set not found");

const mutatedNodeIds = [];
for (const child of avatarSet.children) {
  let nextName = child.name;
  if (nextName.includes("Size=lg - 64")) nextName = nextName.replace("Size=lg - 64", "Size=lg - 48");
  if (nextName.includes("Size=xl - 48")) nextName = nextName.replace("Size=xl - 48", "Size=xl - 64");
  if (nextName !== child.name) {
    child.name = nextName;
    mutatedNodeIds.push(child.id);
  }
}

return {
  mutatedNodeIds,
  count: mutatedNodeIds.length,
  sizeOptions: avatarSet.variantGroupProperties.Size.values,
};
```

Expected result: `72` renamed variants and Size options `xs - 24`, `sm - 32`, `md - 40`, `lg - 48`, `xl - 64`.

- [ ] **Step 2: Save IDs and verify geometry**

Store `mutatedNodeIds` in the ledger. Read one `lg - 48` and one `xl - 64` variant and verify their dimensions and bindings remain:

```text
lg - 48 → 48×48 → VariableID:344:70
xl - 64 → 64×64 → VariableID:344:71
```

### Task 3: Build the Avatar Group Variant Components

**Files:**
- Modify remotely: page `818:675`
- Modify: `/private/tmp/maxa-avatar-compositions-state.json`

- [ ] **Step 1: Create four count variants for each size**

Run one `use_figma` call per size, sequentially, using the function below. Substitute `SIZE_LABEL` with each exact value listed after the code. Each call creates four top-level ComponentNodes and returns all created IDs.

```javascript
const page = await figma.getNodeByIdAsync("818:675");
const avatarSet = await figma.getNodeByIdAsync("818:774");
if (!page || page.type !== "PAGE") throw new Error("Avatar page not found");
if (!avatarSet || avatarSet.type !== "COMPONENT_SET") throw new Error("Avatar set not found");
await figma.setCurrentPageAsync(page);

const SIZE_LABEL = "md - 40";
const [ringColor, ringWidth] = await Promise.all([
  figma.variables.getVariableByIdAsync("VariableID:91:70"),
  figma.variables.getVariableByIdAsync("VariableID:1:355"),
]);
if (!ringColor || !ringWidth) throw new Error("Avatar Group ring tokens not found");

const statusKey = Object.keys(avatarSet.componentPropertyDefinitions).find(k => k.startsWith("hasStatusDot#"));
const initialsKey = Object.keys(avatarSet.componentPropertyDefinitions).find(k => k.startsWith("Initials#"));
if (!statusKey || !initialsKey) throw new Error("Avatar nested properties not found");

const makeAvatar = (name, type, appearance, initials) => {
  const instance = avatarSet.defaultVariant.createInstance();
  instance.name = name;
  instance.setProperties({
    Type: type,
    Appearance: appearance,
    Shape: "rounded (default)",
    Size: SIZE_LABEL,
    [statusKey]: false,
    [initialsKey]: initials,
  });
  instance.isExposedInstance = true;
  instance.strokes = [figma.variables.setBoundVariableForPaint(
    { type: "SOLID", color: { r: 1, g: 1, b: 1 } },
    "color",
    ringColor,
  )];
  instance.strokeAlign = "OUTSIDE";
  instance.setBoundVariable("strokeWeight", ringWidth);
  return instance;
};

const appearances = ["blue", "emerald", "pink", "violet"];
const components = [];
const createdNodeIds = [];
const stagingX = Math.max(...page.children.map(n => n.x + n.width)) + 160;

for (const visibleCount of [2, 3, 4, 5]) {
  const comp = figma.createComponent();
  comp.name = `Size=${SIZE_LABEL}, Visible avatars=${visibleCount}`;
  comp.layoutMode = "HORIZONTAL";
  comp.primaryAxisSizingMode = "AUTO";
  comp.counterAxisSizingMode = "AUTO";
  comp.counterAxisAlignItems = "CENTER";
  comp.itemSpacing = -10;
  comp.itemReverseZIndex = true;
  comp.fills = [];
  page.appendChild(comp);
  comp.x = stagingX;
  comp.y = avatarSet.y + (visibleCount - 2) * 120;
  createdNodeIds.push(comp.id);

  for (let i = 0; i < visibleCount; i += 1) {
    const member = i === 0
      ? makeAvatar("Avatar 1", "Image", "--", "IS")
      : makeAvatar(`Avatar ${i + 1}`, "Colored", appearances[i - 1], String.fromCharCode(65 + i - 1));
    comp.appendChild(member);
    createdNodeIds.push(member.id);
  }

  const overflow = makeAvatar("Overflow count", "Neutral (default)", "--", "+4");
  overflow.visible = false;
  comp.appendChild(overflow);
  createdNodeIds.push(overflow.id);
  components.push(comp);
}

return {
  createdNodeIds,
  variantIds: components.map(c => c.id),
  size: SIZE_LABEL,
};
```

Execute with these exact `SIZE_LABEL` values:

```text
xs - 24
sm - 32
md - 40
lg - 48
xl - 64
```

The negative `itemSpacing` is the resolved inverse of `Avatar/layout/group-overlap = 10`. Figma cannot bind an alias and invert its sign, so document this limitation in the final component description.

- [ ] **Step 2: Save every size batch**

After each call, write its four `variantIds` to `groupVariantIdsBySize` in the ledger before starting the next size.

Expected result: `20` ComponentNodes, each staged clear of existing page content and containing 2–5 visible exposed Avatar instances plus one hidden overflow Avatar instance.

### Task 4: Combine and Configure Avatar Group

**Files:**
- Modify remotely: page `818:675`
- Modify: `/private/tmp/maxa-avatar-compositions-state.json`

- [ ] **Step 1: Combine the 20 variants**

Load all 20 IDs from the ledger with `Promise.all`, verify every node is a ComponentNode, and combine them with `figma.combineAsVariants(components, page)`.

- [ ] **Step 2: Lay out the component-set grid**

Use Size as columns and Visible avatars as rows. Calculate each column width from the widest child in that Size, use 64 px between columns and 40 px padding, then calculate the ComponentSet boundary from actual child bounds with `resizeWithoutConstraints`.

Position the set at:

```javascript
avatarGroupSet.x = avatarSet.x + avatarSet.width + 160;
avatarGroupSet.y = avatarSet.y;
```

- [ ] **Step 3: Add overflow behavior and documentation**

Run this after combination:

```javascript
avatarGroupSet.name = "Avatar Group";
avatarGroupSet.description = "Overlapping collaborator avatars with 2–5 visible members and optional overflow. Nested Avatar instances are exposed for identity configuration. The negative overlap uses the resolved magnitude of Avatar/layout/group-overlap because Figma cannot invert a bound variable alias.";

const hasOverflowKey = avatarGroupSet.addComponentProperty("Has overflow", "BOOLEAN", false);
for (const variant of avatarGroupSet.children) {
  const overflow = variant.findAllWithCriteria({ types: ["INSTANCE"] }).find(n => n.name === "Overflow count");
  if (!overflow) throw new Error(`Overflow instance missing in ${variant.name}`);
  overflow.componentPropertyReferences = { visible: hasOverflowKey };
}

return {
  createdNodeIds: [avatarGroupSet.id],
  mutatedNodeIds: [avatarGroupSet.id, ...avatarGroupSet.children.map(c => c.id)],
  componentSetId: avatarGroupSet.id,
  propertyKeys: { hasOverflowKey },
};
```

Save `componentSetId` as `avatarGroupSetId` in the ledger.

- [ ] **Step 4: Validate Avatar Group**

Call `get_metadata` on the new set and verify:

- child count is `20`
- Size contains five canonical options
- Visible avatars contains `2`, `3`, `4`, `5`
- `Has overflow` is Boolean with default false
- every variant contains nested InstanceNodes

Call `get_screenshot` on the new ComponentSet, download it to `/private/tmp/maxa-avatar-group.png`, and inspect it at original resolution. Expected: five clear size columns, four count rows, white rings, correct overlap, and no stacked variants.

### Task 5: Build and Configure Avatar Label

**Files:**
- Modify remotely: page `818:675`
- Modify: `/private/tmp/maxa-avatar-compositions-state.json`

- [ ] **Step 1: Discover and load fonts before text mutation**

Call `listAvailableFontsAsync`, confirm `Montserrat Regular` and `Montserrat Medium`, then load both with one `Promise.all`.

- [ ] **Step 2: Create the three label variants**

Create ComponentNodes for:

```text
Size=md - 40
Size=lg - 48
Size=xl - 64
```

Stage each new top-level component beyond the current rightmost page content before combining it, so no intermediate node overlaps the existing Avatar master or Avatar Group.

For each component:

- horizontal auto layout, center alignment, hug both axes
- `itemSpacing` bound to `VariableID:1:358` (`spacing-md`, 8 px)
- nested exposed Image Avatar instance using the matching Size
- vertical text stack with `itemSpacing` bound to `VariableID:1:355` (`spacing-xxs`, 2 px)
- `Label` TextNode using the matching Medium style
- `Description` TextNode using the matching Regular style
- label fill bound to `VariableID:1:371`
- description fill bound to `VariableID:1:372`

Use this style mapping:

```javascript
const stylesBySize = {
  "md - 40": {
    label: "S:6cb20c710411c23e97c70b670cc1df181b95a2e7,",
    description: "S:41b518477cedbe4bb6b877adf8508d7f75587dba,",
  },
  "lg - 48": {
    label: "S:5c0af84fe36742e3673bf8b10817ab67136412c8,",
    description: "S:fc739ac93b786b5217e872868696a147e79e02c1,",
  },
  "xl - 64": {
    label: "S:473a307abec3f721dede38eab581904aaa8a2723,",
    description: "S:41e12ff0e9e8cd47344ec0a685647c9c7411269f,",
  },
};
```

Set default strings exactly:

```text
Label: Olivia Rhye
Description: olivia@untitledui.com
```

- [ ] **Step 3: Combine the label variants and add properties**

Combine the three ComponentNodes into a set named `Avatar Label`, place children in one horizontal row with 64 px gaps and 40 px ComponentSet padding, and position the set below Avatar Group with a 160 px gap.

Add and wire properties on the ComponentSet:

```javascript
const labelKey = avatarLabelSet.addComponentProperty("Label", "TEXT", "Olivia Rhye");
const descriptionKey = avatarLabelSet.addComponentProperty("Description", "TEXT", "olivia@untitledui.com");
const hasDescriptionKey = avatarLabelSet.addComponentProperty("Has description", "BOOLEAN", false);

for (const variant of avatarLabelSet.children) {
  const label = variant.findAllWithCriteria({ types: ["TEXT"] }).find(n => n.name === "Label");
  const description = variant.findAllWithCriteria({ types: ["TEXT"] }).find(n => n.name === "Description");
  if (!label || !description) throw new Error(`Text nodes missing in ${variant.name}`);
  label.componentPropertyReferences = { characters: labelKey };
  description.componentPropertyReferences = {
    characters: descriptionKey,
    visible: hasDescriptionKey,
  };
}
```

Set this description:

```text
Identity avatar with a primary label and optional secondary description. The nested Avatar instance is exposed for image, initials, appearance, and status configuration. Interaction semantics belong to the consuming control or row.
```

Return all created and mutated IDs and save the set ID as `avatarLabelSetId` in the ledger.

- [ ] **Step 4: Validate Avatar Label**

Call `get_metadata` and verify:

- child count is `3`
- Size options are md 40, lg 48, xl 64
- Label and Description are Text properties
- Has description is Boolean with default false
- each variant contains one exposed Avatar instance

Call `get_screenshot`, save `/private/tmp/maxa-avatar-label.png`, and inspect it at original resolution. Expected: three increasing Avatar sizes, aligned text stacks, primary/secondary text contrast, and label-only default height.

### Task 6: Final Page QA

**Files:**
- Modify: `/private/tmp/maxa-avatar-compositions-state.json`

- [ ] **Step 1: Create validation instances**

Create one temporary instance of each new set to the right of the masters. Configure Avatar Group with `Visible avatars=5` and `Has overflow=true`. Configure Avatar Label with `Size=xl - 64`, `Has description=true`, and custom Label/Description strings. Return every temporary node ID.

- [ ] **Step 2: Validate exposed nested properties**

Read `componentProperties` and `exposedInstances` from both validation instances. Verify:

- Group exposes each visible Avatar member and the Overflow count Avatar
- Avatar Label exposes its nested Avatar
- Group overflow initials remain editable through the exposed nested Avatar property
- label and description overrides survive a Size change

- [ ] **Step 3: Capture the final page screenshot**

Call `get_screenshot` on page `818:675` with a sufficiently large `maxDimension`, download it to `/private/tmp/maxa-avatar-page-final.png`, and inspect the current Avatar set plus both new component families for overlap or clipping.

- [ ] **Step 4: Remove validation instances**

Remove only the temporary validation instance IDs returned by Step 1. Do not remove masters, examples owned by the user, or unrelated page content. Return all removed IDs.

- [ ] **Step 5: Record final validation**

Update the ledger with:

```json
{
  "validation": {
    "avatarSizeNames": "pass",
    "avatarGroupStructure": "pass",
    "avatarGroupScreenshot": "pass",
    "avatarLabelStructure": "pass",
    "avatarLabelScreenshot": "pass",
    "nestedProperties": "pass",
    "pageScreenshot": "pass"
  }
}
```

Run one final read-only `use_figma` query that returns the two ComponentSet IDs, names, descriptions, variant counts, property definitions, and token bindings sampled from each size. Completion requires every validation entry to be `pass`.

### Task 7: Plan and Repository Verification

**Files:**
- Verify: `docs/superpowers/specs/2026-08-26-avatar-group-label-design.md`
- Verify: `docs/superpowers/plans/2026-08-26-avatar-group-label.md`

- [ ] **Step 1: Run repository checks**

Run:

```bash
git diff --check
git status --short
```

Expected result: no whitespace errors and a clean worktree after the implementation-plan documentation commit.

- [ ] **Step 2: Verify the plan commit**

```bash
git log -1 --oneline -- docs/superpowers/plans/2026-08-26-avatar-group-label.md
```

Expected result: the implementation plan is present in repository history and the worktree is clean.

- [ ] **Step 3: Report the Figma outcome**

Provide direct Figma node links for Avatar Group and Avatar Label, summarize the Size naming correction, and state which token bindings and property checks passed.
