<script setup lang="ts">
import { computed, ref } from "vue";
import Card from "@/share/components/base/iCard.vue";
import Button from "@/share/components/base/iButton.vue";
import Input from "@/share/components/base/iInput.vue";

const showAddModal = ref(false);
const selectedBuilding = ref("all");

const buildings = ref([
  { value: "all", label: "Все здания" },
  { value: "main", label: "Главное здание" },
  { value: "warehouse", label: "Склад" },
  { value: "office2", label: "Офис 2" },
]);

const locations = ref([
  {
    id: 1,
    name: "Офис 101",
    building: "Главное здание",
    floor: 1,
    area: 25,
    capacity: 4,
    equipmentCount: 8,
    responsible: "Иванов И.И.",
    department: "IT отдел",
    description: "Кабинет системного администратора",
    status: "active",
  },
  {
    id: 2,
    name: "Офис 205",
    building: "Главное здание",
    floor: 2,
    area: 30,
    capacity: 6,
    equipmentCount: 12,
    responsible: "Петров П.П.",
    department: "Бухгалтерия",
    description: "Отдел бухгалтерского учета",
    status: "active",
  },
  {
    id: 3,
    name: "Серверная",
    building: "Главное здание",
    floor: 1,
    area: 15,
    capacity: 2,
    equipmentCount: 25,
    responsible: "Системный администратор",
    department: "IT отдел",
    description: "Серверное помещение с климат-контролем",
    status: "restricted",
  },
  {
    id: 4,
    name: "Конференц-зал А",
    building: "Главное здание",
    floor: 3,
    area: 50,
    capacity: 20,
    equipmentCount: 6,
    responsible: "Администратор",
    department: "Общее пользование",
    description: "Большой конференц-зал для совещаний",
    status: "active",
  },
  {
    id: 5,
    name: "Склад оборудования",
    building: "Склад",
    floor: 1,
    area: 100,
    capacity: 10,
    equipmentCount: 156,
    responsible: "Кладовщик",
    department: "Логистика",
    description: "Основной склад для хранения оборудования",
    status: "active",
  },
]);

