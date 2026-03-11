<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { apiClient } from "@/main";
import { getNotificationViewItems } from "@/share/mocks/schemaMocks";

const props = defineProps<{
  onMenuClick?: () => void;
}>();

const router = useRouter();
const isDropdownOpen = ref(false);
const isNotificationsOpen = ref(false);

const notifications = computed(() => getNotificationViewItems().slice(0, 3));
const unreadCount = computed(() => getNotificationViewItems().filter((item) => !item.read).length);

function toggleNotifications() {
  isNotificationsOpen.value = !isNotificationsOpen.value;
  isDropdownOpen.value = false;
}

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
  isNotificationsOpen.value = false;
}

function closeMenus() {
  isDropdownOpen.value = false;
  isNotificationsOpen.value = false;
}

function goTo(path: string) {
  closeMenus();
  router.push(path);
}

async function logout() {
  closeMenus();
  try {
    await apiClient.logout();
  } finally {
    router.push("/login");
  }
}

function handleDocumentClick(event: MouseEvent) {
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }

  if (!target.closest("[data-header-menu]")) {
    closeMenus();
  }
}

onMounted(() => {
  document.addEventListener("click", handleDocumentClick);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleDocumentClick);
});
</script>

<template>
  <header class="sticky top-0 z-30 border-b border-gray-200 bg-white px-4 py-3 shadow-sm md:px-6 md:py-4">
    <div class="flex items-center justify-between gap-3">
      <div class="flex min-w-0 items-center gap-3">
        <button
          type="button"
          class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 lg:hidden"
          aria-label="Открыть меню"
          @click="props.onMenuClick?.()"
        >
          <i class="ri-menu-line text-xl"></i>
        </button>

        <h2 class="truncate text-base font-semibold text-gray-900 md:text-xl">Система учета оборудования</h2>
      </div>

      <div class="flex flex-shrink-0 items-center gap-2 md:gap-4">
        <div class="relative hidden md:block">
          <input
            type="text"
            placeholder="Поиск по серийному номеру..."
            class="w-64 rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 lg:w-80"
          />
          <i class="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
        </div>

        <button
          type="button"
          class="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 md:hidden"
          aria-label="Поиск"
        >
          <i class="ri-search-line text-xl"></i>
        </button>

        <div class="relative" data-header-menu>
          <button
            type="button"
            class="relative rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
            @click.stop="toggleNotifications"
          >
            <i class="ri-notification-line text-xl"></i>
            <span
              v-if="unreadCount > 0"
              class="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white"
            >
              {{ unreadCount }}
            </span>
          </button>

          <div
            v-if="isNotificationsOpen"
            class="absolute right-0 mt-2 w-72 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg md:w-80"
          >
            <div class="border-b border-gray-200 p-4">
              <h3 class="font-medium text-gray-900">Уведомления</h3>
            </div>

            <div class="max-h-80 overflow-y-auto">
              <button
                v-for="notification in notifications"
                :key="notification.id"
                type="button"
                class="flex w-full items-start gap-3 border-b border-gray-100 p-4 text-left transition hover:bg-gray-50"
                @click="goTo('/notifications')"
              >
                <div
                  class="mt-2 h-2 w-2 flex-shrink-0 rounded-full"
                  :class="
                    notification.type === 'warning'
                      ? 'bg-amber-500'
                      : notification.type === 'error'
                        ? 'bg-rose-500'
                        : notification.type === 'success'
                          ? 'bg-emerald-500'
                          : 'bg-sky-500'
                  "
                ></div>
                <div class="min-w-0 flex-1">
                  <p class="text-sm text-gray-900">{{ notification.text }}</p>
                  <p class="mt-1 text-xs text-gray-500">{{ notification.time }}</p>
                </div>
              </button>
            </div>

            <div class="p-4">
              <button
                type="button"
                class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700"
                @click="goTo('/notifications')"
              >
                Показать все уведомления
              </button>
            </div>
          </div>
        </div>

        <div class="relative" data-header-menu>
          <button
            type="button"
            class="flex items-center gap-2 rounded-lg px-2 py-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 md:px-3"
            @click.stop="toggleDropdown"
          >
            <div class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600">
              <i class="ri-user-line text-sm text-white"></i>
            </div>
            <span class="hidden text-sm font-medium sm:block">Администратор</span>
            <i class="ri-arrow-down-s-line hidden text-sm sm:block"></i>
          </button>

          <div
            v-if="isDropdownOpen"
            class="absolute right-0 mt-2 w-56 rounded-xl border border-gray-200 bg-white py-2 shadow-lg"
          >
            <button
              type="button"
              class="flex w-full items-center px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-100"
              @click="goTo('/profile')"
            >
              <i class="ri-user-settings-line mr-3"></i>
              Профиль
            </button>
            <button
              type="button"
              class="flex w-full items-center px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-100"
              @click="goTo('/settings')"
            >
              <i class="ri-settings-line mr-3"></i>
              Настройки
            </button>
            <div class="my-2 border-t border-gray-100"></div>
            <button
              type="button"
              class="flex w-full items-center px-3 py-2 text-sm text-red-600 transition hover:bg-red-50"
              @click="logout"
            >
              <i class="ri-logout-box-line mr-3"></i>
              Выход
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
