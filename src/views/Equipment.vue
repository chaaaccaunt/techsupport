<script lang="ts" setup>
import { computed, ref } from "vue";
import Card from "@/share/components/base/iCard.vue";
import Button from "@/share/components/base/iButton.vue";
import Input from "@/share/components/base/iInput.vue";

const showAddModal = ref(false);
const viewMode = ref<"grid" | "list">("list");
const selectedCategory = ref("all");
const selectedStatus = ref("all");

const categories = ref([
  { value: "all", label: "Все категории" },
  { value: "computers", label: "Компьютеры" },
  { value: "printers", label: "Принтеры" },
  { value: "scanners", label: "Сканеры" },
  { value: "monitors", label: "Мониторы" },
  { value: "network", label: "Сетевое оборудование" },
]);

const statuses = ref([
  { value: "all", label: "Все статусы" },
  { value: "working", label: "Исправное" },
  { value: "broken", label: "Неисправное" },
  { value: "maintenance", label: "На ТО" },
  { value: "disposed", label: "Списанное" },
]);

const equipment = ref([
  {
    id: "ПК-001",
    name: "Компьютер Dell OptiPlex 7090",
    category: "Компьютеры",
    status: "working",
    statusText: "Исправно",
    location: "Офис 101",
    responsible: "Иванов И.И.",
    lastMaintenance: "2024-10-15",
    nextMaintenance: "2025-01-15",
    serialNumber: "DL789456123",
    inventoryNumber: "ИВ-2024-001",
  },
  {
    id: "ПР-002",
    name: "Принтер HP LaserJet Pro 400",
    category: "Принтеры",
    status: "broken",
    statusText: "Неисправно",
    location: "Офис 205",
    responsible: "Петров П.П.",
    lastMaintenance: "2024-09-20",
    nextMaintenance: "2024-12-20",
    serialNumber: "HP456789012",
    inventoryNumber: "ИВ-2024-002",
  },
  {
    id: "МН-003",
    name: 'Монитор Samsung 24" F24T450FQI',
    category: "Мониторы",
    status: "working",
    statusText: "Исправно",
    location: "Офис 101",
    responsible: "Иванов И.И.",
    lastMaintenance: "2024-11-01",
    nextMaintenance: "2025-02-01",
    serialNumber: "SM123456789",
    inventoryNumber: "ИВ-2024-003",
  },
  {
    id: "СК-004",
    name: "Сканер Canon CanoScan LiDE 300",
    category: "Сканеры",
    status: "maintenance",
    statusText: "На ТО",
    location: "Офис 150",
    responsible: "Сидоров С.С.",
    lastMaintenance: "2024-08-15",
    nextMaintenance: "2024-11-15",
    serialNumber: "CN987654321",
    inventoryNumber: "ИВ-2024-004",
  },
  {
    id: "СВ-005",
    name: "Коммутатор D-Link DGS-1024D",
    category: "Сетевое оборудование",
    status: "working",
    statusText: "Исправно",
    location: "Серверная",
    responsible: "Козлов К.К.",
    lastMaintenance: "2024-12-01",
    nextMaintenance: "2025-03-01",
    serialNumber: "DL555666777",
    inventoryNumber: "ИВ-2024-005",
  },
]);

