---
name: frontend-slides
description: 生成零依赖、动画丰富的 HTML 演示文稿。支持从零创建、Markdown 文件转换、PPT 转换。当用户说「做 slides」「做演示」「做汇报」「PPT 转 web」「把文档做成演示」「产品展示」时使用。
---

# Frontend Slides

生成零依赖、自包含的 HTML 演示文稿，在浏览器中直接运行。默认中文排版优化，支持中英混排。

## 核心原则

1. **零依赖** — 单个 HTML 文件，内联 CSS/JS，无构建工具
2. **Show, Don't Tell** — 生成视觉预览让用户挑选，而非让用户描述偏好
3. **反 AI 审美** — 避免千篇一律的紫色渐变、Inter 字体、居中卡片布局
4. **Viewport Fitting（强制）** — 每页 slide 必须恰好填满视口，禁止滚动
5. **中文优先** — 默认 `lang="zh-CN"`，中文字体 + 排版规范

---

## 强制：Viewport Fitting

每页 slide 必须完全可见，无需滚动。

### 每页内容密度上限

| Slide 类型 | 最大内容（中文） |
|-----------|------------|
| 标题页 | 1 标题 + 1 副标题 + 可选标语 |
| 内容页 | 1 标题 + 3-5 条要点（每条最多 2 行，18-25 字/行） |
| 特性网格 | 1 标题 + 最多 6 张卡片（2x3 或 3x2） |
| 代码页 | 1 标题 + 最多 8-10 行代码 |
| 引用页 | 1 段引用（最多 3 行）+ 出处 |
| 图片页 | 1 标题 + 1 张图片（max-height: 60vh） |
| 数据卡片页 | 1 标题 + 最多 4 个大数字卡片 |
| 对比展示页 | 1 标题 + 左右两列对比 |
| 产品大图页 | 1 张全屏产品图 + 底部标题 |
| 规格参数页 | 左侧图片 + 右侧最多 6 行参数 |
| 流程展示页 | 1 标题 + 最多 4 个步骤节点 |

**内容超出上限 → 拆分成多页，禁止缩小字号或允许滚动。**

### 强制基础 CSS

每个演示文稿必须包含以下基础样式：

```css
html, body {
    height: 100%;
    overflow-x: hidden;
}

html {
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
}

.slide {
    width: 100vw;
    height: 100vh;
    height: 100dvh;
    overflow: hidden;
    scroll-snap-align: start;
    display: flex;
    flex-direction: column;
    position: relative;
}

.slide-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: min(100%, 1200px);
    padding: var(--slide-padding);
}

/* 默认：笔记本屏幕 / 一般显示器 */
:root {
    --title-size: clamp(1.5rem, 5vw, 4rem);
    --h2-size: clamp(1.25rem, 3.5vw, 2.5rem);
    --h3-size: clamp(1rem, 2.5vw, 1.75rem);
    --body-size: clamp(0.75rem, 1.5vw, 1.125rem);
    --small-size: clamp(0.65rem, 1vw, 0.875rem);
    --slide-padding: clamp(1rem, 4vw, 4rem);
    --content-gap: clamp(0.5rem, 2vw, 2rem);
    --element-gap: clamp(0.25rem, 1vw, 1rem);
}

/* 投屏模式：大屏幕投影仪 / 会议室电视 — 在 <html> 加 class="projection" 启用 */
.projection:root {
    --title-size: clamp(2.8rem, 6.5vw, 5rem);
    --h2-size: clamp(1.8rem, 4.2vw, 3rem);
    --h3-size: clamp(1.3rem, 2.8vw, 1.9rem);
    --body-size: clamp(1.05rem, 1.8vw, 1.35rem);
    --small-size: clamp(0.88rem, 1.3vw, 1.1rem);
    --slide-padding: clamp(2.5rem, 6vw, 6rem);
    --content-gap: clamp(1.2rem, 3vw, 2.5rem);
    --element-gap: clamp(0.3rem, 1vw, 0.8rem);
}

.card, .container, .content-box {
    max-width: min(90vw, 1000px);
    max-height: min(80vh, 700px);
}

img, .image-container {
    max-width: 100%;
    max-height: min(50vh, 400px);
    object-fit: contain;
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr));
    gap: clamp(0.5rem, 1.5vw, 1rem);
}

@media (max-height: 700px) {
    :root {
        --slide-padding: clamp(0.75rem, 3vw, 2rem);
        --content-gap: clamp(0.4rem, 1.5vw, 1rem);
        --title-size: clamp(1.25rem, 4.5vw, 2.5rem);
        --h2-size: clamp(1rem, 3vw, 1.75rem);
    }
}

@media (max-height: 600px) {
    :root {
        --slide-padding: clamp(0.5rem, 2.5vw, 1.5rem);
        --content-gap: clamp(0.3rem, 1vw, 0.75rem);
        --title-size: clamp(1.1rem, 4vw, 2rem);
        --body-size: clamp(0.7rem, 1.2vw, 0.95rem);
    }
    .nav-dots, .keyboard-hint, .decorative { display: none; }
}

@media (max-height: 500px) {
    :root {
        --slide-padding: clamp(0.4rem, 2vw, 1rem);
        --title-size: clamp(1rem, 3.5vw, 1.5rem);
        --h2-size: clamp(0.9rem, 2.5vw, 1.25rem);
        --body-size: clamp(0.65rem, 1vw, 0.85rem);
    }
}

@media (max-width: 600px) {
    :root { --title-size: clamp(1.25rem, 7vw, 2.5rem); }
    .grid { grid-template-columns: 1fr; }
}

@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.2s !important;
    }
    html { scroll-behavior: auto; }
}
```

