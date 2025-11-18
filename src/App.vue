<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Main from "./layouts/Main.vue";
import Auth from "./layouts/Auth.vue";

const route = useRoute();

const components = {
  main: Main,
  auth: Auth,
};

const layouts = computed(() => components[route.meta.layout]);
</script>

<template>
  <component :is="layouts"></component>
</template>

<style lang="scss">
html,
body {
  height: 100%;
}
</style>
