# Client Navigation Page Archetypes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan.

**Goal:** Replace the prototype's generic navigation fallback with a systematic, interactive page-archetype system in which every selectable destination opens the correct Maxa surface, uses the approved universal header geometry, and supports representative populated, empty, and loading states.

**Architecture:** Add a declarative page-profile registry between the recursive navigation model and the renderers. `PageCatalog` resolves a navigation node to a page profile and state; `PageHeader` renders one fixed row order and owns interactive controls; `ResultArchetypes` renders product-specific result families from centralized fixtures. Existing settings rendering and navigation-tree behavior remain intact.

**Tech Stack:** Static HTML, vanilla JavaScript, CSS, Maxa token/component CSS, Node verification scripts, Playwright.

---

## Working Locations and Safety

- Approved design: `/Users/igorstetsenko/Projects/maxa-ui/docs/superpowers/specs/2026-09-02-client-navigation-page-archetypes-design.md`
- Recoverable staging root: `/private/tmp/maxa-nav-review.UZloYv`
- Staging prototype: `/private/tmp/maxa-nav-review.UZloYv/prototype`
- Staging verifier: `/private/tmp/maxa-nav-review.UZloYv/scripts/verify-inline-rail.cjs`
- Canonical prototype: `/Users/igorstetsenko/Library/Mobile Documents/com~apple~CloudDocs/Work/Maxadesigns.com/AI/Client Side Updates and Improvements/prototypes/header-settings-explorations`
- Canonical verifier folder: `/Users/igorstetsenko/Library/Mobile Documents/com~apple~CloudDocs/Work/Maxadesigns.com/AI/Client Side Updates and Improvements/2026-08-18-current-ui-audit/scripts`

The CloudDocs prototype is not a Git repository. Initialize Git only in the staging root and make a checkpoint commit after every task. Never copy `.git` to CloudDocs. Do not modify unrelated untracked files in `/Users/igorstetsenko/Projects/maxa-ui/docs/superpowers/plans/`.

## Fixed Page Contract

Every page configuration resolves to this shape:

```js
{
  id: "package-custom",
  title: "Custom",
  titleIcon: "Palette",
  breadcrumbs: ["Dashboard", "Automated Packages", "Custom"],
  actions: {
    secondary: [],
    primary: { label: "Create Custom Package", icon: "Plus", menu: true },
  },
  toolbar: {
    search: "Search Custom",
    filter: null,
    sort: "Sort by",
    views: [
      { id: "grid", icon: "SquaresFour", label: "Grid view" },
      { id: "list", icon: "Rows", label: "List view" },
    ],
  },
  navigation: {
    primaryTabs: [
      { id: "library", label: "Custom Library" },
      { id: "defaults", label: "Custom Default Packages" },
      { id: "generated", label: "Generated Packages" },
    ],
    secondaryTabs: [
      { id: "listings", label: "Listings" },
      { id: "testimonials", label: "Testimonials" },
      { id: "market-stats", label: "Market Stats" },
      { id: "hybrid", label: "Hybrid" },
    ],
  },
  filters: { segments: [] },
  results: {
    archetype: "custom-package-collection",
    fixture: "customPackages",
    count: true,
  },
  states: {
    supported: ["populated", "empty", "loading"],
    empty: {
      icon: "Package",
      title: "No custom packages available",
      body: "Custom packages available to this account appear here.",
    },
    loadingCount: 4,
  },
}
```

Optional rows collapse without leaving empty space. The DOM order is always:

```text
breadcrumbs → title → toolbar → primary tabs → secondary tabs → segments → count → results
```

## Exact Navigation-to-Archetype Map

| Navigation destination | Archetype | Required page-specific structure |
|---|---|---|
| Dashboard | `dashboard-sections` | setup notice, shortcuts, recent designs, packages, templates, features, activity |
| My Designs | `design-collection` | folder/design cards; PDF to Print, Batch Actions, Create Folder |
| Compliance | `compliance-requests` | status segmented control and request cards |
| Scheduled | `scheduled-calendar` | Week/Month/Schedule segmented control; Content Calendar primary action |
| Manual Listings | `manual-listing-collection` | property/listing cards |
| Automated Packages / Amp Hub | `amp-hub-sections` | notice, named sections, package cards; Create Custom Package |
| My Listings | `listing-package-collection` | listing package cards |
| Company | `company-package-collection` | primary tabs and approval/status metadata |
| Testimonials | `testimonial-package-collection` | primary tabs and collage-like previews |
| Custom | `custom-package-collection` | primary tabs plus underlined secondary tabs |
| Market Stats | `market-stats-surface` | location form followed by neighborhood cards |
| Shared with Me | `shared-package-collection` | package cards with owner metadata |
| Archive | `archive-package-collection` | primary tabs and archive metadata |
| Templates root, Most Popular, Favorites, Print, Digital, AMP Designs, Admin branches/leaves | `template-masonry` | branch-specific title, count, metadata, and aspect ratios |
| Swag Shop and leaves | `product-collection` | merchandise cards |
| Concierge Shop | `service-collection` | service cards |
| Workspaces | `workspace-collection` | membership/lock metadata |
| Explore Tags and leaves | `template-masonry` | template results selected by navigation tag; no duplicated chip |
| Tutorials | `tutorial-collection` | video/tutorial cards |
| Support | `support-panels` | Get Help, Contact Print Support, Help Center |
| Account Settings | existing `Settings` surface | no archetype fallback |

## Task 0: Create a Recoverable Staging Baseline

**Files:**

- Verify: `/private/tmp/maxa-nav-review.UZloYv/prototype/README.md`
- Verify: `/private/tmp/maxa-nav-review.UZloYv/scripts/verify-inline-rail.cjs`
- Create: `/private/tmp/maxa-nav-review.UZloYv/.git/`

- [ ] **Step 1: Confirm staging and canonical are aligned before edits**

Run:

```bash
rsync -ain --exclude='.git/' "/private/tmp/maxa-nav-review.UZloYv/prototype/" "/Users/igorstetsenko/Library/Mobile Documents/com~apple~CloudDocs/Work/Maxadesigns.com/AI/Client Side Updates and Improvements/prototypes/header-settings-explorations/"
```

