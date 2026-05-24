# xuedda-next

薛大大生态设计本地化重构项目。当前版本先采用：

- Next.js 16 + TypeScript
- Tailwind CSS 4
- Prisma
- SQLite（本地开发；后续可切 PostgreSQL）
- 自研后台优先，后续可接 Payload CMS

## 启动

1. 安装依赖

```bash
npm install
```

2. 复制环境变量

```bash
copy .env.example .env
```

3. 配置环境变量

`.env`

```env
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="请换成强密码"
```

4. 初始化 Prisma

```bash
npx prisma generate
npx prisma db push
```

5. 启动开发环境

```bash
npm run dev
```

## 当前结构

- `src/app`：Next App Router 入口
- `src/components/home`：首页组件
- `src/lib/site-data.ts`：首页静态演示数据
- `src/lib/prisma.ts`：Prisma 客户端
- `prisma/schema.prisma`：基础内容模型

## 当前阶段策略

- 先把前台页面和数据模型跑通
- 再迁移原站栏目、资源、教程、会员逻辑
- 后续再决定后台走 Payload 还是继续自研
