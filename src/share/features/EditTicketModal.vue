<script setup lang="ts">
import { computed } from "vue";
import { useModal } from "@/share/components/modals/useModal";
import { ticketPriorities, ticketStatuses } from "@/share/mocks/schemaMocks";

const statuses = computed(() => ticketStatuses);
const priorities = computed(() => ticketPriorities);
const noop = () => {};
const { closeModal } = useModal();

function closeCurrent() {
  closeModal();
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
    <div class="flex max-h-[90vh] w-full max-w-2xl flex-col rounded-lg bg-white shadow-xl">
      <div class="flex items-center justify-between border-b p-6">
        <div>
          <h2 class="text-xl font-bold text-gray-900">Редактировать заявку</h2>
          <p class="mt-1 text-sm text-gray-600">Изменение полей заявки по схеме ticket-statuses / ticket-priorities</p>
        </div>
        <button class="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600" @click="closeCurrent"><i class="ri-close-line text-xl"></i></button>
      </div>

      <form class="flex-1 overflow-y-auto p-6" @submit.prevent="noop">
        <div class="space-y-6">
          <div><label class="mb-2 block text-sm font-medium text-gray-700">Заголовок заявки</label><input type="text" class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /></div>
          <div><label class="mb-2 block text-sm font-medium text-gray-700">Описание проблемы</label><textarea rows="4" class="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm"></textarea></div>
          <div><label class="mb-2 block text-sm font-medium text-gray-700">Статус</label><select class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"><option v-for="status in statuses" :key="status.id" :value="status.id">{{ status.label }}</option></select></div>
          <div><label class="mb-2 block text-sm font-medium text-gray-700">Приоритет</label><select class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"><option v-for="priority in priorities" :key="priority.id" :value="priority.id">{{ priority.label }}</option></select></div>
        </div>
      </form>

      <div class="flex items-center justify-end space-x-3 border-t bg-gray-50 p-6">
        <button class="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" @click="closeCurrent">Отмена</button>
        <button class="rounded-lg bg-teal-600 px-4 py-2 text-sm text-white hover:bg-teal-700" @click="noop"><i class="ri-save-line mr-2"></i>Сохранить изменения</button>
      </div>
    </div>
  </div>
</template>
