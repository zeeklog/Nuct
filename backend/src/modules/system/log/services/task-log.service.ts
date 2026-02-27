import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { LessThan, Repository } from 'typeorm'

import { paginate } from '~/helper/paginate'
import { TenantContextService } from '~/modules/tenant/tenant-context.service'
import { TaskEntity } from '~/modules/system/task/task.entity'

import { TaskLogQueryDto } from '../dto/log.dto'
import { TaskLogEntity } from '../entities/task-log.entity'

@Injectable()
export class TaskLogService {
  constructor(
    @InjectRepository(TaskLogEntity)
    private taskLogRepository: Repository<TaskLogEntity>,
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
    private tenantContext: TenantContextService,
  ) {}

  async create(
    tid: number,
    status: number,
    time?: number,
    err?: string,
  ): Promise<number> {
    const task = await this.taskRepository.findOneBy({ id: tid })
    const tenantId = task?.tenantId ?? this.tenantContext.getTenantId()
    const result = await this.taskLogRepository.save({
      status,
      detail: err,
      time,
      tenantId,
      task: { id: tid },
    })
    return result.id
  }

  async list({ page, pageSize }: TaskLogQueryDto) {
    const tenantId = this.tenantContext.getTenantId()
    const queryBuilder = this.taskLogRepository
      .createQueryBuilder('task_log')
      .leftJoinAndSelect('task_log.task', 'task')
      .where('task_log.tenantId = :tenantId', { tenantId })
      .orderBy('task_log.id', 'DESC')

    return paginate<TaskLogEntity>(queryBuilder, {
      page,
      pageSize,
    })
  }

  async clearLog(): Promise<void> {
    const tenantId = this.tenantContext.getTenantId()
    await this.taskLogRepository.delete({ tenantId })
  }

  async clearLogBeforeTime(time: Date): Promise<void> {
    const tenantId = this.tenantContext.getTenantId()
    await this.taskLogRepository.delete({
      tenantId,
      createdAt: LessThan(time),
    })
  }
}
