# Maxa Logo — Source of Truth

## Approved Contract

- The approved `MaxaLogo` artwork is always white.
- Both `A` letterforms have connected apexes. There must be no notch, triangular cut, or gap at the top.
- The wordmark uses the `0 0 1518 262` view box and a transparent component background.
- Consumers provide an approved dark surface behind the mark.
- The component does not expose dark, light, theme-adaptive, or arbitrary color variants.

## Rejected Asset

Do not use:

`AI/Client Side Updates and Improvements/prototypes/header-settings-explorations/assets/maxa-wordmark.svg`

That prototype vector omits the apex cap from both `A` letterforms. It is visually similar at small sizes but does not match the user-approved white-on-black reference.

## Verification Rule

Never label a discovered logo asset as official from its filename or nearby usage alone. Compare its geometry at large scale against the user-approved reference before adding it to the design system. For `MaxaLogo`, regression tests must assert the exact connected `A` path definitions and the single white component token.
