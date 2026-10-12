# 心协学术空间

山东大学学生心理协会学术部的公共网站（第一版）。

这是一个面向全校学生的线上交流与知识分享平台，包含三个栏目：

- **共读档案**：每周更新的读书笔记，可按书籍或主题分类。
- **生活切片**：供同学自由分享生活的留言墙，含投稿表单。
- **心理便利贴**：介绍有研究支撑的心理学概念，附文献来源。

> **重要提示**：本站当前是**第一版演示站点**。页面上所有的读书笔记、留言和概念卡片都是示例内容，页面上都带有「演示内容」标记。
> 投稿功能**没有接入任何服务器**，填写表单只会在你自己的浏览器里生成一张预览卡片，内容不会被发送或保存保存，也不会公开。

---

## 一、技术栈

| 项目 | 选择 | 说明 |
| --- | --- | --- |
| 前端框架 | React 19 | 组件化开发 |
| 构建工具 | Vite 7 | 启动快、打包快 |
| 路由 | React Router 7 | 支持 `/reading/xxx` 这类地址 |
| 样式 | 原生 CSS + CSS 变量 | 没有引入 UI 框架，方便后续改主题 |
| 数据 | 本地示例数据文件 | 第一版不连数据库 |
| 部署 | Cloudflare（免费） | 构建产物是纯静态文件，通过 GitHub 自动部署，不需要服务器 |

**为什么适合部署到 Cloudflare**：构建产物（`dist` 文件夹）是纯静态文件，不依赖 Node 服务器、不需要买服务器或域名。Cloudflare 的免费额度对社团网站足够使用，而且每次推送到 GitHub 都会自动重新部署。

---

## 二、目录结构

```
SDU-Psychology-Website/
├─ index.html              网站入口 HTML（标题、描述在这里）
├─ package.json            依赖与命令清单
├─ vite.config.js          Vite 配置
├─ wrangler.jsonc          Cloudflare 部署配置（不要删除）
├─ .nvmrc                  声明构建使用的 Node 版本
├─ README.md               本文件
│
├─ public/                 静态文件，会原样复制到构建产物里
│  ├─ favicon.svg          浏览器标签页图标
│  └─ covers/              书籍封面图（SVG 占位图）
│
└─ src/
   ├─ main.jsx             程序入口
   ├─ App.jsx              路由表：网址与页面的对应关系
   │
   ├─ data/                【内容数据】改文字主要改这里
   │  ├─ site.js           网站名称、简介、导航、页脚
   │  ├─ readingNotes.js   共读档案的读书笔记
   │  ├─ lifeSlices.js     生活切片的示例留言与分类
   │  └─ psycheCards.js    心理便利贴的卡片
   │
   ├─ lib/                 【逻辑层】
   │  ├─ content.js        数据读取接口（未来换成 Supabase 就改这里）
   │  ├─ useContent.js     页面加载数据的通用 Hook
   │  └─ format.js         日期、文字等格式化小工具
   │
   ├─ components/          【可复用组件】
   │  ├─ Layout.jsx        页面骨架（页头 + 内容 + 页脚）
   │  ├─ SiteHeader.jsx    顶部导航（含手机端折叠菜单）
   │  ├─ SiteFooter.jsx    页脚
   │  ├─ ArticleBody.jsx   正文渲染（支持小标题、引文、列表）
   │  ├─ ReadingNoteCard.jsx / LifeSliceCard.jsx / PsycheCard.jsx  三种卡片
   │  ├─ PageHeader.jsx / DemoBadge.jsx / LoadingState.jsx 等
   │
   ├─ pages/               【页面】（一个文件对应一个网址）
   │  ├─ HomePage.jsx               /
   │  ├─ ReadingArchivePage.jsx     /reading
   │  ├─ ReadingNotePage.jsx        /reading/文章id
   │  ├─ LifeSlicesPage.jsx         /life
   │  ├─ LifeSliceSubmitPage.jsx    /life/submit
   │  ├─ PsycheNotesPage.jsx        /psyche
   │  ├─ PsycheNotePage.jsx         /psyche/卡片id
   │  └─ NotFoundPage.jsx           其他地址 → 404 页
   │
   └─ styles/
      ├─ tokens.css        配色、字体、间距等设计变量（改主题改这里）
      └─ base.css          基础样式与所有组件样式
```

---

## 三、第一次使用：先安装 Node.js

网站需要在电脑上运行一个叫 Node.js 的工具。只需要装一次。

1. 打开 <https://nodejs.org/zh-cn>。
2. 下载左边的 **LTS（长期支持）版本**，Windows 选 `.msi` 安装包。
3. 双击安装，**一路点「下一步」即可**，不需要修改任何选项。
4. 安装完成后，**关掉所有已经打开的命令行窗口**，重新打开一个。
5. 验证是否成功：在命令行里输入下面这行并按回车，能看到版本号（例如 `v22.x.x`）就说明成功了。

   ```powershell
   node -v
   ```

