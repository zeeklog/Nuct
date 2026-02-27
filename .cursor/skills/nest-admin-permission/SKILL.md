---
name: nest-admin-permission
description: Nest-admin 权限与菜单配置。用于配置 RBAC 权限、菜单、按钮权限、definePermission、sys_menu 时参考。
---

# Nest-admin 权限与菜单

## 权限格式

`module:resource:action`，如 `system:user:list`、`system:user:create`。

## 后端 definePermission

```typescript
// 对象形式
definePermission('system:user', {
  LIST: 'list', CREATE: 'create', READ: 'read', UPDATE: 'update', DELETE: 'delete',
} as const)

// 数组形式
definePermission('system:online', ['list', 'kick'] as const)
```

## 装饰器

| 装饰器 | 说明 |
|-------|------|
| `@Perm(permission)` | 需此权限 |
| `@Public()` | 无需登录 |
| `@AllowAnon()` | 需登录但无需权限 |

## sys_menu 结构

- `type`：0=目录、1=菜单、2=按钮
- `permission`：权限标识，按钮必填
- `component`：前端组件路径，如 `system/user/index`
- `path`：路由路径

## 前端权限

```typescript
const { hasPermission } = usePermission()
hasPermission('system:user:create')  // 按钮显隐
```

## 多租户

若启用多租户，实体需 `tenant_id`，租户初始化见 `tenant-init.mdc`。

## 参考

- 规则：`.cursor/rules/01-data-design.mdc`、`tenant-init.mdc`
