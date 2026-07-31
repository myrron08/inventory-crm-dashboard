/**
 * Screenshots from live demo. Requires: npm install -D puppeteer
 * Run: node scripts/capture-screenshots.mjs
 * Optional: DEMO_URL=https://tt.tex-home.cc CHROME_PATH=/path/to/chrome
 */
import puppeteer from 'puppeteer';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE = process.env.DEMO_URL ?? 'https://tt.tex-home.cc';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '../docs/screenshots');

const browser = await puppeteer.launch({
  headless: true,
  executablePath:
    process.env.CHROME_PATH ??
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  args: ['--no-sandbox', '--disable-gpu'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await mkdir(OUT, { recursive: true });

const shot = async (name) => {
  await page.screenshot({ path: path.join(OUT, name) });
  console.log('saved', name);
};

await page.goto(BASE, { waitUntil: 'networkidle2', timeout: 60000 });
await page.waitForSelector('.order-card', { timeout: 30000 });
await shot('01-orders.png');

await page.goto(`${BASE}/products`, { waitUntil: 'networkidle2' });
await page.waitForSelector('.product-table', { timeout: 30000 });
await shot('02-products.png');

await page.goto(`${BASE}/orders`, { waitUntil: 'networkidle2' });
await page.click('.order-card');
await page.waitForSelector('.order-panel', { timeout: 10000 });
await new Promise((r) => setTimeout(r, 600));
await shot('03-order-panel.png');

await page.click('button[aria-label="Удалить приход"]');
await page.waitForSelector('.ui-modal__dialog', { timeout: 10000 });
await new Promise((r) => setTimeout(r, 400));
await shot('04-delete-modal.png');

await browser.close();
console.log('done');
