import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity } from 'typeorm'

import { CommonEntity } from '~/common/entity/common.entity'

@Entity({ name: 'sys_tenant' })
export class TenantEntity extends CommonEntity {
  @Column({ length: 100 })
  @ApiProperty({ description: '租户名称' })
  name: string

  @Column({ length: 50, unique: true })
  @ApiProperty({ description: '租户编码' })
  code: string

  @Column({ type: 'tinyint', default: 1 })
  @ApiProperty({ description: '状态：1启用，0禁用' })
  status: number

  @Column({ nullable: true })
  @ApiProperty({ description: '备注' })
  remark: string
}
