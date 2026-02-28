<template>
  <div>
    <Teleport to="body" :disabled="!isFullscreen">
      <div ref="containerElRef">
        <SchemaForm
          v-if="innerPropsRef.search"
          ref="searchFormRef"
          class="search-form"
          submit-on-reset
          v-bind="getFormProps"
          :table-instance="dynamicTableContext"
          @toggle-advanced="(e) => $emit('toggle-advanced', e)"
          @submit="handleSubmit"
        >
          <template v-for="item of getFormSlotKeys" #[replaceFormSlotKey(item)]="data">
            <slot :name="item" v-bind="data || {}" />
          </template>
        </SchemaForm>
        <div class="table-container">
          <ToolBar
            v-if="showToolBar"
            :export-file-name="exportFileName"
            :title="headerTitle"
            :title-tooltip="titleTooltip"
            :show-table-setting="showTableSetting"
          >
            <template v-for="name of Object.keys($slots)" #[name]="data" :key="name">
              <slot :name="name" v-bind="data || {}" />
            </template>
          </ToolBar>
          <SchemaForm
            ref="editTableFormRef"
            no-style
            :initial-values="editFormModel"
            :show-action-button-group="false"
            :show-advanced-button="false"
            @validate="handleEditFormValidate"
          >
            <Table
              ref="tableRef"
              v-bind="tableProps"
              :columns="innerColumns"
              :data-source="tableData"
              @change="handleTableChange"
            >
              <template v-for="(_, slotName) of $slots" #[slotName]="slotData" :key="slotName">
                <slot :name="slotName" v-bind="slotData" />
              </template>
              <template #bodyCell="slotData">
                <slot name="bodyCell" v-bind="slotData" />
              </template>
            </Table>
          </SchemaForm>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script lang="tsx" setup>
  import { computed, onBeforeMount } from 'vue';
  import { Table } from 'ant-design-vue';
  import {
    useTableMethods,
    createTableContext,
    useExportData2Excel,
    useTableForm,
    useTableState,
    useColumns,
  } from './hooks';
  import { ToolBar } from './components';
  import { dynamicTableProps, dynamicTableEmits } from './dynamic-table';
  import { SchemaForm } from '@/components/core/schema-form';

  defineOptions({
    name: 'DynamicTable',
    inheritAttrs: false,
  });

  const props = defineProps(dynamicTableProps);
  const emit = defineEmits(dynamicTableEmits);

  // 表格内部状态
  const tableState = useTableState(props);
  const {
    tableRef,
    tableData,
    isFullscreen,
    containerElRef,
    searchFormRef,
    editTableFormRef,
    innerPropsRef,
    getBindValues,
    editFormModel,
  } = tableState;

  // 表格内部方法
  const tableMethods = useTableMethods({ props, emit, tableState });
  const { fetchData, handleSubmit, handleTableChange, handleEditFormValidate } = tableMethods;

  // 表格列的配置描述
  const { innerColumns } = useColumns({ props, tableState, tableMethods });

  // 搜索表单
  const tableForm = useTableForm({ tableState, tableMethods });
  const { getFormProps, replaceFormSlotKey, getFormSlotKeys } = tableForm;

  // 表单导出
  const exportData2ExcelHooks = useExportData2Excel({ props, tableState, tableMethods });

  // 当前组件所有的状态和方法
  const dynamicTableContext = {
    tableProps: props,
    emit,
    innerColumns,
    ...tableState,
    ...tableForm,
    ...tableMethods,
    ...exportData2ExcelHooks,
  };

  // 创建表格上下文
  createTableContext(dynamicTableContext);

  defineExpose(dynamicTableContext);

  const tableProps = computed<Recordable>(() => {
    const { getExpandOption } = tableMethods;
    return {
      ...getBindValues.value,
      ...getExpandOption.value,
    };
  });

  onBeforeMount(() => {
    if (props.immediate) {
      fetchData();
    }
  });
</script>

