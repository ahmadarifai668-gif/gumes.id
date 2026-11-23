// Render tampilan hasil export (PDF & Excel) di ukuran HP, tablet, laptop -> assets/export/*.webp
// Jalankan dari root repo: python3 -m http.server 8090 & ; node tools/build-export.js
// Butuh Playwright + Python Pillow (untuk konversi ke webp).
const path = require("path");
const { execFileSync } = require("child_process");
const { chromium } = require("playwright");

const BASE = "http://localhost:8090/tools/export/";
const OUT = path.join(__dirname, "..", "assets", "export");
const DEVICES = [
  { id: "hp", w: 390, h: 844, dpr: 2 },        // 780x1688, sama dengan screenshot HP
  { id: "tab", w: 820, h: 1180, dpr: 1.5 },    // tablet portrait
  { id: "laptop", w: 1440, h: 900, dpr: 1.5 }, // 2160x1350, sama dengan screenshot desktop
];

(async () => {
  require("fs").mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  for (const kind of ["pdf", "xlsx"]) {
    for (const d of DEVICES) {
      const page = await browser.newPage({ viewport: { width: d.w, height: d.h }, deviceScaleFactor: d.dpr });
      await page.goto(BASE + kind + ".html");
      if (kind === "xlsx") await page.waitForSelector("body[data-ready]");
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(300);
      const png = path.join(OUT, `${kind}-${d.id}.png`);
      await page.screenshot({ path: png });
      await page.close();
    }
  }
  await browser.close();
  execFileSync("python3", ["-c", `
import glob, os
from PIL import Image
for f in glob.glob(os.path.join(${JSON.stringify(OUT)}, '*.png')):
    im = Image.open(f).convert('RGB')
    base = f[:-4]
    im.save(base + '.webp', quality=82, method=6)
    w = {'hp': 480, 'tab': 820, 'laptop': 1080}[base.rsplit('-', 1)[1]]
    im.resize((w, round(im.height * w / im.width)), Image.LANCZOS).save(base + '-' + str(w) + '.webp', quality=80, method=6)
    os.remove(f)
`]);
  console.log("ok");
})();
