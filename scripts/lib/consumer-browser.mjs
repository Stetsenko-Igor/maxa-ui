import assert from "node:assert/strict"
import { createServer } from "node:http"
import { createRequire } from "node:module"
import { readFile, realpath, writeFile } from "node:fs/promises"
import path from "node:path"

const fixtureBody = `<h1 id="host-heading">Host heading</h1><ul id="host-list"><li>Host item</li></ul><button id="save" class="maxa-button maxa-button--primary maxa-button--md"><span class="maxa-button__label">Save</span></button><span id="brand-probe" style="color: var(--color-text-brand)">Brand</span><div class="maxa-input-wrapper maxa-input-wrapper--md"><label class="maxa-input__label" for="static-email">Email</label><div class="host-field\nmaxa-input__field"><input id="static-email" class="maxa-input__input" type="email" placeholder="you@maxa.com"></div></div>`

const namespacedHostCSS = `:root {
  --color-action-primary: #ff00ff; --color-bg-surface: #ffff00;
  --color-text-secondary: #ff00ff; --spacing-md: 71px; --spacing-3: 73px;
  --radius-xs: 79px; --font-body: Georgia; --text-md: 61px;
  --table-checkbox-cell-width: 131px;
}
#host-probe { color: var(--color-action-primary); background: var(--color-bg-surface); padding: var(--spacing-md); font-family: var(--font-body); }
`

async function prepareNamespacedFixtures(tempDir) {
  await writeFile(path.join(tempDir, "host-conflicts.css"), namespacedHostCSS)
  await writeFile(path.join(tempDir, "namespaced.css"), '@import "@maxa/tokens/namespaced/theme.css";\n@import "@maxa/ui/namespaced/styles.css";\n')
  await writeFile(path.join(tempDir, "src/namespaced.jsx"), `
import React from "react"
import { createRoot } from "react-dom/client"
import { Button, Input, Alert, Box, Text, DataTable, Popover, PopoverTrigger, PopoverContent } from "@maxa/ui/namespaced"
createRoot(document.getElementById("root")).render(<>
  <Button id="save">Save</Button><Input label="Email" />
  <Alert intent="success" title="Saved">Success message</Alert>
  <Box id="runtime-box" p="md" radius="xs" background="surface"><Text id="runtime-text">Runtime helpers</Text></Box>
  <DataTable selectable columns={[{key:"name",header:"Name",sortable:true}]} data={[{id:"1",name:"One"}]} defaultSort={{key:"name",direction:"ascending"}} />
  <Popover><PopoverTrigger asChild><Button variant="secondary">Open popover</Button></PopoverTrigger><PopoverContent id="portal-content">Portal</PopoverContent></Popover>
</>)
`)
  for (const kind of ["html", "react"]) {
    for (const order of ["before", "after"]) {
      const host = '<link rel="stylesheet" href="/host-conflicts.css">'
      const library = '<link rel="stylesheet" href="/namespaced.css">'
      const body = kind === "react" ? '<div id="root"></div><script type="module" src="/src/namespaced.jsx"></script>' : fixtureBody.replace('var(--color-text-brand)', 'var(--maxa-color-text-brand)') + '<div class="maxa-alert maxa-alert--success"><div class="maxa-alert__inner"><div class="maxa-alert__content"><strong class="maxa-alert__title">Saved</strong><p class="maxa-alert__description">Success message</p></div></div></div>'
      await writeFile(path.join(tempDir, `namespaced-${kind}-${order}.html`), `<!doctype html><html data-theme="dark" data-maxa-theme="light"><head><meta charset="utf-8"><link rel="icon" href="data:,">${order === "before" ? host + library : library + host}</head><body><div id="host-probe">Host</div>${body}</body></html>`)
    }
  }
}

