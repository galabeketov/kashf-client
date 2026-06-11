const { test, expect } = require("@playwright/test");

test("localized home and tour cards render", async ({ page }) => {
  await page.goto("/en");
  await expect(
    page.getByRole("heading", { level: 1, name: "Travel Easy in Uzbekistan" }),
  ).toBeVisible();
  await page.goto("/en/tours");
  await expect(page.getByRole("heading", { level: 1, name: "Our Tours" })).toBeVisible();
  await expect(page.locator(".travel-tour-card").first()).toBeVisible();
});

test("mobile drawer opens without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en");
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  expect(overflow).toBe(false);
});

test("tour filters expose selected state", async ({ page }) => {
  await page.goto("/en/tours");
  const filter = page.getByRole("button", { name: "1–4 Days" });
  await filter.click();
  await expect(filter).toHaveAttribute("aria-pressed", "true");
});
