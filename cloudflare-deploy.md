# 快速部署到 Cloudflare Pages

## 方法一：通过 Cloudflare Dashboard（推荐）

### 步骤 1: 准备代码仓库

1. 确保代码已推送到 GitHub/GitLab/Bitbucket
2. 如果没有 Git 仓库，可以：
   ```bash
   cd paperboxproject
   git init
   git add .
   git commit -m "Initial commit"
   # 然后推送到 GitHub 等平台
   ```

### 步骤 2: 在 Cloudflare Pages 创建项目

1. 访问 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 点击左侧菜单的 **Pages**
3. 点击 **Create a project**
4. 选择 **Connect to Git**
5. 授权 Cloudflare 访问您的 Git 仓库
6. 选择包含 `paperboxproject` 的仓库

### 步骤 3: 配置构建设置

在项目设置页面填写：

- **Project name**: `kuaizhixiang`
- **Production branch**: `main` 或 `master`
- **Framework preset**: `Next.js`
- **Build command**: `npm run build`
- **Build output directory**: `.next`
- **Root directory**: `paperboxproject`（如果项目在子目录中）

### 步骤 4: 配置环境变量

在 **Environment variables** 部分添加：

```
NEXT_PUBLIC_BASE_URL=https://kuaizhixiang.com
```

如果使用 Stripe（生产环境）：
```
STRIPE_SECRET_KEY=sk_live_你的密钥
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_你的密钥
```

### 步骤 5: 配置自定义域名

1. 在项目设置中，进入 **Custom domains**
2. 点击 **Set up a custom domain**
3. 输入：`kuaizhixiang.com`
4. Cloudflare 会自动配置 DNS 和 SSL

### 步骤 6: 部署

1. 点击 **Save and Deploy**
2. 等待构建完成（通常 2-5 分钟）
3. 部署成功后，访问 https://kuaizhixiang.com

---

## 方法二：使用 Wrangler CLI

### 安装 Wrangler

```bash
npm install -g wrangler
```

### 登录 Cloudflare

```bash
wrangler login
```

### 部署

```bash
cd paperboxproject
npm run build
wrangler pages deploy .next --project-name=kuaizhixiang
```

---

## DNS 配置

如果域名在 Cloudflare 管理：

1. 进入 **DNS** 设置
2. 添加 CNAME 记录：
   - 名称：`@`（根域名）
   - 目标：`kuaizhixiang.pages.dev`（Cloudflare Pages 提供的默认域名）
   - 代理状态：已代理（橙色云朵）

或者添加 A 记录（如果 Cloudflare 自动配置了 IP）

---

## 验证部署

部署成功后，访问：
- https://kuaizhixiang.com
- https://www.kuaizhixiang.com
- https://kuaizhixiang.pages.dev（默认域名）

---

## 常见问题

### 构建失败

1. 检查 Node.js 版本（推荐 20.x）
2. 查看构建日志中的错误
3. 确保所有依赖都已安装

### 域名无法访问

1. 等待 DNS 传播（最多 24 小时）
2. 检查 DNS 记录是否正确
3. 确认 SSL 证书已自动配置

### API Routes 不工作

Cloudflare Pages 支持 Next.js API Routes，但可能需要：
- 确保使用 Edge Runtime（如果需要）
- 检查 Cloudflare Pages Functions 配置

---

## 后续更新

每次推送到主分支，Cloudflare Pages 会自动：
1. 检测代码变更
2. 重新构建
3. 部署新版本

您可以在 Cloudflare Dashboard 中查看部署历史和状态。

