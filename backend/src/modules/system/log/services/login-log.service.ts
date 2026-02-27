import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Between, LessThan, Like, Repository } from 'typeorm'

import {UAParser} from 'ua-parser-js'

import { paginateRaw } from '~/helper/paginate'
import { TenantContextService } from '~/modules/tenant/tenant-context.service'

import { getIpAddress } from '~/utils/ip.util'

import { LoginLogQueryDto } from '../dto/log.dto'
import { LoginLogEntity } from '../entities/login-log.entity'
import { LoginLogInfo } from '../models/log.model'

async function parseLoginLog(e: any, parser: UAParser): Promise<LoginLogInfo> {
  const uaResult = parser.setUA(e.login_log_ua).getResult()

  return {
    id: e.login_log_id,
    ip: e.login_log_ip,
    address: e.login_log_address,
    os: `${`${uaResult.os.name ?? ''} `}${uaResult.os.version}`,
    browser: `${`${uaResult.browser.name ?? ''} `}${uaResult.browser.version}`,
    username: e.user_username,
    time: e.login_log_created_at,
  }
}

@Injectable()
export class LoginLogService {
  constructor(
    @InjectRepository(LoginLogEntity)
    private loginLogRepository: Repository<LoginLogEntity>,
    private tenantContext: TenantContextService,
  ) {}

  async create(uid: number, ip: string, ua: string, tenantId?: number): Promise<void> {
    try {
      const address = await getIpAddress(ip)
      const tid = tenantId ?? this.tenantContext.getTenantId()

      await this.loginLogRepository.save({
        ip,
        ua,
        address,
        tenantId: tid,
        user: { id: uid },
      })
    }
    catch (e) {
      console.error(e)
    }
  }

  async list({
    page,
    pageSize,
    username,
    ip,
    address,
    time,
  }: LoginLogQueryDto) {
    const tenantId = this.tenantContext.getTenantId()
    const queryBuilder = this.loginLogRepository
      .createQueryBuilder('login_log')
      .innerJoinAndSelect('login_log.user', 'user')
      .where('login_log.tenantId = :tenantId', { tenantId })

    if (ip)
      queryBuilder.andWhere('login_log.ip LIKE :ip', { ip: `%${ip}%` })
    if (address)
      queryBuilder.andWhere('login_log.address LIKE :address', { address: `%${address}%` })
    if (time)
      queryBuilder.andWhere('login_log.created_at BETWEEN :time0 AND :time1', { time0: time[0], time1: time[1] })
    if (username)
      queryBuilder.andWhere('user.username LIKE :username', { username: `%${username}%` })

    queryBuilder.orderBy('login_log.created_at', 'DESC')

    const { items, ...rest } = await paginateRaw<LoginLogEntity>(queryBuilder, {
      page,
      pageSize,
    })

    const parser = new UAParser()
    const loginLogInfos = await Promise.all(
      items.map(item => parseLoginLog(item, parser)),
    )

    return {
      items: loginLogInfos,
      ...rest,
    }
  }

  async clearLog(): Promise<void> {
    const tenantId = this.tenantContext.getTenantId()
    await this.loginLogRepository.delete({ tenantId })
  }

  async clearLogBeforeTime(time: Date): Promise<void> {
    const tenantId = this.tenantContext.getTenantId()
    await this.loginLogRepository.delete({
      tenantId,
      createdAt: LessThan(time),
    })
  }
}
