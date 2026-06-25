# MAXA UI — Component Stability Sheet

Prepared for the design + dev sync, 2026-06-19.
Purpose: tell developers exactly which components are safe to build against now,
and which will change soon — so no one builds against a moving target.

40 components are shipped (React + TypeScript + Radix + CSS-variable tokens), each
with an API spec in `specs/components/<name>.md`. That spec is the prop contract.

Legend:
- 🟢 **Stable** — API is settled. Build against it now; no breaking changes planned before v1.
- 🟡 **Minor churn possible** — usable now, but prop names may tighten before v1 (callback names, size scale). Low risk.
- 🔴 **In-flight** — API will change. Hold / coordinate before adopting.

---

## 🟢 Stable — build against now (23)

| Component | Spec |
|---|---|
| alert-dialog | `specs/components/alert-dialog.md` |
| breadcrumb | `specs/components/breadcrumb.md` |
| button | `specs/components/button.md` |
| calendar | `specs/components/calendar.md` |
| datatable | `specs/components/datatable.md` |
| dialog | `specs/components/dialog.md` |
| divider | `specs/components/divider.md` |
| drawer | `specs/components/drawer.md` |
| empty | `specs/components/empty.md` |
| form-field | `specs/components/form-field.md` |
| icon-button | `specs/components/icon-button.md` |
| pagination | `specs/components/pagination.md` |
| popover | `specs/components/popover.md` |
| radio | `specs/components/radio.md` |
| separator | `specs/components/separator.md` |
| social-button | `specs/components/social-button.md` |
| table | `specs/components/table.md` |
| tabs | `specs/components/tabs.md` |
| textarea | `specs/components/textarea.md` |
| toast | `specs/components/toast.md` |
| toggle | `specs/components/toggle.md` |
| tooltip | `specs/components/tooltip.md` |
| utility-button | `specs/components/utility-button.md` |

> Note: `tooltip` and `slider` have lower internal test coverage (75% / 78%). That
> is a testing gap, **not** an API risk — it does not affect building against them.

## 🟡 Minor prop churn possible — usable now (7)

These work today; before v1 we may align controlled-callback names
(`onValueChange` vs `onChange` vs `onCheckedChange`) and the size scale
(`xs|sm|md|lg`, some currently drop `xs`). Adopt freely, expect small prop renames.

| Component | Likely change |
|---|---|
| select | callback name alignment |
| slider | callback name alignment |
| segmented-control | callback name alignment |
| input | callback name + size scale (`xs`) |
| checkbox | callback name alignment |
| date-picker | callback name alignment |
| file-input | size scale (`xs`) |

## 🔴 In-flight — API will change, coordinate first (10)

Two open API tranches change these. Do **not** hard-wire their current props yet.

**Variant-vocabulary glossary (F5).** Today the same "semantic color" axis is named
inconsistently — `intent`, `appearance`, `tone` — across these components. We are
defining one rule and aligning the props:

| Component | Current prop(s) affected |
|---|---|
| alert | `intent` |
| badge | `intent`, `appearance` |
| progress | `intent` |
| tag | `appearance` |
| avatar | `tone` |
| spinner | `tone`, `appearance` (has a deprecation shim) |
| context-menu | `variant` |
| dropdown-menu | `variant` |
| skeleton | `variant` |

**MultiSelect rebuild (F9).** `multi-select` is currently a `DropdownMenu` + checkbox
items, not a true ARIA listbox/chip field. It will be rebuilt to a proper
listbox/chip pattern. Functional today, but API + DOM will change.

---

## What this means for the dev team

- Build product surfaces on the 🟢 set now — that's the majority and it's settled.
- For 🟡, use them; just don't deeply couple to exact callback prop names yet.
- For 🔴 (10 components), tell us if you need any of them soon and we'll prioritize
  finalizing that API or give you a stable interim contract.

Reciprocal ask: send us your current `shared/ui` component list + what's in active
development, so we map it onto these 40 and stop building the same thing twice.
