# Segmented Control

## Purpose

Segmented Control switches between a small set of mutually exclusive modes inside a compact joined surface.

## Anatomy

- Root group.
- Item buttons with selected state.

## Variants

- `variant="default"`: existing joined control, dark selected item.
- `variant="pill"`: heading status switcher from Layout / Structure (`4568:34832`); rounded track with 4px padding, 8px gap, 30px items and white selected item (38px total height). Uses 12px semibold labels, 12px horizontal item padding and fully rounded corners.
- Two to eight items.
- Active, hover, focus, and disabled states.

## Accessibility

Items use buttons with `aria-pressed`. Provide an `aria-label` on the root when the surrounding context does not name the control.

## Neutral color contract

The track references `--color-action-neutral-control`, shared with secondary button backgrounds and inactive primary tabs. Light mode aliases `--color-gray-200` (`#E5E7EB`), the nearest existing cold gray to the requested `#E3E7ED`; hover and pressed use Gray/300 and Gray/400. Dark mode retains the existing neutral interactive scale. Page, surface and table backgrounds remain independent.


## Shared composition options

SegmentedControl labelWeight="medium" or "semibold" selects the corresponding typography token without CSS overrides.
