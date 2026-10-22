# Figma integration readiness

Checked 2026-10-23 against the live account, not against documentation.
Background reference on Figma's direction:
`Obsidian/Maxa/Resources/Articles/2026-10-22-figma-new-capabilities-overview.md`.

## What the account actually has

`whoami` for `kupa@maxadesigns.com`:

| Plan | Seat | Tier | Role | Code Layers | Specs |
| --- | --- | --- | --- | --- | --- |
| MAXA Designs | **Full** | **pro** | guest | **enabled** | **enabled** |
| Igor Stetsenko's team | View | starter | admin | no | no |

All real work sits on the MAXA Designs plan. The personal starter team grants
nothing useful here.

## What that unlocks, and what blocks it

| Capability | Entitlement | Blocker | Usable now |
| --- | --- | --- | --- |
| **Code Connect** | Professional + Full seat - met | No `.figma.ts` anywhere in the repo, no `figma.config.json`, and the MAXA Foundation file key is not recorded in this repository | Yes, once the file key is known |
| **Code Layers** | enabled on the plan | Needs a runnable frontend with an entry point and build command; `apps/docs` qualifies | Yes |
| **Guidelines** | Professional, open beta - met | Uploaded through Library > Manage guidelines; our plan role is `guest`, which may not carry library admin rights | Probably, needs one check |
| **Specs** | enabled on the plan | none | Yes |
| **Make kits** | Full seat - met | Needs an installable package. `@maxa/ui` is unpublished (npm returns 404). `@maxa-ui/*` lives in a private GitLab registry, and Figma's import path excludes private npm dependencies that require login | **No** |
| **Library Code Sources** | closed beta | Not reported by `whoami`; cannot be confirmed from here | Unknown, do not plan on it |

## The answer to "can Figma take our package"

Not yet, and the reason is not Figma.

The capability that would let a Figma library carry repository or npm
implementation context directly - **Library Code Sources** - is closed beta.
The route that does work today, **Make kits**, needs a package Figma can
install, and neither of our two packages qualifies: ours is unpublished, the
team's is behind a private registry login that Figma's importer explicitly
does not support.

So "make our project maximally usable by Figma" currently reduces to a
publishing decision: whether `@maxa/ui` (or `@maxa-ui/*`) gets a public,
installable release. That is a product call, not a technical blocker.

## What can start without any of that

**Code Connect** is the highest-value step available right now. It does not
need a published package - it maps a Figma component to a path in the
repository, so implementation agents get the real component name, props and
example usage instead of guessing. On Professional it supports one active
library and framework, which matches our situation exactly.

To start it we need:

1. The MAXA Foundation file key - currently not recorded anywhere in this repo,
   which is itself worth fixing.
2. `figma.config.json` at the repo root.
3. One `.figma.ts` per component, starting with the components the product
   actually consumes rather than all 43 at once.

**Code Layers** is the second: `apps/docs` is a runnable Next.js app, so the
component catalog can be reviewed inside a Figma file next to the designs.

## Not assumed

Beta availability is not account access, and this check establishes seat and
tier only. Guidelines upload under a `guest` role, Code Connect publishing
rights, and anything in preview (System check, centralized design systems)
remain unverified. Credit terms are time-sensitive and were not checked.
