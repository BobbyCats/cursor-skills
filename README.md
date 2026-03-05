# Cursor Agent Skills

可复用的 Cursor Agent 技能包。克隆到 `~/.cursor/skills/` 即可在所有项目中使用。

## 安装

```bash
git clone https://github.com/BobbyCats/cursor-skills.git ~/.cursor/skills-repo
# 然后软链接或复制需要的 skill 到 ~/.cursor/skills/
ln -s ~/.cursor/skills-repo/frontend-slides ~/.cursor/skills/frontend-slides
ln -s ~/.cursor/skills-repo/html-to-pdf ~/.cursor/skills/html-to-pdf
```

## 技能列表

| 技能 | 说明 |
|------|------|
| **frontend-slides** | 生成零依赖、动画丰富的 HTML 演示文稿。支持从零创建、Markdown 转换、PPT 转换。 |
| **html-to-pdf** | 将 HTML 演示文稿（scroll-snap slides）导出为高清多页 PDF。 |

## frontend-slides

将内容转化为精美的全屏 HTML 演示文稿，内联 CSS/JS，单文件即可投屏。支持：
- 从零创建演示文稿
- Markdown 文件转换为 slides
- 自适应字体（clamp）、scroll-snap 翻页、入场动画
- 翻页笔 / 键盘 / 触摸操控

## html-to-pdf

将 scroll-snap HTML slides 逐页截图合成高清 PDF：
- 解决浏览器 `page.pdf()` 无法正确分页 scroll-snap 的问题
- 支持 1x（标清）/ 2x（2K）/ 3x（4K）渲染倍率
- 自动隐藏导航 UI、强制动画完成态
- 依赖：puppeteer-core + pdf-lib + Chrome

## License

MIT
