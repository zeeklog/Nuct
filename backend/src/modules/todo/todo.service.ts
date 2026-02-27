import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { paginate } from '~/helper/paginate'
import { Pagination } from '~/helper/paginate/pagination'
import { TenantContextService } from '~/modules/tenant/tenant-context.service'
import { TodoEntity } from '~/modules/todo/todo.entity'

import { TodoDto, TodoQueryDto, TodoUpdateDto } from './todo.dto'

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
    private tenantContext: TenantContextService,
  ) {}

  async list({
    page,
    pageSize,
  }: TodoQueryDto): Promise<Pagination<TodoEntity>> {
    const tenantId = this.tenantContext.getTenantId()
    return paginate(this.todoRepository, { page, pageSize }, { where: { tenantId } })
  }

  async detail(id: number): Promise<TodoEntity> {
    const tenantId = this.tenantContext.getTenantId()
    const item = await this.todoRepository.findOneBy({ id, tenantId })
    if (!item)
      throw new NotFoundException('未找到该记录')

    return item
  }

  async create(dto: TodoDto) {
    const tenantId = this.tenantContext.getTenantId()
    await this.todoRepository.save({ ...dto, tenantId })
  }

  async update(id: number, dto: TodoUpdateDto) {
    const tenantId = this.tenantContext.getTenantId()
    await this.todoRepository.update({ id, tenantId }, dto)
  }

  async delete(id: number) {
    const item = await this.detail(id)
    await this.todoRepository.remove(item)
  }
}
