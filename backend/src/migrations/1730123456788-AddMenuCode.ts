import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddMenuCode1730123456788 implements MigrationInterface {
  name = 'AddMenuCode1730123456788'

  public async up(queryRunner: QueryRunner): Promise<void> {
    const columns = await queryRunner.query(
      `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'sys_menu' AND COLUMN_NAME = 'code'`,
    )
    const hasCode = Array.isArray(columns) && columns.length > 0

    if (!hasCode) {
      await queryRunner.query(`
        ALTER TABLE \`sys_menu\` ADD \`code\` varchar(100) NULL COMMENT '菜单编码，唯一标识'
      `)
      await queryRunner.query(`
        UPDATE \`sys_menu\` SET \`code\` = CONCAT('menu_', \`id\`) WHERE \`code\` IS NULL
      `)
      await queryRunner.query(`
        ALTER TABLE \`sys_menu\` MODIFY \`code\` varchar(100) NOT NULL COMMENT '菜单编码，唯一标识'
      `)
    }
    else {
      await queryRunner.query(`
        UPDATE \`sys_menu\` SET \`code\` = CONCAT('menu_', \`id\`) WHERE \`code\` IS NULL OR \`code\` = ''
      `)
      await queryRunner.query(`
        ALTER TABLE \`sys_menu\` MODIFY \`code\` varchar(100) NOT NULL COMMENT '菜单编码，唯一标识'
      `)
    }

    const indexes = await queryRunner.query(
      `SHOW INDEX FROM \`sys_menu\` WHERE Key_name = 'IDX_menu_tenant_code'`,
    )
    if (!Array.isArray(indexes) || indexes.length === 0) {
      await queryRunner.query(`
        CREATE UNIQUE INDEX \`IDX_menu_tenant_code\` ON \`sys_menu\` (\`tenant_id\`, \`code\`)
      `)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`IDX_menu_tenant_code\` ON \`sys_menu\``)
    await queryRunner.query(`ALTER TABLE \`sys_menu\` DROP COLUMN \`code\``)
  }
}
