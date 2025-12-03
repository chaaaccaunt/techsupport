<script lang="ts" setup>
import { PropType, VNode } from "vue";

defineProps({
  className: {
    type: String as PropType<string>,
    required: false,
    default: () => "",
  },
  title: {
    type: String as PropType<string>,
    required: false,
  },
  subtitle: {
    type: String as PropType<string>,
    required: false,
  },
  actions: {
    type: Function as PropType<() => VNode>,
    required: false,
  },
});
</script>

<template>
  <div :class="`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`">
    <div v-if="title || subtitle || actions" class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
      <div>
        <h3 v-if="title" class="text-lg font-medium text-gray-900">{{ title }}</h3>
        <p v-if="subtitle" class="text-sm text-gray-500 mt-1">{{ subtitle }}</p>
      </div>
      <div v-if="actions" class="flex items-center space-x-2">{{ actions }}</div>
    </div>
    <div class="p-6">
      <slot></slot>
    </div>
  </div>
</template>
