<script setup lang="ts">
import { computed } from "vue";
import AppModal from "./AppModal.vue";
import { useModal } from "./useModal";
import { iModalDescriptor } from "@/entities/store/modules/modal";

const props = defineProps<{ modal: iModalDescriptor }>();
const { closeModal } = useModal();

const payload = computed(() => (props.modal.payload as Record<string, string | number | undefined> | undefined) ?? {});

const meta = computed(() => {
  switch (props.modal.key) {
    case "tickets.delete":
      return { title: "Удалить заявку", description: `Заявка ${payload.value.ticketId ?? ""}`, body: "Вы уверены, что хотите удалить эту заявку? Действие соответствует confirm из макета.", confirmText: "Удалить" };
    case "maintenance.delete":
      return { title: "Удалить запись ТО", description: `Запись ${payload.value.maintenanceId ?? ""}`, body: "Вы уверены, что хотите удалить запись технического обслуживания?", confirmText: "Удалить" };
    case "departments.delete":
      return { title: "Удалить отдел", description: `Отдел ${payload.value.departmentId ?? ""}`, body: "Вы уверены, что хотите удалить этот отдел?", confirmText: "Удалить" };
    case "positions.delete":
      return { title: "Удалить должность", description: `Должность ${payload.value.positionId ?? ""}`, body: "Вы уверены, что хотите удалить эту должность?", confirmText: "Удалить" };
    default:
      return { title: "Подтверждение действия", description: "", body: "Подтвердите действие.", confirmText: "Подтвердить" };
  }
});

function closeCurrent() {
  closeModal(props.modal.id);
}
</script>

<template>
  <AppModal :model-value="true" size="sm" custom-chrome @close="closeCurrent" @update:modelValue="closeCurrent">
    <div class="w-full max-w-md rounded-lg bg-white p-6">
      <div class="mb-4 flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900">{{ meta.title }}</h3>
        <button class="cursor-pointer text-gray-400 hover:text-gray-600" @click="closeCurrent"><i class="ri-close-line text-xl"></i></button>
      </div>
      <div class="mb-6 flex items-start space-x-3">
        <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-100"><i class="ri-error-warning-line text-lg text-red-500"></i></div>
        <div><p class="text-sm text-gray-700">{{ meta.body }}</p><p v-if="meta.description" class="mt-1 text-xs text-gray-500">{{ meta.description }}</p></div>
      </div>
      <div class="flex justify-end space-x-3">
        <button class="whitespace-nowrap rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" @click="closeCurrent">Отмена</button>
        <button class="whitespace-nowrap rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600">{{ meta.confirmText }}</button>
      </div>
    </div>
  </AppModal>
</template>
