# majuzi123.github.io

马搏（Bo Ma）的个人主页 · 测试开发 / 质量效能工程师（移动端自动化 + 大模型测试）

在线地址：**https://majuzi123.github.io**

纯静态站点：原生 HTML + CSS + JavaScript，零依赖、零构建步骤。

---

## 一、部署到 GitHub Pages（3 步）

### 1. 在 GitHub 上创建仓库

仓库名必须**完全等于** `majuzi123.github.io`（小写，与用户名一致），否则 Pages 不会生效。

- 访问 https://github.com/new
- Repository name 填：`majuzi123.github.io`
- 选 **Public**
- **不要**勾选 "Add a README file"（本地已有）
- 点击 Create repository

### 2. 关联并推送

在本目录执行：

```bash
git remote add origin git@github.com:majuzi123/majuzi123.github.io.git
git push -u origin main
```

如果用 HTTPS 而不是 SSH：

```bash
git remote add origin https://github.com/majuzi123/majuzi123.github.io.git
git push -u origin main
```

### 3. 开启 Pages

进入仓库 **Settings → Pages**，在 **Build and deployment** 下：

- Source 选 **Deploy from a branch**
- Branch 选 **main**，文件夹选 **/ (root)**
- 点 Save

约 30–60 秒后访问 https://majuzi123.github.io 即可看到页面。

> 若页面显示 404，多半是仓库名拼错或分支选错，回到 Settings → Pages 核对这两项。

---

## 二、本地预览

```bash
cd majuzi123.github.io
python3 -m http.server 8000
# 打开 http://localhost:8000
```

---

## 三、后续如何更新内容

本站所有文案都写在 `index.html` 里，结构如下：

```
index.html                   ← 全部内容与结构（唯一需要改的文件）
assets/css/style.css         ← 样式与设计变量（配色、圆角、间距）
assets/js/main.js            ← 中英切换、深浅色、滚动动画
assets/img/favicon.svg       ← 网站图标
assets/img/og-card.svg       ← 分享卡片（微信/微博/LinkedIn 转发预览图）
assets/files/MaBo-CV.pdf     ← 简历 PDF（"下载简历"按钮指向这里）
```

改完以后：

```bash
git add .
git commit -m "更新内容"
git push
```

推送后约 1 分钟自动上线。

### 常见修改

| 想改什么 | 改哪里 |
| --- | --- |
| 姓名、头衔、简介 | `index.html` 的 `<section class="hero">` |
| 联系方式 | hero 区 `.hero__meta` 与页尾 `#contact` |
| 论文 | `#research` 下的 `<article class="pub">`，复制一整块即可新增 |
| 项目 | `#projects` 下的 `<article class="project">` |
| 教育 / 实习 | `#education`、`#experience` 下的 `<div class="tl-item">` |
| 配色 | `assets/css/style.css` 顶部 `:root` 里的 `--brand`、`--brand-2` |

---

## 四、双语是怎么工作的

每个可切换的文案都写了两份，用 `lang` 属性区分：

```html
<span lang="zh">关于</span><span lang="en">About</span>
```

CSS 根据 `<html lang="...">` 决定显示哪一份，右上角按钮切换，选择会记在浏览器本地。

**新增文案时记得同时写 zh 和 en 两份**，否则切到英文会缺内容。

论文标题等本身就是英文的内容不需要重复写两份。

---

## 五、两个可选的完善项

### 1. 换成真实头像

目前头像是一个「马」字字母标。换成个人照片：

- 准备一张正方形照片（建议 ≥ 512×512，浅色背景最佳）
- 存为 `assets/img/avatar.jpg`
- 把 `index.html` 里的

  ```html
  <div class="avatar__monogram" aria-label="马搏">马</div>
  ```

  替换为

  ```html
  <img src="assets/img/avatar.jpg" alt="马搏" width="512" height="512">
  ```

### 2. 换成真实的分享卡片图

`og-card.svg` 是 SVG，部分平台（微信、LinkedIn）不识别 SVG 作预览图。建议导出成 PNG：

```bash
# macOS 自带
qlmanage -t -s 1200 -o . assets/img/og-card.svg
```

把生成的 PNG 命名为 `assets/img/og-card.png`，再把 `index.html` 里 `og:image` 的后缀从 `.svg` 改成 `.png`。

---

## 六、设计说明

- **风格**：学术专业风，浅色为主、蓝紫渐变点缀，支持深色模式
- **响应式**：桌面 / 平板 / 手机三档适配，移动端折叠导航
- **无障碍**：语义化标签、键盘可聚焦、支持 `prefers-reduced-motion`
- **SEO**：完整的 Open Graph 与 JSON-LD 结构化数据（Person）
- **性能**：无外部字体、无 CDN、无框架，首屏一次请求即可渲染
