<script setup lang="ts">
import { ref } from "vue";

const activeTab = ref<"general" | "notifications" | "security" | "appearance">("general");
const noop = () => {};
const tabs = [
  { id: "general", label: "Общие", icon: "ri-settings-3-line" },
  { id: "notifications", label: "Уведомления", icon: "ri-notification-line" },
  { id: "security", label: "Безопасность", icon: "ri-shield-line" },
  { id: "appearance", label: "Внешний вид", icon: "ri-palette-line" },
];
</script>

<template>
  <div class="space-y-6 p-6">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Настройки</h1>
      <p class="mt-1 text-sm text-gray-600">Управление параметрами системы и личными настройками</p>
    </div>

    <div class="flex space-x-2 border-b border-gray-200">
      <button v-for="tab in tabs" :key="tab.id" :class="`flex items-center whitespace-nowrap px-4 py-3 text-sm font-medium ${activeTab === tab.id ? 'border-b-2 border-teal-600 text-teal-600' : 'text-gray-600'}`" @click="noop"><i :class="`${tab.icon} mr-2`"></i>{{ tab.label }}</button>
    </div>

    <section class="rounded-xl bg-white p-6 shadow-sm">
      <div v-if="activeTab === 'general'" class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-900">Основная информация</h3>
        <div class="grid grid-cols-2 gap-4">
          <input value="IT Equipment Management" class="rounded-lg border border-gray-300 px-3 py-2 text-sm" />
          <input value="admin@company.com" class="rounded-lg border border-gray-300 px-3 py-2 text-sm" />
          <input value="+7 (999) 123-45-67" class="rounded-lg border border-gray-300 px-3 py-2 text-sm" />
          <select class="rounded-lg border border-gray-300 px-3 py-2 text-sm"><option>Москва (UTC+3)</option></select>
          <input value="Москва, ул. Примерная, д. 123" class="col-span-2 rounded-lg border border-gray-300 px-3 py-2 text-sm" />
        </div>
      </div>
      <div v-else-if="activeTab === 'notifications'" class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-900">Уведомления</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between rounded-lg bg-gray-50 p-4"><div><p class="text-sm font-medium text-gray-900">Email уведомления</p><p class="text-xs text-gray-600">Получать уведомления на почту</p></div><div class="h-6 w-11 rounded-full bg-teal-600"></div></div>
          <div class="flex items-center justify-between rounded-lg bg-gray-50 p-4"><div><p class="text-sm font-medium text-gray-900">Новые заявки</p><p class="text-xs text-gray-600">Уведомления о создании заявок</p></div><div class="h-6 w-11 rounded-full bg-teal-600"></div></div>
          <div class="flex items-center justify-between rounded-lg bg-gray-50 p-4"><div><p class="text-sm font-medium text-gray-900">Напоминания об обслуживании</p><p class="text-xs text-gray-600">Уведомления о плановом ТО</p></div><div class="h-6 w-11 rounded-full bg-teal-600"></div></div>
        </div>
      </div>
      <div v-else-if="activeTab === 'security'" class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-900">Безопасность</h3>
        <div class="max-w-md space-y-4">
          <input type="password" placeholder="Текущий пароль" class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
          <input type="password" placeholder="Новый пароль" class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
          <input type="password" placeholder="Подтверждение пароля" class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
          <div class="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">Двухфакторная аутентификация и тайм-аут сессии оставлены как статические элементы интерфейса.</div>
        </div>
      </div>
      <div v-else class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-900">Внешний вид</h3>
        <div class="grid grid-cols-3 gap-4">
          <div class="rounded-lg border-2 border-teal-500 bg-teal-50 p-4 text-center"><div class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-white shadow-sm"><i class="ri-sun-line text-2xl text-yellow-500"></i></div><p class="text-sm font-medium text-gray-900">Светлая</p></div>
          <div class="rounded-lg border-2 border-gray-200 p-4 text-center"><div class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-900 shadow-sm"><i class="ri-moon-line text-2xl text-blue-400"></i></div><p class="text-sm font-medium text-gray-900">Темная</p></div>
          <div class="rounded-lg border-2 border-gray-200 p-4 text-center"><div class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-gray-900 to-white shadow-sm"><i class="ri-contrast-line text-2xl text-gray-500"></i></div><p class="text-sm font-medium text-gray-900">Авто</p></div>
        </div>
      </div>
      <div class="mt-6 flex justify-end border-t pt-4">
        <button class="rounded-lg bg-teal-600 px-4 py-2 text-sm text-white"><i class="ri-save-line mr-2"></i>Сохранить изменения</button>
      </div>
    </section>
  </div>
</template>
