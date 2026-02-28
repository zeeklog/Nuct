import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddDashboardMenu1730123456791 implements MigrationInterface {
  name = 'AddDashboardMenu1730123456791'

  public async up(queryRunner: QueryRunner): Promise<void> {
    const [existing] = await queryRunner.query(
      `SELECT id FROM sys_menu WHERE path = '/dashboard' LIMIT 1`,
    )
    if (existing?.id)
      return

    const showCol = '`show`'
    await queryRunner.query(`
      INSERT INTO sys_menu (tenant_id, parent_id, path, name, code, permission, type, icon, order_no, component, keep_alive, ${showCol}, status, is_ext, ext_open_mode)
      VALUES (1, NULL, '/dashboard', '仪表盘', 'yi_biao_pan', '', 1, 'ant-design:dashboard-outlined', 255, 'dashboard/index', 0, 1, 1, 0, 1)
    `)

    const [inserted] = await queryRunner.query(
      `SELECT id FROM sys_menu WHERE path = '/dashboard' LIMIT 1`,
    )
    const menuId = (inserted as any)?.id
    if (menuId) {
      await queryRunner.query(
        `INSERT IGNORE INTO sys_role_menus (role_id, menu_id) VALUES (1, ${menuId}), (2, ${menuId}), (9, ${menuId})`,
      )
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const [menu] = await queryRunner.query(
      `SELECT id FROM sys_menu WHERE path = '/dashboard' LIMIT 1`,
    )
    const menuId = (menu as any)?.id
    if (menuId) {
      await queryRunner.query(`DELETE FROM sys_role_menus WHERE menu_id = ${menuId}`)
      await queryRunner.query(`DELETE FROM sys_menu WHERE id = ${menuId}`)
    }
  }
}
