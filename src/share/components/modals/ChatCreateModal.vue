<script setup lang="ts">
import { computed, ref } from "vue";
import AppModal from "./AppModal.vue";
import { useModal } from "./useModal";
import { chatMembers } from "./modalMocks";
import { iModalDescriptor } from "@/entities/store/modules/modal";

const props = defineProps<{ modal: iModalDescriptor }>();
const { closeModal } = useModal();

const name = ref("");
const description = ref("");
const search = ref("");
const selected = ref<string[]>([]);

const filtered = computed(() =>
  chatMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(search.value.toLowerCase()) ||
      member.dept.toLowerCase().includes(search.value.toLowerCase()),
  ),
);

function closeCurrent() {
  closeModal(props.modal.id);
}

function toggleMember(id: string) {
  selected.value = selected.value.includes(id) ? selected.value.filter((item) => item !== id) : [...selected.value, id];
}
</script>

<template>
  <AppModal :model-value="true" size="sm" custom-chrome @close="closeCurrent" @update:modelValue="closeCurrent">
    <div class="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
      <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <h3 class="text-base font-semibold text-gray-900">Создать новый чат</h3>
        <button class="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg" @click="closeCurrent"><i class="ri-close-line text-xl"></i></button>
      </div>
      <div class="p-6 space-y-4">
        <div><label class="block text-sm font-medium text-gray-700 mb-1">Название чата <span class="text-red-500">*</span></label><input v-model="name" type="text" placeholder="Например: Проект X" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
        <div><label class="block text-sm font-medium text-gray-700 mb-1">Описание</label><input v-model="description" type="text" placeholder="Краткое описание чата" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Добавить участников</label>
          <div class="relative mb-2"><i class="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i><input v-model="search" type="text" placeholder="Поиск сотрудников..." class="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
          <div class="max-h-44 overflow-y-auto border border-gray-200 rounded-lg divide-y divide-gray-100">
            <label v-for="member in filtered" :key="member.id" class="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer">
              <input type="checkbox" :checked="selected.includes(member.id)" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" @change="toggleMember(member.id)" />
              <div class="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600">{{ member.avatar }}</div>
              <div class="flex-1 min-w-0"><p class="text-sm font-medium text-gray-900">{{ member.name }}</p><p class="text-xs text-gray-500">{{ member.dept }}</p></div>
            </label>
          </div>
          <p v-if="selected.length > 0" class="text-xs text-blue-600 mt-1">Выбрано: {{ selected.length }} участников</p>
        </div>
      </div>
      <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
        <button class="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap" @click="closeCurrent">Отмена</button>
        <button :disabled="!name.trim()" class="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg whitespace-nowrap">Создать чат</button>
      </div>
    </div>
  </AppModal>
</template>
