<script setup lang="ts">
import { computed, reactive } from "vue";
import AppModal from "./AppModal.vue";
import { useModal } from "./useModal";
import { iModalDescriptor } from "@/entities/store/modules/modal";
import { useAppData } from "@/share/libs/useAppData";

const props = defineProps<{ modal: iModalDescriptor }>();
const { closeModal, openModal } = useModal();
const { routeData } = useAppData();

const payload = computed(() => (props.modal.payload as { userId?: number } | undefined) ?? {});
const users = computed(() => routeData.value.users?.items ?? []);
const user = computed(() => users.value.find((item) => item.id === payload.value.userId) ?? users.value[0]);

const editForm = reactive({
  lastName: user.value.name.split(" ")[0] ?? "",
  firstName: user.value.name.split(" ")[1] ?? "",
  middleName: user.value.name.split(" ")[2] ?? "",
  email: user.value.email,
  phone: user.value.phone,
  role: user.value.role,
  department: user.value.department,
  position: user.value.position,
  status: user.value.status === "Активен" ? "active" : "inactive",
});

function getRoleColor(role: string) {
  if (role === "admin") return "bg-purple-100 text-purple-800";
  if (role === "manager") return "bg-blue-100 text-blue-800";
  if (role === "technician") return "bg-green-100 text-green-800";
  return "bg-gray-100 text-gray-800";
}

function getStatusColor(status: string) {
  return status === "Активен" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800";
}

function closeCurrent() {
  closeModal(props.modal.id);
}

function openEditFromView() {
  closeCurrent();
  openModal({ key: "users.edit", size: "xl", payload: { userId: user.value.id } });
}
</script>

