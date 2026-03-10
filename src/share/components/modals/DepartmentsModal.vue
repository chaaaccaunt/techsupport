<script setup lang="ts">
import { computed, reactive } from "vue";
import AppModal from "./AppModal.vue";
import { useModal } from "./useModal";
import { modalDepartments, modalPositions } from "./modalMocks";
import { iModalDescriptor } from "@/entities/store/modules/modal";

const props = defineProps<{ modal: iModalDescriptor }>();
const { closeModal } = useModal();

const departmentPayload = computed(() => (props.modal.payload as { departmentId?: string } | undefined) ?? {});
const positionPayload = computed(() => (props.modal.payload as { positionId?: string } | undefined) ?? {});
const department = computed(() => modalDepartments.find((item) => item.id === departmentPayload.value.departmentId) ?? { id: "", shortName: "", name: "", employeeCount: 0 });
const position = computed(() => modalPositions.find((item) => item.id === positionPayload.value.positionId) ?? { id: "", shortName: "", name: "", employeeCount: 0 });

const departmentForm = reactive({ shortName: department.value.shortName, name: department.value.name });
const positionForm = reactive({ shortName: position.value.shortName, name: position.value.name });

function closeCurrent() {
  closeModal(props.modal.id);
}
</script>

<template>
  <AppModal v-if="modal.key === 'departments.create' || modal.key === 'departments.edit'" :model-value="true" size="sm" custom-chrome @close="closeCurrent" @update:modelValue="closeCurrent">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 class="text-xl font-semibold text-gray-900">{{ modal.key === "departments.edit" ? "Редактировать отдел" : "Добавить отдел" }}</h2>
        <button class="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors" @click="closeCurrent"><i class="ri-close-line text-xl"></i></button>
      </div>
      <div class="p-6 space-y-4">
        <div><label class="block text-sm font-medium text-gray-700 mb-1">Полное название</label><input v-model="departmentForm.name" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" /></div>
        <div><label class="block text-sm font-medium text-gray-700 mb-1">Краткое название</label><input v-model="departmentForm.shortName" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" /></div>
        <div class="rounded-lg bg-gray-50 p-3 text-sm text-gray-600">Сотрудников в отделе: {{ department.employeeCount }}</div>
      </div>
      <div class="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
        <button class="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" @click="closeCurrent">Отмена</button>
        <button class="rounded-lg bg-teal-600 px-4 py-2 text-sm text-white hover:bg-teal-700" :disabled="!departmentForm.name.trim()">Сохранить</button>
      </div>
    </div>
  </AppModal>

  <AppModal v-else :model-value="true" size="sm" custom-chrome @close="closeCurrent" @update:modelValue="closeCurrent">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 class="text-xl font-semibold text-gray-900">{{ modal.key === "positions.edit" ? "Редактировать должность" : "Добавить должность" }}</h2>
        <button class="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors" @click="closeCurrent"><i class="ri-close-line text-xl"></i></button>
      </div>
      <div class="p-6 space-y-4">
        <div><label class="block text-sm font-medium text-gray-700 mb-1">Полное название</label><input v-model="positionForm.name" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" /></div>
        <div><label class="block text-sm font-medium text-gray-700 mb-1">Краткое название</label><input v-model="positionForm.shortName" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" /></div>
        <div class="rounded-lg bg-gray-50 p-3 text-sm text-gray-600">Сотрудников на должности: {{ position.employeeCount }}</div>
      </div>
      <div class="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
        <button class="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" @click="closeCurrent">Отмена</button>
        <button class="rounded-lg bg-teal-600 px-4 py-2 text-sm text-white hover:bg-teal-700" :disabled="!positionForm.name.trim()">Сохранить</button>
      </div>
    </div>
  </AppModal>
</template>