function getStatusColor(status: string) {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800";
    case "restricted":
      return "bg-red-100 text-red-800";
    case "maintenance":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function getStatusText(status: string) {
  switch (status) {
    case "active":
      return "Активная";
    case "restricted":
      return "Ограниченный доступ";
    case "maintenance":
      return "На обслуживании";
    default:
      return "Неизвестно";
  }
}

const filteredLocations = computed(() =>
  locations.value.filter((location) => selectedBuilding.value === "all" || location.building === buildings.value.find((b) => b.value === selectedBuilding.value)?.label)
);
</script>

<template>
  <div class="p-6 space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Локации</h1>
        <p class="text-gray-600 mt-1">Управление местоположениями и размещением оборудования</p>
      </div>
      <div class="flex items-center space-x-3">
        <Button :variant="'outline'" :class="'whitespace-nowrap'">
          <i class="ri-map-line mr-2"></i>
          Карта помещений
        </Button>
        <Button @click="() => (showAddModal = true)" :class="'whitespace-nowrap'">
          <i class="ri-add-line mr-2"></i>
          Добавить локацию
        </Button>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card :class="'text-center'">
        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
          <i class="ri-building-line text-xl text-blue-600"></i>
        </div>
        <p class="text-2xl font-bold text-gray-900">{{ locations.length }}</p>
        <p class="text-sm text-gray-600">Всего локаций</p>
      </Card>
      <Card :class="'text-center'">
        <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
          <i class="ri-checkbox-circle-line text-xl text-green-600"></i>
        </div>
        <p class="text-2xl font-bold text-gray-900">{{ locations.filter((l) => l.status === "active").length }}</p>
        <p class="text-sm text-gray-600">Активных</p>
      </Card>
      <Card :class="'text-center'">
        <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
          <i class="ri-computer-line text-xl text-purple-600"></i>
        </div>
        <p class="text-2xl font-bold text-gray-900">{{ locations.reduce((sum, l) => sum + l.equipmentCount, 0) }}</p>
        <p class="text-sm text-gray-600">Единиц оборудования</p>
      </Card>
      <Card :class="'text-center'">
        <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
          <i class="ri-group-line text-xl text-orange-600"></i>
        </div>
        <p class="text-2xl font-bold text-gray-900">{{ locations.reduce((sum, l) => sum + l.capacity, 0) }}</p>
        <p class="text-sm text-gray-600">Общая вместимость</p>
      </Card>
    </div>
    <Card>
      <div class="flex flex-wrap items-center gap-4">
        <div class="flex-1 min-w-64">
          <Input :placeholder="'Поиск по названию, ответственному...'" :class="'w-full'" />
        </div>
        <div class="flex items-center space-x-2">
          <span class="text-sm text-gray-600 whitespace-nowrap">Здание:</span>
          <select
            :value="selectedBuilding"
            @change="(e) => selectedBuilding = (e.target as HTMLInputElement).value"
            class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
          >
            <option v-for="building in buildings" :key="building.value" :value="building.value">{{ building.label }}</option>
          </select>
        </div>
      </div>
    </Card>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card v-for="location in filteredLocations" :key="location.id" :class="'hover:shadow-lg transition-shadow'">
        <div class="flex items-start justify-between mb-4">
          <div>
            <h3 class="font-semibold text-gray-900 text-lg">{{ location.name }}</h3>
            <p class="text-sm text-gray-500">{{ location.building }} • Этаж {{ location.floor }}</p>
          </div>
          <span :class="`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(location.status)}`">
            {{ getStatusText(location.status) }}
          </span>
        </div>
        <div class="space-y-3 mb-4">
          <div class="flex items-center justify-between text-sm">
            <span class="text-gray-600">Площадь:</span>
            <span class="font-medium">{{ location.area }} м²</span>
          </div>
          <div class="flex items-center justify-between text-sm">
            <span class="text-gray-600">Вместимость:</span>
            <span class="font-medium">{{ location.capacity }} чел.</span>
          </div>
          <div class="flex items-center justify-between text-sm">
            <span class="text-gray-600">Оборудование:</span>
            <span class="font-medium">{{ location.equipmentCount }} ед.</span>
          </div>
          <div class="flex items-center justify-between text-sm">
            <span class="text-gray-600">Ответственный:</span>
            <span class="font-medium">{{ location.responsible }}</span>
          </div>
          <div class="flex items-center justify-between text-sm">
            <span class="text-gray-600">Отдел:</span>
            <span class="font-medium">{{ location.department }}</span>
          </div>
        </div>
        <div class="bg-gray-50 p-3 rounded-lg mb-4">
          <p class="text-sm text-gray-700">{{ location.description }}</p>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <button class="p-2 text-gray-400 hover:text-blue-600 cursor-pointer">
              <i class="ri-eye-line"></i>
            </button>
            <button class="p-2 text-gray-400 hover:text-green-600 cursor-pointer">
              <i class="ri-edit-line"></i>
            </button>
            <button class="p-2 text-gray-400 hover:text-purple-600 cursor-pointer">
              <i class="ri-map-pin-line"></i>
            </button>
          </div>
          <Button :size="'sm'" :variant="'outline'" :class="'whitespace-nowrap'">
            <i class="ri-list-unordered mr-1"></i>
            Оборудование
          </Button>
        </div>
      </Card>
    </div>
    <div v-if="showAddModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-900">Добавить локацию</h3>
          <button @click="() => (showAddModal = false)" class="text-gray-400 hover:text-gray-600 cursor-pointer">
            <i class="ri-close-line text-xl"></i>
          </button>
        </div>
        <form class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Название локации</label>
              <Input :placeholder="'Например: Офис 301'" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Здание</label>
              <select class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8">
                <option value="">Выберите здание</option>
                <option value="main">Главное здание</option>
                <option value="warehouse">Склад</option>
                <option value="office2">Офис 2</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Этаж</label>
              <Input :type="'number'" :placeholder="'1'" :min="1" :max="20" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Площадь (м²)</label>
              <Input :type="'number'" :placeholder="'25'" :min="1" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Вместимость (чел.)</label>
              <Input :type="'number'" :placeholder="'4'" :min="1" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Статус</label>
              <select class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8">
                <option value="">Выберите статус</option>
                <option value="active">Активная</option>
                <option value="restricted">Ограниченный доступ</option>
                <option value="maintenance">На обслуживании</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Ответственный</label>
              <Input :placeholder="'ФИО ответственного'" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Отдел</label>
              <Input :placeholder="'Название отдела'" />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Описание</label>
            <textarea
              rows="{3}"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Дополнительная информация о локации"
              maxLength="{500}"
            ></textarea>
          </div>
          <div class="flex justify-end space-x-3 pt-4">
            <Button :variant="'outline'" @click="() => (showAddModal = false)" :class="'whitespace-nowrap'"> Отмена </Button>
            <Button :type="'submit'" :class="'whitespace-nowrap'"> Добавить локацию </Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
