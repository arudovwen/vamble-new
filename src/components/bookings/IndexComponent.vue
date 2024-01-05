<template>
  <section class="relative pb-16 flex-1">
    <div class="flex z-[2] w-full border-[#a18463]/20 mb-10 sm:mb-20">
      <div
        class="w-[80%] sm:w-[70%] lg:w-[600px] pt-40 pb-10 text-left px-6 sm:px-8 lg:px-16"
      >
        <div class="mb-4">
          <h1
            class="text-[#2d5c1f] mb-3 lg:mb-6 zendaya text-4xl xl:text-6xl font-bold"
          >
            Manage your bookings
          </h1>
          <p class="text-base xl:text-xl text-left">
            View your booking history
          </p>
        </div>
      </div>

      <div
        class="flex-1 overflow-hidden bg-[url('@/assets/images/rooms/sitting8.jpg')] bg-cover bg-center"
      >
        <div
          class="w-full h-full flex justify-start items-center bg-gray-500/20 backdrop-brightness-50"
        ></div>
      </div>
    </div>
    <div class="flex px-6 sm:px-8 lg:px-16 gap-x-16">
      <div v-if="userInfo">
        <div
          class="w-full lg:w-[900px] lg:border border-[#a18463]/20 mx-auto rounded-lg mb-10"
        >
          <table class="w-full">
            <thead>
              <tr class="text-left border-b">
                <th class="px-6 py-3 text-sm capitalize">Date</th>
                <th class="px-6 py-3 text-sm capitalize">Booking no</th>

                <th class="px-6 py-3 text-sm font-bold">Full name</th>

                <th class="px-6 py-3 text-sm capitalize"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="text-left border-b"
                v-for="item in bookings"
                :key="item.id"
              >
                <td class="px-6 py-3 text-[15px] capitalize">
                  {{ moment(item.created_at).format("ll") }}
                </td>
                <td class="px-6 py-3 text-[15px] font-bold">
                  {{ item.booking_no }}
                </td>
                <td class="px-6 py-3 text-[15px] capitalize">
                  {{ item.user.name }}
                </td>

                <td class="px-6 py-3 text-[15px]">
                  <button
                    class="text-sm"
                    type="button"
                    @click="
                      () => {
                        booking = item;
                        isOpen = true;
                      }
                    "
                  >
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="pb-5">
            <PaginationComponent />
          </div>
        </div>
      </div>
      <div class="flex-1 max-w-sm mx-auto">
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
              <ViewBooking :booking="booking" v-if="isOpen" />
              <div
                class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
              >
                <button
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
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
import moment from "moment";
import PaginationComponent from "@/components/PaginationComponent.vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import SearchBooking from "./SearchBooking.vue";
import ViewBooking from "./ViewBooking.vue";
import { findBookings } from "@/services/roomservice";
import store from "@/store";
import { ref, computed, reactive, onMounted, provide, watch } from "vue";
import { useToast } from "vue-toast-notification";

const toast = useToast();
const isOpen = ref(false);
const bookings = ref([]);
const booking = ref(null);
const queryParams = reactive({
  pageNumber: 1,
  pageSize: 10,
  pageCount: 0,
  total: 0,
});
const userInfo = computed(() => store.getters.userInfo);
const isLoading = ref(false);
onMounted(() => {
  getBookings();
});
function getBookings() {
  if (!userInfo.value) return;
  findBookings(queryParams)
    .then((res) => {
      if (res.status === 200) {
        bookings.value = res.data.data;
        queryParams.total = res.data.total;
        isLoading.value = false;
      }
    })
    .catch((err) => {
      toast.error(err.response.data.message);
      isLoading.value = false;
    });
}
watch(
  () => [queryParams.pageNumber],
  () => {
    getBookings(queryParams);
  }
);
provide("queryParams", queryParams);
</script>
