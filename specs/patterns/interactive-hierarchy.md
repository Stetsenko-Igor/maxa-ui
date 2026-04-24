# Interactive Hierarchy — Pattern Spec

## The Core Rule

**One primary action per view.** Everything else is secondary, tertiary, or ghost.

Violating this rule creates visual noise and user confusion. When everything is blue, nothing is important.

---

## Variant Decision Tree

```
Is this the main thing I want the user to do on this view?
├── YES → primary
└── NO
    ├── Is it a common supporting action (alongside primary)?
    │   └── YES → secondary
    ├── Does it need a border to be distinguishable (not next to primary)?
    │   └── YES → outline
    ├── Is it an inline action inside a list, table, or content area?
    │   └── YES → ghost
    └── Is it a navigation link or inline text action?
        └── YES → link
```

### Status variants

- `success` → Use only when the action's outcome is explicitly positive/confirmative and green color adds meaningful signal. Not a style preference — only when semantics demand it.
- `danger` → Use for irreversible, destructive actions. Always pair with a confirmation step.

---

## Common UI Patterns

### Form / modal footer
```
[ Cancel (outline) ]  [ Save (primary) ]
```
- One primary, one outline cancel
- Never two primaries

### Toolbar (data table, content editor)
```
[ Filter (ghost) ] [ Export (ghost) ] [ + New item (primary) ]
```
- Actions = ghost (low visual weight in dense context)
- Main creation action = primary

### Destructive confirmation dialog
```
[ Keep (outline) ]  [ Delete (danger) ]
```
- Outline for the safe/escape action
- Danger for the destructive confirmation

### Card actions
```
[ View details (ghost) ]  [ Edit (ghost) ]
```
- Inside a card, use ghost — the card surface already creates context
- Avoid primary inside cards unless it is the entire card's CTA

### Empty states
```
[ + Create your first item (primary) ]
```
- Single primary CTA is appropriate in empty state — there's nothing competing

### Settings page section
```
[ Save changes (primary) ]  [ Reset to defaults (outline) ]
```

---

## Size Guidelines

| Context | Size |
|---------|------|
| Default UI (forms, modals, panels) | `md` |
| Compact tables, toolbars, dense UI | `sm` |
| Hero sections, landing CTAs, feature blocks | `lg` |
| Inline text actions, breadcrumbs | `link` (no size) |

---

## Hierarchy Anti-Patterns

| Anti-pattern | Fix |
|-------------|-----|
| Two `primary` buttons in the same view | Demote one to `secondary` or `outline` |
| `primary` buttons inside every card in a list | Use `ghost` or `outline` inside cards |
| `danger` used for "undo" or "cancel" | `danger` = destructive only. Use `outline` for cancel |
| `success` used as a visual style preference | Reserve `success` for semantically positive outcomes |
| All actions as `primary` in a toolbar | Use `ghost` for toolbar actions, `primary` for one main action |
| `link` variant with underline always visible | Link underline is optional — avoid if color provides enough signal |

---

## Spacing between buttons

When buttons are grouped, use `Inline/tight` (8px) between them.

```css
gap: var(--spacing-md); /* 8px = Inline/tight */
```

For button groups that need more breathing room (e.g. modal footer):

```css
gap: var(--spacing-lg); /* 12px = Inline/default */
```
