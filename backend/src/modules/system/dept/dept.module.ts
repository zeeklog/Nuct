import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { TenantModule } from '../../tenant/tenant.module'
import { UserModule } from '../../user/user.module'
import { RoleModule } from '../role/role.module'

import { DeptController } from './dept.controller'
import { DeptEntity } from './dept.entity'
import { DeptService } from './dept.service'

const services = [DeptService]

@Module({
  imports: [TypeOrmModule.forFeature([DeptEntity]), TenantModule, UserModule, RoleModule],
  controllers: [DeptController],
  providers: [...services],
  exports: [TypeOrmModule, ...services],
})
export class DeptModule {}
