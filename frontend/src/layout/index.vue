<template>
  <Layout class="layout">
    <Layout.Sider
      v-if="layoutSetting.layout === 'sidemenu'"
      v-model:collapsed="collapsed"
      :width="asiderWidth"
      :trigger="null"
      collapsible
      :theme="getTheme"
      class="layout-sider"
    >
      <Logo :collapsed="collapsed" />
      <AsideMenu :collapsed="collapsed" :theme="getTheme" />
    </Layout.Sider>
    <Layout>
      <PageHeader v-model:collapsed="collapsed" :theme="getTheme">
        <template v-if="layoutSetting.layout === 'topmenu'" #left>
          <Logo :collapsed="collapsed" />
        </template>
        <template v-if="layoutSetting.layout === 'topmenu'" #menu>
          <AsideMenu :collapsed="collapsed" :theme="getTheme" />
        </template>
      </PageHeader>
      <tabs-view />
      <Layout.Content class="layout-content">
        <router-view v-slot="{ Component }">
          <template v-if="Component">
            <Suspense>
              <template #default>
                <component :is="Component" />
              </template>
              <template #fallback> 正在加载... </template>
            </Suspense>
          </template>
        </router-view>
      </Layout.Content>
      <PageFooter />
    </Layout>
  </Layout>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { storeToRefs } from 'pinia';
  import { Layout } from 'ant-design-vue';
  import Logo from './logo/index.vue';
  import { TabsView } from './tabs';
  import AsideMenu from './menu/menu.vue';
  import PageHeader from './header/index.vue';
  import PageFooter from './footer';
  import { useLayoutSettingStore } from '@/store/modules/layoutSetting';

  const layoutSettingStore = useLayoutSettingStore();
  const { layoutSetting } = storeToRefs(layoutSettingStore);
  const collapsed = ref<boolean>(false);
  // 自定义侧边栏菜单收缩和展开时的宽度
  const asiderWidth = computed(() => (collapsed.value ? 80 : 220));
  const getTheme = computed(() => (layoutSetting.value.navTheme === 'light' ? 'light' : 'dark'));
</script>

<style lang="less" scoped>
  .layout {
    display: flex;
    height: 100vh;
    overflow: hidden;
    background: #FFFFFF;

    .layout-sider {
      background: rgba(255, 255, 255, 0.7) !important;
      backdrop-filter: blur(20px);
      border-right: 1px solid rgba(226, 232, 240, 0.8);
      box-shadow: 4px 0 24px rgba(0, 0, 0, 0.02);
      z-index: 100;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

      :deep(.ant-layout-sider-children) {
        display: flex;
        flex-direction: column;
        background: transparent !important;
      }
    }

    .ant-layout {
      overflow: hidden;
      background: transparent;
      display: flex;
      flex-direction: column;
    }

    .layout-content {
      flex: 1;
      background: #f1f5f9;
      padding: 16px;
      overflow-y: auto;
      position: relative;
    }
  }

  :global(.dark) {
    .layout {
      background: #0f172a;

      .layout-sider {
        background: rgba(30, 41, 59, 0.7) !important;
        border-right: 1px solid rgba(51, 65, 85, 0.5);
        box-shadow: 4px 0 24px rgba(0, 0, 0, 0.2);
      }

      .layout-content {
        background: #0f172a;
      }
    }
  }
</style>
