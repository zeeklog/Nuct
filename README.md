
# Nuct

<p align="center">
  <img src="examples/image-1.png" alt="Nuct Logo" width="120" />
</p>

## 你只需要关注业务，将基础设施交给Nuct！

<p align="center">
  <strong>基于 NestJs +Vue3的企业级前后端分离快速开发脚手架</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/github/commit-activity/m/zeeklog/nuct" alt="Commit activity" />
  <img src="https://img.shields.io/github/license/zeeklog/nuct" alt="License" />
  <img src="https://img.shields.io/github/repo-size/zeeklog/nuct" alt="Repo size" />
  <img src="https://img.shields.io/github/languages/top/zeeklog/nuct" alt="Top language" />
</p>

---

**一款前后端分离、支持多租户与 RBAC 权限管理的企业级快速开发脚手架，希望能在你的全栈之路上提供助力。**

- 中小型应用的快速开发神器
- 已配置 Cursor Rules，可接入 AI 辅助快速开发和交付

## 目录 📚

- [项目概览](#项目概览)
- [目录结构](#目录结构)
- [技术栈](#技术栈)
- [快速链接](#快速链接)
- [演示地址](#演示地址)
- [环境要求](#环境要求)
- [快速开始](#快速开始)
  - [Docker 快速体验](#docker-快速体验)
  - [本地开发](#本地开发)
- [子项目说明](#子项目说明)
- [数据库迁移](#数据库迁移)
- [系统截图](#系统截图)
- [贡献](#贡献)
  - [Git 提交规范](#git-提交规范)
- [致谢](#致谢)
- [LICENSE](#license)

## 项目概览 ✨

- 默认账号：`admin`，密码：`a123456` 🔑
- 支持多租户隔离、RBAC 权限控制，适合中后台管理系统、SaaS 平台等场景

## 目录结构 🧱

```
nuct/
├── backend/          # 后端服务 (NestJS + TypeORM + Redis + MySQL)
├── frontend/         # 前端应用 (Vue3 + Vite + Ant Design Vue)
└── README.md
```

## 技术栈 🛠

| 层级 | 技术 |
| :--: | :-- |
| 后端 | NestJS、TypeScript、TypeORM、Redis、MySQL |
| 前端 | Vue3、Vite5、Ant Design Vue4、TypeScript5 |

## 快速链接 🔗

- **在线预览**：<http://nuct.cn>
- **项目文档**：<https://buqiyuan.github.io/vue3-antdv-admin-docs/>
- **GitHub 仓库**：<https://github.com/zeeklog/nuct>（部署后访问 `/api-docs/` 查看 Swagger 文档）
- **Gitee 仓库**：<https://gitee.com/zeeklog/nuct>

## 演示地址 🌐

- <https://nuct.cn>

## 环境要求 📦

- `nodejs` 20+
- `docker` 20.x+（`docker compose` 需 2.17.0+）
- `mysql` 8.x+
- [`pnpm`](https://pnpm.io/zh/) 包管理器

## 快速开始 🚀

### Docker 快速体验

```bash
cd backend
pnpm docker:up
# 或
docker compose --env-file .env --env-file .env.production up -d --no-build
```

启动成功后访问：

- 后端 API 文档：<http://localhost:7001/api-docs/>

停止并删除容器：

```bash
cd backend
pnpm docker:down
```

### 本地开发

#### 1. 获取项目代码

```bash
git clone https://github.com/zeeklog/nuct
cd nuct
```

#### 2. 准备工作

- **数据库初始化**：执行 [backend/deploy/sql/nest_admin.sql](backend/deploy/sql/nest_admin.sql)
- **配置文件**：参考 `backend/.env`、`backend/.env.development`、`backend/.env.production` 配置 MySQL 和 Redis

可选：使用 Docker 启动 MySQL/Redis 供本地开发：

```bash
cd backend
docker compose --env-file .env --env-file .env.development run -d --service-ports mysql
docker compose --env-file .env --env-file .env.development run -d --service-ports redis
```

#### 3. 启动后端

```bash
cd backend
pnpm install
pnpm migration:run   # 数据库迁移
pnpm dev
```

#### 4. 启动前端

```bash
cd frontend
pnpm install
pnpm dev
```

#### 5. 访问

- 前端：<http://localhost:8088/>
- 后端 Swagger：<http://localhost:7001/api-docs/>

## 子项目说明 📁

| 目录 | 说明 | 详细文档 |
| :-- | :-- | :-- |
| [backend/](backend/) | NestJS 后端服务 | [backend/README.md](backend/README.md) |
| [frontend/](frontend/) | Vue3 后台管理前端 | [frontend/README.md](frontend/README.md) |

## 数据库迁移 🗄

在 `backend` 目录下执行：

```bash
pnpm migration:run      # 更新/初始化数据库
pnpm migration:generate # 生成迁移
pnpm migration:revert   # 回滚
```

> 若实体类或数据库配置有更新，请先执行 `pnpm build` 再进行迁移。

## 系统截图 📸

![](examples/image-1.png)
![](examples/image-2.png)

## 贡献 🤝

欢迎 Star 和 PR。

### Git 提交规范

参考 [Angular 规范](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular)：

- `feat` 新功能
- `fix` 修复 BUG
- `docs` 文档
- `style` 代码风格
- `refactor` 重构
- `perf` 性能优化
- `test` 测试
- `chore` 构建/依赖等

## 致谢 🙏

基于 buqiyuan 开源的 Nest_admin 二次开发租户隔离：

- [vue3-antdv-admin](https://github.com/buqiyuan/vue3-antdv-admin) - 前端模板
- [sf-nest-admin](https://github.com/hackycy/sf-nest-admin)

## LICENSE

[MIT](LICENSE)
