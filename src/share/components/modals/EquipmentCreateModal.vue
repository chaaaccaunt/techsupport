<script setup lang="ts">
import AppModal from "./AppModal.vue";
import { useModal } from "./useModal";
import { iModalDescriptor } from "@/entities/store/modules/modal";

defineProps<{ modal: iModalDescriptor }>();
const { closeModal } = useModal();
</script>

<template>
  <AppModal :model-value="true" size="lg" custom-chrome @close="closeModal(modal.id)" @update:modelValue="closeModal(modal.id)">
    <div class="bg-white rounded-lg p-6 w-full max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-semibold text-gray-900">Добавить оборудование</h3>
        <button class="text-gray-400 hover:text-gray-600" @click="closeModal(modal.id)"><i class="ri-close-line text-xl"></i></button>
      </div>
      <form class="space-y-4" @submit.prevent>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label class="block text-sm font-medium text-gray-700 mb-1">Название оборудования</label><input type="text" placeholder="Введите название" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" /></div>
          <div><label class="block text-sm font-medium text-gray-700 mb-1">Категория</label><select class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm pr-8"><option value="">Выберите категорию</option><option value="computers">Компьютеры</option><option value="printers">Принтеры</option><option value="scanners">Сканеры</option><option value="monitors">Мониторы</option><option value="network">Сетевое оборудование</option></select></div>
          <div><label class="block text-sm font-medium text-gray-700 mb-1">Серийный номер</label><input type="text" placeholder="Введите серийный номер" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" /></div>
          <div><label class="block text-sm font-medium text-gray-700 mb-1">Инвентарный номер</label><input type="text" placeholder="Введите инвентарный номер" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" /></div>
          <div><label class="block text-sm font-medium text-gray-700 mb-1">Расположение</label><input type="text" placeholder="Введите расположение" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" /></div>
          <div><label class="block text-sm font-medium text-gray-700 mb-1">Ответственный</label><input type="text" placeholder="Введите ФИО ответственного" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" /></div>
        </div>
        <div><label class="block text-sm font-medium text-gray-700 mb-1">Описание</label><textarea rows="3" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="Дополнительная информация об оборудовании" maxlength="500"></textarea></div>
        <div class="flex justify-end space-x-3 pt-4">
          <button type="button" class="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" @click="closeModal(modal.id)">Отмена</button>
          <button type="submit" class="rounded-lg bg-teal-600 px-4 py-2 text-sm text-white hover:bg-teal-700">Добавить оборудование</button>
        </div>
      </form>
    </div>
  </AppModal>
</template>
