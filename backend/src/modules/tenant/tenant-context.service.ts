import { Injectable } from '@nestjs/common'
import { ClsService } from 'nestjs-cls'

import { ROOT_TENANT_ID } from '~/constants/system.constant'

export const TENANT_ID_HEADER = 'x-tenant-id'
export const CLS_TENANT_ID_KEY = 'tenantId'

@Injectable()
export class TenantContextService {
  constructor(private readonly cls: ClsService) {}

  /**
   * 获取当前请求的租户 ID（由 TenantInterceptor 设置到 CLS）
   */
  getTenantId(): number {
    return this.cls.get<number>(CLS_TENANT_ID_KEY as any) ?? ROOT_TENANT_ID
  }

  /**
   * 设置当前请求的租户 ID（供 TenantInterceptor 使用）
   */
  setTenantId(tenantId: number): void {
    (this.cls as any).set(CLS_TENANT_ID_KEY, tenantId)
  }
}
