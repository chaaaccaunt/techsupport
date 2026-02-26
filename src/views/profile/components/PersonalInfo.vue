<script lang="ts" setup>
import Button from "@/share/components/base/iButton.vue";
import Input from "@/share/components/base/iInput.vue";
import Card from "@/share/components/base/iCard.vue";
import { computed, ref } from "vue";
import { useStore } from "@/entities";
import { iUserInfo } from "@/entities/store/modules/auth";
import { iDepartment } from "@/entities/store/modules/staff";

interface iPayload {
  lastName: string;
  firstName: string;
  surName: string;
  phone: string;
  position: number;
  department: number;
}

const store = useStore();

const saving = ref(false);
const payload = ref<Partial<iPayload>>({});
const user = computed(() => store.getters["auth/GET_USER"] as iUserInfo);
const departmentsList = computed(() => store.getters["staff/GET_DEPARTMENTS"] as iDepartment[]);
const selectedDepartment = computed(() => departmentsList.value.find((d) => d.id === user.value.staff.department.id));

function handleSaveProfile(e: Event) {}

const handleChange = (e: Event) => {
  const { name, value } = e.target as HTMLInputElement & { name: keyof iPayload };
  const val = parseInt(value, 10);
  if (Number.isNaN(val)) {
    payload.value[name as Exclude<typeof name, "position" | "department">] = value;
  }
  if (val >= 0) {
    payload.value[name as Exclude<typeof name, "lastName" | "firstName" | "surName" | "phone">] = val;
  }
};
</script>

<template>
  <Card>
    <form @submit="handleSaveProfile" class="p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-6">Личная информация</h3>
      <div class="space-y-5">
        <div class="grid grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"> Полное имя <span class="text-red-500">*</span></label>
            <Input name="lastName" :val="user.fullName" @change="handleChange" :placeholder="'Иван Иванов'" :required="true" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"> Полное имя <span class="text-red-500">*</span></label>
            <Input name="firstName" :val="user.fullName" @change="handleChange" :placeholder="'Иван Иванов'" :required="true" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"> Полное имя <span class="text-red-500">*</span></label>
            <Input name="surName" :val="user.fullName" @change="handleChange" :placeholder="'Иван Иванов'" :required="true" />
          </div>
        </div>
        <div class="grid grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"> Email </label>
            <Input type="email" :val="user.email" :disabled="true" class="bg-gray-50 cursor-not-allowed" />
            <p class="text-xs text-gray-500 mt-1">Email нельзя изменить</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"> Телефон </label>
            <Input name="phone" type="tel" :val="user.phone" @change="handleChange" :placeholder="'+7 (999) 123-45-67'" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"> Должность </label>
            <Input name="position" :val="user.staff.position.fullName" @change="handleChange" :placeholder="'Системный администратор'" />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"> Отдел <span class="text-red-500">*</span> </label>
          <select
            name="department"
            :val="user.staff.department.id"
            @change="handleChange"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm cursor-pointer"
            required
          >
            <option :value="null">Выберите отдел</option>
            <option v-for="dep in departmentsList" :key="dep.id" :value="dep.id">{{ dep.shortName }}</option>
          </select>
        </div>
      </div>
      <div class="flex justify-end mt-6 pt-6 border-t">
        <Button v-if="saving" :type="'submit'" :disabled="saving">
          <div class="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
          Сохранение...
        </Button>
        <Button v-else :type="'submit'" :disabled="saving">
          <i class="ri-save-line mr-2"></i>
          Сохранить изменения
        </Button>
      </div>
    </form>
  </Card>
</template>
