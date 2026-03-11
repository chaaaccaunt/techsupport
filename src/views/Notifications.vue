<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useAppData } from "@/share/libs/useAppData";

type NotificationType = "warning" | "info" | "success" | "error";
type FilterType = "all" | NotificationType;

type NotificationItem = {
  id: number;
  text: string;
  type: NotificationType;
  time: string;
  date: string;
  read: boolean;
  category: string;
  kind: string;
  entityType: "created" | "updated" | "deleted";
  createdAt: string;
};

const { routeData } = useAppData();

const filter = ref<FilterType>("all");
const showUnreadOnly = ref(false);
const notifications = ref<NotificationItem[]>([]);

const sourceItems = computed<NotificationItem[]>(() => routeData.value.notifications?.items ?? []);

watch(
  sourceItems,
  (items) => {
    notifications.value = items.map((item) => ({ ...item }));
  },
  { immediate: true },
);

const filters: Array<{ value: FilterType; label: string; icon: string }> = [
  { value: "all", label: "Все", icon: "ri-list-check" },
  { value: "warning", label: "Предупреждения", icon: "ri-error-warning-line" },
  { value: "error", label: "Ошибки", icon: "ri-close-circle-line" },
  { value: "info", label: "Информация", icon: "ri-information-line" },
  { value: "success", label: "Успешные", icon: "ri-checkbox-circle-line" },
];

const typeConfig: Record<NotificationType, { icon: string; color: string; bg: string; badge: string; label: string }> = {
  warning: {
    icon: "ri-error-warning-line",
    color: "text-amber-700",
    bg: "bg-amber-100",
    badge: "bg-amber-50 text-amber-700 ring-amber-200",
    label: "Предупреждение",
  },
  info: {
    icon: "ri-information-line",
    color: "text-sky-700",
    bg: "bg-sky-100",
    badge: "bg-sky-50 text-sky-700 ring-sky-200",
    label: "Информация",
  },
  success: {
    icon: "ri-checkbox-circle-line",
    color: "text-emerald-700",
    bg: "bg-emerald-100",
    badge: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    label: "Успешно",
  },
  error: {
    icon: "ri-close-circle-line",
    color: "text-rose-700",
    bg: "bg-rose-100",
    badge: "bg-rose-50 text-rose-700 ring-rose-200",
    label: "Ошибка",
  },
};

const unreadCount = computed(() => notifications.value.filter((item) => !item.read).length);

const filteredNotifications = computed(() =>
  notifications.value.filter((item) => {
    if (showUnreadOnly.value && item.read) {
      return false;
    }

    if (filter.value !== "all" && item.type !== filter.value) {
      return false;
    }

    return true;
  }),
);

const groupedNotifications = computed(() => {
  const groups = new Map<string, NotificationItem[]>();

  filteredNotifications.value.forEach((item) => {
    const bucket = groups.get(item.date);
    if (bucket) {
      bucket.push(item);
      return;
    }

    groups.set(item.date, [item]);
  });

  return Array.from(groups.entries()).map(([date, items]) => ({ date, items }));
});

function markAllRead() {
  notifications.value = notifications.value.map((item) => ({
    ...item,
    read: true,
  }));
}

function markRead(id: number) {
  notifications.value = notifications.value.map((item) =>
    item.id === id
      ? {
          ...item,
          read: true,
        }
      : item,
  );
}

function deleteNotification(id: number) {
  notifications.value = notifications.value.filter((item) => item.id !== id);
}
</script>

<template>
  <div class="mx-auto max-w-5xl space-y-4 p-4 md:space-y-6 md:p-6">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 class="text-xl font-bold text-gray-900 md:text-2xl">Уведомления</h1>
        <p class="mt-1 text-sm text-gray-500">
          {{ unreadCount > 0 ? `${unreadCount} непрочитанных` : "Все уведомления прочитаны" }}
        </p>
      </div>

      <button
        v-if="unreadCount > 0"
        type="button"
        class="inline-flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700"
        @click="markAllRead"
      >
        <i class="ri-check-double-line mr-2 text-base"></i>
        Прочитать все
      </button>
    </div>

    <section class="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div class="flex flex-wrap items-center gap-3">
        <div class="flex flex-1 flex-wrap gap-2">
          <button
            v-for="item in filters"
            :key="item.value"
            type="button"
            class="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition"
            :class="
              filter === item.value
                ? 'bg-teal-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            "
            @click="filter = item.value"
          >
            <i :class="`${item.icon} text-base`"></i>
            {{ item.label }}
          </button>
        </div>

        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition"
          :class="
            showUnreadOnly
              ? 'bg-gray-900 text-white shadow-sm'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          "
          @click="showUnreadOnly = !showUnreadOnly"
        >
          <i class="ri-eye-off-line text-base"></i>
          Только непрочитанные
        </button>
      </div>
    </section>

    <section
      v-if="groupedNotifications.length === 0"
      class="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center shadow-sm"
    >
      <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
        <i class="ri-notification-off-line text-3xl"></i>
      </div>
      <h2 class="mt-4 text-base font-semibold text-gray-700">Нет уведомлений</h2>
      <p class="mt-1 text-sm text-gray-500">Попробуйте изменить фильтры или показать все записи.</p>
    </section>

    <div v-else class="space-y-6">
      <section v-for="group in groupedNotifications" :key="group.date" class="space-y-3">
        <div class="px-1 text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
          {{ group.date }}
        </div>

        <article
          v-for="notification in group.items"
          :key="notification.id"
          class="flex flex-col gap-4 rounded-2xl border p-4 transition md:flex-row md:items-start"
          :class="
            notification.read
              ? 'border-gray-200 bg-gray-50/80'
              : 'border-teal-200 bg-white shadow-sm shadow-teal-100/60'
          "
        >
          <div
            class="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl"
            :class="typeConfig[notification.type].bg"
          >
            <i
              :class="`${typeConfig[notification.type].icon} ${typeConfig[notification.type].color} text-xl`"
            ></i>
          </div>

          <div class="min-w-0 flex-1">
            <div class="flex flex-wrap items-center gap-2">
              <span
                class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset"
                :class="typeConfig[notification.type].badge"
              >
                {{ typeConfig[notification.type].label }}
              </span>
              <span class="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                {{ notification.category }}
              </span>
              <span v-if="!notification.read" class="inline-flex h-2.5 w-2.5 rounded-full bg-teal-500"></span>
            </div>

            <p class="mt-3 text-sm leading-6" :class="notification.read ? 'text-gray-700' : 'font-semibold text-gray-900'">
              {{ notification.text }}
            </p>

            <div class="mt-2 text-xs text-gray-400">
              {{ notification.time }}
            </div>
          </div>

          <div class="flex items-center gap-2 md:self-center">
            <button
              v-if="!notification.read"
              type="button"
              class="inline-flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 transition hover:bg-teal-50 hover:text-teal-600"
              title="Отметить как прочитанное"
              @click="markRead(notification.id)"
            >
              <i class="ri-check-line text-lg"></i>
            </button>

            <button
              type="button"
              class="inline-flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 transition hover:bg-rose-50 hover:text-rose-600"
              title="Удалить"
              @click="deleteNotification(notification.id)"
            >
              <i class="ri-delete-bin-line text-lg"></i>
            </button>
          </div>
        </article>
      </section>
    </div>
  </div>
</template>
