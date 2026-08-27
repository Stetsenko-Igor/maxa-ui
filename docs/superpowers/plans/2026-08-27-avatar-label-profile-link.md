# Avatar Label Profile Link Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extend the existing MAXA Foundation `Avatar Label` component set with optional profile-link states while preserving the user-updated static variants.

**Architecture:** Keep the four existing components as `Interaction=Static, State=Default`, preserving their component IDs. Clone each static size into four link states, update only the label and focus styling, and wire hover/press state changes between matching-size variants. Use semantic Figma variables directly; do not add component-based tokens.

**Tech Stack:** Figma Plugin API through `use_figma`, MAXA Foundation variables and component variants, local Markdown design documentation.

---

### Task 1: Inspect and validate the existing component set

**Files:**
- Reference: `docs/superpowers/specs/2026-08-27-avatar-label-profile-link-design.md`

- [x] **Step 1: Read node `867:374` and assert the target is the `Avatar Label` ComponentSet.**
- [x] **Step 2: Collect the four current child components, their Size values, label/description node paths, bound variables, component properties, positions, and existing reactions.**
- [x] **Step 3: Stop without mutation unless all four current sizes and editable Avatar Label properties are present.**

### Task 2: Build the variant matrix

**Figma nodes:**
- Modify: `Avatar Label` ComponentSet `867:374`
- Preserve: the four current static component IDs
- Create: sixteen link-state component variants

- [x] **Step 1: Rename each current component to `Size=<existing>, Interaction=Static, State=Default`.**
- [x] **Step 2: Clone every static size four times and name the clones `Interaction=Link` with `State=Default|Hover|Pressed|Focus`.**
- [x] **Step 3: Preserve the existing text properties, description visibility property, nested Avatar instance, text styles, layout, sizing, and variable bindings on every clone.**
- [x] **Step 4: Arrange the variants in a readable five-row matrix: Static, Link Default, Link Hover, Link Pressed, Link Focus; keep one column per size.**

### Task 3: Apply semantic link states

**Figma variables:**
- `Color modes/text/text-secondary`
- `Color modes/text/text-link`
- `Color modes/text/text-link-hover`
- `Color modes/text/text-link-active`
- `Color modes/Effects/Focus rings/focus-ring`

- [x] **Step 1: Keep Static and Link Default label text bound to `text/text-secondary` with no underline.**
- [x] **Step 2: Bind Link Hover label text to `text/text-link-hover` and set underline.**
- [x] **Step 3: Bind Link Pressed label text to `text/text-link-active` and set underline.**
- [x] **Step 4: Bind Link Focus label text to `text/text-link`; apply a 2 px outside focus stroke with the focus-ring variable and a 2 px visual offset without changing root dimensions.**
- [x] **Step 5: Assert that Avatar and description nodes remain visually and structurally unchanged across all states.**

### Task 4: Add prototype behavior and metadata

- [x] **Step 1: Add matching-size Change To reactions for hover and press state previews.**
- [x] **Step 2: Keep Focus as a manually selectable handoff state; do not hard-code a profile URL or destination frame.**
- [x] **Step 3: Set the component-set description to the approved Static versus Link usage contract.**

### Task 5: Verify the Foundation result

- [x] **Step 1: Re-read the ComponentSet and assert 20 components: 4 Static Default and 16 Link states.**
- [x] **Step 2: Assert semantic variable bindings, underline rules, unchanged bounds across states, preserved component properties, and absence of Avatar Label component tokens.**
- [x] **Step 3: Capture a screenshot of node `867:374` and visually inspect all states and sizes.**
- [x] **Step 4: Confirm that Avatar Group remains hidden and unchanged.**
- [x] **Step 5: Record the final node IDs and verification result in the implementation handoff.**

## Implementation Handoff

- ComponentSet: `867:374`
- Static Default components preserved: `873:7266`, `867:341`, `867:352`, `867:363`
- Link Default: `885:347`, `885:352`, `885:357`, `885:362`
- Link Hover: `885:367`, `885:372`, `885:377`, `885:382`
- Link Pressed: `885:13667`, `885:13672`, `885:13677`, `885:13682`
- Link Focus: `885:13687`, `885:13692`, `885:13697`, `885:13702`
- Verification: 20/20 variants passed geometry, semantic binding, underline, property-reference, Avatar-size, focus-ring, reaction, and metadata assertions.
- Visual verification: `/private/tmp/avatar-label-final.png`