Expected: no unexplained source-file differences. If differences appear, inspect them and preserve the newer approved version; do not run a destructive sync.

- [ ] **Step 2: Establish local history**

Run:

```bash
git -C /private/tmp/maxa-nav-review.UZloYv init
git -C /private/tmp/maxa-nav-review.UZloYv add prototype scripts
git -C /private/tmp/maxa-nav-review.UZloYv commit -m "chore: capture page archetype baseline"
```

Expected: clean staging repository with one baseline commit.

- [ ] **Step 3: Run the baseline verification**

Run:

```bash
cd /private/tmp/maxa-nav-review.UZloYv/prototype
node scripts/build-tokens.cjs
npm run verify:prototype
npm run verify:inline-rail
npm test
```

Expected: all existing checks pass before changing their contract.

## Task 1: Lock the Universal Header Geometry with a Failing Test

**Files:**

- Modify: `/private/tmp/maxa-nav-review.UZloYv/scripts/verify-inline-rail.cjs`
- Modify: `/private/tmp/maxa-nav-review.UZloYv/prototype/js/features/page-header.js`
- Modify: `/private/tmp/maxa-nav-review.UZloYv/prototype/css/header.css`
- Modify: `/private/tmp/maxa-nav-review.UZloYv/prototype/css/variants.css`

- [ ] **Step 1: Replace the old center-alignment assertion**

In the `actionHeaderFrames` loop, measure top edges and DOM order instead of center lines:

```js
const actionGeometry = await page.evaluate(() => {
  const title = document.querySelector(".ph__title");
  const actions = document.querySelector(".ph__actions");
  const rows = [...document.querySelectorAll(".ph > *, .ph__sticky > *")]
    .filter((row) => row.matches(
      ".ph__crumbs, .ph__title-row, .ph__toolbar, .ph__primary-tabs, " +
      ".ph__secondary-tabs, .ph__segments, .ph__active",
    ))
    .map((row) => row.className);
  const titleRect = title?.getBoundingClientRect();
  const actionsRect = actions?.getBoundingClientRect();
  return {
    titleActionTopDelta: titleRect && actionsRect
      ? Math.abs(titleRect.top - actionsRect.top)
      : null,
    rows,
  };
});

if (
  actionGeometry.titleActionTopDelta == null ||
  actionGeometry.titleActionTopDelta > 0.5
) {
  fail(frame + " / variant " + variant +
    ": title and actions must share the top edge " + JSON.stringify(actionGeometry));
}
```

Add a second assertion that pages with and without actions have the same `.ph__title` top coordinate at the same viewport and crumb mode.

- [ ] **Step 2: Run the focused verifier and observe failure**

Run:

```bash
cd /private/tmp/maxa-nav-review.UZloYv/prototype
npm run verify:inline-rail
```

Expected: FAIL because `.ph__title-row` currently uses `align-items: center` and Variant B still has an action-only negative margin.

- [ ] **Step 3: Implement stable top alignment and fixed row order**

Change the shared row rule:

```css
.ph__title-row {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-xl);
  flex-wrap: wrap;
}

.ph__actions {
  margin-left: auto;
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}
```

Delete the Variant B selector below entirely:

```css
[data-variant="b"] .ph__title-row:has(.ph__actions) {
  margin-bottom: calc(-1 * var(--spacing-xl));
}
```

Refactor `PageHeader.render()` so all variants construct the same ordered `operationalRows` array. Variant C may wrap that array in `.ph__sticky`; variants A and B may change spacing, but no variant may merge or reorder rows:

```js
const operationalRows = [toolbar, subnav, segments, active].filter(Boolean);

if (v === "c" && operationalRows.length) {
  rows.push('<div class="ph__sticky">' + operationalRows.join("") + "</div>");
} else {
  rows.push(...operationalRows);
}
```

Remove `.ph__row--merged` behavior and the Variant A rule that moves segments into the toolbar flow.

- [ ] **Step 4: Verify and checkpoint**

Run:

```bash
cd /private/tmp/maxa-nav-review.UZloYv/prototype
npm run verify:inline-rail
git -C /private/tmp/maxa-nav-review.UZloYv add prototype/css/header.css prototype/css/variants.css prototype/js/features/page-header.js scripts/verify-inline-rail.cjs
git -C /private/tmp/maxa-nav-review.UZloYv commit -m "fix: stabilize page header geometry"
```

Expected: header geometry and existing navigation tests pass.

## Task 2: Add the Released Tabs and Skeleton Contracts

**Files:**

- Modify: `/private/tmp/maxa-nav-review.UZloYv/prototype/scripts/build-tokens.cjs`
- Modify: `/private/tmp/maxa-nav-review.UZloYv/prototype/css/tokens.css`
- Modify: `/private/tmp/maxa-nav-review.UZloYv/prototype/js/features/page-header.js`
- Modify: `/private/tmp/maxa-nav-review.UZloYv/prototype/css/header.css`
- Modify: `/private/tmp/maxa-nav-review.UZloYv/scripts/verify-inline-rail.cjs`

- [ ] **Step 1: Add failing component-provenance and semantics checks**

Assert that:

```js
const contracts = await page.evaluate(() => ({
  primary: document.querySelector('.ph__primary-tabs [role="tablist"]') !== null,
  secondary: document.querySelector('.ph__secondary-tabs [role="tablist"]') !== null,
  segmentGroup: document.querySelector('.ph__segments [role="group"]') !== null,
  tabToken: getComputedStyle(document.documentElement)
    .getPropertyValue("--tabs-list-bg").trim(),
  skeletonToken: getComputedStyle(document.documentElement)
    .getPropertyValue("--skeleton-bg").trim(),
}));
```

Primary tabs must use released `.maxa-tabs__list` and `.maxa-tabs__trigger` classes. Secondary tabs must use only `.ph__secondary-tabs`; segments must retain `.seg` and must not use tab classes. Render an exact synthetic header fixture inside the verifier for this contract so Task 2 does not depend on the catalog introduced in Task 3:

