<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "@/entities";
import AppModal from "./AppModal.vue";
import { iModalDescriptor } from "@/entities/store/modules/modal";
import { modalTitleMap } from "./modalRegistry";
import { modalComponentRegistry } from "./modalComponents";

const store = useStore();

const stack = computed(() => store.getters["modal/GET_STACK"] as iModalDescriptor[]);
const activeModal = computed(() => store.getters["modal/GET_ACTIVE_MODAL"] as iModalDescriptor | null);
const hasOpenModal = computed(() => store.getters["modal/HAS_OPEN_MODAL"] as boolean);

function closeById(modalId: string) {
  store.dispatch("modal/close", modalId);
}

function resolveTitle(modal: iModalDescriptor) {
  return modal.title || modalTitleMap[modal.key as keyof typeof modalTitleMap] || "Модальное окно";
}

function resolveComponent(modal: iModalDescriptor) {
  return modalComponentRegistry[modal.key as keyof typeof modalComponentRegistry] ?? null;
}
</script>

<template>
  <div v-if="hasOpenModal">
    <template v-for="modal in stack" :key="modal.id">
      <component v-if="resolveComponent(modal)" :is="resolveComponent(modal)" :modal="modal" />
      <AppModal
        v-else
        :model-value="activeModal?.id === modal.id"
        :title="resolveTitle(modal)"
        :description="modal.description"
        :size="modal.size"
        :dismissible="modal.dismissible"
        :confirm-text="modal.confirmText"
        :cancel-text="modal.cancelText"
        :show-footer="false"
        @update:modelValue="closeById(modal.id)"
        @close="closeById(modal.id)"
      >
        <slot :modal="modal">
          <div class="space-y-3">
            <div class="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4 text-sm text-gray-600">
              Контент модалки для ключа <span class="font-medium text-gray-900">{{ modal.key }}</span> еще не подключен.
            </div>
            <div v-if="modal.payload" class="rounded-lg bg-gray-900 p-4 text-xs text-white/90">
              <pre class="whitespace-pre-wrap">{{ JSON.stringify(modal.payload, null, 2) }}</pre>
            </div>
          </div>
        </slot>
      </AppModal>
    </template>
  </div>
</template>
