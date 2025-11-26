# 快纸箱 (kuaizhixiang.com)

一个为关西地区（大阪、京都、神户等）提供标准尺寸纸箱的多语言电商网站。

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **国际化**: next-intl
- **状态管理**: Zustand
- **支付**: Stripe Checkout
- **图标**: Lucide React

## 功能特性

- ✅ 多语言支持（简体中文、日语、英语）
- ✅ 产品列表和详情页
- ✅ 购物车功能
- ✅ 结账流程（Stripe集成）
- ✅ 响应式设计（桌面和移动端）
- ✅ 产品搜索和筛选
- ✅ FAQ、支持、关于页面

## 快速开始

### 安装依赖

```bash
npm install
```

### 环境变量配置

创建 `.env.local` 文件并添加以下变量：

```env
# Stripe配置
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# 可选：邮件服务配置（用于联系表单）
# SENDGRID_API_KEY=...
# 或
# RESEND_API_KEY=...
```

### 运行开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看网站。

### 构建生产版本

```bash
npm run build
npm start
```

## 项目结构

```
├── app/
│   ├── [locale]/              # 多语言路由
│   │   ├── page.tsx           # 首页
│   │   ├── products/          # 产品相关页面
│   │   ├── cart/              # 购物车
│   │   ├── checkout/          # 结账
│   │   ├── faq/               # 常见问题
│   │   ├── support/           # 支持/联系
│   │   └── about/             # 关于我们
│   └── api/                   # API路由
│       ├── create-checkout-session/  # Stripe结账会话
│       └── contact/           # 联系表单
├── components/                # 可复用组件
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── LanguageSwitcher.tsx
│   └── ...
├── data/                      # 数据文件
│   └── products.ts            # 产品数据（可替换为数据库）
├── messages/                  # 多语言翻译文件
│   ├── zh.json
│   ├── ja.json
│   └── en.json
├── store/                     # 状态管理
│   └── cart.ts                # 购物车状态
├── types/                     # TypeScript类型定义
│   └── product.ts
├── i18n.ts                    # i18n配置
└── middleware.ts              # Next.js中间件（处理语言路由）
```

## 添加新产品

编辑 `data/products.ts` 文件，在 `PRODUCTS` 数组中添加新产品对象：

```typescript
{
  id: 'unique-id',
  slug: 'product-slug',
  name: {
    zh: '中文名称',
    ja: '日本語名',
    en: 'English Name',
  },
  description: {
    zh: '中文描述',
    ja: '日本語説明',
    en: 'English description',
  },
  sizeCode: 80,
  dimensions: {
    length: 40,
    width: 30,
    height: 30,
  },
  weightCapacity: 15,
  thickness: 5,
  hasHandHoles: true,
  usageCategories: ['moving', 'ecommerce'],
  price: 200,
  isHot: false,
  isNew: true,
  mainImage: 'https://...',
  galleryImages: ['https://...'],
  material: 'Corrugated cardboard',
  suitableFor: '宅急便 80 size',
}
```

**注意**: 未来可以轻松迁移到数据库（如Prisma + PostgreSQL）或外部API。

## 添加翻译

编辑 `messages/` 目录下对应的语言文件（`zh.json`, `ja.json`, `en.json`）。

所有UI文本都应该通过翻译键访问，例如：

```tsx
const t = useTranslations('common');
<p>{t('addToCart')}</p>
```

## Stripe支付集成

### 设置Stripe账户

1. 在 [Stripe Dashboard](https://dashboard.stripe.com) 创建账户
2. 获取测试API密钥（Test Mode）
3. 将密钥添加到 `.env.local`

### 测试支付

使用Stripe测试卡号：
- 成功: `4242 4242 4242 4242`
- 需要3D验证: `4000 0025 0000 3155`
- 拒绝: `4000 0000 0000 0002`

更多测试卡号: https://stripe.com/docs/testing

### 生产环境

1. 切换到Stripe Live Mode
2. 更新环境变量为生产密钥
3. 配置Webhook（可选，用于订单状态更新）

## Alipay集成（待实现）

当前Alipay支付选项为占位符。集成选项：

1. **通过Stripe**: 如果Stripe账户支持Alipay，可以在Stripe Checkout中启用
2. **直接集成**: 使用Alipay官方SDK或第三方服务

相关代码位置：
- `app/[locale]/checkout/page.tsx` - 支付方法选择
- `app/api/create-checkout-session/route.ts` - 支付会话创建

## 数据库迁移（未来）

当前产品数据存储在 `data/products.ts`。迁移到数据库的步骤：

1. 安装Prisma: `npm install prisma @prisma/client`
2. 初始化: `npx prisma init`
3. 定义schema（参考 `types/product.ts`）
4. 迁移数据
5. 更新 `data/products.ts` 中的函数以使用Prisma查询

## 部署

### Vercel（推荐）

1. 推送代码到GitHub
2. 在Vercel导入项目
3. 添加环境变量
4. 部署

### 其他平台

项目支持任何支持Next.js的平台（Netlify, AWS, etc.）。

## 待办事项

- [ ] 实现Alipay支付集成
- [ ] 添加邮件发送功能（订单确认、联系表单）
- [ ] 实现用户账户系统
- [ ] 添加产品评论功能
- [ ] 实现优惠券系统
- [ ] 添加库存管理
- [ ] 迁移到数据库
- [ ] 添加管理后台
- [ ] 实现订单跟踪
- [ ] 添加多图片上传功能

## 许可证

私有项目 - 保留所有权利

## 联系方式

- 网站: kuaizhixiang.com
- 邮箱: yangguang8666@gmail.com
