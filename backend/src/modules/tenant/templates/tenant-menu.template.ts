/** 菜单模板：插入时 parentId 用 idMap 映射 */
export interface MenuTemplateItem {
  id: number
  parentId: number | null
  path: string | null
  name: string
  permission: string | null
  type: number
  icon: string
  orderNo: number
  component: string | null
  keepAlive: number
  show: number
  status: number
  isExt: number
  extOpenMode: number
  activeMenu: string | null
}

/** 精简菜单模板：仪表盘、系统管理、用户、角色、菜单、部门 */
export const tenantMenuTemplate: MenuTemplateItem[] = [
  { id: 0, parentId: null, path: '/dashboard', name: '仪表盘', permission: '', type: 1, icon: 'ant-design:dashboard-outlined', orderNo: 255, component: 'dashboard/index', keepAlive: 0, show: 1, status: 1, isExt: 0, extOpenMode: 1, activeMenu: null },
  { id: 1, parentId: null, path: '/system', name: '系统管理', permission: '', type: 0, icon: 'ant-design:setting-outlined', orderNo: 254, component: '', keepAlive: 0, show: 1, status: 1, isExt: 0, extOpenMode: 1, activeMenu: null },
  { id: 2, parentId: 1, path: '/system/user', name: '用户管理', permission: 'system:user:list', type: 1, icon: 'ant-design:user-outlined', orderNo: 0, component: 'system/user/index', keepAlive: 0, show: 1, status: 1, isExt: 0, extOpenMode: 1, activeMenu: null },
  { id: 3, parentId: 1, path: '/system/role', name: '角色管理', permission: 'system:role:list', type: 1, icon: 'ep:user', orderNo: 1, component: 'system/role/index', keepAlive: 0, show: 1, status: 1, isExt: 0, extOpenMode: 1, activeMenu: null },
  { id: 4, parentId: 1, path: '/system/menu', name: '菜单管理', permission: 'system:menu:list', type: 1, icon: 'ep:menu', orderNo: 2, component: 'system/menu/index', keepAlive: 0, show: 1, status: 1, isExt: 0, extOpenMode: 1, activeMenu: null },
  { id: 5, parentId: 1, path: '/system/dept', name: '部门管理', permission: 'system:dept:list', type: 1, icon: 'ant-design:deployment-unit-outlined', orderNo: 3, component: 'system/dept/index', keepAlive: 0, show: 1, status: 1, isExt: 0, extOpenMode: 1, activeMenu: null },
  { id: 6, parentId: 2, path: null, name: '新增', permission: 'system:user:create', type: 2, icon: '', orderNo: 0, component: null, keepAlive: 0, show: 1, status: 1, isExt: 0, extOpenMode: 1, activeMenu: null },
  { id: 7, parentId: 2, path: '', name: '删除', permission: 'system:user:delete', type: 2, icon: '', orderNo: 0, component: '', keepAlive: 0, show: 1, status: 1, isExt: 0, extOpenMode: 1, activeMenu: null },
  { id: 8, parentId: 2, path: '', name: '更新', permission: 'system:user:update', type: 2, icon: '', orderNo: 0, component: '', keepAlive: 0, show: 1, status: 1, isExt: 0, extOpenMode: 1, activeMenu: null },
  { id: 9, parentId: 2, path: '', name: '查询', permission: 'system:user:read', type: 2, icon: '', orderNo: 0, component: '', keepAlive: 0, show: 1, status: 1, isExt: 0, extOpenMode: 1, activeMenu: null },
  { id: 10, parentId: 3, path: '', name: '新增', permission: 'system:role:create', type: 2, icon: '', orderNo: 0, component: '', keepAlive: 0, show: 1, status: 1, isExt: 0, extOpenMode: 1, activeMenu: null },
  { id: 11, parentId: 3, path: '', name: '删除', permission: 'system:role:delete', type: 2, icon: '', orderNo: 0, component: '', keepAlive: 0, show: 1, status: 1, isExt: 0, extOpenMode: 1, activeMenu: null },
  { id: 12, parentId: 3, path: '', name: '修改', permission: 'system:role:update', type: 2, icon: '', orderNo: 0, component: '', keepAlive: 0, show: 1, status: 1, isExt: 0, extOpenMode: 1, activeMenu: null },
  { id: 13, parentId: 3, path: '', name: '查询', permission: 'system:role:read', type: 2, icon: '', orderNo: 0, component: '', keepAlive: 0, show: 1, status: 1, isExt: 0, extOpenMode: 1, activeMenu: null },
  { id: 14, parentId: 4, path: null, name: '新增', permission: 'system:menu:create', type: 2, icon: '', orderNo: 0, component: null, keepAlive: 0, show: 1, status: 1, isExt: 0, extOpenMode: 1, activeMenu: null },
  { id: 15, parentId: 4, path: null, name: '删除', permission: 'system:menu:delete', type: 2, icon: '', orderNo: 0, component: null, keepAlive: 0, show: 1, status: 1, isExt: 0, extOpenMode: 1, activeMenu: null },
  { id: 16, parentId: 4, path: '', name: '修改', permission: 'system:menu:update', type: 2, icon: '', orderNo: 0, component: '', keepAlive: 0, show: 1, status: 1, isExt: 0, extOpenMode: 1, activeMenu: null },
  { id: 17, parentId: 4, path: null, name: '查询', permission: 'system:menu:read', type: 2, icon: '', orderNo: 0, component: null, keepAlive: 0, show: 1, status: 1, isExt: 0, extOpenMode: 1, activeMenu: null },
  { id: 18, parentId: 5, path: null, name: '新增', permission: 'system:dept:create', type: 2, icon: '', orderNo: 1, component: null, keepAlive: 0, show: 1, status: 1, isExt: 0, extOpenMode: 1, activeMenu: null },
  { id: 19, parentId: 5, path: null, name: '更新', permission: 'system:dept:update', type: 2, icon: '', orderNo: 2, component: null, keepAlive: 0, show: 1, status: 1, isExt: 0, extOpenMode: 1, activeMenu: null },
  { id: 20, parentId: 5, path: null, name: '删除', permission: 'system:dept:delete', type: 2, icon: '', orderNo: 3, component: null, keepAlive: 0, show: 1, status: 1, isExt: 0, extOpenMode: 1, activeMenu: null },
  { id: 21, parentId: 5, path: null, name: '查询', permission: 'system:dept:read', type: 2, icon: '', orderNo: 4, component: null, keepAlive: 0, show: 1, status: 1, isExt: 0, extOpenMode: 1, activeMenu: null },
]
