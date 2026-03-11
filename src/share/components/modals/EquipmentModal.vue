<script setup lang="ts">
import { computed, reactive } from "vue";
import AppModal from "./AppModal.vue";
import { useModal } from "./useModal";
import { iModalDescriptor } from "@/entities/store/modules/modal";
import { useAppData } from "@/share/libs/useAppData";

const props = defineProps<{ modal: iModalDescriptor }>();
const { closeModal } = useModal();
const { routeData } = useAppData();

const payload = computed(() => (props.modal.payload as { equipmentId?: string } | undefined) ?? {});
const equipmentList = computed(() => routeData.value.equipment?.items ?? []);
const item = computed(() => equipmentList.value.find((entry) => String(entry.id) === payload.value.equipmentId) ?? equipmentList.value[0]);
const form = reactive({
  name: item.value?.name ?? "",
  category: item.value?.category ?? "",
  serial: item.value?.serial ?? "",
  status: item.value?.status ?? "",
  location: item.value?.location ?? "",
});

function closeCurrent() {
  closeModal(props.modal.id);
}

function statusClass(status: string) {
  if (status === "working") return "bg-green-100 text-green-800";
  if (status === "broken") return "bg-red-100 text-red-800";
  return "bg-yellow-100 text-yellow-800";
}
</script>

<template>
  <AppModal v-if="modal.key === 'equipment.view'" :model-value="true" size="lg" custom-chrome @close="closeCurrent" @update:modelValue="closeCurrent">
    <div class="w-full rounded-lg bg-white p-6">
      <div class="mb-6 flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900">Карточка оборудования</h3>
        <button class="cursor-pointer text-gray-400 hover:text-gray-600" @click="closeCurrent"><i class="ri-close-line text-xl"></i></button>
      </div>
      <div class="space-y-4">
        <div class="flex items-center justify-between"><div><h2 class="text-xl font-bold text-gray-900">{{ item.name }}</h2><p class="text-sm text-gray-500">{{ item.code }} • {{ item.serial }}</p></div><span :class="`rounded-full px-3 py-1 text-xs font-medium ${statusClass(item.status)}`">{{ item.statusText }}</span></div>
        <div class="grid grid-cols-2 gap-4">
          <div class="rounded-lg bg-gray-50 p-3"><p class="mb-1 text-xs text-gray-500">Категория</p><p class="text-sm font-medium text-gray-900">{{ item.category }}</p></div>
          <div class="rounded-lg bg-gray-50 p-3"><p class="mb-1 text-xs text-gray-500">Расположение</p><p class="text-sm font-medium text-gray-900">{{ item.location }}</p></div>
          <div class="rounded-lg bg-gray-50 p-3"><p class="mb-1 text-xs text-gray-500">Ответственный</p><p class="text-sm font-medium text-gray-900">{{ item.responsible }}</p></div>
          <div class="rounded-lg bg-gray-50 p-3"><p class="mb-1 text-xs text-gray-500">Инвентарный номер</p><p class="text-sm font-medium text-gray-900">{{ item.code }}</p></div>
          <div class="rounded-lg bg-gray-50 p-3"><p class="mb-1 text-xs text-gray-500">Следующее ТО</p><p class="text-sm font-medium text-gray-900">{{ item.nextMaintenance }}</p></div>
          <div class="rounded-lg bg-gray-50 p-3"><p class="mb-1 text-xs text-gray-500">Серийный номер</p><p class="text-sm font-medium text-gray-900">{{ item.serial }}</p></div>
        </div>
      </div>
      <div class="mt-6 flex justify-end"><button class="rounded-lg bg-teal-600 px-4 py-2 text-sm text-white hover:bg-teal-700" @click="closeCurrent">Закрыть</button></div>
    </div>
  </AppModal>

  <AppModal v-else-if="modal.key === 'equipment.edit'" :model-value="true" size="lg" custom-chrome @close="closeCurrent" @update:modelValue="closeCurrent">
    <div class="w-full rounded-lg bg-white p-6">
      <div class="mb-6 flex items-center justify-between">
        <h2 class="text-xl font-bold text-gray-900">Редактировать оборудование</h2>
        <button class="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600" @click="closeCurrent"><i class="ri-close-line text-xl"></i></button>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div><label class="mb-2 block text-sm font-medium text-gray-700">Название</label><input v-model="form.name" type="text" class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /></div>
        <div><label class="mb-2 block text-sm font-medium text-gray-700">Категория</label><input v-model="form.category" type="text" class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /></div>
        <div><label class="mb-2 block text-sm font-medium text-gray-700">Серийный номер</label><input v-model="form.serial" type="text" class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /></div>
        <div><label class="mb-2 block text-sm font-medium text-gray-700">Статус</label><input v-model="form.status" type="text" class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /></div>
        <div class="col-span-2"><label class="mb-2 block text-sm font-medium text-gray-700">Локация</label><input v-model="form.location" type="text" class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /></div>
      </div>
      <div class="flex items-center justify-end space-x-3 border-t bg-gray-50 p-6 mt-6"><button class="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" @click="closeCurrent">Отмена</button><button class="rounded-lg bg-teal-600 px-4 py-2 text-sm text-white hover:bg-teal-700">Сохранить</button></div>
    </div>
  </AppModal>

  <AppModal v-else :model-value="true" size="sm" custom-chrome @close="closeCurrent" @update:modelValue="closeCurrent">
    <div class="w-full max-w-md rounded-lg bg-white p-6">
      <div class="mb-4 flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900">Удалить оборудование</h3>
        <button class="cursor-pointer text-gray-400 hover:text-gray-600" @click="closeCurrent"><i class="ri-close-line text-xl"></i></button>
      </div>
      <p class="mb-6 text-sm text-gray-700">Вы уверены, что хотите удалить оборудование <strong>«{{ item.name }}»</strong>?</p>
      <div class="flex justify-end space-x-3"><button class="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" @click="closeCurrent">Отмена</button><button class="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600">Удалить</button></div>
    </div>
  </AppModal>
</template>
