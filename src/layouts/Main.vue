<script setup lang="ts">
import Header from "@/share/components/features/Header.vue";
import Sidebar from "@/share/components/features/Sidebar.vue";
import ModalHost from "@/share/components/modals/ModalHost.vue";
</script>

<template>
  <div class="flex h-screen bg-gray-100">
    <Sidebar />
    <div class="flex min-w-0 flex-1 flex-col overflow-hidden">
      <Header />
      <main class="flex-1 overflow-y-auto">
        <RouterView />
      </main>
    </div>
    <ModalHost />
  </div>
</template>
