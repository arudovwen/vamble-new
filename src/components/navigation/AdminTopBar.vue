<template>
  <div class="flex justify-between items-center h-full py-4">
    <span class="block text-xl capitalize font-bold">{{ route.name }}</span>

    <div class="flex gap-x-10 items-center">
      <div @click="isOpen = true">
        <i class="fa fa-bell text-xl" aria-hidden="true"></i>
      </div>
      <div class="text-left flex gap-x-2 items-center">
        <i class="fa fa-user-circle text-3xl" aria-hidden="true"></i>
        <span>
          <span class="block text-sm capitalize">{{ userInfo.name }}</span>
          <span class="block text-xs">Administrator</span>
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
                      class="text-base font-semibold leading-6 text-gray-900 text-left"
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
                            :key="item.id"
                            @click="handleNotify(item.id)"
                            class="transition-all duration-500 px-2 text-sm py-2 bg-gray-50 text-[#2c3e50]/80 hover:text-gray-700 relative text-left group mb-2 font-semibold"
                          >
                            <span class="block"> {{ item.data.body }}</span>
                          </li>
                        </ul>
                        <div
                          v-else
                          class="text-center p-4 text-sm text-gray-500"
                        >
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
import { ref, computed, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import store from "@/store";
import { getNotifications, markNotification } from "@/services/userservices";

const router = useRouter();
const userInfo = computed(() => store.getters.userInfo);
const isOpen = ref(false);
const route = useRoute();
const notifications = ref([]);
const queryParams = reactive({
  pageNumber: 1,
  pageSize: 20,
  pageCount: 0,
  total: 0,
  search: "",
});

onMounted(() => {
  getNotifications(queryParams).then((res) => {
    if (res.status === 200) {
      notifications.value = res.data.data;
    }
  });
});

function handleNotify(id) {
  markNotification(id).then((res) => {
    if (res.status === 200) {
      router.push("/admin/reservations");
    }
  });
}
</script>
