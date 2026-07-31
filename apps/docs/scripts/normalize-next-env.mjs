import { readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const scriptsDir = path.dirname(fileURLToPath(import.meta.url))
const nextEnvPath = path.resolve(scriptsDir, "../next-env.d.ts")
const stableRouteTypesReference = '/// <reference path="./.next-dev/types/routes.d.ts" />'

const current = await readFile(nextEnvPath, "utf8")
const normalized = current.replace(
  /\/\/\/ <reference path="\.\/\.next(?:-dev)?\/types\/routes\.d\.ts" \/>/,
  stableRouteTypesReference,
)

if (normalized !== current) {
  await writeFile(nextEnvPath, normalized)
}
