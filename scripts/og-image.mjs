// Renders public/og-image.png (1200x630): name and title as text, in the site's light theme.
// Run with `pnpm og` after changing the name or title in src/content.ts.
import { chromium } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = new URL('..', import.meta.url);
// Inlined as data URLs: pages loaded with setContent can't fetch file:// fonts.
const fontUrl = async (pkg, file) => {
  const data = await readFile(
    new URL(`node_modules/@fontsource-variable/${pkg}/files/${file}`, root),
  );
  return `data:font/woff2;base64,${data.toString('base64')}`;
};
const displayFont = await fontUrl(
  'bricolage-grotesque',
  'bricolage-grotesque-latin-wght-normal.woff2',
);
const bodyFont = await fontUrl('instrument-sans', 'instrument-sans-latin-wght-normal.woff2');

const content = await readFile(new URL('src/content.ts', root), 'utf8');
const pick = (key) => content.match(new RegExp(`${key}: '([^']+)'`))?.[1];
const name = pick('name');
const title = pick('title');
const location = pick('location');
if (!name || !title) throw new Error('Could not read name/title from src/content.ts');

const html = `<!doctype html>
<html><head><style>
  @font-face { font-family: Display; font-weight: 200 800; src: url(${displayFont}); }
  @font-face { font-family: Body; font-weight: 400 700; src: url(${bodyFont}); }
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; background: oklch(97.2% 0.003 128.5); color: oklch(21.2% 0.009 255.6);
    font-family: Body; padding: 88px 96px; display: flex; flex-direction: column; justify-content: space-between; }
  .rule { width: 72px; height: 4px; background: oklch(46.6% 0.172 263.7); }
  h1 { font-family: Display; font-weight: 700; font-size: 124px; line-height: 0.95; letter-spacing: -0.045em; }
  p { margin-top: 28px; font-size: 38px; font-weight: 500; letter-spacing: -0.01em; }
  small { font-size: 26px; color: oklch(48.9% 0.018 251.3); }
</style></head>
<body>
  <div class="rule"></div>
  <div><h1>${name}</h1><p>${title}</p></div>
  <small>${location ?? ''}</small>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
const out = fileURLToPath(new URL('public/og-image.png', root));
await page.screenshot({ path: out });
await browser.close();
console.log(`Wrote ${out}`);
