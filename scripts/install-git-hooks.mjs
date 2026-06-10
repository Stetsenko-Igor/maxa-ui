#!/usr/bin/env node
import { execFileSync } from "node:child_process"

if (process.env.CI === "true") {
  process.exit(0)
}

let insideWorktree = false

try {
  insideWorktree =
    execFileSync("git", ["rev-parse", "--is-inside-work-tree"], { encoding: "utf8" }).trim() ===
    "true"
} catch {
  console.warn("Skipped git hooks setup; this directory is not a git worktree.")
  process.exit(0)
}

if (!insideWorktree) {
  console.warn("Skipped git hooks setup; this directory is not a git worktree.")
  process.exit(0)
}

try {
  execFileSync("git", ["config", "core.hooksPath", ".githooks"], { stdio: "ignore" })
  console.log("Configured git hooks path: .githooks")
} catch (error) {
  console.warn("Skipped git hooks setup; could not write git config.")
  process.exitCode = 0
}
