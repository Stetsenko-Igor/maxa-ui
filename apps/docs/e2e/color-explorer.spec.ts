import { expect, test, type Page } from "@playwright/test"

const route = process.env.EXPLORER_DEV
  ? "/docs/foundations/colors"
  : "/docs/foundations/colors.html"
async function tokens(page: Page, hash = "tokens") {
  await page.goto(`${route}#${hash}`)
  await expect(page.getByRole("tab", { name: "Tokens", exact: true })).toHaveAttribute(
    "data-state",
    "active",
  )
  await expect(page.getByRole("complementary", { name: "Color token inspector" })).toBeVisible()
}

test("Overview combines guidance and reference, with only two keyboard-accessible tabs", async ({
  page,
}) => {
  await page.goto(route)
  await expect(page.getByRole("tab")).toHaveCount(2)
  await expect(page.locator("#token-model")).toBeVisible()
  await expect(
    page.getByRole("heading", { name: "Primitive neutral scale", exact: true }),
  ).toBeVisible()
  await page.getByRole("tab", { name: "Overview", exact: true }).focus()
  await page.keyboard.press("ArrowRight")
  await expect(page.getByRole("tab", { name: "Tokens", exact: true })).toBeFocused()
})

test("read-only browser keeps usage and dependencies with inspector on the left", async ({
  page,
}) => {
  await tokens(page, "explore")
  await expect(page.getByText("Used by", { exact: true })).toBeVisible()
  await expect(
    page.getByText("Library CSS references, not a list of product screens.", { exact: true }),
  ).toBeVisible()
  await expect(page.getByRole("region", { name: "Live color preview" })).toHaveCount(0)
  await expect(page.getByRole("textbox", { name: "Trial color", exact: true })).toHaveCount(0)
  const inspector = await page.locator(".color-explorer__inspector").boundingBox()
  const content = await page.locator(".color-explorer__main").boundingBox()
  expect(inspector!.x + inspector!.width).toBeLessThanOrEqual(content!.x)
  await page.getByRole("button", { name: "Follow --color-blue-500", exact: true }).click()
  await expect(page.locator("[data-selected-token]")).toHaveText("--color-blue-500")
})

test("layer switch clears stale search and exposes all primitive colors", async ({ page }) => {
  await tokens(page)
  await page.getByRole("textbox", { name: "Search color tokens" }).fill("action-primary")
  const layer = page.getByRole("combobox", { name: "Token layer" })
  await expect(layer.locator('option[value="foundation"]')).toHaveCount(0)
  await layer.selectOption("primitive")
  await expect(page.getByRole("textbox", { name: "Search color tokens" })).toHaveValue("")
  await expect(page.locator(".color-explorer__count")).toContainText("237 tokens")
  await page.getByRole("textbox", { name: "Search color tokens" }).fill("--color-blue-500")
  await expect(
    page.getByRole("button", { name: "Select --color-blue-500", exact: true }),
  ).toBeVisible()
})

test("token browser follows site dark mode without a forced light container", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("maxa-theme", "dark"))
  await tokens(page)
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark")
  await expect(page.locator(".color-explorer__count")).toContainText("dark values")
  await expect(page.locator('.color-explorer [data-theme="light"]')).toHaveCount(0)
  const inspector = page.locator(".color-explorer__inspector")
  expect(await inspector.evaluate((el) => getComputedStyle(el).backgroundColor)).not.toBe(
    "rgb(255, 255, 255)",
  )
  await page.getByRole("button", { name: "Switch to light mode" }).click()
  await expect(page.locator(".color-explorer__count")).toContainText("light values")
})

test("mobile browser keeps search above details without horizontal overflow or errors", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  const errors: string[] = []
  page.on("pageerror", (error) => errors.push(error.message))
  await tokens(page)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  )
  const inspector = await page.locator(".color-explorer__inspector").boundingBox()
  const content = await page.locator(".color-explorer__main").boundingBox()
  expect(inspector!.y + inspector!.height).toBeLessThanOrEqual(content!.y)
  expect(errors).toEqual([])
})
