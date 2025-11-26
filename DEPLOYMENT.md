# Cloudflare Pages 部署指南

## 部署步骤

### 1. 准备代码仓库

确保代码已推送到 Git 仓库（GitHub、GitLab 或 Bitbucket）。

### 2. 在 Cloudflare Pages 创建项目

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **Pages** 部分
3. 点击 **Create a project**
4. 选择 **Connect to Git**
5. 授权 Cloudflare 访问您的 Git 仓库
6. 选择包含此项目的仓库

### 3. 配置构建设置

在 Cloudflare Pages 项目设置中配置：

**Framework preset**: Next.js (Static HTML Export) 或 Next.js

**Build command**: 
```bash
npm run build
```

**Build output directory**: 
```
.next
```

**Root directory**: 
```
paperboxproject
```

**Node version**: 
```
20.x
```

### 4. 环境变量配置

在 Cloudflare Pages 项目设置中添加以下环境变量：

#### 必需的环境变量：

```
NEXT_PUBLIC_BASE_URL=https://kuaizhixiang.com
```

#### Stripe 支付配置（如果使用）：

```
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

⚠️ **注意**: 
- 使用生产环境的 Stripe 密钥（sk_live_ 和 pk_live_）
- 不要使用测试密钥（sk_test_ 和 pk_test_）

#### 邮件服务配置（可选）：

```
SENDGRID_API_KEY=...
# 或
RESEND_API_KEY=...
```

### 5. 自定义域名配置

1. 在 Cloudflare Pages 项目设置中，进入 **Custom domains**
2. 点击 **Set up a custom domain**
3. 输入域名：`kuaizhixiang.com`
4. Cloudflare 会自动配置 DNS 记录

### 6. DNS 配置

如果域名已经在 Cloudflare 管理：

1. 进入 Cloudflare Dashboard 的 **DNS** 部分
2. 确保有以下记录：
   - 类型：`CNAME`
   - 名称：`@` 或 `www`
   - 目标：`your-project.pages.dev`（Cloudflare Pages 提供的默认域名）

Cloudflare Pages 会自动处理 SSL 证书。

### 7. 部署

1. 推送代码到 Git 仓库
2. Cloudflare Pages 会自动检测并开始构建
3. 构建完成后，网站将自动部署

### 8. 验证部署

访问以下地址验证：
- https://kuaizhixiang.com
- https://www.kuaizhixiang.com

## 注意事项

1. **Next.js 14 在 Cloudflare Pages**: 
   - Cloudflare Pages 现在支持 Next.js，但某些功能可能需要额外配置
   - API Routes 需要 Edge Runtime 支持

2. **环境变量**:
   - 确保所有敏感信息都通过环境变量配置
   - 不要将 `.env.local` 文件提交到 Git

3. **构建优化**:
   - 确保 `package.json` 中的依赖都是最新版本
   - 构建前运行 `npm install` 确保依赖正确

4. **多语言路由**:
   - Next.js 的国际化路由在 Cloudflare Pages 上应该可以正常工作
   - 确保 `middleware.ts` 配置正确

## 故障排除

### 构建失败

1. 检查构建日志中的错误信息
2. 确保 Node.js 版本正确（推荐 20.x）
3. 检查环境变量是否正确配置

### 域名无法访问

1. 检查 DNS 记录是否正确
2. 等待 DNS 传播（可能需要几分钟到几小时）
3. 检查 SSL 证书是否已自动配置

### API Routes 不工作

1. 确保 API Routes 使用 Edge Runtime（如果需要）
2. 检查 Cloudflare Pages Functions 配置

## 后续维护

1. **自动部署**: 每次推送到主分支都会自动触发部署
2. **预览部署**: 每个 Pull Request 都会创建预览部署
3. **回滚**: 可以在 Cloudflare Pages 中回滚到之前的部署版本

