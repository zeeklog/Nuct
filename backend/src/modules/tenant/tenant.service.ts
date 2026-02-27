import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'

import { BusinessException } from '~/common/exceptions/biz.exception'
import { ErrorEnum } from '~/constants/error-code.constant'
import { paginate } from '~/helper/paginate'
import { Pagination } from '~/helper/paginate/pagination'

import { TenantInitService } from './services/tenant-init.service'

import { TenantDto, TenantQueryDto, TenantUpdateDto } from './dto/tenant.dto'
import { TenantEntity } from './tenant.entity'

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(TenantEntity)
    private readonly tenantRepository: Repository<TenantEntity>,
    private readonly tenantInitService: TenantInitService,
  ) {}

  async list(dto: TenantQueryDto): Promise<Pagination<TenantEntity>> {
    const { name, code, status } = dto
    const queryBuilder = this.tenantRepository
      .createQueryBuilder('tenant')
      .where({
        ...(name && { name: Like(`%${name}%`) }),
        ...(code && { code: Like(`%${code}%`) }),
        ...(status !== undefined && status !== null ? { status } : null),
      })
      .orderBy('tenant.id', 'ASC')

    return paginate(queryBuilder, { page: dto.page ?? 1, pageSize: dto.pageSize ?? 10 })
  }

  async info(id: number): Promise<TenantEntity> {
    const tenant = await this.tenantRepository.findOne({ where: { id } })
    if (!tenant)
      throw new BusinessException(ErrorEnum.REQUESTED_RESOURCE_NOT_FOUND)
    return tenant
  }

  async create(dto: TenantDto): Promise<void> {
    const existing = await this.tenantRepository.findOne({ where: { code: dto.code } })
    if (existing)
      throw new BusinessException(ErrorEnum.TENANT_CODE_EXISTS)

    const tenant = this.tenantRepository.create(dto)
    const saved = await this.tenantRepository.save(tenant)
    await this.tenantInitService.initForTenant(saved.id)
  }

  async update(id: number, dto: TenantUpdateDto): Promise<void> {
    const tenant = await this.tenantRepository.findOne({ where: { id } })
    if (!tenant)
      throw new BusinessException(ErrorEnum.REQUESTED_RESOURCE_NOT_FOUND)

    if (dto.code && dto.code !== tenant.code) {
      const existing = await this.tenantRepository.findOne({ where: { code: dto.code } })
      if (existing)
        throw new BusinessException(ErrorEnum.TENANT_CODE_EXISTS)
    }

    await this.tenantRepository.update(id, dto)
  }

  async delete(ids: number[]): Promise<void> {
    await this.tenantRepository.delete(ids)
  }

  /**
   * 获取简单租户列表（用于登录页选择）
   */
  async listSimple(): Promise<{ id: number; name: string; code: string }[]> {
    return this.tenantRepository.find({
      where: { status: 1 },
      select: ['id', 'name', 'code'],
      order: { id: 'ASC' },
    })
  }
}
