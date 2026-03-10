<script setup lang="ts">
import { computed } from "vue";
import { useModal } from "@/share/components/modals/useModal";
import { getMaintenanceViewItems, getTicketViewItems } from "@/share/mocks/schemaMocks";

const { closeModal } = useModal();
const maintenance = computed(() => getMaintenanceViewItems()[0]);
const relatedTicket = computed(() => getTicketViewItems().find((item) => item.equipment === maintenance.value?.equipmentId?.toString()) ?? getTicketViewItems()[0]);

function closeCurrent() {
  closeModal();
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
    <div class="flex max-h-[90vh] w-full max-w-3xl flex-col rounded-lg bg-white shadow-xl">
      <div class="flex items-center justify-between border-b p-6">
        <div class="flex items-center">
          <div class="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
            <i class="ri-tools-line text-2xl text-blue-600"></i>
          </div>
          <div>
            <h2 class="text-xl font-bold text-gray-900">Детали обслуживания</h2>
            <p class="mt-1 text-sm text-gray-600">{{ maintenance?.equipment }}</p>
          </div>
        </div>
        <button class="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600" @click="closeCurrent"><i class="ri-close-line text-xl"></i></button>
      </div>

      <div class="flex-1 overflow-y-auto p-6">
        <div class="space-y-6">
          <div class="rounded-lg bg-gray-50 p-4">
            <div class="grid grid-cols-2 gap-4">
              <div><div class="mb-1 text-xs text-gray-500">Статус</div><div class="text-sm font-medium text-gray-900">{{ maintenance?.statusText }}</div></div>
              <div><div class="mb-1 text-xs text-gray-500">Дата</div><div class="text-sm font-medium text-gray-900">{{ maintenance?.date }}</div></div>
              <div><div class="mb-1 text-xs text-gray-500">Последнее ТО</div><div class="text-sm font-medium text-gray-900">{{ maintenance?.last }}</div></div>
              <div><div class="mb-1 text-xs text-gray-500">Следующее ТО</div><div class="text-sm font-medium text-gray-900">{{ maintenance?.next }}</div></div>
            </div>
          </div>
          <div class="rounded-lg bg-gray-50 p-4">
            <div class="mb-1 text-xs text-gray-500">Ответственный</div>
            <div class="text-sm font-medium text-gray-900">{{ maintenance?.responsible }}</div>
          </div>
          <div class="rounded-lg bg-gray-50 p-4">
            <div class="mb-1 text-xs text-gray-500">Связанная заявка</div>
            <div class="text-sm font-medium text-gray-900">#{{ relatedTicket?.id }} - {{ relatedTicket?.title }}</div>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-end space-x-3 border-t bg-gray-50 p-6">
        <button class="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700" @click="closeCurrent">Закрыть</button>
      </div>
    </div>
  </div>
</template>