### CSS 注意事项

不能直接取反 CSS 函数：`-clamp()` / `-min()` / `-max()` 会被浏览器静默忽略。必须用 `calc(-1 * clamp(...))` 包裹。

### 投屏场景注意事项

当演示文稿用于投影仪或大屏幕时：

1. **在 `<html>` 标签添加 `class="projection"`** — 自动切换到更大的 clamp 参数集
2. **加深辅助文字颜色** — 浅色主题中 `--text-secondary` 不应浅于 `#3d3835`，`--text-muted` 不应浅于 `#6b6560`，否则投影后难以阅读
3. **避免 `max-height: 100%; overflow: hidden` 在 `.slide-content` 上** — 内容增多后极易导致顶部或底部被裁切（如标签、标题被遮挡），如确有溢出问题应通过拆页解决
4. **`max-width` 限制** — `.slide-content` 建议加 `max-width: min(100%, 1200px)` 防止大屏幕上内容拉得太宽难以阅读

---

## 中文排版规范

所有演示文稿默认遵守以下排版规则：

### HTML 模板默认值

```html
<html lang="zh-CN">
```

### 字体加载

中文字体通过 Google Fonts 加载。每种风格预设都定义了对应的中文字体对，格式为：

```css
--font-display: 'Noto Sans SC', sans-serif;       /* 中文标题 */
--font-body: 'Noto Sans SC', sans-serif;           /* 中文正文 */
--font-display-en: 'Clash Display', sans-serif;    /* 英文/数字标题 */
--font-body-en: 'Satoshi', sans-serif;             /* 英文/数字正文 */
```

在 CSS 中使用 `font-family` 时，英文字体写在中文字体前面（浏览器会对每个字符 fallback）：

```css
h1 { font-family: var(--font-display-en), var(--font-display); }
body { font-family: var(--font-body-en), var(--font-body); }
```

### 排版参数

```css
:root {
    --line-height-zh: 1.8;    /* 中文行高（英文用 1.5） */
    --letter-spacing-zh: 0.02em;
}

body {
    line-height: var(--line-height-zh);
    letter-spacing: var(--letter-spacing-zh);
    font-feature-settings: "halt";  /* CJK 标点挤压 */
    text-align: justify;
    word-break: break-all;
    overflow-wrap: break-word;
}

/* 标题不两端对齐 */
h1, h2, h3, h4, h5, h6 {
    text-align: left;
    letter-spacing: 0.04em;
    line-height: 1.4;
}
```

### 中英混排

在生成内容时，中文和英文/数字之间自动加半角空格（pangu spacing）。模板中可加 JS 自动处理：

```javascript
function addPanguSpacing(text) {
    return text
        .replace(/([\u4e00-\u9fa5])([A-Za-z0-9])/g, '$1 $2')
        .replace(/([A-Za-z0-9])([\u4e00-\u9fa5])/g, '$1 $2');
}
```

---

## 通用组件

以下组件在实际项目中高频使用，可直接复用。

### 页码标识

右上角显示当前页码，用斜体衬线字体增加编辑感。

```html
<span class="slide-number">02</span>
```

```css
.slide-number {
    position: absolute;
    top: clamp(1.2rem, 3vw, 2.2rem);
    right: clamp(1.8rem, 5vw, 4rem);
    font-family: var(--font-display-en);
    font-size: clamp(0.85rem, 1.4vw, 1.1rem);
    color: var(--text-muted);
    font-weight: 400;
    font-style: italic;
}
```

### 分类标签

slide 顶部的分类标签（如"发现一""核心洞察"），用小型大写字母风格。

```html
<div class="tag">发现一</div>
```

```css
.tag {
    display: inline-block;
    font-size: var(--body-size);
    color: var(--accent);
    text-transform: uppercase;
    letter-spacing: 0.2em;
    font-weight: 600;
    margin-bottom: clamp(0.5rem, 1.5vw, 1rem);
    font-family: var(--font-body-en), var(--font-body);
}
```

### CSS 横向条形图

适合品类密度、市场占比等数据展示。纯 CSS 实现，无 JS 依赖，动画由 `.visible` class 触发。

```html
<div class="css-bar-chart">
    <div class="bar-row reveal">
        <div class="bar-label">
            <span class="bar-cat">酸奶 / 奶昔</span>
            <span class="bar-brands">品牌 A · 品牌 B · 品牌 C…</span>
        </div>
        <div class="bar-track">
            <div class="bar-value" style="--w:100%;--delay:0.1s"></div>
        </div>
        <span class="bar-num">7+</span>
    </div>
    <!-- 更多行... -->
</div>
```

```css
.css-bar-chart { display: flex; flex-direction: column; gap: clamp(0.5rem,1.2vw,1rem); }
.bar-row {
    display: grid;
    grid-template-columns: minmax(120px, 30%) 1fr auto;
    align-items: center;
    gap: clamp(0.5rem, 1.5vw, 1.2rem);
}
.bar-cat { font-weight: 700; font-size: var(--body-size); display: block; }
.bar-brands { font-size: var(--small-size); color: var(--text-muted); display: block; }
.bar-track {
    height: clamp(0.6rem, 1.2vw, 0.9rem);
    background: var(--border-light, #eae6e0);
    border-radius: 99px;
    overflow: hidden;
}
.bar-value {
    height: 100%; width: 0;
    background: var(--accent);
    border-radius: 99px;
    transition: width 1s var(--ease-out-expo);
    transition-delay: var(--delay, 0s);
}
.slide.visible .bar-value { width: var(--w); }
.bar-num {
    font-family: var(--font-display-en);
    font-weight: 700;
    font-size: var(--h3-size);
    color: var(--text-secondary);
    min-width: 2.5em;
    text-align: right;
}
```

