<script setup lang="ts">
import { computed, ref } from "vue";
import { useModal } from "@/share/components/shared/useModal";
import { getDepartmentViewItems, getPositionViewItems } from "@/share/mocks/schemaMocks";

const activeTab = ref<"departments" | "positions">("departments");
const noop = () => {};
const { openModal } = useModal();
const openCreateDepartmentModal = () => openModal({ key: "departments.create", size: "lg" });
const openCreatePositionModal = () => openModal({ key: "positions.create", size: "lg" });
const openEditDepartmentModal = (departmentId: number) => openModal({ key: "departments.edit", size: "lg", payload: { departmentId: String(departmentId) } });
const openDeleteDepartmentModal = (departmentId: number) => openModal({ key: "departments.delete", size: "sm", payload: { departmentId: String(departmentId) } });
const openEditPositionModal = (positionId: number) => openModal({ key: "positions.edit", size: "lg", payload: { positionId: String(positionId) } });
const openDeletePositionModal = (positionId: number) => openModal({ key: "positions.delete", size: "sm", payload: { positionId: String(positionId) } });

const departments = computed(() => getDepartmentViewItems());
const positions = computed(() => getPositionViewItems());
</script>

<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="mb-2 text-2xl font-semibold text-gray-900">Отделы и должности</h1>
      <p class="text-sm text-gray-600">Управление организационной структурой компании</p>
    </div>

    <div class="mb-6 flex items-center justify-between">
      <div class="flex items-center gap-2 rounded-lg bg-gray-100 p-1">
        <button :class="`rounded-md px-4 py-2 text-sm font-medium ${activeTab === 'departments' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'}`" @click="noop"><i class="ri-building-line mr-2"></i>Отделы ({{ departments.length }})</button>
        <button :class="`rounded-md px-4 py-2 text-sm font-medium ${activeTab === 'positions' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'}`" @click="noop"><i class="ri-user-star-line mr-2"></i>Должности ({{ positions.length }})</button>
      </div>
      <button class="rounded-lg bg-teal-600 px-4 py-2 text-sm text-white" @click="activeTab === 'departments' ? openCreateDepartmentModal() : openCreatePositionModal()"><i class="ri-add-line mr-2"></i>{{ activeTab === 'departments' ? 'Добавить отдел' : 'Добавить должность' }}</button>
    </div>

    <div class="mb-6"><input :placeholder="activeTab === 'departments' ? 'Поиск отделов...' : 'Поиск должностей...'" class="max-w-md rounded-lg border border-gray-300 px-3 py-2 text-sm" /></div>

    <div v-if="activeTab === 'departments'" class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <article v-for="department in departments" :key="department.id" class="rounded-xl bg-white p-6 shadow-sm">
        <div class="mb-3 flex items-start justify-between"><div class="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100"><i class="ri-building-line text-xl text-teal-600"></i></div><div class="flex gap-2"><button class="text-gray-400 hover:text-teal-600" @click="openEditDepartmentModal(department.id)"><i class="ri-edit-line"></i></button><button class="text-gray-400 hover:text-red-600" @click="openDeleteDepartmentModal(department.id)"><i class="ri-delete-bin-line"></i></button></div></div>
        <h3 class="mb-1 text-lg font-semibold text-gray-900">{{ department.name }}</h3>
        <p class="mb-4 text-sm text-gray-600">{{ department.shortName }}</p>
        <div class="space-y-2 border-t border-gray-100 pt-4 text-sm"><div class="flex items-center"><i class="ri-team-line mr-2 text-gray-400"></i><span class="text-gray-600">Сотрудников:</span><span class="ml-2 font-medium text-gray-900">{{ department.employeeCount }}</span></div></div>
      </article>
    </div>

    <div v-else class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <article v-for="position in positions" :key="position.id" class="rounded-xl bg-white p-6 shadow-sm">
        <div class="mb-3 flex items-start justify-between"><div class="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100"><i class="ri-user-star-line text-xl text-blue-600"></i></div><div class="flex gap-2"><button class="text-gray-400 hover:text-blue-600" @click="openEditPositionModal(position.id)"><i class="ri-edit-line"></i></button><button class="text-gray-400 hover:text-red-600" @click="openDeletePositionModal(position.id)"><i class="ri-delete-bin-line"></i></button></div></div>
        <h3 class="mb-1 text-lg font-semibold text-gray-900">{{ position.name }}</h3>
        <div class="space-y-2 border-t border-gray-100 pt-4 text-sm"><div class="flex items-center"><i class="ri-medal-line mr-2 text-gray-400"></i><span class="text-gray-600">Кратко:</span><span class="ml-2 font-medium text-gray-900">{{ position.shortName }}</span></div><div class="flex items-center"><i class="ri-team-line mr-2 text-gray-400"></i><span class="text-gray-600">Сотрудников:</span><span class="ml-2 font-medium text-gray-900">{{ position.employeeCount }}</span></div></div>
      </article>
    </div>
  </div>
</template>
