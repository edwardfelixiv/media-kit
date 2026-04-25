// Generates dist/media-kit.pdf by rendering /media-kit/print with headless Chromium.
// Run AFTER `astro build` — relies on the built `dist/` directory served via `astro preview`.

import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { setTimeout as wait } from "node:timers/promises";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const PORT = 4321;
const BASE = `http://localhost:${PORT}`;
const PRINT_URL = `${BASE}/media-kit/print`;
const OUTPUT_PATH = resolve("dist", "media-kit.pdf");

if (!existsSync(resolve("dist"))) {
  console.error("dist/ not found. Run `astro build` first.");
  process.exit(1);
}

console.log("Starting Astro preview server...");
const server = spawn("npx", ["astro", "preview", "--port", String(PORT)], {
  stdio: ["ignore", "pipe", "pipe"],
  shell: process.platform === "win32",
});

server.stdout.on("data", (chunk) => process.stdout.write(`[astro] ${chunk}`));
server.stderr.on("data", (chunk) => process.stderr.write(`[astro] ${chunk}`));

// Wait for the server to be reachable (poll up to 30s)
async function waitForServer() {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(BASE);
      if (res.ok) return true;
    } catch {}
    await wait(500);
  }
  return false;
}

const ready = await waitForServer();
if (!ready) {
  console.error("Astro preview never became ready.");
  server.kill();
  process.exit(1);
}

console.log("Launching Chromium...");
const browser = await chromium.launch();
const page = await browser.newPage();

console.log(`Navigating to ${PRINT_URL}...`);
await page.goto(PRINT_URL, { waitUntil: "networkidle" });

// Force-open all <details> for FAQ
await page.evaluate(() => {
  document.querySelectorAll("details").forEach((d) => (d.open = true));
});

console.log(`Rendering PDF → ${OUTPUT_PATH}`);
await page.pdf({
  path: OUTPUT_PATH,
  format: "Letter",
  margin: { top: "0.75in", right: "0.75in", bottom: "0.85in", left: "0.75in" },
  printBackground: true,
  displayHeaderFooter: true,
  headerTemplate: '<div></div>',
  footerTemplate: `
    <div style="font-size:9pt;color:#6B7280;width:100%;padding:0 0.75in;display:flex;justify-content:space-between;">
      <span>Escape Velocity AI · Media Kit</span>
      <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
    </div>
  `,
});

await browser.close();
server.kill();

console.log("Done.");
