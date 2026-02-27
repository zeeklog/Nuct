<template>
  <div class="dashboard-container">
    <a-card :bordered="false" class="welcome-card">
      <div class="welcome-content">
        <div class="welcome-header">
          <h1 class="welcome-title">{{ greeting }}，{{ userInfo?.nickname || userInfo?.username || '用户' }}</h1>
          <p class="welcome-desc">欢迎使用 Nest Admin 后台管理系统</p>
        </div>
        <a-row :gutter="16" class="quick-actions">
          <a-col :xs="24" :sm="12" :md="8" :lg="6">
            <a-card hoverable class="action-card" @click="router.push('/system/user')">
              <template #title>
                <Icon icon="ant-design:user-outlined" class="action-icon" />
                用户管理
              </template>
              <p>管理系统用户与权限</p>
            </a-card>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8" :lg="6">
            <a-card hoverable class="action-card" @click="router.push('/system/role')">
              <template #title>
                <Icon icon="ep:user" class="action-icon" />
                角色管理
              </template>
              <p>配置角色与菜单权限</p>
            </a-card>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8" :lg="6">
            <a-card hoverable class="action-card" @click="router.push('/system/menu')">
              <template #title>
                <Icon icon="ep:menu" class="action-icon" />
                菜单管理
              </template>
              <p>管理系统菜单与路由</p>
            </a-card>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8" :lg="6">
            <a-card hoverable class="action-card" @click="router.push('/account/settings')">
              <template #title>
                <Icon icon="ant-design:setting-outlined" class="action-icon" />
                个人设置
              </template>
              <p>修改个人信息与密码</p>
            </a-card>
          </a-col>
        </a-row>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { Icon } from '@/components/basic/icon';
  import { useUserStore } from '@/store/modules/user';

  defineOptions({
    name: 'Dashboard',
  });

  const router = useRouter();
  const userStore = useUserStore();
  const userInfo = computed(() => userStore.userInfo);

  const greeting = computed(() => {
    const hour = new Date().getHours();
    if (hour < 6) return '夜深了';
    if (hour < 9) return '早上好';
    if (hour < 12) return '上午好';
    if (hour < 14) return '中午好';
    if (hour < 18) return '下午好';
    if (hour < 22) return '晚上好';
    return '夜深了';
  });
</script>

<style scoped lang="less">
  .dashboard-container {
    padding: 16px;
  }

  .welcome-card {
    border-radius: 8px;
  }

  .welcome-content {
    padding: 24px 0;
  }

  .welcome-header {
    margin-bottom: 32px;

    .welcome-title {
      font-size: 24px;
      font-weight: 600;
      margin: 0 0 8px;
      color: var(--text-color);
    }

    .welcome-desc {
      margin: 0;
      font-size: 14px;
      color: var(--text-color-secondary);
    }
  }

  .quick-actions {
    .action-card {
      margin-bottom: 16px;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      }

      :deep(.ant-card-head-title) {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      p {
        margin: 0;
        font-size: 13px;
        color: var(--text-color-secondary);
      }
    }

    .action-icon {
      font-size: 20px;
      color: var(--primary-color);
    }
  }
</style>
