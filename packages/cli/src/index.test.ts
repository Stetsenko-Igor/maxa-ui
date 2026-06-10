import { fileURLToPath } from "node:url"
import { describe, expect, it } from "vitest"
import { runCli, version } from "./index"

const repoRoot = fileURLToPath(new URL("../../..", import.meta.url))

function capture(argv: string[]) {
  const stdout: string[] = []
  const stderr: string[] = []
  const exitCode = runCli(argv, {
    stdout: (message) => stdout.push(message),
    stderr: (message) => stderr.push(message),
    env: { ...process.env, MAXA_REPO_ROOT: repoRoot },
  })
  return { exitCode, stdout, stderr }
}

describe("cli", () => {
  it("exports version", () => {
    expect(version).toBe("0.0.1")
  })

  it("prints help", () => {
    const result = capture(["--help"])

    expect(result.exitCode).toBe(0)
    expect(result.stdout.join("\n")).toContain("Read-only introspection commands only")
  })

  it("lists components as json", () => {
    const result = capture(["components", "list", "--json"])

    expect(result.exitCode).toBe(0)
    expect(JSON.parse(result.stdout[0] ?? "[]")).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "button", hasImplementation: true }),
      ]),
    )
  })

  it("searches tokens", () => {
    const result = capture(["tokens", "search", "button"])

    expect(result.exitCode).toBe(0)
    expect(result.stdout.join("\n")).toContain("--button-primary-bg")
  })

  it("gets a token as json", () => {
    const result = capture(["tokens", "get", "--button-primary-bg", "--json"])
    const body = JSON.parse(result.stdout[0] ?? "{}")

    expect(result.exitCode).toBe(0)
    expect(body).toMatchObject({
      name: "--button-primary-bg",
      mode: "light",
    })
    expect(body.value).toBeTruthy()
  })

  it("reports unknown commands", () => {
    const result = capture(["generate", "component"])

    expect(result.exitCode).toBe(1)
    expect(result.stderr.join("\n")).toContain("Unknown command")
  })
})