如果提示「不是内部或外部命令」，说明第 4 步没有做：关掉命令行窗口，重新开一个再试一次。

---

## 四、在电脑上预览网站

先打开命令行（Windows 上推荐用 **PowerShell**），进入项目文件夹：

```powershell
cd "D:\学校\心协\SDU-Psychology-Website"
```

**第一次预览之前，需要先安装依赖**（只做一次，之后不用再执行）：

```powershell
npm install
```

**启动预览服务器**：

```powershell
npm run dev
```

看到类似 `Local: http://localhost:5173/` 的输出后，按住 `Ctrl` 点击那个网址，或者手动在浏览器里打开 <http://localhost:5173/>。

这个窗口要一直开着，网站才会运行。**按 `Ctrl + C` 可以停止**。

---

## 五、怎么修改网站内容

所有文字内容都在 `src/data/` 里，用记事本或 VS Code 打开就能改。

| 想改什么 | 改哪个文件 |
| --- | --- |
| 网站名称、简介、导航栏目、页脚 | `src/data/site.js` |
| 读书笔记（标题、书名、封面、日期、摘要、正文） | `src/data/readingNotes.js` |
| 留言墙的示例内容与分类 | `src/data/lifeSlices.js` |
| 心理便利贴卡片 | `src/data/psycheCards.js` |
| 配色、字体、间距 | `src/styles/tokens.css` |

### 几个容易踩的小坑

- 文字要用**英文的双引号或单引号**包起来，例如 `'这是一段文字'`。中文的 `''` 和 `""` 会报错。
- 每一条内容后面的逗号 `,` 不要漏掉。
- 正文段落是「数组」，写成 `['第一段', '第二段']` 的形式。
- 正文里可以用三种简易写法：`'## 小标题'` 表示小标题，`'> 引文'` 表示引文块，`'- 列表项'` 表示列表。
- 想在正文里加粗，用两个星号包住，例如 `'**重点内容**'`。
- 图片放在 `public/` 下（例如 `public/covers/`），代码里写 `/covers/文件名.svg`。

改完之后，浏览器里的页面会自动刷新，不用重启。

### 新增一篇文章 / 一张卡片

1. 在对应的数据文件里，复制一整个 `{ ... }` 块。
2. 粘贴到数组里，把 `id` 改成新的英文短名（不要重复），其他字段改成你的内容。
3. 保存。文章地址会自动变成 `/reading/新的id`。

---

## 六、构建：检查能不能正式部署

部署之前，可以在本地先验证一遍：

```powershell
npm run build
```

如果最后出现 `✓ built in ...`，说明构建成功。生成的 `dist` 文件夹就是将来要部署的成品。

想在本机预览「构建后的成品」（更接近线上真实效果）：

```powershell
npm run preview
```

然后打开它提示的地址（通常是 <http://localhost:4173/>）。

**如果 `npm run build` 报错**，通常是数据文件里少了逗号、括号不配对，或者引号用成了中文引号。报错信息里会指出是哪个文件第几行，照着那几行检查即可。

---

## 七、部署到 Cloudflare（让全校同学都能访问）

部署之后你会得到一个形如 `https://sdu-psychology-website.你的子域.workers.dev` 的公开网址，可以直接生成二维码发给同学。

**做法：GitHub + Cloudflare 自动部署。** 好处是以后你在本地改完内容，只要推送到 GitHub，网站会自动重新构建上线，不需要手动上传文件。

> **关于 Pages 与 Workers**：Cloudflare 正在把原来的 Pages 产品合并进 Workers。新账号在控制台里可能已经找不到 Pages 入口，只能走 Workers。两者都能托管这个网站、都属于免费额度，本项目已经配好了 Workers 需要的 `wrangler.jsonc`，照着下面的步骤做即可。

### 第一步：把项目上传到 GitHub

1. 注册 / 登录 <https://github.com>。
2. 点右上角 `+` → `New repository`，仓库名填 `SDU-Psychology-Website`，选 **Public** 或 **Private** 都可以。
3. **不要**勾选 "Add a README file"，直接点 `Create repository`。
4. 在本项目文件夹里打开 PowerShell，依次执行（把 `你的用户名` 换成你的 GitHub 用户名）：

   ```powershell
   git init -b main
   git add .
   git commit -m "第一版网站"
   git remote add origin https://github.com/你的用户名/SDU-Psychology-Website.git
   git push -u origin main
   ```

   第一次执行 `git push` 时会弹出登录窗口，按提示用浏览器授权即可。

### 第二步：在 Cloudflare 上连接这个仓库