```js
const syntheticTabPage = {
  id: "tab-contract",
  title: "Custom",
  navigation: {
    primaryTabs: [
      { id: "library", label: "Custom Library" },
      { id: "generated", label: "Generated Packages" },
    ],
    secondaryTabs: [
      { id: "listings", label: "Listings" },
      { id: "testimonials", label: "Testimonials" },
    ],
  },
  filters: {
    segments: [
      { id: "all", label: "All" },
      { id: "pending", label: "Pending" },
    ],
  },
};
```

- [ ] **Step 2: Run the verifier and observe failure**

Run `npm run verify:inline-rail` from the staging prototype.

Expected: FAIL because Tabs/Skeleton component CSS is not generated and the two tab levels are not separated.

- [ ] **Step 3: Generate component tokens and released base CSS**

Append to `FILES`:

```js
"component-tabs.css",
"component-skeleton.css",
```

Replace the duplicated one-off UI CSS copying with this exact loop:

```js
const UI_COMPONENT_STYLES = [
  ["tag", "tag.css", "component-tag-base.css", "Tag"],
  ["maxa-logo", "maxa-logo.css", "component-maxa-logo-base.css", "MaxaLogo"],
  ["tabs", "tabs.css", "component-tabs-base.css", "Tabs"],
  ["skeleton", "skeleton.css", "component-skeleton-base.css", "Skeleton"],
];

for (const [folder, file, output, label] of UI_COMPONENT_STYLES) {
  const from = path.join(UI_SRC, folder, file);
  if (!fs.existsSync(from)) {
    console.error("missing source:", from);
    process.exitCode = 1;
    continue;
  }
  fs.writeFileSync(
    path.join(DEST, output),
    "/* GENERATED by scripts/build-tokens.cjs from @maxa/ui " +
      folder + "/" + file + " — do not edit. */\n" +
      fs.readFileSync(from, "utf8"),
  );
  console.log(output + " copied from released @maxa/ui " + label);
}
```

Import the four new generated files in `css/tokens.css`.

- [ ] **Step 4: Render the two tab levels as different patterns**

Add these methods to `PageHeader`:

```js
primaryTabsRow(page, ui) {
  const tabs = this.model(page).navigation.primaryTabs;
  if (!tabs.length) return "";
  return '<nav class="ph__primary-tabs" aria-label="Library view">' +
    '<div class="maxa-tabs__list" role="tablist">' +
    tabs.map((tab) =>
      '<button type="button" class="maxa-tabs__trigger" role="tab" ' +
      'data-page-control="primary-tab" data-value="' + U.esc(tab.id) + '" ' +
      'aria-selected="' + (ui.primaryTab === tab.id) + '">' +
      U.esc(tab.label) + '</button>'
    ).join("") + '</div></nav>';
},

secondaryTabsRow(page, ui) {
  const tabs = this.model(page).navigation.secondaryTabs;
  if (!tabs.length) return "";
  return '<nav class="ph__secondary-tabs" aria-label="Content type">' +
    '<div role="tablist">' + tabs.map((tab) =>
      '<button type="button" role="tab" data-page-control="secondary-tab" ' +
      'data-value="' + U.esc(tab.id) + '" aria-selected="' +
      (ui.secondaryTab === tab.id) + '">' + U.esc(tab.label) + '</button>'
    ).join("") + '</div></nav>';
},
```

Implement the underlined `SecondaryTabs` once in `header.css`, using Maxa semantic spacing, text, border, focus, and action-primary tokens. Do not copy its CSS into page-specific files.

Add one `model(page)` compatibility adapter inside `PageHeader`. New catalog pages consume the nested contract. Existing standalone comparison frames continue to work while they still provide flat `primaryAction`, `secondaryActions`, `searchPlaceholder`, `sortLabel`, `views`, `subnav`, and `segments` fields:

```js
model(page) {
  return {
    actions: page.actions || {
      secondary: page.secondaryActions || [],
      primary: page.primaryAction || null,
    },
    toolbar: page.toolbar || {
      search: page.searchPlaceholder || "",
      filter: page.filter || null,
      sort: page.sortLabel || "",
      views: page.views || [],
    },
    navigation: page.navigation || {
      primaryTabs: (page.subnav || []).map((tab, index) => ({
        id: tab.id || "tab-" + index,
        label: tab.label,
        current: Boolean(tab.current),
      })),
      secondaryTabs: [],
    },
    filters: page.filters || { segments: page.segments || [] },
  };
},
```

Add a local compatibility default so Task 2 has no dependency on the catalog introduced in Task 3:

```js
defaultUi(model) {
  const primary = model.navigation.primaryTabs.find((tab) => tab.current) ||
    model.navigation.primaryTabs[0];
  const secondary = model.navigation.secondaryTabs.find((tab) => tab.current) ||
    model.navigation.secondaryTabs[0];
  return {
    primaryTab: primary?.id || "",
    secondaryTab: secondary?.id || "",
    segment: model.filters.segments[0]?.id || "",
    view: model.toolbar.views[0]?.id || "",
    query: "",
  };
},
```

At the beginning of `render()`, compute `const model = this.model(page)` and `const ui = opts.ui || this.defaultUi(model)`. Pass `model.actions` to `titleRow`, `model.toolbar` to `hasToolbar` and `toolbarRow`, `model.navigation` to the two tab-row methods, and `model.filters.segments` to `segmentsRow`. Render the outer header as `<div class="ph" data-page-id="…">`. This makes the nested contract authoritative without breaking the historical comparison frames.

- [ ] **Step 5: Rebuild, verify, and checkpoint**

Run:

```bash
cd /private/tmp/maxa-nav-review.UZloYv/prototype
node scripts/build-tokens.cjs
npm run verify:prototype
npm run verify:inline-rail
git -C /private/tmp/maxa-nav-review.UZloYv add prototype/css prototype/js/features/page-header.js prototype/scripts/build-tokens.cjs scripts/verify-inline-rail.cjs
git -C /private/tmp/maxa-nav-review.UZloYv commit -m "feat: add page tab and skeleton contracts"
```

