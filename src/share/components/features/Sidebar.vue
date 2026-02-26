<script lang="ts" setup>
import { useStore } from "@/entities";
import { iUserInfo } from "@/entities/store/modules/auth";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const store = useStore();
const isCollapsed = ref(false);

const user = computed(() => store.getters["auth/GET_USER"] as iUserInfo);

const menuItems = [
  { path: "/", icon: "ri-dashboard-line", label: "Панель управления" },
  { path: "/equipment", icon: "ri-computer-line", label: "Оборудование" },
  { path: "/maintenance", icon: "ri-tools-line", label: "Техническое обслуживание" },
  { path: "/tickets", icon: "ri-customer-service-line", label: "Заявки" },
  { path: "/users", icon: "ri-user-line", label: "Пользователи" },
  { path: "/locations", icon: "ri-map-pin-line", label: "Локации" },
  { path: "/reports", icon: "ri-bar-chart-line", label: "Отчеты" },
];
</script>

<template>
  <aside :class="`bg-gray-900 text-white transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'} flex flex-col`">
    <div class="p-4 flex items-center justify-between border-b border-gray-800">
      <div v-if="!isCollapsed" class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
          <i class="ri-settings-3-line text-xl"></i>
        </div>
        <div>
          <h1 class="font-bold text-lg">EquipManager</h1>
          <p class="text-xs text-gray-400">Управление оборудованием</p>
        </div>
      </div>
      <button @click="() => (isCollapsed = !isCollapsed)" class="p-2 hover:bg-gray-800 rounded-lg cursor-pointer">
        <i :class="`ri-${isCollapsed ? 'menu-unfold' : 'menu-fold'}-line`"></i>
      </button>
    </div>
    <nav class="flex-1 p-4 space-y-2 overflow-y-auto">
      <div class="space-y-1">
        <RouterLink
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          :class="`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
            route.fullPath === item.path ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'
          }`"
        >
          <i :class="`${item.icon} text-xl`"></i>
          <span v-if="!isCollapsed" class="text-sm">{{ item.label }}</span>
        </RouterLink>
      </div>
    </nav>
    <div class="p-4 border-t border-gray-800">
      <div :class="`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`">
        <div class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
          <span class="text-sm font-medium">АД</span>
        </div>
        <div v-if="!isCollapsed" class="flex-1">
          <p class="text-sm font-medium">{{ `${user.lastName} ${user.firstName[0]}.` }}</p>
          <p class="text-xs text-gray-400">{{ user.staff.organization.shortName }}</p>
        </div>
      </div>
    </div>
  </aside>
</template>
