<script setup lang="ts">
import { computed } from "vue";
import { useModal } from "@/share/components/shared/useModal";
import { getDashboardStats, getTicketViewItems, getTransferViewItems } from "@/share/mocks/schemaMocks";

const { openModal } = useModal();
const stats = computed(() => getDashboardStats());
const tickets = computed(() => getTicketViewItems());
const transfers = computed(() => getTransferViewItems().slice(0, 4));

const noop = () => {};
const openExportModal = () => openModal({ key: "dashboard.export", size: "md" });
const openEditTicketModal = (ticketId: string) => openModal({ key: "dashboard.edit-ticket", size: "lg", payload: { ticketId } });
const openDeleteTicketModal = (ticketId: string) => openModal({ key: "tickets.delete", size: "sm", payload: { ticketId } });
const openTransferHistoryModal = () => openModal({ key: "equipment.transfer-history", size: "xl" });
const openCreateEquipmentModal = () => openModal({ key: "equipment.create", size: "xl" });
const openQrScannerModal = () => openModal({ key: "equipment.qr-scan", size: "md" });
const openCreateTicketModal = () => openModal({ key: "tickets.create", size: "xl" });
</script>

<template>
  <div class="p-4 md:p-8">
    <div>
      <h1 class="text-xl font-bold text-gray-900 md:text-2xl">Панель управления</h1>
      <p class="mt-1 text-sm text-gray-600 md:text-base">Обзор состояния оборудования и активности системы</p>
    </div>

    <div class="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 xl:grid-cols-6">
      <div v-for="stat in stats" :key="stat.title" class="rounded-xl bg-white p-4 shadow-sm">
        <div class="flex items-center">
          <div :class="`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-${stat.tone}-100 md:h-12 md:w-12`">
            <i :class="`${stat.icon} text-lg md:text-xl text-${stat.tone}-600`"></i>
          </div>
          <div class="ml-3">
            <p class="text-xs font-medium leading-tight text-gray-600">{{ stat.title }}</p>
            <p class="text-xl font-bold text-gray-900 md:text-2xl">{{ stat.value }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
      <section class="rounded-xl bg-white p-6 shadow-sm">
        <div class="mb-4 flex items-center justify-between">
          <h2 class="text-lg font-bold text-gray-900">Последние заявки</h2>
          <button class="rounded-lg border border-gray-300 px-3 py-2 text-sm" @click="noop"><i class="ri-eye-line mr-2"></i>Все заявки</button>
        </div>
        <div class="space-y-3">
          <div v-for="ticket in tickets" :key="ticket.id" class="flex items-start justify-between gap-2 rounded-lg bg-gray-50 p-3">
            <div class="min-w-0 flex-1">
              <div class="flex flex-wrap items-center gap-2">
                <span class="text-sm font-medium text-gray-900">#{{ ticket.id }}</span>
                <span :class="`rounded-full px-2 py-0.5 text-xs ${ticket.priority === 'high' ? 'bg-red-100 text-red-800' : ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`">{{ ticket.priorityText }}</span>
              </div>
              <p class="mt-1 truncate text-xs text-gray-600">{{ ticket.equipment }} - {{ ticket.description }}</p>
            </div>
            <div class="flex items-center gap-1">
              <span :class="`rounded-full px-2 py-1 text-xs font-medium ${ticket.status === 'open' ? 'bg-teal-100 text-teal-800' : 'bg-orange-100 text-orange-800'}`">{{ ticket.statusText }}</span>
              <button class="p-1.5 text-gray-400 hover:text-green-600" @click="openEditTicketModal(String(ticket.id))"><i class="ri-edit-line text-sm"></i></button>
              <button class="p-1.5 text-gray-400 hover:text-red-600" @click="openDeleteTicketModal(String(ticket.id))"><i class="ri-delete-bin-line text-sm"></i></button>
            </div>
          </div>
        </div>
      </section>

      <section class="rounded-xl bg-white p-6 shadow-sm">
        <div class="mb-4 flex items-center justify-between">
          <h2 class="text-lg font-bold text-gray-900">Последние передачи</h2>
          <button class="rounded-lg border border-gray-300 px-3 py-2 text-sm" @click="openTransferHistoryModal"><i class="ri-history-line mr-2"></i>История</button>
        </div>
        <div v-if="transfers.length" class="space-y-3">
          <div v-for="transfer in transfers" :key="transfer.id" class="flex items-center justify-between gap-2 rounded-lg bg-gray-50 p-3">
            <div class="min-w-0 flex-1">
              <p class="text-sm font-medium text-gray-900">{{ transfer.equipment }}</p>
              <div class="mt-1 flex flex-wrap items-center gap-1 text-xs text-gray-600">
                <span class="truncate">{{ transfer.from }}</span>
                <i class="ri-arrow-right-line"></i>
                <span class="truncate">{{ transfer.to }}</span>
              </div>
            </div>
            <span class="flex-shrink-0 text-xs text-gray-500">{{ transfer.date }}</span>
          </div>
        </div>
        <div v-else class="rounded-lg bg-gray-50 p-4 text-sm text-gray-500">История передач пока пуста.</div>
      </section>
    </div>

    <section class="mt-6 rounded-xl bg-white p-6 shadow-sm">
      <div class="mb-4">
        <h2 class="text-base font-bold text-gray-900 md:text-lg">Быстрые действия</h2>
        <p class="mt-1 text-xs text-gray-600 md:text-sm">Часто используемые функции</p>
      </div>
      <div class="grid grid-cols-2 gap-3 md:grid-cols-4">
        <button class="flex h-16 flex-col items-center justify-center rounded-lg bg-teal-600 text-xs text-white md:h-20 md:text-sm" @click="openCreateEquipmentModal"><i class="ri-add-line mb-1 text-lg md:text-xl"></i>Добавить оборудование</button>
        <button class="flex h-16 flex-col items-center justify-center rounded-lg bg-gray-900 text-xs text-white md:h-20 md:text-sm" @click="openQrScannerModal"><i class="ri-qr-scan-line mb-1 text-lg md:text-xl"></i>Сканировать QR</button>
        <button class="flex h-16 flex-col items-center justify-center rounded-lg bg-green-600 text-xs text-white md:h-20 md:text-sm" @click="openCreateTicketModal"><i class="ri-customer-service-line mb-1 text-lg md:text-xl"></i>Создать заявку</button>
        <button class="flex h-16 flex-col items-center justify-center rounded-lg border border-gray-300 bg-white text-xs text-gray-700 md:h-20 md:text-sm" @click="openExportModal"><i class="ri-file-download-line mb-1 text-lg md:text-xl"></i>Экспорт данных</button>
      </div>
    </section>
  </div>
</template>
