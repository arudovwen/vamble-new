<template>
  <nav class="flex flex-col justify-between h-full text-white font-sans">
    <div>
      <!-- Brand & Management Label -->
      <div class="px-6 py-6 border-b border-white/10">
        <router-link to="/admin/dashboard" class="flex items-center gap-3">
          <img
            src="@/assets/logo.png"
            class="h-10 w-auto object-contain brightness-0 invert"
            alt="Vamble Suites Logo"
          />
          <div class="text-left">
            <span
              class="block text-[11px] uppercase tracking-widest font-bold text-[#c5a880]"
            >
              Management
            </span>
            <span class="block text-xs text-white/60 font-light"
              >Vamble Portal</span
            >
          </div>
        </router-link>
      </div>

      <!-- Navigation Links -->
      <div class="px-4 py-6">
        <span
          class="block px-4 mb-3 text-[10px] uppercase tracking-widest font-bold text-[#c5a880]/70 text-left"
        >
          Core Operations
        </span>
        <ul class="flex flex-col gap-1.5 text-left">
          <router-link
            v-for="item in navigations"
            :key="item.title"
            :to="item.url"
            v-slot="{ href, navigate, isActive }"
            custom
          >
            <li
              :href="href"
              @click="navigate"
              class="cursor-pointer transition-all duration-300 px-4 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between group"
              :class="[
                isActive
                  ? 'bg-[#9B7846] text-white shadow-md font-semibold'
                  : 'text-white/70 hover:text-white hover:bg-white/5',
              ]"
            >
              <div class="flex items-center gap-3">
                <i
                  :class="[
                    'fa',
                    item.icon,
                    isActive
                      ? 'text-white'
                      : 'text-[#c5a880] group-hover:text-white',
                  ]"
                  class="w-5 text-center text-xs transition-colors"
                ></i>
                <span>{{ item.title }}</span>
              </div>
              <span
                v-if="isActive"
                class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"
              ></span>
            </li>
          </router-link>
        </ul>
      </div>
    </div>

    <!-- Bottom Actions & Admin Profile -->
    <div class="p-4 border-t border-white/10 space-y-3">
      <router-link
        to="/"
        target="_blank"
        class="flex items-center justify-between px-4 py-2 rounded-xl text-xs text-white/70 hover:text-white hover:bg-white/5 transition-colors"
      >
        <span class="flex items-center gap-2">
          <i class="fa fa-external-link-alt text-[10px] text-[#c5a880]"></i>
          <span>View Guest Site</span>
        </span>
        <i class="fa fa-arrow-right text-[10px] opacity-40"></i>
      </router-link>

      <div
        class="bg-white/5 rounded-2xl p-3 border border-white/10 flex items-center justify-between"
      >
        <div class="flex items-center gap-2.5 overflow-hidden">
          <div
            class="w-9 h-9 rounded-full bg-[#9B7846] text-white flex items-center justify-center font-bold text-xs shrink-0"
          >
            VA
          </div>
          <div class="text-left truncate">
            <span class="block text-xs font-semibold text-white truncate">{{
              userInfo?.name || "Administrator"
            }}</span>
            <span
              class="block text-[10px] text-[#c5a880] uppercase tracking-wider"
              >Super Admin</span
            >
          </div>
        </div>

        <button
          @click="handleLogout"
          title="Sign Out"
          class="w-8 h-8 rounded-lg bg-white/10 hover:bg-red-500/20 text-white/80 hover:text-red-300 flex items-center justify-center text-xs transition-colors shrink-0"
        >
          <i class="fa fa-sign-out-alt"></i>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from "vue";
import { logOut } from "@/services/authservices";
import store from "@/store";

const userInfo = computed(() => store.getters.userInfo);

const navigations = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: "fa-tachometer-alt",
  },
  {
    title: "Reservations",
    url: "/admin/reservations",
    icon: "fa-calendar-check",
  },
  {
    title: "Rooms & Suites",
    url: "/admin/rooms",
    icon: "fa-bed",
  },
  {
    title: "Transactions",
    url: "/admin/transactions",
    icon: "fa-credit-card",
  },
  {
    title: "User Management",
    url: "/admin/user-management",
    icon: "fa-users",
  },
  {
    title: "Calendar",
    url: "/admin/calendar",
    icon: "fa-calendar",
  },
  {
    title: "Coupons & Offers",
    url: "/admin/coupons",
    icon: "fa-tags",
  },
];

function handleLogout() {
  logOut();
}
</script>

<style scoped>
/* Sidebar styling */
</style>
