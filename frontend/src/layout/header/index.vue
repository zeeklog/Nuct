<template>
  <Layout.Header :style="headerStyle" class="layout-header">
    <div class="header-left">
      <slot name="left">
        <Space :size="20">
          <span
            class="menu-fold cursor-pointer"
            @click="() => emit('update:collapsed', !collapsed)"
          >
            <component :is="collapsed ? MenuUnfoldOutlined : MenuFoldOutlined" />
          </span>
          <LayoutBreadcrumb />
        </Space>
      </slot>
    </div>
    <div class="header-menu">
      <slot name="menu" />
    </div>
    <div class="header-right">
      <Space :size="20">
        <Search />
        <Tooltip :title="$t('layout.header.tooltipLock')" placement="bottom">
          <LockOutlined @click="lockscreenStore.setLock(true)" />
        </Tooltip>
        <FullScreen />
        <LocalePicker />
        <Dropdown placement="bottomRight">
          <Avatar :src="userInfo.avatar" :alt="userInfo.username">{{ userInfo.username }}</Avatar>
          <template #overlay>
            <Menu>
              <Menu.Item v-if="isSuperAdmin" @click="openTenantSwitch">
                <TeamOutlined /> 切换租户
                <span v-if="tenantStore.currentTenantName" class="text-gray-400 ml-1">
                  ({{ tenantStore.currentTenantName }})
                </span>
              </Menu.Item>
              <Menu.Item @click="$router.push({ name: 'account-settings' })">
                {{ $t('routes.account.settings') }}
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item>
                <div @click.prevent="doLogout">
                  <poweroff-outlined /> {{ $t('layout.header.dropdownItemLoginOut') }}
                </div>
              </Menu.Item>
            </Menu>
          </template>
        </Dropdown>
        <!-- <ProjectSetting /> -->
      </Space>
    </div>
    <Modal
      v-model:open="tenantSwitchVisible"
      title="切换租户"
      :footer="null"
      width="400"
    >
      <div v-if="tenantStore.tenantList.length" class="py-2">
        <div class="mb-2 text-gray-500 text-sm">选择要管理的租户，切换后菜单与数据将按该租户过滤：</div>
        <div class="flex flex-col gap-1 max-h-60 overflow-y-auto">
          <div
            v-for="t in tenantStore.tenantList"
            :key="t.id"
            class="px-3 py-2 rounded cursor-pointer hover:bg-gray-100 flex justify-between items-center"
            @click="onSelectTenant(t)"
          >
            <span>{{ t.name }}</span>
            <span class="text-gray-400 text-sm">{{ t.code }}</span>
          </div>
        </div>
      </div>
      <div v-else class="py-4 text-center text-gray-500">正在加载租户列表...</div>
    </Modal>
  </Layout.Header>
</template>

<script lang="tsx" setup>
  import { computed, ref, type CSSProperties } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import {
    QuestionCircleOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PoweroffOutlined,
    LockOutlined,
    TeamOutlined,
  } from '@ant-design/icons-vue';
  import {
    Layout,
    message,
    Modal,
    Dropdown,
    Menu,
    Space,
    Avatar,
    Tooltip,
    type MenuTheme,
  } from 'ant-design-vue';
  import { Search, FullScreen, ProjectSetting, LayoutBreadcrumb } from './components/';
  import { LocalePicker } from '@/components/basic/locale-picker';
  import { useUserStore } from '@/store/modules/user';
  import { useTenantStore } from '@/store/modules/tenant';
  import { useKeepAliveStore } from '@/store/modules/keepAlive';
  import { useLockscreenStore } from '@/store/modules/lockscreen';
  import { LOGIN_NAME } from '@/router/constant';
  import { useLayoutSettingStore } from '@/store/modules/layoutSetting';

  defineProps({
    collapsed: {
      type: Boolean,
    },
    theme: {
      type: String as PropType<MenuTheme>,
    },
  });
  const emit = defineEmits(['update:collapsed']);
  const userStore = useUserStore();
  const tenantStore = useTenantStore();
  const layoutSettingStore = useLayoutSettingStore();
  const lockscreenStore = useLockscreenStore();
  const keepAliveStore = useKeepAliveStore();

  const router = useRouter();
  const isSuperAdmin = computed(() => userInfo.value?.id === 1);

  const tenantSwitchVisible = ref(false);
  const openTenantSwitch = async () => {
    tenantSwitchVisible.value = true;
    await tenantStore.fetchTenantList();
  };
  const onSelectTenant = (t: { id: number; name: string }) => {
    tenantStore.setCurrentTenant(t.id, t.name);
    userStore.fetchPermsAndMenus();
    message.success(`已切换到租户：${t.name}`);
    tenantSwitchVisible.value = false;
    window.location.reload();
  };
  const route = useRoute();
  const userInfo = computed(() => userStore.userInfo);
  const headerStyle = computed<CSSProperties>(() => {
    const { navTheme, layout } = layoutSettingStore.layoutSetting;
    const isDark = navTheme === 'dark' && layout === 'topmenu';
    return {
      backgroundColor: navTheme === 'realDark' || isDark ? '' : 'rgba(255, 255, 255, 0.85)',
      color: isDark ? 'rgba(255, 255, 255, 0.85)' : '',
    };
  });

  // 退出登录
  const doLogout = () => {
    Modal.confirm({
      title: '您确定要退出登录吗？',
      icon: <QuestionCircleOutlined />,
      centered: true,
      onOk: async () => {
        await userStore.logout();
        keepAliveStore.clear();
        // 移除标签页
        localStorage.clear();
        message.success('成功退出登录');
        router.replace({
          name: LOGIN_NAME,
          query: {
            redirect: route.fullPath,
          },
        });
      },
    });
  };
</script>

<style lang="less" scoped>
  .layout-header {
    display: flex;
    position: sticky;
    z-index: 100;
    top: 0;
    align-items: center;
    justify-content: space-between;
    height: var(--app-header-height);
    padding: 0 24px;
    background: rgba(255, 255, 255, 0.7) !important;
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(226, 232, 240, 0.8);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.02);
    transition: all 0.3s;

    .header-left {
      display: flex;
      align-items: center;

      .menu-fold {
        font-size: 18px;
        color: #64748b;
        padding: 8px;
        border-radius: 8px;
        transition: all 0.2s;

        &:hover {
          background: rgba(139, 92, 246, 0.08);
          color: #8b5cf6;
        }
      }
    }

    .header-right {
      min-width: 180px;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      :deep(.ant-space-item) {
        display: flex;
        align-items: center;
        color: #64748b;
        font-size: 18px;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
          color: #8b5cf6;
        }
      }

      :deep(.ant-avatar) {
        border: 2px solid #fff;
        box-shadow: 0 2px 8px rgba(139, 92, 246, 0.2);
        transition: all 0.3s;

        &:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
        }
      }
    }

    .header-menu {
      flex: 1;
      align-items: center;
      min-width: 0;
      padding: 0 24px;
    }
  }

  :deep(.ant-tabs-nav) {
    margin-bottom: 0 !important;
  }

  :global(.dark) {
    .layout-header {
      background: rgba(30, 41, 59, 0.7) !important;
      border-bottom: 1px solid rgba(51, 65, 85, 0.5);
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);

      .header-left .menu-fold {
        color: #94a3b8;
        &:hover {
          background: rgba(139, 92, 246, 0.15);
          color: #a78bfa;
        }
      }

      .header-right :deep(.ant-space-item) {
        color: #94a3b8;
        &:hover {
          color: #a78bfa;
        }
      }
    }
  }
</style>
