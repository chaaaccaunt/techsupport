<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    title?: string;
    description?: string;
    size?: "sm" | "md" | "lg" | "xl" | "full";
    dismissible?: boolean;
    confirmText?: string;
    cancelText?: string;
    showFooter?: boolean;
    customChrome?: boolean;
  }>(),
  {
    title: "",
    description: "",
    size: "md",
    dismissible: true,
    confirmText: "Подтвердить",
    cancelText: "Отмена",
    showFooter: false,
    customChrome: false,
  },
);

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "close"): void;
  (e: "confirm"): void;
  (e: "cancel"): void;
}>();

const sizeClass = computed(() => {
  if (props.size === "sm") return "max-w-md";
  if (props.size === "lg") return "max-w-3xl";
  if (props.size === "xl") return "max-w-5xl";
  if (props.size === "full") return "max-w-[min(96vw,1280px)]";
  return "max-w-2xl";
});

function closeModal() {
  if (!props.dismissible) return;
  emit("update:modelValue", false);
  emit("close");
}

function cancelModal() {
  emit("cancel");
  closeModal();
}

function confirmModal() {
  emit("confirm");
}

function handleKeydown(event: KeyboardEvent) {
  if (!props.modelValue) return;
  if (event.key === "Escape") {
    closeModal();
  }
}

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <Teleport to="body">
    <div v-if="modelValue" class="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/50" @click="closeModal"></div>

      <section :class="`relative z-[1001] w-full overflow-hidden rounded-xl bg-white shadow-2xl ${sizeClass}`">
        <template v-if="customChrome">
          <slot />
        </template>
        <template v-else>
          <header class="flex items-start justify-between border-b border-gray-200 p-6">
            <div class="pr-4">
              <h2 v-if="title" class="text-lg font-semibold text-gray-900">{{ title }}</h2>
              <p v-if="description" class="mt-1 text-sm text-gray-600">{{ description }}</p>
            </div>
            <button
              v-if="dismissible"
              class="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
              @click="closeModal"
            >
              <i class="ri-close-line text-xl"></i>
            </button>
          </header>

          <div class="max-h-[70vh] overflow-y-auto p-6">
            <slot />
          </div>

          <footer v-if="showFooter" class="flex items-center justify-end gap-3 border-t border-gray-200 bg-gray-50 p-6">
            <button class="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100" @click="cancelModal">
              {{ cancelText }}
            </button>
            <button class="rounded-lg bg-teal-600 px-4 py-2 text-sm text-white transition-colors hover:bg-teal-700" @click="confirmModal">
              {{ confirmText }}
            </button>
          </footer>
        </template>
      </section>
    </div>
  </Teleport>
</template>