### CSS 价格/区间对比图

适合价格带分析、时间段对比等场景。

```html
<div class="price-range-chart">
    <div class="range-row reveal">
        <span class="range-brand">品牌 A</span>
        <div class="range-bar-wrap">
            <div class="range-bar" style="left:10%;width:30%"></div>
        </div>
        <span class="range-price">¥15-28</span>
    </div>
    <div class="range-row reveal" style="background:rgba(200,146,46,0.1)">
        <span class="range-brand" style="color:#c8922e;font-weight:700">空白机会</span>
        <div class="range-bar-wrap">
            <div class="range-bar gap-bar" style="left:25%;width:20%"></div>
        </div>
        <span class="range-price highlight">¥20-35</span>
    </div>
</div>
```

```css
.price-range-chart { margin-top: var(--content-gap); }
.range-row {
    display: grid;
    grid-template-columns: minmax(80px, 18%) 1fr auto;
    align-items: center;
    gap: clamp(0.5rem, 1.5vw, 1.2rem);
    padding: clamp(0.4rem, 0.8vw, 0.7rem) clamp(0.8rem, 1.5vw, 1.2rem);
    border-bottom: 1px solid var(--border-light, #eae6e0);
}
.range-brand { font-size: var(--body-size); color: var(--text-secondary); font-weight: 500; }
.range-bar-wrap {
    position: relative; height: clamp(0.5rem, 1vw, 0.7rem);
    background: #cdc8c0; border-radius: 99px;
}
.range-bar {
    position: absolute; top: 0; height: 100%;
    background: var(--accent); border-radius: 99px;
    opacity: 0; transition: opacity 0.6s ease;
}
.range-bar.gap-bar {
    background: #c8922e;
    animation: pulse-bar 2s ease-in-out infinite;
}
@keyframes pulse-bar { 0%,100% { opacity: 0.7; } 50% { opacity: 1; } }
.slide.visible .range-bar { opacity: 1; }
.range-price { font-family: var(--font-display-en); font-size: var(--body-size); min-width: 5em; text-align: right; }
.range-price.highlight { color: #c8922e; font-weight: 700; }
```

### 数据卡片网格

适合展示 3-4 个关键数字指标。

```html
<div class="data-cards">
    <div class="data-card reveal">
        <div class="number">17</div>
        <div class="label">走访门店</div>
    </div>
    <!-- 更多卡片... -->
</div>
```

```css
.data-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 180px), 1fr));
    gap: var(--content-gap);
}
.data-card {
    background: var(--bg-card, #fff);
    border: 1px solid var(--border, #e0dbd4);
    padding: clamp(1rem, 2.5vw, 2rem);
    text-align: center;
    display: flex; flex-direction: column;
    justify-content: center; align-items: center;
}
.data-card .number {
    font-family: var(--font-display-en);
    font-size: var(--big-number, clamp(2.5rem, 7vw, 4.5rem));
    font-weight: 700;
    line-height: 1;
    color: var(--accent);
}
.data-card .label {
    font-size: var(--body-size);
    color: var(--text-secondary);
    margin-top: var(--element-gap);
}
```

### 态度型结尾页

替代传统的"谢谢观看"，用一句有态度的话收尾。注意多行文本不要用 `<br>` 控制换行（在不同视口尺寸下 `<br>` 表现不一致），用 `<span style="display:block">` 强制每行独立。

```html
<section class="slide end-slide">
    <div class="slide-content">
        <div class="end-rule reveal"></div>
        <h2 class="reveal-blur">
            <span style="display:block">不是从零开始。</span>
            <span style="display:block">是在已有的网络和经验上，</span>
            <span style="display:block">做一次真正的升级。</span>
        </h2>
    </div>
</section>
```

```css
.end-slide {
    background: var(--bg-primary);
    justify-content: center;
}
.end-slide .slide-content {
    max-width: min(90%, 900px);
    text-align: center;
}
.end-rule {
    width: clamp(2rem, 5vw, 4rem);
    height: 2px;
    background: var(--accent);
    margin: 0 auto clamp(1.5rem, 4vw, 3rem);
}
.end-slide h2 {
    font-size: var(--h2-size);
    font-weight: 600;
    line-height: 1.6;
    color: var(--text-secondary);
}
```

---

## 图标规范

**禁止使用 Emoji 图标**。Emoji（🎯🔥📊 等）在专业演示中显得幼稚和廉价，无论什么主题都不要用。

**替代方案**：使用内联 SVG 图标。好处是可以自定义颜色、大小，且不依赖外部文件。

```html
<!-- ✗ 不要这样 -->
<span>🔥 热门品类</span>

<!-- ✓ 用 inline SVG -->
<span class="icon-hot">
    <svg viewBox="0 0 16 16" width="1em" height="1em" fill="currentColor">
        <path d="M8 16c3.314 0 6-2.686 6-6 0-1.5-.5-3.5-2-5-.643-.543-1-1.5-1.5-3-.5 1.5-1 2-2.5 3C6.5 6.5 6 8 6 9c0 .5-.5 1-1 1s-1-.5-1-1c0-1 .5-2 1-3-1.5 1-3 3.5-3 5.5C2 13.314 4.686 16 8 16z"/>
    </svg>
    热门品类
</span>
```

对于简洁的分隔或装饰，也用 SVG 线条代替 em dash `—` 或其他 Unicode 装饰符。

---

## Phase 0：检测模式

