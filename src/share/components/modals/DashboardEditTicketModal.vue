<script setup lang="ts">
import { computed, reactive } from "vue";
import AppModal from "./AppModal.vue";
import { useModal } from "./useModal";
import { dashboardTickets } from "./modalMocks";
import { iModalDescriptor } from "@/entities/store/modules/modal";

const props = defineProps<{ modal: iModalDescriptor }>();
const { closeModal } = useModal();

const editingTicket = computed(() => {
  const payload = props.modal.payload as { ticketId?: string } | undefined;
  return dashboardTickets.find((item) => item.id === payload?.ticketId) ?? dashboardTickets[0];
});

const form = reactive({
  equipment: editingTicket.value.equipment,
  description: editingTicket.value.description,
  priority: editingTicket.value.priority,
  status: editingTicket.value.status,
});

function handleClose() {
  closeModal(props.modal.id);
}
</script>

<template>
  <AppModal :model-value="true" size="lg" custom-chrome @close="handleClose" @update:modelValue="handleClose">
    <div class="bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
        <div>
          <h2 class="text-xl font-bold text-gray-900">Редактировать заявку</h2>
          <p class="text-sm text-gray-600 mt-1">Изменение данных заявки {{ editingTicket.id }}</p>
        </div>
        <button class="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" @click="handleClose">
          <i class="ri-close-line text-xl"></i>
        </button>
      </div>

      <form @submit.prevent>
        <div class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Оборудование</label>
            <input v-model="form.equipment" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Описание проблемы</label>
            <textarea v-model="form.description" rows="4" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Приоритет</label>
              <select v-model="form.priority" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="Низкий">Низкий</option>
                <option value="Средний">Средний</option>
                <option value="Высокий">Высокий</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Статус</label>
              <select v-model="form.status" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="Новая">Новая</option>
                <option value="В работе">В работе</option>
                <option value="Выполнена">Выполнена</option>
                <option value="Отменена">Отменена</option>
              </select>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-end space-x-3 p-6 border-t bg-gray-50">
          <button type="button" class="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" @click="handleClose">Отмена</button>
          <button type="submit" class="rounded-lg bg-teal-600 px-4 py-2 text-sm text-white hover:bg-teal-700"><i class="ri-save-line mr-2"></i>Сохранить изменения</button>
        </div>
      </form>
    </div>
  </AppModal>
</template>
