# Client Navigation and Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the canonical Maxa client-shell prototype with the approved production menu structure, balanced rail spacing, a clearly editable navigation search, and a Dashboard overview surface.

**Architecture:** Keep the existing data-driven recursive renderer. Model Dashboard as the pinned root disclosure rendered above search, keep every other root in the single scroll tree, and introduce one dedicated Dashboard overview page/result renderer using existing Maxa tokens and neutral placeholder media.

**Tech Stack:** Static HTML, CSS custom properties, browser-native JavaScript, Phosphor icon paths already bundled in `js/icons.js`, Playwright 1.61.1 regression scripts.

---

## Working directories and file responsibilities

Canonical prototype root:

```text
/Users/igorstetsenko/Library/Mobile Documents/com~apple~CloudDocs/Work/Maxadesigns.com/AI/Client Side Updates and Improvements/prototypes/header-settings-explorations
```

Verification root:

```text
/Users/igorstetsenko/Library/Mobile Documents/com~apple~CloudDocs/Work/Maxadesigns.com/AI/Client Side Updates and Improvements/2026-08-18-current-ui-audit/scripts
```

- `data/sidenav.js`: navigation content, order, source mapping, scenario defaults, model validation.
- `js/features/sidenav.js`: pinned Dashboard branch rendering, selection/disclosure state, route-to-surface mapping.
- `css/sidenav.css`: row/search geometry and state styling.
- `data/pages.js`: Dashboard overview content model.
- `js/features/results.js`: semantic Dashboard overview markup.
- `css/surfaces.css`: Dashboard-specific layout and neutral preview placeholders.
- `verify-inline-rail.cjs`: focused navigation interaction and geometry contract.
- `verify-header-settings.cjs`: complete frame matrix and screenshot regression.

The canonical prototype is not inside a Git repository. Create a recoverable `/private/tmp` snapshot before editing. Git commits apply only to this plan/spec repository; source changes must be reported with their exact files and verification output.

### Task 1: Lock the approved navigation contract with failing browser assertions

**Files:**
- Modify: `2026-08-18-current-ui-audit/scripts/verify-inline-rail.cjs`

- [ ] **Step 1: Back up the canonical prototype**

Run:

```bash
rsync -a "/Users/igorstetsenko/Library/Mobile Documents/com~apple~CloudDocs/Work/Maxadesigns.com/AI/Client Side Updates and Improvements/prototypes/header-settings-explorations/" "/private/tmp/maxa-client-nav-before-2026-09-01/"
```

Expected: `/private/tmp/maxa-client-nav-before-2026-09-01/frame.html` exists and the source tree is unchanged.

- [ ] **Step 2: Add the exact root-order and Dashboard-model assertions**

Immediately after the first `nav-dashboard` navigation, add:

```js
const approvedNavigationModel = await page.evaluate(() => ({
  dashboard: {
    id: NAV_MODEL.dashboard?.id || "",
    label: NAV_MODEL.dashboard?.label || "",
    icon: NAV_MODEL.dashboard?.icon || "",
    children: (NAV_MODEL.dashboard?.children || []).map((node) => node.id),
  },
  roots: NAV_MODEL.groups.flatMap((group) => group.items.map((node) => node.id)),
  captions: NAV_MODEL.groups.map((group) => group.caption).filter(Boolean),
  footer: NAV_MODEL.footer.map((node) => node.id),
}));
const expectedRoots = [
  "manual-listings", "marketing-packages", "templates", "workspaces",
  "explore-tags", "tutorials", "support", "settings",
];
if (
  approvedNavigationModel.dashboard.id !== "dashboard" ||
  approvedNavigationModel.dashboard.label !== "Dashboard" ||
  approvedNavigationModel.dashboard.icon !== "Desktop" ||
  JSON.stringify(approvedNavigationModel.dashboard.children) !==
    JSON.stringify(["my-designs", "compliance", "scheduled"]) ||
  JSON.stringify(approvedNavigationModel.roots) !== JSON.stringify(expectedRoots) ||
  approvedNavigationModel.captions.length || approvedNavigationModel.footer.length
) {
  fail("structure: approved production root order or Dashboard children are incorrect");
}
```

