<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "@/entities";
import Header from "@/share/components/features/Header.vue";
import Sidebar from "@/share/components/features/Sidebar.vue";
import ModalHost from "@/share/components/modals/ModalHost.vue";
import { routeDataKeyByRouteName } from "@/share/libs/appDataService";
import { useAppData } from "@/share/libs/useAppData";
import { socket } from "@/main";

const route = useRoute();
const store = useStore();
const { ensureStaticCatalogs, ensureRouteData } = useAppData();
const isMobileSidebarOpen = ref(false);

onMounted(() => {
  store.dispatch("auth/initFromCookie").then(() => socket.connect());
});

watch(
  () => route.name,
  async (routeName) => {
    isMobileSidebarOpen.value = false;
    store.dispatch("auth/initFromCookie");
    await ensureStaticCatalogs();
    const key = routeName ? routeDataKeyByRouteName[String(routeName)] : undefined;
    if (key) {
      await ensureRouteData(key);
    }
  },
  { immediate: true },
);
</script>

<template>
  <div class="flex h-screen bg-gray-100">
    <Sidebar :mobile-open="isMobileSidebarOpen" @close="isMobileSidebarOpen = false" />
    <div class="flex min-w-0 flex-1 flex-col overflow-hidden">
      <Header :on-menu-click="() => (isMobileSidebarOpen = true)" />
      <main class="flex-1 overflow-y-auto">
        <RouterView />
      </main>
    </div>
    <ModalHost />
  </div>
</template>
