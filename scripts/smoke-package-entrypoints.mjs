import { execFile } from "node:child_process"
import { access, mkdir, mkdtemp, readdir, readFile, rm, stat, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"
import { promisify } from "node:util"
import { pathToFileURL } from "node:url"

const repoRoot = process.cwd()
const packagesRoot = path.join(repoRoot, "packages")
const execFileAsync = promisify(execFile)
const runtimeImportPackages = new Set([
  "@maxa/cli",
  "@maxa/hooks",
  "@maxa/icons",
  "@maxa/mcp",
  "@maxa/tokens",
])

const jsSpecifierPattern =
  /\b(?:import|export)\s+(?:type\s+)?(?:[^'";]*?\s+from\s+)?["'](\.{1,2}\/[^"']+)["']|\bimport\s*\(\s*["'](\.{1,2}\/[^"']+)["']\s*\)/g

const failures = []

function fail(message) {
  failures.push(message)
}

function formatError(error) {
  if (!(error instanceof Error)) return String(error)

  const details = [error.message]
  if ("stdout" in error && typeof error.stdout === "string" && error.stdout.trim()) {
    details.push(`stdout:\n${error.stdout.trim()}`)
  }
  if ("stderr" in error && typeof error.stderr === "string" && error.stderr.trim()) {
    details.push(`stderr:\n${error.stderr.trim()}`)
  }
  return details.join("\n")
}

async function exists(filePath) {
  try {
    await access(filePath)
    return true
  } catch {
    return false
  }
}

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"))
}

async function listPackageDirs() {
  const entries = await readdir(packagesRoot, { withFileTypes: true })
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(packagesRoot, entry.name))
    .sort()
}

async function listPublicPackages() {
  const packages = []
  for (const packageDir of await listPackageDirs()) {
    const packageJson = await readJson(path.join(packageDir, "package.json"))
    if (packageJson.private) continue
    packages.push({
      dir: packageDir,
      name: packageJson.name ?? path.basename(packageDir),
    })
  }
  return packages
}

async function walkFiles(dir, predicate) {
  const result = []
  async function walk(current) {
    const entries = await readdir(current, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name)
      if (entry.isDirectory()) {
        await walk(fullPath)
      } else if (predicate(fullPath)) {
        result.push(fullPath)
      }
    }
  }
  if (await exists(dir)) await walk(dir)
  return result.sort()
}

function normalizePackageTarget(target) {
  return target.replace(/^\.\//, "")
}

async function assertPackageTarget(packageDir, packageName, label, target) {
  const targetPath = path.join(packageDir, normalizePackageTarget(target))
  if (!(await exists(targetPath))) {
    fail(`${packageName}: ${label} points at missing file ${target}`)
  }
}

async function assertExportTargets(packageDir, packageName, exportsValue, label = "exports") {
  if (typeof exportsValue === "string") {
    await assertPackageTarget(packageDir, packageName, label, exportsValue)
    return
  }

  if (!exportsValue || typeof exportsValue !== "object") return

  for (const [key, value] of Object.entries(exportsValue)) {
    await assertExportTargets(packageDir, packageName, value, `${label}.${key}`)
  }
}

async function assertBinTargets(packageDir, packageName, binValue) {
  if (!binValue) return
  const entries =
    typeof binValue === "string" ? [[packageName, binValue]] : Object.entries(binValue)

  for (const [binName, target] of entries) {
    const targetPath = path.join(packageDir, normalizePackageTarget(target))
    if (!(await exists(targetPath))) {
      fail(`${packageName}: bin ${binName} points at missing file ${target}`)
      continue
    }

    const targetStat = await stat(targetPath)
    if ((targetStat.mode & 0o111) === 0) {
      fail(`${packageName}: bin ${binName} target ${target} is not executable`)
    }

    const contents = await readFile(targetPath, "utf8")
    if (!contents.startsWith("#!")) {
      fail(`${packageName}: bin ${binName} target ${target} is missing a shebang`)
    }
  }
}

function dependencyEntries(packageJson) {
  return [
    ...Object.entries(packageJson.dependencies ?? {}),
    ...Object.entries(packageJson.peerDependencies ?? {}),
    ...Object.entries(packageJson.optionalDependencies ?? {}),
    ...Object.entries(packageJson.devDependencies ?? {}),
  ]
}

function assertNoWorkspaceDependencies(packageName, packageJson) {
  for (const [dependencyName, version] of dependencyEntries(packageJson)) {
    if (typeof version === "string" && version.startsWith("workspace:")) {
      fail(
        `${packageName}: packed manifest leaked workspace dependency ${dependencyName}: ${version}`,
      )
    }
  }
}

async function assertDistSpecifiers(packageDir, packageName) {
  const distDir = path.join(packageDir, "dist")
  const jsFiles = await walkFiles(distDir, (filePath) => filePath.endsWith(".js"))

  for (const filePath of jsFiles) {
    const source = await readFile(filePath, "utf8")
    for (const match of source.matchAll(jsSpecifierPattern)) {
      const specifier = match[1] ?? match[2]
      if (!specifier) continue

      const extension = path.extname(specifier)
      const relativeFile = path.relative(packageDir, filePath)
      if (!extension) {
        fail(`${packageName}: ${relativeFile} has extensionless relative specifier ${specifier}`)
        continue
      }

      const resolvedPath = path.resolve(path.dirname(filePath), specifier)
      if (!(await exists(resolvedPath))) {
        fail(`${packageName}: ${relativeFile} imports missing file ${specifier}`)
        continue
      }

      const resolvedStat = await stat(resolvedPath)
      if (resolvedStat.isDirectory()) {
        fail(`${packageName}: ${relativeFile} imports directory ${specifier}`)
      }
    }
  }
}

async function assertRuntimeImport(packageDir, packageName) {
  if (!runtimeImportPackages.has(packageName)) return
  const entryUrl = pathToFileURL(path.join(packageDir, "dist/index.js")).href
  await import(entryUrl)
}

async function packPackageTo(packageDir, destinationDir) {
  const { stdout } = await execFileAsync("pnpm", ["pack", "--pack-destination", destinationDir], {
    cwd: packageDir,
    maxBuffer: 1024 * 1024,
  })
  const tarballPath = stdout.trim().split(/\r?\n/).at(-1)
  if (!tarballPath) return undefined
  return path.isAbsolute(tarballPath) ? tarballPath : path.join(packageDir, tarballPath)
}

async function assertPackedPackage(packageDir, packageName) {
  const tempDir = await mkdtemp(path.join(tmpdir(), "maxa-pack-smoke-"))
  try {
    const tarballPath = await packPackageTo(packageDir, tempDir)
    if (!tarballPath) {
      fail(`${packageName}: pnpm pack did not report a tarball path`)
      return
    }

    const extractDir = path.join(tempDir, "extract")
    await execFileAsync("tar", ["-xzf", tarballPath, "-C", tempDir])
    const packedPackageDir = path.join(extractDir, "..", "package")
    const packedPackageJson = await readJson(path.join(packedPackageDir, "package.json"))

    assertNoWorkspaceDependencies(packageName, packedPackageJson)
    if (packedPackageJson.main)
      await assertPackageTarget(
        packedPackageDir,
        packageName,
        "packed main",
        packedPackageJson.main,
      )
    if (packedPackageJson.module)
      await assertPackageTarget(
        packedPackageDir,
        packageName,
        "packed module",
        packedPackageJson.module,
      )
    if (packedPackageJson.types)
      await assertPackageTarget(
        packedPackageDir,
        packageName,
        "packed types",
        packedPackageJson.types,
      )
    if (packedPackageJson.exports)
      await assertExportTargets(
        packedPackageDir,
        packageName,
        packedPackageJson.exports,
        "packed exports",
      )
    await assertBinTargets(packedPackageDir, packageName, packedPackageJson.bin)
    await assertDistSpecifiers(packedPackageDir, packageName)
  } catch (error) {
    fail(`${packageName}: pack smoke failed: ${formatError(error)}`)
  } finally {
    await rm(tempDir, { recursive: true, force: true })
  }
}

function consumerSmokeSource() {
  return `
import { access } from "node:fs/promises"

const modules = [
  "@maxa/cli",
  "@maxa/hooks",
  "@maxa/icons",
  "@maxa/mcp",
  "@maxa/tokens",
]

for (const specifier of modules) {
  const mod = await import(specifier)
  if (Object.keys(mod).length === 0) {
    throw new Error(\`\${specifier} imported with no public exports\`)
  }
}

const { CaretDown, social } = await import("@maxa/icons")
if (CaretDown == null) {
  throw new Error("@maxa/icons did not expose curated Phosphor icons")
}
if (social?.GoogleIcon == null) {
  throw new Error("@maxa/icons did not expose social.GoogleIcon")
}

const uiUrl = await import.meta.resolve("@maxa/ui")
if (!uiUrl.endsWith("/@maxa/ui/dist/index.js")) {
  throw new Error(\`@maxa/ui resolved to unexpected target: \${uiUrl}\`)
}
await access(new URL(uiUrl))

const themeUrl = await import.meta.resolve("@maxa/tokens/theme.css")
if (!themeUrl.endsWith("/@maxa/tokens/dist/theme.css")) {
  throw new Error(\`@maxa/tokens/theme.css resolved to unexpected target: \${themeUrl}\`)
}
await access(new URL(themeUrl))
`
}

function bundlerSmokeHtml() {
  return `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MAXA Consumer Smoke</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`
}

function bundlerSmokeSource() {
  return `
import React from "react"
import { createRoot } from "react-dom/client"
import "@maxa/tokens/theme.css"
import { Button, Input } from "@maxa/ui"

function App() {
  return (
    <main>
      <Button variant="primary" size="md">Save</Button>
      <Input label="Email" placeholder="you@maxa.com" />
    </main>
  )
}

createRoot(document.getElementById("root")).render(<App />)
`
}

async function assertConsumerInstall(packages) {
  const tempDir = await mkdtemp(path.join(tmpdir(), "maxa-consumer-smoke-"))
  try {
    const tarballsDir = path.join(tempDir, "tarballs")
    await mkdir(tarballsDir)

    const localPackageDependencies = {}
    const localPackageOverrides = {}
    for (const packageInfo of packages) {
      const tarballPath = await packPackageTo(packageInfo.dir, tarballsDir)
      if (!tarballPath) {
        fail(`${packageInfo.name}: pnpm pack did not report a tarball path for consumer smoke`)
        return
      }
      const tarballSpecifier = `file:${tarballPath}`
      localPackageDependencies[packageInfo.name] = tarballSpecifier
      localPackageOverrides[packageInfo.name] = tarballSpecifier
    }

    await writeFile(
      path.join(tempDir, "package.json"),
      JSON.stringify(
        {
          name: "maxa-consumer-smoke",
          private: true,
          type: "module",
          dependencies: {
            ...localPackageDependencies,
            react: "^19.0.0",
            "react-dom": "^19.0.0",
          },
          devDependencies: {
            "@vitejs/plugin-react": "^6.0.1",
            vite: "^8.0.0",
          },
          scripts: {
            build: "vite build",
          },
          pnpm: {
            overrides: localPackageOverrides,
          },
        },
        null,
        2,
      ),
    )

    await execFileAsync("pnpm", ["install"], {
      cwd: tempDir,
      maxBuffer: 1024 * 1024 * 8,
    })

    await writeFile(path.join(tempDir, "consumer-smoke.mjs"), consumerSmokeSource())
    await execFileAsync("node", ["consumer-smoke.mjs"], {
      cwd: tempDir,
      maxBuffer: 1024 * 1024,
    })
    await execFileAsync("pnpm", ["exec", "maxa-ui", "--help"], {
      cwd: tempDir,
      maxBuffer: 1024 * 1024,
    })

    await mkdir(path.join(tempDir, "src"))
    await writeFile(path.join(tempDir, "index.html"), bundlerSmokeHtml())
    await writeFile(path.join(tempDir, "src/main.jsx"), bundlerSmokeSource())
    await writeFile(
      path.join(tempDir, "vite.config.mjs"),
      `
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
})
`,
    )
    await execFileAsync("pnpm", ["run", "build"], {
      cwd: tempDir,
      maxBuffer: 1024 * 1024 * 8,
    })
  } catch (error) {
    fail(`consumer install smoke failed: ${formatError(error)}`)
  } finally {
    await rm(tempDir, { recursive: true, force: true })
  }
}

async function smokePackage(packageDir) {
  const packageJsonPath = path.join(packageDir, "package.json")
  const packageJson = await readJson(packageJsonPath)
  const packageName = packageJson.name ?? path.basename(packageDir)

  if (packageJson.private) return

  if (packageJson.main) await assertPackageTarget(packageDir, packageName, "main", packageJson.main)
  if (packageJson.module)
    await assertPackageTarget(packageDir, packageName, "module", packageJson.module)
  if (packageJson.types)
    await assertPackageTarget(packageDir, packageName, "types", packageJson.types)
  if (packageJson.exports) await assertExportTargets(packageDir, packageName, packageJson.exports)
  await assertBinTargets(packageDir, packageName, packageJson.bin)
  await assertDistSpecifiers(packageDir, packageName)

  try {
    await assertRuntimeImport(packageDir, packageName)
  } catch (error) {
    fail(`${packageName}: runtime import failed: ${formatError(error)}`)
  }

  await assertPackedPackage(packageDir, packageName)
}

const publicPackages = await listPublicPackages()

for (const { dir } of publicPackages) {
  await smokePackage(dir)
}

await assertConsumerInstall(publicPackages)

if (failures.length > 0) {
  console.error("Package entrypoint smoke failed:")
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exitCode = 1
} else {
  console.log(
    "✓ Package entrypoints resolve, pack cleanly, and install in a consumer smoke project.",
  )
}
