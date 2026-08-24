import { rm } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const scriptsDir = path.dirname(fileURLToPath(import.meta.url))
const docsDir = path.resolve(scriptsDir, "..")

await Promise.all(
  [".next", "out"].map((directory) =>
    rm(path.join(docsDir, directory), { recursive: true, force: true }),
  ),
)

console.log("Cleaned generated static export directories.")
