import { Injectable } from '@nestjs/common'
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm'
import { isEmpty } from 'lodash'
import { EntityManager, In, IsNull, Repository, TreeRepository } from 'typeorm'

import { BusinessException } from '~/common/exceptions/biz.exception'
import { ErrorEnum } from '~/constants/error-code.constant'
import { TenantContextService } from '~/modules/tenant/tenant-context.service'
import { DeptEntity } from '~/modules/system/dept/dept.entity'
import { UserEntity } from '~/modules/user/user.entity'

import { deleteEmptyChildren } from '~/utils/list2tree.util'

import { DeptDto, DeptQueryDto, MoveDept } from './dept.dto'

@Injectable()
export class DeptService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(DeptEntity)
    private deptRepository: TreeRepository<DeptEntity>,
    @InjectEntityManager() private entityManager: EntityManager,
    private tenantContext: TenantContextService,
  ) {}

  async list(): Promise<DeptEntity[]> {
    const tenantId = this.tenantContext.getTenantId()
    return this.deptRepository.find({
      where: { tenantId },
      order: { orderNo: 'DESC' },
    })
  }

  async info(id: number): Promise<DeptEntity> {
    const tenantId = this.tenantContext.getTenantId()
    const dept = await this.deptRepository
      .createQueryBuilder('dept')
      .leftJoinAndSelect('dept.parent', 'parent')
      .where('dept.id = :id', { id })
      .andWhere('dept.tenantId = :tenantId', { tenantId })
      .getOne()

    if (isEmpty(dept))
      throw new BusinessException(ErrorEnum.DEPARTMENT_NOT_FOUND)

    return dept
  }

  async create({ parentId, ...data }: DeptDto): Promise<void> {
    const tenantId = this.tenantContext.getTenantId()
    const parent = await this.deptRepository
      .createQueryBuilder('dept')
      .where('dept.id = :parentId', { parentId })
      .andWhere('dept.tenantId = :tenantId', { tenantId })
      .getOne()

    await this.deptRepository.save({
      ...data,
      tenantId,
      parent,
    })
  }

  async update(id: number, { parentId, ...data }: DeptDto): Promise<void> {
    const tenantId = this.tenantContext.getTenantId()
    const item = await this.deptRepository
      .createQueryBuilder('dept')
      .where('dept.id = :id', { id })
      .andWhere('dept.tenantId = :tenantId', { tenantId })
      .getOne()

    if (isEmpty(item))
      throw new BusinessException(ErrorEnum.DEPARTMENT_NOT_FOUND)

    const parent = await this.deptRepository
      .createQueryBuilder('dept')
      .where('dept.id = :parentId', { parentId })
      .andWhere('dept.tenantId = :tenantId', { tenantId })
      .getOne()

    await this.deptRepository.save({
      ...item,
      ...data,
      parent,
    })
  }

  async delete(id: number): Promise<void> {
    const tenantId = this.tenantContext.getTenantId()
    await this.deptRepository.delete({ id, tenantId })
  }

  /**
   * 移动排序
   */
  async move(depts: MoveDept[]): Promise<void> {
    const tenantId = this.tenantContext.getTenantId()
    const ids = depts.map(d => d.id)
    const count = await this.deptRepository.count({ where: { id: In(ids), tenantId } })
    if (count !== ids.length)
      throw new BusinessException(ErrorEnum.DEPARTMENT_NOT_FOUND)
    await this.entityManager.transaction(async (manager) => {
      await manager.save(depts)
    })
  }

  /**
   * 根据部门查询关联的用户数量
   */
  async countUserByDeptId(id: number): Promise<number> {
    const tenantId = this.tenantContext.getTenantId()
    return this.userRepository.count({
      where: { dept: { id }, tenantId },
    })
  }

  /**
   * 查找当前部门下的子部门数量
   */
  async countChildDept(id: number): Promise<number> {
    const tenantId = this.tenantContext.getTenantId()
    const item = await this.deptRepository.findOneBy({ id, tenantId })
    if (isEmpty(item))
      throw new BusinessException(ErrorEnum.DEPARTMENT_NOT_FOUND)
    return (await this.deptRepository.countDescendants(item)) - 1
  }

  /**
   * 获取部门列表树结构
   */
  async getDeptTree(
    uid: number,
    { name }: DeptQueryDto,
  ): Promise<DeptEntity[]> {
    const tenantId = this.tenantContext.getTenantId()
    const tree: DeptEntity[] = []

    if (name) {
      const deptList = await this.deptRepository
        .createQueryBuilder('dept')
        .where('dept.name like :name', { name: `%${name}%` })
        .andWhere('dept.tenantId = :tenantId', { tenantId })
        .getMany()

      for (const dept of deptList) {
        const deptTree = await this.deptRepository.findDescendantsTree(dept)
        tree.push(deptTree)
      }

      deleteEmptyChildren(tree)

      return tree
    }

    const roots = await this.deptRepository.find({
      where: { tenantId, parent: IsNull() },
      relations: ['parent'],
    })
    const deptTree: DeptEntity[] = []
    for (const root of roots) {
      const subtree = await this.deptRepository.findDescendantsTree(root, {
        depth: 2,
        relations: ['parent'],
      })
      deptTree.push(subtree)
    }

    deleteEmptyChildren(deptTree)

    return deptTree
  }
}
