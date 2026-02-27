import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Like, Repository } from 'typeorm'

import { paginate } from '~/helper/paginate'
import { Pagination } from '~/helper/paginate/pagination'
import { TenantContextService } from '~/modules/tenant/tenant-context.service'
import { DictTypeEntity } from '~/modules/system/dict-type/dict-type.entity'

import { DictTypeDto, DictTypeQueryDto } from './dict-type.dto'

@Injectable()
export class DictTypeService {
  constructor(
    @InjectRepository(DictTypeEntity)
    private dictTypeRepository: Repository<DictTypeEntity>,
    private tenantContext: TenantContextService,
  ) {}

  /**
   * 罗列所有配置
   */
  async page({
    page,
    pageSize,
    name,
    code,
  }: DictTypeQueryDto): Promise<Pagination<DictTypeEntity>> {
    const tenantId = this.tenantContext.getTenantId()
    const queryBuilder = this.dictTypeRepository
      .createQueryBuilder('dict_type')
      .where('dict_type.tenantId = :tenantId', { tenantId })
      .andWhere({
        ...(name && { name: Like(`%${name}%`) }),
        ...(code && { code: Like(`%${code}%`) }),
      })

    return paginate(queryBuilder, { page, pageSize })
  }

  /** 一次性获取所有的字典类型 */
  async getAll() {
    const tenantId = this.tenantContext.getTenantId()
    return this.dictTypeRepository.find({ where: { tenantId } })
  }

  /**
   * 获取参数总数
   */
  async countConfigList(): Promise<number> {
    const tenantId = this.tenantContext.getTenantId()
    return this.dictTypeRepository.count({ where: { tenantId } })
  }

  /**
   * 新增
   */
  async create(dto: DictTypeDto): Promise<void> {
    const tenantId = this.tenantContext.getTenantId()
    await this.dictTypeRepository.insert({ ...dto, tenantId })
  }

  /**
   * 更新
   */
  async update(id: number, dto: Partial<DictTypeDto>): Promise<void> {
    const tenantId = this.tenantContext.getTenantId()
    await this.dictTypeRepository.update({ id, tenantId }, dto)
  }

  /**
   * 删除
   */
  async delete(id: number): Promise<void> {
    const tenantId = this.tenantContext.getTenantId()
    await this.dictTypeRepository.delete({ id, tenantId })
  }

  /**
   * 查询单个
   */
  async findOne(id: number): Promise<DictTypeEntity> {
    const tenantId = this.tenantContext.getTenantId()
    return this.dictTypeRepository.findOneBy({ id, tenantId })
  }
}
