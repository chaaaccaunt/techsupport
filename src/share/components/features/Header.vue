<script setup lang="ts">
const notifications = [
  { id: 1, text: "Просрочено ТО для оборудования ПК-001", time: "5 мин назад", color: "bg-yellow-500" },
  { id: 2, text: "Новая заявка на ремонт принтера", time: "10 мин назад", color: "bg-blue-500" },
  { id: 3, text: "Оборудование передано новому ответственному", time: "1 час назад", color: "bg-green-500" },
];
</script>

<template>
  <header class="border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
    <div class="flex items-center justify-between gap-4">
      <h2 class="text-xl font-semibold text-gray-900">Система учета оборудования</h2>

      <div class="flex items-center gap-4">
        <div class="relative hidden lg:block">
          <input
            type="text"
            placeholder="Поиск по серийному номеру..."
            class="w-80 rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm"
          />
          <i class="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
        </div>

        <div class="relative">
          <button class="relative rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900">
            <i class="ri-notification-line text-xl"></i>
            <span class="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">3</span>
          </button>
          <div class="absolute right-0 mt-2 hidden w-80 rounded-lg border border-gray-200 bg-white shadow-lg">
            <div class="border-b border-gray-200 p-4">
              <h3 class="font-medium text-gray-900">Уведомления</h3>
            </div>
            <div class="max-h-80 overflow-y-auto">
              <div v-for="notification in notifications" :key="notification.id" class="border-b border-gray-100 p-4">
                <div class="flex items-start gap-3">
                  <div :class="['mt-2 h-2 w-2 rounded-full', notification.color]"></div>
                  <div>
                    <p class="text-sm text-gray-900">{{ notification.text }}</p>
                    <p class="mt-1 text-xs text-gray-500">{{ notification.time }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2 rounded-lg p-2 text-gray-600 hover:bg-gray-100">
          <div class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600">
            <i class="ri-user-line text-sm text-white"></i>
          </div>
          <span class="text-sm font-medium">Администратор</span>
          <i class="ri-arrow-down-s-line text-sm"></i>
        </div>
      </div>
    </div>
  </header>
</template>
