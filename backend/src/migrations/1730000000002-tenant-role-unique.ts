import { MigrationInterface, QueryRunner } from 'typeorm'

export class TenantRoleUnique1730000000002 implements MigrationInterface {
  name = 'TenantRoleUnique1730000000002'

  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = 'sys_role'

    // 1. 添加 tenant_id 列（若不存在）
    const hasTenantId = await queryRunner.query(
      `SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = '${table}' AND COLUMN_NAME = 'tenant_id'`,
    )
    if (!hasTenantId || hasTenantId.length === 0) {
      await queryRunner.query(
        `ALTER TABLE \`${table}\` ADD \`tenant_id\` int NOT NULL DEFAULT 0 COMMENT '租户ID，0表示平台数据'`,
      )
    }

    // 2. 删除旧的 value 唯一索引（若存在）
    const indexes = await queryRunner.query(`SHOW INDEX FROM \`${table}\` WHERE Key_name = 'IDX_05edc0a51f41bb16b7d8137da9'`)
    if (indexes && indexes.length > 0) {
      await queryRunner.query(`ALTER TABLE \`${table}\` DROP INDEX \`IDX_05edc0a51f41bb16b7d8137da9\``)
    }

    // 3. 删除旧的 name 唯一索引（若存在）
    const nameIndexes = await queryRunner.query(`SHOW INDEX FROM \`${table}\` WHERE Key_name = 'IDX_223de54d6badbe43a5490450c3'`)
    if (nameIndexes && nameIndexes.length > 0) {
      await queryRunner.query(`ALTER TABLE \`${table}\` DROP INDEX \`IDX_223de54d6badbe43a5490450c3\``)
    }

    // 4. 添加 (tenant_id, value) 联合唯一索引（若不存在）
    const newIndexes = await queryRunner.query(`SHOW INDEX FROM \`${table}\` WHERE Key_name = 'IDX_role_tenant_value'`)
    if (!newIndexes || newIndexes.length === 0) {
      await queryRunner.query(
        `CREATE UNIQUE INDEX \`IDX_role_tenant_value\` ON \`${table}\` (\`tenant_id\`, \`value\`)`,
      )
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = 'sys_role'

    await queryRunner.query(`ALTER TABLE \`${table}\` DROP INDEX IF EXISTS \`IDX_role_tenant_value\``)
    await queryRunner.query(
      `ALTER TABLE \`${table}\` ADD UNIQUE INDEX \`IDX_05edc0a51f41bb16b7d8137da9\` (\`value\`)`,
    )
    await queryRunner.query(
      `ALTER TABLE \`${table}\` ADD UNIQUE INDEX \`IDX_223de54d6badbe43a5490450c3\` (\`name\`)`,
    )
  }
}
