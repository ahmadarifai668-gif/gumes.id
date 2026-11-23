// Generate og-image.png (1200x630) dari tools/og.html.
// Jalankan: node tools/build-og.js  (butuh Playwright + Chromium)
const path = require("path");
const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.goto("file://" + path.join(__dirname, "og.html"));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(__dirname, "..", "og-image.png") });
  await browser.close();
})();
