# Context Menu

## Purpose

Context Menu exposes item-level commands from right-click surfaces such as files, canvas items, cards, and table rows.

## Anatomy

- `ContextMenuTrigger`: right-click target.
- `ContextMenuContent`: positioned menu surface.
- `ContextMenuItem`: command row.
- `ContextMenuLabel`, `ContextMenuSeparator`, `ContextMenuShortcut`: supporting structure.

## Variants

- Item state: default, disabled.
- Item intent: default, destructive.

## Accessibility

Items use menu semantics. Keep labels action-oriented and avoid hiding primary workflows only inside context menus.
