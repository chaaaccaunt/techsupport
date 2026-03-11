<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

const props = withDefaults(
  defineProps<{
    mobileOpen?: boolean;
  }>(),
  {
    mobileOpen: false,
  },
);

const emit = defineEmits<{
  (event: "close"): void;
}>();

const route = useRoute();
const isCollapsed = ref(false);

const menuItems = [
  { path: "/", icon: "ri-dashboard-line", label: "Панель управления" },
  { path: "/equipment", icon: "ri-computer-line", label: "Оборудование" },
  { path: "/maintenance", icon: "ri-tools-line", label: "Техническое обслуживание" },
  { path: "/tickets", icon: "ri-customer-service-line", label: "Заявки" },
  { path: "/chat", icon: "ri-chat-3-line", label: "Чаты" },
  { path: "/users", icon: "ri-user-line", label: "Пользователи" },
  { path: "/locations", icon: "ri-map-pin-line", label: "Локации" },
  { path: "/reports", icon: "ri-bar-chart-line", label: "Отчеты" },
  { path: "/departments", icon: "ri-building-line", label: "Отделы и должности" },
];

const asideClass = computed(() => {
  const widthClass = isCollapsed.value ? "lg:w-20" : "lg:w-64";
  const mobileClass = props.mobileOpen ? "translate-x-0" : "-translate-x-full";
  return `fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-gray-900 text-white transition-all duration-300 ${mobileClass} ${widthClass} lg:static lg:translate-x-0`;
});

function closeMobileSidebar() {
  emit("close");
}
</script>

<template>
  <div v-if="mobileOpen" class="fixed inset-0 z-30 bg-gray-900/50 backdrop-blur-sm lg:hidden" @click="closeMobileSidebar"></div>

  <aside :class="asideClass">
    <div class="flex items-center justify-between border-b border-gray-800 p-4">
      <div v-if="!isCollapsed" class="flex items-center gap-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
          <i class="ri-tools-line text-xl"></i>
        </div>
        <div>
          <h1 class="text-lg font-bold">EquipManager</h1>
          <p class="text-xs text-gray-400">Управление оборудованием</p>
        </div>
      </div>

      <button type="button" class="rounded-lg p-2 hover:bg-gray-800" @click="isCollapsed = !isCollapsed">
        <i :class="`ri-${isCollapsed ? 'menu-unfold' : 'menu-fold'}-line`"></i>
      </button>
    </div>

    <nav class="flex-1 space-y-1 overflow-y-auto p-4">
      <RouterLink
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        class="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors"
        :class="route.path === item.path ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'"
        @click="closeMobileSidebar"
      >
        <i :class="`${item.icon} text-xl`"></i>
        <span v-if="!isCollapsed" class="text-sm">{{ item.label }}</span>
      </RouterLink>
    </nav>

    <div class="border-t border-gray-800 p-4">
      <RouterLink to="/profile" class="flex items-center" :class="isCollapsed ? 'justify-center' : 'gap-3'" @click="closeMobileSidebar">
        <div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-medium">АД</div>
        <div v-if="!isCollapsed">
          <p class="text-sm font-medium">Администратор</p>
          <p class="text-xs text-gray-400">IT отдел</p>
        </div>
      </RouterLink>
    </div>
  </aside>
</template>
