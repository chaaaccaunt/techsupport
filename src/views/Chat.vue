<script setup lang="ts">
import { computed, ref } from "vue";
import { useModal } from "@/share/components/shared/useModal";
import { getChatMessageItems, getChatRoomItems } from "@/share/mocks/schemaMocks";

const search = ref("");
const message = ref("");
const { openModal } = useModal();

const openCreateChatModal = () => openModal({ key: "chat.create", size: "lg" });
const openChatInfoModal = () => openModal({ key: "chat.info", size: "lg", payload: { chatId: "room-general" } });
const openChatMembersModal = () => openModal({ key: "chat.members", size: "lg", payload: { chatId: "room-general" } });
const openDeleteChatModal = () => openModal({ key: "chat.delete", size: "sm", payload: { chatId: "room-general" } });

const unreadCountMap: Record<string, number> = {
  "room-general": 2,
  "room-it": 0,
  "room-ticket-1": 1,
};

const chats = computed(() =>
  getChatRoomItems().map((chat) => ({
    ...chat,
    unreadCount: unreadCountMap[chat.id] ?? 0,
  })),
);

const currentChat = computed(() => chats.value[0]);
const messages = computed(() => getChatMessageItems("room-general"));
</script>

<template>
  <div class="flex h-full overflow-hidden">
    <aside class="flex h-full w-72 flex-shrink-0 flex-col border-r border-gray-200 bg-white">
      <div class="border-b border-gray-200 p-4">
        <div class="mb-3 flex items-center justify-between">
          <h2 class="text-base font-semibold text-gray-900">Чаты</h2>
          <button class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white" @click="openCreateChatModal"><i class="ri-add-line text-lg"></i></button>
        </div>
        <div class="relative">
          <i class="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400"></i>
          <input v-model="search" type="text" placeholder="Поиск чатов..." class="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-sm" />
        </div>
      </div>
      <div class="flex-1 overflow-y-auto p-3">
        <button v-for="chat in chats" :key="chat.id" class="mb-2 flex w-full items-center gap-3 rounded-lg border border-transparent px-3 py-2.5 text-left transition-colors hover:bg-gray-50">
          <div :class="`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${chat.type === 'global' ? 'bg-emerald-100 text-emerald-700' : chat.type === 'department' ? 'bg-amber-100 text-amber-700' : 'bg-sky-100 text-sky-700'}`">
            <i :class="`${chat.type === 'global' ? 'ri-global-line' : chat.type === 'department' ? 'ri-building-line' : 'ri-chat-private-line'} text-lg`"></i>
          </div>
          <div class="min-w-0 flex-1">
            <div class="flex items-center justify-between">
              <span class="truncate text-sm font-medium text-gray-900">{{ chat.name }}</span>
              <span class="ml-2 text-xs text-gray-400">{{ chat.lastMessageTime }}</span>
            </div>
            <div class="mt-0.5 flex items-center justify-between">
              <span class="truncate text-xs text-gray-500">{{ chat.lastMessage }}</span>
              <span v-if="chat.unreadCount" class="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">{{ chat.unreadCount }}</span>
            </div>
          </div>
        </button>
      </div>
    </aside>

    <section class="flex min-w-0 flex-1 flex-col">
      <div class="flex items-center gap-3 border-b border-gray-200 bg-white px-6 py-4">
        <div class="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"><i class="ri-global-line text-lg"></i></div>
        <div class="min-w-0 flex-1">
          <h3 class="truncate text-sm font-semibold text-gray-900">{{ currentChat?.name }}</h3>
          <p class="text-xs text-gray-500">Глобальная комната • {{ currentChat?.membersCount ?? 0 }} участников</p>
        </div>
        <div class="flex items-center gap-2">
          <button class="rounded-lg p-2 text-gray-500 hover:bg-gray-100" @click="openChatInfoModal"><i class="ri-search-line text-lg"></i></button>
          <button class="rounded-lg p-2 text-gray-500 hover:bg-gray-100" @click="openChatMembersModal"><i class="ri-user-add-line text-lg"></i></button>
          <button class="rounded-lg p-2 text-gray-500 hover:bg-gray-100" @click="openDeleteChatModal"><i class="ri-more-2-line text-lg"></i></button>
        </div>
      </div>
      <div class="flex-1 space-y-4 overflow-y-auto bg-gray-50 px-6 py-4">
        <div v-for="item in messages" :key="item.id" :class="`flex items-end gap-2 ${item.isOwn ? 'flex-row-reverse' : 'flex-row'}`">
          <div v-if="!item.isOwn" class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-300 text-xs font-semibold text-gray-700">
            {{ item.senderAvatar }}
          </div>
          <div :class="`flex max-w-[65%] flex-col gap-1 ${item.isOwn ? 'items-end' : 'items-start'}`">
            <span v-if="!item.isOwn" class="ml-1 text-xs text-gray-500">{{ item.senderName }}</span>
            <div :class="`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${item.isOwn ? 'rounded-br-sm bg-blue-600 text-white' : 'rounded-bl-sm border border-gray-200 bg-white text-gray-900 shadow-sm'}`">
              {{ item.text }}
            </div>
            <span class="mx-1 text-xs text-gray-400">{{ item.timestamp }}</span>
          </div>
        </div>
      </div>
      <div class="border-t border-gray-200 bg-white px-6 py-4">
        <div class="flex items-end gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
          <button class="mb-0.5 text-gray-400"><i class="ri-attachment-2 text-lg"></i></button>
          <textarea v-model="message" rows="1" placeholder="Написать сообщение..." class="max-h-32 flex-1 resize-none bg-transparent text-sm text-gray-900 placeholder-gray-400 outline-none"></textarea>
          <button class="mb-0.5 text-gray-400"><i class="ri-emotion-line text-lg"></i></button>
          <button class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white"><i class="ri-send-plane-fill text-sm"></i></button>
        </div>
        <p class="ml-1 mt-1.5 text-xs text-gray-400">Enter - отправить, Shift+Enter - новая строка</p>
      </div>
    </section>
  </div>
</template>
