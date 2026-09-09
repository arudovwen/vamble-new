<template>
  <header
    class="sticky top-0 z-40 w-full bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#9B7846]/15 transition-all duration-300"
  >
    <div
      class="max-w-[1440px] mx-auto px-4 sm:px-10 lg:px-16 h-[76px] sm:h-[86px] flex items-center justify-between"
    >
      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-3 group">
        <img
          src="@/assets/logo.png"
          class="h-9 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
          alt="Vamble Apartments & Suites"
          width="130"
          height="48"
        />
      </router-link>

      <!-- Desktop Navigation -->
      <nav class="hidden lg:flex items-center gap-x-8 xl:gap-x-10">
        <router-link
          v-for="item in navigations"
          :key="item.title"
          :to="item.url"
          class="relative py-2 text-sm font-medium text-[#1A1816]/75 hover:text-[#243821] transition-colors duration-200 group"
          active-class="!text-[#243821] font-semibold"
        >
          <span>{{ item.title }}</span>
          <span
            class="absolute bottom-0 left-0 w-full h-[2px] bg-[#243821] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"
            :class="{ '!scale-x-100': route.path === item.url }"
          ></span>
        </router-link>
      </nav>

      <!-- Action Buttons (Desktop) -->
      <div class="hidden lg:flex items-center gap-x-4">
        <!-- Auth / User Menu -->
        <router-link
          v-if="!userInfo || !userInfo.name"
          to="/login"
          class="text-xs uppercase tracking-wider font-semibold text-[#1A1816]/80 hover:text-[#243821] px-4 py-2 transition-colors"
        >
          Sign In
        </router-link>

        <Menu as="div" v-else class="relative inline-block text-left">
          <MenuButton
            class="flex capitalize items-center gap-x-2.5 px-4 py-2 rounded-full border border-[#9B7846]/30 text-xs font-semibold text-[#1A1816] hover:bg-[#9B7846]/10 transition-colors"
          >
            <i class="fa fa-user-circle text-base text-[#243821]"></i>
            <span>{{ userInfo.name }}</span>
            <i class="fa fa-angle-down text-xs opacity-60"></i>
          </MenuButton>

          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <MenuItems
              class="absolute right-0 mt-2 w-56 origin-top-right rounded-2xl bg-white shadow-xl ring-1 ring-black/5 focus:outline-none p-2 divide-y divide-gray-100 font-sans z-50 text-left"
            >
              <div class="px-3 py-2.5">
                <p class="text-xs font-semibold text-[#1A1816]">Signed in as</p>
                <p class="text-xs text-gray-500 truncate mt-0.5">
                  {{ userInfo.email }}
                </p>
              </div>

              <div class="py-1">
                <MenuItem v-slot="{ active }">
                  <router-link
                    to="/account"
                    :class="[
                      active ? 'bg-[#9B7846]/10 text-[#243821]' : 'text-gray-700',
                      'flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl transition-colors',
                    ]"
                  >
                    <i class="fa fa-tachometer text-sm text-[#9B7846]"></i>
                    <span>Guest Portal & Bookings</span>
                  </router-link>
                </MenuItem>

                <MenuItem
                  v-if="parseInt(userInfo.role_id) === 1"
                  v-slot="{ active }"
                >
                  <router-link
                    to="/admin/dashboard"
                    :class="[
                      active ? 'bg-[#9B7846]/10 text-[#243821]' : 'text-gray-700',
                      'flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl transition-colors',
                    ]"
                  >
                    <i class="fa fa-shield text-sm text-[#243821]"></i>
                    <span>Admin Console</span>
                  </router-link>
                </MenuItem>
              </div>

              <div class="pt-1">
                <MenuItem v-slot="{ active }">
                  <button
                    @click="logOut"
                    :class="[
                      active ? 'bg-red-50 text-red-700' : 'text-red-600',
                      'flex w-full items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl transition-colors',
                    ]"
                  >
                    <i class="fa fa-sign-out text-sm"></i>
                    <span>Sign Out</span>
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>

        <router-link to="/booking">
          <button
            type="button"
            class="bg-[#243821] hover:bg-[#182716] text-white px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold shadow-md active:scale-95 transition-all duration-200"
          >
            Reserve Now
          </button>
        </router-link>
      </div>

      <!-- Mobile Hamburger Button -->
      <button
        type="button"
        class="lg:hidden p-2.5 rounded-full text-[#1A1816] hover:bg-[#9B7846]/10 transition-colors"
        @click="isOpen = true"
        aria-label="Open Navigation Menu"
      >
        <Bars3BottomRightIcon class="w-6 h-6" />
      </button>
    </div>

    <!-- Mobile Navigation Drawer -->
    <TransitionRoot as="template" :show="isOpen">
      <Dialog as="div" class="relative z-50 lg:hidden" @close="isOpen = false">
        <TransitionChild
          as="template"
          enter="ease-in-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in-out duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-hidden">
          <div class="absolute inset-0 overflow-hidden">
            <div
              class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-4 sm:pl-10"
            >
              <TransitionChild
                as="template"
                enter="transform transition ease-in-out duration-300"
                enter-from="translate-x-full"
                enter-to="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leave-from="translate-x-0"
                leave-to="translate-x-full"
              >
                <DialogPanel
                  class="pointer-events-auto w-screen max-w-sm bg-[#FAF8F5] shadow-2xl flex flex-col justify-between p-5 sm:p-6 overflow-y-auto"
                >
                  <div>
                    <!-- Drawer Header -->
                    <div
                      class="flex items-center justify-between pb-5 border-b border-[#9B7846]/15"
                    >
                      <router-link to="/" @click="isOpen = false">
                        <img
                          src="@/assets/logo.png"
                          class="h-9 w-auto"
                          alt="Vamble"
                        />
                      </router-link>
                      <button
                        type="button"
                        class="p-2 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                        @click="isOpen = false"
                        aria-label="Close navigation"
                      >
                        <XMarkIcon class="h-6 w-6" />
                      </button>
                    </div>

                    <!-- User Pill in Mobile Drawer if logged in -->
                    <div
                      v-if="userInfo && userInfo.name"
                      class="mt-4 p-3 bg-white rounded-2xl border border-[#9B7846]/20 flex items-center justify-between text-left"
                    >
                      <div class="flex items-center gap-2.5 overflow-hidden">
                        <div
                          class="w-9 h-9 rounded-full bg-[#243821] text-[#c5a880] flex items-center justify-center font-bold text-xs shrink-0"
                        >
                          {{ userInfo.name.charAt(0).toUpperCase() }}
                        </div>
                        <div class="truncate">
                          <span class="block text-xs font-bold text-[#1A1816] truncate">{{ userInfo.name }}</span>
                          <span class="block text-[10px] text-gray-400 truncate">{{ userInfo.email }}</span>
                        </div>
                      </div>
                      <span class="text-[9px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#9B7846]/15 text-[#9B7846]">VIP</span>
                    </div>

                    <!-- Nav Links with touch-friendly targets -->
                    <nav class="mt-6 space-y-1.5 text-left">
                      <router-link
                        v-for="item in mobileNavigations"
                        :key="item.title"
                        :to="item.url"
                        @click="isOpen = false"
                        class="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-[#1A1816]/80 hover:text-[#243821] hover:bg-[#9B7846]/10 transition-colors min-h-[44px]"
                        active-class="!bg-[#243821] !text-white font-semibold"
                      >
                        <span>{{ item.title }}</span>
                        <i class="fa fa-angle-right opacity-40 text-xs"></i>
                      </router-link>

                      <!-- Admin Console Shortcut for Admins -->
                      <router-link
                        v-if="userInfo && parseInt(userInfo.role_id) === 1"
                        to="/admin/dashboard"
                        @click="isOpen = false"
                        class="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-[#9B7846] bg-[#9B7846]/10 hover:bg-[#9B7846]/20 transition-colors min-h-[44px]"
                      >
                        <span class="flex items-center gap-2">
                          <i class="fa fa-shield-alt text-xs"></i>
                          <span>Admin Console</span>
                        </span>
                        <i class="fa fa-angle-right text-xs"></i>
                      </router-link>
                    </nav>

                    <!-- Quick Mobile Concierge Call -->
                    <div class="mt-6 p-4 rounded-2xl bg-[#243821]/5 border border-[#243821]/15 text-left space-y-2">
                      <span class="text-[10px] font-bold uppercase tracking-widest text-[#9B7846] block">Concierge Desk</span>
                      <div class="flex items-center justify-between gap-2">
                        <a
                          href="tel:+2349064645461"
                          class="inline-flex items-center gap-1.5 text-xs font-bold text-[#243821] hover:underline"
                        >
                          <i class="fa fa-phone text-[#9B7846]"></i>
                          <span>+234 906 464 5461</span>
                        </a>
                        <a
                          href="https://wa.me/2349064645461"
                          target="_blank"
                          class="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs shadow-xs"
                          title="WhatsApp Chat"
                        >
                          <i class="fa fa-whatsapp"></i>
                        </a>
                      </div>
                    </div>
                  </div>

                  <!-- Drawer Footer CTAs -->
                  <div class="pt-5 border-t border-[#9B7846]/15 space-y-2.5 text-left">
                    <router-link to="/booking" @click="isOpen = false">
                      <button
                        type="button"
                        class="w-full bg-[#243821] text-white py-3.5 rounded-full text-xs uppercase tracking-wider font-semibold shadow-md active:scale-95 transition-all min-h-[44px]"
                      >
                        Reserve Now
                      </button>
                    </router-link>

                    <div
                      v-if="!userInfo || !userInfo.name"
                      class="text-center pt-1"
                    >
                      <router-link
                        to="/login"
                        @click="isOpen = false"
                        class="text-xs uppercase tracking-wider font-semibold text-[#1A1816]/70 hover:text-[#243821] inline-block py-2"
                      >
                        Already have an account? Sign In
                      </router-link>
                    </div>
                    <div v-else class="text-center pt-1">
                      <button
                        @click="
                          logOut();
                          isOpen = false;
                        "
                        class="text-xs uppercase tracking-wider font-semibold text-red-600 py-2"
                      >
                        Sign Out ({{ userInfo.name }})
                      </button>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </header>
</template>

<script setup>
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { XMarkIcon, Bars3BottomRightIcon } from "@heroicons/vue/24/outline";
import { useRoute } from "vue-router";
import { ref, computed } from "vue";
import store from "@/store";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { logOut } from "@/services/authservices";

const isOpen = ref(false);
const route = useRoute();

const navigations = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "About Us",
    url: "/about",
  },
  {
    title: "Rooms & Suites",
    url: "/rooms",
  },
  {
    title: "Services",
    url: "/services",
  },

  {
    title: "Contact",
    url: "/enquiry",
  },
];

const mobileNavigations = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "About Us",
    url: "/about",
  },
  {
    title: "Rooms & Suites",
    url: "/rooms",
  },
  {
    title: "Services",
    url: "/services",
  },

  {
    title: "My Bookings",
    url: "/bookings",
  },
  {
    title: "Contact & Enquiry",
    url: "/enquiry",
  },
];

const userInfo = computed(() => store.getters.userInfo);
</script>
