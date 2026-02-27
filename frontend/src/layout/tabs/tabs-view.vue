<template>
  <div class="tabs-view">
    <a-tabs
      :active-key="activeKey"
      hide-add
      type="editable-card"
      class="tabs"
      @change="changePage"
      @edit="editTabItem"
    >
      <a-tab-pane v-for="tabItem in tabsViewStore.getTabsList" :key="tabItem.fullPath">
        <template #tab>
          <TabsOperator
            :ref="(ins: TabsOperatorInstance) => (itemRefs[tabItem.fullPath] = ins)"
            :tab-item="tabItem"
          />
        </template>
      </a-tab-pane>
      <template #rightExtra>
        <TabsOperator :tab-item="route" :is-extra="true" />
      </template>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import TabsOperator from './tabs-operator.vue';
  import { useTabsViewStore } from '@/store/modules/tabsView';

  type TabsOperatorInstance = InstanceType<typeof TabsOperator>;

  const route = useRoute();
  const router = useRouter();
  const tabsViewStore = useTabsViewStore();

  const itemRefs: Recordable<TabsOperatorInstance | null> = {};

  const activeKey = computed(() => tabsViewStore.getCurrentTab?.fullPath);

  // tabs 编辑（remove || add）
  const editTabItem = (targetKey: string, action: string) => {
    if (action == 'remove') {
      itemRefs[targetKey]?.removeTab();
    }
  };
  // 切换页面
  const changePage = (key) => {
    Object.is(route.fullPath, key) || router.push(key);
  };
</script>

<style lang="less" scoped>
  .tabs-view {
    z-index: 99;
    background: rgba(255, 255, 255, 0.7) !important;
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(226, 232, 240, 0.8);
    transition: all 0.3s;

    :deep(.tabs) {
      .ant-tabs-nav {
        margin: 0;
        padding: 4px 24px 0 24px;
        user-select: none;
        background: transparent !important;

        &::before {
          border-bottom: none;
        }
      }

      .ant-tabs-tab {
        background: transparent !important;
        border: none !important;
        margin-right: 4px !important;
        padding: 6px 16px !important;
        border-radius: 6px 6px 0 0 !important;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
        color: #64748b !important;
        position: relative;

        &:hover {
          color: #8b5cf6 !important;
          background: rgba(139, 92, 246, 0.06) !important;
        }
      }

      .ant-tabs-tab-active {
        background: rgba(139, 92, 246, 0.08) !important;

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 15%;
          right: 15%;
          height: 2px;
          background: #8b5cf6;
          border-radius: 2px 2px 0 0;
        }

        .ant-tabs-tab-btn {
          color: #8b5cf6 !important;
          font-weight: 600;
          text-shadow: none !important;
        }
      }

      .ant-tabs-tabpane {
        display: none;
      }

      .ant-tabs-tab-remove {
        display: flex;
        margin: 0;
        padding: 0;
        color: #94a3b8;
        transition: all 0.2s;

        &:hover {
          color: #ef4444;
        }

        .anticon-close {
          font-size: 10px;
          padding-left: 4px;
        }
      }

      .ant-tabs-extra-content {
        display: flex;
        align-items: center;
      }
    }
  }

  :global(.dark) {
    .tabs-view {
      background: rgba(30, 41, 59, 0.7) !important;
      border-bottom: 1px solid rgba(51, 65, 85, 0.5);

      :deep(.tabs) {
        .ant-tabs-tab {
          color: #94a3b8 !important;
          &:hover {
            background: rgba(139, 92, 246, 0.12) !important;
            color: #a78bfa !important;
          }
        }

        .ant-tabs-tab-active {
          background: rgba(139, 92, 246, 0.15) !important;
          &::after {
            background: #a78bfa;
          }
          .ant-tabs-tab-btn {
            color: #a78bfa !important;
          }
        }
      }
    }
  }
</style>