- [ ] **Step 3: Add rendered geometry and search-affordance assertions**

Add after the model assertion:

```js
const approvedGeometry = await page.evaluate(() => {
  const dashboard = document.querySelector('[data-nav-disclosure="dashboard"]');
  const item = document.querySelector('[data-nav-id="manual-listings"]');
  const search = document.querySelector(".nv__search");
  const field = document.querySelector(".nv__search .field");
  const rail = document.querySelector(".nv__col");
  const itemStyle = item ? getComputedStyle(item) : null;
  const searchStyle = search ? getComputedStyle(search) : null;
  const dashboardStyle = dashboard ? getComputedStyle(dashboard) : null;
  const fieldStyle = field ? getComputedStyle(field) : null;
  return {
    dashboardHeight: dashboard?.getBoundingClientRect().height || 0,
    dashboardFontSize: dashboardStyle?.fontSize || "",
    itemHeight: item?.getBoundingClientRect().height || 0,
    itemFontSize: itemStyle?.fontSize || "",
    itemMarginLeft: itemStyle?.marginLeft || "",
    itemMarginRight: itemStyle?.marginRight || "",
    searchMarginLeft: searchStyle?.marginLeft || "",
    searchMarginRight: searchStyle?.marginRight || "",
    searchBackground: fieldStyle?.backgroundColor || "",
    searchBorderStyle: fieldStyle?.borderTopStyle || "",
    searchBorderWidth: fieldStyle?.borderTopWidth || "",
  };
});
if (
  approvedGeometry.dashboardHeight !== 36 || approvedGeometry.itemHeight !== 36 ||
  approvedGeometry.dashboardFontSize !== approvedGeometry.itemFontSize ||
  approvedGeometry.itemMarginLeft !== "12px" || approvedGeometry.itemMarginRight !== "12px" ||
  approvedGeometry.searchMarginLeft !== "16px" || approvedGeometry.searchMarginRight !== "16px" ||
  approvedGeometry.searchBorderStyle !== "solid" || approvedGeometry.searchBorderWidth !== "1px" ||
  approvedGeometry.searchBackground === "rgba(0, 0, 0, 0)"
) {
  fail("geometry: approved row/search spacing and editable field treatment are not present");
}
```

- [ ] **Step 4: Add Dashboard interaction assertions**

Add:

```js
await page.goto(frameUrl("nav-dashboard", {
  nav: "inline", collapsed: "0", expanded: "none", active: "manual-listings",
}), { waitUntil: "load" });
await settle(page);
const dashboardTrigger = page.locator('[data-nav-disclosure="dashboard"]');
await dashboardTrigger.click();
await settle(page);
if (
  await dashboardTrigger.getAttribute("aria-expanded") !== "true" ||
  await page.locator('[data-nav-id="my-designs"]').count() !== 1 ||
  await page.locator('[data-nav-id="compliance"]').count() !== 1 ||
  await page.locator('[data-nav-id="scheduled"]').count() !== 1 ||
  await page.locator(".app__surface .dashboard-overview").count() !== 1
) {
  fail("dashboard: activation did not select the overview and reveal its three children");
}
await page.screenshot({ path: path.join(SHOTS, "dashboard-overview.png"), fullPage: true });
await page.locator('[data-nav-leaf="compliance"]').click();
await settle(page);
if (
  await dashboardTrigger.getAttribute("aria-expanded") !== "true" ||
  await page.locator('[data-nav-id="compliance"][data-nav-selected="true"]').count() !== 1 ||
  await page.locator('[data-nav-id="dashboard"][data-nav-selected="true"]').count() !== 0
) {
  fail("dashboard: child selection did not stay singular while preserving the open branch");
}
```

- [ ] **Step 5: Run the focused verifier and confirm the new checks fail**

Run from the verification root:

```bash
npm run verify:inline-rail
```

Expected: non-zero `badCount` containing `structure`, `geometry`, and `dashboard` failures; no harness crash.

