---
name: html-to-pdf
description: 将 HTML 演示文稿（scroll-snap slides）导出为高清 PDF。逐页截图合成，保留动画最终态。当用户说「导出 PDF」「转 PDF」「生成 PDF」「打印」或需要将 HTML slides 分享为静态文件时使用。
---

# HTML Slides → PDF

将基于 scroll-snap 的 HTML 演示文稿导出为高清多页 PDF。

## 原理

浏览器的 `page.pdf()` 无法正确分页 scroll-snap 布局。本方案用 Puppeteer 逐页滚动截图（高 DPI），再用 pdf-lib 合成多页 PDF。

## 依赖

```bash
npm install puppeteer-core pdf-lib
```

系统需要 Chrome/Chromium（`/usr/bin/google-chrome` 或 `/usr/bin/chromium-browser`）。

## 使用流程

### 1. 确保 HTML 通过本地 HTTP 服务可访问

```bash
npx -y serve -l 8766 .
```

不要用 `file://`，Puppeteer 对本地文件有安全限制。

### 2. 在 HTML 目录下创建并运行导出脚本

在 HTML 所在目录执行 `scripts/to-pdf.js`（见下方），传入两个参数：

```bash
node to-pdf.js <URL> <OUTPUT_PATH>
```

示例：

```bash
node to-pdf.js http://localhost:8766/my-slides ./output.pdf
```

### 3. 脚本模板

创建 `to-pdf.js`：

```javascript
const puppeteer = require('puppeteer-core');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

const url = process.argv[2] || 'http://localhost:8766';
const output = process.argv[3] || 'output.pdf';
const DPI = parseInt(process.env.PDF_DPI || '2', 10); // 1=标清, 2=2K/Retina, 3=4K

(async () => {
  const chrome = ['/usr/bin/google-chrome', '/usr/bin/chromium-browser', '/usr/bin/chromium']
    .find(p => fs.existsSync(p));
  if (!chrome) { console.error('Chrome not found'); process.exit(1); }

  const browser = await puppeteer.launch({
    executablePath: chrome,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: 'new',
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: DPI });
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));

  // 隐藏导航 UI，强制所有动画完成态
  await page.evaluate(() => {
    document.querySelectorAll('.nav-dots, .progress-bar, [class*="nav"]')
      .forEach(el => { if (el.tagName !== 'SECTION') el.style.display = 'none'; });
    document.querySelectorAll('.slide, section').forEach(s => s.classList.add('visible'));
    const style = document.createElement('style');
    style.textContent = `
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
  console.log(`Found ${slideCount} slides, DPI=${DPI}x`);

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
    console.log(`  Slide ${i + 1}/${slideCount}`);
  }

  fs.writeFileSync(output, await pdfDoc.save());
  console.log(`PDF saved: ${output} (${slideCount} pages)`);
  await browser.close();
})();
```

## 参数说明

| 参数 | 说明 |
|------|------|
| `deviceScaleFactor` | 渲染倍率。`1`=标清(1920×1080), `2`=2K/Retina(3840×2160), `3`=接近4K |
| `PDF_DPI` 环境变量 | 同上，可通过 `PDF_DPI=3 node to-pdf.js ...` 设置 |
| viewport `width/height` | PDF 页面尺寸（点），16:9 用 1920×1080 |

## 注意事项

- HTML 必须通过 HTTP 服务，不能用 `file://`
- 每页截图会包含当前视口内容，确保每个 slide 是 `100vh`
- 字体需联网加载（Google Fonts 等），离线环境需提前缓存
- 生成时间约 1-2 秒/页，12 页约 20 秒
