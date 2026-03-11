<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "@/entities";

const store = useStore();
const items = computed(() => store.getters["feedback/items"]);

function dismiss(id: number) {
  store.dispatch("feedback/remove", id);
}

function typeClass(type: string) {
  switch (type) {
    case "success":
      return "border-emerald-200 bg-emerald-50 text-emerald-800";
    case "warning":
      return "border-amber-200 bg-amber-50 text-amber-800";
    case "info":
      return "border-sky-200 bg-sky-50 text-sky-800";
    default:
      return "border-rose-200 bg-rose-50 text-rose-800";
  }
}

function iconClass(type: string) {
  switch (type) {
    case "success":
      return "ri-checkbox-circle-line";
    case "warning":
      return "ri-error-warning-line";
    case "info":
      return "ri-information-line";
    default:
      return "ri-close-circle-line";
  }
}
</script>

<template>
  <div class="pointer-events-none fixed right-4 top-4 z-[100] flex w-full max-w-sm flex-col gap-3">
    <div
      v-for="item in items"
      :key="item.id"
      class="pointer-events-auto rounded-xl border px-4 py-3 shadow-lg"
      :class="typeClass(item.type)"
    >
      <div class="flex items-start gap-3">
        <i class="mt-0.5 text-lg" :class="iconClass(item.type)"></i>
        <div class="min-w-0 flex-1">
          <p class="text-sm font-medium">{{ item.message }}</p>
          <p v-if="item.status" class="mt-1 text-xs opacity-70">HTTP {{ item.status }}</p>
        </div>
        <button type="button" class="rounded-md p-1 opacity-70 transition hover:bg-black/5 hover:opacity-100" @click="dismiss(item.id)">
          <i class="ri-close-line"></i>
        </button>
      </div>
    </div>
  </div>
</template>
