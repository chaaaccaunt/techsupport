<script setup lang="ts">
import { computed, ref } from "vue";
import AppModal from "./AppModal.vue";
import { useModal } from "./useModal";
import { maintenanceCalendarItems } from "./modalMocks";
import { iModalDescriptor } from "@/entities/store/modules/modal";

const props = defineProps<{ modal: iModalDescriptor }>();
const { closeModal } = useModal();

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const monthNames = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
const currentMonth = ref(new Date(2024, 11, 1));
const selectedDate = ref<Date | null>(null);

const stats = computed(() => ({
  scheduled: maintenanceCalendarItems.filter((item) => item.status === "scheduled").length,
  overdue: maintenanceCalendarItems.filter((item) => item.status === "overdue").length,
  completed: maintenanceCalendarItems.filter((item) => item.status === "completed").length,
}));

function closeCurrent() {
  closeModal(props.modal.id);
}

function getMaintenanceForDate(date: Date) {
  const isoDate = `${date.getFullYear()}-${`${date.getMonth() + 1}`.padStart(2, "0")}-${`${date.getDate()}`.padStart(2, "0")}`;
  return maintenanceCalendarItems.filter((item) => item.date === isoDate);
}

const calendarDays = computed(() => {
  const year = currentMonth.value.getFullYear();
  const month = currentMonth.value.getMonth();
  const firstDay = new Date(year, month, 1);
  const firstWeekDay = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: Array<{ date: Date | null; items: typeof maintenanceCalendarItems }> = [];

  for (let i = 0; i < firstWeekDay; i += 1) {
    cells.push({ date: null, items: [] });
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(year, month, day);
    cells.push({ date, items: getMaintenanceForDate(date) });
  }
  while (cells.length % 7 !== 0) {
    cells.push({ date: null, items: [] });
  }
  return cells;
});
</script>

<template>
  <AppModal v-if="modal.key === 'maintenance.create'" :model-value="true" size="lg" custom-chrome @close="closeCurrent" @update:modelValue="closeCurrent">
    <div class="bg-white rounded-lg p-6 w-full max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-semibold text-gray-900">Запланировать техническое обслуживание</h3>
        <button class="text-gray-400 hover:text-gray-600" @click="closeCurrent"><i class="ri-close-line text-xl"></i></button>
      </div>
      <form class="space-y-4" @submit.prevent>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label class="block text-sm font-medium text-gray-700 mb-1">Оборудование</label><select class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm pr-8"><option value="">Выберите оборудование</option><option v-for="item in maintenanceCalendarItems" :key="item.id" :value="item.equipmentId">{{ item.equipment }}</option></select></div>
          <div><label class="block text-sm font-medium text-gray-700 mb-1">Дата следующего ТО</label><input type="date" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" /></div>
        </div>
        <div class="flex justify-end space-x-3 pt-4">
          <button type="button" class="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" @click="closeCurrent">Отмена</button>
          <button type="submit" class="rounded-lg bg-teal-600 px-4 py-2 text-sm text-white hover:bg-teal-700">Запланировать ТО</button>
        </div>
      </form>
    </div>
  </AppModal>

  <AppModal v-else :model-value="true" size="xl" custom-chrome @close="closeCurrent" @update:modelValue="closeCurrent">
    <div class="bg-white rounded-lg shadow-xl max-h-[90vh] flex flex-col">
      <div class="flex items-center justify-between p-6 border-b">
        <div><h2 class="text-xl font-bold text-gray-900">Календарь технического обслуживания</h2><p class="text-sm text-gray-600 mt-1">Планирование и отслеживание работ по ТО</p></div>
        <button class="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" @click="closeCurrent"><i class="ri-close-line text-xl"></i></button>
      </div>
      <div class="flex-1 overflow-y-auto p-6">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2">
            <div class="flex items-center justify-between mb-4">
              <button class="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" @click="currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)"><i class="ri-arrow-left-s-line text-xl"></i></button>
              <h3 class="text-lg font-bold text-gray-900">{{ monthNames[currentMonth.getMonth()] }} {{ currentMonth.getFullYear() }}</h3>
              <button class="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" @click="currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)"><i class="ri-arrow-right-s-line text-xl"></i></button>
            </div>
            <div class="grid grid-cols-7 mb-2"><div v-for="day in weekDays" :key="day" class="text-center text-sm font-semibold text-gray-600 py-2">{{ day }}</div></div>
            <div class="grid grid-cols-7 border-t border-l border-gray-200">
              <button v-for="(cell, index) in calendarDays" :key="index" type="button" class="min-h-[88px] border-r border-b border-gray-200 p-2 text-left align-top hover:bg-gray-50" :class="{ 'bg-gray-50': !cell.date, 'bg-blue-50': selectedDate && cell.date && selectedDate.toDateString() === cell.date.toDateString() }" @click="cell.date && (selectedDate = cell.date)">
                <div v-if="cell.date" class="text-sm font-medium text-gray-900">{{ cell.date.getDate() }}</div>
                <div v-if="cell.date" class="mt-1 space-y-1">
                  <div v-for="item in cell.items.slice(0, 2)" :key="item.id" class="truncate rounded px-1.5 py-0.5 text-[10px]" :class="item.status === 'completed' ? 'bg-blue-100 text-blue-700' : item.status === 'overdue' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'">{{ item.equipment }}</div>
                </div>
              </button>
            </div>
          </div>
          <div class="lg:col-span-1">
            <div class="bg-gray-50 rounded-lg p-4">
              <h4 class="font-semibold text-gray-900 mb-4"><template v-if="selectedDate">{{ selectedDate.getDate() }} {{ monthNames[selectedDate.getMonth()] }} {{ selectedDate.getFullYear() }}</template><template v-else>Выберите дату</template></h4>
              <div v-if="selectedDate" class="space-y-3">
                <template v-if="getMaintenanceForDate(selectedDate).length > 0">
                  <div v-for="item in getMaintenanceForDate(selectedDate)" :key="item.id" class="bg-white rounded-lg p-3 border border-gray-200">
                    <div class="font-medium text-sm text-gray-900">{{ item.equipment }}</div>
                    <div class="text-xs text-gray-500 mt-1">Ответственный: {{ item.responsible }}</div>
                    <div class="mt-2"><span class="px-2 py-0.5 text-xs rounded-full" :class="item.status === 'completed' ? 'bg-blue-100 text-blue-700' : item.status === 'overdue' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'">{{ item.statusText }}</span></div>
                  </div>
                </template>
                <div v-else class="text-center py-8 text-gray-500 text-sm">Нет запланированных работ</div>
              </div>
              <div class="mt-4 space-y-2">
                <div class="bg-green-50 rounded-lg p-3 flex items-center justify-between"><span class="text-sm text-green-700">Запланировано</span><span class="font-bold text-green-800">{{ stats.scheduled }}</span></div>
                <div class="bg-orange-50 rounded-lg p-3 flex items-center justify-between"><span class="text-sm text-orange-700">Просрочено</span><span class="font-bold text-orange-800">{{ stats.overdue }}</span></div>
                <div class="bg-blue-50 rounded-lg p-3 flex items-center justify-between"><span class="text-sm text-blue-700">Выполнено</span><span class="font-bold text-blue-800">{{ stats.completed }}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-between p-6 border-t bg-gray-50">
        <button class="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1" @click="selectedDate = new Date(); currentMonth = new Date(2024, 11, 1)"><i class="ri-focus-3-line"></i>Сегодня</button>
        <button class="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" @click="closeCurrent">Закрыть</button>
      </div>
    </div>
  </AppModal>
</template>
