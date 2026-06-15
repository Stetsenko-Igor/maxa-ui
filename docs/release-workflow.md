# Release Workflow Draft

This is a draft checklist for a future registry release. It documents the order
of operations so release work is deliberate and reviewable. Do not execute this
workflow unless the team has explicitly entered release mode.

## 1. Make The Release Decision

Record the decision before changing versions:

- target registry: GitHub Packages or npmjs.com
- package set: all packages or a named subset
- access level: private, internal, or public
- npm scope ownership and package name availability
- provenance/signing requirements
- whether to create Git tags and GitHub Releases
- who owns the release and rollback path

## 2. Prepare Credentials And Registry Config

- Confirm the release owner is logged into the target registry.
- Confirm publish tokens are scoped to the chosen registry and package scope.
- Add or verify `.npmrc` only if the registry requires it.
- Do not commit personal tokens or machine-specific registry credentials.

## 3. Verify Package Readiness

From a clean `main` checkout:

```bash
pnpm install
pnpm verify
pnpm pack:smoke
pnpm changeset status
```

Review pending `.changeset/*.md` files. They should describe only changes that
belong in this release.

## 4. Version Packages

Only after the release decision:

```bash
pnpm changeset version
```

Review every generated change:

- package version bumps match the intended semver level
- changelog entries are clear and accurate
- no unrelated package files changed
- pending Changesets were consumed as expected

Run:

```bash
pnpm verify
```

Commit the version changes separately.

## 5. Publish

Use the chosen registry's publish command. Prefer a dry-run first when the
registry supports it.

After publishing:

- install the published packages into a clean consumer project
- verify `@maxa/tokens/theme.css`, `@maxa/ui`, `@maxa/icons`, and CLI entrypoints
- check package pages and access permissions in the registry

## 6. Tag And Announce

If tags/releases are part of the release decision:

- create Git tags for the released state
- create a GitHub Release with the relevant changelog summary
- link to docs and migration notes

## Non-Goals

- Do not use `pnpm changeset version` as cleanup.
- Do not publish from a dirty worktree.
- Do not publish to npmjs.com just because packages are publishable.
- Do not delete pending Changesets unless they were consumed by an intentional
  version step.
