import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { FastifyRequest } from 'fastify'
import { Observable } from 'rxjs'
import { ClsService } from 'nestjs-cls'

import { ROOT_TENANT_ID, ROOT_USER_ID } from '~/constants/system.constant'

import { CLS_TENANT_ID_KEY, TENANT_ID_HEADER } from './tenant-context.service'

@Injectable()
export class TenantInterceptor implements NestInterceptor {
  constructor(private readonly cls: ClsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<FastifyRequest & { user?: { uid: number; tenantId?: number } }>()
    const user = request.user
    const headerTenantId = request.headers[TENANT_ID_HEADER.toLowerCase()] as string | undefined

    let tenantId = ROOT_TENANT_ID

    // 超管且请求头带租户 ID 时，使用 Header 中的租户
    if (user?.uid === ROOT_USER_ID && headerTenantId) {
      const tid = parseInt(headerTenantId, 10)
      if (!Number.isNaN(tid))
        tenantId = tid
    }
    else if (user?.tenantId) {
      tenantId = user.tenantId
    }

    ;(this.cls as any).set(CLS_TENANT_ID_KEY, tenantId)

    // 供 UniqueConstraint 等验证器使用（原 ClsModule interceptor setup 逻辑）
    const params = request.params as { id?: string }
    if (params?.id && request.body) {
      ;(this.cls as any).set('operateId', Number.parseInt(params.id))
    }

    return next.handle()
  }
}
