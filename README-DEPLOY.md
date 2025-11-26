# 部署检查清单

在部署到 Cloudflare Pages 之前，请确认：

## ✅ 代码准备

- [ ] 代码已推送到 Git 仓库（GitHub/GitLab/Bitbucket）
- [ ] 所有依赖都在 `package.json` 中
- [ ] `.env.local` 文件已添加到 `.gitignore`（不会提交到仓库）

## ✅ 环境变量

准备以下环境变量（在 Cloudflare Pages 设置中配置）：

### 必需
- [ ] `NEXT_PUBLIC_BASE_URL=https://kuaizhixiang.com`

### 可选（如果使用）
- [ ] `STRIPE_SECRET_KEY`（生产环境密钥）
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`（生产环境密钥）
- [ ] `SENDGRID_API_KEY` 或 `RESEND_API_KEY`（如果使用邮件服务）

## ✅ 域名配置

- [ ] 域名 `kuaizhixiang.com` 已在 Cloudflare 管理
- [ ] DNS 记录已配置（Cloudflare Pages 会自动处理）
- [ ] SSL 证书会自动配置（Cloudflare 免费提供）

## ✅ 测试

部署前在本地测试：

```bash
cd paperboxproject
npm install
npm run build
npm start
```

访问 http://localhost:3000 确保一切正常。

## 🚀 开始部署

按照 `cloudflare-deploy.md` 中的步骤操作。

