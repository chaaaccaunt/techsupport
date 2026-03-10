<script setup lang="ts">
import { computed, ref } from "vue";
import { useModal } from "@/share/components/shared/useModal";
import { getTicketViewItems } from "@/share/mocks/schemaMocks";

const showFilters = ref(false);
const filters = ref({ status: "", priority: "", department: "", dateFrom: "", dateTo: "" });
const noop = () => {};
const { openModal } = useModal();
const openCreateTicketModal = () => openModal({ key: "tickets.create", size: "xl" });
const openEditTicketModal = (ticketId: number) => openModal({ key: "tickets.edit", size: "xl", payload: { ticketId } });
const openDeleteTicketModal = (ticketId: number) => openModal({ key: "tickets.delete", size: "sm", payload: { ticketId } });

const tickets = computed(() => getTicketViewItems());
</script>

<template>
  <div class="p-4 md:p-6">
    <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-xl font-bold text-gray-900 md:text-2xl">Заявки</h1>
        <p class="mt-1 text-sm text-gray-600">Управление заявками на обслуживание</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="rounded-lg border border-gray-300 px-4 py-2 text-sm" @click="noop"><i class="ri-filter-line mr-2"></i>Фильтры</button>
        <button class="rounded-lg bg-teal-600 px-4 py-2 text-sm text-white" @click="openCreateTicketModal"><i class="ri-add-line mr-2"></i>Создать заявку</button>
      </div>
    </div>

    <section v-if="showFilters" class="mb-6 rounded-xl bg-white p-4 shadow-sm">
      <div class="mb-4 flex items-center justify-between">
        <h3 class="font-semibold text-gray-900">Фильтры</h3>
        <button class="text-sm text-teal-600" @click="filters = { status: '', priority: '', department: '', dateFrom: '', dateTo: '' }">Сбросить все</button>
      </div>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <select v-model="filters.status" class="rounded-lg border border-gray-300 px-3 py-2 text-sm"><option value="">Все статусы</option><option value="open">Открыта</option><option value="in_progress">В работе</option><option value="resolved">Решена</option><option value="closed">Закрыта</option></select>
        <select v-model="filters.priority" class="rounded-lg border border-gray-300 px-3 py-2 text-sm"><option value="">Все приоритеты</option><option value="critical">Критический</option><option value="high">Высокий</option><option value="medium">Средний</option><option value="low">Низкий</option></select>
        <input v-model="filters.department" type="text" placeholder="Отдел" class="rounded-lg border border-gray-300 px-3 py-2 text-sm" />
        <input v-model="filters.dateFrom" type="date" class="rounded-lg border border-gray-300 px-3 py-2 text-sm" />
        <input v-model="filters.dateTo" type="date" class="rounded-lg border border-gray-300 px-3 py-2 text-sm" />
      </div>
    </section>

    <div class="space-y-4">
      <article v-for="ticket in tickets" :key="ticket.id" class="rounded-xl bg-white p-4 shadow-sm md:p-6">
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0 flex-1">
            <div class="mb-2 flex flex-wrap items-center gap-2">
              <h3 class="text-base font-semibold text-gray-900 md:text-lg">{{ ticket.title }}</h3>
              <span :class="`rounded-full px-2 py-1 text-xs font-medium ${ticket.status === 'open' ? 'bg-blue-100 text-blue-800' : ticket.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`">{{ ticket.statusText }}</span>
              <span :class="`rounded-full px-2 py-1 text-xs font-medium ${ticket.priority === 'high' ? 'bg-orange-100 text-orange-800' : ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`">{{ ticket.priorityText }}</span>
            </div>
            <p class="mb-3 text-sm text-gray-600">{{ ticket.description }}</p>
            <div class="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
              <div class="flex items-center"><i class="ri-building-line mr-1"></i>{{ ticket.department }}</div>
              <div class="flex items-center"><i class="ri-computer-line mr-1"></i>{{ ticket.equipment }}</div>
              <div class="flex items-center"><i class="ri-calendar-line mr-1"></i>{{ ticket.date }}</div>
              <div class="flex items-center"><i class="ri-user-line mr-1"></i>{{ ticket.assignee }}</div>
            </div>
          </div>
          <div class="flex items-center gap-1">
            <button class="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600" @click="openEditTicketModal(ticket.id)"><i class="ri-edit-line"></i></button>
            <button class="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600" @click="openDeleteTicketModal(ticket.id)"><i class="ri-delete-bin-line"></i></button>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>
