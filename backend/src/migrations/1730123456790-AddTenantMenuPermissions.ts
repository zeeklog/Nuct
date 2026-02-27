import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddTenantMenuPermissions1730123456790 implements MigrationInterface {
  name = 'AddTenantMenuPermissions1730123456790'

  public async up(queryRunner: QueryRunner): Promise<void> {
    const [tenantMenu] = await queryRunner.query(
      `SELECT id FROM sys_menu WHERE path = '/system/tenant' AND tenant_id = 1 LIMIT 1`,
    )
    const parentId = (tenantMenu as any)?.id
    if (!parentId) return

    const buttons = [
      { name: '新增', permission: 'system:tenant:create', order_no: 1 },
      { name: '查询', permission: 'system:tenant:read', order_no: 2 },
      { name: '修改', permission: 'system:tenant:update', order_no: 3 },
      { name: '删除', permission: 'system:tenant:delete', order_no: 4 },
    ]

    const showCol = '`show`'
    for (const btn of buttons) {
      await queryRunner.query(
        `INSERT INTO sys_menu (tenant_id, parent_id, path, name, permission, type, icon, order_no, component, keep_alive, ${showCol}, status, is_ext, ext_open_mode)
         VALUES (1, ${parentId}, '', '${btn.name}', '${btn.permission}', 2, '', ${btn.order_no}, NULL, 0, 1, 1, 0, 1)`,
      )
      const [inserted] = await queryRunner.query(
        `SELECT id FROM sys_menu WHERE parent_id = ${parentId} AND permission = '${btn.permission}' LIMIT 1`,
      )
      const menuId = (inserted as any)?.id
      if (menuId) {
        await queryRunner.query(
          `INSERT IGNORE INTO sys_role_menus (role_id, menu_id) VALUES (1, ${menuId})`,
        )
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const [tenantMenu] = await queryRunner.query(
      `SELECT id FROM sys_menu WHERE path = '/system/tenant' AND tenant_id = 1 LIMIT 1`,
    )
    const parentId = (tenantMenu as any)?.id
    if (!parentId) return

    const [childMenus] = await queryRunner.query(
      `SELECT id FROM sys_menu WHERE parent_id = ${parentId} AND type = 2`,
    )
    const ids = Array.isArray(childMenus) ? (childMenus as any[]).map(r => r.id) : []
    if (ids.length > 0) {
      await queryRunner.query(
        `DELETE FROM sys_role_menus WHERE menu_id IN (${ids.join(',')})`,
      )
      await queryRunner.query(
        `DELETE FROM sys_menu WHERE parent_id = ${parentId} AND type = 2`,
      )
    }
  }
}