Expected: generated files have provenance comments and Primary Tabs, Secondary Tabs, and Segmented Control remain three semantically distinct structures.

## Task 3: Introduce the Page Profile Registry and Catalog Resolver

**Files:**

- Create: `/private/tmp/maxa-nav-review.UZloYv/prototype/data/page-archetypes.js`
- Create: `/private/tmp/maxa-nav-review.UZloYv/prototype/js/features/page-catalog.js`
- Modify: `/private/tmp/maxa-nav-review.UZloYv/prototype/frame.html`
- Modify: `/private/tmp/maxa-nav-review.UZloYv/scripts/verify-inline-rail.cjs`

- [ ] **Step 1: Write a failing registry coverage test**

Traverse every selectable `NAV_MODEL` node and call `PageCatalog.resolve(node.id)`. Require a non-missing profile and one of the approved archetype ids from the exact map above. Also assert that template branches resolve through template rules, not through `PAGES.templates` cloning.

```js
const catalogCoverage = await page.evaluate(() => {
  const nodes = [];
  const visit = (node) => {
    nodes.push(node.id);
    (node.children || []).forEach(visit);
  };
  visit(NAV_MODEL.dashboard);
  NAV_MODEL.groups.forEach((group) => group.items.forEach(visit));
  NAV_MODEL.footer.forEach(visit);
  return nodes.map((id) => {
    const profile = PageCatalog.resolve(id);
    return { id, pageId: profile.id, archetype: profile.results?.archetype || "" };
  });
});
```

Exclude only `settings`, because it intentionally uses the existing settings renderer.

- [ ] **Step 2: Run the verifier and observe failure**

Run `npm run verify:inline-rail`.

Expected: FAIL because `PageCatalog` and the profile registry do not exist.

- [ ] **Step 3: Create centralized fixtures and explicit profiles**

`data/page-archetypes.js` must define:

```js
const PAGE_VIEW_OPTIONS = {
  gridList: [
    { id: "grid", icon: "SquaresFour", label: "Grid view" },
    { id: "list", icon: "Rows", label: "List view" },
  ],
  gridDensity: [
    { id: "comfortable", icon: "SquaresFour", label: "Comfortable grid" },
    { id: "compact", icon: "DotsNine", label: "Compact grid" },
    { id: "dense", icon: "DotsNine", label: "Dense grid" },
  ],
};

const ARCHETYPE_FIXTURES = Object.freeze({
  dashboard: PAGES.dashboardOverview,
  designs: PAGES.dashboard.populated.items,
  compliance: PAGES.compliance.populated.items,
  ampHub: PAGES.ampHub,
  templates: PAGES.templates.populated.items,
  workspaces: PAGES.partners?.populated?.items || [
    { title: "Marketing Team", meta: "12 members", locked: false },
    { title: "Brokerage Office", meta: "Managed workspace", locked: true },
  ],
});
```

Add named, static, image-free fixture arrays for scheduled posts, manual listings, listing packages, company packages, testimonial packages, custom packages, neighborhoods, shared packages, archived packages, swag products, concierge services, tutorials, and support panels. Each populated collection must have at least three representative items except pages whose audited product capture contains fewer. Use only labels already present in the approved specification, navigation model, or supplied captures.

Create `NAV_PAGE_PROFILES` with explicit entries for the Dashboard group, main roots, eight Automated Packages children, utility roots, and settings. Add deterministic branch rules for Templates and Explore Tags:

```js
const TEMPLATE_BRANCHES = Object.freeze({
  "print-templates": { aspect: "print", meta: "Print Template" },
  "digital-templates": { aspect: "digital", meta: "Digital Template" },
  "amp-designs": { aspect: "package", meta: "AMP Design" },
  admin: { aspect: "admin", meta: "Admin Template" },
});

const PROFILE_RULES = [
  {
    matches: (path) => path.some((node) => node.id === "swag-shop"),
    build: templateShopProfile("product-collection", "swagProducts"),
  },
  {
    matches: (path) => path.some((node) => node.id === "concierge-shop"),
    build: templateShopProfile("service-collection", "conciergeServices"),
  },
  {
    matches: (path) => path.some((node) => node.id === "templates"),
    build: templateMasonryProfile,
  },
  {
    matches: (path) => path.some((node) => node.id === "explore-tags"),
    build: exploreTagProfile,
  },
];
```

Rules are evaluated in the shown order so Swag and Concierge never fall into template masonry.

- [ ] **Step 4: Implement `PageCatalog` without generic borrowing**

The public API is:

```js
const PageCatalog = {
  resolve(activeId) {},
  defaults(page) {},
  filterItems(page, ui) {},
  count(page, ui) {},
  state(page, ui) {},
};
```

`PageCatalog` governs navigation destinations only. Existing standalone A/B/C comparison frames continue to pass their audited flat `PAGES` objects through the `PageHeader.model()` adapter and the legacy branches in `Results`; this avoids changing unrelated historical comparison fixtures while the navigation prototype becomes systematic.

`resolve()` uses `SideNav.findNode()` only through a passed path helper or an internal navigation traversal; it must not call `contentSource()` and must never clone My Designs or Templates as a fallback. Unknown ids return:

```js
{
  id: "missing-" + activeId,
  title: "Page unavailable",
  titleIcon: "WarningCircle",
  toolbar: {},
  navigation: {},
  filters: {},
  results: { archetype: "missing", fixture: null, count: false },
  states: {
    supported: ["empty"],
    empty: {
      icon: "WarningCircle",
      title: "Page unavailable",
      body: "This navigation destination has no configured page surface.",
    },
    loadingCount: 0,
  },
}
```

- [ ] **Step 5: Load the new modules in deterministic order**

In `frame.html` load `data/page-archetypes.js` after `data/sidenav.js`, and load `js/features/page-catalog.js` after `js/state.js` and before `page-header.js`.

- [ ] **Step 6: Verify and checkpoint**

Run both prototype verifiers, then:

