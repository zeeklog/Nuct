# Nuct

![](https://img.shields.io/github/commit-activity/m/zeeklog/nuct) ![](https://img.shields.io/github/license/zeeklog/nuct) ![](https://img.shields.io/github/repo-size/zeeklog/nuct) ![](https://img.shields.io/github/languages/top/zeeklog/nuct)

**基于 NestJs + TypeScript + TypeORM + Redis + MySql + Vue3 + Ant Design Vue 编写的一款前后端分离的、支持多租户的、支持RABC权限管理的企业级快速开发脚手架。希望这个项目在全栈的路上能够帮助到你。**

- 中小型应用开发、接私活快速开发神器
- 已配置Cursor rules，接入AI进行快速开发交付

## 项目结构

```
nuct/
├── backend/          # 后端服务 (NestJS + TypeORM + Redis + MySQL)
├── frontend/         # 前端应用 (Vue3 + Vite + Ant Design Vue)
└── README.md
```

### 技术栈

| 层级 | 技术 |
| :--: | :-- |
| 后端 | NestJS、TypeScript、TypeORM、Redis、MySQL |
| 前端 | Vue3、Vite5、Ant Design Vue4、TypeScript5 |

## 快速链接

- 账号：`admin`，密码：`a123456`
- [在线预览](http://nuct.cn)
- [项目文档](https://buqiyuan.github.io/vue3-antdv-admin-docs/)
- [Nuct 项目仓库](https://github.com/zeeklog/nuct)（部署后访问 `/api-docs/` 查看 Swagger 文档）
- [Gitee 地址](https://gitee.com/zeeklog/nuct)

## 演示地址

- https://nuct.cn

## 环境要求

- `nodejs` 20+
- `docker` 20.x+（`docker compose` 需 2.17.0+）
- `mysql` 8.x+
- [`pnpm`](https://pnpm.io/zh/) 包管理器

## 快速体验（Docker）

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

## 本地开发

### 1. 获取项目代码

```bash
git clone https://github.com/zeeklog/nuct
cd nuct
```

### 2. 准备工作

- **数据库**：执行 [backend/deploy/sql/nest_admin.sql](backend/deploy/sql/nest_admin.sql) 初始化
- **配置**：参考 `backend/.env`、`backend/.env.development`、`backend/.env.production` 配置 MySQL 和 Redis

可选：使用 Docker 启动 MySQL/Redis 供本地开发：

```bash
cd backend
docker compose --env-file .env --env-file .env.development run -d --service-ports mysql
docker compose --env-file .env --env-file .env.development run -d --service-ports redis
```

### 3. 启动后端

```bash
cd backend
pnpm install
pnpm migration:run   # 数据库迁移
pnpm dev
```

### 4. 启动前端

```bash
cd frontend
pnpm install
pnpm dev
```

### 5. 访问

- 前端：<http://localhost:8088/>
- 后端 Swagger：<http://localhost:7001/api-docs/>

## 子项目说明

| 目录 | 说明 | 详细文档 |
| :-- | :-- | :-- |
| [backend/](backend/) | NestJS 后端服务 | [backend/README.md](backend/README.md) |
| [frontend/](frontend/) | Vue3 后台管理前端 | [frontend/README.md](frontend/README.md) |

## 数据库迁移

在 `backend` 目录下执行：

```bash
pnpm migration:run      # 更新/初始化数据库
pnpm migration:generate # 生成迁移
pnpm migration:revert   # 回滚
```

> 若实体类或数据库配置有更新，请先执行 `pnpm build` 再进行迁移。

## 系统截图

![](https://s1.ax1x.com/2021/12/11/oTi1nf.png)
![](https://s1.ax1x.com/2021/12/11/oTithj.png)
![](https://s1.ax1x.com/2021/12/11/oTirHU.png)
![](https://s1.ax1x.com/2021/12/11/oTia3n.png)

## 贡献

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

## 致谢

基于buqiyuan开源的Nest_admin二次开发租户隔离

- [vue3-antdv-admin](https://github.com/buqiyuan/vue3-antdv-admin) - 前端模板
- [sf-nest-admin](https://github.com/hackycy/sf-nest-admin)

## LICENSE

[MIT](LICENSE)
