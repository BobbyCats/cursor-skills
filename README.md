# Cursor Agent Skills

可复用的 Cursor Agent 技能包。克隆后软链接到 `~/.cursor/skills/` 即可在所有项目中使用。

## 快速安装

```bash
git clone https://github.com/BobbyCats/cursor-skills.git ~/.cursor/skills-repo

# 软链接需要的 skill（后续 git pull 自动同步更新）
ln -s ~/.cursor/skills-repo/frontend-slides ~/.cursor/skills/frontend-slides
ln -s ~/.cursor/skills-repo/html-to-pdf ~/.cursor/skills/html-to-pdf
```

## 技能列表

| 技能 | 说明 | 文件 |
|------|------|------|
| **frontend-slides** | 生成零依赖、动画丰富的 HTML 演示文稿 | `SKILL.md` + `STYLE_PRESETS.md` |
| **html-to-pdf** | 将 HTML slides 导出为高清多页 PDF | `SKILL.md` + `to-pdf.js` + `package.json` |

---

## frontend-slides

将内容转化为精美的全屏 HTML 演示文稿，内联 CSS/JS，单文件即可投屏。

### 核心能力

- 从零创建 / Markdown 转换 / PPT 转换
- 自适应字体（`clamp()`）、scroll-snap 翻页、入场动画
- 翻页笔（PageDown/PageUp）/ 键盘 / 触摸操控
- 16 种风格预设（深色/浅色/商业场景）
- 投屏模式（`<html class="projection">`）— 自动放大字号适配投影仪

### 内置可复用组件

| 组件 | 用途 |
|------|------|
| `slide-number` | 右上角页码标识 |
| `tag` | slide 分类标签（发现一、核心洞察…） |
| CSS 横向条形图 | 品类密度、市场占比 |
| 价格/区间对比图 | 价格带分析，支持脉冲动画高亮 |
| 数据卡片网格 | 关键数字指标展示 |
| 态度型结尾页 | 替代传统"谢谢观看" |

### 文件说明

| 文件 | 内容 |
|------|------|
| `SKILL.md` | 完整使用指南：核心原则、CSS 基础、组件库、Phase 流程、排错 |
| `STYLE_PRESETS.md` | 16 种风格预设：配色、字体对、签名元素、CSS 片段 |

### 设计原则

- **零依赖** — 单个 HTML 文件，内联 CSS/JS
- **反 AI 审美** — 禁止千篇一律的紫色渐变、Inter 字体
- **禁止 Emoji 图标** — 使用 inline SVG 替代
- **中文优先** — 默认 `lang="zh-CN"`，中文排版优化

---

## html-to-pdf

将 scroll-snap HTML slides 逐页截图合成高清 PDF。

### 为什么不用 `page.pdf()`

浏览器的 `page.pdf()` 无法正确分页 scroll-snap 布局（所有 slide 堆在同一页或只渲染当前可见的）。本方案用 Puppeteer 逐页滚动截图 + pdf-lib 合成。

### 快速使用

```bash
cd html-to-pdf
npm install

# 先启动本地 HTTP 服务（必须，不能用 file://）
npx -y serve -l 8766 /path/to/your/slides/

# 导出 PDF（默认 2K 分辨率）
node to-pdf.js http://localhost:8766/my-slides.html ./output.pdf

# 控制分辨率
PDF_DPI=1 node to-pdf.js ...   # 标清 1920×1080
PDF_DPI=2 node to-pdf.js ...   # 2K  3840×2160（默认）
PDF_DPI=3 node to-pdf.js ...   # ~4K 5760×3240
```

### 文件说明

| 文件 | 内容 |
|------|------|
| `SKILL.md` | Agent 使用指南：原理、依赖、流程、脚本模板、注意事项 |
| `to-pdf.js` | 可直接运行的导出脚本 |
| `package.json` | Node.js 依赖声明（puppeteer-core + pdf-lib） |

### 特性

- 支持 Linux / macOS（自动检测 Chrome 路径）
- `--font-render-hinting=none` 确保无头渲染字体清晰
- 自动禁用 scroll-snap，防止截图偏移
- 等待 `document.fonts.ready` 确保字体加载完成
- 自动隐藏导航 UI、强制所有动画到完成态
- 输出文件大小、耗时、分辨率信息
- 错误处理：页面加载失败、零 slide、缺少 Chrome

### 系统要求

- Node.js 18+
- Chrome 或 Chromium（系统安装）

---

## License

MIT
