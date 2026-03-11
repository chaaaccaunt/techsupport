<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Main from "./layouts/Main.vue";
import Auth from "./layouts/Auth.vue";
import FeedbackHost from "./share/components/features/FeedbackHost.vue";

const route = useRoute();

const components = {
  main: Main,
  auth: Auth,
};

const layouts = computed(() => components[route.meta.layout]);
</script>

<template>
  <component :is="layouts"></component>
  <FeedbackHost />
</template>

<style lang="scss">
html,
body {
  height: 100%;
}
</style>