<template>
  <AppModal v-if="modal.key === 'users.view'" :model-value="true" size="md" custom-chrome @close="closeCurrent" @update:modelValue="closeCurrent">
    <div class="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl">
      <div class="mb-6 flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900">Профиль пользователя</h3>
        <button class="text-gray-400 hover:text-gray-600" @click="closeCurrent"><i class="ri-close-line text-xl"></i></button>
      </div>
      <div class="mb-6 flex items-center space-x-4">
        <div class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-blue-600">
          <span class="text-xl font-bold text-white">{{ user.initials }}</span>
        </div>
        <div>
          <h4 class="text-xl font-bold text-gray-900">{{ user.name }}</h4>
          <p class="text-sm text-gray-500">{{ user.position }}</p>
          <div class="mt-1 flex items-center space-x-2">
            <span :class="`px-2 py-0.5 text-xs font-medium rounded-full ${getRoleColor(user.role)}`">{{ user.roleText }}</span>
            <span :class="`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(user.status)}`">{{ user.status }}</span>
          </div>
        </div>
      </div>
      <div class="mb-6 grid grid-cols-2 gap-4">
        <div class="rounded-lg bg-gray-50 p-3"><p class="mb-1 text-xs text-gray-500">Email</p><p class="break-all text-sm font-medium text-gray-900">{{ user.email }}</p></div>
        <div class="rounded-lg bg-gray-50 p-3"><p class="mb-1 text-xs text-gray-500">Телефон</p><p class="text-sm font-medium text-gray-900">{{ user.phone }}</p></div>
        <div class="rounded-lg bg-gray-50 p-3"><p class="mb-1 text-xs text-gray-500">Отдел</p><p class="text-sm font-medium text-gray-900">{{ user.department }}</p></div>
        <div class="rounded-lg bg-gray-50 p-3"><p class="mb-1 text-xs text-gray-500">Должность</p><p class="text-sm font-medium text-gray-900">{{ user.position }}</p></div>
        <div class="rounded-lg bg-gray-50 p-3"><p class="mb-1 text-xs text-gray-500">Оборудование</p><p class="text-sm font-medium text-gray-900">{{ user.equipmentCount }} единиц</p></div>
        <div class="rounded-lg bg-gray-50 p-3"><p class="mb-1 text-xs text-gray-500">Заявки</p><p class="text-sm font-medium text-gray-900">{{ user.ticketsCount }} заявок</p></div>
      </div>
      <div class="mb-6 rounded-lg bg-gray-50 p-3"><p class="mb-1 text-xs text-gray-500">Обновлено</p><div class="flex items-center space-x-2"><i class="ri-time-line text-sm text-gray-500"></i><p class="text-sm font-medium text-gray-900">{{ user.updatedAt.replace('T', ' ').slice(0, 16) }}</p></div></div>
      <div class="flex justify-end space-x-3">
        <button class="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap" @click="closeCurrent">Закрыть</button>
        <button class="px-4 py-2 text-sm text-white bg-gray-900 rounded-lg hover:bg-gray-700 whitespace-nowrap flex items-center space-x-2" @click="openEditFromView"><i class="ri-edit-line"></i><span>Редактировать</span></button>
      </div>
    </div>
  </AppModal>

  <AppModal v-else-if="modal.key === 'users.create'" :model-value="true" size="lg" custom-chrome @close="closeCurrent" @update:modelValue="closeCurrent">
    <div class="bg-white rounded-lg p-6 w-full max-h-screen overflow-y-auto">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-semibold text-gray-900">Добавить пользователя</h3>
        <button class="text-gray-400 hover:text-gray-600" @click="closeCurrent"><i class="ri-close-line text-xl"></i></button>
      </div>
      <form class="space-y-4" @submit.prevent>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label class="block text-sm font-medium text-gray-700 mb-1">Фамилия</label><input type="text" placeholder="Введите фамилию" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" /></div>
          <div><label class="block text-sm font-medium text-gray-700 mb-1">Имя</label><input type="text" placeholder="Введите имя" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" /></div>
          <div><label class="block text-sm font-medium text-gray-700 mb-1">Отчество</label><input type="text" placeholder="Введите отчество" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" /></div>
          <div><label class="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" placeholder="user@company.ru" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" /></div>
          <div><label class="block text-sm font-medium text-gray-700 mb-1">Телефон</label><input type="text" placeholder="+7 (999) 123-45-67" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" /></div>
          <div><label class="block text-sm font-medium text-gray-700 mb-1">Роль</label><select class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"><option value="">Выберите роль</option><option value="admin">Администратор</option><option value="manager">Менеджер</option><option value="technician">Техник</option><option value="user">Пользователь</option></select></div>
          <div><label class="block text-sm font-medium text-gray-700 mb-1">Отдел</label><input type="text" placeholder="Название отдела" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" /></div>
          <div><label class="block text-sm font-medium text-gray-700 mb-1">Должность</label><input type="text" placeholder="Должность сотрудника" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" /></div>
        </div>
        <div><label class="block text-sm font-medium text-gray-700 mb-1">Пароль</label><input type="password" placeholder="Временный пароль" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" /></div>
        <div class="flex justify-end space-x-3 pt-4">
          <button type="button" class="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" @click="closeCurrent">Отмена</button>
          <button type="submit" class="rounded-lg bg-teal-600 px-4 py-2 text-sm text-white hover:bg-teal-700">Добавить пользователя</button>
        </div>
      </form>
    </div>
  </AppModal>

  <AppModal v-else-if="modal.key === 'users.edit'" :model-value="true" size="lg" custom-chrome @close="closeCurrent" @update:modelValue="closeCurrent">
    <div class="bg-white rounded-lg p-6 w-full max-h-screen overflow-y-auto">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center space-x-3"><div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center"><i class="ri-edit-line text-green-600"></i></div><div><h3 class="text-lg font-semibold text-gray-900">Редактировать пользователя</h3><p class="text-sm text-gray-500">ID: {{ user.id }} - {{ user.name }}</p></div></div>
        <button class="text-gray-400 hover:text-gray-600" @click="closeCurrent"><i class="ri-close-line text-xl"></i></button>
      </div>
      <form class="space-y-4" @submit.prevent>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label class="block text-sm font-medium text-gray-700 mb-1">Фамилия</label><input v-model="editForm.lastName" type="text" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" /></div>
          <div><label class="block text-sm font-medium text-gray-700 mb-1">Имя</label><input v-model="editForm.firstName" type="text" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" /></div>
          <div><label class="block text-sm font-medium text-gray-700 mb-1">Отчество</label><input v-model="editForm.middleName" type="text" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" /></div>
          <div><label class="block text-sm font-medium text-gray-700 mb-1">Email</label><input v-model="editForm.email" type="email" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" /></div>
          <div><label class="block text-sm font-medium text-gray-700 mb-1">Телефон</label><input v-model="editForm.phone" type="text" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" /></div>
          <div><label class="block text-sm font-medium text-gray-700 mb-1">Роль</label><select v-model="editForm.role" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"><option value="admin">Администратор</option><option value="manager">Менеджер</option><option value="technician">Техник</option><option value="user">Пользователь</option></select></div>
          <div><label class="block text-sm font-medium text-gray-700 mb-1">Отдел</label><input v-model="editForm.department" type="text" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" /></div>
          <div><label class="block text-sm font-medium text-gray-700 mb-1">Должность</label><input v-model="editForm.position" type="text" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" /></div>
        </div>
        <div><label class="block text-sm font-medium text-gray-700 mb-1">Статус</label><select v-model="editForm.status" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"><option value="active">Активен</option><option value="inactive">Неактивен</option></select></div>
        <div><label class="block text-sm font-medium text-gray-700 mb-1">Новый пароль <span class="text-gray-400 font-normal">(оставьте пустым, чтобы не менять)</span></label><input type="password" placeholder="Введите новый пароль" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" /></div>
        <div class="flex justify-end space-x-3 pt-4 border-t border-gray-100">
          <button type="button" class="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" @click="closeCurrent">Отмена</button>
          <button type="submit" class="rounded-lg bg-teal-600 px-4 py-2 text-sm text-white hover:bg-teal-700"><i class="ri-save-line mr-2"></i>Сохранить изменения</button>
        </div>
      </form>
    </div>
  </AppModal>

  <AppModal v-else :model-value="true" size="sm" custom-chrome @close="closeCurrent" @update:modelValue="closeCurrent">
    <div class="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center space-x-3"><div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center"><i class="ri-delete-bin-line text-red-600"></i></div><h3 class="text-lg font-semibold text-gray-900">Удаление пользователя</h3></div>
        <button class="text-gray-400 hover:text-gray-600" @click="closeCurrent"><i class="ri-close-line text-xl"></i></button>
      </div>
      <div class="mb-6">
        <div class="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg mb-4">
          <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0"><span class="text-white font-medium text-sm">{{ user.initials }}</span></div>
          <div><p class="font-medium text-gray-900">{{ user.name }}</p><p class="text-sm text-gray-500">{{ user.roleText }} • {{ user.department }}</p><p class="text-sm text-gray-500">{{ user.email }}</p></div>
        </div>
        <p class="text-sm text-gray-600">Вы действительно хотите удалить этого пользователя из системы?</p>
      </div>
      <div class="flex justify-end space-x-3">
        <button class="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap" @click="closeCurrent">Отмена</button>
        <button class="px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700 whitespace-nowrap flex items-center space-x-2"><i class="ri-delete-bin-line"></i><span>Удалить пользователя</span></button>
      </div>
    </div>
  </AppModal>
</template>
