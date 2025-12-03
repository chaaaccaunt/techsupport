<script lang="ts" setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const isCollapsed = ref(false);

const menuItems = [
  { path: "/", icon: "ri-dashboard-line", label: "Панель управления" },
  { path: "/equipment", icon: "ri-computer-line", label: "Оборудование" },
  { path: "/maintenance", icon: "ri-tools-line", label: "Техобслуживание" },
  { path: "/tickets", icon: "ri-customer-service-line", label: "Заявки" },
  { path: "/users", icon: "ri-user-line", label: "Пользователи" },
  { path: "/locations", icon: "ri-building-line", label: "Локации" },
  { path: "/reports", icon: "ri-file-chart-line", label: "Отчёты" },
];
</script>

<template>
  <div :class="`bg-gray-900 text-white transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`">
    <div class="p-4">
      <div class="flex items-center justify-between">
        <h1 v-if="!isCollapsed" class="text-xl font-bold">Система учёта</h1>
        <button @click="() => (isCollapsed = !isCollapsed)" class="p-2 rounded-lg hover:bg-gray-800 cursor-pointer">
          <i :class="`ri-${isCollapsed ? 'menu-unfold' : 'menu-fold'}-line`"></i>
        </button>
      </div>
    </div>
    <nav class="mt-8">
      <RouterLink
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        :class="`flex items-center px-4 py-3 text-sm font-medium transition-colors cursor-pointer
              ${route.path === item.path ? 'bg-blue-600 text-white border-r-2 border-blue-400' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}
            `"
      >
        <i :class="`${item.icon} text-lg`"></i>
        <span v-if="!isCollapsed" class="ml-3">{item.label}</span>
      </RouterLink>
    </nav>
    <div class="absolute bottom-4 left-4 right-4">
      <div :class="`flex items-center ${isCollapsed ? 'justify-center' : ''}`">
        <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <i class="ri-user-line text-sm"></i>
        </div>
        <div v-if="isCollapsed" class="ml-3">
          <p class="text-sm font-medium">Администратор</p>
          <p class="text-xs text-gray-400">admin@system.ru</p>
        </div>
      </div>
    </div>
  </div>
</template>
