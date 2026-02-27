---
name: nest-admin-crud
description: 在 Nest-admin 中新增 CRUD 模块的完整流程。用于添加新业务模块、实体、控制器、服务、权限、菜单、前端页面时参考。
---

# Nest-admin 新增 CRUD 模块

## 流程概览

1. 后端：Entity → DTO → Service → Controller → Module → 权限
2. 数据库：迁移
3. 后端：菜单与权限（sys_menu）
4. 前端：API → 路由 → 页面

## 1. 后端实体与 DTO

```typescript
// entity
@Entity('table_name')
export class XxxEntity extends BaseEntity {
  @Column() name: string
  // ...
}

// dto
export class XxxQueryDto extends PaginationDto { ... }
export class XxxDto { ... }
export class XxxUpdateDto extends PartialType(XxxDto) {}
```

## 2. Service

```typescript
@Injectable()
export class XxxService {
  constructor(
    @InjectRepository(XxxEntity) private repo: Repository<XxxEntity>,
  ) {}
  async list(dto: XxxQueryDto) { ... }
  async info(id: number) { ... }
  async create(dto: XxxDto) { ... }
  async update(id: number, dto: XxxUpdateDto) { ... }
  async delete(ids: number[]) { ... }
}
```

## 3. Controller

参考 `nest-admin-backend` skill 的控制器模板，使用 `definePermission` + `@Perm`。

## 4. Module 注册

- 系统模块：在 `SystemModule` 的 `modules` 数组中添加，路由自动带 `/system`
- 独立模块：在 `AppModule` 的 `imports` 中添加

## 5. 数据库迁移

```bash
cd backend && pnpm build && pnpm migration:generate -- -n AddXxx && pnpm migration:run
```

## 6. 菜单与权限

在 `sys_menu` 中插入菜单记录，`permission` 格式：`module:resource:action`，如 `system:xxx:list`。

## 7. 前端

- `src/api/xxx.ts`：封装接口
- `src/router/routes/modules/xxx.ts`：路由
- `src/views/xxx/index.vue`：页面，使用 `BasicTable` + `BasicForm` + `BasicModal`

## 参考

- 示例：`modules/user`、`modules/system/role`
- 规则：`.cursor/rules/02-backend.mdc`、`03-frontend.mdc`
