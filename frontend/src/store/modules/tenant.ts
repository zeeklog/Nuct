import { ref } from 'vue';
import { defineStore } from 'pinia';
import Api from '@/api/';

export const useTenantStore = defineStore(
  'tenant',
  () => {
    const tenantList = ref<{ id: number; name: string; code: string }[]>([]);
    const currentTenantId = ref<number | null>(null);
    const currentTenantName = ref<string>('');

    const fetchTenantList = async () => {
      const list = await Api.systemTenant.tenantListSimple();
      tenantList.value = list;
      return list;
    };

    const setCurrentTenant = (tenantId: number | null, tenantName?: string) => {
      currentTenantId.value = tenantId;
      currentTenantName.value = tenantName ?? '';
    };

    const clearTenant = () => {
      currentTenantId.value = null;
      currentTenantName.value = '';
    };

    return {
      tenantList,
      currentTenantId,
      currentTenantName,
      fetchTenantList,
      setCurrentTenant,
      clearTenant,
    };
  },
  {
    persist: {
      pick: ['currentTenantId', 'currentTenantName'],
    },
  },
);
