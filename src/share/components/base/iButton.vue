<script lang="ts" setup>
import { PropType } from "vue";

defineProps({
  variant: {
    type: String as PropType<"primary" | "secondary" | "danger" | "success" | "outline">,
    default: () => "primary",
  },
  size: {
    type: String as PropType<"sm" | "md" | "lg">,
    default: () => "md",
  },
  className: {
    type: String as PropType<string>,
    default: () => "",
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: () => false,
  },
  loading: {
    type: Boolean as PropType<boolean>,
    default: () => false,
  },
});

const baseClasses =
  "inline-flex items-center justify-center font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

const variantClasses = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  secondary: "bg-gray-600 hover:bg-gray-700 text-white",
  danger: "bg-red-600 hover:bg-red-700 text-white",
  success: "bg-green-600 hover:bg-green-700 text-white",
  outline: "border border-gray-300 hover:bg-gray-50 text-gray-700",
};

const sizeClasses = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};
</script>

<template>
  <button :class="`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`" :disabled="disabled || loading">
    <i v-if="loading" class="ri-loader-4-line animate-spin mr-2"></i>
    <slot></slot>
  </button>
</template>
