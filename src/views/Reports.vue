<script setup lang="ts">
import { ref } from "vue";
import Card from "@/share/components/base/iCard.vue";
import Button from "@/share/components/base/iButton.vue";

const selectedPeriod = ref("month");
const selectedReport = ref("equipment");

const periods = ref([
  { value: "week", label: "Неделя" },
  { value: "month", label: "Месяц" },
  { value: "quarter", label: "Квартал" },
  { value: "year", label: "Год" },
]);

const reportTypes = ref([
  { value: "equipment", label: "Отчет по оборудованию" },
  { value: "maintenance", label: "Отчет по ТО" },
  { value: "tickets", label: "Отчет по заявкам" },
  { value: "users", label: "Отчет по пользователям" },
]);

const equipmentStats = ref({
  total: 1247,
  working: 1156,
  broken: 23,
  maintenance: 45,
  disposed: 23,
  byCategory: [
    { name: "Компьютеры", count: 456, percentage: 36.6 },
    { name: "Принтеры", count: 234, percentage: 18.8 },
    { name: "Мониторы", count: 345, percentage: 27.7 },
    { name: "Сканеры", count: 123, percentage: 9.9 },
    { name: "Сетевое оборудование", count: 89, percentage: 7.1 },
  ],
});

const maintenanceStats = ref({
  scheduled: 45,
  completed: 156,
  overdue: 8,
  avgTime: 2.5,
  byMonth: [
    { month: "Янв", completed: 45, scheduled: 50 },
    { month: "Фев", completed: 52, scheduled: 48 },
    { month: "Мар", completed: 48, scheduled: 55 },
    { month: "Апр", completed: 61, scheduled: 52 },
    { month: "Май", completed: 58, scheduled: 60 },
    { month: "Июн", completed: 65, scheduled: 58 },
  ],
});

const ticketStats = ref({
  total: 234,
  open: 23,
  inProgress: 45,
  closed: 166,
  avgResolutionTime: 3.2,
  byPriority: [
    { priority: "Высокий", count: 45, percentage: 19.2 },
    { priority: "Средний", count: 123, percentage: 52.6 },
    { priority: "Низкий", count: 66, percentage: 28.2 },
  ],
});

const quickReports = ref([
  {
    title: "Оборудование без ответственного",
    description: "Список оборудования, не закрепленного за сотрудниками",
    count: 12,
    icon: "ri-user-unfollow-line",
    color: "orange",
  },
  {
    title: "Просроченное ТО",
    description: "Оборудование с просроченным техническим обслуживанием",
    count: 8,
    icon: "ri-time-line",
    color: "red",
  },
  {
    title: "Активные заявки",
    description: 'Заявки в статусе "Новая" и "В работе"',
    count: 68,
    icon: "ri-customer-service-line",
    color: "blue",
  },
  {
    title: "Оборудование на складе",
    description: "Неиспользуемое оборудование на складе",
    count: 156,
    icon: "ri-archive-line",
    color: "purple",
  },
]);
</script>