判断用户意图：

| 模式 | 触发条件 | 下一步 |
|-----|---------|-------|
| A：新建演示 | 从零创建 slides | → Phase 1（内容梳理） |
| B：PPT 转换 | 有 .ppt/.pptx 文件 | → Phase 4（PPT 提取） |
| C：增强现有 | 有现成 HTML 演示要改进 | → 读取文件后增强，遵循版本管理 |
| D：Markdown 转换 | 有 .md 文件要转成演示 | → Phase 5（Markdown 提取） |
| E：替换图片 | 「图片准备好了」「替换图片」 | → 扫描 images/ 文件夹，替换占位符 |
| F：回滚版本 | 「回到 v2」「用上一版」 | → 从 versions/ 复制对应版本 |
| G：修改迭代 | 「改一下第 3 页」「更新数据」 | → 先备份当前版本，再修改 |

---

## Phase 1：内容梳理（新建演示）

通过提问了解内容：

**问题 1：用途**
- 选项：「路演/Pitch」「教学/教程」「会议演讲」「内部汇报」「产品展示」「数据汇报」

**问题 1.5：展示方式**
- 选项：「笔记本屏幕 / 桌面显示器」「投影仪 / 会议室大屏」「线上会议共享屏幕」
- 如果是投影仪/大屏 → 在 `<html>` 加 `class="projection"` 启用大字号参数集，并加深辅助文字颜色

**问题 2：页数**
- 选项：「短（5-10 页）」「中等（10-20 页）」「长（20+ 页）」

**问题 3：内容状态**
- 选项：「内容已准备好」「有粗略笔记」「只有主题」

如果用户有内容，让他分享。

---

## Phase 2：风格选择

### 选择路径

先问用户如何选择风格：

**选项 A：引导发现（推荐）**
- 用户回答氛围问题
- 生成 3 个预览 HTML
- 用户在浏览器中对比后选择

**选项 B：直接选择**
- 用户从预设列表中直接选择

### 风格预设一览

| 预设 | 氛围 | 适合 |
|-----|-----|-----|
| Bold Signal | 自信、高冲击力 | 路演、主旨演讲 |
| Electric Studio | 干净、专业 | 机构展示 |
| Creative Voltage | 有活力、复古现代 | 创意提案 |
| Dark Botanical | 优雅、精致 | 高端品牌 |
| Notebook Tabs | 编辑风、有序 | 报告、评测 |
| Pastel Geometry | 友好、亲切 | 产品概览 |
| Split Pastel | 活泼、现代 | 创意机构 |
| Vintage Editorial | 有态度、个性 | 个人品牌 |
| Neon Cyber | 未来感、科技 | 科技初创 |
| Terminal Green | 开发者风 | 开发工具、API |
| Swiss Modern | 极简、精确 | 企业、数据 |
| Paper & Ink | 文学、沉思 | 叙事 |
| **Warm Retail** | **暖调、零售** | **食品/零售行业、渠道展示** |
| **Data Executive** | **数据驱动、高管** | **数据汇报、进度同步** |
| **Clean Brief** | **极简、高密度** | **内部对齐、方案说明** |
| **Product Showcase** | **产品聚焦** | **产品展示、打样对比** |

完整风格定义见 [STYLE_PRESETS.md](STYLE_PRESETS.md)。

### 氛围选择（引导发现时）

**问题：你希望观众看到后的感受？**
- 选项（可多选，最多 2 个）：
  - 「专业/可信」
  - 「兴奋/前沿」
  - 「平静/专注」
  - 「有感染力」

| 氛围 | 推荐风格 |
|-----|---------|
| 专业/可信 | Bold Signal, Electric Studio, Data Executive, Clean Brief |
| 兴奋/前沿 | Creative Voltage, Neon Cyber, Split Pastel |
| 平静/专注 | Notebook Tabs, Paper & Ink, Swiss Modern |
| 有感染力 | Dark Botanical, Vintage Editorial, Warm Retail |

### 生成预览

基于氛围选择生成 3 个预览 HTML 文件，每个只包含一页标题 slide，展示排版、配色、动画。

预览文件保存到项目的 `slide-previews/` 子目录中：

```
{project-slug}/
└── slide-previews/
    ├── style-a.html
    ├── style-b.html
    └── style-c.html
```

展示后问用户选哪个，或是否要混搭元素。

---

## 项目目录规范

每个演示项目使用统一的输出目录。根据来源不同，目录位置如下：

| 来源 | 输出目录 |
|-----|---------|
| OpenClaw agent | `~/presentations/{project-slug}/` |
| Cursor 本地 | 当前工作目录下 `./presentations/{project-slug}/` |
| 用户指定路径 | 用户指定的路径 |

`{project-slug}` 由演示标题自动生成：中文转拼音缩写或用户自定义短名。例如：「七星产品介绍」→ `qx-product-intro`，「Q3 数据汇报」→ `q3-data-report`。

### 标准目录结构

```
presentations/
└── {project-slug}/
    ├── {project-slug}.html            # 当前版本（自包含演示文稿）
    ├── images/                        # 图片素材文件夹
    │   ├── 01.png                     # 按序号命名，对应 slide 中的占位符
    │   ├── 02.png
    │   ├── 03.jpg
    │   └── ...
    ├── versions/                      # 版本备份
    │   ├── v1_{project-slug}.html     # 第一版
    │   ├── v2_{project-slug}.html     # 第二版
    │   └── ...
    ├── CHANGELOG.md                   # 变更记录
    └── slide-previews/                # 风格预览（生成后可删除）
        ├── style-a.html
        ├── style-b.html
        └── style-c.html
```

