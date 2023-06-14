<template>
  <section class="relative pb-16">
    <div class="flex z-[2] w-full border-b border-[#a18463]/20 mb-10 sm:mb-20">
      <div
        class="w-[80%] sm:w-[70%] lg:w-[600px] pt-40 pb-10 text-left px-6 sm:px-8 lg:px-16"
      >
        <div class="mb-4">
          <h1
            class="text-[#2d5c1f] mb-3 lg:mb-6 zendaya text-5xl xl:text-7xl font-bold"
          >
            Manage your bookings
          </h1>
          <p class="text-base xl:text-2xl text-left">
            View your booking history
          </p>
        </div>
      </div>

      <div
        class="flex-1 overflow-hidden bg-[url('@/assets/images/testv.jpeg')] bg-cover bg-center"
      >
        <div
          class="w-full h-full flex justify-start items-center bg-gray-500/20 backdrop-brightness-50"
        ></div>
      </div>
    </div>
    <div class="flex px-6 sm:px-8 lg:px-16 gap-x-16">
      <div
        class="w-full lg:w-[900px] lg:border border-[#a18463]/20 mx-auto rounded-lg mb-10"
      >
        <table class="w-full">
          <thead>
            <tr>
              <th class="px-6 py-2 text-[15px] capitalize border-b">
                Booking no
              </th>
              <th class="px-6 py-2 text-[15px] capitalize border-b">Date</th>
              <th class="pr-6 py-2 text-[15px] font-bold border-b">
                Full name
              </th>
              <th class="px-6 py-2 text-[15px] capitalize border-b">Email</th>
              <th class="px-6 py-2 text-[15px] capitalize border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="pr-6 py-2 text-[15px] font-bold"></td>
              <td class="px-6 py-2 text-[15px] capitalize"></td>
              <td class="pr-6 py-2 text-[15px] font-bold"></td>
              <td class="px-6 py-2 text-[15px] capitalize"></td>
              <td class="px-6 py-2 text-[15px] capitalize">
                <button class="text-sm" type="button" @click="isOpen = true">
                  View
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex-1">
        <SearchBooking />
      </div>
    </div>
  </section>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog as="div" class="relative z-10" @close="isOpen = false">
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
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg p-6"
            >
              <DialogTitle
                as="h3"
                class="text-base font-semibold leading-6 text-gray-900"
                >Booking information</DialogTitle
              >
              <ViewBooking />
              <div
                class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
              >
                <button
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  @click="isOpen = false"
                  ref="cancelButtonRef"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
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
import SearchBooking from "./SearchBooking.vue";
import ViewBooking from "./ViewBooking.vue";

import { ref } from "vue";

const isOpen = ref(false);
// const bookings = ref(1);
</script>
