# MAXA Button Migration v1

This plugin is the first migration tool for the MAXA design system.

Current scope:

- analyze existing legacy Button components
- identify likely Button family, size, and state
- detect legacy styling dependencies such as local styles and hardcoded values
- report warnings and confidence before any migration happens
- optionally constrain analysis to one manual target family to reduce ambiguity

Phase 1 status:

- `Analyze selection` is implemented
- `Apply mapping` is intentionally deferred until the analysis path is validated on real Button components

Supported target families:

- `Buttons/Button`
- `Buttons/Button destructive`
- `Buttons/Icon button`

Supported manual analysis modes:

- `Auto-detect`
- `Primary`
- `Secondary`
- `Outline`
- `Ghost`
- `Link`
- `Destructive`
- `Icon button`

Out of scope in v1:

- dropdown/menu buttons
- split buttons
- close buttons
- non-Button components
