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
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
});

test("mobile quick actions stay visible and carry page context", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en/tours");
  const actions = page.getByRole("navigation", { name: "Quick contact" });
  await expect(actions).toBeVisible();
  const whatsapp = actions.getByRole("link", { name: /WhatsApp/i });
  await expect(whatsapp).toHaveAttribute("href", /text=/);
  await expect(actions.getByRole("link", { name: "Tours" })).toBeVisible();
});

test("tour filters expose selected state", async ({ page }) => {
  await page.goto("/en/tours");
  const filter = page.getByRole("button", { name: "1–4 Days" });
  await filter.click();
  await expect(filter).toHaveAttribute("aria-pressed", "true");
});

for (const [locale, currencyLabel] of [
  ["en", "Currency Exchange"],
  ["uz", "Valyuta Almashtirish"],
  ["ru", "Обмен валюты"],
]) {
  test(`${locale} service hotkeys are localized`, async ({ page }) => {
    await page.goto(`/${locale}/currency`);
    await expect(
      page.getByRole("link", { name: currencyLabel }),
    ).toHaveAttribute("aria-current", "page");
  });
}

test("car selection is carried into the inquiry", async ({ page }) => {
  await page.goto("/en/rent-car");
  const card = page.locator(".travel-car-card").filter({
    hasText: "Chevrolet Tracker",
  });
  await card.getByRole("button", { name: "Select for request" }).click();
  await expect(page.locator(".travel-inquiry-context")).toContainText(
    "Chevrolet Tracker",
  );
});

test("currency selection is carried into the inquiry", async ({ page }) => {
  await page.goto("/en/currency");
  const amount = page.getByLabel("Amount");
  await amount.fill("1000");
  await expect(page.locator(".travel-inquiry-context")).toContainText(
    "USD → UZS",
  );
  await expect(page.locator(".travel-inquiry-context")).toContainText("1000");
});

test("tour detail renders useful content in initial HTML", async ({
  page,
  request,
}) => {
  const response = await request.get("/en/tours/4-days-uzbekistan-highlights");
  const html = await response.text();
  expect(html).toContain("4 Days Uzbekistan Highlights");
  expect(html).toContain("application/ld+json");

  await page.goto("/en/tours/4-days-uzbekistan-highlights");
  await expect(page.getByRole("heading", { name: "FAQ" })).toBeVisible();
});
