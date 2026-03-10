<script setup lang="ts">
import AppModal from "./AppModal.vue";
import { useModal } from "./useModal";
import { iModalDescriptor } from "@/entities/store/modules/modal";

const props = defineProps<{ modal: iModalDescriptor }>();
const { closeModal } = useModal();

function handleClose() {
  closeModal(props.modal.id);
}
</script>

<template>
  <AppModal :model-value="true" size="md" custom-chrome @close="handleClose" @update:modelValue="handleClose">
    <div class="bg-white rounded-lg shadow-xl">
      <div class="flex items-center justify-between p-6 border-b">
        <div>
          <h2 class="text-xl font-bold text-gray-900">Экспорт данных</h2>
          <p class="text-sm text-gray-600 mt-1">Выберите формат для экспорта</p>
        </div>
        <button class="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" @click="handleClose">
          <i class="ri-close-line text-xl"></i>
        </button>
      </div>

      <div class="p-6 space-y-3">
        <button class="w-full flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <div class="flex items-center">
            <div class="w-10 h-10 flex items-center justify-center bg-green-100 rounded-lg mr-3">
              <i class="ri-file-excel-2-line text-xl text-green-600"></i>
            </div>
            <div class="text-left">
              <div class="font-semibold text-gray-900">CSV файл</div>
              <div class="text-sm text-gray-600">Для Excel и Google Sheets</div>
            </div>
          </div>
          <i class="ri-arrow-right-line text-gray-400"></i>
        </button>

        <button class="w-full flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <div class="flex items-center">
            <div class="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-lg mr-3">
              <i class="ri-file-excel-line text-xl text-blue-600"></i>
            </div>
            <div class="text-left">
              <div class="font-semibold text-gray-900">Excel файл</div>
              <div class="text-sm text-gray-600">Формат .xls</div>
            </div>
          </div>
          <i class="ri-arrow-right-line text-gray-400"></i>
        </button>

        <button class="w-full flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <div class="flex items-center">
            <div class="w-10 h-10 flex items-center justify-center bg-red-100 rounded-lg mr-3">
              <i class="ri-file-pdf-line text-xl text-red-600"></i>
            </div>
            <div class="text-left">
              <div class="font-semibold text-gray-900">PDF отчет</div>
              <div class="text-sm text-gray-600">Для печати</div>
            </div>
          </div>
          <i class="ri-arrow-right-line text-gray-400"></i>
        </button>
      </div>

      <div class="flex items-center justify-end space-x-3 p-6 border-t bg-gray-50">
        <button class="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" @click="handleClose">
          Отмена
        </button>
      </div>
    </div>
  </AppModal>
</template>