### Task 2: Remodel the production root tree and Dashboard disclosure

**Files:**
- Modify: `prototypes/header-settings-explorations/data/sidenav.js`
- Modify: `prototypes/header-settings-explorations/js/features/sidenav.js`
- Modify: `prototypes/header-settings-explorations/js/state.js`

- [ ] **Step 1: Move Dashboard children into a pinned model node and flatten the remaining roots**

In `NAV_CONTENT_SOURCES`, add:

```js
dashboard: "dashboardOverview",
"manual-listings": "dashboard",
```

Replace the current `groups` and `footer` structure with:

```js
dashboard: {
  id: "dashboard",
  label: "Dashboard",
  kind: "route",
  icon: "Desktop",
  children: [
    { id: "my-designs", label: "My Designs", kind: "route", icon: "SquaresFour" },
    { id: "compliance", label: "Compliance", kind: "route", icon: "ShieldCheck" },
    { id: "scheduled", label: "Scheduled", kind: "route", icon: "Clock" },
  ],
},
groups: [
  {
    id: "main",
    caption: "",
    zone: "scroll",
    items: [
      { id: "manual-listings", label: "Manual Listings", kind: "route", icon: "Storefront" },
      MARKETING_PACKAGES_NODE,
      TEMPLATES_NODE,
      { id: "workspaces", label: "Workspaces", kind: "route", icon: "ArrowCounterClockwise" },
      EXPLORE_TAGS_NODE,
      { id: "tutorials", label: "Tutorials", kind: "route", icon: "Eye" },
      { id: "support", label: "Support", kind: "route", icon: "Info" },
      { id: "settings", label: "Account Settings", kind: "route", icon: "Gear" },
    ],
  },
],
footer: [],
```

`MARKETING_PACKAGES_NODE`, `TEMPLATES_NODE`, and `EXPLORE_TAGS_NODE` above mean the complete existing
objects moved without changing their children, ids, icons, or metadata. Define them as named constants
immediately above `NAV_MODEL` so there is one source for each subtree.

- [ ] **Step 2: Validate Dashboard and allow empty group captions**

In `validateNavModel`, validate the pinned root and change caption validation:

```js
validateNode(model.dashboard, 0, "NAV_MODEL.dashboard");
if (typeof group.caption !== "string") fail(source + ".caption", "must be a string");
```

Keep all current depth, duplicate-id, kind, marker, and inline-child checks.

- [ ] **Step 3: Include Dashboard in root traversal and render it above search**

Update `roots`, `rail`, and replace `contextRow` with `dashboardTree`:

```js
roots() {
  return [NAV_MODEL.dashboard]
    .concat(NAV_MODEL.groups.reduce((all, group) => all.concat(group.items || []), []))
    .concat(NAV_MODEL.footer || []);
},

dashboardTree(nav, direction) {
  const filtered = this.filteredNode(NAV_MODEL.dashboard, nav.query, [], nav);
  if (nav.query && !filtered) return "";
  return this.renderNode(filtered || NAV_MODEL.dashboard, nav, direction, 0, null, []);
},
```

Render:

```js
'<div class="nv__head">' + this.dashboardTree(nav, direction) +
this.searchField(nav.query) + "</div>"
```

Remove `contextRow`, `data-nav-context`, and the context-specific focus branch. Ordinary disclosure
logic now owns Dashboard pointer, keyboard, collapsed, selection, and caret behavior.

- [ ] **Step 4: Return the dedicated overview surface for the Dashboard root**

At the start of `pageForNavigation`, after resolving `match`, add:

```js
if (match.node.id === "dashboard") return PAGES.dashboardOverview;
```

In `content`, render overview pages without the generic collection header:

```js
const page = this.pageForNavigation(nav.active, options.fallbackPage);
if (page.kind === "dashboard-overview") {
  return Results.render(page, { state: "populated" });
}
return PageHeader.render(page, {
  state: "populated",
  variant: options.variant,
  crumbs: STATE.crumbs,
}) + Results.render(page, { state: "populated" });
```

