<script lang="ts" setup>
import { computed, ref } from "vue";
import Card from "@/share/components/base/iCard.vue";
import Button from "@/share/components/base/iButton.vue";
import Input from "@/share/components/base/iInput.vue";

interface iTicket {
  id: string;
  title: string;
  equipment: string;
  equipmentId: string;
  priority: string;
  status: string;
  reporter: string;
  assignee: string;
  location: string;
  created: string;
  description: string;
  closed?: string;
}

const showCreateModal = ref(false);
const selectedTab = ref<"open" | "in-progress" | "closed">("open");

const ticketsData = ref<{ [key: string]: iTicket[] }>({
  open: [
    {
      id: "T-001",
      title: "Не включается монитор",
      equipment: 'Монитор Samsung 24"',
      equipmentId: "МН-003",
      priority: "high",
      status: "open",
      reporter: "Иванов И.И.",
      assignee: "Не назначен",
      location: "Офис 101",
      created: "2024-12-18 09:30",
      description: "Монитор не включается после выходных. Индикатор питания не горит.",
    },
    {
      id: "T-002",
      title: "Замятие бумаги в принтере",
      equipment: "Принтер HP LaserJet Pro 400",
      equipmentId: "ПР-002",
      priority: "medium",
      status: "open",
      reporter: "Петров П.П.",
      assignee: "Технический отдел",
      location: "Офис 205",
      created: "2024-12-18 11:15",
      description: "Постоянное замятие бумаги при печати. Требуется диагностика.",
    },
    {
      id: "T-003",
      title: "Медленная работа компьютера",
      equipment: "Компьютер Dell OptiPlex 7090",
      equipmentId: "ПК-001",
      priority: "low",
      status: "open",
      reporter: "Сидоров С.С.",
      assignee: "Не назначен",
      location: "Офис 150",
      created: "2024-12-18 14:20",
      description: "Компьютер стал работать очень медленно, долго загружается.",
    },
  ],
  "in-progress": [
    {
      id: "T-004",
      title: "Не работает сканер",
      equipment: "Сканер Canon CanoScan",
      equipmentId: "СК-004",
      priority: "medium",
      status: "in-progress",
      reporter: "Козлов К.К.",
      assignee: "Иванов И.И.",
      location: "Офис 301",
      created: "2024-12-17 16:45",
      description: "Сканер не распознается системой. Переустановка драйверов не помогла.",
    },
    {
      id: "T-005",
      title: "Проблемы с сетевым подключением",
      equipment: "Коммутатор D-Link DGS-1024D",
      equipmentId: "СВ-005",
      priority: "high",
      status: "in-progress",
      reporter: "Администратор",
      assignee: "Системный администратор",
      location: "Серверная",
      created: "2024-12-17 10:30",
      description: "Периодические разрывы сетевого соединения в офисе 2 этажа.",
    },
  ],
  closed: [
    {
      id: "T-006",
      title: "Замена картриджа",
      equipment: "Принтер Canon PIXMA",
      equipmentId: "ПР-006",
      priority: "low",
      status: "closed",
      reporter: "Петрова А.А.",
      assignee: "Технический отдел",
      location: "Офис 102",
      created: "2024-12-16 09:00",
      closed: "2024-12-16 15:30",
      description: "Закончился тонер в картридже. Требуется замена.",
    },
    {
      id: "T-007",
      title: "Обновление антивируса",
      equipment: "Компьютер Lenovo ThinkCentre",
      equipmentId: "ПК-007",
      priority: "medium",
      status: "closed",
      reporter: "Системный администратор",
      assignee: "Системный администратор",
      location: "Офис 202",
      created: "2024-12-15 14:00",
      closed: "2024-12-15 16:45",
      description: "Плановое обновление антивирусного ПО до последней версии.",
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
    case "open":
      return "bg-blue-100 text-blue-800";
    case "in-progress":
      return "bg-orange-100 text-orange-800";
    case "closed":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function getStatusText(status: string) {
  switch (status) {
    case "open":
      return "Новая";
    case "in-progress":
      return "В работе";
    case "closed":
      return "Закрыта";
    default:
      return "Неизвестно";
  }
}

const currentData = computed(() => ticketsData.value[selectedTab.value]);
</script>

<template>
  <div class="p-6 space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Заявки на обслуживание</h1>
        <p class="text-gray-600 mt-1">Управление заявками на ремонт и обслуживание оборудования</p>
      </div>
      <div class="flex items-center space-x-3">
        <Button variant="outline" class="whitespace-nowrap">
          <i class="ri-filter-line mr-2"></i>
          Фильтры
        </Button>
        <Button @click="() => (showCreateModal = true)" class="whitespace-nowrap">
          <i class="ri-add-line mr-2"></i>
          Создать заявку
        </Button>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card class="text-center">
        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
          <i class="ri-file-add-line text-xl text-blue-600"></i>
        </div>
        <p class="text-2xl font-bold text-gray-900">{{ ticketsData.open.length }}</p>
        <p class="text-sm text-gray-600">Новые заявки</p>
      </Card>
      <Card class="text-center">
        <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
          <i class="ri-tools-line text-xl text-orange-600"></i>
        </div>
        <p class="text-2xl font-bold text-gray-900">{{ ticketsData["in-progress"].length }}</p>
        <p class="text-sm text-gray-600">В работе</p>
      </Card>
      <Card class="text-center">
        <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
          <i class="ri-checkbox-circle-line text-xl text-green-600"></i>
        </div>
        <p class="text-2xl font-bold text-gray-900">{{ ticketsData.closed.length }}</p>
        <p class="text-sm text-gray-600">Закрытые</p>
      </Card>
      <Card class="text-center">
        <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
          <i class="ri-time-line text-xl text-purple-600"></i>
        </div>
        <p class="text-2xl font-bold text-gray-900">2.5</p>
        <p class="text-sm text-gray-600">Среднее время (дни)</p>
      </Card>
    </div>
    <Card>
      <div class="border-b border-gray-200">
        <nav class="flex space-x-8">
          <button
            @click="() => (selectedTab = 'open')"
            :class="`py-4 px-1 border-b-2 font-medium text-sm cursor-pointer ${
              selectedTab === 'open' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`"
          >
            Новые ({{ ticketsData.open.length }})
          </button>
          <button
            @click="() => (selectedTab = 'in-progress')"
            :class="`py-4 px-1 border-b-2 font-medium text-sm cursor-pointer ${
              selectedTab === 'in-progress' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`"
          >
            В работе ({{ ticketsData["in-progress"].length }})
          </button>
          <button
            @click="() => (selectedTab = 'closed')"
            :class="`py-4 px-1 border-b-2 font-medium text-sm cursor-pointer ${
              selectedTab === 'closed' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`"
          >
            Закрытые ({{ ticketsData.closed.length }})
          </button>
        </nav>
      </div>
      <div class="space-y-4 p-4">
        <div v-for="ticket in currentData" :key="ticket.id" class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center space-x-3 mb-2">
                <h3 class="font-medium text-gray-900">{{ ticket.title }}</h3>
                <span :class="`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(ticket.priority)}`">
                  {{ getPriorityText(ticket.priority) }}
                </span>
                <span :class="`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(ticket.status)}`">
                  {{ getStatusText(ticket.status) }}
                </span>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                <div><span class="font-medium">Заявка:</span> {{ ticket.id }}</div>
                <div><span class="font-medium">Оборудование:</span> {{ ticket.equipment }} ({{ ticket.equipmentId }})</div>
                <div><span class="font-medium">Расположение:</span> {{ ticket.location }}</div>
                <div><span class="font-medium">Заявитель:</span> {{ ticket.reporter }}</div>
                <div><span class="font-medium">Исполнитель:</span> {{ ticket.assignee }}</div>
                <div><span class="font-medium">Создана:</span> {{ ticket.created }}</div>
              </div>
              <p class="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                {{ ticket.description }}
              </p>
              <div v-if="ticket.closed" class="mt-2 text-sm text-green-600"><span class="font-medium">Закрыта:</span> {{ ticket.closed }}</div>
            </div>
            <div class="flex items-center space-x-2 ml-4">
              <button class="p-2 text-gray-400 hover:text-blue-600 cursor-pointer">
                <i class="ri-eye-line"></i>
              </button>
              <button class="p-2 text-gray-400 hover:text-green-600 cursor-pointer">
                <i class="ri-edit-line"></i>
              </button>
              <button v-if="selectedTab !== 'closed'" class="p-2 text-gray-400 hover:text-green-600 cursor-pointer">
                <i class="ri-checkbox-line"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
    <div v-if="showCreateModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-900">Создать заявку на обслуживание</h3>
          <button @click="() => (showCreateModal = false)" class="text-gray-400 hover:text-gray-600 cursor-pointer">
            <i class="ri-close-line text-xl"></i>
          </button>
        </div>
        <form class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Заголовок заявки</label>
            <Input placeholder="Краткое описание проблемы" />
          </div>
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
              <label class="block text-sm font-medium text-gray-700 mb-1">Приоритет</label>
              <select class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8">
                <option value="">Выберите приоритет</option>
                <option value="low">Низкий</option>
                <option value="medium">Средний</option>
                <option value="high">Высокий</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Заявитель</label>
              <Input placeholder="ФИО заявителя" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Исполнитель</label>
              <select class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8">
                <option value="">Выберите исполнителя</option>
                <option value="tech">Технический отдел</option>
                <option value="admin">Системный администратор</option>
                <option value="ivanov">Иванов И.И.</option>
                <option value="petrov">Петров П.П.</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Подробное описание проблемы</label>
            <textarea
              rows="{4}"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Опишите проблему максимально подробно"
              maxLength="{500}"
            ></textarea>
          </div>
          <div class="flex justify-end space-x-3 pt-4">
            <Button variant="outline" @click="() => (showCreateModal = false)" class="whitespace-nowrap"> Отмена </Button>
            <Button type="submit" class="whitespace-nowrap"> Создать заявку </Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
