import { Body, Controller, Delete, Get, Param, ParseArrayPipe, Post, Put, Query } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { ApiResult } from '~/common/decorators/api-result.decorator'
import { IdParam } from '~/common/decorators/id-param.decorator'
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator'

import { definePermission, Perm } from '../auth/decorators/permission.decorator'

import { TenantDto, TenantQueryDto, TenantUpdateDto } from './dto/tenant.dto'
import { TenantEntity } from './tenant.entity'
import { TenantService } from './tenant.service'

export const permissions = definePermission('system:tenant', {
  LIST: 'list',
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
} as const)

@ApiTags('System - 租户模块')
@ApiSecurityAuth()
@Controller('tenants') // 挂载在 /system/tenants
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Get('simple')
  @ApiOperation({ summary: '获取租户简单列表（需登录，超管切换租户用）' })
  @ApiResult({ type: [Object] })
  @Perm(permissions.LIST)
  async listSimple() {
    return this.tenantService.listSimple()
  }

  @Get()
  @ApiOperation({ summary: '获取租户列表' })
  @ApiResult({ type: [TenantEntity], isPage: true })
  @Perm(permissions.LIST)
  async list(@Query() dto: TenantQueryDto) {
    return this.tenantService.list(dto)
  }

  @Get(':id')
  @ApiOperation({ summary: '查询租户' })
  @ApiResult({ type: TenantEntity })
  @Perm(permissions.READ)
  async read(@IdParam() id: number) {
    return this.tenantService.info(id)
  }

  @Post()
  @ApiOperation({ summary: '新增租户' })
  @Perm(permissions.CREATE)
  async create(@Body() dto: TenantDto): Promise<void> {
    await this.tenantService.create(dto)
  }

  @Put(':id')
  @ApiOperation({ summary: '更新租户' })
  @Perm(permissions.UPDATE)
  async update(@IdParam() id: number, @Body() dto: TenantUpdateDto): Promise<void> {
    await this.tenantService.update(id, dto)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除租户' })
  @Perm(permissions.DELETE)
  async delete(@Param('id', new ParseArrayPipe({ items: Number, separator: ',' })) ids: number[]): Promise<void> {
    await this.tenantService.delete(ids)
  }
}