```bash
git -C /private/tmp/maxa-nav-review.UZloYv add prototype/data/page-archetypes.js prototype/js/features/page-catalog.js prototype/frame.html scripts/verify-inline-rail.cjs
git -C /private/tmp/maxa-nav-review.UZloYv commit -m "feat: define navigation page catalog"
```

Expected: every selectable non-settings navigation node resolves to an approved archetype; no resolver result uses `PAGES.dashboard` or `PAGES.templates` as a generic fallback.

## Task 4: Add In-Memory Page Control State and Interactions

**Files:**

- Modify: `/private/tmp/maxa-nav-review.UZloYv/prototype/js/state.js`
- Modify: `/private/tmp/maxa-nav-review.UZloYv/prototype/js/features/page-header.js`
- Modify: `/private/tmp/maxa-nav-review.UZloYv/prototype/js/router.js`
- Modify: `/private/tmp/maxa-nav-review.UZloYv/scripts/verify-inline-rail.cjs`

- [ ] **Step 1: Add failing interaction tests**

For Custom, click a different Primary Tab and Secondary Tab and require one selected tab in each group. For Compliance, click Approved and require exactly one pressed segment. Enter a search query and require the count and visible result set to update. Click the list view and require `data-view="list"` on the result root. Reload and require catalog defaults rather than leaked state from another page.

- [ ] **Step 2: Run the verifier and observe failure**

Run `npm run verify:inline-rail`.

Expected: FAIL because header controls are presentational only.

- [ ] **Step 3: Add page-local state**

Extend `STATE`:

```js
pageUi: Object.create(null),

uiFor(page) {
  return Object.assign({}, PageCatalog.defaults(page), this.pageUi[page.id] || {});
},

setPageUi(pageId, patch) {
  this.pageUi[pageId] = Object.assign({}, this.pageUi[pageId] || {}, patch);
},

resetPageUi() {
  this.pageUi = Object.create(null);
},
```

Keep this state out of the URL hash so review URLs remain stable. Clear it only when changing frame/scenario, not on every rerender within one page.

- [ ] **Step 4: Bind controls once**

Add `PageHeader.bind(root, rerender)` and call it once from `Router.mount()`:

```js
PageHeader.bind(root, () => Router.render());
```

Use delegated `click` and `input` handlers. Supported controls and patches are exact:

```js
const PATCH_BY_CONTROL = {
  "primary-tab": "primaryTab",
  "secondary-tab": "secondaryTab",
  segment: "segment",
  view: "view",
};
```

Search uses `data-page-control="search"` and patches `query`. Every header root carries `data-page-id`. Buttons expose `data-value`, `aria-selected` or `aria-pressed`, and visible focus states. Ignore disabled actions.

- [ ] **Step 5: Verify and checkpoint**

Run both verifiers and commit:

```bash
git -C /private/tmp/maxa-nav-review.UZloYv add prototype/js/state.js prototype/js/features/page-header.js prototype/js/router.js scripts/verify-inline-rail.cjs
git -C /private/tmp/maxa-nav-review.UZloYv commit -m "feat: make page controls interactive"
```

Expected: control state changes without navigation-tree regression and remains isolated per page id.

## Task 5: Build Shared Collection Renderers

**Files:**

- Create: `/private/tmp/maxa-nav-review.UZloYv/prototype/js/features/result-archetypes.js`
- Create: `/private/tmp/maxa-nav-review.UZloYv/prototype/css/result-archetypes.css`
- Modify: `/private/tmp/maxa-nav-review.UZloYv/prototype/js/features/results.js`
- Modify: `/private/tmp/maxa-nav-review.UZloYv/prototype/frame.html`
- Modify: `/private/tmp/maxa-nav-review.UZloYv/scripts/verify-inline-rail.cjs`

- [ ] **Step 1: Add failing renderer-contract tests**

Navigate to one representative page for every collection renderer and assert the root selector and its page-specific anatomy:

```js
const COLLECTION_CASES = [
  ["my-designs", "design-collection", ".result-card--folder"],
  ["compliance", "compliance-requests", ".result-card__status"],
  ["manual-listings", "manual-listing-collection", ".result-card__address"],
  ["package-company", "listing-package-collection", ".result-card__listing-package"],
  ["package-testimonial", "company-package-collection", ".result-card__approval"],
  ["package-custom-testimonial", "testimonial-package-collection", ".preview-collage"],
  ["package-market-stats", "custom-package-collection", ".result-card__package-meta"],
  ["package-shared", "shared-package-collection", ".result-card__owner"],
  ["package-archive", "archive-package-collection", ".result-card__archived"],
  ["most-popular-templates", "template-masonry", ".template-card"],
  ["swag-shop", "product-collection", ".product-card"],
  ["concierge-shop", "service-collection", ".service-card"],
  ["workspaces", "workspace-collection", ".workspace-card"],
  ["tutorials", "tutorial-collection", ".tutorial-card"],
  ["support", "support-panels", ".support-panel"],
];
```

These are the audited stable ids. In particular, `package-company` labels My Listings, `package-testimonial` labels Company, `package-custom-testimonial` labels Testimonials, `package-market-stats` labels Custom, and `package-custom` labels Market Stats. Do not rename the navigation model to make the internal ids resemble the labels.

- [ ] **Step 2: Run and observe failure**

Run `npm run verify:inline-rail`.

Expected: FAIL because all these destinations still render the generic `.cards` anatomy.

- [ ] **Step 3: Implement the renderer registry**

Create this stable dispatch API:

