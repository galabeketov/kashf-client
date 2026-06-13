// Re-captures tall pages as scroll segments (instant scroll, fixed positions).
// Usage: node scripts/manual-shots2.mjs <outDir> <adminEmail> <adminPassword>
import { mkdirSync } from "node:fs";
import { chromium } from "playwright-core";

const [, , outDir, adminEmail, adminPassword] = process.argv;
mkdirSync(outDir, { recursive: true });

const CLIENT = "http://localhost:3000";
const ADMIN = "http://localhost:3001";

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 2,
});

const killAnimations = async () => {
  await page.addStyleTag({
    content: `
      html{scroll-behavior:auto!important}
      [data-aos]{opacity:1!important;transform:none!important;transition:none!important}
      *{animation:none!important;transition:none!important}
    `,
  });
};

const goto = async (url) => {
  await page.goto(url, { waitUntil: "networkidle", timeout: 45000 }).catch(() => {});
  await page.waitForTimeout(1500);
  await killAnimations();
};

const shotSegments = async (name, maxSegments = 6) => {
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  const step = 720;
  let captured = 0;
  for (let y = 0; y < total && captured < maxSegments; y += step) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
    await page.waitForTimeout(450);
    captured += 1;
    await page.screenshot({ path: `${outDir}/${name}-${captured}.png` });
    console.log("✓", `${name}-${captured}`, `(y=${y}/${total})`);
  }
};

// Client tall pages
await goto(`${CLIENT}/uz`);
await shotSegments("client-home-seg", 5);

const tourHrefPage = await page.goto(`${CLIENT}/uz/tours`, { waitUntil: "networkidle" }).catch(() => {});
await page.waitForTimeout(1200);
const tourHref = await page.evaluate(() => {
  const a = [...document.querySelectorAll('a[href*="/tours/"]')].find((x) =>
    /\/tours\/[^/]+$/.test(x.getAttribute("href")),
  );
  return a ? a.getAttribute("href") : null;
});
if (tourHref) {
  await goto(`${CLIENT}${tourHref}`);
  await shotSegments("client-tour-detail", 4);
}

await goto(`${CLIENT}/uz/rent-car`);
await shotSegments("client-rentcar", 3);

await goto(`${CLIENT}/uz/contact`);
await shotSegments("client-contact", 3);

// Admin login
await goto(`${ADMIN}/login`);
await page.fill('input[type="email"], input[name="email"]', adminEmail);
await page.fill('input[type="password"]', adminPassword);
await page.click('button[type="submit"]');
await page.waitForURL("**/dashboard**", { timeout: 30000 });
await page.waitForTimeout(2500);

const adminPages = [
  ["/dashboard/tours", "admin-tours", 2],
  ["/dashboard/tours/new", "admin-tour-new", 6],
  ["/dashboard/blog/new", "admin-blog-new", 5],
  ["/dashboard/analytics", "admin-analytics", 3],
];

for (const [path, name, segments] of adminPages) {
  await goto(`${ADMIN}${path}`);
  await shotSegments(name, segments);
}

await browser.close();
console.log("DONE");
