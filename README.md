# majuzi123.github.io

马搏（Bo Ma）的个人主页 · 移动端自动化测试 / 大模型赋能质量效能

在线地址：**https://majuzi123.github.io**

纯静态站点：原生 HTML + CSS + JavaScript，零依赖、零构建步骤。

风格参考 [xixianliang.github.io/resume](https://xixianliang.github.io/resume/) —— 暖米纸感背景、衬线标题、半透明玻璃面板、深青点缀、左侧 sticky 侧栏。

---

## 一、部署状态

✅ 已上线。仓库 `majuzi123/majuzi123.github.io`，分支 `main`，发布源 `/ (root)`。

`username.github.io` 这类仓库 push 后 Pages 会自动启用，不需要手动配置发布源。
本地远端已配置好（`origin` → `git@github.com:majuzi123/majuzi123.github.io.git`），更新流程：

```bash
git add . && git commit -m "更新内容" && git push
```

push 后约 45 秒线上生效。

---

## 二、从零重建（换机器时参考）

### 1. 创建仓库

仓库名必须**完全等于** `majuzi123.github.io`（小写，与用户名一致），否则 Pages 不会生效。

- 访问 https://github.com/new
- Repository name 填：`majuzi123.github.io`
- 选 **Public**
- **不要**勾选 "Add a README file"（本地已有）

### 2. 推送

```bash
git remote add origin git@github.com:majuzi123/majuzi123.github.io.git
git push -u origin main
```

本机的 SSH key 已可通过 `majuzi123` 身份认证，直接推送即可。

### 3. 开启 Pages

仓库 **Settings → Pages**，在 **Build and deployment** 下：

- Source 选 **Deploy from a branch**
- Branch 选 **main**，文件夹选 **/ (root)**
- Save

约 30–60 秒后 https://majuzi123.github.io 生效。

> 404 排查顺序：仓库名是否拼错 → 部署分支是否选成了 master。

---

## 三、本地预览

```bash
cd majuzi123.github.io
python3 -m http.server 8000
# 打开 http://localhost:8000
```

---

## 四、文件结构

```
index.html                  全部内容与结构（唯一需要改的文件）
assets/css/style.css        样式；配色与字体在顶部 :root
assets/js/main.js           中英切换、深浅色、目录高亮、滚动动画
assets/img/favicon.svg      网站图标
assets/img/og-card.svg      分享卡片源文件
assets/img/og-card.png      分享卡片（1200×630，社交平台预览用）
```

改完后：

```bash
git add . && git commit -m "更新内容" && git push
```

推送约 1 分钟后自动上线。

### 常见修改位置

| 想改什么 | 改哪里 |
| --- | --- |
| 姓名、简介、联系方式 | `index.html` 的 `<aside class="sidebar">` |
| 概览标签 | `#highlights` 下的 `.meta-row` |
| 教育 / 经历 | `#education`、`#experience` 下的 `<article class="timeline-item">` |
| 论文 | `#publications` 下的 `<a class="publication-card-link">` |
| 项目 | `#work` 下的 `<a class="project-card">` |
| 荣誉 / 技能 | `#honors`、`#skills` 下的 `.feature-card` |
| 配色 | `assets/css/style.css` 顶部 `:root` 的 `--accent` 系列 |

---

## 五、双语是怎么工作的

可切换的文案写两份，用 `lang` 属性区分：

```html
<span lang="zh">教育</span><span lang="en">Education</span>
```

CSS 根据 `<html lang="...">` 决定显示哪一份，侧栏右上角按钮切换，选择记在浏览器本地。

**新增中文文案记得补一份英文**，否则切到 EN 会缺内容。论文标题本身是英文，不需要写两份。

---

## 六、可选的完善项

### 1. 加一张头像

参考站的风格是无头像的纯文字页头。如果想加照片：

- 准备正方形照片（建议 ≥ 512×512）
- 存为 `assets/img/avatar.jpg`
- 在 `<aside class="sidebar">` 的 `<h1>` 之前插入：

  ```html
  <img class="avatar" src="assets/img/avatar.jpg" alt="马搏" width="512" height="512">
  ```

- 在 `style.css` 加：

  ```css
  .avatar { width: 104px; height: 104px; border-radius: 50%;
            object-fit: cover; margin-bottom: 1rem; }
  ```

### 2. 更新分享卡片

改了个人信息后重新导出 PNG：

```bash
/Library/Frameworks/Python.framework/Versions/Current/bin/python3 -c "..."  # 或用 qlmanage
qlmanage -t -s 1200 -o . assets/img/og-card.svg
```

再把输出重命名为 `og-card.png` 覆盖原文件。

---

## 七、设计说明

- **布局**：372px sticky 侧栏 + 内容面板的双栏，窄屏自动堆叠为单栏
- **字体**：标题衬线（Iowan Old Style / Palatino），正文无衬线（IBM Plex Sans → Avenir Next → PingFang SC）
- **主题**：浅色暖米 + 深色两套，跟随系统偏好，可手动切换并记忆
- **无障碍**：语义化标签、键盘可聚焦、支持 `prefers-reduced-motion`
- **SEO**：Open Graph 与 JSON-LD（Person）结构化数据
- **性能**：无外部字体、无 CDN、无框架，图标为内联 SVG sprite
