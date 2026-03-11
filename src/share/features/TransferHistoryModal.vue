<script setup lang="ts">
import { computed, ref } from "vue";
import { useModal } from "@/share/components/modals/useModal";
import { useAppData } from "@/share/libs/useAppData";

const { closeModal } = useModal();
const filter = ref<"all" | "internal" | "crossDepartment">("all");
const { routeData } = useAppData();
const records = computed(() => routeData.value.dashboard?.transfers ?? []);
const internalCount = computed(() => records.value.filter((item) => item.from.split(" / ")[0] === item.to.split(" / ")[0]).length);
const crossDepartmentCount = computed(() => records.value.length - internalCount.value);
const filteredRecords = computed(() => {
  if (filter.value === "all") return records.value;
  if (filter.value === "internal") {
    return records.value.filter((item) => item.from.split(" / ")[0] === item.to.split(" / ")[0]);
  }
  return records.value.filter((item) => item.from.split(" / ")[0] !== item.to.split(" / ")[0]);
});

function closeCurrent() {
  closeModal();
}

function exportCsv() {
  const headers = ["Оборудование", "Инвентарный номер", "Откуда", "Куда", "Дата передачи", "Оформил", "Комментарий"];
  const rows = filteredRecords.value.map((item) => [item.equipment, item.inventoryNumber, item.from, item.to, item.dateTime, item.createdBy, item.comment]);
  const content = [headers.join(","), ...rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, "\"\"")}"`).join(","))].join("\n");
  const blob = new Blob(["\uFEFF" + content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `История_передач_${new Date().toISOString().split("T")[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
    <div class="flex max-h-[90vh] w-full max-w-4xl flex-col rounded-lg bg-white shadow-xl">
      <div class="flex items-center justify-between border-b p-6">
        <div>
          <h2 class="text-xl font-bold text-gray-900">История передач</h2>
          <p class="mt-1 text-sm text-gray-600">Записи из `equipment-transfers`</p>
        </div>
        <button class="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600" @click="closeCurrent">
          <i class="ri-close-line text-xl"></i>
        </button>
      </div>

      <div class="border-b bg-gray-50 p-6">
        <div class="flex flex-wrap items-center gap-2">
          <button :class="`rounded-lg px-4 py-2 text-sm font-medium ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`" @click="filter = 'all'">
            Все ({{ records.length }})
          </button>
          <button :class="`rounded-lg px-4 py-2 text-sm font-medium ${filter === 'internal' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`" @click="filter = 'internal'">
            Внутри отдела ({{ internalCount }})
          </button>
          <button :class="`rounded-lg px-4 py-2 text-sm font-medium ${filter === 'crossDepartment' ? 'bg-orange-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`" @click="filter = 'crossDepartment'">
            Между отделами ({{ crossDepartmentCount }})
          </button>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto p-6">
        <div v-if="filteredRecords.length" class="space-y-4">
          <div v-for="record in filteredRecords" :key="record.id" class="rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md">
            <div class="mb-3 flex items-start justify-between gap-3">
              <div>
                <div class="flex flex-wrap items-center gap-2">
                  <span class="font-semibold text-gray-900">{{ record.equipment }}</span>
                  <span class="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">{{ record.inventoryNumber }}</span>
                </div>
                <p class="mt-2 text-sm text-gray-700">{{ record.comment }}</p>
              </div>
              <span class="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">{{ record.date }}</span>
            </div>

            <div class="grid grid-cols-1 gap-3 text-sm text-gray-600 md:grid-cols-2">
              <div class="flex items-center">
                <i class="ri-arrow-left-right-line mr-2"></i>
                <span>Откуда: {{ record.from }}</span>
              </div>
              <div class="flex items-center">
                <i class="ri-arrow-right-line mr-2"></i>
                <span>Куда: {{ record.to }}</span>
              </div>
              <div class="flex items-center">
                <i class="ri-calendar-line mr-2"></i>
                <span>Дата: {{ record.dateTime }}</span>
              </div>
              <div class="flex items-center">
                <i class="ri-user-line mr-2"></i>
                <span>Оформил: {{ record.createdBy }}</span>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="py-12 text-center text-gray-500">
          <i class="ri-history-line mb-4 block text-4xl text-gray-300"></i>
          <p>История передач пуста</p>
        </div>
      </div>

      <div class="flex items-center justify-between border-t bg-gray-50 p-6">
        <div class="text-sm text-gray-600">Всего записей: {{ filteredRecords.length }}</div>
        <div class="flex gap-3">
          <button class="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" @click="closeCurrent">Закрыть</button>
          <button class="rounded-lg bg-teal-600 px-4 py-2 text-sm text-white hover:bg-teal-700" @click="exportCsv">
            <i class="ri-download-line mr-2"></i>Экспорт
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
