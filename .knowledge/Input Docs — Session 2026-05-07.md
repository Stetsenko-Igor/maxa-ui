# Input Docs — Session 2026-05-07

> Session memory note for Obsidian and local repository context.
> Captures the current state of the docs shell, input documentation, and recent interaction decisions.

## Scope

This session focused on:

- the docs shell structure for component pages
- the `Input` component and `TextArea`
- the `Input` docs page content and layout
- preview/code container behavior
- copy interactions and markdown/page actions

## Current Docs Layout Direction

Component documentation pages now follow a three-column structure inspired by systems such as Untitled UI and shadcn/ui:

- left sidebar navigation
- center content column with component preview containers
- right-side `On this page` navigation

Important layout decisions:

- preview containers stretch with the page and respect a maximum width rather than using a narrow fixed block
- right-side section navigation uses smooth scrolling
- section headings should sit outside preview containers for scanability
- installation content is visually lighter than full preview containers, but still spans the same content width

## Input Documentation Direction

The current accepted direction for docs examples is:

- field types are shown in separate example containers
- states are shown in separate example containers
- helper/error examples are grouped intentionally rather than collapsed into one giant matrix
- preview code should be copy-pasteable example code, not just the shortest possible JSX fragment

Example naming decision:

- docs snippets should use `Example`, not `Demo`
- use names like `InputTextExample`, `InputQuantityExample`, `TextAreaDefaultExample`

Reason:

- `Example` reads more naturally in documentation
- it makes it clearer that the snippet is illustrative, not part of the public API surface

## Input Component Behavior Decisions

The current `Input` implementation supports:

- `kind="text"`
- `kind="password"`
- `kind="search"`
- `kind="quantity"`
- `TextArea` as a separate export

Read-only and disabled behavior was clarified:

- `readOnly` maps to the Figma `Not editable` state
- in docs and implementation, `Not editable` should behave as non-interactive
- read-only fields should not receive keyboard focus in the docs preview state
- read-only fields should show a `not-allowed` cursor and suppress focus-ring styling
- quantity stepper controls should also be disabled when the field is read-only

Disabled styling direction:

- disabled text and placeholder content should remain visible in both light and dark themes
- disabled styling should communicate inactivity without making field content unreadable

## Code Presentation Decisions

There are now two code presentation layers in docs:

- large documentation code blocks use Shiki on the server
- interactive preview/code tabs and compact install rows use a lightweight client-safe syntax highlighter

Preview/code tab behavior:

- switching from `Preview` to `Code` should not collapse container height
- code panes should keep a stable minimum height and scroll internally when needed
- preview code should include import plus a named example function so it is immediately reusable

## Copy Interaction Decisions

Copy interactions in docs now use an icon-only button pattern for local preview/install controls.

Accepted behavior:

- default state: copy icon only
- hover/focus: tooltip appears with `Copy`
- press: button has an active visual state
- copied: icon changes to a check and tooltip changes to `Copied`

This pattern is used for:

- component preview toolbar copy actions
- installation code-row copy actions

## Architecture Notes

The broader architecture remains:

- `Input` and `TextArea` are field primitives / text-entry controls
- `Select` remains a separate form-level component
- `DatePicker` remains a separate form-level component
- future dropdown/date-picker form patterns should not be folded into more `Input.kind` variants

## Verification Performed

During this session, the following checks were run successfully for the relevant changes:

- `pnpm typecheck`
- `pnpm lint`
- `pnpm test`
- `node scripts/audit-tokens.mjs`
- `pnpm build`

Known local dev caveat:

- after some build/dev transitions, Next.js Turbopack may leave `.next` in a broken state and return `500 Internal Server Error`
- the current recovery step is to stop the docs server, remove `apps/docs/.next`, and restart `pnpm --filter @maxa/docs dev`

## Suggested Next Work

- continue with `Badge`
- then `Alert`
- then revisit whether `Card` should exist as a documented component or stay deferred
- continue aligning docs examples with the approved component architecture rather than building giant universal input matrices