```js
const ResultArchetypes = {
  render(page, ui) {
    const method = this.registry[page.results.archetype] || this.missing;
    return method.call(this, page, ui);
  },

  registry: {
    "design-collection": function (page, ui) { return this.designs(page, ui); },
    "compliance-requests": function (page, ui) { return this.compliance(page, ui); },
    "manual-listing-collection": function (page, ui) { return this.manualListings(page, ui); },
    "listing-package-collection": function (page, ui) { return this.packages(page, ui, "listing"); },
    "company-package-collection": function (page, ui) { return this.packages(page, ui, "company"); },
    "testimonial-package-collection": function (page, ui) { return this.testimonials(page, ui); },
    "custom-package-collection": function (page, ui) { return this.packages(page, ui, "custom"); },
    "shared-package-collection": function (page, ui) { return this.packages(page, ui, "shared"); },
    "archive-package-collection": function (page, ui) { return this.packages(page, ui, "archive"); },
    "template-masonry": function (page, ui) { return this.templates(page, ui); },
    "product-collection": function (page, ui) { return this.products(page, ui); },
    "service-collection": function (page, ui) { return this.services(page, ui); },
    "workspace-collection": function (page, ui) { return this.workspaces(page, ui); },
    "tutorial-collection": function (page, ui) { return this.tutorials(page, ui); },
    "support-panels": function (page, ui) { return this.support(page, ui); },
  },
};
```

Every populated renderer must use this wrapper around its generated card markup:

```js
return '<section class="results result-archetype" data-result-archetype="' +
  U.esc(page.results.archetype) + '" data-view="' + U.esc(ui.view) + '">' +
  cardsMarkup + '</section>';
```

Use `PageCatalog.filterItems(page, ui)` for tabs, segments, and search. Use semantic headings and buttons/links where product capture shows an action. Do not add invented chips below search.

- [ ] **Step 4: Implement shared visual rules**

All static preview regions use:

```css
.result-preview {
  background: var(--pattern-card-placeholder-bg);
}
```

Do not call these regions skeletons and do not animate them. Preserve different aspect ratios with `data-aspect="portrait|landscape|square|print|digital|package"`. Implement grid and list presentation through `[data-view]`; do not duplicate markup.

- [ ] **Step 5: Delegate from `Results` and load the modules**

`Results.render(page, opts)` becomes:

```js
render(page, opts) {
  if (!page.results?.archetype) return this.legacyRender(page, opts);
  const ui = opts.ui || PageCatalog.defaults(page);
  const state = PageCatalog.state(page, ui);
  if (state === "loading") return this.loading(page);
  if (state === "empty") return this.state(page.states.empty);
  return ResultArchetypes.render(page, ui);
},
```

Move the current switch statement into `legacyRender(page, opts)` unchanged. This preserves the standalone historical comparison frames; every navigation destination goes through `page.results.archetype` and therefore cannot use the legacy generic-card fallback.

Load `result-archetypes.css` after `surfaces.css` and `result-archetypes.js` before `results.js`.

- [ ] **Step 6: Verify and checkpoint**

Run `node scripts/build-tokens.cjs`, both verifiers, and `npm test`, then commit all Task 5 files.

Expected: every collection family has a recognizable, source-based anatomy and uses the common placeholder token.

## Task 6: Build Dashboard, AMP Hub, Calendar, and Market Stats Surfaces

**Files:**

- Modify: `/private/tmp/maxa-nav-review.UZloYv/prototype/js/features/result-archetypes.js`
- Modify: `/private/tmp/maxa-nav-review.UZloYv/prototype/css/result-archetypes.css`
- Modify: `/private/tmp/maxa-nav-review.UZloYv/prototype/js/features/results.js`
- Modify: `/private/tmp/maxa-nav-review.UZloYv/prototype/data/page-archetypes.js`
- Modify: `/private/tmp/maxa-nav-review.UZloYv/scripts/verify-inline-rail.cjs`

- [ ] **Step 1: Add failing complex-surface tests**

Assert:

- Dashboard has exactly one `.ph`, no `.dashboard-overview__welcome`, and no search inside results.
- Dashboard results include setup notice, six named content sections, and static placeholder cards.
- AMP Hub includes notice plus My Listings, Testimonials, My Neighborhoods, and Company Packages sections.
- Scheduled includes seven weekday columns and representative scheduled-post cards.
- Market Stats includes a labeled location form and neighborhood-card collection.
- Dashboard, Scheduled, and Market Stats each expose a distinct `data-result-archetype`.

- [ ] **Step 2: Run and observe failure**

Run `npm run verify:inline-rail`.

Expected: FAIL because Dashboard bypasses PageHeader and the complex destination surfaces are not catalog-driven.

- [ ] **Step 3: Add the four renderer entries**

Add exact registry keys:

```js
"dashboard-sections": function (page, ui) { return this.dashboard(page, ui); },
"amp-hub-sections": function (page, ui) { return this.ampHub(page, ui); },
"scheduled-calendar": function (page, ui) { return this.calendar(page, ui); },
"market-stats-surface": function (page, ui) { return this.marketStats(page, ui); },
```

Move the personal greeting into Dashboard header metadata. Keep the setup notice and section data in results. Remove this entire body fragment from `Results.dashboardOverview()`:

```html
<header class="dashboard-overview__welcome">...</header>
```

Remove its nested search control. There is one search field, in the universal toolbar.

- [ ] **Step 4: Model Calendar and Market Stats with existing primitives**

Calendar uses SegmentedControl for Week/Month/Schedule, not navigation tabs. The visible Week fixture has seven day columns, accessible date headings, and cards containing title, channel metadata, and time.

Market Stats uses released Input, Select, Button, and card contracts. Its form remains above the neighborhood collection within the results region; it does not create a second page header.

- [ ] **Step 5: Verify and checkpoint**

Run all prototype tests and commit:

```bash
git -C /private/tmp/maxa-nav-review.UZloYv add prototype/data/page-archetypes.js prototype/js/features/result-archetypes.js prototype/js/features/results.js prototype/css/result-archetypes.css scripts/verify-inline-rail.cjs
git -C /private/tmp/maxa-nav-review.UZloYv commit -m "feat: add dashboard hub calendar and stats surfaces"
```

Expected: the four complex pages differ structurally while sharing the universal header.

## Task 7: Wire Navigation to the Catalog and Remove the Generic Fallback

**Files:**