<template>
  <div class="p-6 space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Отчеты и аналитика</h1>
        <p class="text-gray-600 mt-1">Статистика и отчеты по управлению оборудованием</p>
      </div>
      <div class="flex items-center space-x-3">
        <select
          :value="selectedPeriod"
          @change="(e) => selectedPeriod = (e.target as HTMLInputElement).value"
          class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
        >
          <option v-for="period in periods" :key="period.value" :value="period.value">{{ period.label }}</option>
        </select>
        <Button :variant="'outline'" :class="'whitespace-nowrap'">
          <i class="ri-download-line mr-2"></i>
          Экспорт отчета
        </Button>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card v-for="(report, index) in quickReports" :key="index" :class="'hover:shadow-md transition-shadow cursor-pointer'">
        <div class="flex items-center">
          <div :class="`w-12 h-12 rounded-lg flex items-center justify-center bg-${report.color}-100`">
            <i :class="`${report.icon} text-xl text-${report.color}-600`"></i>
          </div>
          <div class="ml-4 flex-1">
            <p class="text-2xl font-bold text-gray-900">{{ report.count }}</p>
            <p class="text-sm font-medium text-gray-700">{{ report.title }}</p>
          </div>
        </div>
        <p class="text-xs text-gray-500 mt-2">{{ report.description }}</p>
      </Card>
    </div>
    <Card>
      <div class="border-b border-gray-200">
        <nav class="flex space-x-8">
          <button
            v-for="type in reportTypes"
            :key="type.value"
            @click="() => (selectedReport = type.value)"
            :class="`py-4 px-1 border-b-2 font-medium text-sm cursor-pointer ${
              selectedReport === type.value ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`"
          >
            {{ type.label }}
          </button>
        </nav>
      </div>
      <div v-if="selectedReport === 'equipment'" class="p-6 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div class="text-center">
            <p class="text-2xl font-bold text-gray-900">{{ equipmentStats.total }}</p>
            <p class="text-sm text-gray-600">Всего</p>
          </div>
          <div class="text-center">
            <p class="text-2xl font-bold text-green-600">{{ equipmentStats.working }}</p>
            <p class="text-sm text-gray-600">Исправное</p>
          </div>
          <div class="text-center">
            <p class="text-2xl font-bold text-red-600">{{ equipmentStats.broken }}</p>
            <p class="text-sm text-gray-600">Неисправное</p>
          </div>
          <div class="text-center">
            <p class="text-2xl font-bold text-yellow-600">{{ equipmentStats.maintenance }}</p>
            <p class="text-sm text-gray-600">На ТО</p>
          </div>
          <div class="text-center">
            <p class="text-2xl font-bold text-gray-600">{{ equipmentStats.disposed }}</p>
            <p class="text-sm text-gray-600">Списанное</p>
          </div>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Распределение по категориям</h3>
          <div class="space-y-3">
            <div v-for="(category, index) in equipmentStats.byCategory" :key="index" class="flex items-center justify-between">
              <span class="text-sm text-gray-700">{{ category.name }}</span>
              <div class="flex items-center space-x-3">
                <div class="w-32 bg-gray-200 rounded-full h-2">
                  <div class="bg-blue-600 h-2 rounded-full" :style="{ width: `${category.percentage}%` }"></div>
                </div>
                <span class="text-sm font-medium text-gray-900 w-12">{{ category.count }}</span>
                <span class="text-sm text-gray-500 w-12">{{ category.percentage }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="selectedReport === 'maintenance'" class="p-6 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="text-center">
            <p class="text-2xl font-bold text-blue-600">{{ maintenanceStats.scheduled }}</p>
            <p class="text-sm text-gray-600">Запланировано</p>
          </div>
          <div class="text-center">
            <p class="text-2xl font-bold text-green-600">{{ maintenanceStats.completed }}</p>
            <p class="text-sm text-gray-600">Выполнено</p>
          </div>
          <div class="text-center">
            <p class="text-2xl font-bold text-red-600">{{ maintenanceStats.overdue }}</p>
            <p class="text-sm text-gray-600">Просрочено</p>
          </div>
          <div class="text-center">
            <p class="text-2xl font-bold text-purple-600">{{ maintenanceStats.avgTime }}</p>
            <p class="text-sm text-gray-600">Среднее время (дни)</p>
          </div>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Динамика по месяцам</h3>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-gray-200">
                  <th class="text-left py-2 px-4 font-medium text-gray-700">Месяц</th>
                  <th class="text-center py-2 px-4 font-medium text-gray-700">Запланировано</th>
                  <th class="text-center py-2 px-4 font-medium text-gray-700">Выполнено</th>
                  <th class="text-center py-2 px-4 font-medium text-gray-700">Процент выполнения</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(month, index) in maintenanceStats.byMonth" :key="index" class="border-b border-gray-100">
                  <td class="py-2 px-4 font-medium">{{ month.month }}</td>
                  <td class="py-2 px-4 text-center">{{ month.scheduled }}</td>
                  <td class="py-2 px-4 text-center">{{ month.completed }}</td>
                  <td class="py-2 px-4 text-center">
                    <span
                      :class="`px-2 py-1 text-xs font-medium rounded-full ${
                        (month.completed / month.scheduled) * 100 >= 90 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`"
                    >
                      {{ Math.round((month.completed / month.scheduled) * 100) }}%
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div v-if="selectedReport === 'tickets'" class="p-6 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div class="text-center">
            <p class="text-2xl font-bold text-gray-900">{{ ticketStats.total }}</p>
            <p class="text-sm text-gray-600">Всего заявок</p>
          </div>
          <div class="text-center">
            <p class="text-2xl font-bold text-blue-600">{{ ticketStats.open }}</p>
            <p class="text-sm text-gray-600">Новые</p>
          </div>
          <div class="text-center">
            <p class="text-2xl font-bold text-orange-600">{{ ticketStats.inProgress }}</p>
            <p class="text-sm text-gray-600">В работе</p>
          </div>
          <div class="text-center">
            <p class="text-2xl font-bold text-green-600">{{ ticketStats.closed }}</p>
            <p class="text-sm text-gray-600">Закрытые</p>
          </div>
          <div class="text-center">
            <p class="text-2xl font-bold text-purple-600">{{ ticketStats.avgResolutionTime }}</p>
            <p class="text-sm text-gray-600">Среднее время (дни)</p>
          </div>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Распределение по приоритету</h3>
          <div class="space-y-3">
            <div v-for="(priority, index) in ticketStats.byPriority" :key="index" class="flex items-center justify-between">
              <span class="text-sm text-gray-700">{{ priority.priority }}</span>
              <div class="flex items-center space-x-3">
                <div class="w-32 bg-gray-200 rounded-full h-2">
                  <div
                    :class="`h-2 rounded-full ${priority.priority === 'Высокий' ? 'bg-red-600' : priority.priority === 'Средний' ? 'bg-yellow-600' : 'bg-green-600'}`"
                    :style="{ width: `${priority.percentage}%` }"
                  ></div>
                </div>
                <span class="text-sm font-medium text-gray-900 w-12">{{ priority.count }}</span>
                <span class="text-sm text-gray-500 w-12">{{ priority.percentage }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="selectedReport === 'users'" class="p-6">
        <div class="text-center py-12">
          <i class="ri-user-line text-6xl text-gray-300 mb-4"></i>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Отчет по пользователям</h3>
          <p class="text-gray-500">Статистика активности пользователей и их взаимодействия с системой</p>
          <Button class="mt-4 whitespace-nowrap">
            <i class="ri-file-chart-line mr-2"></i>
            Сгенерировать отчет
          </Button>
        </div>
      </div>
    </Card>
  </div>
</template>
