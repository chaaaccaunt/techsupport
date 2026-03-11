<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from "@/entities";
import { apiClient } from "@/main";

const activeTab = ref<"info" | "security">("info");
const store = useStore();

const passwordForm = ref({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});
const passwordError = ref("");
const isSubmittingPassword = ref(false);

const currentUser = computed(() => store.getters["auth/currentUser"]);

const formData = computed(() => {
  const user = currentUser.value;
  const fullName = [user.lastName, user.firstName, user.surname].filter(Boolean).join(" ").trim();
  const phone = user.phone;

  return {
    fullName,
    email: user.email,
    phone: phone ? `+7 (${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 8)}-${phone.slice(8, 10)}` : "",
    position: user.staff?.position?.fullName ?? user.staff?.position?.shortName,
    department: user.staff?.department?.fullName ?? user.staff?.department?.shortName,
    organization: user.staff?.organization?.fullName ?? user.staff?.organization?.shortName,
  };
});

const initials = computed(() =>
  formData.value.fullName
    .split(" ")
    .filter(Boolean)
    .map((item) => item[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase(),
);

async function submitPasswordChange() {
  passwordError.value = "";

  if (!passwordForm.value.currentPassword || !passwordForm.value.newPassword || !passwordForm.value.confirmPassword) {
    passwordError.value = "Заполните все поля.";
    return;
  }

  if (passwordForm.value.newPassword.length < 8) {
    passwordError.value = "Новый пароль должен быть не короче 8 символов.";
    return;
  }

  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    passwordError.value = "Подтверждение пароля не совпадает.";
    return;
  }

  isSubmittingPassword.value = true;

  try {
    const result = await apiClient.update<boolean>("/user/change-password", {
      currentPassword: passwordForm.value.currentPassword,
      newPassword: passwordForm.value.newPassword,
    }, "auth/SET_PASSWORD_CHANGED");

    if (!result) {
      await store.dispatch("feedback/push", {
        type: "error",
        message: "Не удалось изменить пароль.",
        source: "ui",
      });
      return;
    }

    await store.dispatch("feedback/push", {
      type: "success",
      message: "Пароль успешно изменён.",
      source: "ui",
    });
    passwordForm.value.currentPassword = "";
    passwordForm.value.newPassword = "";
    passwordForm.value.confirmPassword = "";
  } catch (error) {
    void error;
  } finally {
    isSubmittingPassword.value = false;
  }
}
</script>

<template>
  <div class="mx-auto max-w-5xl p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Мой профиль</h1>
      <p class="mt-1 text-sm text-gray-600">Просмотр учетной записи и настроек безопасности</p>
    </div>

    <section class="mb-6 rounded-xl bg-white shadow-sm">
      <div class="flex items-center gap-6 p-6">
        <div class="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-teal-600 to-emerald-600 text-3xl font-bold text-white">
          {{ initials }}
        </div>
        <div>
          <h2 class="text-xl font-bold text-gray-900">{{ formData.fullName }}</h2>
          <p class="mt-1 text-sm text-gray-600">{{ formData.organization }}</p>
          <div class="mt-3 flex items-center gap-4 text-sm text-gray-600">
            <div class="flex items-center"><i class="ri-briefcase-line mr-2"></i>{{ formData.position }}</div>
            <div class="flex items-center"><i class="ri-building-line mr-2"></i>{{ formData.department }}</div>
          </div>
        </div>
      </div>
    </section>

    <div class="mb-6 flex space-x-1 rounded-lg bg-gray-100 p-1">
      <button :class="`flex-1 rounded-md px-4 py-2 text-sm font-medium ${activeTab === 'info' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'}`" @click="activeTab = 'info'">
        <i class="ri-user-line mr-2"></i>Личная информация
      </button>
      <button :class="`flex-1 rounded-md px-4 py-2 text-sm font-medium ${activeTab === 'security' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'}`" @click="activeTab = 'security'">
        <i class="ri-lock-line mr-2"></i>Безопасность
      </button>
    </div>

    <section v-if="activeTab === 'info'" class="rounded-xl bg-white p-6 shadow-sm">
      <h3 class="mb-6 text-lg font-semibold text-gray-900">Личная информация</h3>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="mb-2 block text-sm font-medium text-gray-700">Полное имя</label>
          <input :value="formData.fullName" readonly class="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-600" />
        </div>
        <div>
          <label class="mb-2 block text-sm font-medium text-gray-700">Email</label>
          <input :value="formData.email" disabled class="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-600" />
        </div>
        <div>
          <label class="mb-2 block text-sm font-medium text-gray-700">Телефон</label>
          <input :value="formData.phone" readonly class="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-600" />
        </div>
        <div>
          <label class="mb-2 block text-sm font-medium text-gray-700">Должность</label>
          <input :value="formData.position" readonly class="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-600" />
        </div>
      </div>
    </section>

    <section v-else class="rounded-xl bg-white p-6 shadow-sm">
      <h3 class="mb-6 text-lg font-semibold text-gray-900">Изменить пароль</h3>
      <form class="max-w-md space-y-5" @submit.prevent="submitPasswordChange">
        <div>
          <label class="mb-2 block text-sm font-medium text-gray-700">Текущий пароль</label>
          <input v-model="passwordForm.currentPassword" type="password" class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label class="mb-2 block text-sm font-medium text-gray-700">Новый пароль</label>
          <input v-model="passwordForm.newPassword" type="password" class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label class="mb-2 block text-sm font-medium text-gray-700">Подтверждение пароля</label>
          <input v-model="passwordForm.confirmPassword" type="password" class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
        </div>
        <div class="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-700">Минимум 8 символов. Используйте комбинацию букв и цифр.</div>
        <div v-if="passwordError" class="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">{{ passwordError }}</div>
        <div class="flex justify-end">
          <button
            type="submit"
            class="rounded-lg bg-teal-600 px-4 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-70"
            :disabled="isSubmittingPassword"
          >
            <i :class="`${isSubmittingPassword ? 'ri-loader-4-line animate-spin' : 'ri-lock-password-line'} mr-2`"></i>
            {{ isSubmittingPassword ? "Изменение..." : "Изменить пароль" }}
          </button>
        </div>
      </form>
    </section>
  </div>
</template>
