# Drawer

## Purpose

Drawer presents a viewport-attached modal panel for secondary workflows such as settings, filters, details, and short forms. It is a core overlay primitive, not an app shell, sidebar navigation, or product-specific upload/editor surface.

## Anatomy

- `Drawer`: controlled or uncontrolled open state container.
- `DrawerTrigger`: opens the drawer.
- `DrawerContent`: modal panel attached to a viewport edge.
- `DrawerHeader`, `DrawerTitle`, `DrawerDescription`: semantic heading block.
- `DrawerBody`: scrollable body region.
- `DrawerFooter`: action row.
- `DrawerClose`: close control; supports `inline` for footer actions.

## Variants

- Side: `left`, `right`, `top`, `bottom`.
- Size: `sm`, `md`, `lg`.
- Controlled or uncontrolled open state.

## Layout Contract

- Default side is `right`.
- Left/right drawers use width tokens.
- Top/bottom drawers use height tokens.
- Drawer content uses the shared modal z-index and blocking overlay color.
- Body scrolls independently from the viewport.
- Footer actions should use `DrawerClose inline` for cancel actions.

## Accessibility

- Content uses `role="dialog"`, `aria-modal`, and title/description wiring.
- Opening the drawer moves focus into the drawer.
- Escape closes the drawer.
- Focus is trapped while the drawer is open.
- Closing returns focus to the trigger when possible.
- Overlay click closes the drawer unless prevented.

## Non-Goals

- Do not use Drawer to define application navigation.
- Do not include product-specific sidebar, app shell, mobile nav, upload, or editor behavior.
- Do not replace Dialog when the workflow is a short centered decision.
