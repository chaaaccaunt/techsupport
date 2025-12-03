<script lang="ts" setup>
import { ref } from "vue";
import Button from "../base/iButton.vue";

const showNotifications = ref(false);
const showProfile = ref(false);

const notifications = [
  { id: 1, text: "Просрочено ТО для оборудования ПК-001", type: "warning", time: "5 мин назад" },
  { id: 2, text: "Новая заявка на ремонт принтера", type: "info", time: "10 мин назад" },
  { id: 3, text: "Оборудование передано новому ответственному", type: "success", time: "1 час назад" },
];
</script>

<template>
  <header class="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <h2 class="text-xl font-semibold text-gray-900">Система учёта оборудования</h2>
      </div>
      <div class="flex items-center space-x-4">
        <div class="relative">
          <input
            type="text"
            placeholder="Поиск по серийному номеру..."
            class="w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <i class="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        </div>
        <div class="relative">
          <button @click="() => (showNotifications = !showNotifications)" class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg cursor-pointer relative">
            <i class="ri-notification-line text-xl"></i>
            <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"> 3 </span>
          </button>
          <div v-if="showNotifications" class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            <div class="p-4 border-b border-gray-200">
              <h3 class="font-medium text-gray-900">Уведомления</h3>
            </div>
            <div class="max-h-80 overflow-y-auto">
              <div v-for="notification in notifications" :key="notification.id" class="p-4 border-b border-gray-100 hover:bg-gray-50">
                <div class="flex items-start space-x-3">
                  <div
                    :class="`w-2 h-2 rounded-full mt-2 ${notification.type === 'warning' ? 'bg-yellow-500' : notification.type === 'info' ? 'bg-blue-500' : 'bg-green-500'}`"
                  ></div>
                  <div class="flex-1">
                    <p class="text-sm text-gray-900">{{ notification.text }}</p>
                    <p class="text-xs text-gray-500 mt-1">{{ notification.time }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="p-4">
              <Button :variant="'outline'" :size="'sm'" class="w-full"> Показать все уведомления </Button>
            </div>
          </div>
        </div>
        <div class="relative">
          <button @click="() => (showProfile = !showProfile)" class="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg cursor-pointer">
            <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <i class="ri-user-line text-white text-sm"></i>
            </div>
            <span class="text-sm font-medium">Администратор</span>
            <i class="ri-arrow-down-s-line text-sm"></i>
          </button>
          <div v-if="showProfile" class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            <div class="p-2">
              <a href="#" class="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                <i class="ri-user-settings-line mr-3"></i>
                Профиль
              </a>
              <a href="#" class="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                <i class="ri-settings-line mr-3"></i>
                Настройки
              </a>
              <hr class="my-2" />
              <a href="#" class="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md">
                <i class="ri-logout-box-line mr-3"></i>
                Выход
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
