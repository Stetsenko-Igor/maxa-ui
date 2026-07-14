import { expect, test, type Page } from "@playwright/test"

/**
 * Visual regression pilot.
 *
 * Scope is deliberately small (see .planning/04-01 / improvement-sprint plan):
 * a handful of component pages, two overlay open-states, and two foundations
 * pages. Expand only after this set proves stable in CI.
 *
 * The static export emits `<route>.html` files, so tests navigate to the
 * explicit .html path — no clean-URL server behavior is assumed.
 */

async function gotoStable(page: Page, path: string) {
  await page.goto(path, { waitUntil: "networkidle" })
  // Fonts shift layout; wait until they are done loading.
  await page.evaluate(() => document.fonts.ready)
  await page.emulateMedia({ reducedMotion: "reduce" })
}

function previews(page: Page) {
  return page.locator("[data-component-preview]")
}

/**
 * The preview render area. The wrapper's toolbar contains its own buttons
 * (Preview/Code tabs, copy) — overlay triggers must be located inside the
 * pane, not the wrapper.
 */
function previewPane(page: Page) {
  return page.locator(".component-preview-pane").first()
}

// --- Component pages: first (default) preview block per page ---

const COMPONENT_PAGES = ["button", "input", "select", "multi-select", "dropdown-menu", "dialog", "popover"]

for (const name of COMPONENT_PAGES) {
  test(`component: ${name} default preview`, async ({ page }) => {
    await gotoStable(page, `/docs/components/${name}.html`)
    const preview = previews(page).first()
    await expect(preview).toBeVisible()
    await expect(preview).toHaveScreenshot(`component-${name}.png`)
  })
}

// --- Overlay open states (portal content, screenshot the viewport) ---

test("overlay: dropdown-menu open", async ({ page }) => {
  await gotoStable(page, "/docs/components/dropdown-menu.html")
  await previewPane(page).getByRole("button").first().click()
  await expect(page.getByRole("menu")).toBeVisible()
  await expect(page).toHaveScreenshot("overlay-dropdown-menu-open.png")
})

test("overlay: dialog open", async ({ page }) => {
  await gotoStable(page, "/docs/components/dialog.html")
  await previewPane(page).getByRole("button").first().click()
  await expect(page.getByRole("dialog")).toBeVisible()
  await expect(page).toHaveScreenshot("overlay-dialog-open.png")
})

test("overlay: popover open", async ({ page }) => {
  await gotoStable(page, "/docs/components/popover.html")
  await previewPane(page).getByRole("button").first().click()
  await expect(page.getByRole("dialog")).toBeVisible()
  await expect(page).toHaveScreenshot("overlay-popover-open.png")
})

// --- Foundations pages: full page (token tables/swatches) ---

const FOUNDATION_PAGES = ["colors", "typography"]

for (const name of FOUNDATION_PAGES) {
  test(`foundation: ${name}`, async ({ page }) => {
    await gotoStable(page, `/docs/foundations/${name}.html`)
    await expect(page).toHaveScreenshot(`foundation-${name}.png`, { fullPage: true })
  })
}
