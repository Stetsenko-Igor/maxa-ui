# Release Policy

MAXA UI packages are not yet published to any registry. Target registries are
defined in [`RELEASING.md`](../RELEASING.md) (GitLab Package Registry primary,
public npm optional), and package versions are repository metadata until a
registry release is explicitly approved.

## Default Mode: Package Readiness

Most package work should stay in readiness mode:

- Keep package manifests, `exports`, `files`, bins, and README files publishable.
- Add Changesets for user-facing package changes.
- Run package smoke checks against local build output and packed tarballs.
- Do not run `pnpm changeset version`.
- Do not edit package versions or changelogs as a release step.
- Do not publish packages to a registry.

In this mode, `.changeset/*.md` files are pending release notes. They should stay
in the repository until the team intentionally starts a release.

## Release Mode

Only enter release mode after an explicit human decision that names the target
registry and package set. A release decision should cover:

- registry target per `RELEASING.md` (GitLab Package Registry primary, public npm optional)
- package scope ownership and access level
- authentication and provenance requirements
- versioning strategy
- whether Git tags and GitHub Releases should be created

After that decision, the release owner may run:

```bash
pnpm changeset version
```

Then review the generated version bumps and changelog entries before publishing.
Use the draft checklist in [Release Workflow Draft](release-workflow.md) when
the team is ready to plan that release.

## Guardrail

`pnpm changeset version` is not a cleanup command. It consumes pending
Changesets, edits package versions, and writes changelog entries. Do not run it
while the repository is still in package-readiness mode.