### 命名规则

- HTML 文件：`{project-slug}.html`（始终是最新版本）
- 图片文件：`images/{序号}.{ext}`，序号从 `01` 开始，两位数字补零
- 版本备份：`versions/v{N}_{project-slug}.html`
- 预览文件：`slide-previews/style-{a|b|c}.html`

---

## 版本管理

### 首次生成

1. 创建项目目录和子文件夹（`images/`、`versions/`）
2. 生成 HTML → 保存为 `{project-slug}.html`
3. 同时复制一份到 `versions/v1_{project-slug}.html`
4. 创建 `CHANGELOG.md`，写入首条记录

### 修改迭代

用户要求修改现有演示时：

1. 将当前 `{project-slug}.html` 复制到 `versions/v{N}_{project-slug}.html`（N 为递增版本号）
2. 在当前文件上修改
3. 在 `CHANGELOG.md` 追加变更记录

### CHANGELOG.md 格式

```markdown
# 变更记录

## v2 — 2026-02-26
- 替换第 3 页产品图
- 修改第 5 页数据为最新季度

## v1 — 2026-02-26
- 初始生成
- 风格：Warm Retail
- 页数：12
```

### 回滚

用户说「回到上一版」或「用 v2 的版本」时，从 `versions/` 中复制对应版本覆盖当前文件，并在 CHANGELOG 中记录回滚操作。

---

## 图片占位系统

生成演示时，如果用户尚未提供图片素材，使用占位色块代替。

### 占位符规则

每个需要图片的位置生成一个带编号的占位色块：

- **色块颜色**：`#E5E5E5`（浅灰），与所有风格兼容
- **标注内容**：序号 + 建议分辨率 + 可选说明
- **序号**：从 `01` 开始，全局递增（跨 slide 统一编号）

### 占位符 HTML/CSS

```html
<div class="img-placeholder" data-img-id="01">
    <span class="placeholder-id">01</span>
    <span class="placeholder-hint">建议 1920×1080</span>
    <span class="placeholder-desc">产品正面图</span>
</div>
```

```css
.img-placeholder {
    background: #E5E5E5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    border-radius: 8px;
    min-height: 200px;
    position: relative;
}
.placeholder-id {
    font-size: clamp(2rem, 5vw, 4rem);
    font-weight: 900;
    color: #BDBDBD;
    font-family: 'Courier New', monospace;
}
.placeholder-hint {
    font-size: var(--small-size);
    color: #9E9E9E;
    letter-spacing: 0.05em;
}
.placeholder-desc {
    font-size: var(--small-size);
    color: #757575;
}
```

### 各 slide 类型的占位符规格

| Slide 类型 | 占位符尺寸 | 建议分辨率 |
|-----------|----------|----------|
| 产品大图页（product-hero） | `width: 100%; height: 100%` | 1920×1080 |
| 规格参数页（spec-card） | `max-height: min(70vh, 500px)` | 800×800 |
| 对比展示页（comparison） | 两个 `height: min(40vh, 300px)` | 800×600 |
| 内容页配图 | `max-height: min(50vh, 400px)` | 1200×675 |
| 流程展示页图标 | `width: clamp(3rem, 6vw, 5rem)` | 200×200 |

### images/ 文件夹

生成 HTML 时，同时创建 `images/` 文件夹，并生成一个 `README.md`：

```markdown
# 图片素材

将图片文件放入此文件夹，按序号命名即可自动替换演示中的占位符。

| 序号 | 所在页 | 用途 | 建议分辨率 | 格式 |
|-----|-------|-----|----------|-----|
| 01  | Slide 2 | 产品正面图 | 1920×1080 | PNG/JPG |
| 02  | Slide 3 | 规格参数配图 | 800×800 | PNG |
| 03  | Slide 5 | 对比图（左） | 800×600 | PNG/JPG |
| 04  | Slide 5 | 对比图（右） | 800×600 | PNG/JPG |
| ...

命名示例：01.png、02.jpg、03.webp
支持格式：PNG、JPG、JPEG、WebP、SVG
```

### 图片替换机制

HTML 中引用图片时统一使用相对路径 `images/{序号}.{ext}`：

```html
<!-- 占位模式（无图片时） -->
<div class="img-placeholder" data-img-id="01">
    <span class="placeholder-id">01</span>
    <span class="placeholder-hint">建议 1920×1080</span>
    <span class="placeholder-desc">产品正面图</span>
</div>

<!-- 替换后（用户放入图片后，重新生成或手动替换） -->
<img src="images/01.png" alt="产品正面图">
```

当用户说「图片准备好了」或「替换图片」时：

1. 扫描 `images/` 文件夹，获取已有图片文件列表
2. 根据序号匹配 `data-img-id`，将占位符替换为 `<img>` 标签
3. 未匹配到的占位符保留不动
4. 输出替换报告：「已替换 01、02、04，03 缺失（对比图左）」

---

## Phase 3：生成演示文稿

基于 Phase 1 的内容 + Phase 2 的风格，生成完整演示文稿。

### 生成流程

1. **创建项目目录** — 按「项目目录规范」创建完整目录结构
2. **处理图片** — 用户提供了图片 → 使用 `<img>` 引用；未提供 → 使用占位色块
3. **生成 HTML** — 保存到 `{project-slug}.html`
4. **备份首版** — 复制到 `versions/v1_{project-slug}.html`
5. **创建 CHANGELOG** — 写入初始记录
6. **生成 images/README.md** — 列出所有图片占位符的序号、用途、建议分辨率

### 文件结构

