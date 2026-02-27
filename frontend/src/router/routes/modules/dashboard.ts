import type { RouteRecordRaw } from 'vue-router';
import { t } from '@/hooks/useI18n';

const moduleName = 'dashboard';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    name: moduleName,
    redirect: '/dashboard/index',
    meta: {
      title: t('routes.dashboard.dashboard'),
      icon: 'ant-design:dashboard-outlined',
    },
    children: [
      {
        path: 'index',
        name: `${moduleName}-index`,
        meta: {
          title: t('routes.dashboard.workbench'),
          icon: 'ant-design:home-filled',
        },
        component: () => import('@/views/dashboard/index.vue'),
      },
    ],
  },
];

export default routes;
