<script lang="ts" setup>
import { computed, ref } from "vue";
import Card from "@/share/components/base/iCard.vue";
import Button from "@/share/components/base/iButton.vue";
import Input from "@/share/components/base/iInput.vue";

interface iEquipment {
  id: string;
  equipment: string;
  equipmentId: string;
  type: string;
  scheduledDate: string;
  responsible: string;
  location: string;
  priority: string;
  status: string;
  completedDate?: string;
  overdueDays?: number;
}

const showScheduleModal = ref(false);
const selectedTab = ref<"scheduled" | "completed" | "overdue">("scheduled");

const maintenanceData = ref<{ [key: string]: iEquipment[] }>({
  scheduled: [
    {
      id: "ТО-001",
      equipment: "Компьютер Dell OptiPlex 7090",
      equipmentId: "ПК-001",
      type: "Плановое ТО",
      scheduledDate: "2024-12-25",
      responsible: "Технический отдел",
      location: "Офис 101",
      priority: "medium",
      status: "scheduled",
    },
    {
      id: "ТО-002",
      equipment: "Принтер HP LaserJet Pro 400",
      equipmentId: "ПР-002",
      type: "Замена картриджа",
      scheduledDate: "2024-12-20",
      responsible: "Иванов И.И.",
      location: "Офис 205",
      priority: "high",
      status: "scheduled",
    },
    {
      id: "ТО-003",
      equipment: "Коммутатор D-Link DGS-1024D",
      equipmentId: "СВ-005",
      type: "Обновление ПО",
      scheduledDate: "2024-12-22",
      responsible: "Системный администратор",
      location: "Серверная",
      priority: "medium",
      status: "scheduled",
    },
  ],
  completed: [
    {
      id: "ТО-004",
      equipment: 'Монитор Samsung 24"',
      equipmentId: "МН-003",
      type: "Чистка и настройка",
      scheduledDate: "2024-12-15",
      responsible: "Петров П.П.",
      location: "Офис 101",
      priority: "low",
      status: "completed",
      completedDate: "2024-12-15",
    },
    {
      id: "ТО-005",
      equipment: "Сканер Canon CanoScan",
      equipmentId: "СК-004",
      type: "Калибровка",
      scheduledDate: "2024-12-10",
      completedDate: "2024-12-12",
      responsible: "Технический отдел",
      location: "Офис 150",
      priority: "medium",
      status: "completed",
    },
  ],
  overdue: [
    {
      id: "ТО-006",
      equipment: "Принтер Canon PIXMA",
      equipmentId: "ПР-006",
      type: "Плановое ТО",
      scheduledDate: "2024-12-01",
      responsible: "Не назначен",
      location: "Офис 301",
      priority: "high",
      status: "overdue",
      overdueDays: 17,
    },
    {
      id: "ТО-007",
      equipment: "ПК Lenovo ThinkCentre",
      equipmentId: "ПК-007",
      type: "Замена термопасты",
      scheduledDate: "2024-11-25",
      responsible: "Сидоров С.С.",
      location: "Офис 202",
      priority: "medium",
      status: "overdue",
      overdueDays: 23,
    },
  ],
});

