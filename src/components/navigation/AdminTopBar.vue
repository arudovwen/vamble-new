<template>
  <div class="flex justify-between items-center h-full">
    <span class="block text-xl capitalize font-bold">{{ route.name }}</span>

    <div class="flex gap-x-10 items-center">
      <div @click="isOpen = true">
        <i class="fa fa-bell text-xl" aria-hidden="true"></i>
      </div>
      <div class="text-left flex gap-x-2 items-center">
        <i class="fa fa-user-circle text-3xl" aria-hidden="true"></i>
        <span>
          <span class="block text-sm capitalize">John Snow</span>
          <span class="block text-xs">Admin</span>
        </span>
      </div>
    </div>
  </div>
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
                class="pointer-events-auto relative w-screen max-w-[330px]"
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
                      Notifications</DialogTitle
                    >
                  </div>
                  <div class="relative mt-6 flex-1 px-4 sm:px-6">
                    <nav class="bg-transparent">
                      <div class="py-4">
                        <ul class="text-left mb-8" v-if="notifications.length">
                          <li
                            v-for="item in notifications"
                            :key="item.title"
                            class="transition-all duration-500 px-2 text-xl text-[#2c3e50]/80 hover:text-gray-700 relative text-left group -mb-1 font-semibold"
                          >
                            <span class="block"> {{ item.title }}</span>
                            <span
                              class="block mx-auto w-1 h-1 rounded-full bg-gray-700 opacity-0 group-hover:opacity-100"
                            ></span>
                          </li>
                        </ul>
                        <div class="text-center p-4 text-sm text-gray-500">
                          No new notificaton
                        </div>
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
import { useRoute } from "vue-router";

const isOpen = ref(false);
const route = useRoute();
const notifications = ref([]);
</script>
