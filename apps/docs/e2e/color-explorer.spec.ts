import { expect, test } from "@playwright/test"

const route = process.env.EXPLORER_DEV
  ? "/docs/foundations/colors"
  : "/docs/foundations/colors.html"
async function explore(page: import("@playwright/test").Page) {
  await page.goto(`${route}#explore`)
  await expect(page.getByRole("tab", { name: "Explore", exact: true })).toHaveAttribute(
    "data-state",
    "active",
  )
  await expect(page.locator("[data-color-preview]")).toBeVisible()
}

test("Colors has three keyboard-accessible views", async ({ page }) => {
  await page.goto(route)
  const overview = page.getByRole("tab", { name: "Overview", exact: true })
  await expect(overview).toBeVisible({ timeout: 7000 })
  await overview.focus()
  await page.keyboard.press("ArrowRight")
  await expect(page.getByRole("tab", { name: "Explore", exact: true })).toBeFocused()
  await page.getByRole("tab", { name: "Reference", exact: true }).click()
  await expect(
    page.getByRole("heading", { name: "Primitive neutral scale", exact: true }),
  ).toBeVisible()
})

test("semantic color trial propagates to real components, stays isolated, and resets", async ({
  page,
}) => {
  await explore(page)
  const preview = page.locator("[data-color-preview]")
  const button = preview.locator(".maxa-button--primary").first()
  const original = await button.evaluate((el) => getComputedStyle(el).backgroundColor)
  const root = await page.evaluate(() =>
    getComputedStyle(document.documentElement).getPropertyValue("--color-action-primary"),
  )
  const trial = page.getByRole("textbox", { name: "Trial color", exact: true })
  await trial.fill("#663399")
  await expect(button).toHaveCSS("background-color", "rgb(102, 51, 153)")
  expect(
    await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue("--color-action-primary"),
    ),
  ).toBe(root)
  await page.getByRole("button", { name: "Reset color", exact: true }).click()
  await expect(button).toHaveCSS("background-color", original)
  await page.getByRole("button", { name: "Dark preview", exact: true }).click()
  await expect(button).toHaveCSS("background-color", "rgb(5, 100, 185)")
  expect(
    await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue("--color-action-primary"),
    ),
  ).toBe(root)
})

test("primitive aliases propagate locally and search can recover from no results", async ({
  page,
}) => {
  await explore(page)
  const search = page.getByRole("textbox", { name: "Search color tokens", exact: true })
  await page.getByRole("combobox", { name: "Token layer" }).selectOption("primitive")
  await search.fill("--color-blue-500")
  await page.getByRole("button", { name: "Select --color-blue-500", exact: true }).first().click()
  await page.getByRole("textbox", { name: "Trial color", exact: true }).fill("#663399")
  await expect(page.locator("[data-color-preview] .maxa-button--primary").first()).toHaveCSS(
    "background-color",
    "rgb(102, 51, 153)",
  )
  await search.fill("this-token-does-not-exist")
  await expect(page.getByText(/No matching tokens/)).toBeVisible()
  await page.getByRole("combobox", { name: "Token layer" }).selectOption("semantic")
  await search.fill("--color-action-primary")
  await expect(
    page.getByRole("button", { name: "Select --color-action-primary", exact: true }).first(),
  ).toBeVisible()
})

test("mobile layout stays within viewport and does not produce browser errors", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  const errors: string[] = []
  page.on("pageerror", (error) => errors.push(error.message))
  await explore(page)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  )
  await expect(
    page.getByRole("textbox", { name: "Search color tokens", exact: true }),
  ).toBeVisible()
  expect(errors).toEqual([])
})

test("component inspection reveals the recipe and incomplete colors preserve the last valid preview", async ({
  page,
}) => {
  await explore(page)
  await page.getByRole("button", { name: "Inspect Input border", exact: true }).click()
  await expect(page.locator("[data-selected-token]")).toHaveText("--input-border")
  await expect(
    page.getByRole("button", { name: "Select --input-border", exact: true }),
  ).toHaveAttribute("aria-pressed", "true")
  const input = page.locator("[data-color-preview] .maxa-input__field")
  const trial = page.getByRole("textbox", { name: "Trial color", exact: true })
  await trial.fill("#663399")
  await expect(input).toHaveCSS("border-top-color", "rgb(102, 51, 153)")
  await trial.fill("")
  await expect(trial).toHaveValue("")
  await expect(trial).toHaveAttribute("aria-invalid", "true")
  await expect(input).toHaveCSS("border-top-color", "rgb(102, 51, 153)")
  await page.getByRole("button", { name: "Inspect Button background", exact: true }).click()
  await expect(page.locator("[data-color-preview] .maxa-button--primary").first()).toHaveCSS(
    "background-color",
    "rgb(5, 118, 218)",
  )
  await expect(trial).toHaveValue("#0576da")
  await page.getByRole("button", { name: "Follow --color-action-primary", exact: true }).click()
  await expect(page.locator("[data-selected-token]")).toHaveText("--color-action-primary")
})

test("Alert title inspection identifies and recolors the real heading", async ({ page }) => {
  await explore(page)
  await page.getByRole("button", { name: "Inspect Alert title", exact: true }).click()
  await expect(page.locator("[data-selected-token]")).toHaveText("--alert-success-title")
  await page.getByRole("textbox", { name: "Trial color", exact: true }).fill("#663399")
  const demo = page
    .locator(".color-explorer__demo")
    .filter({ has: page.getByRole("button", { name: "Inspect Alert title", exact: true }) })
  await expect(demo).toHaveAttribute("data-affected", "true")
  await expect(demo.getByText("Changes saved", { exact: true })).toHaveCSS(
    "color",
    "rgb(102, 51, 153)",
  )
})
