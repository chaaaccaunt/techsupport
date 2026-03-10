<script setup lang="ts">
import { useModal } from "@/share/components/modals/useModal";

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
          <h2 class="text-xl font-bold text-gray-900">Редактировать запись ТО</h2>
          <p class="mt-1 text-sm text-gray-600">Компьютер Dell OptiPlex 7090</p>
        </div>
        <button class="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600" @click="closeCurrent"><i class="ri-close-line text-xl"></i></button>
      </div>

      <form class="flex-1 overflow-y-auto p-6" @submit.prevent="noop">
        <div class="space-y-6">
          <div><label class="mb-2 block text-sm font-medium text-gray-700">Тип обслуживания <span class="text-red-500">*</span></label><select class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"><option value="">Выберите тип</option><option value="preventive">Профилактическое</option><option value="corrective">Корректирующее</option><option value="inspection">Инспекция</option><option value="upgrade">Модернизация</option></select></div>
          <div class="grid grid-cols-2 gap-4">
            <div><label class="mb-2 block text-sm font-medium text-gray-700">Дата выполнения <span class="text-red-500">*</span></label><input type="date" class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /></div>
            <div><label class="mb-2 block text-sm font-medium text-gray-700">Исполнитель <span class="text-red-500">*</span></label><input type="text" placeholder="ФИО исполнителя" class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /></div>
          </div>
          <div><label class="mb-2 block text-sm font-medium text-gray-700">Стоимость (₽)</label><input type="number" placeholder="0" min="0" step="0.01" class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /></div>
          <div><label class="mb-2 block text-sm font-medium text-gray-700">Описание работ <span class="text-red-500">*</span></label><textarea rows="4" class="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="Опишите выполненные работы"></textarea></div>
          <div><label class="mb-2 block text-sm font-medium text-gray-700">Замененные детали</label><input type="text" placeholder="Через запятую: Жесткий диск, Блок питания" class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /><p class="mt-1 text-xs text-gray-500">Перечислите детали через запятую</p></div>
          <div><label class="mb-2 block text-sm font-medium text-gray-700">Дата следующего ТО</label><input type="date" class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /></div>
        </div>
      </form>

      <div class="flex items-center justify-end space-x-3 border-t bg-gray-50 p-6">
        <button class="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" @click="closeCurrent">Отмена</button>
        <button class="rounded-lg bg-teal-600 px-4 py-2 text-sm text-white hover:bg-teal-700" @click="noop"><i class="ri-save-line mr-2"></i>Сохранить</button>
      </div>
    </div>
  </div>
</template>
