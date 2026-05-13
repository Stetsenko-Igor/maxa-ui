import assert from "node:assert/strict"
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { dirname, join } from "node:path"
import test from "node:test"

import { collectTokenStats, formatTokenStats } from "./token-stats.mjs"

function writeFixtureFile(root, filePath, contents) {
  const fullPath = join(root, filePath)
  mkdirSync(dirname(fullPath), { recursive: true })
  writeFileSync(fullPath, contents)
}

test("collectTokenStats cross-references defined and used CSS tokens", () => {
  const root = mkdtempSync(join(tmpdir(), "maxa-token-stats-"))

  writeFixtureFile(
    root,
    "packages/tokens/src/semantic.css",
    `:root {
  --color-text-primary: #111111;
  --color-text-secondary: #333333;
}

[data-theme="dark"] {
  --color-text-primary: #ffffff;
}
`,
  )

  writeFixtureFile(
    root,
    "packages/tokens/src/component-button.css",
    `:root {
  --button-primary-bg: var(--color-text-primary);
  --button-primary-text: var(--color-text-secondary);
}
`,
  )

  writeFixtureFile(
    root,
    "packages/ui/src/components/button/button.css",
    `.button {
  color: var(--button-primary-text);
  background: var(--button-primary-bg);
}
`,
  )

  writeFixtureFile(
    root,
    "apps/docs/app/page.css",
    `.docs {
  color: var(--color-text-primary);
}
`,
  )

  const stats = collectTokenStats(root)

  assert.equal(stats.defined.total, 4)
  assert.equal(stats.used.total, 3)
  assert.equal(stats.docsUsage.total, 1)
  assert.deepEqual(stats.unused.tokens.map((token) => token.name), [
    "color-text-secondary",
  ])

  assert.equal(
    stats.byCollection.find((collection) => collection.file === "semantic.css")
      ?.defined,
    2,
  )
  assert.equal(
    stats.byComponent.find((component) => component.file === "button.css")
      ?.used,
    2,
  )

  assert.equal(stats.darkMode.rootTokens, 4)
  assert.equal(stats.darkMode.overridden, 1)
  assert.deepEqual(stats.darkMode.missing.slice(0, 3), [
    "button-primary-bg",
    "button-primary-text",
    "color-text-secondary",
  ])
})

test("formatTokenStats includes summary, collections, components, and dark mode", () => {
  const root = mkdtempSync(join(tmpdir(), "maxa-token-stats-"))

  writeFixtureFile(
    root,
    "packages/tokens/src/semantic.css",
    `:root {
  --color-text-primary: #111111;
}
`,
  )
  writeFixtureFile(
    root,
    "apps/docs/app/page.css",
    `.docs { color: var(--color-text-primary); }`,
  )

  const output = formatTokenStats(collectTokenStats(root))

  assert.match(output, /MAXA UI - Token Statistics/)
  assert.match(output, /Defined tokens\s+1/)
  assert.match(output, /semantic\.css/)
  assert.match(output, /Docs usage/)
  assert.match(output, /Dark mode coverage/)
})
