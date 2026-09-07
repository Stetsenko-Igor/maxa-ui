import assert from "node:assert/strict"
import { createServer } from "node:http"
import { createRequire } from "node:module"
import { readFile, realpath, writeFile } from "node:fs/promises"
import path from "node:path"

const fixtureBody = `<h1 id="host-heading">Host heading</h1><ul id="host-list"><li>Host item</li></ul><button id="save" class="maxa-button maxa-button--primary maxa-button--md"><span class="maxa-button__label">Save</span></button><span id="brand-probe" style="color: var(--color-text-brand)">Brand</span><div class="maxa-input-wrapper maxa-input-wrapper--md"><label class="maxa-input__label" for="static-email">Email</label><div class="host-field\nmaxa-input__field"><input id="static-email" class="maxa-input__input" type="email" placeholder="you@maxa.com"></div></div>`

export async function prepareBrowserFixtures(tempDir) {
  await writeFile(path.join(tempDir, "plain.css"), '@import "@maxa/tokens/theme.css";\n@import "@maxa/ui/styles.css";\n')
  const brand = Array.from({ length: 11 }, (_, index) => {
    const shade = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950][index]
    return `--color-brand-${shade}: #663399;`
  }).join("\n")
  await writeFile(path.join(tempDir, "custom.css"), `@import "@maxa/tokens/core.css";
@import "@maxa/ui/styles.css";
:root { ${brand} --color-action-primary: #663399; --font-body: Georgia, serif; --radius-xs: 11px; }
`)
  for (const name of ["plain", "custom"]) {
    await writeFile(path.join(tempDir, `${name}.html`), `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="/${name}.css"><link rel="icon" href="data:,"></head><body>${fixtureBody}</body></html>`)
  }
}

export async function verifyConsumerBrowser(tempDir, repoRoot) {
  const require = createRequire(path.join(repoRoot, "apps/docs/package.json"))
  const { chromium } = require("@playwright/test")
  const root = await realpath(path.join(tempDir, "dist"))
  const server = createServer(async (request, response) => {
    try {
      const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname)
      const candidate = await realpath(path.resolve(root, `.${pathname === "/" ? "/index.html" : pathname}`))
      if (candidate !== root && !candidate.startsWith(`${root}${path.sep}`)) {
        response.writeHead(403).end()
        return
      }
      const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml" }
      response.writeHead(200, { "Content-Type": types[path.extname(candidate)] ?? "application/octet-stream" })
      response.end(await readFile(candidate))
    } catch {
      response.writeHead(404).end()
    }
  })
  let browser
  try {
    await new Promise((resolve, reject) => {
      server.once("error", reject)
      server.listen(0, "127.0.0.1", resolve)
    })
    browser = await chromium.launch({ headless: true })
    const errors = []
    const page = await browser.newPage({ reducedMotion: "reduce" })
    page.on("pageerror", error => errors.push(error.message))
    page.on("console", message => { if (message.type() === "error") errors.push(message.text()) })
    page.on("requestfailed", request => errors.push(`${request.url()}: ${request.failure()?.errorText}`))
    page.on("response", response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`) })
    const origin = `http://127.0.0.1:${server.address().port}`
    const style = (selector, property) => page.locator(selector).evaluate((element, name) => getComputedStyle(element)[name], property)
    for (const route of ["/", "/plain.html", "/custom.html"]) {
      await page.mouse.move(0, 0)
      await page.goto(`${origin}${route}`, { waitUntil: "networkidle" })
      const custom = route === "/custom.html"
      if (route !== "/") assert.equal(await page.locator("script").count(), 0, `${route}: HTML-only fixture must not load JavaScript`)
      await page.locator("#save").waitFor()
      assert.equal(await style("#save", "backgroundColor"), custom ? "rgb(102, 51, 153)" : "rgb(5, 118, 218)", `${route}: primary background`)
      assert.equal(await style("#save", "borderTopColor"), custom ? "rgb(102, 51, 153)" : "rgb(5, 118, 218)", `${route}: primary border`)
      assert.equal(await style("#save", "color"), "rgb(255, 255, 255)", `${route}: primary text`)
      assert.equal(await style("#save", "height"), "36px", `${route}: button height`)
      assert.equal(await style("#save", "borderRadius"), custom ? "11px" : "4px", `${route}: radius`)
      if (custom) assert.equal(await style("#brand-probe", "color"), "rgb(102, 51, 153)", "custom semantic brand alias")
      assert.match(await style("#save", "fontFamily"), custom ? /Georgia/ : /Montserrat/, `${route}: font`)
      assert.equal(await style("#host-list", "listStyleType"), "disc", `${route}: host list reset`)
      assert.equal(await style("#host-heading", "fontSize"), "32px", `${route}: host heading reset`)
      assert.equal(await style("#host-heading", "marginBlockStart"), "21.44px", `${route}: host heading margin reset`)
      await page.keyboard.press("Tab")
      await page.locator("#save").focus()
      assert.equal(await style("#save", "outlineStyle"), "solid", `${route}: focus outline`)
      assert.equal(await style("#save", "outlineWidth"), "2px", `${route}: focus width`)
      assert.equal(await style("#save", "outlineColor"), "rgb(5, 118, 218)", `${route}: focus color`)
      const inputGeometry = await page.locator(".maxa-input__field").evaluate(element => ({
        height: element.getBoundingClientRect().height,
        width: element.getBoundingClientRect().width,
        wrapperWidth: element.closest(".maxa-input-wrapper").getBoundingClientRect().width,
      }))
      assert.equal(inputGeometry.height, 36, `${route}: input outer height must match its 36px size token`)
      assert.ok(inputGeometry.width <= inputGeometry.wrapperWidth, `${route}: input outer width must fit its wrapper`)
      assert.equal(await style(".maxa-input__field", "backgroundColor"), "rgb(255, 255, 255)", `${route}: light input`)
      if (!custom) {
        if (route === "/") {
          await page.getByRole("button", { name: "Open popover" }).click()
          await page.locator("#portal-content").waitFor()
          assert.equal(await page.locator("#portal-content").evaluate(element => document.getElementById("root").contains(element)), false, "popover actually portals")
          assert.equal(await style("#portal-content", "backgroundColor"), "rgb(255, 255, 255)", "light portal")
        }
        await page.evaluate(() => document.documentElement.dataset.theme = "dark")
        // Token-driven background transitions must finish before computed-style checks.
        await page.waitForFunction(() => getComputedStyle(document.getElementById("save")).backgroundColor === "rgb(5, 100, 185)")
        assert.equal(await style("#save", "color"), "rgb(255, 255, 255)", `${route}: dark text`)
        assert.equal(await style(".maxa-input__field", "backgroundColor"), "rgb(42, 42, 43)", `${route}: dark input`)
        if (route === "/") {
          assert.equal(await style("#portal-content", "backgroundColor"), "rgb(68, 68, 69)", "dark portal")
        }
      }
    }
    assert.deepEqual(errors, [], "Consumer browser errors or failed assets")
    console.log("✓ Browser consumer: React, HTML-only CSS, custom theme, dark mode, focus, portals, and host styles.")
  } finally {
    try { await browser?.close() } finally {
      await new Promise((resolve, reject) => server.close(error => error && error.code !== "ERR_SERVER_NOT_RUNNING" ? reject(error) : resolve()))
    }
  }
}
