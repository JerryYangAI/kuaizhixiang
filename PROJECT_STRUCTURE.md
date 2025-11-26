# 项目结构说明

## 纸箱电商网站项目文件已成功移动到 `paperboxproject` 文件夹

### 项目文件结构

```
paperboxproject/
├── app/                          # Next.js App Router
│   ├── [locale]/                 # 多语言路由
│   │   ├── page.tsx              # 首页
│   │   ├── layout.tsx            # 布局
│   │   ├── products/             # 产品页面
│   │   ├── cart/                 # 购物车
│   │   ├── checkout/             # 结账
│   │   ├── faq/                  # 常见问题
│   │   ├── support/              # 支持/联系
│   │   ├── about/                # 关于我们
│   │   └── order/                # 订单确认
│   ├── api/                      # API路由
│   │   ├── create-checkout-session/  # Stripe支付
│   │   └── contact/              # 联系表单
│   ├── layout.tsx                # 根布局
│   └── globals.css               # 全局样式
├── components/                   # React组件
│   ├── Header.tsx                # 头部导航
│   ├── Footer.tsx                # 页脚
│   ├── LanguageSwitcher.tsx      # 语言切换器
│   ├── SearchModal.tsx           # 搜索模态框
│   └── FAQAccordion.tsx          # FAQ手风琴
├── data/                         # 数据文件
│   └── products.ts               # 产品数据
├── messages/                     # 多语言翻译
│   ├── zh.json                   # 中文
│   ├── ja.json                   # 日语
│   └── en.json                   # 英语
├── store/                        # 状态管理
│   └── cart.ts                   # 购物车状态
├── types/                        # TypeScript类型
│   └── product.ts                # 产品类型定义
├── public/                       # 静态资源
├── i18n.ts                       # i18n配置
├── middleware.ts                 # Next.js中间件
├── package.json                  # 项目依赖
├── next.config.js                # Next.js配置
├── tsconfig.json                 # TypeScript配置
├── tailwind.config.js            # Tailwind配置
├── postcss.config.js             # PostCSS配置
├── .gitignore                    # Git忽略文件
└── README.md                     # 项目说明文档
```

### 下一步操作

1. **进入项目文件夹**:
   ```bash
   cd paperboxproject
   ```

2. **安装依赖**:
   ```bash
   npm install
   ```

3. **配置环境变量**:
   - 创建 `.env.local` 文件
   - 添加 Stripe API 密钥（参考 README.md）

4. **运行开发服务器**:
   ```bash
   npm run dev
   ```

5. **访问网站**:
   - 中文: http://localhost:3000/zh
   - 日语: http://localhost:3000/ja
   - 英语: http://localhost:3000/en

### 注意事项

- 所有新项目的文件已移动到 `paperboxproject` 文件夹
- 原项目文件保持不变，可以继续使用
- 两个项目现在完全独立，互不干扰



