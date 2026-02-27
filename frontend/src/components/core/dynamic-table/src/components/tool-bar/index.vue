<template>
  <div class="toolbar-container">
    <div class="toolbar-left">
      <slot name="headerTitle">
        <div class="title">
          <div class="title-line" />
          {{ title }}
          <BasicHelp v-if="titleTooltip" class="ml-8px" :text="titleTooltip" />
        </div>
      </slot>

      <slot name="afterHeaderTitle" />
    </div>

    <div class="toolbar-right">
      <Space :size="12">
        <slot name="toolbar" />

        <span v-if="exportFileName" @click="exportData2Excel">
          <slot name="export-button">
            <a-button type="primary">
              <template #icon><Icon icon="ant-design:export-outlined" /></template>
              导出
            </a-button>
          </slot>
        </span>
      </Space>

      <Divider v-if="$slots.toolbar && showTableSetting" type="vertical" class="mx-16px" />
      <TableSetting v-if="showTableSetting" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Divider, Space } from 'ant-design-vue';
  import TableSetting from '../table-settings/index.vue';
  import BasicHelp from '@/components/basic/basic-help/index.vue';
  import { useTableContext } from '@/components/core/dynamic-table/src/hooks';
  import { Icon } from '@/components/basic/icon';

  defineOptions({
    name: 'ToolBar',
  });

  defineProps({
    title: {
      type: String,
      default: '',
    },
    exportFileName: {
      type: String,
      default: '',
    },
    titleTooltip: {
      type: String,
      default: '',
    },
    showTableSetting: {
      type: Boolean,
      default: true,
    },
  });

  const { exportData2Excel } = useTableContext();
</script>

<style lang="less" scoped>
  .toolbar-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px;
    background: transparent;

    .toolbar-left {
      display: flex;
      align-items: center;

      .title {
        display: flex;
        align-items: center;
        font-size: 16px;
        font-weight: 600;
        color: #1e293b;
        position: relative;

        .title-line {
          width: 4px;
          height: 16px;
          background: linear-gradient(to bottom, #8b5cf6, #ec4899);
          border-radius: 2px;
          margin-right: 12px;
        }
      }
    }

    .toolbar-right {
      display: flex;
      align-items: center;

      :deep(.ant-btn) {
        height: 32px;
        padding: 0 12px;
        border-radius: 6px;
        font-size: 14px;
        display: inline-flex;
        align-items: center;
        gap: 4px;

        &.ant-btn-primary {
          background: #8b5cf6;
          border-color: #8b5cf6;

          &:hover {
            background: #7c3aed;
            border-color: #7c3aed;
          }
        }
      }

      :deep(.ant-divider-vertical) {
        height: 20px;
        border-color: #e2e8f0;
      }
    }
  }

  :global(.dark) {
    .toolbar-container {
      .toolbar-left .title {
        color: #f1f5f9;
      }

      .toolbar-right :deep(.ant-divider-vertical) {
        border-color: rgba(51, 65, 85, 0.8);
      }
    }
  }
</style>