function getPriorityColor(priority: string) {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    case "low":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function getPriorityText(priority: string) {
  switch (priority) {
    case "high":
      return "Высокий";
    case "medium":
      return "Средний";
    case "low":
      return "Низкий";
    default:
      return "Не определён";
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "scheduled":
      return "bg-blue-100 text-blue-800";
    case "completed":
      return "bg-green-100 text-green-800";
    case "overdue":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

const currentData = computed(() => maintenanceData.value[selectedTab.value]);
</script>

<template>
  <div class="p-6 space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Техническое обслуживание</h1>
        <p class="text-gray-600 mt-1">Планирование и контроль технического обслуживания оборудования</p>
      </div>
      <div class="flex items-center space-x-3">
        <Button variant="outline" class="whitespace-nowrap">
          <i class="ri-calendar-line mr-2"></i>
          Календарь ТО
        </Button>
        <Button @click="() => (showScheduleModal = true)" class="whitespace-nowrap">
          <i class="ri-add-line mr-2"></i>
          Запланировать ТО
        </Button>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card :class="'text-center'">
        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
          <i class="ri-calendar-check-line text-xl text-blue-600"></i>
        </div>
        <p class="text-2xl font-bold text-gray-900">{{ maintenanceData.scheduled.length }}</p>
        <p class="text-sm text-gray-600">Запланировано</p>
      </Card>
      <Card :class="'text-center'">
        <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
          <i class="ri-checkbox-circle-line text-xl text-green-600"></i>
        </div>
        <p class="text-2xl font-bold text-gray-900">{{ maintenanceData.completed.length }}</p>
        <p class="text-sm text-gray-600">Выполнено</p>
      </Card>
      <Card :class="'text-center'">
        <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
          <i class="ri-error-warning-line text-xl text-red-600"></i>
        </div>
        <p class="text-2xl font-bold text-gray-900">{{ maintenanceData.overdue.length }}</p>
        <p class="text-sm text-gray-600">Просрочено</p>
      </Card>
      <Card :class="'text-center'">
        <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
          <i class="ri-time-line text-xl text-purple-600"></i>
        </div>
        <p class="text-2xl font-bold text-gray-900">156</p>
        <p class="text-sm text-gray-600">За месяц</p>
      </Card>
    </div>
    <Card>
      <div class="border-b border-gray-200">
        <nav class="flex space-x-8">
          <button
            @click="() => (selectedTab = 'scheduled')"
            :class="`py-4 px-1 border-b-2 font-medium text-sm cursor-pointer ${
              selectedTab === 'scheduled' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`"
          >
            Запланированные ({{ maintenanceData.scheduled.length }})
          </button>
          <button
            @click="() => (selectedTab = 'completed')"
            :class="`py-4 px-1 border-b-2 font-medium text-sm cursor-pointer ${
              selectedTab === 'completed' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`"
          >
            Выполненные ({{ maintenanceData.completed.length }})
          </button>
          <button
            @click="() => (selectedTab = 'overdue')"
            :class="`py-4 px-1 border-b-2 font-medium text-sm cursor-pointer ${
              selectedTab === 'overdue' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`"
          >
            Просроченные ({{ maintenanceData.overdue.length }})
          </button>
        </nav>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="text-left py-3 px-4 font-medium text-gray-700">ID / Оборудование</th>
              <th class="text-left py-3 px-4 font-medium text-gray-700">Тип ТО</th>
              <th class="text-left py-3 px-4 font-medium text-gray-700">Дата</th>
              <th class="text-left py-3 px-4 font-medium text-gray-700">Ответственный</th>
              <th class="text-left py-3 px-4 font-medium text-gray-700">Приоритет</th>
              <th class="text-left py-3 px-4 font-medium text-gray-700">Статус</th>
              <th class="text-right py-3 px-4 font-medium text-gray-700">Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in currentData" :key="item.id" class="border-b border-gray-100 hover:bg-gray-50">
              <td class="py-4 px-4">
                <div>
                  <p class="font-medium text-gray-900">{{ item.id }}</p>
                  <p class="text-sm text-gray-500">{{ item.equipment }}</p>
                  <p class="text-xs text-gray-400">{{ `${item.equipmentId} • ${item.location}` }}</p>
                </div>
              </td>
              <td class="py-4 px-4">
                <span class="text-sm text-gray-600">{{ item.type }}</span>
              </td>
              <td class="py-4 px-4">
                <div>
                  <p class="text-sm text-gray-900">
                    {{ selectedTab === "completed" ? item.completedDate : item.scheduledDate }}
                  </p>
                  <p v-if="selectedTab === 'overdue' && item.overdueDays" class="text-xs text-red-600">Просрочено на {{ item.overdueDays }} дн.</p>
                </div>
              </td>
              <td class="py-4 px-4">
                <span class="text-sm text-gray-600">{{ item.responsible }}</span>
              </td>
              <td class="py-4 px-4">
                <span :class="`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(item.priority)}`">
                  {{ getPriorityText(item.priority) }}
                </span>
              </td>
              <td class="py-4 px-4">
                <span :class="`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`">
                  {{ selectedTab === "scheduled" ? "Запланировано" : selectedTab === "completed" ? "Выполнено" : selectedTab === "overdue" ? "Просрочено" : "" }}
                </span>
              </td>
              <td class="py-4 px-4">
                <div class="flex items-center justify-end space-x-2">
                  <button class="p-2 text-gray-400 hover:text-blue-600 cursor-pointer">
                    <i class="ri-eye-line"></i>
                  </button>
                  <button class="p-2 text-gray-400 hover:text-green-600 cursor-pointer">
                    <i class="ri-edit-line"></i>
                  </button>
                  <button v-if="selectedTab === 'scheduled'" class="p-2 text-gray-400 hover:text-green-600 cursor-pointer">
                    <i class="ri-checkbox-line"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
    <div v-if="showScheduleModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-900">Запланировать техническое обслуживание</h3>
          <button @click="() => (showScheduleModal = false)" class="text-gray-400 hover:text-gray-600 cursor-pointer">
            <i class="ri-close-line text-xl"></i>
          </button>
        </div>
        <form class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Оборудование</label>
              <select class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8">
                <option value="">Выберите оборудование</option>
                <option value="ПК-001">ПК-001 - Компьютер Dell OptiPlex 7090</option>
                <option value="ПР-002">ПР-002 - Принтер HP LaserJet Pro 400</option>
                <option value="МН-003">МН-003 - Монитор Samsung 24"</option>
                <option value="СК-004">СК-004 - Сканер Canon CanoScan</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Тип обслуживания</label>
              <select class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8">
                <option value="">Выберите тип</option>
                <option value="planned">Плановое ТО</option>
                <option value="cleaning">Чистка и настройка</option>
                <option value="repair">Ремонт</option>
                <option value="replacement">Замена компонентов</option>
                <option value="software">Обновление ПО</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Дата планируемого ТО</label>
              <Input type="date" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Приоритет</label>
              <select class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8">
                <option value="">Выберите приоритет</option>
                <option value="low">Низкий</option>
                <option value="medium">Средний</option>
                <option value="high">Высокий</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Ответственный</label>
              <select class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8">
                <option value="">Выберите ответственного</option>
                <option value="tech">Технический отдел</option>
                <option value="admin">Системный администратор</option>
                <option value="ivanov">Иванов И.И.</option>
                <option value="petrov">Петров П.П.</option>
                <option value="sidorov">Сидоров С.С.</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Время выполнения (часы)</label>
              <Input :type="'number'" :placeholder="'Оценочное время'" :min="1" :max="24" />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Описание работ</label>
            <textarea
              rows="{4}"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Подробное описание планируемых работ по техническому обслуживанию"
              maxLength="{500}"
            ></textarea>
          </div>
          <div class="flex justify-end space-x-3 pt-4">
            <Button variant="outline" @click="() => (showScheduleModal = false)" class="whitespace-nowrap"> Отмена </Button>
            <Button type="submit" class="whitespace-nowrap"> Запланировать ТО </Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