```
{project-slug}/
├── {project-slug}.html
├── images/
│   └── README.md              # 图片清单（序号→用途→分辨率）
├── versions/
│   └── v1_{project-slug}.html
├── CHANGELOG.md
└── slide-previews/            # 风格选择阶段生成，交付时可清理
```

### HTML 模板

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>演示标题</title>
    <!-- 字体：中文 + 英文 -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700;900&display=swap">
    <style>
        :root {
            /* 颜色 */
            --bg-primary: #0a0f1c;
            --text-primary: #ffffff;
            --accent: #00ffcc;
            /* 字体 */
            --font-display: 'Noto Sans SC', sans-serif;
            --font-body: 'Noto Sans SC', sans-serif;
            /* 排版 - 所有尺寸用 clamp() */
            --title-size: clamp(2rem, 6vw, 5rem);
            --body-size: clamp(0.75rem, 1.2vw, 1rem);
            --slide-padding: clamp(1.5rem, 4vw, 4rem);
            --content-gap: clamp(1rem, 2vw, 2rem);
            /* 中文排版 */
            --line-height-zh: 1.8;
            --letter-spacing-zh: 0.02em;
            /* 动画 */
            --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
            --duration-normal: 0.6s;
        }
        /* 基础样式 + viewport fitting + 中文排版... */
    </style>
</head>
<body>
    <div class="progress-bar"></div>
    <nav class="nav-dots"></nav>

    <section class="slide title-slide">
        <h1 class="reveal">演示标题</h1>
        <p class="reveal">副标题</p>
    </section>

    <!-- 更多 slides... -->

    <script>
        class SlidePresentation {
            // 键盘导航、触摸/滑动、鼠标滚轮、进度条、导航点
        }
        new SlidePresentation();
    </script>
</body>
</html>
```

### 必须包含的 JS 功能

1. **SlidePresentation 类** — 键盘（方向键、空格）、触摸/滑动、鼠标滚轮、进度条、导航点
2. **Intersection Observer** — 滚动触发 `.visible` class 驱动 CSS 动画
3. **翻页笔兼容** — 无线翻页笔（PPT clicker）发送 `PageDown` / `PageUp` 键码。`setupKeyboard()` 中必须监听这两个键：
   ```javascript
   if (['ArrowDown','ArrowRight',' ','PageDown'].includes(e.key)) { this.next(); }
   if (['ArrowUp','ArrowLeft','PageUp'].includes(e.key)) { this.prev(); }
   ```
   同时建议支持 `Home` 跳首页、`End` 跳末页。
4. **可选增强**（按风格）：自定义光标、粒子背景、视差效果、3D 倾斜、计数器动画

### 代码质量

- 语义化 HTML（`section`、`nav`、`header`）
- ARIA 标签
- 减少动效支持（`prefers-reduced-motion`）
- 所有尺寸用 `clamp()`，不用固定像素值

---

## Phase 4：PPT 转换

### Step 4.1：提取内容

用 Python + `python-pptx` 提取所有文本、图片、备注。

```python
from pptx import Presentation
import os

def extract_pptx(file_path, output_dir):
    prs = Presentation(file_path)
    slides_data = []
    assets_dir = os.path.join(output_dir, 'assets')
    os.makedirs(assets_dir, exist_ok=True)

    for slide_num, slide in enumerate(prs.slides):
        slide_data = {
            'number': slide_num + 1,
            'title': '',
            'content': [],
            'images': [],
            'notes': ''
        }
        for shape in slide.shapes:
            if shape.has_text_frame:
                if shape == slide.shapes.title:
                    slide_data['title'] = shape.text
                else:
                    slide_data['content'].append({'type': 'text', 'content': shape.text})
            if shape.shape_type == 13:
                image = shape.image
                image_name = f"slide{slide_num+1}_img{len(slide_data['images'])+1}.{image.ext}"
                image_path = os.path.join(assets_dir, image_name)
                with open(image_path, 'wb') as f:
                    f.write(image.blob)
                slide_data['images'].append({'path': f"assets/{image_name}"})
        if slide.has_notes_slide:
            slide_data['notes'] = slide.notes_slide.notes_text_frame.text
        slides_data.append(slide_data)
    return slides_data
```

### Step 4.2：确认内容结构

展示提取结果让用户确认 → Phase 2 选风格 → 生成 HTML。

---

## Phase 5：Markdown 转换

当用户提供 `.md` 文件路径时使用此流程。

### Step 5.1：读取并解析 Markdown

读取 `.md` 文件，按以下规则解析为 slide 结构：

| Markdown 元素 | 映射为 |
|-------------|-------|
| `#` 一级标题 | 标题页（如果是文档第一个标题） |
| `##` 二级标题 | 新 slide 分页点 |
| `###` 三级标题 | 页内子标题 |
| 无序/有序列表 | 要点列表 |
| 表格 | 数据表格 slide 或内嵌表格 |
| 代码块 | 代码 slide |
| `>` 引用块 | 引用 slide |
| `![](path)` 图片 | 图片 slide 或页内图片 |
| `---` 分隔线 | 忽略（不作为分页依据） |

### Step 5.2：自动密度检查与拆分

解析完成后，对每页 slide 检查内容密度：

- 要点超过 5 条 → 拆分成多页
- 表格超过 6 行 → 拆分或改用数据摘要
- 单条要点超过 25 个中文字符 → 标记需要精简

### Step 5.3：展示提取结构并确认

向用户展示解析结果：

