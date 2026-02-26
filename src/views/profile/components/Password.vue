<script lang="ts" setup>
import Button from "@/share/components/base/iButton.vue";
import Input from "@/share/components/base/iInput.vue";
import Card from "@/share/components/base/iCard.vue";
import { ref } from "vue";

const saving = ref(false);

const payload = ref({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

function handleChangePassword(e: Event) {}
</script>

<template>
  <Card>
    <form @submit="handleChangePassword" class="p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-6">Изменить пароль</h3>
      <div class="space-y-5 max-w-md">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"> Текущий пароль </label>
          <Input :type="'password'" :name="'currentPassword'" :val="payload.currentPassword" onChange="{handleChange}" placeholder="Введите текущий пароль" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"> Новый пароль <span class="text-red-500">*</span> </label>
          <Input :type="'password'" :name="'newPassword'" :val="payload.newPassword" onChange="{handleChange}" placeholder="Минимум 6 символов" required />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"> Подтвердите пароль <span class="text-red-500">*</span> </label>
          <Input :type="'password'" :name="'confirmPassword'" :val="payload.confirmPassword" onChange="{handleChange}" placeholder="Повторите новый пароль" required />
        </div>
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div class="flex">
            <i class="ri-information-line text-blue-600 mr-3 text-lg"></i>
            <div>
              <h4 class="text-sm font-medium text-blue-900 mb-1">Требования к паролю</h4>
              <ul class="text-xs text-blue-700 space-y-1">
                <li>• Минимум 6 символов</li>
                <li>• Используйте комбинацию букв и цифр</li>
                <li>• Избегайте простых паролей</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-end mt-6 pt-6 border-t">
        <Button type="submit" :disabled="saving" v-if="saving">
          <div class="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
          Изменение...
        </Button>
        <Button type="submit" :disabled="saving" v-else>
          <i class="ri-lock-password-line mr-2"></i>
          Изменить пароль
        </Button>
      </div>
    </form>
  </Card>
</template>
