<script setup lang="ts">
import Card from "@/share/components/base/iCard.vue";
import Button from "@/share/components/base/iButton.vue";
import Input from "@/share/components/base/iInput.vue";
import { computed, ref } from "vue";

const showAddModal = ref(false);
const selectedRole = ref("all");

const roles = ref([
  { value: "all", label: "Все роли" },
  { value: "admin", label: "Администратор" },
  { value: "manager", label: "Менеджер" },
  { value: "technician", label: "Техник" },
  { value: "user", label: "Пользователь" },
]);

const users = ref([
  {
    id: 1,
    name: "Иванов Иван Иванович",
    email: "ivanov@company.ru",
    phone: "+7 (999) 123-45-67",
    role: "admin",
    roleText: "Администратор",
    department: "IT отдел",
    position: "Системный администратор",
    status: "active",
    lastLogin: "2024-12-18 09:30",
    equipmentCount: 3,
    ticketsCount: 12,
  },
  {
    id: 2,
    name: "Петров Петр Петрович",
    email: "petrov@company.ru",
    phone: "+7 (999) 234-56-78",
    role: "manager",
    roleText: "Менеджер",
    department: "Бухгалтерия",
    position: "Главный бухгалтер",
    status: "active",
    lastLogin: "2024-12-18 08:15",
    equipmentCount: 2,
    ticketsCount: 5,
  },
  {
    id: 3,
    name: "Сидоров Сидор Сидорович",
    email: "sidorov@company.ru",
    phone: "+7 (999) 345-67-89",
    role: "technician",
    roleText: "Техник",
    department: "Технический отдел",
    position: "Техник по обслуживанию",
    status: "active",
    lastLogin: "2024-12-17 17:45",
    equipmentCount: 1,
    ticketsCount: 23,
  },
  {
    id: 4,
    name: "Козлов Константин Константинович",
    email: "kozlov@company.ru",
    phone: "+7 (999) 456-78-90",
    role: "user",
    roleText: "Пользователь",
    department: "Отдел продаж",
    position: "Менеджер по продажам",
    status: "active",
    lastLogin: "2024-12-18 10:20",
    equipmentCount: 2,
    ticketsCount: 3,
  },
  {
    id: 5,
    name: "Васильева Анна Васильевна",
    email: "vasilieva@company.ru",
    phone: "+7 (999) 567-89-01",
    role: "user",
    roleText: "Пользователь",
    department: "HR отдел",
    position: "Специалист по кадрам",
    status: "inactive",
    lastLogin: "2024-12-10 16:30",
    equipmentCount: 1,
    ticketsCount: 1,
  },
]);