```
从 Markdown 中提取到以下 slide 结构：

**Slide 1（标题页）：** [文档标题]
**Slide 2：** [二级标题] — 3 条要点
**Slide 3：** [二级标题] — 1 张表格 + 2 条要点
**Slide 4：** [二级标题] — 4 条要点（拆分自原始 8 条）
**Slide 5：** [二级标题] — 4 条要点（续）
...

共 X 页。是否需要调整？
```

### Step 5.4：选择风格

→ Phase 2（风格选择）

### Step 5.5：生成 HTML

→ Phase 3（生成演示文稿）。Markdown 中的图片处理：
- `![](path)` 中的图片 → 复制到 `images/` 文件夹并按序号重命名
- 无法访问的图片路径 → 使用占位符，在 `images/README.md` 中标注原始路径

---

## 产品展示 Slide 类型

以下 slide 类型专为产品展示场景设计，可在任何风格中使用：

### 产品大图页

全屏产品图 + 底部半透明标题栏。有图片时用 `<img>`，无图片时用占位色块。

```html
<!-- 有图片时 -->
<section class="slide product-hero">
    <img src="images/01.png" class="product-hero-img" alt="产品名称">
    <div class="product-hero-caption reveal">
        <h2>产品名称</h2>
        <p>一句话描述</p>
    </div>
</section>

<!-- 无图片时（占位模式） -->
<section class="slide product-hero">
    <div class="img-placeholder product-hero-img" data-img-id="01">
        <span class="placeholder-id">01</span>
        <span class="placeholder-hint">建议 1920×1080</span>
        <span class="placeholder-desc">产品主图</span>
    </div>
    <div class="product-hero-caption reveal">
        <h2>产品名称</h2>
        <p>一句话描述</p>
    </div>
</section>
```

```css
.product-hero { padding: 0; }
.product-hero-img {
    width: 100%; height: 100%;
    object-fit: cover; position: absolute;
    top: 0; left: 0;
}
.product-hero-caption {
    position: absolute; bottom: 0; left: 0; right: 0;
    padding: var(--slide-padding);
    background: linear-gradient(transparent, rgba(0,0,0,0.7));
    color: white;
}
```

### 规格参数卡片页

左侧图片 + 右侧参数列表。图片位置支持占位符。

```html
<section class="slide spec-card">
    <div class="spec-card-layout">
        <div class="spec-card-image reveal">
            <!-- 有图片时 -->
            <img src="images/02.png" alt="产品">
            <!-- 无图片时 -->
            <!-- <div class="img-placeholder" data-img-id="02"><span class="placeholder-id">02</span><span class="placeholder-hint">建议 800×800</span></div> -->
        </div>
        <div class="spec-card-info">
            <h2 class="reveal">产品名称</h2>
            <dl class="spec-list">
                <div class="spec-item reveal"><dt>规格</dt><dd>值</dd></div>
                <!-- 最多 6 行 -->
            </dl>
        </div>
    </div>
</section>
```

```css
.spec-card-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--content-gap);
    height: 100%;
    align-items: center;
}
.spec-card-image img {
    max-height: min(70vh, 500px);
    width: 100%; object-fit: contain;
}
.spec-list { display: flex; flex-direction: column; gap: var(--element-gap); }
.spec-item { display: flex; justify-content: space-between; }
.spec-item dt { font-weight: 500; color: var(--text-secondary); }
.spec-item dd { font-weight: 700; }
@media (max-width: 768px) {
    .spec-card-layout { grid-template-columns: 1fr; }
}
```

### 对比展示页

左右并排对比，适合「现有品 vs 新方案」「前 vs 后」。

```html
<section class="slide comparison">
    <h2 class="reveal">对比标题</h2>
    <div class="comparison-layout">
        <div class="comparison-side reveal">
            <div class="comparison-label">现有方案</div>
            <img src="images/03.png" alt="现有">
            <!-- 或占位：<div class="img-placeholder" data-img-id="03"><span class="placeholder-id">03</span><span class="placeholder-hint">建议 800×600</span></div> -->
            <ul><li>特点 1</li><li>特点 2</li></ul>
        </div>
        <div class="comparison-divider"></div>
        <div class="comparison-side reveal">
            <div class="comparison-label highlight">新方案</div>
            <img src="images/04.png" alt="新方案">
            <!-- 或占位：<div class="img-placeholder" data-img-id="04"><span class="placeholder-id">04</span><span class="placeholder-hint">建议 800×600</span></div> -->
            <ul><li>改进 1</li><li>改进 2</li></ul>
        </div>
    </div>
</section>
```

### 流程展示页

横向时间线，适合「概念 → 打样 → 成品」流程。

```html
<section class="slide process-flow">
    <h2 class="reveal">产品开发流程</h2>
    <div class="process-timeline">
        <div class="process-step reveal">
            <div class="process-icon">1</div>
            <h3>概念</h3>
            <p>说明</p>
        </div>
        <div class="process-connector"></div>
        <!-- 最多 4 个步骤 -->
    </div>
</section>
```

```css
.process-timeline {
    display: flex; align-items: center;
    justify-content: center; gap: clamp(0.5rem, 2vw, 2rem);
    flex-wrap: nowrap;
}
.process-step {
    flex: 1; text-align: center;
    max-width: min(200px, 22vw);
}
.process-icon {
    width: clamp(2rem, 4vw, 3.5rem);
    height: clamp(2rem, 4vw, 3.5rem);
    border-radius: 50%;
    background: var(--accent);
    color: var(--bg-primary);
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; margin: 0 auto var(--element-gap);
    font-size: var(--body-size);
}
.process-connector {
    width: clamp(1rem, 3vw, 3rem);
    height: 2px;
    background: var(--accent);
    flex-shrink: 0;
}
@media (max-width: 600px) {
    .process-timeline { flex-direction: column; }
    .process-connector { width: 2px; height: clamp(0.5rem, 2vh, 1.5rem); }
}
```