- [ ] **Step 5: Set scenarios to intentional Dashboard state**

Use:

```js
dashboard: {
  active: "dashboard", page: "dashboardOverview", openIds: ["dashboard"],
  label: "Dashboard overview — Dashboard menu open",
},
collapsed: {
  active: "dashboard", page: "dashboardOverview", collapsed: true, openIds: [],
  flyout: "marketing-packages",
  label: "Collapsed rail",
},
```

Keep package, settings, depth, bounded, tag, and filtered scenarios otherwise intact. When a scenario
selects `my-designs`, include `dashboard` in `openIds` only if the Dashboard branch is meant to be the
open root in that frame.

- [ ] **Step 6: Run the focused verifier**

Run:

```bash
npm run verify:inline-rail
```

Expected: structure and Dashboard-disclosure checks pass; geometry and missing overview markup may still fail.

### Task 3: Apply the approved rail and search geometry

**Files:**
- Modify: `prototypes/header-settings-explorations/css/sidenav.css`

- [ ] **Step 1: Introduce separate item and search insets**

Replace the single inset declaration with:

```css
--pattern-nav-inset: var(--spacing-lg);         /* 12px: rail edge to navigation row */
--pattern-nav-search-inset: var(--spacing-xl);  /* 16px: rail edge to search field */
```

Keep row height, 12px internal padding, radius, 16px icons, 24px depth step, scrollbar gutter, and
scrollbar declarations unchanged.

- [ ] **Step 2: Remove the oversized Dashboard context rules**

Delete `.nv__context` and `.nv__context-caret` rules and remove `.nv__context:focus-visible` from the
focus selector. Dashboard now consumes `.nv__item`, including the 36px height and `--text-md` label.

- [ ] **Step 3: Narrow and distinguish the navigation search**

Use:

```css
.nv__search { margin: 0 var(--pattern-nav-search-inset) var(--spacing-lg); }

.nv__search .field {
  min-height: var(--spacing-9);
  background: var(--color-bg-surface);
  border-color: var(--color-border-primary);
}

.nv__search .field:focus-within {
  background: var(--color-bg-surface);
  border-color: var(--color-border-brand);
}
```

- [ ] **Step 4: Run the focused verifier**

Run:

```bash
npm run verify:inline-rail
```

Expected: structure, Dashboard interaction, row height, 12px row inset, 16px search inset, border,
and native `thin` scrollbar checks pass. Any remaining failure should name the absent overview surface.

### Task 4: Build the Dashboard overview with Maxa styles and neutral preview placeholders

**Files:**
- Modify: `prototypes/header-settings-explorations/data/pages.js`
- Modify: `prototypes/header-settings-explorations/js/features/results.js`
- Modify: `prototypes/header-settings-explorations/css/surfaces.css`

- [ ] **Step 1: Add the Dashboard overview page model**

Add before the existing My Designs page:

```js
dashboardOverview: {
  id: "dashboardOverview",
  kind: "dashboard-overview",
  route: "/dashboard",
  source: "Screen/Dashboard/Gallery Templates - Start 53.png",
  rail: "client",
  railActive: "dashboard",
  welcome: {
    title: "Hi Joseph — let’s create something on-brand.",
    body: "Browse marketing packages created just for you, see customizable templates, or jump back into recent design.",
    search: "Search curated, branded templates...",
  },
  sections: [
    { title: "Start Creating", count: 6, shape: "shortcut" },
    { title: "Continue Designing", count: 5, shape: "portrait" },
    { title: "Newest Automated Packages", count: 5, shape: "portrait" },
    { title: "Newest Templates", count: 5, shape: "portrait" },
    { title: "Explore Platform Features", count: 4, shape: "feature" },
    { title: "Your Activity at a Glance", count: 5, shape: "stat" },
  ],
},
```

- [ ] **Step 2: Add a dedicated result renderer**

Add a switch case:

```js
case "dashboard-overview":
  return this.dashboardOverview(page);
```

Add:

