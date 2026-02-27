import { ApiProperty } from '@nestjs/swagger'
import { IsIn, IsOptional, IsString, MaxLength, MinLength } from 'class-validator'

import { PagerDto } from '~/common/dto/pager.dto'

export class TenantDto {
  @ApiProperty({ description: '租户名称', example: '测试租户' })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string

  @ApiProperty({ description: '租户编码', example: 'test' })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  code: string

  @ApiProperty({ description: '状态：1启用，0禁用', example: 1 })
  @IsIn([0, 1])
  status: number

  @ApiProperty({ description: '备注' })
  @IsOptional()
  @IsString()
  remark?: string
}

export class TenantUpdateDto {
  @ApiProperty({ description: '租户名称' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name?: string

  @ApiProperty({ description: '租户编码' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  code?: string

  @ApiProperty({ description: '状态' })
  @IsOptional()
  @IsIn([0, 1])
  status?: number

  @ApiProperty({ description: '备注' })
  @IsOptional()
  @IsString()
  remark?: string
}

export class TenantQueryDto extends PagerDto {
  @ApiProperty({ description: '租户名称', required: false })
  @IsOptional()
  @IsString()
  name?: string

  @ApiProperty({ description: '租户编码', required: false })
  @IsOptional()
  @IsString()
  code?: string

  @ApiProperty({ description: '状态', required: false })
  @IsOptional()
  @IsIn([0, 1])
  status?: number
}
