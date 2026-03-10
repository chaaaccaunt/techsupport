<script setup lang="ts">
import { ref } from "vue";

const isSignUp = ref(false);
const showPassword = ref(false);
const noop = () => {};
</script>

<template>
  <div class="min-h-screen flex">
    <div class="flex flex-1 items-center justify-center bg-white p-8">
      <div class="w-full max-w-md">
        <div class="mb-8 text-center">
          <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 shadow-lg">
            <i class="ri-tools-line text-3xl text-white"></i>
          </div>
          <h1 class="mb-2 text-3xl font-bold text-gray-900">{{ isSignUp ? "Создать аккаунт" : "Добро пожаловать" }}</h1>
          <p class="text-gray-600">{{ isSignUp ? "Зарегистрируйтесь для доступа к системе" : "Войдите в систему управления оборудованием" }}</p>
        </div>

        <form class="space-y-5">
          <template v-if="isSignUp">
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700">Полное имя <span class="text-red-500">*</span></label>
              <input type="text" placeholder="Иван Иванов" class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700">Отдел <span class="text-red-500">*</span></label>
              <select class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"><option>Выберите отдел</option><option>IT</option><option>Бухгалтерия</option><option>HR</option><option>Продажи</option></select>
            </div>
          </template>
          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700">Email <span class="text-red-500">*</span></label>
            <input type="email" placeholder="your@email.com" class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
          </div>
          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700">Пароль <span class="text-red-500">*</span></label>
            <div class="relative">
              <input :type="showPassword ? 'text' : 'password'" placeholder="••••••••" class="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 text-sm" />
              <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" @click="noop"><i :class="showPassword ? 'ri-eye-off-line' : 'ri-eye-line'"></i></button>
            </div>
          </div>

          <div v-if="!isSignUp" class="flex items-center justify-between text-sm">
            <label class="flex items-center"><input type="checkbox" class="h-4 w-4 rounded border-gray-300" /><span class="ml-2 text-gray-600">Запомнить меня</span></label>
            <button type="button" class="font-medium text-teal-600">Забыли пароль?</button>
          </div>

          <button type="submit" class="w-full rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 px-4 py-2 text-sm text-white">
            <i :class="`${isSignUp ? 'ri-user-add-line' : 'ri-login-box-line'} mr-2`"></i>{{ isSignUp ? "Зарегистрироваться" : "Войти" }}
          </button>
        </form>

        <div class="mt-6 text-center text-sm text-gray-600">
          {{ isSignUp ? "Уже есть аккаунт?" : "Нет аккаунта?" }}
          <button type="button" class="ml-1 font-semibold text-teal-600" @click="noop">{{ isSignUp ? "Войти" : "Зарегистрироваться" }}</button>
        </div>

        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-200"></div></div>
          <div class="relative flex justify-center text-sm"><span class="bg-white px-4 text-gray-500">или продолжить с</span></div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <button class="flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2 text-sm"><i class="ri-google-fill mr-2 text-xl text-red-500"></i>Google</button>
          <button class="flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2 text-sm"><i class="ri-microsoft-fill mr-2 text-xl text-blue-500"></i>Microsoft</button>
        </div>
      </div>
    </div>

    <div class="relative hidden flex-1 items-center justify-center overflow-hidden bg-gradient-to-br from-teal-500 via-teal-600 to-emerald-600 p-12 lg:flex">
      <div class="absolute inset-0 bg-gradient-to-b from-black/10 via-black/5 to-black/10"></div>
      <div class="absolute left-20 top-20 h-32 w-32 rounded-full bg-white/10 blur-3xl"></div>
      <div class="absolute bottom-20 right-20 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>
      <div class="relative z-10 max-w-lg text-white">
        <div class="mb-8">
          <div class="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm"><i class="ri-shield-check-line text-5xl"></i></div>
          <h2 class="mb-4 text-4xl font-bold">Управляйте оборудованием эффективно</h2>
          <p class="text-lg leading-relaxed text-white/90">Современная система для контроля технического состояния, планирования обслуживания и управления заявками</p>
        </div>
      </div>
    </div>
  </div>
</template>
