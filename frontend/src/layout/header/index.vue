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
        <ProjectSetting />
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
    z-index: 10;
    top: 0;
    align-items: center;
    justify-content: space-between;
    height: var(--app-header-height);
    padding: 0 20px;

    .header-right {
      min-width: 180px;
      cursor: pointer;
    }

    .header-menu {
      flex: 1;
      align-items: center;
      min-width: 0;
    }
  }
</style>
