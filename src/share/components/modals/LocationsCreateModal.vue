<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import AppModal from "./AppModal.vue";
import { useModal } from "./useModal";
import { iModalDescriptor } from "@/entities/store/modules/modal";
import { useAppData } from "@/share/libs/useAppData";

const props = defineProps<{ modal: iModalDescriptor }>();
const { closeModal } = useModal();
const { staticCatalogs } = useAppData();

const customBuildings = ref<Array<{ id: number; name: string; address: string }>>([]);
const showBuildingForm = ref(false);
const form = reactive({
  name: "",
  buildingId: "",
  area: "",
  status: "active",
  responsible: "",
  department: "",
  description: "",
});
const newBuilding = reactive({
  name: "",
  address: "",
});

const buildingOptions = computed(() => [...(staticCatalogs.value?.buildings ?? []), ...customBuildings.value]);

function closeCurrent() {
  closeModal(props.modal.id);
}

function addBuilding() {
  if (!newBuilding.name.trim() || !newBuilding.address.trim()) return;

  const nextId = buildingOptions.value.reduce((max, item) => Math.max(max, item.id), 0) + 1;
  const building = {
    id: nextId,
    name: newBuilding.name.trim(),
    address: newBuilding.address.trim(),
  };

  customBuildings.value = [...customBuildings.value, building];
  form.buildingId = String(building.id);
  newBuilding.name = "";
  newBuilding.address = "";
  showBuildingForm.value = false;
}

function submitLocation() {
  closeCurrent();
}
</script>

<template>
  <AppModal :model-value="true" size="lg" custom-chrome @close="closeCurrent" @update:modelValue="closeCurrent">
    <div class="max-h-[90vh] w-full overflow-y-auto rounded-lg bg-white p-6">
      <div class="mb-6 flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900">Добавить локацию</h3>
        <button class="text-gray-400 hover:text-gray-600" @click="closeCurrent"><i class="ri-close-line text-xl"></i></button>
      </div>

      <form class="space-y-4" @submit.prevent="submitLocation">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label class="mb-1 block text-sm font-medium text-gray-700">Название локации</label>
            <input v-model="form.name" type="text" placeholder="Например: Офис 301" class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
          </div>

          <div class="space-y-2">
            <div class="flex items-center justify-between gap-3">
              <label class="block text-sm font-medium text-gray-700">Здание</label>
              <button type="button" class="text-sm font-medium text-teal-600 hover:text-teal-700" @click="showBuildingForm = !showBuildingForm">
                <i class="ri-add-line mr-1"></i>{{ showBuildingForm ? "Скрыть форму" : "Добавить здание" }}
              </button>
            </div>
            <select v-model="form.buildingId" class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm">
              <option value="">Выберите здание</option>
              <option v-for="building in buildingOptions" :key="building.id" :value="String(building.id)">
                {{ building.name }}{{ building.address ? `, ${building.address}` : "" }}
              </option>
            </select>
          </div>

          <div v-if="showBuildingForm" class="rounded-xl border border-dashed border-teal-200 bg-teal-50/60 p-4 md:col-span-2">
            <div class="mb-3 flex items-center justify-between">
              <h4 class="text-sm font-semibold text-gray-900">Новое здание</h4>
              <button type="button" class="text-sm text-gray-500 hover:text-gray-700" @click="showBuildingForm = false">Закрыть</button>
            </div>
            <div class="grid grid-cols-1 gap-3 md:grid-cols-[1fr_1fr_auto]">
              <input v-model="newBuilding.name" type="text" placeholder="Название здания" class="rounded-lg border border-gray-300 px-3 py-2 text-sm" />
              <input v-model="newBuilding.address" type="text" placeholder="Адрес" class="rounded-lg border border-gray-300 px-3 py-2 text-sm" />
              <button type="button" class="rounded-lg bg-teal-600 px-4 py-2 text-sm text-white hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50" :disabled="!newBuilding.name.trim() || !newBuilding.address.trim()" @click="addBuilding">
                Добавить
              </button>
            </div>
          </div>

          <div><label class="mb-1 block text-sm font-medium text-gray-700">Площадь (м2)</label><input v-model="form.area" type="number" placeholder="25" min="1" class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /></div>
          <div><label class="mb-1 block text-sm font-medium text-gray-700">Статус</label><select v-model="form.status" class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"><option value="active">Активная</option><option value="restricted">Ограниченный доступ</option><option value="maintenance">На обслуживании</option></select></div>
          <div><label class="mb-1 block text-sm font-medium text-gray-700">Ответственный</label><input v-model="form.responsible" type="text" placeholder="ФИО ответственного" class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /></div>
          <div><label class="mb-1 block text-sm font-medium text-gray-700">Отдел</label><input v-model="form.department" type="text" placeholder="Название отдела" class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /></div>
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700">Описание</label>
          <textarea v-model="form.description" rows="3" class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="Дополнительная информация о локации" maxlength="500"></textarea>
        </div>

        <div class="flex justify-end space-x-3 pt-4">
          <button type="button" class="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" @click="closeCurrent">Отмена</button>
          <button type="submit" class="rounded-lg bg-teal-600 px-4 py-2 text-sm text-white hover:bg-teal-700">Добавить локацию</button>
        </div>
      </form>
    </div>
  </AppModal>
</template>
