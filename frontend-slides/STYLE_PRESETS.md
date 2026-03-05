# 风格预设参考

共 16 种风格预设：12 种通用 + 4 种商业场景。每种预设均包含中文字体对。

**核心原则：只用抽象形状，不用插画。**

---

## 中文字体速查

以下中文字体均可通过 Google Fonts 加载：

| 用途 | 推荐字体 | 风格 |
|-----|---------|-----|
| 标题（黑体） | Noto Sans SC (700/900) | 现代、清晰 |
| 标题（宋体） | Noto Serif SC (600/700) | 优雅、正式 |
| 标题（手写） | LXGW WenKai (400/700) | 温暖、文艺 |
| 正文 | Noto Sans SC (300/400) | 通用正文 |
| 正文（衬线） | Noto Serif SC (400) | 阅读体验好 |

**使用方式**：英文字体写前面，中文字体写后面。浏览器对每个字符自动 fallback。

```css
h1 { font-family: 'Archivo Black', 'Noto Sans SC', sans-serif; }
body { font-family: 'Space Grotesk', 'Noto Sans SC', sans-serif; }
```

**Google Fonts 加载示例**：

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700;900&family=Archivo+Black&family=Space+Grotesk:wght@400;500;700&display=swap">
```

---

## 深色主题

### 1. Bold Signal

**氛围**：自信、大胆、现代、高冲击力

**布局**：深色渐变背景上的彩色卡片。左上角页码，右上角导航，左下角标题。

**字体**：
- 英文标题：`Archivo Black` (900)
- 英文正文：`Space Grotesk` (400/500)
- 中文标题：`Noto Sans SC` (700/900)
- 中文正文：`Noto Sans SC` (400)

**配色**：
```css
:root {
    --bg-primary: #1a1a1a;
    --bg-gradient: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%);
    --card-bg: #FF5722;
    --text-primary: #ffffff;
    --text-on-card: #1a1a1a;
}
```

**签名元素**：大面积彩色卡片焦点、大号章节编号（01, 02...）、导航面包屑、网格对齐布局

---

### 2. Electric Studio

**氛围**：大胆、干净、专业、高对比

**布局**：上下分区——上白下蓝。角落品牌标识。

**字体**：
- 英文：`Manrope` (800 / 400)
- 中文标题：`Noto Sans SC` (700)
- 中文正文：`Noto Sans SC` (400)

**配色**：
```css
:root {
    --bg-dark: #0a0a0a;
    --bg-white: #ffffff;
    --accent-blue: #4361ee;
    --text-dark: #0a0a0a;
    --text-light: #ffffff;
}
```

**签名元素**：垂直双面板分区、面板边缘强调条、引用排版作为视觉主体、自信留白

---

### 3. Creative Voltage

**氛围**：大胆、创意、有活力、复古现代

**布局**：左右分区——电蓝色左，深色右。手写风点缀。

**字体**：
- 英文标题：`Syne` (700/800)
- 英文等宽：`Space Mono` (400/700)
- 中文标题：`Noto Sans SC` (700)
- 中文正文：`Noto Sans SC` (400)

**配色**：
```css
:root {
    --bg-primary: #0066ff;
    --bg-dark: #1a1a2e;
    --accent-neon: #d4ff00;
    --text-light: #ffffff;
}
```

**签名元素**：电蓝 + 霓虹黄对比、半调纹理图案、霓虹标签/徽章、手写风装饰字体

---

### 4. Dark Botanical

**氛围**：优雅、精致、艺术、高端

**布局**：深色底居中内容，角落抽象柔和形状。

**字体**：
- 英文标题：`Cormorant` (400/600) — 优雅衬线
- 英文正文：`IBM Plex Sans` (300/400)
- 中文标题：`Noto Serif SC` (600)
- 中文正文：`Noto Sans SC` (300)

**配色**：
```css
:root {
    --bg-primary: #0f0f0f;
    --text-primary: #e8e4df;
    --text-secondary: #9a9590;
    --accent-warm: #d4a574;
    --accent-pink: #e8b4b8;
    --accent-gold: #c9b896;
}
```

**签名元素**：抽象模糊渐变圆（重叠）、暖色调点缀（粉、金、赭石）、细竖线装饰、意大利斜体签名排版

---

## 浅色主题

### 5. Notebook Tabs

**氛围**：编辑风、有序、优雅、触感

**布局**：深色外底 + 米色纸张卡片。右侧彩色标签。

**字体**：
- 英文标题：`Bodoni Moda` (400/700) — 经典编辑风
- 英文正文：`DM Sans` (400/500)
- 中文标题：`Noto Serif SC` (600/700)
- 中文正文：`Noto Sans SC` (400)

**配色**：
```css
:root {
    --bg-outer: #2d2d2d;
    --bg-page: #f8f6f1;
    --text-primary: #1a1a1a;
    --tab-1: #98d4bb;
    --tab-2: #c7b8ea;
    --tab-3: #f4b8c5;
    --tab-4: #a8d8ea;
    --tab-5: #ffe6a7;
}
```

**签名元素**：带阴影的纸张容器、右侧彩色章节标签（竖排文字）、左侧装订孔装饰。标签文字用 `font-size: clamp(0.5rem, 1vh, 0.7rem)`

---

### 6. Pastel Geometry

**氛围**：友好、有序、现代、亲切

**布局**：马卡龙色底 + 白色卡片。右侧竖排胶囊装饰。

**字体**：
- 英文：`Plus Jakarta Sans` (700/800 标题, 400/500 正文)
- 中文标题：`Noto Sans SC` (700)
- 中文正文：`Noto Sans SC` (400)

**配色**：
```css
:root {
    --bg-primary: #c8d9e6;
    --card-bg: #faf9f7;
    --pill-pink: #f0b4d4;
    --pill-mint: #a8d4c4;
    --pill-sage: #5a7c6a;
    --pill-lavender: #9b8dc4;
    --pill-violet: #7c6aad;
}
```

**签名元素**：圆角卡片 + 柔和阴影、右侧不同高度的竖排胶囊装饰

---

### 7. Split Pastel

**氛围**：活泼、现代、友好、创意

**布局**：左右双色分区（蜜桃 + 薰衣草）。

**字体**：
- 英文：`Outfit` (700/800 标题, 400/500 正文)
- 中文标题：`Noto Sans SC` (700)
- 中文正文：`Noto Sans SC` (400)

**配色**：
```css
:root {
    --bg-peach: #f5e6dc;
    --bg-lavender: #e4dff0;
    --text-dark: #1a1a1a;
    --badge-mint: #c8f0d8;
    --badge-yellow: #f0f0c8;
    --badge-pink: #f0d4e0;
}
```

**签名元素**：分色背景、胶囊徽章（带图标）、右侧面板网格叠加、圆角 CTA 按钮

---

### 8. Vintage Editorial

**氛围**：有态度、自信、编辑风、个性驱动

**布局**：米色底居中内容。抽象几何形状点缀。

**字体**：
- 英文标题：`Fraunces` (700/900) — 个性衬线
- 英文正文：`Work Sans` (400/500)
- 中文标题：`Noto Serif SC` (700)
- 中文正文：`Noto Sans SC` (400)

**配色**：
```css
:root {
    --bg-cream: #f5f3ee;
    --text-primary: #1a1a1a;
    --text-secondary: #555;
    --accent-warm: #e8d4c0;
}
```

**签名元素**：抽象几何形状（圆环 + 线 + 点）、粗边框 CTA 框、有态度的文案风格

---

## 特殊主题

### 9. Neon Cyber

**氛围**：未来感、科技、自信

**字体**：
- 英文标题：`Clash Display`（Fontshare）
- 英文正文：`Satoshi`（Fontshare）
- 中文标题：`Noto Sans SC` (900)
- 中文正文：`Noto Sans SC` (400)

**配色**：深海蓝 (#0a0f1c)、青色强调 (#00ffcc)、品红 (#ff00aa)

**签名元素**：粒子背景、霓虹发光、网格图案

---

### 10. Terminal Green

**氛围**：开发者风、黑客审美

**字体**：
- 英文：`JetBrains Mono`（全等宽）
- 中文：`Noto Sans SC` (400)（正文退化为无衬线，保持可读性）

**配色**：GitHub 深色 (#0d1117)、终端绿 (#39d353)

**签名元素**：扫描线、闪烁光标、代码语法高亮

---

### 11. Swiss Modern

**氛围**：干净、精确、包豪斯风

**字体**：
- 英文标题：`Archivo` (800)
- 英文正文：`Nunito` (400)
- 中文标题：`Noto Sans SC` (700)
- 中文正文：`Noto Sans SC` (400)

**配色**：纯白、纯黑、红色强调 (#ff3300)

**签名元素**：可见网格、不对称布局、几何形状

---

### 12. Paper & Ink

**氛围**：文学、沉思、编辑风

**字体**：
- 英文标题：`Cormorant Garamond`
- 英文正文：`Source Serif 4`
- 中文标题：`Noto Serif SC` (600)
- 中文正文：`Noto Serif SC` (400)

**配色**：暖米色 (#faf9f7)、炭灰 (#1a1a1a)、深红强调 (#c41e3a)

**签名元素**：首字下沉、引用块、优雅分隔线

---

## 商业场景主题

### 13. Warm Retail

**氛围**：温暖、亲切、专业、零售行业

**适合**：食品/零售行业汇报、渠道方展示、品牌介绍、产品方案

**布局**：暖棕色调 + 奶白内容区。大面积产品图展示区，底部或侧边品牌色条。

**字体**：
- 英文标题：`DM Serif Display` (400)
- 英文正文：`DM Sans` (400/500)
- 中文标题：`Noto Serif SC` (600/700)
- 中文正文：`Noto Sans SC` (400)

**配色**：
```css
:root {
    --bg-primary: #faf6f1;
    --bg-secondary: #f0e8df;
    --bg-accent: #3d2b1f;
    --text-primary: #2c1810;
    --text-secondary: #6b5445;
    --accent-warm: #c67b3c;
    --accent-cream: #e8d5b7;
    --accent-olive: #7a8b6f;
    --card-bg: #ffffff;
    --card-shadow: 0 2px 12px rgba(60,43,31,0.08);
}
```

**签名元素**：
- 暖棕渐变边框或色条（侧边/底边），传递食品行业温暖感
- 大面积产品图容器（圆角、柔和阴影）
- 数据卡片用 `--accent-warm` 作为强调色
- 页脚品牌色条：`background: var(--bg-accent); height: 4px;`
- 引用块用手写风英文字体 + 中文正文，传递人情味
- 图标用线性风格（不用填充），保持专业感

**CSS 片段**：
```css
.brand-bar {
    position: absolute; bottom: 0; left: 0; right: 0;
    height: 4px; background: var(--bg-accent);
}
.product-card {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: var(--card-shadow);
    background: var(--card-bg);
}
.product-card img {
    width: 100%;
    height: min(40vh, 300px);
    object-fit: cover;
}
.stat-number {
    font-size: clamp(2rem, 5vw, 4rem);
    font-weight: 700;
    color: var(--accent-warm);
    font-family: 'DM Serif Display', 'Noto Serif SC', serif;
}
```

---

### 14. Data Executive

**氛围**：数据驱动、权威、高管视角

**适合**：给 CFO/高管汇报进度、数据分析展示、KPI 看板、季度复盘

**布局**：深灰底 + 冷蓝高亮。大数字卡片区、对比表格、简洁趋势指示。

**字体**：
- 英文标题：`Inter` (700/800)（此处例外使用 Inter，因其数字对齐极佳）
- 英文正文：`Inter` (400/500)
- 中文标题：`Noto Sans SC` (700)
- 中文正文：`Noto Sans SC` (400)

**配色**：
```css
:root {
    --bg-primary: #1a1d23;
    --bg-secondary: #22262e;
    --bg-card: #282c34;
    --text-primary: #e8eaed;
    --text-secondary: #9aa0a6;
    --accent-blue: #4a9eff;
    --accent-green: #34d399;
    --accent-red: #f87171;
    --accent-yellow: #fbbf24;
    --border-subtle: rgba(255,255,255,0.06);
}
```

**签名元素**：
- 大数字卡片：数字用 `clamp(2.5rem, 6vw, 5rem)`，搭配小标签说明
- 趋势箭头：绿色 ↑ / 红色 ↓ 标识同比变化
- 对比表格：交替行背景 `var(--bg-secondary)`
- 进度条/环形图：用 CSS 渐变实现，不依赖 JS
- 分区线：`border-bottom: 1px solid var(--border-subtle)`
- 页眉：日期 + 报告标题 + 页码，字号 `var(--small-size)`

**CSS 片段**：
```css
.kpi-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr));
    gap: clamp(0.75rem, 1.5vw, 1.5rem);
}
.kpi-card {
    background: var(--bg-card);
    border: 1px solid var(--border-subtle);
    border-radius: 8px;
    padding: clamp(1rem, 2vw, 1.5rem);
}
.kpi-value {
    font-size: clamp(2rem, 5vw, 4rem);
    font-weight: 800;
    color: var(--accent-blue);
    line-height: 1.1;
    font-variant-numeric: tabular-nums;
}
.kpi-label {
    font-size: var(--small-size);
    color: var(--text-secondary);
    margin-top: var(--element-gap);
}
.trend-up { color: var(--accent-green); }
.trend-down { color: var(--accent-red); }
.data-table {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--body-size);
}
.data-table th {
    text-align: left;
    color: var(--text-secondary);
    border-bottom: 1px solid var(--border-subtle);
    padding: clamp(0.4rem, 0.8vw, 0.75rem) 0;
}
.data-table td {
    padding: clamp(0.4rem, 0.8vw, 0.75rem) 0;
    border-bottom: 1px solid var(--border-subtle);
}
.data-table tr:nth-child(even) td {
    background: var(--bg-secondary);
}
```

---

### 15. Clean Brief

**氛围**：极简、高效、信息密度高

**适合**：内部对齐、方案说明、快速同步、团队周会

**布局**：纯白底 + 黑字 + 单色强调。无装饰元素，信息密度最大化。

**字体**：
- 英文标题：`Instrument Sans` (700)
- 英文正文：`Instrument Sans` (400)
- 中文标题：`Noto Sans SC` (700)
- 中文正文：`Noto Sans SC` (400)

**配色**：
```css
:root {
    --bg-primary: #ffffff;
    --bg-secondary: #f5f5f5;
    --text-primary: #111111;
    --text-secondary: #666666;
    --accent: #111111;
    --accent-light: #e5e5e5;
    --highlight: #ffeb3b;
    --border: #e0e0e0;
}
```

**签名元素**：
- 零装饰：无渐变、无阴影、无背景图案
- 高信息密度：充分利用 slide 空间，但仍遵守密度上限
- 黄色高亮标记关键数字/词：`background: var(--highlight); padding: 0 0.2em;`
- 粗细分割线区分内容区块
- 左上角固定：slide 编号 / 总数
- 右上角固定：日期或版本号

**CSS 片段**：
```css
.brief-slide {
    padding: clamp(2rem, 4vw, 4rem);
}
.brief-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: var(--content-gap);
    padding-bottom: var(--element-gap);
    border-bottom: 2px solid var(--accent);
}
.brief-page-num {
    font-size: var(--small-size);
    color: var(--text-secondary);
    font-variant-numeric: tabular-nums;
}
.brief-highlight {
    background: var(--highlight);
    padding: 0 0.2em;
    font-weight: 700;
}
.brief-divider {
    border: none;
    border-top: 1px solid var(--border);
    margin: var(--element-gap) 0;
}
.brief-list {
    list-style: none;
    padding: 0;
}
.brief-list li {
    padding: clamp(0.3rem, 0.6vw, 0.5rem) 0;
    border-bottom: 1px solid var(--accent-light);
    font-size: var(--body-size);
}
.brief-list li::before {
    content: "→ ";
    color: var(--text-secondary);
}
```

---

### 16. Product Showcase

**氛围**：产品聚焦、直观、专业

**适合**：产品展示、打样对比、工厂方案说明、新品提案

**布局**：浅灰底，大图为主体，参数卡片辅助。支持轮播、对比、规格展示。

**字体**：
- 英文标题：`Space Grotesk` (600/700)
- 英文正文：`Space Grotesk` (400)
- 中文标题：`Noto Sans SC` (700)
- 中文正文：`Noto Sans SC` (400)

**配色**：
```css
:root {
    --bg-primary: #f0f0f0;
    --bg-secondary: #e8e8e8;
    --bg-card: #ffffff;
    --text-primary: #1a1a1a;
    --text-secondary: #666666;
    --accent: #2563eb;
    --accent-subtle: rgba(37,99,235,0.08);
    --success: #16a34a;
    --warning: #ea580c;
    --card-shadow: 0 4px 20px rgba(0,0,0,0.08);
    --card-radius: 16px;
}
```

**签名元素**：
- 产品图容器：大圆角 + 柔和阴影，图片占据 slide 50-60% 面积
- 规格参数用 `dl` 列表，左标签右数值，清晰对齐
- 对比模式：左右分栏，中间竖分隔线，上方标签（A / B 或 现有 / 新方案）
- 产品轮播：底部圆点指示器（复用 nav-dots 逻辑）
- 标签系统：小胶囊标签标注产品属性（如「冷冻」「新品」「爆款」）
- 流程展示：横向步骤节点 + 连接线

**CSS 片段**：
```css
.showcase-image-frame {
    background: var(--bg-card);
    border-radius: var(--card-radius);
    box-shadow: var(--card-shadow);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: clamp(1rem, 2vw, 2rem);
}
.showcase-image-frame img {
    max-width: 100%;
    max-height: min(60vh, 450px);
    object-fit: contain;
}
.showcase-spec {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: clamp(0.3rem, 0.6vw, 0.5rem) clamp(1rem, 2vw, 2rem);
    font-size: var(--body-size);
}
.showcase-spec dt {
    color: var(--text-secondary);
    white-space: nowrap;
}
.showcase-spec dd {
    font-weight: 600;
    color: var(--text-primary);
}
.showcase-tag {
    display: inline-block;
    padding: 0.15em 0.6em;
    border-radius: 999px;
    font-size: var(--small-size);
    font-weight: 600;
    background: var(--accent-subtle);
    color: var(--accent);
}
.showcase-tag.success {
    background: rgba(22,163,74,0.1);
    color: var(--success);
}
.showcase-tag.warning {
    background: rgba(234,88,12,0.1);
    color: var(--warning);
}
.showcase-comparison {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: var(--content-gap);
    align-items: start;
    height: 100%;
}
.showcase-comparison-divider {
    width: 1px;
    height: 80%;
    background: var(--bg-secondary);
    align-self: center;
}
.showcase-comparison-label {
    font-size: var(--small-size);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-secondary);
    margin-bottom: var(--element-gap);
}
@media (max-width: 768px) {
    .showcase-comparison {
        grid-template-columns: 1fr;
    }
    .showcase-comparison-divider {
        width: 80%; height: 1px;
        justify-self: center;
    }
}
```

---

## 字体对速查表

| 预设 | 英文标题 | 英文正文 | 中文标题 | 中文正文 | 来源 |
|-----|---------|---------|---------|---------|-----|
| Bold Signal | Archivo Black | Space Grotesk | Noto Sans SC (900) | Noto Sans SC (400) | Google |
| Electric Studio | Manrope | Manrope | Noto Sans SC (700) | Noto Sans SC (400) | Google |
| Creative Voltage | Syne | Space Mono | Noto Sans SC (700) | Noto Sans SC (400) | Google |
| Dark Botanical | Cormorant | IBM Plex Sans | Noto Serif SC (600) | Noto Sans SC (300) | Google |
| Notebook Tabs | Bodoni Moda | DM Sans | Noto Serif SC (700) | Noto Sans SC (400) | Google |
| Pastel Geometry | Plus Jakarta Sans | Plus Jakarta Sans | Noto Sans SC (700) | Noto Sans SC (400) | Google |
| Split Pastel | Outfit | Outfit | Noto Sans SC (700) | Noto Sans SC (400) | Google |
| Vintage Editorial | Fraunces | Work Sans | Noto Serif SC (700) | Noto Sans SC (400) | Google |
| Neon Cyber | Clash Display | Satoshi | Noto Sans SC (900) | Noto Sans SC (400) | Fontshare |
| Terminal Green | JetBrains Mono | JetBrains Mono | Noto Sans SC (400) | Noto Sans SC (400) | JetBrains |
| Swiss Modern | Archivo | Nunito | Noto Sans SC (700) | Noto Sans SC (400) | Google |
| Paper & Ink | Cormorant Garamond | Source Serif 4 | Noto Serif SC (600) | Noto Serif SC (400) | Google |
| Warm Retail | DM Serif Display | DM Sans | Noto Serif SC (700) | Noto Sans SC (400) | Google |
| Data Executive | Inter | Inter | Noto Sans SC (700) | Noto Sans SC (400) | Google |
| Clean Brief | Instrument Sans | Instrument Sans | Noto Sans SC (700) | Noto Sans SC (400) | Google |
| Product Showcase | Space Grotesk | Space Grotesk | Noto Sans SC (700) | Noto Sans SC (400) | Google |

---

## 禁止使用的 AI 审美

**字体**：Inter/Roboto/Arial 作为标题字体（Data Executive 例外，因其数字对齐需要）

**配色**：`#6366f1`（千篇一律的靛蓝）、紫色渐变 + 白色背景

**布局**：全部居中、通用 hero section、完全相同的卡片网格

**装饰**：写实插画、无意义的毛玻璃效果、无目的的阴影

---

## CSS 注意事项

### 取反 CSS 函数

**错误** — 浏览器静默忽略：
```css
right: -clamp(28px, 3.5vw, 44px);   /* 无效 */
margin-left: -min(10vw, 100px);      /* 无效 */
```

**正确** — 用 `calc()` 包裹：
```css
right: calc(-1 * clamp(28px, 3.5vw, 44px));  /* 有效 */
margin-left: calc(-1 * min(10vw, 100px));     /* 有效 */
```
