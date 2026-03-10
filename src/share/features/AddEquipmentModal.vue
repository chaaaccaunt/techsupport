<script setup lang="ts">
import { useModal } from "@/share/components/modals/useModal";

const formData = {
  name: "",
  type: "",
  model: "",
  serial_number: "",
  manufacturer: "",
  purchase_date: "",
  warranty_expiry: "",
  status: "active",
  department: "",
  location_id: "",
  description: "",
  specifications: "",
};

const noop = () => {};
const { closeModal } = useModal();

function closeCurrent() {
  closeModal();
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
    <div class="flex max-h-[90vh] w-full max-w-3xl flex-col rounded-lg bg-white shadow-xl">
      <div class="flex items-center justify-between border-b p-6">
        <div>
          <h2 class="text-xl font-bold text-gray-900">Добавить оборудование</h2>
          <p class="mt-1 text-sm text-gray-600">Заполните информацию о новом оборудовании</p>
        </div>
        <button class="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600" @click="closeCurrent">
          <i class="ri-close-line text-xl"></i>
        </button>
      </div>

      <form class="flex-1 overflow-y-auto p-6" @submit.prevent="noop">
        <div class="space-y-6">
          <div>
            <h3 class="mb-4 text-sm font-semibold text-gray-900">Основная информация</h3>
            <div class="grid grid-cols-2 gap-4">
              <div><label class="mb-2 block text-sm font-medium text-gray-700">Название <span class="text-red-500">*</span></label><input :value="formData.name" type="text" placeholder="Например: Компьютер Dell" class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /></div>
              <div><label class="mb-2 block text-sm font-medium text-gray-700">Тип <span class="text-red-500">*</span></label><select class="w-full cursor-pointer rounded-lg border border-gray-300 px-3 py-2 text-sm"><option value="">Выберите тип</option><option value="Компьютер">Компьютер</option><option value="Ноутбук">Ноутбук</option><option value="Принтер">Принтер</option><option value="Сканер">Сканер</option><option value="Монитор">Монитор</option><option value="Сервер">Сервер</option><option value="Сетевое оборудование">Сетевое оборудование</option><option value="Другое">Другое</option></select></div>
              <div><label class="mb-2 block text-sm font-medium text-gray-700">Модель</label><input :value="formData.model" type="text" placeholder="Например: OptiPlex 7090" class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /></div>
              <div><label class="mb-2 block text-sm font-medium text-gray-700">Серийный номер</label><input :value="formData.serial_number" type="text" placeholder="Например: SN123456789" class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /></div>
              <div><label class="mb-2 block text-sm font-medium text-gray-700">Производитель</label><input :value="formData.manufacturer" type="text" placeholder="Например: Dell" class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /></div>
              <div><label class="mb-2 block text-sm font-medium text-gray-700">Отдел <span class="text-red-500">*</span></label><select class="w-full cursor-pointer rounded-lg border border-gray-300 px-3 py-2 text-sm"><option value="">Выберите отдел</option><option value="IT">IT</option><option value="Бухгалтерия">Бухгалтерия</option><option value="HR">HR</option><option value="Продажи">Продажи</option><option value="Маркетинг">Маркетинг</option><option value="Производство">Производство</option><option value="Логистика">Логистика</option></select></div>
            </div>
          </div>

          <div>
            <h3 class="mb-4 text-sm font-semibold text-gray-900">Даты</h3>
            <div class="grid grid-cols-2 gap-4">
              <div><label class="mb-2 block text-sm font-medium text-gray-700">Дата покупки</label><input :value="formData.purchase_date" type="date" class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /></div>
              <div><label class="mb-2 block text-sm font-medium text-gray-700">Окончание гарантии</label><input :value="formData.warranty_expiry" type="date" class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /></div>
            </div>
          </div>

          <div>
            <h3 class="mb-4 text-sm font-semibold text-gray-900">Статус и размещение</h3>
            <div class="grid grid-cols-2 gap-4">
              <div><label class="mb-2 block text-sm font-medium text-gray-700">Статус <span class="text-red-500">*</span></label><select class="w-full cursor-pointer rounded-lg border border-gray-300 px-3 py-2 text-sm"><option value="active">Активно</option><option value="maintenance">На обслуживании</option><option value="inactive">Неактивно</option><option value="broken">Сломано</option></select></div>
              <div><label class="mb-2 block text-sm font-medium text-gray-700">ID локации</label><input :value="formData.location_id" type="text" placeholder="Например: LOC-001" class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /></div>
            </div>
          </div>

          <div><label class="mb-2 block text-sm font-medium text-gray-700">Описание</label><textarea rows="3" class="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="Дополнительная информация об оборудовании"></textarea></div>
          <div><label class="mb-2 block text-sm font-medium text-gray-700">Характеристики (JSON)</label><textarea rows="4" class="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm" placeholder='{"cpu": "Intel i7", "ram": "16GB", "storage": "512GB SSD"}'></textarea><p class="mt-1 text-xs text-gray-500">Введите характеристики в формате JSON</p></div>
        </div>
      </form>

      <div class="flex items-center justify-end space-x-3 border-t bg-gray-50 p-6">
        <button class="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" @click="closeCurrent">Отмена</button>
        <button class="rounded-lg bg-teal-600 px-4 py-2 text-sm text-white hover:bg-teal-700" @click="noop"><i class="ri-add-line mr-2"></i>Добавить</button>
      </div>
    </div>
  </div>
</template>
