# Releasing `@maxa/*`

Versioning is managed with [Changesets](https://github.com/changesets/changesets).
The publish **registry is chosen at publish time** via `.npmrc`, never hardcoded in
`package.json`. This keeps two channels open simultaneously:

- **GitLab Package Registry** — primary, for the MAXA team (code lives in
  `maxa-designs/ui-kit`).
- **public npm** — for external developers, when we decide to go public.

Publishable packages: `@maxa/ui`, `@maxa/tokens`, `@maxa/icons`, `@maxa/hooks`,
`@maxa/cli`, `@maxa/mcp`. `@maxa/docs` is ignored (see `.changeset/config.json`).

## 1. Record changes (every PR)

```bash
pnpm changeset          # pick packages + bump (patch/minor/major) + write a summary
```
Commit the generated `.changeset/*.md` with your PR. These are release notes that
accumulate until the next version bump.

Check what's pending at any time:
```bash
pnpm changeset status
```

## 2. Bump versions + changelog (registry-agnostic)

```bash
pnpm release:version    # = changeset version — bumps versions, writes CHANGELOG.md, deletes consumed changesets
```
Commit the result. This step does not touch any registry.

## 3. Publish

Pick a target by creating a local `.npmrc` from `.npmrc.example` (it is gitignored —
it holds tokens). Then:

```bash
pnpm release:publish    # = pnpm build && changeset publish — publishes to whatever .npmrc resolves for @maxa
```

### Publish to GitLab Package Registry (primary)
1. In `.npmrc`, enable Target A and set `<PROJECT_ID>` (numeric id of `maxa-designs/ui-kit`,
   Project → Settings → General).
2. Export a token with `write_package_registry`: `export GITLAB_TOKEN=...`.
3. `pnpm release:publish`.

Consumers install with their own `.npmrc`:
```
@maxa:registry=https://gitlab.com/api/v4/projects/<PROJECT_ID>/packages/npm/
```

### Publish to public npm (later)
1. In `.npmrc`, enable Target B.
2. `export NPM_TOKEN=...` (automation token for the `@maxa` npm org).
3. `pnpm release:publish`.

The same versions can be published to both registries — run step 3 once per `.npmrc`.

## 4. CI option

`.gitlab-ci.yml` contains a commented `release` job that publishes to the **project**
registry using the built-in `CI_JOB_TOKEN` (no manual token). Enable it once the pipeline
is set up; until then, publishing is manual via the steps above.

---

## Duplicating this project (parallel / white-label)

To fork into a separate project, change only these and nothing else is registry/repo-coupled:

1. **Package scope** — replace `@maxa` across `packages/*/package.json` (name + internal deps)
   and in `.npmrc.example`.
2. **GitLab registry** — new `<PROJECT_ID>` in `.npmrc.example` / your `.npmrc`.
3. **Git remotes** — point `origin` / `gitlab` at the new repos.
4. **Changelog** — already host-agnostic (`@changesets/cli/changelog`); nothing to change
   unless you want host-enriched changelogs (then set `@changesets/changelog-github` +
   `repo` in `.changeset/config.json`).

No registry URLs or tokens live in `package.json`, so the published artifacts and the
publish target stay fully decoupled from the code.
