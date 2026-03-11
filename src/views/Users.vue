<script setup lang="ts">
import { computed, ref } from "vue";
import { useModal } from "@/share/components/shared/useModal";
import { useAppData } from "@/share/libs/useAppData";

const selectedRole = ref("all");
const noop = () => {};
const { openModal } = useModal();
const openCreateUserModal = () => openModal({ key: "users.create", size: "xl" });
const openViewUserModal = (userId: number) => openModal({ key: "users.view", size: "lg", payload: { userId } });
const openEditUserModal = (userId: number) => openModal({ key: "users.edit", size: "xl", payload: { userId } });
const openDeleteUserModal = (userId: number) => openModal({ key: "users.delete", size: "sm", payload: { userId } });

const roles = [
  { value: "all", label: "Все роли" },
  { value: "admin", label: "Администратор" },
  { value: "manager", label: "Менеджер" },
  { value: "technician", label: "Техник" },
  { value: "user", label: "Пользователь" },
];

const { routeData } = useAppData();
const users = computed(() => routeData.value.users?.items ?? []);
</script>

<template>
  <div class="space-y-4 p-4 md:space-y-6 md:p-6">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-xl font-bold text-gray-900 md:text-2xl">Пользователи</h1>
        <p class="mt-1 text-sm text-gray-600">Управление пользователями и их правами доступа</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="rounded-lg border border-gray-300 px-4 py-2 text-sm" @click="noop"><i class="ri-download-line mr-2"></i>Экспорт</button>
        <button class="rounded-lg bg-teal-600 px-4 py-2 text-sm text-white" @click="openCreateUserModal"><i class="ri-user-add-line mr-2"></i>Добавить пользователя</button>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
      <div class="rounded-xl bg-white p-4 text-center shadow-sm"><div class="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100 md:h-12 md:w-12"><i class="ri-user-line text-lg text-teal-600 md:text-xl"></i></div><p class="text-xl font-bold text-gray-900 md:text-2xl">{{ users.length }}</p><p class="text-xs text-gray-600 md:text-sm">Всего пользователей</p></div>
      <div class="rounded-xl bg-white p-4 text-center shadow-sm"><div class="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 md:h-12 md:w-12"><i class="ri-user-check-line text-lg text-green-600 md:text-xl"></i></div><p class="text-xl font-bold text-gray-900 md:text-2xl">{{ users.filter((item) => item.status === 'Активен').length }}</p><p class="text-xs text-gray-600 md:text-sm">Активных</p></div>
      <div class="rounded-xl bg-white p-4 text-center shadow-sm"><div class="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 md:h-12 md:w-12"><i class="ri-admin-line text-lg text-purple-600 md:text-xl"></i></div><p class="text-xl font-bold text-gray-900 md:text-2xl">{{ users.filter((item) => item.role === 'admin').length }}</p><p class="text-xs text-gray-600 md:text-sm">Администраторов</p></div>
      <div class="rounded-xl bg-white p-4 text-center shadow-sm"><div class="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 md:h-12 md:w-12"><i class="ri-tools-line text-lg text-orange-600 md:text-xl"></i></div><p class="text-xl font-bold text-gray-900 md:text-2xl">{{ users.filter((item) => item.role === 'technician').length }}</p><p class="text-xs text-gray-600 md:text-sm">Техников</p></div>
    </div>

    <section class="rounded-xl bg-white p-4 shadow-sm">
      <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <input type="text" placeholder="Поиск по имени, email, телефону..." class="min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm" />
        <div class="flex items-center gap-2"><span class="text-sm text-gray-600">Роль:</span><select v-model="selectedRole" class="rounded-lg border border-gray-300 px-3 py-2 text-sm"><option v-for="role in roles" :key="role.value" :value="role.value">{{ role.label }}</option></select></div>
      </div>
    </section>

    <section class="rounded-xl bg-white p-4 shadow-sm">
      <div class="overflow-x-auto">
        <table class="min-w-[980px] w-full">
          <thead><tr class="border-b border-gray-200"><th class="px-4 py-3 text-left font-medium text-gray-700">Пользователь</th><th class="px-4 py-3 text-left font-medium text-gray-700">Контакты</th><th class="px-4 py-3 text-left font-medium text-gray-700">Роль</th><th class="px-4 py-3 text-left font-medium text-gray-700">Отдел / Должность</th><th class="px-4 py-3 text-left font-medium text-gray-700">Статус</th><th class="px-4 py-3 text-left font-medium text-gray-700">Активность</th><th class="px-4 py-3 text-right font-medium text-gray-700">Действия</th></tr></thead>
          <tbody>
            <tr v-for="user in users" :key="user.id" class="border-b border-gray-100 hover:bg-gray-50">
              <td class="px-4 py-4"><div class="flex items-center"><div class="mr-3 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-teal-600 text-sm font-medium text-white">{{ user.initials }}</div><div><p class="font-medium text-gray-900">{{ user.name }}</p><p class="text-sm text-gray-500">ID: {{ user.id }}</p></div></div></td>
              <td class="px-4 py-4 text-sm text-gray-600"><p>{{ user.email }}</p><p>{{ user.phone }}</p></td>
              <td class="px-4 py-4"><span :class="`rounded-full px-2 py-1 text-xs font-medium ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : user.role === 'manager' ? 'bg-blue-100 text-blue-800' : user.role === 'technician' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`">{{ user.roleText }}</span></td>
              <td class="px-4 py-4 text-sm text-gray-600"><p class="text-gray-900">{{ user.department }}</p><p>{{ user.position }}</p></td>
              <td class="px-4 py-4"><span :class="`rounded-full px-2 py-1 text-xs font-medium ${user.status === 'Активен' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`">{{ user.status }}</span></td>
              <td class="px-4 py-4 text-sm text-gray-600"><p>Обновлен: {{ user.updatedAt.replace('T', ' ').slice(0, 16) }}</p><div class="mt-1 flex items-center gap-4 text-xs text-gray-500"><span><i class="ri-computer-line mr-1"></i>{{ user.equipmentCount }} ед.</span><span><i class="ri-customer-service-line mr-1"></i>{{ user.ticketsCount }} заявок</span></div></td>
              <td class="px-4 py-4"><div class="flex items-center justify-end gap-1"><button class="p-2 text-gray-400 hover:text-teal-600" @click="openViewUserModal(user.id)"><i class="ri-eye-line"></i></button><button class="p-2 text-gray-400 hover:text-green-600" @click="openEditUserModal(user.id)"><i class="ri-edit-line"></i></button><button class="p-2 text-gray-400 hover:text-red-600" @click="openDeleteUserModal(user.id)"><i class="ri-delete-bin-line"></i></button></div></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>
