/** 部门模板：id, parentId, name, orderNo（插入时按 parent 顺序，parentId 用 idMap 映射） */
export interface DeptTemplateItem {
  id: number
  parentId: number | null
  name: string
  orderNo: number
}

export const tenantDeptTemplate: DeptTemplateItem[] = [
  { id: 1, parentId: null, name: '总部', orderNo: 1 },
  { id: 2, parentId: 1, name: '研发部', orderNo: 1 },
  { id: 3, parentId: 1, name: '市场部', orderNo: 2 },
]
