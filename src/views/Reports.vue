<script setup lang="ts">
import { computed, ref } from "vue";
import { downloadCsv } from "@/share/libs/downloadCsv";

const selectedPeriod = ref("month");
const selectedReport = ref("equipment");

const periods = [
  { value: "week", label: "Неделя" },
  { value: "month", label: "Месяц" },
  { value: "quarter", label: "Квартал" },
  { value: "year", label: "Год" },
];

const reportTypes = [
  { value: "equipment", label: "Отчет по оборудованию" },
  { value: "maintenance", label: "Отчет по ТО" },
  { value: "tickets", label: "Отчет по заявкам" },
  { value: "users", label: "Отчет по пользователям" },
];

const quickReports = [
  { title: "Оборудование без ответственного", description: "Список оборудования, не закрепленного за сотрудниками", count: 12, icon: "ri-user-unfollow-line", tone: "orange" },
  { title: "Просроченное ТО", description: "Оборудование с просроченным техническим обслуживанием", count: 8, icon: "ri-time-line", tone: "red" },
  { title: "Активные заявки", description: "Заявки в статусе «Новая» и «В работе»", count: 68, icon: "ri-customer-service-line", tone: "blue" },
  { title: "Оборудование на складе", description: "Неиспользуемое оборудование на складе", count: 156, icon: "ri-archive-line", tone: "purple" },
];

const selectedReportLabel = computed(() => reportTypes.find((item) => item.value === selectedReport.value)?.label ?? "Отчет");

function exportReport() {
  const filename = `report_${selectedReport.value}_${selectedPeriod.value}_${new Date().toISOString().split("T")[0]}.csv`;

  if (selectedReport.value === "equipment") {
    downloadCsv(
      filename,
      ["Показатель", "Значение"],
      [
        ["Всего", 1247],
        ["Исправное", 1156],
        ["Неисправное", 23],
        ["На ТО", 45],
        ["Списанное", 23],
      ],
    );
    return;
  }

  downloadCsv(filename, ["Отчет", "Период", "Статус"], [[selectedReportLabel.value, selectedPeriod.value, "В разработке"]]);
}
</script>

<template>
  <div class="space-y-4 p-4 md:space-y-6 md:p-6">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-xl font-bold text-gray-900 md:text-2xl">Отчеты и аналитика</h1>
        <p class="mt-1 text-sm text-gray-600">Статистика и отчеты по управлению оборудованием</p>
      </div>
      <div class="flex items-center gap-2">
        <select v-model="selectedPeriod" class="rounded-lg border border-gray-300 px-3 py-2 text-sm"><option v-for="period in periods" :key="period.value" :value="period.value">{{ period.label }}</option></select>
        <button class="rounded-lg border border-gray-300 px-4 py-2 text-sm" @click="exportReport"><i class="ri-download-line mr-2"></i>Экспорт отчета</button>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
      <article v-for="report in quickReports" :key="report.title" class="rounded-xl bg-white p-4 shadow-sm">
        <div class="flex items-center">
          <div :class="`flex h-10 w-10 items-center justify-center rounded-lg bg-${report.tone}-100 md:h-12 md:w-12`">
            <i :class="`${report.icon} text-lg md:text-xl text-${report.tone}-600`"></i>
          </div>
          <div class="ml-3 min-w-0 flex-1">
            <p class="text-xl font-bold text-gray-900 md:text-2xl">{{ report.count }}</p>
            <p class="text-xs font-medium text-gray-700 md:text-sm">{{ report.title }}</p>
          </div>
        </div>
        <p class="mt-2 text-xs text-gray-500">{{ report.description }}</p>
      </article>
    </div>

    <section class="rounded-xl bg-white shadow-sm">
      <div class="overflow-x-auto border-b border-gray-200 px-4">
        <nav class="flex min-w-max space-x-4 md:space-x-8">
          <button v-for="type in reportTypes" :key="type.value" :class="`border-b-2 px-1 py-4 text-sm font-medium ${selectedReport === type.value ? 'border-teal-500 text-teal-600' : 'border-transparent text-gray-500'}`" @click="selectedReport = type.value">{{ type.label }}</button>
        </nav>
      </div>
      <div class="p-4 md:p-6">
        <div v-if="selectedReport === 'equipment'" class="space-y-6">
          <div class="grid grid-cols-3 gap-3 md:grid-cols-5 md:gap-6">
            <div class="text-center"><p class="text-xl font-bold text-gray-900 md:text-2xl">1247</p><p class="text-xs text-gray-600 md:text-sm">Всего</p></div>
            <div class="text-center"><p class="text-xl font-bold text-green-600 md:text-2xl">1156</p><p class="text-xs text-gray-600 md:text-sm">Исправное</p></div>
            <div class="text-center"><p class="text-xl font-bold text-red-600 md:text-2xl">23</p><p class="text-xs text-gray-600 md:text-sm">Неисправное</p></div>
            <div class="text-center"><p class="text-xl font-bold text-yellow-600 md:text-2xl">45</p><p class="text-xs text-gray-600 md:text-sm">На ТО</p></div>
            <div class="text-center"><p class="text-xl font-bold text-gray-600 md:text-2xl">23</p><p class="text-xs text-gray-600 md:text-sm">Списанное</p></div>
          </div>
          <div class="space-y-3">
            <div class="flex items-center justify-between gap-3"><span class="w-32 flex-shrink-0 text-sm text-gray-700">Компьютеры</span><div class="flex flex-1 items-center gap-2"><div class="h-2 flex-1 rounded-full bg-gray-200"><div class="h-2 rounded-full bg-teal-600" style="width: 36.6%"></div></div><span class="w-10 text-right text-sm font-medium text-gray-900">456</span><span class="w-12 text-right text-sm text-gray-500">36.6%</span></div></div>
            <div class="flex items-center justify-between gap-3"><span class="w-32 flex-shrink-0 text-sm text-gray-700">Принтеры</span><div class="flex flex-1 items-center gap-2"><div class="h-2 flex-1 rounded-full bg-gray-200"><div class="h-2 rounded-full bg-teal-600" style="width: 18.8%"></div></div><span class="w-10 text-right text-sm font-medium text-gray-900">234</span><span class="w-12 text-right text-sm text-gray-500">18.8%</span></div></div>
            <div class="flex items-center justify-between gap-3"><span class="w-32 flex-shrink-0 text-sm text-gray-700">Мониторы</span><div class="flex flex-1 items-center gap-2"><div class="h-2 flex-1 rounded-full bg-gray-200"><div class="h-2 rounded-full bg-teal-600" style="width: 27.7%"></div></div><span class="w-10 text-right text-sm font-medium text-gray-900">345</span><span class="w-12 text-right text-sm text-gray-500">27.7%</span></div></div>
          </div>
        </div>
        <div v-else class="rounded-lg bg-gray-50 p-6 text-sm text-gray-600">
          {{ selectedReportLabel }} переключается корректно. Детальная аналитика для этого блока пока остается статической, но экспорт уже работает и отдает выбранный тип отчета и период.
        </div>
      </div>
    </section>
  </div>
</template>