<style lang="less" scoped>
  :deep(.ant-table-wrapper) {
    padding: 0 6px 6px;

    .ant-table {
      .ant-table-title {
        display: flex;
      }

      .ant-image:hover {
        cursor: zoom-in;
      }
    }
  }

  .actions > * {
    margin-right: 10px;
  }

  .table-container {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(20px);
    border-radius: 16px;
    border: 1px solid rgba(226, 232, 240, 0.8);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.02);
    overflow: auto; /* 表格超宽/超高时显示滚动条，避免内容被裁剪 */
    transition: all 0.3s;

    &:hover {
      box-shadow: 0 8px 32px rgba(139, 92, 246, 0.05);
    }

    :deep(.ant-table-wrapper) {
      padding: 0;

      .ant-pagination {
        padding-right: 1em;
      }

      .ant-table {
        background: transparent;

        .ant-table-title {
          padding: 16px 24px;
          border-bottom: 1px solid rgba(226, 232, 240, 0.6);
        }

        .ant-table-thead > tr > th {
          background: #f8fafc;
          color: #64748b;
          font-weight: 600;
          font-size: 13px;
          border-bottom: 1px solid rgba(226, 232, 240, 0.8);

          &::before {
            display: none;
          }
        }

        .ant-table-tbody > tr > td {
          border-bottom: 1px solid rgba(226, 232, 240, 0.5);
          transition: all 0.2s;
        }

        .ant-table-tbody > tr:hover > td {
          background: rgba(139, 92, 246, 0.02) !important;
        }

        /* 固定列 hover 时也需背景色，避免与滚动列重叠导致数据错位 */
        .ant-table-tbody > tr:hover > td.ant-table-cell-fix-left,
        .ant-table-tbody > tr:hover > td.ant-table-cell-fix-right {
          background: #FFFFFF !important;
        }
      }
    }
  }

  .search-form {
    padding: 16px 24px;
    margin-bottom: 16px;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(20px);
    border-radius: 16px;
    border: 1px solid rgba(226, 232, 240, 0.8);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.02);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      box-shadow: 0 8px 32px rgba(139, 92, 246, 0.05);
      border-color: rgba(139, 92, 246, 0.2);
    }

    :deep(.ant-form-item) {
      margin-bottom: 12px;
      padding: 8px 0;

      .ant-form-item-label {
        padding: 0 16px 0 0;
        label {
          color: #64748b;
          font-size: 13px;
          height: auto;
          min-width: 80px;
          justify-content: flex-end;

          &::after {
            display: none;
          }
        }
      }

      .ant-form-item-control {
        padding-left: 0;
      }

      .ant-input,
      .ant-select-selector,
      .ant-picker {
        border-radius: 8px !important;
        transition: all 0.2s;

        &:hover,
        &:focus,
        &-focused {
          border-color: #8b5cf6 !important;
          background: #fff !important;
          box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.1) !important;
        }
      }
    }

    :deep(.ant-btn) {
      height: 36px;
      padding: 0 20px;
      border-radius: 8px;
      font-weight: 500;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: all 0.2s;

      &.ant-btn-primary {
        background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
        border: none;
        box-shadow: 0 4px 12px rgba(139, 92, 246, 0.2);

        &:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(139, 92, 246, 0.3);
        }

        &:active {
          transform: translateY(0);
        }
      }

      &:not(.ant-btn-primary) {
        color: #64748b;
        border-color: #e2e8f0;

        &:hover {
          color: #8b5cf6;
          border-color: #8b5cf6;
          background: rgba(139, 92, 246, 0.02);
        }
      }
    }
  }

  :global(.dark) {
    .table-container {
      background: rgba(30, 41, 59, 0.7);
      border-color: rgba(51, 65, 85, 0.5);
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);

      :deep(.ant-table-wrapper) {
        .ant-table {
          .ant-table-title {
            border-bottom-color: rgba(51, 65, 85, 0.5);
          }

          .ant-table-thead > tr > th {
            background: rgba(15, 23, 42, 0.5);
            color: #94a3b8;
            border-bottom-color: rgba(51, 65, 85, 0.8);
          }

          .ant-table-tbody > tr > td {
            border-bottom-color: rgba(51, 65, 85, 0.3);
          }

          .ant-table-tbody > tr:hover > td {
            background: rgba(139, 92, 246, 0.05) !important;
          }

          /* 固定列 hover 时也需背景色，避免与滚动列重叠导致数据错位 */
          .ant-table-tbody > tr:hover > td.ant-table-cell-fix-left,
          .ant-table-tbody > tr:hover > td.ant-table-cell-fix-right {
            background: rgba(139, 92, 246, 0.05) !important;
          }
        }
      }
    }

    .search-form {
      background: rgba(30, 41, 59, 0.7);
      border-color: rgba(51, 65, 85, 0.5);
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);

      :deep(.ant-form-item) {
        .ant-form-item-label label {
          color: #94a3b8;
        }

        .ant-input,
        .ant-select-selector,
        .ant-picker {
          background: rgba(15, 23, 42, 0.5) !important;
          border-color: rgba(51, 65, 85, 0.8) !important;
          color: #f1f5f9 !important;

          &:hover,
          &:focus,
          &-focused {
            background: rgba(15, 23, 42, 0.8) !important;
            border-color: #a78bfa !important;
          }
        }
      }

      :deep(.ant-btn:not(.ant-btn-primary)) {
        color: #94a3b8;
        border-color: rgba(51, 65, 85, 0.8);

        &:hover {
          color: #a78bfa;
          border-color: #a78bfa;
        }
      }
    }
  }
</style>
