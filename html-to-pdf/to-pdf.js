const puppeteer = require('puppeteer-core');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

const url = process.argv[2] || 'http://localhost:8766';
const output = process.argv[3] || 'output.pdf';
const DPI = parseInt(process.env.PDF_DPI || '2', 10);

function findChrome() {
  const candidates = [
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/opt/homebrew/bin/chromium',
  ];
  const found = candidates.find(p => fs.existsSync(p));
  if (!found) {
    console.error('Chrome/Chromium not found. Searched:', candidates.join(', '));
    process.exit(1);
  }
  return found;
}

(async () => {
  const startTime = Date.now();
  const chrome = findChrome();
  console.log(`Chrome: ${chrome}`);

  const browser = await puppeteer.launch({
    executablePath: chrome,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none'],
    headless: 'new',
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: DPI });

  console.log(`Loading: ${url}`);
  try {
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
  } catch (err) {
    console.error(`Failed to load ${url}:`, err.message);
    console.error('Is the local HTTP server running? Try: npx -y serve -l 8766 .');
    await browser.close();
    process.exit(1);
  }

  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 2000));

  await page.evaluate(() => {
    document.querySelectorAll('.nav-dots, .progress-bar, [class*="nav"]')
      .forEach(el => { if (el.tagName !== 'SECTION') el.style.display = 'none'; });

    document.querySelectorAll('.slide, section[data-slide]')
      .forEach(s => s.classList.add('visible'));

    const style = document.createElement('style');
    style.textContent = `
      html { scroll-snap-type: none !important; scroll-behavior: auto !important; }
      .slide, section[data-slide] { scroll-snap-align: unset !important; }

      .reveal, .reveal-left, .reveal-scale, .reveal-blur,
      [class*="reveal"] {
        opacity: 1 !important; transform: none !important;
        filter: none !important; transition: none !important;
      }

      .bar-value { width: var(--w) !important; transition: none !important; }
      .range-bar, [class*="bar"] { opacity: 1 !important; transition: none !important; }
      [class*="gap-bar"] { opacity: 0.85 !important; animation: none !important; }
    `;
    document.head.appendChild(style);
  });
  await new Promise(r => setTimeout(r, 1000));

  const slides = await page.$$('.slide, section[data-slide]');
  const slideCount = slides.length;

  if (slideCount === 0) {
    console.error('No slides found. Check that your HTML uses .slide or section[data-slide] elements.');
    await browser.close();
    process.exit(1);
  }

  console.log(`Found ${slideCount} slides, DPI=${DPI}x (${1920 * DPI}×${1080 * DPI}px)`);

  const pdfDoc = await PDFDocument.create();
  const title = await page.title();
  if (title) pdfDoc.setTitle(title);

  for (let i = 0; i < slideCount; i++) {
    await page.evaluate(idx => {
      document.querySelectorAll('.slide, section[data-slide]')[idx]
        .scrollIntoView({ behavior: 'instant' });
    }, i);
    await new Promise(r => setTimeout(r, 600));

    const pngBuf = await page.screenshot({ type: 'png' });
    const img = await pdfDoc.embedPng(pngBuf);
    const p = pdfDoc.addPage([1920, 1080]);
    p.drawImage(img, { x: 0, y: 0, width: 1920, height: 1080 });
    console.log(`  Slide ${i + 1}/${slideCount} ✓`);
  }

  const pdfBytes = await pdfDoc.save();
  const outputDir = path.dirname(output);
  if (outputDir && !fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  fs.writeFileSync(output, pdfBytes);

  const sizeMB = (pdfBytes.length / 1024 / 1024).toFixed(1);
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\nPDF saved: ${output}`);
  console.log(`  ${slideCount} pages, ${sizeMB} MB, ${elapsed}s`);

  await browser.close();
})();
