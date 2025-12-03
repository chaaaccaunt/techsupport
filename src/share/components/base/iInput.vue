<script lang="ts" setup>
import { PropType } from "vue";

defineOptions({ inheritAttrs: false });
defineProps({
  label: {
    type: String as PropType<string>,
    required: false,
  },
  className: {
    type: String as PropType<string>,
    required: false,
    default: () => "",
  },
  error: {
    type: String as PropType<string>,
    required: false,
  },
  icon: {
    type: String as PropType<string>,
    required: false,
  },
});
</script>

<template>
  <div class="w-full">
    <label v-if="label" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
    </label>
    <div class="relative">
      <div v-if="icon" class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <i :class="`${icon} text-gray-400 text-sm`"></i>
      </div>
      <input
        :class="`
            block w-full rounded-md border-gray-300 shadow-sm 
            focus:border-blue-500 focus:ring-blue-500 text-sm
            ${icon ? 'pl-10' : 'pl-3'} pr-3 py-2
            ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
            ${className}
          `"
        v-bind="$attrs"
      />
    </div>
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
  </div>
</template>
