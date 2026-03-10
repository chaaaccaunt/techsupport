<script setup lang="ts">
import { computed, ref } from "vue";
import { useModal } from "@/share/components/shared/useModal";
import { getLocationViewItems } from "@/share/mocks/schemaMocks";

const selectedBuilding = ref("all");
const searchQuery = ref("");
const { openModal } = useModal();
const openCreateLocationModal = () => openModal({ key: "locations.create", size: "xl" });
const openViewLocationModal = (locationId: number) => openModal({ key: "locations.view", size: "lg", payload: { locationId } });
const openEditLocationModal = (locationId: number) => openModal({ key: "locations.edit", size: "xl", payload: { locationId } });
const openDeleteLocationModal = (locationId: number) => openModal({ key: "locations.delete", size: "sm", payload: { locationId } });
const openLocationEquipmentModal = (locationId: number) => openModal({ key: "locations.equipment", size: "xl", payload: { locationId } });

const buildings = [{ value: "all", label: "Все локации" }];
const locations = computed(() => getLocationViewItems());
</script>

<template>
  <div class="space-y-4 p-4 md:space-y-6 md:p-6">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-xl font-bold text-gray-900 md:text-2xl">Локации</h1>
        <p class="mt-1 text-sm text-gray-600">Управление местоположениями оборудования</p>
      </div>
      <button class="rounded-lg bg-teal-600 px-4 py-2 text-sm text-white" @click="openCreateLocationModal"><i class="ri-add-line mr-2"></i>Добавить локацию</button>
    </div>

    <div class="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
      <div class="rounded-xl bg-white p-4 text-center shadow-sm"><div class="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100 md:h-12 md:w-12"><i class="ri-building-line text-lg text-teal-600 md:text-xl"></i></div><p class="text-xl font-bold text-gray-900 md:text-2xl">{{ locations.length }}</p><p class="text-xs text-gray-600 md:text-sm">Всего локаций</p></div>
      <div class="rounded-xl bg-white p-4 text-center shadow-sm"><div class="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 md:h-12 md:w-12"><i class="ri-checkbox-circle-line text-lg text-green-600 md:text-xl"></i></div><p class="text-xl font-bold text-gray-900 md:text-2xl">{{ locations.length }}</p><p class="text-xs text-gray-600 md:text-sm">Активных</p></div>
      <div class="rounded-xl bg-white p-4 text-center shadow-sm"><div class="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 md:h-12 md:w-12"><i class="ri-computer-line text-lg text-orange-600 md:text-xl"></i></div><p class="text-xl font-bold text-gray-900 md:text-2xl">{{ locations.reduce((sum, item) => sum + item.equipmentCount, 0) }}</p><p class="text-xs text-gray-600 md:text-sm">Единиц оборудования</p></div>
      <div class="rounded-xl bg-white p-4 text-center shadow-sm"><div class="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100 md:h-12 md:w-12"><i class="ri-map-pin-line text-lg text-teal-600 md:text-xl"></i></div><p class="text-xl font-bold text-gray-900 md:text-2xl">2</p><p class="text-xs text-gray-600 md:text-sm">Поля в схеме</p></div>
    </div>

    <section class="rounded-xl bg-white p-4 shadow-sm">
      <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <input v-model="searchQuery" type="text" placeholder="Поиск по названию..." class="min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm" />
        <div class="flex items-center gap-2"><span class="text-sm text-gray-600">Фильтр:</span><select v-model="selectedBuilding" class="rounded-lg border border-gray-300 px-3 py-2 text-sm"><option v-for="building in buildings" :key="building.value" :value="building.value">{{ building.label }}</option></select></div>
      </div>
    </section>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
      <article v-for="location in locations" :key="location.id" class="rounded-xl bg-white p-6 shadow-sm">
        <div class="mb-4 flex items-start justify-between">
          <div class="min-w-0 flex-1">
            <h3 class="text-base font-semibold text-gray-900 md:text-lg">{{ location.name }}</h3>
            <p class="text-sm text-gray-500">ID: {{ location.id }}</p>
          </div>
          <span class="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">Активна</span>
        </div>
        <div class="mb-4 space-y-2 text-sm">
          <div class="flex items-center justify-between"><span class="text-gray-600">Оборудование:</span><span class="font-medium">{{ location.equipmentCount }} ед.</span></div>
        </div>
        <div class="mb-4 rounded-lg bg-gray-50 p-3 text-sm text-gray-700">По `DB_SCHEMA.md` у локации есть только `id` и `name`, поэтому дополнительные поля из старых моков удалены.</div>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-1">
            <button class="p-2 text-gray-400 hover:text-teal-600" @click="openViewLocationModal(location.id)"><i class="ri-eye-line"></i></button>
            <button class="p-2 text-gray-400 hover:text-green-600" @click="openEditLocationModal(location.id)"><i class="ri-edit-line"></i></button>
            <button class="p-2 text-gray-400 hover:text-red-500" @click="openDeleteLocationModal(location.id)"><i class="ri-delete-bin-line"></i></button>
          </div>
          <button class="rounded-lg border border-gray-300 px-3 py-2 text-sm" @click="openLocationEquipmentModal(location.id)"><i class="ri-list-unordered mr-1"></i>Оборудование</button>
        </div>
      </article>
    </div>
  </div>
</template>
