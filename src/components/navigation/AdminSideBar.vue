<template>
  <nav class="flex flex-col justify-between h-full">
    <div>
      <div class="px-6 py-6 mb-6">
        <router-link to="/">
          <img
            src="@/assets/logo.png"
            class="h-[50px] w-36"
            width="80"
            height="50"
            alt="logo"
        /></router-link>
      </div>
      <ul class="flex flex-col gap-5 text-left">
        <router-link
          v-for="item in navigations"
          :key="item.title"
          :to="item.url"
        >
          <li
            class="transition-all duration-500 px-6 py-2 text-[15px] hover:text-[#2d5c1f] relative group font-medium"
          >
            <span class="flex gap-x-4 items-center">
              <i :class="`fa ${item.icon}`" aria-hidden="true"></i>
              {{ item.title }}</span
            >
          </li>
        </router-link>
      </ul>
    </div>
    <div class="px-6 text-left py-6">
      <ul>
        <li
          @click="handleLogout"
          class="transition-all duration-500 px-2 text-[15px] hover:text-[#2d5c1f] relative group font-medium cursor-pointer"
        >
          <span class="flex gap-x-4 items-center"
            ><i class="fas fa-sign-out-alt"></i> Logout</span
          >
        </li>
      </ul>
    </div>
  </nav>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog as="div" class="relative z-10" @close="isOpen = false">
      <TransitionChild
        as="template"
        enter="ease-in-out duration-500"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in-out duration-500"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div
            class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10"
          >
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel
                class="pointer-events-auto relative w-screen max-w-sm"
              >
                <TransitionChild
                  as="template"
                  enter="ease-in-out duration-500"
                  enter-from="opacity-0"
                  enter-to="opacity-100"
                  leave="ease-in-out duration-500"
                  leave-from="opacity-100"
                  leave-to="opacity-0"
                >
                  <div
                    class="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4"
                  >
                    <button
                      type="button"
                      class="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                      @click="isOpen = false"
                    >
                      <span class="sr-only">Close panel</span>
                      <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </TransitionChild>
                <div
                  class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl"
                >
                  <div class="px-4 sm:px-6">
                    <DialogTitle
                      class="text-base font-semibold leading-6 text-gray-900"
                    >
                      <router-link to="/">
                        <img
                          src="@/assets/logo.png"
                          class="h-auto w-44"
                          width="80"
                          height="50"
                          alt="logo" /></router-link
                    ></DialogTitle>
                  </div>
                  <div class="relative mt-6 flex-1 px-4 sm:px-6">
                    <nav class="bg-transparent">
                      <div class="grid gap-4 justify-between items-center py-4">
                        <ul class="grid gap-4 text-left mb-8">
                          <router-link
                            v-for="item in mobileNavigations"
                            :key="item.title"
                            :to="item.url"
                          >
                            <li
                              class="transition-all duration-500 px-2 text-xl text-[#2c3e50]/80 hover:text-gray-700 relative text-left group -mb-1 font-semibold"
                            >
                              <span class="block"> {{ item.title }}</span>
                              <span
                                class="block mx-auto w-1 h-1 rounded-full bg-gray-700 opacity-0 group-hover:opacity-100"
                              ></span>
                            </li>
                          </router-link>
                        </ul>
                      </div>
                      <div class="sm:pr-8 xl:pr-16 block">
                        <router-link
                          to="/booking"
                          v-if="route.name !== 'booking'"
                        >
                          <button
                            type="button"
                            class="text-[#2c3e50] border-[#2c3e50] font-semibold rounded-lg px-8 py-3 text-base uppercase border-2 w-full hover:opacity-85 active:scale-95"
                          >
                            book now
                          </button>
                        </router-link>
                        <router-link
                          to="/bookings"
                          v-if="route.name === 'booking'"
                        >
                          <button
                            type="button"
                            class="text-[#2c3e50] border-[#2c3e50] rounded-lg px-8 py-3 text-base uppercase border-2 w-full font-semibold hover:opacity-85 active:scale-95"
                          >
                            View bookings
                          </button>
                        </router-link>
                      </div>
                    </nav>
                  </div>
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
import { ref } from "vue";
import { logOut } from "@/services/authservices";

const isOpen = ref(false);
const navigations = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: "fa-tachometer-alt",
  },
  {
    title: "Reservations",
    url: "/admin/reservations",
    icon: "fa-list-alt",
  },
  {
    title: "User management",
    url: "/admin/user-management",
    icon: "fa-users",
  },
  {
    title: "Transactions",
    url: "/admin/transactions",
    icon: "fa-credit-card",
  },
  {
    title: "Rooms",
    url: "/admin/rooms",
    icon: "fa-bed",
  },
  {
    title: "Calendar",
    url: "/admin/calendar",
    icon: "fa-calendar",
  },
  {
    title: "Coupons",
    url: "/admin/coupons",
    icon: "fa-tags",
  },
];
function handleLogout() {
  logOut();
}
</script>
<style lang="scss" scoped>
nav {
  .router-link-exact-active li {
    background: rgba(45 92 31 / 0.08) !important;
    color: #2d5c1f !important;
    border-right: 2px solid #2d5c1f;
  }
}
</style>
