<script setup lang="ts">
import { computed } from "vue";
import { useModal } from "@/share/components/modals/useModal";
import { useAppData } from "@/share/libs/useAppData";

const { staticCatalogs } = useAppData();
const equipment = computed(() => staticCatalogs.value?.equipmentOptions ?? []);
const priorities = computed(() => staticCatalogs.value?.ticketPriorities ?? []);
const departments = computed(() => staticCatalogs.value?.departments ?? []);
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
          <h2 class="text-xl font-bold text-gray-900">Создать заявку</h2>
          <p class="mt-1 text-sm text-gray-600">Опишите проблему с оборудованием</p>
        </div>
        <button class="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600" @click="closeCurrent"><i class="ri-close-line text-xl"></i></button>
      </div>

      <form class="flex-1 overflow-y-auto p-6" @submit.prevent="noop">
        <div class="space-y-6">
          <div><label class="mb-2 block text-sm font-medium text-gray-700">Заголовок заявки <span class="text-red-500">*</span></label><input type="text" class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /></div>
          <div><label class="mb-2 block text-sm font-medium text-gray-700">Описание проблемы <span class="text-red-500">*</span></label><textarea rows="4" class="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm"></textarea></div>
          <div><label class="mb-2 block text-sm font-medium text-gray-700">Оборудование</label><select class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"><option value="">Выберите оборудование</option><option v-for="item in equipment" :key="item.id" :value="item.id">{{ item.name }} ({{ item.inventoryNumber }})</option></select></div>
          <div><label class="mb-2 block text-sm font-medium text-gray-700">Приоритет</label><select class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"><option v-for="priority in priorities" :key="priority.id" :value="priority.id">{{ priority.label }}</option></select></div>
          <div><label class="mb-2 block text-sm font-medium text-gray-700">Отдел</label><select class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"><option value="">Выберите отдел</option><option v-for="department in departments" :key="department.id" :value="department.id">{{ department.fullName }}</option></select></div>
        </div>
      </form>

      <div class="flex items-center justify-end space-x-3 border-t bg-gray-50 p-6">
        <button class="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" @click="closeCurrent">Отмена</button>
        <button class="rounded-lg bg-teal-600 px-4 py-2 text-sm text-white hover:bg-teal-700" @click="noop"><i class="ri-send-plane-line mr-2"></i>Создать заявку</button>
      </div>
    </div>
  </div>
</template>
