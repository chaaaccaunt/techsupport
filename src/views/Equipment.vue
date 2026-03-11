<script setup lang="ts">
import { computed, ref } from "vue";
import { useModal } from "@/share/components/shared/useModal";
import { useAppData } from "@/share/libs/useAppData";
import { downloadCsv } from "@/share/libs/downloadCsv";

const selectedCategory = ref("all");
const selectedStatus = ref("all");
const viewMode = ref("list");
const { openModal } = useModal();
const openCreateEquipmentModal = () => openModal({ key: "equipment.create", size: "xl" });
const openViewEquipmentModal = (equipmentId: string) => openModal({ key: "equipment.view", size: "xl", payload: { equipmentId } });
const openEditEquipmentModal = (equipmentId: string) => openModal({ key: "equipment.edit", size: "xl", payload: { equipmentId } });
const openDeleteEquipmentModal = (equipmentId: string) => openModal({ key: "equipment.delete", size: "sm", payload: { equipmentId } });

const categories = [
  { value: "all", label: "Все категории" },
  { value: "computers", label: "Компьютеры" },
  { value: "printers", label: "Принтеры" },
  { value: "scanners", label: "Сканеры" },
  { value: "monitors", label: "Мониторы" },
];

const statuses = [
  { value: "all", label: "Все статусы" },
  { value: "working", label: "Исправное" },
  { value: "broken", label: "Неисправное" },
  { value: "maintenance", label: "На ТО" },
  { value: "disposed", label: "Списанное" },
];

const { routeData } = useAppData();
const equipment = computed(() => routeData.value.equipment?.items ?? []);

function exportEquipment() {
  downloadCsv(
    `equipment_${new Date().toISOString().split("T")[0]}.csv`,
    ["Название", "Код", "Серийный номер", "Категория", "Статус", "Локация", "Ответственный", "Следующее ТО"],
    equipment.value.map((item) => [
      item.name,
      item.code,
      item.serial,
      item.category,
      item.statusText,
      item.location,
      item.responsible,
      item.nextMaintenance,
    ]),
  );
}
</script>

