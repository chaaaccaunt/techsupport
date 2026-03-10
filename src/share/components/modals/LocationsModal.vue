<script setup lang="ts">
import { computed, reactive } from "vue";
import AppModal from "./AppModal.vue";
import { useModal } from "./useModal";
import { equipments, getLocationViewItems } from "@/share/mocks/schemaMocks";
import { iModalDescriptor } from "@/entities/store/modules/modal";

const props = defineProps<{ modal: iModalDescriptor }>();
const { closeModal } = useModal();

const payload = computed(() => (props.modal.payload as { locationId?: number } | undefined) ?? {});
const locations = getLocationViewItems();
const location = computed(() => locations.find((item) => item.id === payload.value.locationId) ?? locations[0]);
const locationEquipment = computed(() => equipments.filter((item) => item.locationId === location.value.id));
const editForm = reactive({ name: location.value.name });

function closeCurrent() {
  closeModal(props.modal.id);
}
</script>

<template>
  <AppModal v-if="modal.key === 'locations.view'" :model-value="true" size="md" custom-chrome @close="closeCurrent" @update:modelValue="closeCurrent">
    <div class="w-full max-w-lg rounded-lg bg-white p-6">
      <div class="mb-6 flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900">Информация о локации</h3>
        <button class="cursor-pointer text-gray-400 hover:text-gray-600" @click="closeCurrent"><i class="ri-close-line text-xl"></i></button>
      </div>
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-gray-900">{{ location.name }}</h2>
          <span class="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">Активна</span>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="rounded-lg bg-gray-50 p-3"><p class="mb-1 text-xs text-gray-500">ID</p><p class="text-sm font-medium text-gray-900">{{ location.id }}</p></div>
          <div class="rounded-lg bg-gray-50 p-3"><p class="mb-1 text-xs text-gray-500">Оборудование</p><p class="text-sm font-medium text-gray-900">{{ location.equipmentCount }} ед.</p></div>
        </div>
        <div class="rounded-lg bg-gray-50 p-3 text-sm text-gray-700">По `DB_SCHEMA.md` у сущности `locations` нет полей здания, этажа, площади или ответственного. Старые mock-поля удалены.</div>
      </div>
      <div class="mt-6 flex justify-end"><button class="whitespace-nowrap rounded-lg bg-teal-600 px-4 py-2 text-sm text-white hover:bg-teal-700" @click="closeCurrent">Закрыть</button></div>
    </div>
  </AppModal>

  <AppModal v-else-if="modal.key === 'locations.edit'" :model-value="true" size="lg" custom-chrome @close="closeCurrent" @update:modelValue="closeCurrent">
    <div class="w-full rounded-lg bg-white p-6">
      <div class="mb-6 flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900">Редактировать локацию</h3>
        <button class="cursor-pointer text-gray-400 hover:text-gray-600" @click="closeCurrent"><i class="ri-close-line text-xl"></i></button>
      </div>
      <div><label class="mb-1 block text-sm font-medium text-gray-700">Название локации</label><input v-model="editForm.name" type="text" class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /></div>
      <div class="flex justify-end space-x-3 pt-4 mt-6"><button class="whitespace-nowrap rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" @click="closeCurrent">Отмена</button><button class="whitespace-nowrap rounded-lg bg-teal-600 px-4 py-2 text-sm text-white hover:bg-teal-700">Сохранить изменения</button></div>
    </div>
  </AppModal>

  <AppModal v-else-if="modal.key === 'locations.delete'" :model-value="true" size="sm" custom-chrome @close="closeCurrent" @update:modelValue="closeCurrent">
    <div class="w-full max-w-md rounded-lg bg-white p-6">
      <div class="mb-4 flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900">Удалить локацию</h3>
        <button class="cursor-pointer text-gray-400 hover:text-gray-600" @click="closeCurrent"><i class="ri-close-line text-xl"></i></button>
      </div>
      <p class="mb-6 text-sm text-gray-700">Вы уверены, что хотите удалить локацию <strong>«{{ location.name }}»</strong>?</p>
      <div class="flex justify-end space-x-3"><button class="whitespace-nowrap rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" @click="closeCurrent">Отмена</button><button class="whitespace-nowrap rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600">Удалить</button></div>
    </div>
  </AppModal>

  <AppModal v-else :model-value="true" size="lg" custom-chrome @close="closeCurrent" @update:modelValue="closeCurrent">
    <div class="w-full rounded-lg bg-white p-6">
      <div class="mb-6 flex items-center justify-between">
        <div><h3 class="text-lg font-semibold text-gray-900">Оборудование</h3><p class="text-sm text-gray-500">{{ location.name }}</p></div>
        <button class="cursor-pointer text-gray-400 hover:text-gray-600" @click="closeCurrent"><i class="ri-close-line text-xl"></i></button>
      </div>
      <div class="space-y-2">
        <div v-for="eq in locationEquipment" :key="eq.id" class="flex items-center justify-between rounded-lg bg-gray-50 p-3">
          <div><p class="text-sm font-medium text-gray-900">{{ eq.name }}</p><p class="text-xs text-gray-500">{{ eq.inventoryNumber }}</p></div>
          <span class="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">statusId: {{ eq.statusId }}</span>
        </div>
      </div>
      <div class="mt-6 flex justify-end"><button class="whitespace-nowrap rounded-lg bg-teal-600 px-4 py-2 text-sm text-white hover:bg-teal-700" @click="closeCurrent">Закрыть</button></div>
    </div>
  </AppModal>
</template>
