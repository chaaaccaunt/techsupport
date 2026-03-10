<script setup lang="ts">
import { ref } from "vue";

const activeTab = ref<"info" | "security">("info");
const noop = () => {};
const formData = ref({
  full_name: "Иван Иванов",
  email: "admin@company.ru",
  phone: "+7 (999) 123-45-67",
  position: "Системный администратор",
  department: "IT",
});
</script>

<template>
  <div class="mx-auto max-w-5xl p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Мой профиль</h1>
      <p class="mt-1 text-sm text-gray-600">Управляйте своей учетной записью и настройками безопасности</p>
    </div>

    <section class="mb-6 rounded-xl bg-white shadow-sm">
      <div class="flex items-center gap-6 p-6">
        <div class="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-teal-600 to-emerald-600 text-3xl font-bold text-white">ИИ</div>
        <div>
          <h2 class="text-xl font-bold text-gray-900">{{ formData.full_name }}</h2>
          <p class="mt-1 text-sm text-gray-600">{{ formData.email }}</p>
          <div class="mt-3 flex items-center gap-4 text-sm text-gray-600">
            <div class="flex items-center"><i class="ri-briefcase-line mr-2"></i>{{ formData.position }}</div>
            <div class="flex items-center"><i class="ri-building-line mr-2"></i>{{ formData.department }}</div>
          </div>
        </div>
      </div>
    </section>

    <div class="mb-6 flex space-x-1 rounded-lg bg-gray-100 p-1">
      <button :class="`flex-1 rounded-md px-4 py-2 text-sm font-medium ${activeTab === 'info' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'}`" @click="noop"><i class="ri-user-line mr-2"></i>Личная информация</button>
      <button :class="`flex-1 rounded-md px-4 py-2 text-sm font-medium ${activeTab === 'security' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'}`" @click="noop"><i class="ri-lock-line mr-2"></i>Безопасность</button>
    </div>

    <section v-if="activeTab === 'info'" class="rounded-xl bg-white p-6 shadow-sm">
      <h3 class="mb-6 text-lg font-semibold text-gray-900">Личная информация</h3>
      <div class="grid grid-cols-2 gap-4">
        <div><label class="mb-2 block text-sm font-medium text-gray-700">Полное имя</label><input :value="formData.full_name" class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /></div>
        <div><label class="mb-2 block text-sm font-medium text-gray-700">Email</label><input :value="formData.email" disabled class="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" /></div>
        <div><label class="mb-2 block text-sm font-medium text-gray-700">Телефон</label><input :value="formData.phone" class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /></div>
        <div><label class="mb-2 block text-sm font-medium text-gray-700">Должность</label><input :value="formData.position" class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /></div>
      </div>
      <div class="mt-6 flex justify-end"><button class="rounded-lg bg-teal-600 px-4 py-2 text-sm text-white"><i class="ri-save-line mr-2"></i>Сохранить изменения</button></div>
    </section>

    <section v-else class="rounded-xl bg-white p-6 shadow-sm">
      <h3 class="mb-6 text-lg font-semibold text-gray-900">Изменить пароль</h3>
      <div class="max-w-md space-y-5">
        <div><label class="mb-2 block text-sm font-medium text-gray-700">Текущий пароль</label><input type="password" class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /></div>
        <div><label class="mb-2 block text-sm font-medium text-gray-700">Новый пароль</label><input type="password" class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /></div>
        <div><label class="mb-2 block text-sm font-medium text-gray-700">Подтверждение пароля</label><input type="password" class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /></div>
        <div class="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-700">Минимум 6 символов. Используйте комбинацию букв и цифр.</div>
      </div>
      <div class="mt-6 flex justify-end"><button class="rounded-lg bg-teal-600 px-4 py-2 text-sm text-white"><i class="ri-lock-password-line mr-2"></i>Изменить пароль</button></div>
    </section>
  </div>
</template>
