<script lang="ts" setup>
import { ref } from "vue";
import Button from "@/share/components/base/iButton.vue";
import Input from "@/share/components/base/iInput.vue";
import { apiClient } from "@/main";
import { useRouter } from "vue-router";

const router = useRouter();

const payload = ref({
  login: "",
  password: "",
});

const loading = ref(false);
const error = ref<null | string>(null);
const showPassword = ref(false);
const isSignUp = ref(false);

function handleLogin(e: Event) {
  e.preventDefault();
  loading.value = true;
  apiClient
    .authorize(payload.value, "auth/SET_USER")
    .then((select) => {
      if (select) router.push({ name: "Select" });
      else router.push({ name: "Dashboard" });
    })
    .catch((error) => console.log(error));
}
</script>

<template>
  <div class="min-h-screen flex">
    <div class="flex-1 flex items-center justify-center p-8 bg-white">
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <div class="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl mx-auto mb-4 shadow-lg">
            <i class="ri-tools-line text-3xl text-white"></i>
          </div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Добро пожаловать</h1>
          <p class="text-gray-600">Войдите в систему управления оборудованием</p>
        </div>
        <form @submit="handleLogin" class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"> Email <span class="text-red-500">*</span> </label>
            <Input :type="'email'" :placeholder="'ваша@электронная.почта'" :required="true" @inputEvent="(s: string) => (payload.login = s)" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"> Пароль <span class="text-red-500">*</span> </label>
            <div class="relative">
              <Input :type="showPassword ? 'text' : 'password'" :placeholder="'••••••••'" :required="true" @inputEvent="(s: string) => (payload.password = s)" />
              <button type="button" @click="showPassword = !showPassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer">
                <i :class="showPassword ? 'ri-eye-off-line' : 'ri-eye-line'"></i>
              </button>
            </div>
          </div>
          <div v-if="!isSignUp" class="flex items-center justify-between text-sm">
            <label class="flex items-center cursor-pointer">
              <input type="checkbox" class="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500 cursor-pointer" />
              <span class="ml-2 text-gray-600">Запомнить меня</span>
            </label>
            <button type="button" class="text-teal-600 hover:text-teal-700 font-medium cursor-pointer">Забыли пароль?</button>
          </div>
          <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start">
            <i class="ri-error-warning-line text-red-600 text-lg mr-2 flex-shrink-0 mt-0.5"></i>
            <p class="text-sm text-red-800">{{ error }}</p>
          </div>
          <Button :type="'submit'" :disabled="loading" :class="`w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700`">
            <i v-if="!loading" class="ri-login-box-line mr-2`"></i>
            <div v-else class="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
            {{ loading ? "Вход..." : "Войти" }}
          </Button>
        </form>
        <div class="mt-8 text-center">
          <p class="text-xs text-gray-500">
            Входя в систему, вы соглашаетесь с{{ " " }}
            <a href="#" class="text-teal-600 hover:text-teal-700"> Условиями использования </a>
            {{ " " }}и{{ " " }}
            <a href="#" class="text-teal-600 hover:text-teal-700"> Политикой конфиденциальности </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
