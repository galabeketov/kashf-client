// Captures screenshots of the client site and admin panel for the user manual.
// Usage: node scripts/manual-shots.mjs <outDir> <adminEmail> <adminPassword>
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

const shot = async (name) => {
  await page.screenshot({ path: `${outDir}/${name}.png` });
  console.log("✓", name);
};

// Capture a tall page as sequential viewport segments
const shotSegments = async (name, maxSegments = 5) => {
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  for (let i = 0; i < maxSegments; i++) {
    await page.screenshot({ path: `${outDir}/${name}-${i + 1}.png` });
    console.log("✓", `${name}-${i + 1}`);
    const atBottom = await page.evaluate(() => {
      const before = window.scrollY;
      window.scrollBy(0, 720);
      return window.scrollY === before;
    });
    await page.waitForTimeout(500);
    if (atBottom) break;
  }
};

// ── Client (uz locale) ──────────────────────────────
await goto(`${CLIENT}/uz`);
await shot("client-home");
await shotSegments("client-home-seg", 3);

await goto(`${CLIENT}/uz/tours`);
await shot("client-tours");

const tourHref = await page.evaluate(() => {
  const a = [...document.querySelectorAll('a[href*="/tours/"]')].find((x) =>
    /\/tours\/[^/]+$/.test(x.getAttribute("href")),
  );
  return a ? a.getAttribute("href") : null;
});
if (tourHref) {
  await goto(`${CLIENT}${tourHref}`);
  await shotSegments("client-tour-detail", 3);
}

await goto(`${CLIENT}/uz/services`);
await shot("client-services");

await goto(`${CLIENT}/uz/rent-car`);
await shotSegments("client-rentcar", 2);

await goto(`${CLIENT}/uz/contact`);
await shotSegments("client-contact", 2);

await goto(`${CLIENT}/uz/blog`);
await shot("client-blog");

// ── Admin ───────────────────────────────────────────
await goto(`${ADMIN}/login`);
await shot("admin-login");

await page.fill('input[type="email"], input[name="email"]', adminEmail);
await page.fill('input[type="password"]', adminPassword);
await page.click('button[type="submit"]');
await page.waitForURL("**/dashboard**", { timeout: 30000 });
await page.waitForTimeout(2500);
await killAnimations();
await shot("admin-dashboard");

const adminPages = [
  ["/dashboard/tours", "admin-tours", 2],
  ["/dashboard/tours/new", "admin-tour-new", 5],
  ["/dashboard/blog", "admin-blog", 1],
  ["/dashboard/blog/new", "admin-blog-new", 4],
  ["/dashboard/inquiries", "admin-inquiries", 1],
  ["/dashboard/reviews", "admin-reviews", 1],
  ["/dashboard/analytics", "admin-analytics", 2],
  ["/dashboard/profile", "admin-profile", 1],
];

for (const [path, name, segments] of adminPages) {
  await goto(`${ADMIN}${path}`);
  if (segments > 1) {
    await shotSegments(name, segments);
  } else {
    await shot(name);
  }
}

await browser.close();
console.log("DONE");
