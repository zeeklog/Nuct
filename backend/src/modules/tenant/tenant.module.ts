import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ParamConfigModule } from '~/modules/system/param-config/param-config.module'

import { DeptEntity } from '../system/dept/dept.entity'
import { MenuEntity } from '../system/menu/menu.entity'
import { RoleEntity } from '../system/role/role.entity'
import { UserEntity } from '../user/user.entity'

import { TenantController } from './tenant.controller'
import { TenantEntity } from './tenant.entity'
import { TenantService } from './tenant.service'
import { TenantContextService } from './tenant-context.service'
import { TenantInterceptor } from './tenant.interceptor'
import { TenantInitService } from './services/tenant-init.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([TenantEntity, DeptEntity, MenuEntity, RoleEntity, UserEntity]),
    ParamConfigModule,
  ],
  controllers: [TenantController],
  providers: [TenantService, TenantContextService, TenantInterceptor, TenantInitService],
  exports: [TenantService, TenantContextService],
})
export class TenantModule {}
