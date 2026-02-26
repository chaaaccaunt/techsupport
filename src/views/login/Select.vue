<script lang="ts" setup>
import { computed, ref } from "vue";
import Button from "@/share/components/base/iButton.vue";
import { apiClient } from "@/main";
import { useRouter } from "vue-router";

interface iList {
  shortName: string;
  id: number;
}

interface iSelect {
  select: iList[];
  name: string;
}

const router = useRouter();

const currentPage = ref(0);
const pages = computed(() => ({ from: currentPage.value * 5, to: currentPage.value * 5 + 5 }));

const select = ref<iList[]>([]);
const name = ref("");
const error = ref("");
const sliced = computed(() => select.value.slice(pages.value.from, pages.value.to));

const existSelect = ref<string | null>(null);

try {
  existSelect.value = localStorage.getItem("selectOrg");
} catch (error) {
  localStorage.removeItem("selectOrg");
  apiClient
    .logout()
    .then(() => router.push({ name: "Login" }))
    .catch((error) => {});
}

if (typeof existSelect.value === "string") {
  const data = JSON.parse(existSelect.value) as iSelect;
  select.value = data.select.sort((a, b) => {
    const nA = a.shortName.toUpperCase();
    const nB = b.shortName.toUpperCase();
    if (nA < nB) {
      return -1;
    }
    if (nA > nB) {
      return 1;
    }
    return 0;
  });
  name.value = data.name;
}

function setFrom(e: Event, val: number) {
  e.preventDefault();
  currentPage.value = val - 1;
}

function setOrg(e: Event, id: number) {
  e.preventDefault();
  apiClient
    .select({ id }, "auth/SET_USER")
    .then(() => {
      localStorage.removeItem("selectOrg");
      router.push({ name: "Dashboard" });
    })
    .catch((error) => {});
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
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Здравствуйте, {{ name }}</h1>
          <p class="text-gray-600">выберите организацию для входа</p>
        </div>
        <div class="grid grid-rows-2">
          <div class="grid grid-rows-4 gap-3">
            <Button
              v-for="org in sliced"
              :type="'submit'"
              :class-name="`w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700`"
              @click="(e:Event) => setOrg(e, org.id)"
              >{{ org.shortName }}</Button
            >
          </div>
          <div class="flex items-center justify-center space-x-2">
            <Button :type="'button'" v-for="value in Math.ceil(select.length / 5)" @click="(e: Event) => setFrom(e, value)">{{ value }}</Button>
          </div>
          <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start">
            <i class="ri-error-warning-line text-red-600 text-lg mr-2 flex-shrink-0 mt-0.5"></i>
            <p class="text-sm text-red-800">{{ error }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