```js
dashboardOverview(page) {
  const tiles = (section) => Array.from({ length: section.count }, (_, index) =>
    '<article class="dashboard-overview__tile" data-shape="' + U.esc(section.shape) + '">' +
    '<div class="dashboard-overview__placeholder" aria-hidden="true"></div>' +
    '<span class="sr-only">' + U.esc(section.title) + " preview " + (index + 1) + "</span>" +
    "</article>"
  ).join("");
  return '<div class="dashboard-overview">' +
    '<aside class="dashboard-overview__notice"><strong>Complete Your Account Setup</strong>' +
    '<span>Add your business details to unlock personalized listings and marketing assets.</span>' +
    '<button type="button" class="btn btn--primary">Complete Setup</button></aside>' +
    '<header class="dashboard-overview__welcome"><h1>' + U.esc(page.welcome.title) + "</h1>" +
    '<p>' + U.esc(page.welcome.body) + "</p>" +
    '<label class="field dashboard-overview__search">' +
    ICONS.svg("MagnifyingGlass", "icon--sm") +
    '<span class="sr-only">' + U.esc(page.welcome.search) + "</span>" +
    '<input type="search" placeholder="' + U.esc(page.welcome.search) + '"></label></header>' +
    page.sections.map((section) =>
      '<section class="dashboard-overview__section" data-shape="' + U.esc(section.shape) + '">' +
      '<div class="dashboard-overview__section-head"><h2>' + U.esc(section.title) + "</h2>" +
      '<button type="button" class="link-btn">Browse All</button></div>' +
      '<div class="dashboard-overview__grid">' + tiles(section) + "</div></section>"
    ).join("") + "</div>";
},
```

- [ ] **Step 3: Add token-backed responsive styles**

Append to `css/surfaces.css`:

```css
.dashboard-overview {
  width: min(100%, var(--pattern-container-max));
  margin: 0 auto;
  padding: var(--spacing-3xl);
  display: grid;
  gap: var(--spacing-4xl);
}
.dashboard-overview__notice {
  min-height: var(--spacing-14);
  padding: var(--spacing-lg) var(--spacing-xl);
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: var(--spacing-lg);
  border: var(--width-1) solid var(--color-border-secondary);
  border-radius: var(--radius-lg);
  background: var(--color-bg-surface);
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
}
.dashboard-overview__notice strong { color: var(--color-text-primary); }
.dashboard-overview__welcome {
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
}
.dashboard-overview__welcome h1 {
  margin: 0 0 var(--spacing-md);
  font-size: var(--text-heading-lg);
  line-height: var(--text-heading-lg--line-height);
}
.dashboard-overview__welcome p {
  margin: 0 auto var(--spacing-xl);
  color: var(--color-text-secondary);
}
.dashboard-overview__search { text-align: left; background: var(--color-bg-surface); }
.dashboard-overview__section { display: grid; gap: var(--spacing-lg); }
.dashboard-overview__section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-lg);
}
.dashboard-overview__section-head h2 {
  margin: 0;
  font-size: var(--text-heading-xs);
  line-height: var(--text-heading-xs--line-height);
}
.dashboard-overview__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(132px, 1fr));
  gap: var(--spacing-lg);
}
.dashboard-overview__tile {
  min-width: 0;
  border: var(--width-1) solid var(--color-border-secondary);
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--color-bg-surface);
}
.dashboard-overview__placeholder {
  min-height: 116px;
  background: var(--color-bg-neutral-muted);
}
.dashboard-overview__tile[data-shape="shortcut"] .dashboard-overview__placeholder,
.dashboard-overview__tile[data-shape="stat"] .dashboard-overview__placeholder { min-height: 88px; }
.dashboard-overview__tile[data-shape="portrait"] .dashboard-overview__placeholder { aspect-ratio: 4 / 5; }
.dashboard-overview__tile[data-shape="feature"] .dashboard-overview__placeholder { aspect-ratio: 4 / 3; }
@media (max-width: 720px) {
  .dashboard-overview { padding: var(--spacing-xl); }
  .dashboard-overview__notice { grid-template-columns: 1fr; }
}
```

- [ ] **Step 4: Run the focused verifier and inspect the Dashboard screenshot**

