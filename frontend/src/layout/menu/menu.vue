<template>
  <div class="menu-container" :class="{ 'is-side-menu': isSideMenu }">
    <Menu
      v-model:selected-keys="selectedKeys"
      :open-keys="isSideMenu ? openKeys : []"
      :mode="isSideMenu ? 'inline' : 'horizontal'"
      :theme="theme"
      :collapsed="props.collapsed"
      collapsible
      @click="clickMenuItem"
    >
      <template v-for="item in menus" :key="item.name">
        <SubMenuItem :item="item" />
      </template>
    </Menu>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, watch, type PropType } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { Menu, type MenuTheme, type MenuProps } from 'ant-design-vue';
  import SubMenuItem from './components/sub-menu-item.vue';
  import { useUserStore } from '@/store/modules/user';
  import { useLayoutSettingStore } from '@/store/modules/layoutSetting';
  import { LOGIN_NAME } from '@/router/constant';

  const props = defineProps({
    collapsed: {
      // 侧边栏菜单是否收起
      type: Boolean,
    },
    theme: {
      type: String as PropType<MenuTheme>,
    },
  });
  const userStore = useUserStore();
  const layoutSettingStore = useLayoutSettingStore();
  // 当前路由
  const currentRoute = useRoute();
  const router = useRouter();
  const openKeys = ref<string[]>([]);
  const selectedKeys = ref<string[]>([currentRoute.name as string]);

  const menus = computed(() => userStore.menus);
  // console.log('menus', menus.value);
  /** 侧边栏布局 */
  const isSideMenu = computed(() => layoutSettingStore.layoutSetting.layout === 'sidemenu');
  const getRouteByName = (name: string) => router.getRoutes().find((n) => n.name === name);

  // 获取当前打开的子菜单
  const getOpenKeys = () => {
    return (
      currentRoute.meta?.namePath ?? (currentRoute.matched.slice(1).map((n) => n.name) as string[])
    );
  };

  // 监听菜单收缩状态
  watch(
    () => props.collapsed,
    () => {
      selectedKeys.value = [currentRoute.name] as string[];
      setTimeout(() => {
        openKeys.value = getOpenKeys();
      });
    },
  );

  // 跟随页面路由变化，切换菜单选中状态
  watch(
    () => currentRoute.fullPath,
    () => {
      selectedKeys.value = [currentRoute.meta?.activeMenu ?? currentRoute.name] as string[];
      if (currentRoute.name === LOGIN_NAME || props.collapsed) return;
      openKeys.value = getOpenKeys();
    },
    {
      immediate: true,
    },
  );

  // 点击菜单
  const clickMenuItem: MenuProps['onClick'] = ({ key }) => {
    if (key === currentRoute.name) return;
    const preSelectedKeys = selectedKeys.value;
    const targetRoute = getRouteByName(key as string);
    const { isExt, extOpenMode } = targetRoute?.meta || {};
    if (targetRoute && isExt && extOpenMode === 1) {
      queueMicrotask(() => {
        selectedKeys.value = preSelectedKeys;
      });
    }
  };
</script>

<style lang="less" scoped>
  .menu-container {
    width: 100%;
    overflow: auto;
    background: transparent;

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }

    &.is-side-menu {
      height: calc(100vh - var(--app-header-height));
    }

    & > :deep(.ant-menu) {
      justify-content: center;
      width: 100%;
      border-inline-end: none !important;
      background: transparent;

      // 菜单项基础样式
      .ant-menu-item,
      .ant-menu-submenu-title {
        height: 48px !important;
        line-height: 48px !important;
        margin: 4px 12px !important;
        width: calc(100% - 24px) !important;
        border-radius: 12px !important;
        color: #64748b !important;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

        &:hover {
          color: #8b5cf6 !important;
          background: rgba(139, 92, 246, 0.08) !important;
        }

        .ant-menu-item-icon,
        .anticon {
          font-size: 18px !important;
          transition: transform 0.3s ease;
        }

        &:hover .ant-menu-item-icon {
          transform: scale(1.1);
        }
      }

      // 选中状态
      .ant-menu-item-selected {
        background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%) !important;
        color: #8b5cf6 !important;
        font-weight: 600;

        &::after {
          display: none;
        }

        .ant-menu-item-icon {
          color: #8b5cf6 !important;
        }
      }

      // 子菜单展开状态
      .ant-menu-submenu-open > .ant-menu-submenu-title {
        color: #8b5cf6 !important;
        font-weight: 500;
      }

      // 收起状态样式
      &.ant-menu-inline-collapsed {
        .ant-menu-item,
        .ant-menu-submenu-title {
          margin: 4px 8px !important;
          width: calc(100% - 16px) !important;
          padding: 0 calc(50% - 9px) !important;
        }
      }
    }
  }

  // 深色模式适配
  :global(.dark) {
    .menu-container > :deep(.ant-menu) {
      .ant-menu-item,
      .ant-menu-submenu-title {
        color: #94a3b8 !important;

        &:hover {
          background: rgba(139, 92, 246, 0.15) !important;
          color: #a78bfa !important;
        }
      }

      .ant-menu-item-selected {
        background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%) !important;
        color: #a78bfa !important;
      }
    }
  }
</style>
