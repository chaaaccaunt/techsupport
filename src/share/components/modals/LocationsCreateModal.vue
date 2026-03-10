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
        <h3 class="text-lg font-semibold text-gray-900">Добавить локацию</h3>
        <button class="text-gray-400 hover:text-gray-600" @click="closeModal(modal.id)"><i class="ri-close-line text-xl"></i></button>
      </div>
      <form class="space-y-4" @submit.prevent>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label class="block text-sm font-medium text-gray-700 mb-1">Название локации</label><input type="text" placeholder="Например: Офис 301" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" /></div>
          <div><label class="block text-sm font-medium text-gray-700 mb-1">Здание</label><select class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"><option value="">Выберите здание</option><option value="main">Главное здание</option><option value="warehouse">Склад</option><option value="office2">Офис 2</option></select></div>
          <div><label class="block text-sm font-medium text-gray-700 mb-1">Этаж</label><input type="number" placeholder="1" min="1" max="20" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" /></div>
          <div><label class="block text-sm font-medium text-gray-700 mb-1">Площадь (м²)</label><input type="number" placeholder="25" min="1" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" /></div>
          <div><label class="block text-sm font-medium text-gray-700 mb-1">Вместимость (чел.)</label><input type="number" placeholder="4" min="1" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" /></div>
          <div><label class="block text-sm font-medium text-gray-700 mb-1">Статус</label><select class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"><option value="">Выберите статус</option><option value="active">Активная</option><option value="restricted">Ограниченный доступ</option><option value="maintenance">На обслуживании</option></select></div>
          <div><label class="block text-sm font-medium text-gray-700 mb-1">Ответственный</label><input type="text" placeholder="ФИО ответственного" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" /></div>
          <div><label class="block text-sm font-medium text-gray-700 mb-1">Отдел</label><input type="text" placeholder="Название отдела" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" /></div>
        </div>
        <div><label class="block text-sm font-medium text-gray-700 mb-1">Описание</label><textarea rows="3" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="Дополнительная информация о локации" maxlength="500"></textarea></div>
        <div class="flex justify-end space-x-3 pt-4">
          <button type="button" class="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" @click="closeModal(modal.id)">Отмена</button>
          <button type="submit" class="rounded-lg bg-teal-600 px-4 py-2 text-sm text-white hover:bg-teal-700">Добавить локацию</button>
        </div>
      </form>
    </div>
  </AppModal>
</template>
