<template>
  <div class="bg-white rounded-lg border shadow text-left overflow-hidden">
    <div class="flex justify-between items-center bg-gray-100 px-6 py-6 mb-5">
      <div>
        <input
          v-model="queryParams.search"
          placeholder="Search full name and email"
          class="border text-sm px-3 py-2 rounded-lg outline-none focus:border-[#2c3e50]/20 w-[300px]"
        />
      </div>
      <!-- <button
        class="flex items-center justify-between text-sm rounded-lg bg-[#2c3e50] border border-[#2c3e50] text-white px-5 py-2 hover:opacity-90 active:scale-95"
      >
        Add reservation
      </button> -->
    </div>
    <div class="w-full pb-6">
      <table class="w-full" v-if="!loading">
        <thead class="w-full">
          <tr class="w-full">
            <th
              v-for="th in thead"
              :key="th"
              class="px-6 py-4 text-xs font-semibold capitalize border-b"
            >
              {{ th }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(td, tid) in tbody" :key="tid" class="border-b">
            <td class="px-6 py-6 text-sm font-normal capitalize">
              {{ moment(td.created_at).format("l") }}
            </td>
            <td class="px-6 py-6 text-sm font-normal capitalize">
              {{ td.booking_no }}
            </td>
            <td class="px-6 py-6 text-sm font-normal capitalize">
              {{ td.user.name }}
            </td>
            <td class="px-6 py-6 text-sm font-normal capitalize">
              {{ td.user.email }}
            </td>
            <td class="px-6 py-6 text-sm font-normal capitalize">
              {{ moment(td.check_in).format("ll") }}
            </td>
            <td class="px-6 py-6 text-sm font-normal capitalize">
              {{ moment(td.check_out).format("ll") }}
            </td>
            <td
              class="px-4 py-6 text-sm font-normal capitalize flex gap-x-5 justify-center"
            >
              <button
                class="text-xs"
                @click="
                  () => {
                    booking = td;
                    isOpen = true;
                  }
                "
              >
                View
              </button>

              <button class="text-xs" @click="handleDelete(td.id)">Drop</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="!loading">
        <PaginationComponent />
      </div>
    </div>
    <div>
      <AppLoader v-if="loading" />
    </div>
  </div>
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
              <ViewReservation v-if="isOpen" :booking="booking" />
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<script setup>
import { reactive, provide, onMounted, ref, watch } from "vue";
import PaginationComponent from "@/components/PaginationComponent.vue";
import { getReservations, dropReservation } from "@/services/roomservice";
import debounce from "lodash/debounce";
import moment from "moment";
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import ViewReservation from "./ViewReservation.vue";
import { useToast } from "vue-toast-notification";
import AppLoader from "@/components/AppLoader";

const toast = useToast();
const booking = ref(null);
const isOpen = ref(false);
const queryParams = reactive({
  pageNumber: 1,
  pageSize: 10,
  pageCount: 0,
  total: 0,
  search: "",
});

provide("queryParams", queryParams);
const thead = [
  "date",
  "booking no",
  "name",
  "email",
  "Arrival",
  "departure",
  "price",
  "",
];
const tbody = ref([]);
const loading = ref(true);
onMounted(() => {
  getData();
});

function getData() {
  loading.value = true;
  getReservations(queryParams).then((res) => {
    if (res.status === 200) {
      tbody.value = res.data.data;
      queryParams.total = res.data.total;
      loading.value = false;
    }
  });
}

const debounceSearch = debounce(() => {
  getData();
}, 1500);
watch(
  () => queryParams.search,
  () => {
    debounceSearch();
  }
);
watch(
  () => [queryParams.pageNumber],
  () => {
    getData();
  }
);
function handleDelete(id) {
  const conf = confirm("Are you sure?");
  if (conf) {
    dropReservation(id)
      .then(() => {
        toast.success("Remove success");
        getData();
      })
      .catch((err) => {
        toast.error(err.response.data.errors);
      });
  }
}
provide("getData", getData);
provide("isOpen", isOpen);
</script>