- Modify: `/private/tmp/maxa-nav-review.UZloYv/prototype/js/features/sidenav.js`
- Modify: `/private/tmp/maxa-nav-review.UZloYv/prototype/data/sidenav.js`
- Modify: `/private/tmp/maxa-nav-review.UZloYv/prototype/js/features/page-header.js`
- Modify: `/private/tmp/maxa-nav-review.UZloYv/prototype/js/features/results.js`
- Modify: `/private/tmp/maxa-nav-review.UZloYv/scripts/verify-inline-rail.cjs`

- [ ] **Step 1: Strengthen all-node verification before rewiring**

Replace the old “one PageHeader plus any `.results`” condition with:

```js
const surface = await page.evaluate(() => ({
  title: document.querySelector(".app__surface .ph__title")?.textContent.trim() || "",
  pageHeaders: document.querySelectorAll(".app__surface > .ph").length,
  settings: document.querySelectorAll(".app__surface > .secsplit").length,
  archetype: document.querySelector(".app__surface [data-result-archetype]")
    ?.getAttribute("data-result-archetype") || "",
  missing: document.querySelector('[data-result-archetype="missing"]') !== null,
}));
```

For every non-settings node require one PageHeader, matching label, an approved archetype, and `missing === false`. Dashboard is no longer an exception.

- [ ] **Step 2: Run and observe failure**

Run `npm run verify:inline-rail`.

Expected: FAIL because Dashboard bypasses PageHeader and other nodes still borrow generic pages.

- [ ] **Step 3: Replace `pageForNavigation()` with catalog resolution**

Delete `contentSource()` and `pageForNavigation()`. Delete `NAV_CONTENT_SOURCES` from `data/sidenav.js`. Make `SideNav.content()` exact:

```js
content(nav, options) {
  if (nav.active === "settings") {
    return this.settingsSurface({ secondaryActive: options.secondaryActive || "general" });
  }

  const page = PageCatalog.resolve(nav.active);
  const ui = STATE.uiFor(page);
  return PageHeader.render(page, {
    state: PageCatalog.state(page, ui),
    variant: options.variant,
    crumbs: STATE.crumbs,
    ui,
  }) + Results.render(page, { ui });
},
```

Do not retain the Dashboard special case. Do not retain fallback-page cloning.

- [ ] **Step 4: Make result count dynamic and correctly spaced**

`PageHeader.activeRow()` uses `PageCatalog.count(page, ui)`. It renders only the count/summary. Preserve the measured contract:

- 24 px from the preceding visible header row to the result count.
- 12 px from result count to the first result region.
- no `.tag` or category chip beside the count.

- [ ] **Step 5: Verify all page destinations and checkpoint**

Run:

```bash
cd /private/tmp/maxa-nav-review.UZloYv/prototype
npm run verify:prototype
npm run verify:inline-rail
npm test
git -C /private/tmp/maxa-nav-review.UZloYv add prototype/data/sidenav.js prototype/js/features/sidenav.js prototype/js/features/page-header.js prototype/js/features/results.js scripts/verify-inline-rail.cjs
git -C /private/tmp/maxa-nav-review.UZloYv commit -m "refactor: route navigation through page catalog"
```

Expected: every selectable node opens its own resolved configuration and approved archetype. Search/category metadata is no longer inherited from unrelated pages.

## Task 8: Add Populated, Empty, and True Loading States

**Files:**

- Modify: `/private/tmp/maxa-nav-review.UZloYv/prototype/js/features/results.js`
- Modify: `/private/tmp/maxa-nav-review.UZloYv/prototype/js/features/result-archetypes.js`
- Modify: `/private/tmp/maxa-nav-review.UZloYv/prototype/css/result-archetypes.css`
- Modify: `/private/tmp/maxa-nav-review.UZloYv/prototype/data/frames.js`
- Modify: `/private/tmp/maxa-nav-review.UZloYv/scripts/verify-inline-rail.cjs`

- [ ] **Step 1: Add failing state-contract tests**

For one representative page per archetype, render `populated`, `empty`, and `loading` through query/frame state. Require:

- populated: static `.result-preview`, no `.maxa-skeleton`, no `aria-busy="true"`;
- empty: bounded `.state` region with page-specific heading, no card grid;
- loading: `[aria-busy="true"]`, released `.maxa-skeleton`, no populated labels;
- `prefers-reduced-motion: reduce`: skeleton animation is disabled.

- [ ] **Step 2: Run and observe failure**

Run `npm run verify:inline-rail`.

Expected: FAIL because only a subset of legacy pages exposes explicit states.

- [ ] **Step 3: Implement one state wrapper for all archetypes**

Add:

```js
loading(page) {
  const count = page.states.loadingCount || 4;
  return '<section class="results result-loading" data-result-archetype="' +
    U.esc(page.results.archetype) + '" aria-busy="true" aria-label="Loading ' +
    U.esc(page.title) + '">' + Array.from({ length: count }, () =>
      '<article class="result-loading__card">' +
      '<div class="maxa-skeleton result-loading__preview"></div>' +
      '<div class="maxa-skeleton result-loading__line"></div>' +
      '<div class="maxa-skeleton result-loading__line result-loading__line--short"></div>' +
      '</article>'
    ).join("") + '</section>';
},
```

Complex archetypes may set `loadingCount`, but they use this same component contract. Static previews remain `#E7EBF2` through `--pattern-card-placeholder-bg`; loading skeleton color comes from the released Skeleton token.

- [ ] **Step 4: Add review frames without multiplying production code**

Add representative state frames for Dashboard, Compliance, Scheduled, Custom, Templates, Workspaces, and Support. Frames change only `active` and `pageState`; they do not define page markup.

- [ ] **Step 5: Verify and checkpoint**

Run all tests and commit Task 8 files.

Expected: every renderer has the same state lifecycle and no static preview is mislabeled or animated as loading.

## Task 9: Accessibility, Responsive, and Plan-Fit Review

**Files:**

