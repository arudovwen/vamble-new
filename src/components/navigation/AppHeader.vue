<template>
  <nav
    class="bg-transparent absolute w-full top-0 z-[3] h-[85px] flex justify-between items-center"
  >
    <div
      class="flex sm:gap-x-12 justify-between items-center border-b-2 border-[#a18463]/20 px-6 sm:px-8 lg:px-16 py-4 w-[80%] sm:w-[70%] lg:w-[600px]"
    >
      <router-link to="/">
        <img
          src="@/assets/logo.png"
          class="h-[50px] w-36"
          width="80"
          height="50"
          alt="logo"
      /></router-link>
      <ul class="lg:flex gap-x-2 hidden">
        <router-link
          v-for="item in navigations"
          :key="item.title"
          :to="item.url"
        >
          <li
            class="transition-all duration-500 px-2 text-sm text-gray-500 hover:text-gray-700 relative text-center group -mb-1 font-semibold"
          >
            <span class="block"> {{ item.title }}</span>
            <span
              class="block mx-auto w-1 h-1 rounded-full bg-gray-700 opacity-0 group-hover:opacity-100"
            ></span>
          </li>
        </router-link>
      </ul>
    </div>
    <div class="sm:pr-8 xl:pr-16 hidden lg:flex gap-x-5">
      <router-link to="/booking" v-if="route.name !== 'booking'">
        <button
          type="button"
          class="text-white px-8 py-3 rounded-sm text-sm uppercase border-2 font-semibold border-white hover:opacity-85 active:scale-95"
        >
          book now
        </button>
      </router-link>
      <router-link to="/bookings" v-if="route.name === 'booking'">
        <button
          type="button"
          class="text-white px-8 py-3 rounded-sm text-sm uppercase border-2 font-semibold border-white hover:opacity-85 active:scale-95"
        >
          View bookings
        </button>
      </router-link>
      <router-link to="/login" v-if="!userInfo && !userInfo.name">
        <button
          type="button"
          class="text-white px-8 py-3 rounded-sm text-sm uppercase border-2 font-semibold border-white hover:opacity-85 active:scale-95"
        >
          Login
        </button>
      </router-link>

      <Menu as="div" v-else class="relative inline-block text-left">
        <MenuButton
          class="relative text-white px-3 py-2 rounded-sm flex items-center gap-x-3 text-sm uppercase border-2 font-semibold border-white hover:opacity-85 active:scale-95"
        >
          <i class="fa fa-user-circle-o text-xl" aria-hidden="true"></i>
          {{ userInfo.name }}</MenuButton
        >
        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <MenuItems
            class="absolute bg-white right-0 mt-2 w-full rounded-lg shadow-lg origin-top-right divide-y divide-gray-100 p-4"
          >
            <MenuItem v-if="userInfo.role_id === 1" as="div" class="mb-2"
              ><router-link to="/admin/dashboard">
                <span>Dashboard </span>
              </router-link>
            </MenuItem>
            <MenuItem @click="logOut" as="div">Logout </MenuItem>
          </MenuItems>
        </transition>
      </Menu>
    </div>
    <div
      class="bg-[#f6f3e9] p-1 rounded-sm mr-6 sm:mr-8 lg:hidden"
      @click="isOpen = true"
    >
      <Bars3BottomRightIcon class="w-6 h-6" />
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
import { Bars3BottomRightIcon } from "@heroicons/vue/24/outline";
import { useRoute } from "vue-router";
import { ref, computed } from "vue";
import store from "@/store";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { logOut } from "@/services/authservices";

const isOpen = ref(false);
const route = useRoute();
const navigations = [
  {
    title: "About",
    url: "/about",
  },
  {
    title: "Services",
    url: "/services",
  },
  {
    title: "Enquiries",
    url: "/enquiries",
  },
];
const mobileNavigations = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "About",
    url: "/about",
  },
  {
    title: "Services",
    url: "/services",
  },
  {
    title: "Rooms & Apartments",
    url: "/rooms",
  },
  {
    title: "Bookings",
    url: "/bookings",
  },
  {
    title: "Enquiries",
    url: "/enquiries",
  },
];

const userInfo = computed(() => store.getters.userInfo);
</script>

<style lang="scss" scoped>
nav {
  .router-link-exact-active li {
    color: #2d5c1f !important;
  }
}
</style>
