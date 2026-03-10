<script setup lang="ts">
import { ref } from "vue";
import { useModal } from "@/share/components/modals/useModal";

const scanning = ref(false);
const manualInput = ref("");
const error = ref("");
const noop = () => {};
const { closeModal } = useModal();

function closeCurrent() {
  closeModal();
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
    <div class="w-full max-w-2xl rounded-lg bg-white shadow-xl">
      <div class="flex items-center justify-between border-b p-6">
        <div>
          <h2 class="text-xl font-bold text-gray-900">Сканирование QR-кода</h2>
          <p class="mt-1 text-sm text-gray-600">Наведите камеру на QR-код оборудования или введите ID вручную</p>
        </div>
        <button class="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600" @click="closeCurrent"><i class="ri-close-line text-xl"></i></button>
      </div>

      <div class="p-6">
        <div class="mb-6">
          <div class="relative overflow-hidden rounded-lg bg-gray-900" style="height: 320px">
            <template v-if="scanning">
              <div class="h-full w-full bg-gray-800"></div>
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="relative h-64 w-64 rounded-lg border-4 border-blue-500">
                  <div class="absolute left-0 top-0 h-8 w-8 border-l-4 border-t-4 border-blue-500"></div>
                  <div class="absolute right-0 top-0 h-8 w-8 border-r-4 border-t-4 border-blue-500"></div>
                  <div class="absolute bottom-0 left-0 h-8 w-8 border-b-4 border-l-4 border-blue-500"></div>
                  <div class="absolute bottom-0 right-0 h-8 w-8 border-b-4 border-r-4 border-blue-500"></div>
                </div>
              </div>
              <button class="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600" @click="noop"><i class="ri-check-line mr-2"></i>Симулировать сканирование</button>
            </template>
            <div v-else class="flex h-full w-full flex-col items-center justify-center text-white">
              <div class="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-800"><i class="ri-qr-scan-2-line text-4xl"></i></div>
              <p class="mb-2 text-lg font-medium">Камера не активна</p>
              <p class="text-sm text-gray-400">Нажмите кнопку ниже для начала сканирования</p>
            </div>
          </div>

          <div v-if="error" class="mt-4 flex items-start rounded-lg border border-red-200 bg-red-50 p-3">
            <i class="ri-error-warning-line mr-2 mt-0.5 text-lg text-red-500"></i>
            <p class="text-sm text-red-700">{{ error }}</p>
          </div>

          <div class="mt-4 flex justify-center">
            <button v-if="!scanning" class="rounded-lg bg-teal-600 px-4 py-2 text-sm text-white hover:bg-teal-700" @click="scanning = true"><i class="ri-camera-line mr-2"></i>Начать сканирование</button>
            <button v-else class="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" @click="scanning = false"><i class="ri-stop-circle-line mr-2"></i>Остановить</button>
          </div>
        </div>

        <div class="border-t pt-6">
          <label class="mb-2 block text-sm font-medium text-gray-700">Или введите ID оборудования вручную</label>
          <div class="flex space-x-3">
            <input v-model="manualInput" type="text" placeholder="Например: EQ-12345" class="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm" />
            <button class="rounded-lg bg-teal-600 px-4 py-2 text-sm text-white hover:bg-teal-700 disabled:opacity-50" :disabled="!manualInput.trim()" @click="noop"><i class="ri-search-line mr-2"></i>Найти</button>
          </div>
        </div>

        <div class="mt-6 rounded-lg bg-blue-50 p-4">
          <div class="flex items-start">
            <div class="flex h-5 w-5 items-center justify-center"><i class="ri-information-line text-blue-600"></i></div>
            <div class="ml-3">
              <h4 class="mb-1 text-sm font-medium text-blue-900">Как это работает?</h4>
              <ul class="space-y-1 text-sm text-blue-700">
                <li>Наведите камеру на QR-код, прикрепленный к оборудованию</li>
                <li>Система автоматически распознает код и откроет карточку оборудования</li>
                <li>Если QR-код не читается, введите ID вручную</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-end border-t bg-gray-50 p-6">
        <button class="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" @click="closeCurrent">Закрыть</button>
      </div>
    </div>
  </div>
</template>