---

## Phase 6：交付

### 最终输出

1. 清理预览文件（删除 `slide-previews/` 目录，或询问用户是否保留）
2. 确认版本备份已创建（`versions/v1_{project-slug}.html`）
3. 确认 `images/README.md` 已生成（列出所有占位符清单）
4. 在浏览器中打开演示文稿
5. 输出摘要：

```
演示文稿已完成！

项目目录：{project-slug}/
文件：{project-slug}.html
风格：{风格名}
页数：{数量}
版本：v1

图片状态：
- 已使用图片：{N} 张
- 占位符（待替换）：{M} 个 → 查看 images/README.md 获取清单
  将图片放入 images/ 文件夹并按序号命名（01.png、02.jpg...），
  然后说「替换图片」即可自动替换占位符。

操作方式：
- 方向键（← →）或空格键翻页
- 鼠标滚轮 / 触摸滑动也可以
- 右侧圆点可跳转到指定页
- 支持无线翻页笔（PageDown/PageUp）
- 浏览器全屏：F11（Windows/Linux）或 Ctrl+Cmd+F（macOS）

版本管理：
- 修改时自动备份上一版到 versions/ 文件夹
- 说「回到 v{N}」可回滚到任意历史版本
- 查看 CHANGELOG.md 了解所有变更记录

自定义方式：
- 颜色：修改 :root 中的 CSS 变量
- 字体：修改 Google Fonts 链接
- 动画：修改 .reveal 的过渡时间

需要调整吗？
```

### 迭代修改输出

当用户要求修改现有演示时，输出格式：

```
已更新演示文稿！

文件：{project-slug}.html（v{N}）
上一版备份：versions/v{N-1}_{project-slug}.html

本次修改：
- {变更 1}
- {变更 2}

需要继续调整吗？
```

---

## 动画参考

### 入场动画

```css
/* 淡入 + 上滑（最常用） */
.reveal {
    opacity: 0; transform: translateY(30px);
    transition: opacity 0.6s var(--ease-out-expo), transform 0.6s var(--ease-out-expo);
}
.slide.visible .reveal { opacity: 1; transform: translateY(0); }

/* 子元素依次延迟 */
.reveal:nth-child(1) { transition-delay: 0.1s; }
.reveal:nth-child(2) { transition-delay: 0.2s; }
.reveal:nth-child(3) { transition-delay: 0.3s; }
.reveal:nth-child(4) { transition-delay: 0.4s; }

/* 缩放入场 */
.reveal-scale { opacity: 0; transform: scale(0.9); }

/* 模糊入场 */
.reveal-blur { opacity: 0; filter: blur(10px); }
```

### 背景效果

```css
/* 渐变网格 */
.gradient-bg {
    background:
        radial-gradient(ellipse at 20% 80%, rgba(120,0,255,0.3) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 20%, rgba(0,255,200,0.2) 0%, transparent 50%),
        var(--bg-primary);
}

/* 噪点纹理 */
.noise-bg { background-image: url("data:image/svg+xml,..."); }

/* 网格图案 */
.grid-bg {
    background-image:
        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 50px 50px;
}
```

---

## 风格 → 氛围映射

| 氛围 | 动画特征 |
|-----|---------|
| 影院感/大气 | 慢淡入（1-1.5s）、大缩放过渡、暗背景 + 聚光效果 |
| 科技感/未来 | 霓虹发光、粒子系统、网格图案、等宽字体 |
| 活泼/友好 | 弹性缓动、大圆角、明亮/马卡龙色 |
| 专业/企业 | 快速微动（200-300ms）、无衬线字体、数据可视化 |
| 平静/极简 | 极慢动效、大留白、衬线字体 |
| 编辑/杂志 | 强排版层次、引用块、图文交错、网格破格布局 |

---

## 排错

| 问题 | 检查 |
|-----|-----|
| 字体不加载 | 检查 Google Fonts URL，确认字体名匹配 |
| 动画不触发 | 确认 Intersection Observer 正在运行，`.visible` class 是否被添加 |
| Scroll snap 失效 | 确认 html 有 `scroll-snap-type`，每个 slide 有 `scroll-snap-align` |
| 移动端问题 | 768px 以下禁用重效果，测试触摸事件 |
| 性能问题 | 谨慎使用 `will-change`，优先用 `transform` 和 `opacity` 动画 |
| 中文字体闪烁 | 添加 `font-display: swap` 到 Google Fonts URL |
| 内容被裁切 | **不要在 `.slide-content` 上使用 `max-height: 100%; overflow: hidden`**。字体变大后极易导致顶部标签或底部内容被遮挡。通过拆页解决溢出。 |
| 投屏字太小 | 检查 clamp 上限值。投屏建议 title ≥ 2.8rem / body ≥ 1.05rem。可在 `<html>` 上加 `class="projection"` 启用投屏参数集。 |
| 投屏颜色太浅 | 投影仪对比度低于显示器。`--text-secondary` 不应浅于 `#3d3835`，`--text-muted` 不应浅于 `#6b6560`。 |
| 大屏内容太宽 | `.slide-content` 加 `max-width: min(100%, 1200px)` 防止拉伸。 |
| `<br>` 换行不一致 | 不同视口宽度下 `<br>` 的位置语义会变。用 `<span style="display:block">每行文本</span>` 强制精确换行。 |
| 翻页笔无反应 | 确认 JS 监听了 `PageDown` / `PageUp`（不只是方向键）。 |
