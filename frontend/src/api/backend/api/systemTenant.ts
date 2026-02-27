import { request, type RequestOptions } from '@/utils/request';

/** 租户简单列表（登录用） GET /api/system/tenants/simple */
export async function tenantListSimple(options?: RequestOptions) {
  return request<{ id: number; name: string; code: string }[]>('/api/system/tenants/simple', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 租户列表 GET /api/system/tenants */
export async function tenantList(params: API.TenantListParams, options?: RequestOptions) {
  return request<{
    items?: API.TenantEntity[];
    meta?: { itemCount?: number; totalItems?: number; itemsPerPage?: number; totalPages?: number; currentPage?: number };
  }>('/api/system/tenants', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

/** 租户详情 GET /api/system/tenants/:id */
export async function tenantRead(params: { id: number }, options?: RequestOptions) {
  return request<API.TenantEntity>(`/api/system/tenants/${params.id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 新增租户 POST /api/system/tenants */
export async function tenantCreate(body: API.TenantDto, options?: RequestOptions) {
  return request<any>('/api/system/tenants', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: body,
    ...(options || { successMsg: '创建成功' }),
  });
}

/** 更新租户 PUT /api/system/tenants/:id */
export async function tenantUpdate(params: { id: number }, body: API.TenantUpdateDto, options?: RequestOptions) {
  return request<any>(`/api/system/tenants/${params.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    data: body,
    ...(options || { successMsg: '更新成功' }),
  });
}

/** 删除租户 DELETE /api/system/tenants/:id */
export async function tenantDelete(params: { id: number }, options?: RequestOptions) {
  return request<any>(`/api/system/tenants/${params.id}`, {
    method: 'DELETE',
    ...(options || { successMsg: '删除成功' }),
  });
}
