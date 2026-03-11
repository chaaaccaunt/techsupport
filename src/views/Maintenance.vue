<script setup lang="ts">
import { computed, ref } from "vue";
import { useModal } from "@/share/components/shared/useModal";
import { useAppData } from "@/share/libs/useAppData";

const selectedTab = ref<"scheduled" | "completed" | "overdue">("scheduled");
const { openModal } = useModal();
const openCalendarModal = () => openModal({ key: "maintenance.calendar", size: "xl" });
const openCreateMaintenanceModal = () => openModal({ key: "maintenance.create", size: "xl" });
const openViewMaintenanceModal = (maintenanceId: string) => openModal({ key: "maintenance.view", size: "lg", payload: { maintenanceId } });
const openEditMaintenanceModal = (maintenanceId: string) => openModal({ key: "maintenance.edit", size: "xl", payload: { maintenanceId } });
const openDeleteMaintenanceModal = (maintenanceId: string) => openModal({ key: "maintenance.delete", size: "sm", payload: { maintenanceId } });

const { routeData } = useAppData();
const maintenanceItems = computed(() => routeData.value.maintenance?.items ?? []);
const maintenanceMockData = computed(() => ({
  scheduled: maintenanceItems.value.filter((item) => item.status === "scheduled"),
  completed: maintenanceItems.value.filter((item) => item.status === "completed"),
  overdue: maintenanceItems.value.filter((item) => item.status === "overdue"),
}));
</script>

<template>
  <div class="space-y-4 p-4 md:space-y-6 md:p-6">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-xl font-bold text-gray-900 md:text-2xl">Техническое обслуживание</h1>
        <p class="mt-1 text-sm text-gray-600">Планирование и контроль технического обслуживания оборудования</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="rounded-lg border border-gray-300 px-4 py-2 text-sm" @click="openCalendarModal"><i class="ri-calendar-line mr-2"></i>Календарь ТО</button>
        <button class="rounded-lg bg-teal-600 px-4 py-2 text-sm text-white" @click="openCreateMaintenanceModal"><i class="ri-add-line mr-2"></i>Запланировать ТО</button>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
      <div class="rounded-xl bg-white p-4 text-center shadow-sm">
        <div class="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100 md:h-12 md:w-12">
          <i class="ri-calendar-check-line text-lg text-teal-600 md:text-xl"></i>
        </div>
        <p class="text-xl font-bold text-gray-900 md:text-2xl">{{ maintenanceMockData.scheduled.length }}</p>
        <p class="text-xs text-gray-600 md:text-sm">Запланировано</p>
      </div>
      <div class="rounded-xl bg-white p-4 text-center shadow-sm">
        <div class="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 md:h-12 md:w-12">
          <i class="ri-checkbox-circle-line text-lg text-green-600 md:text-xl"></i>
        </div>
        <p class="text-xl font-bold text-gray-900 md:text-2xl">{{ maintenanceMockData.completed.length }}</p>
        <p class="text-xs text-gray-600 md:text-sm">Выполнено</p>
      </div>
      <div class="rounded-xl bg-white p-4 text-center shadow-sm">
        <div class="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 md:h-12 md:w-12">
          <i class="ri-error-warning-line text-lg text-red-600 md:text-xl"></i>
        </div>
        <p class="text-xl font-bold text-gray-900 md:text-2xl">{{ maintenanceMockData.overdue.length }}</p>
        <p class="text-xs text-gray-600 md:text-sm">Просрочено</p>
      </div>
      <div class="rounded-xl bg-white p-4 text-center shadow-sm">
        <div class="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 md:h-12 md:w-12">
          <i class="ri-time-line text-lg text-purple-600 md:text-xl"></i>
        </div>
        <p class="text-xl font-bold text-gray-900 md:text-2xl">{{ maintenanceItems.length }}</p>
        <p class="text-xs text-gray-600 md:text-sm">Всего записей</p>
      </div>
    </div>

    <section class="rounded-xl bg-white p-4 shadow-sm">
      <div class="overflow-x-auto border-b border-gray-200">
        <nav class="flex min-w-max space-x-4 md:space-x-8">
          <button
            :class="`border-b-2 px-1 py-4 text-sm font-medium ${selectedTab === 'scheduled' ? 'border-teal-500 text-teal-600' : 'border-transparent text-gray-500'}`"
            @click="selectedTab = 'scheduled'"
          >
            Запланированные ({{ maintenanceMockData.scheduled.length }})
          </button>
          <button
            :class="`border-b-2 px-1 py-4 text-sm font-medium ${selectedTab === 'completed' ? 'border-teal-500 text-teal-600' : 'border-transparent text-gray-500'}`"
            @click="selectedTab = 'completed'"
          >
            Выполненные ({{ maintenanceMockData.completed.length }})
          </button>
          <button
            :class="`border-b-2 px-1 py-4 text-sm font-medium ${selectedTab === 'overdue' ? 'border-teal-500 text-teal-600' : 'border-transparent text-gray-500'}`"
            @click="selectedTab = 'overdue'"
          >
            Просроченные ({{ maintenanceMockData.overdue.length }})
          </button>
        </nav>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-[860px] w-full">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="px-4 py-3 text-left font-medium text-gray-700">ID / Оборудование</th>
              <th class="px-4 py-3 text-left font-medium text-gray-700">Тип ТО</th>
              <th class="px-4 py-3 text-left font-medium text-gray-700">Дата</th>
              <th class="px-4 py-3 text-left font-medium text-gray-700">Ответственный</th>
              <th class="px-4 py-3 text-left font-medium text-gray-700">Приоритет</th>
              <th class="px-4 py-3 text-left font-medium text-gray-700">Статус</th>
              <th class="px-4 py-3 text-right font-medium text-gray-700">Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in maintenanceMockData[selectedTab]" :key="item.id" class="border-b border-gray-100 hover:bg-gray-50">
              <td class="px-4 py-4">
                <p class="font-medium text-gray-900">{{ item.id }}</p>
                <p class="text-sm text-gray-500">{{ item.equipment }}</p>
                <p class="text-xs text-gray-400">equipmentId: {{ item.equipmentId }}</p>
              </td>
              <td class="px-4 py-4 text-sm text-gray-600">Техническое обслуживание</td>
              <td class="px-4 py-4 text-sm text-gray-600">{{ item.date }}</td>
              <td class="px-4 py-4 text-sm text-gray-600">{{ item.responsible }}</td>
              <td class="px-4 py-4"><span class="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">По схеме не задан</span></td>
              <td class="px-4 py-4">
                <span :class="`rounded-full px-2 py-1 text-xs font-medium bg-${item.statusTone}-100 text-${item.statusTone}-800`">{{ item.statusText }}</span>
              </td>
              <td class="px-4 py-4">
                <div class="flex items-center justify-end gap-1">
                  <button class="p-2 text-gray-400 hover:text-teal-600" @click="openViewMaintenanceModal(String(item.id))"><i class="ri-eye-line"></i></button
                  ><button class="p-2 text-gray-400 hover:text-green-600" @click="openEditMaintenanceModal(String(item.id))"><i class="ri-edit-line"></i></button
                  ><button class="p-2 text-gray-400 hover:text-red-600" @click="openDeleteMaintenanceModal(String(item.id))"><i class="ri-delete-bin-line"></i></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>