async function verifyNamespacedFixtures(page, origin) {
  const style = (selector, property) => page.locator(selector).first().evaluate((element, name) => getComputedStyle(element)[name], property)
  for (const kind of ["html", "react"]) {
    for (const order of ["before", "after"]) {
      const label = `namespaced ${kind}, host ${order}`
      await page.mouse.move(0, 0)
      await page.goto(`${origin}/namespaced-${kind}-${order}.html`, { waitUntil: "networkidle" })
      if (kind === "html") assert.equal(await page.locator("script").count(), 0, `${label}: no JS`)
      for (const mode of ["light", "dark"]) {
        await page.evaluate(mode => {
          document.documentElement.dataset.maxaTheme = mode
          document.documentElement.dataset.theme = mode === "light" ? "dark" : "light"
        }, mode)
        const background = mode === "light" ? "rgb(5, 118, 218)" : "rgb(5, 100, 185)"
        await page.waitForFunction(background => getComputedStyle(document.getElementById("save")).backgroundColor === background, background)
        assert.equal(await style("#save", "color"), "rgb(255, 255, 255)", `${label} ${mode}: text`)
        assert.equal(await style("#save", "height"), "36px", `${label}: size`)
        assert.equal(await style("#save", "borderRadius"), "4px", `${label}: radius`)
        assert.match(await style("#save", "fontFamily"), /Montserrat/, `${label}: font`)
        const surface = mode === "light" ? "rgb(255, 255, 255)" : "rgb(42, 42, 43)"
        assert.equal(await style(".maxa-input__field", "backgroundColor"), surface, `${label} ${mode}: input`)
        assert.equal(await page.locator(".maxa-input__field").evaluate(element => element.getBoundingClientRect().height), 36, `${label}: input geometry`)
        assert.equal(await style(".maxa-alert--success", "backgroundColor"), mode === "light" ? "rgb(223, 244, 228)" : "rgb(25, 76, 40)", `${label} ${mode}: alert`)
        assert.equal(await style("#host-probe", "color"), "rgb(255, 0, 255)", `${label}: host color`)
        assert.equal(await style("#host-probe", "backgroundColor"), "rgb(255, 255, 0)", `${label}: host surface`)
        assert.equal(await style("#host-probe", "paddingTop"), "71px", `${label}: host spacing`)
        assert.match(await style("#host-probe", "fontFamily"), /Georgia/, `${label}: host font`)
        const leaked = await page.evaluate(() => {
          const root = getComputedStyle(document.documentElement)
          return ["--button-primary-bg", "--input-bg", "--alert-success-bg", "--color-brand-500", "--color-blue-500"].filter(name => root.getPropertyValue(name).trim())
        })
        assert.deepEqual(leaked, [], `${label}: no generic library tokens on root`)
        if (kind === "react") {
          assert.equal(await style("#runtime-box", "paddingTop"), "8px", `${label}: dynamic spacing`)
          assert.equal(await style("#runtime-box", "borderRadius"), "4px", `${label}: dynamic radius`)
          assert.equal(await style("#runtime-box", "backgroundColor"), surface, `${label}: dynamic surface`)
          assert.equal(await style("#runtime-text", "fontSize"), "14px", `${label}: dynamic text size`)
          assert.equal(await style("#runtime-text", "lineHeight"), "20px", `${label}: dynamic line height`)
          assert.equal(await style("#runtime-text", "color"), mode === "light" ? "rgb(68, 68, 69)" : "rgb(237, 237, 237)", `${label}: dynamic text color`)
          assert.match(await style("#runtime-text", "fontFamily"), /Montserrat/, `${label}: inline font`)
          const columnWidth = await page.locator("col[style]").first().evaluate(element => element.style.width)
          assert.equal(columnWidth, "var(--maxa-table-checkbox-cell-width)", `${label}: inline table width reference`)
          assert.equal(await style("col[style]", "width"), "44px", `${label}: inline table width resolves`)
          assert.equal(await page.locator(".maxa-datatable__sort-icon--active").getAttribute("width"), "var(--maxa-spacing-3)", `${label}: SVG variable reference`)
          assert.equal(await page.locator(".maxa-datatable__sort-icon--active").evaluate(element => element.getBoundingClientRect().width), 12, `${label}: SVG variable resolves`)
          if (mode === "light") {
            await page.getByRole("button", { name: "Open popover" }).click()
            await page.locator("#portal-content").waitFor()
            assert.equal(await page.locator("#portal-content").evaluate(element => document.getElementById("root").contains(element)), false, `${label}: actual portal`)
          }
          assert.equal(await style("#portal-content", "backgroundColor"), mode === "light" ? "rgb(255, 255, 255)" : "rgb(68, 68, 69)", `${label}: portal theme`)
        }
      }
      // Client settings remain independent: a brand override must not recolor actions.
      await page.evaluate(() => {
        document.documentElement.style.setProperty("--maxa-color-brand-500", "#663399")
      })
      assert.equal(await style("#save", "backgroundColor"), "rgb(5, 100, 185)", `${label}: brand remains independent of primary action`)
      await page.evaluate(() => {
        document.documentElement.style.setProperty("--maxa-color-action-primary", "#663399")
      })
      await page.waitForFunction(() => getComputedStyle(document.getElementById("save")).backgroundColor === "rgb(102, 51, 153)")
      assert.equal(await style("#host-probe", "color"), "rgb(255, 0, 255)", `${label}: client action override stays isolated`)
    }
  }
}

export async function prepareBrowserFixtures(tempDir) {
  await prepareNamespacedFixtures(tempDir)
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
    await verifyNamespacedFixtures(page, origin)
    assert.deepEqual(errors, [], "Consumer browser errors or failed assets")
    console.log("✓ Browser consumer: React, HTML-only CSS, custom theme, dark mode, focus, portals, and host styles.")
  } finally {
    try { await browser?.close() } finally {
      await new Promise((resolve, reject) => server.close(error => error && error.code !== "ERR_SERVER_NOT_RUNNING" ? reject(error) : resolve()))
    }
  }
}
