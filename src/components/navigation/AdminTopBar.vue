<template>
  <div class="flex justify-between items-center h-full">
    <!-- Left: Hamburger on Mobile + Breadcrumb & Page Title -->
    <div class="flex items-center gap-3 text-left">
      <button
        type="button"
        @click="$emit('toggle-sidebar')"
        class="lg:hidden p-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-[#243821] transition-colors"
        aria-label="Toggle navigation menu"
      >
        <i class="fa fa-bars text-sm"></i>
      </button>

      <div>
        <div
          class="flex items-center gap-2 text-[10px] sm:text-[11px] text-gray-400 uppercase tracking-widest font-semibold"
        >
          <span class="hidden sm:inline">Admin Console</span>
          <i class="fa fa-chevron-right text-[8px] opacity-60 hidden sm:inline"></i>
          <span class="text-[#9B7846] capitalize">{{ pageTitle }}</span>
        </div>
        <h2
          class="font-serif text-lg sm:text-2xl font-bold text-[#1A1816] tracking-tight truncate max-w-[200px] sm:max-w-none"
        >
          {{ pageTitle }}
        </h2>
      </div>
    </div>

    <!-- Right Controls: Status, Notifications & Profile -->
    <div class="flex items-center gap-4 sm:gap-6">
      <!-- Live API Status Indicator -->
      <div
        class="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold"
      >
        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
        <span class="w-2 h-2 rounded-full bg-emerald-600 -ml-4"></span>
        <span>API Online</span>
      </div>

      <!-- Notifications Bell Button -->
      <button
        @click="isOpen = true"
        class="relative p-2.5 rounded-xl border border-gray-200 hover:border-[#9B7846] text-gray-600 hover:text-[#243821] bg-white transition-colors"
        title="Notifications"
      >
        <i class="fa fa-bell text-sm"></i>
        <span
          v-if="notifications.length"
          class="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#9B7846] text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white shadow-xs"
        >
          {{ notifications.length }}
        </span>
      </button>

      <!-- Admin Profile Pill -->
      <div
        class="flex items-center gap-3 pl-3 sm:pl-4 border-l border-gray-200"
      >
        <div
          class="w-9 h-9 rounded-full bg-[#243821] text-[#c5a880] flex items-center justify-center font-bold text-xs shadow-sm"
        >
          {{ adminInitials }}
        </div>
        <div class="hidden md:block text-left leading-tight">
          <span class="block text-xs font-bold text-[#1A1816] capitalize">{{
            userInfo?.name || "Administrator"
          }}</span>
          <span class="block text-[10px] text-gray-400 font-medium"
            >System Manager</span
          >
        </div>
      </div>
    </div>
  </div>

  <!-- Notifications Drawer -->
  <TransitionRoot as="template" :show="isOpen">
    <Dialog as="div" class="relative z-50" @close="isOpen = false">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div
            class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-4 sm:pl-10"
          >
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-300 sm:duration-500"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-300 sm:duration-500"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel
                class="pointer-events-auto relative w-screen max-w-sm bg-white shadow-2xl flex flex-col"
              >
                <div
                  class="p-6 border-b border-gray-100 flex items-center justify-between bg-[#FAF8F5]"
                >
                  <div class="flex items-center gap-2">
                    <i class="fa fa-bell text-[#9B7846]"></i>
                    <DialogTitle
                      class="font-serif text-lg font-bold text-[#1A1816]"
                    >
                      Notifications
                    </DialogTitle>
                    <span
                      v-if="notifications.length"
                      class="ml-1.5 px-2 py-0.5 rounded-full bg-[#9B7846]/10 text-[#9B7846] text-xs font-bold"
                    >
                      {{ notifications.length }}
                    </span>
                  </div>
                  <button
                    type="button"
                    class="rounded-lg p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                    @click="isOpen = false"
                  >
                    <XMarkIcon class="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>

                <div class="flex-1 overflow-y-auto p-6">
                  <div
                    v-if="loading"
                    class="py-12 text-center text-gray-400 text-sm"
                  >
                    <i
                      class="fa fa-spinner fa-spin text-2xl text-[#9B7846]"
                    ></i>
                    <p class="mt-2">Checking notifications...</p>
                  </div>

                  <div
                    v-else-if="!notifications.length"
                    class="py-16 text-center text-gray-400"
                  >
                    <div
                      class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto text-gray-300 text-xl mb-3"
                    >
                      <i class="fa fa-check"></i>
                    </div>
                    <p class="text-sm font-medium text-gray-600">
                      All caught up!
                    </p>
                    <p class="text-xs text-gray-400 mt-1">
                      No new reservation alerts
                    </p>
                  </div>

                  <ul v-else class="space-y-3 text-left">
                    <li
                      v-for="item in notifications"
                      :key="item.id"
                      @click="handleNotify(item.id)"
                      class="p-4 rounded-xl bg-gray-50 hover:bg-[#FAF8F5] border border-gray-200/80 cursor-pointer transition-all space-y-1.5 group hover:border-[#9B7846]/40"
                    >
                      <div class="flex items-center justify-between">
                        <span class="px-2 py-0.5 rounded-full bg-[#243821]/10 text-[#243821] text-[9px] font-bold uppercase tracking-wider">
                          New Reservation
                        </span>
                        <span
                          class="text-[10px] text-gray-400 font-mono block text-right"
                        >
                          {{ formatTimeAgo(item.created_at) }}
                        </span>
                      </div>
                      <p class="text-xs font-semibold text-gray-800">
                        {{ item.data?.body || "New reservation request" }}
                      </p>
                      <div class="flex items-center justify-between pt-1 text-[11px] text-[#9B7846] font-medium">
                        <span>Open Reservation</span>
                        <i class="fa fa-arrow-right text-[10px] transform group-hover:translate-x-1 transition-transform"></i>
                      </div>
                    </li>
                  </ul>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import store from "@/store";
import { getNotifications, markNotification } from "@/services/userservices";
import moment from "moment";

const router = useRouter();
const route = useRoute();
const userInfo = computed(() => store.getters.userInfo);
const isOpen = ref(false);
const notifications = ref([]);
const loading = ref(true);

const pageTitle = computed(() => {
  if (route.name) return String(route.name);
  const path = route.path.split("/").pop();
  return path ? path.charAt(0).toUpperCase() + path.slice(1) : "Dashboard";
});

const adminInitials = computed(() => {
  const name = userInfo.value?.name || "Admin";
  return name.slice(0, 2).toUpperCase();
});

onMounted(() => {
  getNotifications({ pageNumber: 1, pageSize: 20 })
    .then((res) => {
      if (res?.status === 200 && res.data) {
        notifications.value = res.data.data || [];
      }
      loading.value = false;
    })
    .catch(() => {
      loading.value = false;
    });
});

function formatTimeAgo(inputDate) {
  if (!inputDate) return "recently";
  return moment(inputDate).fromNow();
}

function handleNotify(id) {
  markNotification(id).then(() => {
    router.push("/admin/reservations");
    isOpen.value = false;
  });
}
</script>
