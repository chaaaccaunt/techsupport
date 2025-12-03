<script lang="ts" setup>
import Card from "@/share/components/base/iCard.vue";
import Button from "@/share/components/base/iButton.vue";
import { h, ref } from "vue";

const stats = ref([
  { title: "Всего оборудования", value: "1,247", icon: "ri-computer-line", color: "blue" },
  { title: "Исправное", value: "1,156", icon: "ri-checkbox-circle-line", color: "green" },
  { title: "Неисправное", value: "23", icon: "ri-error-warning-line", color: "red" },
  { title: "На ТО", value: "45", icon: "ri-tools-line", color: "yellow" },
  { title: "Без ответственного", value: "12", icon: "ri-user-unfollow-line", color: "orange" },
  { title: "Просроченное ТО", value: "8", icon: "ri-time-line", color: "purple" },
]);

const recentTickets = ref([
  { id: "T-001", equipment: "ПК-12345", description: "Не включается монитор", priority: "Высокий", status: "Новая" },
  { id: "T-002", equipment: "ПР-67890", description: "Замятие бумаги", priority: "Средний", status: "В работе" },
  { id: "T-003", equipment: "СК-11111", description: "Не сканирует документы", priority: "Низкий", status: "Новая" },
]);

const recentTransfers = ref([
  { equipment: "ПК-12345", from: "Иванов И.И.", to: "Петров П.П.", date: "2024-12-18" },
  { equipment: "НБ-67890", from: "Сидоров С.С.", to: "Козлов К.К.", date: "Сегодня" },
]);
</script>

<template>
  <div class="p-6 space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Панель управления</h1>
      <p class="text-gray-600 mt-1">Обзор состояния оборудования и активности системы</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      <Card v-for="(stat, index) in stats" :key="index" :className="'hover:shadow-md transition-shadow'">
        <div class="flex items-center">
          <div :class="`w-12 h-12 rounded-lg flex items-center justify-center bg-${stat.color}-100`">
            <i :class="`${stat.icon} text-xl text-${stat.color}-600`"></i>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">{{ stat.title }}</p>
            <p class="text-2xl font-bold text-gray-900">{{ stat.value }}</p>
          </div>
        </div>
      </Card>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card :title="'Последние заявки'" :actions="() => h(Button, { variant: 'outline', size: 'sm' }, () => [h('i', { class: 'ri-eye-line mr-2' }), 'Все заявки'])">
        <div class="space-y-4">
          <div v-for="ticket in recentTickets" :key="ticket.id" class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div class="flex-1">
              <div class="flex items-center space-x-2">
                <span class="font-medium text-gray-900">{{ ticket.id }}</span>
                <span
                  :class="`px-2 py-1 text-xs rounded-full ${
                    ticket.priority === 'Высокий' ? 'bg-red-100 text-red-800' : ticket.priority === 'Средний' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`"
                >
                  {{ ticket.priority }}
                </span>
              </div>
              <p class="text-sm text-gray-600 mt-1">{{ `${ticket.equipment} - ${ticket.description}` }}</p>
            </div>
            <span :class="`px-3 py-1 text-xs font-medium rounded-full ${ticket.status === 'Новая' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'}`">
              {{ ticket.status }}
            </span>
          </div>
        </div>
      </Card>
      <Card :title="'Последние передачи'" :actions="() => h(Button, { variant: 'outline', size: 'sm' }, () => [h('i', { class: 'ri-history-line mr-2' }), 'История'])">
        <div class="space-y-4">
          <div v-for="transfer in recentTransfers" key="{index}" class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div class="flex-1">
              <p class="font-medium text-gray-900">{{ transfer.equipment }}</p>
              <div class="flex items-center text-sm text-gray-600 mt-1">
                <span>{{ transfer.from }}</span>
                <i class="ri-arrow-right-line mx-2"></i>
                <span>{{ transfer.to }}</span>
              </div>
            </div>
            <span class="text-sm text-gray-500">{{ transfer.date }}</span>
          </div>
        </div>
      </Card>
    </div>
    <Card title="Быстрые действия">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button class="h-20 flex-col">
          <i class="ri-add-line text-xl mb-2"></i>
          Добавить оборудование
        </Button>
        <Button variant="secondary" class="h-20 flex-col">
          <i class="ri-qr-scan-line text-xl mb-2"></i>
          Сканировать QR
        </Button>
        <Button variant="success" class="h-20 flex-col">
          <i class="ri-customer-service-line text-xl mb-2"></i>
          Создать заявку
        </Button>
        <Button variant="outline" class="h-20 flex-col">
          <i class="ri-file-download-line text-xl mb-2"></i>
          Экспорт данных
        </Button>
      </div>
    </Card>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card title="Требуют внимания" class="border-l-4 border-l-red-500">
        <div class="space-y-3">
          <div class="flex items-center text-red-600">
            <i class="ri-error-warning-line mr-2"></i>
            <span class="text-sm">8 единиц с просроченным ТО</span>
          </div>
          <div class="flex items-center text-orange-600">
            <i class="ri-user-unfollow-line mr-2"></i>
            <span class="text-sm">12 единиц без ответственного</span>
          </div>
          <div class="flex items-center text-red-600">
            <i class="ri-tools-line mr-2"></i>
            <span class="text-sm">23 неисправных единицы</span>
          </div>
        </div>
      </Card>
      <Card title="Статистика за месяц" class="border-l-4 border-l-green-500">
        <div class="space-y-3">
          <div class="flex justify-between">
            <span class="text-sm text-gray-600">Выполнено ТО:</span>
            <span class="font-medium">156</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-gray-600">Закрыто заявок:</span>
            <span class="font-medium">89</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-gray-600">Передач оборудования:</span>
            <span class="font-medium">34</span>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>
