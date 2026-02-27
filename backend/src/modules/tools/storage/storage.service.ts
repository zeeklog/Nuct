import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Between, In, Like, Repository } from 'typeorm'

import { paginateRaw } from '~/helper/paginate'
import { PaginationTypeEnum } from '~/helper/paginate/interface'
import { Pagination } from '~/helper/paginate/pagination'
import { TenantContextService } from '~/modules/tenant/tenant-context.service'
import { Storage } from '~/modules/tools/storage/storage.entity'
import { UserEntity } from '~/modules/user/user.entity'
import { deleteFile } from '~/utils'

import { StorageCreateDto, StoragePageDto } from './storage.dto'
import { StorageInfo } from './storage.modal'

@Injectable()
export class StorageService {
  constructor(
    @InjectRepository(Storage)
    private storageRepository: Repository<Storage>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private tenantContext: TenantContextService,
  ) {}

  async create(dto: StorageCreateDto, userId: number): Promise<void> {
    const tenantId = this.tenantContext.getTenantId()
    await this.storageRepository.save({
      ...dto,
      userId,
      tenantId,
    })
  }

  /**
   * 删除文件
   */
  async delete(fileIds: number[]): Promise<void> {
    const tenantId = this.tenantContext.getTenantId()
    const items = await this.storageRepository.find({
      where: { id: In(fileIds), tenantId },
    })
    if (items.length > 0) {
      await this.storageRepository.delete(items.map(i => i.id))
      items.forEach((el) => {
        deleteFile(el.path)
      })
    }
  }

  async list({
    page,
    pageSize,
    name,
    type,
    size,
    extName,
    time,
    username,
  }: StoragePageDto): Promise<Pagination<StorageInfo>> {
    const tenantId = this.tenantContext.getTenantId()
    const queryBuilder = this.storageRepository
      .createQueryBuilder('storage')
      .leftJoin('sys_user', 'user', 'storage.user_id = user.id')
      .where('storage.tenant_id = :tenantId', { tenantId })

    if (name)
      queryBuilder.andWhere('storage.name LIKE :name', { name: `%${name}%` })
    if (type)
      queryBuilder.andWhere('storage.type = :type', { type })
    if (extName)
      queryBuilder.andWhere('storage.ext_name = :extName', { extName })
    if (size)
      queryBuilder.andWhere('storage.size BETWEEN :size0 AND :size1', { size0: size[0], size1: size[1] })
    if (time)
      queryBuilder.andWhere('storage.created_at BETWEEN :time0 AND :time1', { time0: time[0], time1: time[1] })
    if (username) {
      const user = await this.userRepository.findOneBy({ username, tenantId })
      if (user)
        queryBuilder.andWhere('storage.user_id = :userId', { userId: user.id })
      else
        queryBuilder.andWhere('1=0')
    }

    queryBuilder.orderBy('storage.created_at', 'DESC')

    const { items, ...rest } = await paginateRaw<Storage>(queryBuilder, {
      page,
      pageSize,
      paginationType: PaginationTypeEnum.LIMIT_AND_OFFSET,
    })

    function formatResult(result: Storage[]) {
      return result.map((e: any) => {
        return {
          id: e.storage_id,
          name: e.storage_name,
          extName: e.storage_ext_name,
          path: e.storage_path,
          type: e.storage_type,
          size: e.storage_size,
          createdAt: e.storage_created_at,
          username: e.user_username,
        }
      })
    }

    return {
      items: formatResult(items),
      ...rest,
    }
  }

  async count(): Promise<number> {
    const tenantId = this.tenantContext.getTenantId()
    return this.storageRepository.count({ where: { tenantId } })
  }
}