- Modify: `/private/tmp/maxa-nav-review.UZloYv/scripts/verify-inline-rail.cjs`
- Verify/fix: `/private/tmp/maxa-nav-review.UZloYv/prototype/css/result-archetypes.css`
- Verify/fix: `/private/tmp/maxa-nav-review.UZloYv/prototype/css/header.css`
- Verify/fix: `/private/tmp/maxa-nav-review.UZloYv/prototype/js/features/page-header.js`
- Verify/fix: `/private/tmp/maxa-nav-review.UZloYv/prototype/js/features/result-archetypes.js`

- [ ] **Step 1: Add keyboard and role verification**

Verify:

- one `<h1>` per page;
- tablists contain tabs and exactly one selected tab;
- segmented controls use buttons and exactly one pressed item;
- search has an accessible label;
- view switch has a group label and one pressed button;
- keyboard focus remains visible;
- disabled actions do not fire;
- result cards have meaningful headings and do not expose decorative placeholders.

- [ ] **Step 2: Add viewport verification**

Run the archetype matrix at 1440, 1280, 1024, and 768 px content widths. Require no horizontal document overflow. At narrow widths, actions and toolbar controls wrap below their own row start without moving the title vertically or reordering semantic rows.

- [ ] **Step 3: Run the full suite and fix only evidenced failures**

Run:

```bash
cd /private/tmp/maxa-nav-review.UZloYv/prototype
node scripts/build-tokens.cjs
npm run verify:prototype
npm run verify:inline-rail
npm test
```

Expected: all checks pass.

- [ ] **Step 4: Perform explicit plan-fit review**

Compare implementation against every row in “Exact Navigation-to-Archetype Map” and every requirement in the approved design spec. Record failures as verifier cases before fixing them. Explicitly confirm:

- title top alignment does not change with actions;
- primary action is last and far right;
- search occupies the separate second row;
- both tab types are present where mapped;
- Compliance/Scheduled use SegmentedControl;
- all gray static preview blocks use `#E7EBF2` via token;
- no destination borrows a generic page;
- no invented applied-filter chip returns;
- Settings and navigation tree remain unchanged.

- [ ] **Step 5: Checkpoint the reviewed implementation**

```bash
git -C /private/tmp/maxa-nav-review.UZloYv add prototype scripts/verify-inline-rail.cjs
git -C /private/tmp/maxa-nav-review.UZloYv commit -m "test: verify page archetype system"
git -C /private/tmp/maxa-nav-review.UZloYv status --short
```

Expected: clean staging history and all checks passing.

## Task 10: Update Documentation, Sync Canonical Files, and Re-verify Canonical

**Files:**

- Modify: `/private/tmp/maxa-nav-review.UZloYv/prototype/README.md`
- Create: `/private/tmp/maxa-nav-review.UZloYv/prototype/DESIGN-SYSTEM-GAPS.md`
- Sync changed prototype files to the canonical prototype path.
- Sync `verify-inline-rail.cjs` to the canonical audit scripts path.

- [ ] **Step 1: Document the architecture and design-system gap**

README must name `PageCatalog`, `PageHeader`, and `ResultArchetypes`, list the supported archetypes, explain static placeholders versus true loading skeletons, and give the full verification commands.

Record one library gap: the underlined `SecondaryTabs` product pattern exists in production captures but is not a released standalone `maxa-ui` component. The prototype owns one token-based implementation; individual pages may not fork it.

- [ ] **Step 2: Capture review screenshots**

Use the existing verifier screenshot output to capture at minimum:

- Dashboard populated;
- My Designs with actions;
- Compliance with Pending selected;
- Scheduled Week mode;
- AMP Hub;
- Custom with both tab levels;
- Templates masonry;
- Swag products;
- Workspaces;
- loading and empty representatives.

Expected: visual evidence shows different content anatomy while the header alignment remains stable.

- [ ] **Step 3: Sync only the reviewed deliverables**

After user-authorized write access to CloudDocs, run:

```bash
rsync -a --exclude='.git/' "/private/tmp/maxa-nav-review.UZloYv/prototype/" "/Users/igorstetsenko/Library/Mobile Documents/com~apple~CloudDocs/Work/Maxadesigns.com/AI/Client Side Updates and Improvements/prototypes/header-settings-explorations/"
rsync -a "/private/tmp/maxa-nav-review.UZloYv/scripts/verify-inline-rail.cjs" "/Users/igorstetsenko/Library/Mobile Documents/com~apple~CloudDocs/Work/Maxadesigns.com/AI/Client Side Updates and Improvements/2026-08-18-current-ui-audit/scripts/verify-inline-rail.cjs"
```

Do not use `--delete`.

- [ ] **Step 4: Verify the canonical copy, not staging**

Run from the canonical prototype directory:

```bash
node scripts/build-tokens.cjs
npm run verify:prototype
npm run verify:inline-rail
npm test
```

Expected: the same passing result as staging. A staging-only pass is not completion.

- [ ] **Step 5: Final diff audit**

Run:

```bash
rsync -ain --exclude='.git/' "/private/tmp/maxa-nav-review.UZloYv/prototype/" "/Users/igorstetsenko/Library/Mobile Documents/com~apple~CloudDocs/Work/Maxadesigns.com/AI/Client Side Updates and Improvements/prototypes/header-settings-explorations/"
git -C /Users/igorstetsenko/Projects/maxa-ui status --short
```

Expected: no staging-to-canonical source differences; only the intended spec/plan files are changed or committed in `maxa-ui`; the three unrelated pre-existing untracked plans remain untouched.

## Completion Criteria

The work is complete only when:

1. Every selectable non-settings navigation destination resolves to an approved archetype.
2. Dashboard uses the same universal PageHeader and no longer contains a second welcome/search header.
3. Titles and right-side actions share a top edge and title position does not jump.
4. Search remains on the second row; Primary Action remains last and far right.
5. Primary Tabs, Secondary Tabs, and SegmentedControl retain distinct roles and styling.
6. Search, tab, segment, and view controls visibly update results.
7. Populated, empty, and loading states exist for every archetype.
8. Static preview blocks use `--pattern-card-placeholder-bg: #E7EBF2`; only loading skeletons shimmer.
9. The recursive navigation tree and Settings surface pass their pre-existing regressions.
10. Staging and canonical verification suites both pass after sync.
