<script lang="ts" setup>
import { computed, ref } from "vue";
import Card from "@/share/components/base/iCard.vue";
import PersonalInfo from "./components/PersonalInfo.vue";
import Password from "./components/Password.vue";
import { useStore } from "@/entities";
import { iUserInfo } from "@/entities/store/modules/auth";

const store = useStore();

const user = computed(() => store.getters["auth/GET_USER"] as iUserInfo);

const loading = ref(false);
const activeTab = ref<"info" | "password">("info");

const components = {
  info: PersonalInfo,
  password: Password,
};

const selected = computed(() => components[activeTab.value]);
</script>

<template>
  <div v-if="loading" class="flex items-center justify-center h-full">
    <div class="animate-spin w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full"></div>
  </div>
  <div class="p-6 max-w-5xl mx-auto">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Мой профиль</h1>
      <p class="text-sm text-gray-600 mt-1">Управляйте своей учетной записью и настройками безопасности</p>
    </div>
    <Card class="mb-6">
      <div class="flex items-center space-x-6 p-6">
        <div class="w-24 h-24 bg-gradient-to-br from-teal-600 to-emerald-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
          {{
            user.fullName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase() || "U"
          }}
        </div>
        <div class="flex-1">
          <h2 class="text-xl font-bold text-gray-900">{{ user.fullName || "Пользователь" }}</h2>
          <p class="text-sm text-gray-600 mt-1">{{ user.email }}</p>
          <div class="flex items-center space-x-4 mt-3">
            <div class="flex items-center text-sm text-gray-600">
              <i class="ri-briefcase-line mr-2"></i>
              {{ user.staff.department.fullName || "Не указано" }}
            </div>
            <div class="flex items-center text-sm text-gray-600">
              <i class="ri-building-line mr-2"></i>
              {{ user.staff.organization.shortName || "Не указано" }}
            </div>
          </div>
        </div>
      </div>
    </Card>
    <div class="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
      <button
        @click="() => (activeTab = 'info')"
        :class="`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
          activeTab === 'info' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
        }`"
      >
        <i class="ri-user-line mr-2"></i>
        Личная информация
      </button>
      <button
        @click="() => (activeTab = 'password')"
        :class="`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
          activeTab === 'password' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
        }`"
      >
        <i class="ri-lock-line mr-2"></i>
        Безопасность
      </button>
    </div>
    <component :is="selected"></component>
  </div>
</template>
