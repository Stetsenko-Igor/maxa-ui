# `.planning/` — Project Roadmap & Phase Plans

This directory is the **roadmap layer** for `maxa-ui`. It answers _in what order_, _by which phases_, and _with what success criteria_ the project moves forward.

It is **GSD-compatible** — the file shape matches the templates GSD's commands expect. Both Claude Code (`/gsd:*`) and Codex (`$gsd-*`) can operate on it.

It complements `specs/` but does not overlap with it:

| Directory    | Answers                                       | Lifespan                    |
| ------------ | --------------------------------------------- | --------------------------- |
| `specs/`     | _What_ each component / foundation looks like | Long-lived design contracts |
| `.planning/` | _When_ and _in what order_ we build / ship it | Evolving roadmap + phases   |

If a value, anatomy, or token is in question — go to `specs/`. If "what do we work on next" is in question — start with `NEXT.md`, then use `ROADMAP.md` for the full phase context.

## Files

```
.planning/
├── README.md             ← this file
├── PROJECT.md            ← project context (What This Is, Core Value, Requirements, Constraints, Key Decisions)
├── REQUIREMENTS.md       ← checkable v1 requirements + traceability table
├── ROADMAP.md            ← numbered Phases (1, 2, …) + Progress table
├── STATE.md              ← current position, velocity, accumulated context
├── NEXT.md               ← short current priority queue / "what next" answer
├── config.json           ← workflow preferences (mode, gates, parallelization)
└── phase-NN-<name>/      ← created per phase by /gsd:plan-phase
    ├── RESEARCH.md       ← optional (created by /gsd:research-phase)
    ├── PLAN.md           ← phase plan (created by /gsd:plan-phase)
    └── VERIFICATION.md   ← created by /gsd:verify-work after execution
```

## How this was initialized

This is a **brownfield project**. We did NOT run `/gsd:new-project` interactively — instead, the six files above were filled from the official GSD templates using context already encoded in `specs/`, git history, and existing code:

- `PROJECT.md` — Validated requirements inferred from shipped code; Active empty until Phase 1 is picked
- `REQUIREMENTS.md` — v1 requirements derived from the planned roadmap; categories: QUAL, COMP, HAND, REL, EXT
- `ROADMAP.md` — past milestones (v0.x) collapsed in `<details>`; Phase 1..5 planned for v1.0 → v1.1
- `STATE.md` — points at Phase 1 (Dark mode + accessibility audit) as Ready to plan
- `config.json` — default workflow preferences (interactive mode, standard granularity, gates on)

To verify GSD considers the project initialized, run `/gsd:health` (or `$gsd-health` in Codex).

## Commands

### Claude Code

| Command                                                      | Purpose                                     |
| ------------------------------------------------------------ | ------------------------------------------- |
| `/gsd:health`                                                | Check init status and missing prerequisites |
| `/gsd:progress`                                              | Show current phase, plan, completion        |
| `/gsd:plan-phase <N>`                                        | Write `phase-NN-<name>/PLAN.md` for phase N |
| `/gsd:research-phase <N>`                                    | Optional research pass before planning      |
| `/gsd:execute-phase <N>`                                     | Execute the phase plan with atomic commits  |
| `/gsd:verify-work <N>`                                       | Verify phase goal was actually delivered    |
| `/gsd:add-phase` / `/gsd:insert-phase` / `/gsd:remove-phase` | Reorder phases                              |
| `/gsd:add-todo` / `/gsd:check-todos`                         | Capture / review session todos              |
| `/gsd:settings`                                              | Tune `config.json`                          |
| `/gsd:audit-milestone`                                       | Audit a milestone after all phases ship     |

### Codex

Same skill names, different invocation syntax. Codex uses `$<skill-name>` with hyphens:

| Codex form             | Equivalent Claude Code form |
| ---------------------- | --------------------------- |
| `$gsd-health`          | `/gsd:health`               |
| `$gsd-progress`        | `/gsd:progress`             |
| `$gsd-plan-phase 1`    | `/gsd:plan-phase 1`         |
| `$gsd-execute-phase 1` | `/gsd:execute-phase 1`      |
| `$gsd-add-phase`       | `/gsd:add-phase`            |

> **Note on format.** Some prior notes referenced `Gsd Plan Phase` (capital-case with spaces). That is **not** the actual Codex invocation — per `~/.codex/skills/gsd-new-project/SKILL.md`, Codex skills are invoked as `$gsd-<name>` with hyphens. Use that form in Codex.

## Workflow

1. `/gsd:health` — confirm GSD sees the project as initialized
2. Pick a phase from `ROADMAP.md` (default is Phase 1)
3. Optional — `/gsd:research-phase <N>` if the phase has unknowns
4. `/gsd:plan-phase <N>` — produces `phase-NN-<name>/PLAN.md`
5. `/gsd:execute-phase <N>` — executes the plan with atomic commits and checkpoints
6. `/gsd:verify-work <N>` — verifies the phase goal was actually delivered
7. `/gsd:complete-milestone` once all phases for a milestone are done

## Who maintains this

Igor (project owner) is the decider. Claude Code and Codex both read this directory at the start of every session. Either may:

- Update `STATE.md` after a phase completes
- Add new requirements to `REQUIREMENTS.md` (only with explicit Igor approval — gated by `config.json:gates.confirm_*`)
- Propose new phases in `ROADMAP.md` via `/gsd:add-phase`