Run:

```bash
npm run verify:inline-rail
open /private/tmp/maxa-inline-rail-verification/dashboard-overview.png
```

Expected: `badCount: 0`, `errors: []`; the screenshot shows existing Maxa chrome/icons and neutral
Dashboard placeholders rather than the brainstorming preview glyphs.

### Task 5: Update legacy expectations and run the complete regression matrix

**Files:**
- Modify: `2026-08-18-current-ui-audit/scripts/verify-inline-rail.cjs`
- Modify: `2026-08-18-current-ui-audit/scripts/verify-header-settings.cjs`

- [ ] **Step 1: Replace obsolete context-row expectations**

Replace checks for `.nv__context` with checks for the pinned Dashboard disclosure:

```js
const dashboardRoots = document.querySelectorAll(
  '.nv__head > [data-nav-disclosure="dashboard"]',
).length;
```

Require exactly one pinned Dashboard root and exactly one `.nv__scroll`. Remove assertions that expect
`My Designs` and `Scheduled` to be depth-0 siblings or expect the nav-dashboard surface title to start
as `My Designs`; the default rail frame now starts on `.dashboard-overview`.

- [ ] **Step 2: Extend model traversal in both verifiers**

Where scripts visit `NAV_MODEL.groups` and `NAV_MODEL.footer`, prepend:

```js
visit(NAV_MODEL.dashboard);
```

For the surface-mapping sweep, accept Dashboard's surface-only contract:

```js
const dashboardOverview = document.querySelectorAll(".app__surface .dashboard-overview").length;
const content = document.querySelectorAll(
  ".app__surface .results, .app__surface .secsplit",
).length;
```

Require `dashboardOverview === 1` only for `node.id === "dashboard"`; require the existing heading and
content contract for every other node.

- [ ] **Step 3: Keep the configurable-tree regression explicit**

Retain assertions for four UI levels, nested connector alignment, the 24-leaf bounded fixture, multiple
nested branches, Favorites, Explore Tags, row actions, and root accordion behavior. Add this model check:

```js
if (NAV_MAX_DEPTH < 3) {
  fail("model: admin-configured client navigation no longer supports four rendered UI levels");
}
```

- [ ] **Step 4: Run unit and both browser verifiers**

Run from the verification root:

```bash
npm test
npm run verify:inline-rail
npm run verify:prototype
```

Expected: unit tests pass; both JSON summaries contain `errors: []` and `badCount: 0`.

- [ ] **Step 5: Inspect the required visual states**

Open the generated screenshots for:

```bash
open /private/tmp/maxa-inline-rail-verification/restored-heading-content.png
open /private/tmp/maxa-inline-rail-verification/compact-marketing-submenu.png
open /private/tmp/maxa-inline-rail-verification/explore-tags-inline.png
```

Also capture and inspect a Dashboard-open screenshot at 1440×900 and a short 1024×480 rail screenshot.
Expected: true Maxa icons and styles, Dashboard same density as other rows, 16px search inset, 12px
navigation insets, no `WORK`/`LIBRARY` labels, no clipping, and one scroll owner.

- [ ] **Step 6: Run security and plan-fit review**

Confirm:

```text
Security: all labels/placeholders still pass through U.esc; no network requests, storage, secrets,
authentication, permissions, user-content mutation, or external assets were added.
Plan fit: every approved root is present in order; Dashboard children and behavior match the spec;
search and row geometry match the chosen values; native scrollbar behavior is unchanged; recursive
admin-configured depth remains supported; Dashboard images are neutral placeholders.
```

- [ ] **Step 7: Record changed files and final verification output**

Run:

```bash
find "/Users/igorstetsenko/Library/Mobile Documents/com~apple~CloudDocs/Work/Maxadesigns.com/AI/Client Side Updates and Improvements/prototypes/header-settings-explorations" -type f -newer "/private/tmp/maxa-client-nav-before-2026-09-01/frame.html" -print
```

Expected: only the scoped model, renderer, CSS, page/result files, and verification scripts have changed.
