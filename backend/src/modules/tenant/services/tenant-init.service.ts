import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository, TreeRepository } from 'typeorm'

import { SYS_USER_INITPASSWORD } from '~/constants/system.constant'
import { ParamConfigService } from '~/modules/system/param-config/param-config.service'

import { md5, randomValue } from '~/utils'

import { DeptEntity } from '../../system/dept/dept.entity'
import { MenuEntity } from '../../system/menu/menu.entity'
import { RoleEntity } from '../../system/role/role.entity'
import { UserEntity } from '../../user/user.entity'

import { tenantDeptTemplate } from '../templates/tenant-dept.template'
import { tenantMenuTemplate } from '../templates/tenant-menu.template'

@Injectable()
export class TenantInitService {
  constructor(
    @InjectRepository(DeptEntity)
    private readonly deptRepo: TreeRepository<DeptEntity>,
    @InjectRepository(MenuEntity)
    private readonly menuRepo: Repository<MenuEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepo: Repository<RoleEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private readonly paramConfigService: ParamConfigService,
  ) {}

  /**
   * 新建租户时初始化：部门、菜单、角色、租户管理员用户
   */
  async initForTenant(tenantId: number): Promise<void> {
    const deptIdMap = await this.initDepts(tenantId)
    const menuIdMap = await this.initMenus(tenantId)
    const adminRoleId = await this.initRoles(tenantId, menuIdMap)
    await this.initAdminUser(tenantId, adminRoleId, deptIdMap.get(1)!)
  }

  private async initDepts(tenantId: number): Promise<Map<number, number>> {
    const idMap = new Map<number, number>()
    const sorted = [...tenantDeptTemplate].sort((a, b) => {
      if (a.parentId === null && b.parentId !== null)
        return -1
      if (a.parentId !== null && b.parentId === null)
        return 1
      if (a.parentId === null && b.parentId === null)
        return a.id - b.id
      return (a.parentId ?? 0) - (b.parentId ?? 0)
    })

    for (const item of sorted) {
      const parentId = item.parentId ? idMap.get(item.parentId) : null
      const parent = parentId ? await this.deptRepo.findOneBy({ id: parentId }) : undefined
      const dept = this.deptRepo.create({
        tenantId,
        name: item.name,
        orderNo: item.orderNo,
        parent,
      })
      const saved = await this.deptRepo.save(dept)
      idMap.set(item.id, saved.id)
    }
    return idMap
  }

  private async initMenus(tenantId: number): Promise<Map<number, number>> {
    const idMap = new Map<number, number>()
    const sorted = [...tenantMenuTemplate].sort((a, b) => {
      if (a.parentId === null && b.parentId !== null)
        return -1
      if (a.parentId !== null && b.parentId === null)
        return 1
      if (a.parentId === null && b.parentId === null)
        return a.id - b.id
      return (a.parentId ?? 0) - (b.parentId ?? 0)
    })

    for (const item of sorted) {
      const menu = this.menuRepo.create({
        tenantId,
        parentId: item.parentId ? idMap.get(item.parentId) ?? null : null,
        path: item.path,
        name: item.name,
        permission: item.permission,
        type: item.type,
        icon: item.icon,
        orderNo: item.orderNo,
        component: item.component,
        keepAlive: item.keepAlive,
        show: item.show,
        status: item.status,
        isExt: !!item.isExt,
        extOpenMode: item.extOpenMode,
        activeMenu: item.activeMenu,
      })
      const saved = await this.menuRepo.save(menu)
      idMap.set(item.id, saved.id)
    }
    return idMap
  }

  private async initRoles(tenantId: number, menuIdMap: Map<number, number>): Promise<number> {
    const adminRole = this.roleRepo.create({
      tenantId,
      name: '租户管理员',
      value: `tenant_admin_${tenantId}`,
      remark: '租户管理员，拥有全部菜单权限',
      status: 1,
    })
    const savedAdmin = await this.roleRepo.save(adminRole)

    const menuIds = Array.from(menuIdMap.values())
    const menus = await this.menuRepo.find({ where: { id: In(menuIds) } })
    const adminRoleWithMenus = await this.roleRepo.findOne({
      where: { id: savedAdmin.id },
      relations: ['menus'],
    })
    if (adminRoleWithMenus) {
      adminRoleWithMenus.menus = menus
      await this.roleRepo.save(adminRoleWithMenus)
    }

    const userRole = this.roleRepo.create({
      tenantId,
      name: '普通用户',
      value: `tenant_user_${tenantId}`,
      remark: '普通用户',
      status: 1,
      default: true,
    })
    await this.roleRepo.save(userRole)

    return savedAdmin.id
  }

  private async initAdminUser(
    tenantId: number,
    adminRoleId: number,
    deptId: number,
  ): Promise<void> {
    const initPassword = await this.paramConfigService.findValueByKey(SYS_USER_INITPASSWORD) || '123456'
    const psalt = randomValue(32)
    const password = md5(`${initPassword}${psalt}`)

    const user = this.userRepo.create({
      tenantId,
      username: Math.random().toString(36).substring(2, 15),
      password,
      psalt,
      nickname: '租户管理员',
      status: 1,
      dept: { id: deptId },
      roles: [{ id: adminRoleId }],
    })
    await this.userRepo.save(user)
  }
}