function getRoleColor(role: string) {
  switch (role) {
    case "admin":
      return "bg-purple-100 text-purple-800";
    case "manager":
      return "bg-blue-100 text-blue-800";
    case "technician":
      return "bg-green-100 text-green-800";
    case "user":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800";
    case "inactive":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function getStatusText(status: string) {
  switch (status) {
    case "active":
      return "Активен";
    case "inactive":
      return "Неактивен";
    default:
      return "Неизвестно";
  }
}

const filteredUsers = computed(() => users.value.filter((user) => selectedRole.value === "all" || user.role === selectedRole.value));
</script>
<template>
  <div class="p-6 space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Пользователи</h1>
        <p class="text-gray-600 mt-1">Управление пользователями и их правами доступа</p>
      </div>
      <div class="flex items-center space-x-3">
        <Button variant="outline" class="whitespace-nowrap">
          <i class="ri-download-line mr-2"></i>
          Экспорт
        </Button>
        <Button @click="() => (showAddModal = true)" class="whitespace-nowrap">
          <i class="ri-user-add-line mr-2"></i>
          Добавить пользователя
        </Button>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card class="text-center">
        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
          <i class="ri-user-line text-xl text-blue-600"></i>
        </div>
        <p class="text-2xl font-bold text-gray-900">{{ users.length }}</p>
        <p class="text-sm text-gray-600">Всего пользователей</p>
      </Card>
      <Card class="text-center">
        <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
          <i class="ri-user-check-line text-xl text-green-600"></i>
        </div>
        <p class="text-2xl font-bold text-gray-900">{{ users.filter((u) => u.status === "active").length }}</p>
        <p class="text-sm text-gray-600">Активных</p>
      </Card>
      <Card class="text-center">
        <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
          <i class="ri-admin-line text-xl text-purple-600"></i>
        </div>
        <p class="text-2xl font-bold text-gray-900">{{ users.filter((u) => u.role === "admin").length }}</p>
        <p class="text-sm text-gray-600">Администраторов</p>
      </Card>
      <Card class="text-center">
        <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
          <i class="ri-tools-line text-xl text-orange-600"></i>
        </div>
        <p class="text-2xl font-bold text-gray-900">{{ users.filter((u) => u.role === "technician").length }}</p>
        <p class="text-sm text-gray-600">Техников</p>
      </Card>
    </div>
    <Card>
      <div class="flex flex-wrap items-center gap-4">
        <div class="flex-1 min-w-64">
          <Input placeholder="Поиск по имени, email, телефону..." class="w-full" />
        </div>

        <div class="flex items-center space-x-2">
          <span class="text-sm text-gray-600 whitespace-nowrap">Роль:</span>
          <select
            :value="selectedRole"
            @change="(e) => selectedRole = (e.target as HTMLInputElement).value"
            class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
          >
            <option v-for="role in roles" :key="role.value" :value="role.value">{{ role.label }}</option>
          </select>
        </div>
      </div>
    </Card>
    <Card>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="text-left py-3 px-4 font-medium text-gray-700">Пользователь</th>
              <th class="text-left py-3 px-4 font-medium text-gray-700">Контакты</th>
              <th class="text-left py-3 px-4 font-medium text-gray-700">Роль</th>
              <th class="text-left py-3 px-4 font-medium text-gray-700">Отдел / Должность</th>
              <th class="text-left py-3 px-4 font-medium text-gray-700">Статус</th>
              <th class="text-left py-3 px-4 font-medium text-gray-700">Активность</th>
              <th class="text-right py-3 px-4 font-medium text-gray-700">Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredUsers" :key="user.id" class="border-b border-gray-100 hover:bg-gray-50">
              <td class="py-4 px-4">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                    <span class="text-white font-medium text-sm">
                      {{
                        user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)
                      }}
                    </span>
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">{{ user.name }}</p>
                    <p class="text-sm text-gray-500">ID: {{ user.id }}</p>
                  </div>
                </div>
              </td>
              <td class="py-4 px-4">
                <div>
                  <p class="text-sm text-gray-900">{{ user.email }}</p>
                  <p class="text-sm text-gray-500">{{ user.phone }}</p>
                </div>
              </td>
              <td class="py-4 px-4">
                <span :class="`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`"> {{ user.roleText }} </span>
              </td>
              <td class="py-4 px-4">
                <div>
                  <p class="text-sm text-gray-900">{{ user.department }}</p>
                  <p class="text-sm text-gray-500">{{ user.position }}</p>
                </div>
              </td>
              <td class="py-4 px-4">
                <span :class="`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`"> {{ getStatusText(user.status) }} </span>
              </td>
              <td class="py-4 px-4">
                <div>
                  <p class="text-sm text-gray-900">Последний вход:</p>
                  <p class="text-sm text-gray-500">{{ user.lastLogin }}</p>
                  <div class="flex items-center space-x-4 mt-1">
                    <span class="text-xs text-gray-500">
                      <i class="ri-computer-line mr-1"></i>
                      {{ user.equipmentCount }} ед.
                    </span>
                    <span class="text-xs text-gray-500">
                      <i class="ri-customer-service-line mr-1"></i>
                      {{ user.ticketsCount }} заявок
                    </span>
                  </div>
                </div>
              </td>
              <td class="py-4 px-4">
                <div class="flex items-center justify-end space-x-2">
                  <button class="p-2 text-gray-400 hover:text-blue-600 cursor-pointer">
                    <i class="ri-eye-line"></i>
                  </button>
                  <button class="p-2 text-gray-400 hover:text-green-600 cursor-pointer">
                    <i class="ri-edit-line"></i>
                  </button>
                  <button class="p-2 text-gray-400 hover:text-red-600 cursor-pointer">
                    <i class="ri-delete-bin-line"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
    <div v-if="showAddModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-900">Добавить пользователя</h3>
          <button @click="() => (showAddModal = false)" class="text-gray-400 hover:text-gray-600 cursor-pointer">
            <i class="ri-close-line text-xl"></i>
          </button>
        </div>
        <form class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Фамилия</label>
              <Input placeholder="Введите фамилию" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Имя</label>
              <Input placeholder="Введите имя" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Отчество</label>
              <Input placeholder="Введите отчество" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <Input type="email" placeholder="user@company.ru" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
              <Input placeholder="+7 (999) 123-45-67" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Роль</label>
              <select class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8">
                <option value="">Выберите роль</option>
                <option value="admin">Администратор</option>
                <option value="manager">Менеджер</option>
                <option value="technician">Техник</option>
                <option value="user">Пользователь</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Отдел</label>
              <Input placeholder="Название отдела" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Должность</label>
              <Input placeholder="Должность сотрудника" />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
            <Input type="password" placeholder="Временный пароль" />
          </div>

          <div class="flex justify-end space-x-3 pt-4">
            <Button variant="outline" @click="() => (showAddModal = false)" class="whitespace-nowrap"> Отмена </Button>
            <Button type="submit" class="whitespace-nowrap"> Добавить пользователя </Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
