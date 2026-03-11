<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { apiClient } from "@/main";

const router = useRouter();
const showPassword = ref(false);
const isLoading = ref(false);
const errorMessage = ref("");
const form = ref({
  login: "",
  password: "",
});

async function submit() {
  if (!form.value.login || !form.value.password) {
    errorMessage.value = "Введите email и пароль.";
    return;
  }

  isLoading.value = true;
  errorMessage.value = "";

  try {
    const hasOrganizations = await apiClient.authorize(
      {
        login: form.value.login,
        password: form.value.password,
      },
      "auth/SET_CURRENT_USER",
    );

    await router.push(hasOrganizations ? "/select" : "/");
  } catch (error) {
    void error;
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="flex min-h-screen">
    <div class="flex flex-1 items-center justify-center bg-white p-8">
      <div class="w-full max-w-md">
        <div class="mb-8 text-center">
          <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 shadow-lg">
            <i class="ri-tools-line text-3xl text-white"></i>
          </div>
          <h1 class="mb-2 text-3xl font-bold text-gray-900">Добро пожаловать</h1>
          <p class="text-gray-600">Войдите в систему управления оборудованием</p>
        </div>

        <form class="space-y-5" @submit.prevent="submit">
          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700">Email <span class="text-red-500">*</span></label>
            <input
              v-model="form.login"
              type="email"
              autocomplete="username"
              placeholder="your@email.com"
              class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700">Пароль <span class="text-red-500">*</span></label>
            <div class="relative">
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                placeholder="Введите пароль"
                class="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 text-sm"
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                @click="showPassword = !showPassword"
              >
                <i :class="showPassword ? 'ri-eye-off-line' : 'ri-eye-line'"></i>
              </button>
            </div>
          </div>

          <div v-if="errorMessage" class="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {{ errorMessage }}
          </div>

          <div class="flex items-center justify-between text-sm">
            <label class="flex items-center">
              <input type="checkbox" class="h-4 w-4 rounded border-gray-300" />
              <span class="ml-2 text-gray-600">Запомнить меня</span>
            </label>
            <button type="button" class="font-medium text-teal-600">Забыли пароль?</button>
          </div>

          <button
            type="submit"
            class="w-full rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 px-4 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-70"
            :disabled="isLoading"
          >
            <i :class="`${isLoading ? 'ri-loader-4-line animate-spin' : 'ri-login-box-line'} mr-2`"></i>
            {{ isLoading ? "Вход..." : "Войти" }}
          </button>
        </form>
      </div>
    </div>

    <div class="relative hidden flex-1 items-center justify-center overflow-hidden bg-gradient-to-br from-teal-500 via-teal-600 to-emerald-600 p-12 lg:flex">
      <div class="absolute inset-0 bg-gradient-to-b from-black/10 via-black/5 to-black/10"></div>
      <div class="absolute left-20 top-20 h-32 w-32 rounded-full bg-white/10 blur-3xl"></div>
      <div class="absolute bottom-20 right-20 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>
      <div class="relative z-10 max-w-lg text-white">
        <div class="mb-8">
          <div class="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
            <i class="ri-shield-check-line text-5xl"></i>
          </div>
          <h2 class="mb-4 text-4xl font-bold">Управляйте оборудованием эффективно</h2>
          <p class="text-lg leading-relaxed text-white/90">Современная система для контроля технического состояния, планирования обслуживания и управления заявками.</p>
        </div>
      </div>
    </div>
  </div>
</template>