<template>
  <div class="space-y-4 p-4 md:space-y-6 md:p-6">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-xl font-bold text-gray-900 md:text-2xl">Оборудование</h1>
        <p class="mt-1 text-sm text-gray-600">Управление парком оборудования</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="rounded-lg border border-gray-300 px-4 py-2 text-sm" @click="exportEquipment"><i class="ri-download-line mr-2"></i>Экспорт</button>
        <button class="rounded-lg bg-teal-600 px-4 py-2 text-sm text-white" @click="openCreateEquipmentModal"><i class="ri-add-line mr-2"></i>Добавить оборудование</button>
      </div>
    </div>

    <section class="rounded-xl bg-white p-4 shadow-sm">
      <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <input type="text" placeholder="Поиск по названию, серийному номеру..." class="min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm" />
        <div class="flex items-center gap-2"><span class="text-sm text-gray-600">Категория:</span><select v-model="selectedCategory" class="rounded-lg border border-gray-300 px-3 py-2 text-sm"><option v-for="category in categories" :key="category.value" :value="category.value">{{ category.label }}</option></select></div>
        <div class="flex items-center gap-2"><span class="text-sm text-gray-600">Статус:</span><select v-model="selectedStatus" class="rounded-lg border border-gray-300 px-3 py-2 text-sm"><option v-for="status in statuses" :key="status.value" :value="status.value">{{ status.label }}</option></select></div>
        <div class="flex items-center rounded-lg border border-gray-300">
          <button :class="`p-2 ${viewMode === 'list' ? 'bg-teal-100 text-teal-600' : 'text-gray-500'}`" @click="viewMode = 'list'"><i class="ri-list-unordered text-sm"></i></button>
          <button :class="`p-2 ${viewMode === 'grid' ? 'bg-teal-100 text-teal-600' : 'text-gray-500'}`" @click="viewMode = 'grid'"><i class="ri-grid-line text-sm"></i></button>
        </div>
      </div>
    </section>

    <div class="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
      <div class="rounded-xl bg-white p-4 text-center shadow-sm"><div class="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100 md:h-12 md:w-12"><i class="ri-computer-line text-lg text-teal-600 md:text-xl"></i></div><p class="text-xl font-bold text-gray-900 md:text-2xl">{{ equipment.length }}</p><p class="text-xs text-gray-600 md:text-sm">Всего оборудования</p></div>
      <div class="rounded-xl bg-white p-4 text-center shadow-sm"><div class="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 md:h-12 md:w-12"><i class="ri-checkbox-circle-line text-lg text-green-600 md:text-xl"></i></div><p class="text-xl font-bold text-gray-900 md:text-2xl">{{ equipment.filter((item) => item.status === 'working').length }}</p><p class="text-xs text-gray-600 md:text-sm">Исправное</p></div>
      <div class="rounded-xl bg-white p-4 text-center shadow-sm"><div class="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 md:h-12 md:w-12"><i class="ri-error-warning-line text-lg text-red-600 md:text-xl"></i></div><p class="text-xl font-bold text-gray-900 md:text-2xl">{{ equipment.filter((item) => item.status === 'broken').length }}</p><p class="text-xs text-gray-600 md:text-sm">Неисправное</p></div>
      <div class="rounded-xl bg-white p-4 text-center shadow-sm"><div class="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100 md:h-12 md:w-12"><i class="ri-tools-line text-lg text-yellow-600 md:text-xl"></i></div><p class="text-xl font-bold text-gray-900 md:text-2xl">{{ equipment.filter((item) => item.status === 'maintenance').length }}</p><p class="text-xs text-gray-600 md:text-sm">На ТО</p></div>
    </div>

    <section class="rounded-xl bg-white p-4 shadow-sm">
      <div class="overflow-x-auto">
        <table class="min-w-[760px] w-full">
          <thead><tr class="border-b border-gray-200"><th class="px-4 py-3 text-left font-medium text-gray-700">Оборудование</th><th class="px-4 py-3 text-left font-medium text-gray-700">Категория</th><th class="px-4 py-3 text-left font-medium text-gray-700">Статус</th><th class="px-4 py-3 text-left font-medium text-gray-700">Расположение</th><th class="px-4 py-3 text-left font-medium text-gray-700">Ответственный</th><th class="px-4 py-3 text-left font-medium text-gray-700">Следующее ТО</th><th class="px-4 py-3 text-right font-medium text-gray-700">Действия</th></tr></thead>
          <tbody>
            <tr v-for="item in equipment" :key="item.id" class="border-b border-gray-100 hover:bg-gray-50">
              <td class="px-4 py-4"><p class="font-medium text-gray-900">{{ item.name }}</p><p class="text-sm text-gray-500">{{ item.code }} • {{ item.serial }}</p></td>
              <td class="px-4 py-4 text-sm text-gray-600">{{ item.category }}</td>
              <td class="px-4 py-4"><span :class="`rounded-full px-2 py-1 text-xs font-medium ${item.status === 'working' ? 'bg-green-100 text-green-800' : item.status === 'broken' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`">{{ item.statusText }}</span></td>
              <td class="px-4 py-4 text-sm text-gray-600">{{ item.location }}</td>
              <td class="px-4 py-4 text-sm text-gray-600">{{ item.responsible }}</td>
              <td class="px-4 py-4 text-sm text-gray-600">{{ item.nextMaintenance }}</td>
              <td class="px-4 py-4"><div class="flex items-center justify-end gap-2"><button class="p-2 text-gray-400 hover:text-teal-600" @click="openViewEquipmentModal(String(item.id))"><i class="ri-eye-line"></i></button><button class="p-2 text-gray-400 hover:text-green-600" @click="openEditEquipmentModal(String(item.id))"><i class="ri-edit-line"></i></button><button class="p-2 text-gray-400 hover:text-red-600" @click="openDeleteEquipmentModal(String(item.id))"><i class="ri-delete-bin-line"></i></button></div></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>
