<template>
  <div class="dashboard-container">
    <a-card :bordered="false" class="welcome-card">
      <div class="welcome-content">
        <div class="welcome-header">
          <h1 class="welcome-title">{{ greeting }}，{{ userInfo?.nickname || userInfo?.username || '用户' }}</h1>
          <p class="welcome-desc">欢迎使用 Nuct 企业级开发平台</p>
        </div>
        <a-row :gutter="24" class="quick-actions">
          <a-col :xs="24" :sm="12" :md="8" :lg="6">
            <a-card hoverable class="action-card" @click="router.push('/system/user')">
              <template #title>
                <div class="action-icon-wrapper">
                  <Icon icon="ant-design:user-outlined" class="action-icon" />
                </div>
                用户管理
              </template>
              <p>管理系统用户与权限</p>
            </a-card>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8" :lg="6">
            <a-card hoverable class="action-card" @click="router.push('/system/role')">
              <template #title>
                <div class="action-icon-wrapper">
                  <Icon icon="ep:user" class="action-icon" />
                </div>
                角色管理
              </template>
              <p>配置角色与菜单权限</p>
            </a-card>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8" :lg="6">
            <a-card hoverable class="action-card" @click="router.push('/system/menu')">
              <template #title>
                <div class="action-icon-wrapper">
                  <Icon icon="ep:menu" class="action-icon" />
                </div>
                菜单管理
              </template>
              <p>管理系统菜单与路由</p>
            </a-card>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8" :lg="6">
            <a-card hoverable class="action-card" @click="router.push('/account/settings')">
              <template #title>
                <div class="action-icon-wrapper">
                  <Icon icon="ant-design:setting-outlined" class="action-icon" />
                </div>
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
    padding: 24px;
    background: transparent;
    min-height: 100%;
  }

  .welcome-card {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 24px;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.05);
    transition: all 0.3s ease;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -10%;
      width: 300px;
      height: 300px;
      background: radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%);
      pointer-events: none;
    }
  }

  .welcome-content {
    padding: 32px;
    position: relative;
    z-index: 1;
  }

  .welcome-header {
    margin-bottom: 40px;

    .welcome-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 32px;
      font-weight: 700;
      margin: 0 0 12px;
      background: linear-gradient(to right, #8b5cf6, #ec4899);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .welcome-desc {
      margin: 0;
      font-size: 16px;
      color: #64748b;
      font-weight: 300;
    }
  }

  .quick-actions {
    .action-card {
      margin-bottom: 16px;
      cursor: pointer;
      border-radius: 20px;
      border: 1px solid rgba(226, 232, 240, 0.8);
      background: rgba(255, 255, 255, 0.5);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

      &:hover {
        transform: translateY(-6px);
        background: white;
        border-color: #8b5cf6;
        box-shadow: 0 12px 24px rgba(139, 92, 246, 0.1);

        .action-icon-wrapper {
          background: #8b5cf6;
          color: white;
          transform: rotate(10deg);
        }

        :deep(.ant-card-head-title) {
          color: #8b5cf6;
        }
      }

      :deep(.ant-card-head) {
        border-bottom: none;
        padding: 20px 24px 0;
      }

      :deep(.ant-card-head-title) {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 18px;
        font-weight: 600;
        color: #1e293b;
        transition: color 0.3s;
      }

      :deep(.ant-card-body) {
        padding: 12px 24px 24px;
      }

      p {
        margin: 0;
        font-size: 14px;
        color: #64748b;
        line-height: 1.6;
      }
    }

    .action-icon-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 12px;
      background: rgba(139, 92, 246, 0.1);
      color: #8b5cf6;
      transition: all 0.3s;
    }

    .action-icon {
      font-size: 22px;
    }
  }

  :global(.dark) {
    .welcome-card {
      background: rgba(30, 41, 59, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
    }

    .welcome-desc {
      color: #94a3b8;
    }

    .quick-actions .action-card {
      background: rgba(15, 23, 42, 0.5);
      border-color: rgba(51, 65, 85, 0.5);

      &:hover {
        background: rgba(30, 41, 59, 0.8);
        border-color: #a78bfa;
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);

        :deep(.ant-card-head-title) {
          color: #a78bfa;
        }
      }

      :deep(.ant-card-head-title) {
        color: #f1f5f9;
      }

      p {
        color: #94a3b8;
      }
    }
  }
</style>
