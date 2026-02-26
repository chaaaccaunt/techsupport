<script setup lang="ts">
import Header from "@/share/components/features/Header.vue";
import Sidebar from "@/share/components/features/Sidebar.vue";
import { useStore } from "@/entities";
import { computed, onMounted } from "vue";
import { socket } from "@/main";

const store = useStore();

try {
  const user = JSON.parse(decodeURIComponent(document.cookie.split("=")[1]));
  if (user) {
    store.commit("auth/SET_USER", user);
    socket.connect();
  }
} catch (error) {}
</script>

<template>
  <div class="flex h-screen bg-gray-100">
    <Sidebar />
    <div class="flex-1 flex flex-col overflow-hidden">
      <Header></Header>
      <main className="flex-1 overflow-y-auto">
        <RouterView />
      </main>
    </div>
  </div>
</template>
