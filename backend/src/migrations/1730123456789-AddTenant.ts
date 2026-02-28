import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddTenant1730123456789 implements MigrationInterface {
  name = 'AddTenant1730123456789'

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. 创建 sys_tenant 表
    await queryRunner.query(`
      CREATE TABLE \`sys_tenant\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`name\` varchar(100) NOT NULL COMMENT '租户名称',
        \`code\` varchar(50) NOT NULL COMMENT '租户编码',
        \`status\` tinyint NOT NULL DEFAULT 1 COMMENT '状态：1启用，0禁用',
        \`remark\` varchar(255) DEFAULT NULL COMMENT '备注',
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (\`id\`),
        UNIQUE KEY \`IDX_tenant_code\` (\`code\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='租户表'
    `)

    // 2. 插入默认租户
    await queryRunner.query(`
      INSERT INTO \`sys_tenant\` (\`id\`, \`name\`, \`code\`, \`status\`, \`remark\`) VALUES (1, '默认租户', 'default', 1, '系统默认租户')
    `)

    // 3. 为租户表添加 tenant_id 列（默认 1）
    // sys_config 保留全局，不添加 tenant_id
    const tenantTables = [
      'sys_dept',
      'sys_menu',
      'sys_role',
      'sys_user',
      'sys_dict_type',
      'sys_dict_item',
      'sys_task',
      'sys_task_log',
      'sys_login_log',
      'tool_storage',
      'todo',
      'user_access_tokens',
      'user_refresh_tokens',
    ]

    for (const table of tenantTables) {
      await queryRunner.query(`
        ALTER TABLE \`${table}\` ADD \`tenant_id\` int NOT NULL DEFAULT 1 COMMENT '租户ID'
      `)
      await queryRunner.query(`
        UPDATE \`${table}\` SET \`tenant_id\` = 1 WHERE \`tenant_id\` = 0 OR \`tenant_id\` IS NULL
      `)
      await queryRunner.query(`
        ALTER TABLE \`${table}\` ALTER COLUMN \`tenant_id\` DROP DEFAULT
      `)
    }

    // 4. 调整唯一约束 - sys_user
    await queryRunner.query(`ALTER TABLE \`sys_user\` DROP INDEX \`IDX_9e7164b2f1ea1348bc0eb0a7da\``)
    await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_user_tenant_username\` ON \`sys_user\` (\`tenant_id\`, \`username\`)`)

    // 5. 调整唯一约束 - sys_role (value, name)
    await queryRunner.query(`ALTER TABLE \`sys_role\` DROP INDEX \`IDX_05edc0a51f41bb16b7d8137da9\``)
    await queryRunner.query(`ALTER TABLE \`sys_role\` DROP INDEX \`IDX_223de54d6badbe43a5490450c3\``)
    await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_role_tenant_value\` ON \`sys_role\` (\`tenant_id\`, \`value\`)`)
    await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_role_tenant_name\` ON \`sys_role\` (\`tenant_id\`, \`name\`)`)

    // 6. 调整唯一约束 - sys_task
    await queryRunner.query(`ALTER TABLE \`sys_task\` DROP INDEX \`IDX_ef8e5ab5ef2fe0ddb1428439ef\``)
    await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_task_tenant_name\` ON \`sys_task\` (\`tenant_id\`, \`name\`)`)

    // 7. 调整唯一约束 - sys_dict_type
    await queryRunner.query(`ALTER TABLE \`sys_dict_type\` DROP INDEX \`IDX_74d0045ff7fab9f67adc0b1bda\``)
    await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_dict_type_tenant_code\` ON \`sys_dict_type\` (\`tenant_id\`, \`code\`)`)

    // 8. 插入租户管理菜单（默认租户，系统管理下）
    await queryRunner.query(`
      INSERT INTO \`sys_menu\` (\`tenant_id\`, \`parent_id\`, \`path\`, \`name\`, \`code\`, \`permission\`, \`type\`, \`icon\`, \`order_no\`, \`component\`, \`keep_alive\`, \`show\`, \`status\`, \`is_ext\`, \`ext_open_mode\`)
      VALUES (1, 1, '/system/tenant', '租户管理', 'zu_hu_guan_li', 'system:tenant:list', 1, 'ant-design:team-outlined', 250, 'system/tenant/index', 0, 1, 1, 0, 1)
    `)
    const [menuRow] = await queryRunner.query(`SELECT id FROM sys_menu WHERE path = '/system/tenant' AND tenant_id = 1`)
    const tenantMenuId = menuRow?.id
    if (tenantMenuId) {
      await queryRunner.query(`INSERT INTO \`sys_role_menus\` (\`role_id\`, \`menu_id\`) VALUES (1, ${tenantMenuId})`)
    }

    // 9. 添加 tenant_id 索引以提升查询
    await queryRunner.query(`CREATE INDEX \`IDX_user_tenant\` ON \`sys_user\` (\`tenant_id\`)`)
    await queryRunner.query(`CREATE INDEX \`IDX_role_tenant\` ON \`sys_role\` (\`tenant_id\`)`)
    await queryRunner.query(`CREATE INDEX \`IDX_menu_tenant\` ON \`sys_menu\` (\`tenant_id\`)`)
    await queryRunner.query(`CREATE INDEX \`IDX_dept_tenant\` ON \`sys_dept\` (\`tenant_id\`)`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // 删除索引
    await queryRunner.query(`DROP INDEX \`IDX_dept_tenant\` ON \`sys_dept\``)
    await queryRunner.query(`DROP INDEX \`IDX_menu_tenant\` ON \`sys_menu\``)
    await queryRunner.query(`DROP INDEX \`IDX_role_tenant\` ON \`sys_role\``)
    await queryRunner.query(`DROP INDEX \`IDX_user_tenant\` ON \`sys_user\``)

    // 恢复唯一约束
    await queryRunner.query(`ALTER TABLE \`sys_dict_type\` DROP INDEX \`IDX_dict_type_tenant_code\``)
    await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_74d0045ff7fab9f67adc0b1bda\` ON \`sys_dict_type\` (\`code\`)`)

    await queryRunner.query(`ALTER TABLE \`sys_task\` DROP INDEX \`IDX_task_tenant_name\``)
    await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_ef8e5ab5ef2fe0ddb1428439ef\` ON \`sys_task\` (\`name\`)`)

    await queryRunner.query(`ALTER TABLE \`sys_role\` DROP INDEX \`IDX_role_tenant_name\``)
    await queryRunner.query(`ALTER TABLE \`sys_role\` DROP INDEX \`IDX_role_tenant_value\``)
    await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_223de54d6badbe43a5490450c3\` ON \`sys_role\` (\`name\`)`)
    await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_05edc0a51f41bb16b7d8137da9\` ON \`sys_role\` (\`value\`)`)

    await queryRunner.query(`ALTER TABLE \`sys_user\` DROP INDEX \`IDX_user_tenant_username\``)
    await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_9e7164b2f1ea1348bc0eb0a7da\` ON \`sys_user\` (\`username\`)`)

    // 删除 tenant_id 列
    const tenantTables = [
      'user_refresh_tokens',
      'user_access_tokens',
      'todo',
      'tool_storage',
      'sys_login_log',
      'sys_task_log',
      'sys_task',
      'sys_dict_item',
      'sys_dict_type',
      'sys_user',
      'sys_role',
      'sys_menu',
      'sys_dept',
    ]
    for (const table of tenantTables) {
      await queryRunner.query(`ALTER TABLE \`${table}\` DROP COLUMN \`tenant_id\``)
    }

    await queryRunner.query(`DROP TABLE \`sys_tenant\``)
  }
}