function getStatusColor(status: string) {
  switch (status) {
    case "working":
      return "bg-green-100 text-green-800";
    case "broken":
      return "bg-red-100 text-red-800";
    case "maintenance":
      return "bg-yellow-100 text-yellow-800";
    case "disposed":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

const filteredEquipment = computed(() =>
  equipment.value.filter((item) => {
    const categoryMatch = selectedCategory.value === "all" || item.category === categories.value.find((c) => c.value === selectedCategory.value)?.label;
    const statusMatch = selectedStatus.value === "all" || item.status === selectedStatus.value;
    return categoryMatch && statusMatch;
  })
);
</script>

<template>
  <div class="p-6 space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Оборудование</h1>
        <p class="text-gray-600 mt-1">Управление парком оборудования</p>
      </div>
      <div class="flex items-center space-x-3">
        <Button :variant="'outline'" :class="'whitespace-nowrap'">
          <i class="ri-download-line mr-2"></i>
          Экспорт
        </Button>
        <Button @click="() => (showAddModal = true)" :class="'whitespace-nowrap'">
          <i class="ri-add-line mr-2"></i>
          Добавить оборудование
        </Button>
      </div>
    </div>
    <Card>
      <div class="flex flex-wrap items-center gap-4">
        <div class="flex-1 min-w-64">
          <Input placeholder="Поиск по названию, серийному номеру..." class="w-full" />
        </div>
        <div class="flex items-center space-x-2">
          <span class="text-sm text-gray-600 whitespace-nowrap">Категория:</span>
          <select
            :value="selectedCategory"
            @change="(e) => selectedCategory = (e.target as HTMLInputElement).value"
            class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
          >
            <option v-for="category in categories" :key="category.value" :value="category.value">{{ category.label }}</option>
          </select>
        </div>
        <div class="flex items-center space-x-2">
          <span class="text-sm text-gray-600 whitespace-nowrap">Статус:</span>
          <select
            :value="selectedStatus"
            @change="(e) => selectedStatus = (e.target as HTMLInputElement).value"
            class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
          >
            <option v-for="status in statuses" :key="status.value" :value="status.value">{{ status.label }}</option>
          </select>
        </div>
        <div class="flex items-center border border-gray-300 rounded-lg">
          <button @click="() => (viewMode = 'list')" :class="`p-2 cursor-pointer ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`">
            <i class="ri-list-unordered text-sm"></i>
          </button>
          <button @click="() => (viewMode = 'grid')" :class="`p-2 cursor-pointer ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`">
            <i class="ri-grid-line text-sm"></i>
          </button>
        </div>
      </div>
    </Card>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card class="text-center">
        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
          <i class="ri-computer-line text-xl text-blue-600"></i>
        </div>
        <p class="text-2xl font-bold text-gray-900">1,247</p>
        <p class="text-sm text-gray-600">Всего оборудования</p>
      </Card>
      <Card class="text-center">
        <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
          <i class="ri-checkbox-circle-line text-xl text-green-600"></i>
        </div>
        <p class="text-2xl font-bold text-gray-900">1,156</p>
        <p class="text-sm text-gray-600">Исправное</p>
      </Card>
      <Card class="text-center">
        <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
          <i class="ri-error-warning-line text-xl text-red-600"></i>
        </div>
        <p class="text-2xl font-bold text-gray-900">23</p>
        <p class="text-sm text-gray-600">Неисправное</p>
      </Card>
      <Card class="text-center">
        <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
          <i class="ri-tools-line text-xl text-yellow-600"></i>
        </div>
        <p class="text-2xl font-bold text-gray-900">45</p>
        <p class="text-sm text-gray-600">На ТО</p>
      </Card>
    </div>
    <Card>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="text-left py-3 px-4 font-medium text-gray-700">Оборудование</th>
              <th class="text-left py-3 px-4 font-medium text-gray-700">Категория</th>
              <th class="text-left py-3 px-4 font-medium text-gray-700">Статус</th>
              <th class="text-left py-3 px-4 font-medium text-gray-700">Расположение</th>
              <th class="text-left py-3 px-4 font-medium text-gray-700">Ответственный</th>
              <th class="text-left py-3 px-4 font-medium text-gray-700">Следующее ТО</th>
              <th class="text-right py-3 px-4 font-medium text-gray-700">Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredEquipment" :key="item.id" class="border-b border-gray-100 hover:bg-gray-50">
              <td class="py-4 px-4">
                <div>
                  <p class="font-medium text-gray-900">{{ item.name }}</p>
                  <p class="text-sm text-gray-500">{{ `${item.id} • ${item.serialNumber}` }}</p>
                </div>
              </td>
              <td class="py-4 px-4">
                <span class="text-sm text-gray-600">{{ item.category }}</span>
              </td>
              <td class="py-4 px-4">
                <span :class="`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`">
                  {{ item.statusText }}
                </span>
              </td>
              <td class="py-4 px-4">
                <span class="text-sm text-gray-600">{{ item.location }}</span>
              </td>
              <td class="py-4 px-4">
                <span class="text-sm text-gray-600">{{ item.responsible }}</span>
              </td>
              <td class="py-4 px-4">
                <span class="text-sm text-gray-600">{{ item.nextMaintenance }}</span>
              </td>
              <td class="py-4 px-4">
                <div class="flex items-center justify-end space-x-2">
                  <button class="p-2 text-gray-400 hover:text-blue-600 cursor-pointer">
                    <i class="ri-eye-line"></i>
                  </button>
                  <button class="p-2 text-gray-400 hover:text-green-600 cursor-pointer">
                    <i class="ri-edit-line"></i>
                  </button>
                  <button class="p-2 text-gray-400 hover:text-red-600 cursor-pointer">
                    <i class="ri-delete-bin-line"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
    <div v-if="showAddModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-900">Добавить оборудование</h3>
          <button @click="() => (showAddModal = false)" class="text-gray-400 hover:text-gray-600 cursor-pointer">
            <i class="ri-close-line text-xl"></i>
          </button>
        </div>
        <form class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Название оборудования</label>
              <Input placeholder="Введите название" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Категория</label>
              <select class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8">
                <option value="">Выберите категорию</option>
                <option value="computers">Компьютеры</option>
                <option value="printers">Принтеры</option>
                <option value="scanners">Сканеры</option>
                <option value="monitors">Мониторы</option>
                <option value="network">Сетевое оборудование</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Серийный номер</label>
              <Input placeholder="Введите серийный номер" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Инвентарный номер</label>
              <Input placeholder="Введите инвентарный номер" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Расположение</label>
              <Input placeholder="Введите расположение" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Ответственный</label>
              <Input placeholder="Введите ФИО ответственного" />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Описание</label>
            <textarea
              rows="{3}"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Дополнительная информация об оборудовании"
              maxLength="{500}"
            ></textarea>
          </div>
          <div class="flex justify-end space-x-3 pt-4">
            <Button :variant="'outline'" @click="() => (showAddModal = false)" :class="'whitespace-nowrap'"> Отмена </Button>
            <Button :type="'submit'" :class="'whitespace-nowrap'"> Добавить оборудование </Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
