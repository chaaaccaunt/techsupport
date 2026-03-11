<script setup lang="ts">
import { computed, ref } from "vue";
import { useModal } from "@/share/components/modals/useModal";
import { useAppData } from "@/share/libs/useAppData";

const filter = ref<"all" | "completed" | "scheduled" | "overdue">("all");
const { routeData } = useAppData();
const records = computed(() => routeData.value.maintenance?.items ?? []);
const filteredRecords = computed(() => filter.value === "all" ? records.value : records.value.filter((item) => item.status === filter.value));
const noop = () => {};
const { closeModal } = useModal();

function closeCurrent() {
  closeModal();
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
    <div class="flex max-h-[90vh] w-full max-w-4xl flex-col rounded-lg bg-white shadow-xl">
      <div class="flex items-center justify-between border-b p-6">
        <div>
          <h2 class="text-xl font-bold text-gray-900">История обслуживания</h2>
          <p class="mt-1 text-sm text-gray-600">Записи из `equipment-maintenances`</p>
        </div>
        <button class="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600" @click="closeCurrent"><i class="ri-close-line text-xl"></i></button>
      </div>

      <div class="border-b bg-gray-50 p-6">
        <div class="flex items-center space-x-2">
          <button :class="`rounded-lg px-4 py-2 text-sm font-medium ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`" @click="filter = 'all'">Все ({{ records.length }})</button>
          <button :class="`rounded-lg px-4 py-2 text-sm font-medium ${filter === 'scheduled' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`" @click="filter = 'scheduled'">Запланировано</button>
          <button :class="`rounded-lg px-4 py-2 text-sm font-medium ${filter === 'completed' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`" @click="filter = 'completed'">Выполнено</button>
          <button :class="`rounded-lg px-4 py-2 text-sm font-medium ${filter === 'overdue' ? 'bg-orange-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`" @click="filter = 'overdue'">Просрочено</button>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto p-6">
        <div class="space-y-4">
          <div v-for="record in filteredRecords" :key="record.id" class="rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md">
            <div class="mb-2 flex items-center justify-between">
              <span class="font-semibold text-gray-900">{{ record.equipment }}</span>
              <span :class="`rounded-full px-2 py-1 text-xs font-medium ${record.status === 'completed' ? 'bg-blue-100 text-blue-800' : record.status === 'overdue' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}`">{{ record.statusText }}</span>
            </div>
            <div class="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div>Дата: {{ record.date }}</div>
              <div>Ответственный: {{ record.responsible }}</div>
              <div>Последнее ТО: {{ record.last }}</div>
              <div>Следующее ТО: {{ record.next }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between border-t bg-gray-50 p-6">
        <div class="text-sm text-gray-600">Всего записей: {{ filteredRecords.length }}</div>
        <div class="flex space-x-3">
          <button class="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" @click="closeCurrent">Закрыть</button>
          <button class="rounded-lg bg-teal-600 px-4 py-2 text-sm text-white hover:bg-teal-700" @click="noop"><i class="ri-download-line mr-2"></i>Экспорт</button>
        </div>
      </div>
    </div>
  </div>
</template>
