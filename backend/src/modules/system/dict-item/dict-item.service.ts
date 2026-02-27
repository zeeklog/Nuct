import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Like, Repository } from 'typeorm'

import { paginate } from '~/helper/paginate'
import { Pagination } from '~/helper/paginate/pagination'
import { TenantContextService } from '~/modules/tenant/tenant-context.service'
import { DictItemEntity } from '~/modules/system/dict-item/dict-item.entity'

import { DictItemDto, DictItemQueryDto } from './dict-item.dto'

@Injectable()
export class DictItemService {
  constructor(
    @InjectRepository(DictItemEntity)
    private dictItemRepository: Repository<DictItemEntity>,
    private tenantContext: TenantContextService,
  ) {}

  /**
   * 罗列所有配置
   */
  async page({
    page,
    pageSize,
    label,
    value,
    typeId,
  }: DictItemQueryDto): Promise<Pagination<DictItemEntity>> {
    const tenantId = this.tenantContext.getTenantId()
    const queryBuilder = this.dictItemRepository
      .createQueryBuilder('dict_item')
      .where('dict_item.tenantId = :tenantId', { tenantId })
      .orderBy('dict_item.orderNo', 'ASC')

    if (label)
      queryBuilder.andWhere('dict_item.label LIKE :label', { label: `%${label}%` })
    if (value)
      queryBuilder.andWhere('dict_item.value LIKE :value', { value: `%${value}%` })
    if (typeId)
      queryBuilder.andWhere('dict_item.type_id = :typeId', { typeId })

    return paginate(queryBuilder, { page, pageSize })
  }

  /**
   * 获取参数总数
   */
  async countConfigList(): Promise<number> {
    const tenantId = this.tenantContext.getTenantId()
    return this.dictItemRepository.count({ where: { tenantId } })
  }

  /**
   * 新增
   */
  async create(dto: DictItemDto): Promise<void> {
    const tenantId = this.tenantContext.getTenantId()
    const { typeId, ...rest } = dto
    await this.dictItemRepository.insert({
      ...rest,
      tenantId,
      type: { id: typeId },
    })
  }

  /**
   * 更新
   */
  async update(id: number, dto: Partial<DictItemDto>): Promise<void> {
    const tenantId = this.tenantContext.getTenantId()
    const { typeId, ...rest } = dto
    const updateData: any = { ...rest }
    if (typeId != null)
      updateData.type = { id: typeId }
    await this.dictItemRepository.update({ id, tenantId }, updateData)
  }

  /**
   * 删除
   */
  async delete(id: number): Promise<void> {
    const tenantId = this.tenantContext.getTenantId()
    await this.dictItemRepository.delete({ id, tenantId })
  }

  /**
   * 查询单个
   */
  async findOne(id: number): Promise<DictItemEntity> {
    const tenantId = this.tenantContext.getTenantId()
    return this.dictItemRepository.findOneBy({ id, tenantId })
  }
}
