---
name: nest-admin-backend
description: NestJS 后端开发规范与模块架构。用于开发 Nest-admin 后端、新增接口、修改控制器、编写 Service、配置权限、数据库迁移时参考。
---

# Nest-admin 后端开发

## 模块架构

| 模块 | 路径 | 路由前缀 | 说明 |
|------|------|----------|------|
| AuthModule | modules/auth | /auth, /account | 登录、JWT、验证码 |
| SystemModule | modules/system | /system | 用户/角色/菜单/部门/字典/任务等 |
| ToolsModule | modules/tools | - | 上传/存储/邮件 |
| NetdiskModule | modules/netdisk | - | 网盘 |
| SseModule | modules/sse | /sse | SSE 推送 |
| HealthModule | modules/health | /health | 健康检查 |
| TasksModule | modules/tasks | - | Bull 定时任务 |
| TodoModule | modules/todo | /todos | 待办示例 |

## 控制器模板

```typescript
import { definePermission, Perm } from '~/modules/auth/decorators/permission.decorator'
import { ApiResult } from '~/common/decorators/api-result.decorator'
import { IdParam } from '~/common/decorators/id-param.decorator'
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator'

export const permissions = definePermission('module:resource', {
  LIST: 'list', CREATE: 'create', READ: 'read', UPDATE: 'update', DELETE: 'delete',
} as const)

@ApiTags('模块 - 资源')
@ApiSecurityAuth()
@Controller('resources')
export class ResourceController {
  @Get()
  @ApiResult({ type: [Entity], isPage: true })
  @Perm(permissions.LIST)
  async list(@Query() dto: QueryDto) { ... }

  @Get(':id')
  @Perm(permissions.READ)
  async read(@IdParam() id: number) { ... }

  @Post()
  @Perm(permissions.CREATE)
  async create(@Body() dto: CreateDto) { ... }

  @Put(':id')
  @Perm(permissions.UPDATE)
  async update(@IdParam() id: number, @Body() dto: UpdateDto) { ... }

  @Delete(':id')
  @Perm(permissions.DELETE)
  async delete(@Param('id', ParseArrayPipe) ids: number[]) { ... }
}
```

## 装饰器速查

| 装饰器 | 用途 |
|-------|------|
| `@Perm(permission)` | 需对应权限 |
| `@Public()` | 无需登录 |
| `@AllowAnon()` | 需登录但无需权限 |
| `@ApiResult({ type, isPage })` | Swagger + 统一响应 |
| `@IdParam()` | 路径 id 校验 |

## 响应格式

- 成功：`{ code: 0, message, data }`
- 分页：`{ items, meta: { itemCount, totalItems, itemsPerPage, totalPages, currentPage } }`
- 异常：`throw new BusinessException(ErrorEnum.XXX)`

## 数据库迁移

```bash
cd backend
pnpm build
pnpm migration:generate -- -n MigrationName
pnpm migration:run
```

## 参考

- 规则：`.cursor/rules/02-backend.mdc`
- 文档：`backend/documentation/` 或 http://localhost:7001/api-docs/
