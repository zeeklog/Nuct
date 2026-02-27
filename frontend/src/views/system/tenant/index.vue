<template>
  <div>
    <DynamicTable
      row-key="id"
      header-title="租户管理"
      :data-request="Api.systemTenant.tenantList"
      :columns="columns"
      bordered
      size="small"
    >
      <template #toolbar>
        <a-button
          type="primary"
          :disabled="!$auth('system:tenant:create')"
          @click="openModal({})"
        >
          <Icon icon="ant-design:plus-outlined" /> 新增
        </a-button>
      </template>
    </DynamicTable>
  </div>
</template>

<script lang="ts" setup>
  import { Icon } from '@/components/basic/icon';
  import { useTable } from '@/components/core/dynamic-table';
  import { useFormModal } from '@/hooks/useModal/';
  import Api from '@/api/';

  defineOptions({
    name: 'SystemTenant',
  });

  const [DynamicTable, dynamicTableInstance] = useTable({
    formProps: {
      schemas: [
        { field: 'name', label: '租户名称', component: 'Input' },
        { field: 'code', label: '租户编码', component: 'Input' },
        {
          field: 'status',
          label: '状态',
          component: 'Select',
          componentProps: {
            options: [
              { label: '全部', value: undefined },
              { label: '启用', value: 1 },
              { label: '禁用', value: 0 },
            ],
          },
        },
      ],
    },
  });

  const [showModal] = useFormModal();

  const openModal = async (record: Partial<API.TenantEntity>) => {
    const [formRef] = await showModal({
      modalProps: {
        title: `${record.id ? '编辑' : '新增'}租户`,
        width: 520,
        onFinish: async (values: API.TenantDto) => {
          if (record.id) {
            await Api.systemTenant.tenantUpdate({ id: record.id }, values);
          } else {
            await Api.systemTenant.tenantCreate(values);
          }
          dynamicTableInstance?.reload();
        },
      },
      formProps: {
        labelWidth: 100,
        schemas: [
          { field: 'name', label: '租户名称', component: 'Input', required: true },
          { field: 'code', label: '租户编码', component: 'Input', required: true, disabled: !!record.id },
          {
            field: 'status',
            label: '状态',
            component: 'Select',
            componentProps: {
              options: [
                { label: '启用', value: 1 },
                { label: '禁用', value: 0 },
              ],
            },
          },
          { field: 'remark', label: '备注', component: 'InputTextArea' },
        ],
      },
    });
    formRef?.setFieldsValue({ ...record });
  };

  const delRowConfirm = async (record: API.TenantEntity) => {
    await Api.systemTenant.tenantDelete({ id: record.id });
    dynamicTableInstance?.reload();
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', width: 80 },
    { title: '租户名称', dataIndex: 'name', width: 150 },
    { title: '租户编码', dataIndex: 'code', width: 120 },
    {
      title: '状态',
      dataIndex: 'status',
      width: 80,
      customRender: ({ text }: { text: number }) => (text === 1 ? '启用' : '禁用'),
    },
    { title: '备注', dataIndex: 'remark', ellipsis: true },
    {
      title: '操作',
      width: 150,
      dataIndex: 'ACTION',
      hideInSearch: true,
      fixed: 'right',
      actions: ({ record }: { record: API.TenantEntity }) => [
        {
          label: '编辑',
          auth: 'system:tenant:update',
          onClick: () => openModal(record),
        },
        {
          label: '删除',
          auth: 'system:tenant:delete',
          popConfirm: {
            title: '确定删除该租户吗？新建租户时会自动初始化部门、菜单、角色和管理员账号。',
            placement: 'left',
            onConfirm: () => delRowConfirm(record),
          },
        },
      ],
    },
  ];
</script>
