<script setup lang="ts">
import { computed } from "vue";
import AppModal from "./AppModal.vue";
import { useModal } from "./useModal";
import { chatMembers, chatRooms } from "./modalMocks";
import { iModalDescriptor } from "@/entities/store/modules/modal";

const props = defineProps<{ modal: iModalDescriptor }>();
const { closeModal } = useModal();

const chat = computed(() => chatRooms[0] ?? { name: "Чат", lastMessage: "", membersCount: 0 });
const members = chatMembers;

const isInfo = computed(() => props.modal.key === "chat.info");
const isMembers = computed(() => props.modal.key === "chat.members");
const isClearHistory = computed(() => props.modal.key === "chat.clear-history");

function closeCurrent() {
  closeModal(props.modal.id);
}
</script>

<template>
  <AppModal v-if="isInfo" :model-value="true" size="sm" custom-chrome @close="closeCurrent" @update:modelValue="closeCurrent">
    <div class="w-full max-w-md rounded-lg bg-white">
      <div class="flex items-center justify-between border-b border-gray-200 px-4 py-4">
        <h4 class="text-sm font-semibold text-gray-900">Информация о чате</h4>
        <button class="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100" @click="closeCurrent"><i class="ri-close-line text-base"></i></button>
      </div>
      <div class="border-b border-gray-100 p-4 text-center">
        <div class="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"><i class="ri-global-line text-2xl"></i></div>
        <h3 class="text-sm font-semibold text-gray-900">{{ chat.name }}</h3>
        <span class="mt-1 text-xs text-gray-500">Участников: {{ chat.membersCount }}</span>
      </div>
      <div class="space-y-3 p-4">
        <div><p class="mb-1 text-xs font-medium uppercase tracking-wider text-gray-400">Последнее сообщение</p><p class="text-sm text-gray-700">{{ chat.lastMessage || "Нет сообщений" }}</p></div>
      </div>
      <div class="px-4 pb-4"><button class="w-full rounded-lg border border-gray-200 py-2 text-sm text-gray-600 hover:bg-gray-50" @click="closeCurrent">Закрыть</button></div>
    </div>
  </AppModal>

  <AppModal v-else-if="isMembers" :model-value="true" size="sm" custom-chrome @close="closeCurrent" @update:modelValue="closeCurrent">
    <div class="w-full max-w-md rounded-lg bg-white">
      <div class="flex items-center justify-between border-b border-gray-200 px-4 py-4">
        <h4 class="text-sm font-semibold text-gray-900">Участники · {{ members.length }}</h4>
        <button class="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100" @click="closeCurrent"><i class="ri-close-line text-base"></i></button>
      </div>
      <div class="space-y-1 p-3">
        <div v-for="member in members" :key="member.id" class="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-gray-50">
          <div class="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-700">{{ member.avatar }}</div>
          <div class="min-w-0 flex-1"><p class="truncate text-sm font-medium text-gray-900">{{ member.name }}</p><p class="truncate text-xs text-gray-500">{{ member.dept }}</p></div>
        </div>
      </div>
    </div>
  </AppModal>

  <AppModal v-else :model-value="true" size="sm" custom-chrome @close="closeCurrent" @update:modelValue="closeCurrent">
    <div class="w-full max-w-md rounded-lg bg-white p-6">
      <div class="mb-4 flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900">{{ isClearHistory ? "Очистить историю" : "Удалить чат" }}</h3>
        <button class="cursor-pointer text-gray-400 hover:text-gray-600" @click="closeCurrent"><i class="ri-close-line text-xl"></i></button>
      </div>
      <p class="mb-6 text-sm text-gray-700">{{ isClearHistory ? "Очистить историю сообщений в этом чате?" : "Удалить этот чат из списка?" }}</p>
      <div class="flex justify-end space-x-3"><button class="whitespace-nowrap rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" @click="closeCurrent">Отмена</button><button :class="`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium text-white ${isClearHistory ? 'bg-amber-500 hover:bg-amber-600' : 'bg-red-500 hover:bg-red-600'}`">{{ isClearHistory ? "Очистить" : "Удалить" }}</button></div>
    </div>
  </AppModal>
</template>