1. 打开 <https://dash.cloudflare.com/>，注册 / 登录（免费，不需要信用卡）。
2. 左侧菜单点 **Compute**，进入 **Workers & Pages** 页面。
3. 点右上角 **Create application** → **Continue with GitHub**。
4. 授权 GitHub：选 **Only select repositories**，勾选本项目仓库，点 `Install & Authorize`。
5. 回到 Cloudflare，选中本项目仓库，点 **Next**。
6. 在「Set up your application」页面确认这三项：

   | 设置项 | 填写内容 |
   | --- | --- |
   | Project name | `sdu-psychology-website`（必须与 `wrangler.jsonc` 里的 `name` 一致） |
   | Build command | `npm run build` |
   | Deploy command | `npx wrangler deploy`（保持默认，不要修改） |

7. 点 **Deploy**，等一两分钟，就会出现你的公开网址。

### 为什么需要 wrangler.jsonc

`wrangler.jsonc` 告诉 Cloudflare 三件事：这个项目是纯静态网站、构建产物在 `dist` 目录、以及遇到不存在的网址时统一交给 `index.html` 处理（这样同学直接点开 `/psyche/flow` 这类子页面也能正常打开）。**不要删除这个文件**，也不要修改里面的 `name` 字段。

> **一个容易踩的坑**：Cloudflare 会自动处理 `.html` 和 `/index` 后缀，所以**不要**在 `public/` 目录下新建 `_redirects` 文件、写 `/* /index.html 200` 这类回退规则。那会和 Cloudflare 的自动处理互相触发，部署时报「Infinite loop detected」错误。子页面回退已经由 `wrangler.jsonc` 负责，不需要再手动配置。

### 以后怎么更新内容

在本地改好 `src/data/` 里的内容，然后：

```powershell
git add .
git commit -m "更新读书笔记"
git push
```

Cloudflare 检测到更新后会自动重新部署，大约一分钟后线上就更新了。

### 备用做法：直接上传文件夹

如果你暂时不想用 GitHub：执行 `npm run build`，然后在 Cloudflare 里选 **Upload your static files**，把 `dist` 文件夹拖进去即可。缺点是每次更新都要手动上传，而且得到的网址和自动部署的不一样。

---

## 八、后续怎么接入数据库（Supabase）

第一版刻意把所有数据读取都集中在一个文件里：`src/lib/content.js`。

里面的每个函数都写好了「未来会是什么样」的注释，例如：

```js
export async function listReadingNotes() {
  // 未来：return supabase.from('reading_notes').select('*').order('updated_at', { ascending: false })
  return [...readingNotes].sort(...)
}
```

接入步骤大致是：

1. 在 <https://supabase.com> 建一个免费项目。
2. 建三张表：`reading_notes`、`life_slices`、`psyche_cards`，字段名和数据文件保持一致。
3. 安装客户端：`npm install @supabase/supabase-js`。
4. 把 `src/lib/content.js` 里每个函数的实现换成 Supabase 查询。**页面代码完全不用改**，因为页面只调用这些函数、不直接读数据文件。
5. Supabase 的网址和密钥要放在环境变量里（`.env.local`，已在 `.gitignore` 中排除，不会上传到 GitHub），在 Cloudflare Pages 的 `Settings → Environment variables` 里配置。

### 关于投稿审核

投稿审核的基础是 `life_slices` 表上有一个 `status` 字段（`pending` / `approved` / `rejected`）：

- 公开页面的查询要加上 `.eq('status', 'approved')`，保证未审核内容不会出现在留言墙上。
- 投稿页提交时写入 `status: 'pending'`。
- 管理员后台只在能看到 `pending` 内容的前提下才有意义，因此建议第二步再做管理员登录。

另外还需要在 Supabase 里配置**行级安全策略（RLS）**，否则任何人都能读取或修改数据。这一部分涉及安全，建议等接入数据库时再单独处理，不要跳过。

---

## 九、当前版本的已知限制

- 所有内容都是示例数据，保存在代码文件里，改内容需要重新部署。
- 投稿不会真正发送，只提供本地预览。
- 没有用户账号、没有管理员后台、没有评论功能。
- 心理便利贴的内容是示例；正式发布前建议由学术部内部复核，确认表述与来源无误。

---

## 十、常用命令速查

| 命令 | 作用 |
| --- | --- |
| `npm install` | 安装依赖（第一次使用，或更新依赖后执行） |
| `npm run dev` | 启动本地预览，改代码自动刷新 |
| `npm run build` | 构建出可部署的 `dist` 文件夹 |
| `npm run preview` | 在本地预览构建后的成品 |

按 `Ctrl + C` 可以停止正在运行的命令。

---

维护：山东大学学生心理协会学术部
