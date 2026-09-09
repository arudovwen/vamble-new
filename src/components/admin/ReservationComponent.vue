<template>
  <div
    class="bg-white rounded-2xl border border-[#9B7846]/20 shadow-sm text-left overflow-hidden"
  >
    <!-- Filter & Search Toolbar -->
    <div
      class="p-6 border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#FAF8F5]"
    >
      <div class="relative w-full sm:w-80">
        <i
          class="fa fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs"
        ></i>
        <input
          v-model="queryParams.search"
          placeholder="Search guest name or email..."
          class="pl-9 pr-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#9B7846] outline-none text-xs w-full bg-white shadow-xs"
        />
      </div>

      <div class="flex items-center gap-3">
        <button
          @click="getData"
          class="p-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-[#243821] text-xs font-semibold shadow-xs transition-colors"
          title="Refresh table"
        >
          <i class="fa fa-sync-alt" :class="{ 'fa-spin': loading }"></i>
        </button>
        <router-link
          to="/booking"
          target="_blank"
          class="inline-flex items-center gap-2 bg-[#243821] hover:bg-[#182716] text-white px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold shadow-sm transition-all"
        >
          <i class="fa fa-plus"></i>
          <span>New Booking</span>
        </router-link>
      </div>
    </div>

    <!-- Data Table -->
    <div class="w-full overflow-x-auto">
      <div v-if="loading" class="py-16 text-center text-gray-400">
        <i class="fa fa-spinner fa-spin text-2xl text-[#9B7846]"></i>
        <p class="mt-2 text-xs">Loading reservations...</p>
      </div>

      <div v-else-if="!tbody.length" class="py-16 text-center text-gray-400">
        <i class="fa fa-calendar-times text-3xl mb-2 text-gray-300"></i>
        <p class="text-sm font-medium text-gray-600">No reservations found</p>
        <p class="text-xs text-gray-400 mt-1">
          New guest bookings will appear here in real time
        </p>
      </div>

      <table v-else class="w-full text-left font-sans border-collapse">
        <thead>
          <tr
            class="text-[11px] uppercase tracking-wider text-gray-500 bg-[#FAF8F5] border-b border-gray-200"
          >
            <th class="px-6 py-4 font-bold">Booking Reference</th>
            <th class="px-6 py-4 font-bold">Guest Profile</th>
            <th class="px-6 py-4 font-bold">Stay Dates</th>
            <th class="px-6 py-4 font-bold">Folio Bill</th>
            <th class="px-6 py-4 font-bold">Reservation Status</th>
            <th class="px-6 py-4 font-bold text-center">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 text-xs">
          <tr
            v-for="td in tbody"
            :key="td.id"
            class="hover:bg-[#FAF8F5]/60 transition-colors group"
          >
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div
                  class="w-9 h-9 rounded-xl bg-[#9B7846]/10 text-[#9B7846] flex items-center justify-center text-xs border border-[#9B7846]/20 group-hover:bg-[#9B7846] group-hover:text-white transition-colors"
                >
                  <i class="fa fa-calendar-check"></i>
                </div>
                <div>
                  <span class="font-mono font-bold text-xs text-[#9B7846] block tracking-wide">
                    #{{ td.booking_no }}
                  </span>
                  <span class="text-[10px] text-gray-400 font-mono">
                    {{ moment(td.created_at).format("MMM DD, YYYY") }}
                  </span>
                </div>
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-full bg-[#243821]/10 text-[#243821] flex items-center justify-center font-bold text-xs">
                  {{ (td.user?.name || "G").charAt(0).toUpperCase() }}
                </div>
                <div>
                  <span class="font-medium text-[#1A1816] block capitalize">
                    {{ td.user?.name || "Guest" }}
                  </span>
                  <span class="text-[11px] text-gray-400 block truncate max-w-[180px]">
                    {{ td.user?.email || "—" }}
                  </span>
                </div>
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="space-y-0.5">
                <div class="flex items-center gap-1 text-gray-700">
                  <i class="fa fa-arrow-right text-[10px] text-emerald-600"></i>
                  <span class="font-medium">{{ moment(td.check_in).format("MMM DD, YYYY") }}</span>
                </div>
                <div class="flex items-center gap-1 text-gray-400 text-[11px]">
                  <i class="fa fa-arrow-left text-[10px] text-amber-600"></i>
                  <span>{{ moment(td.check_out).format("MMM DD, YYYY") }}</span>
                </div>
              </div>
            </td>
            <td class="px-6 py-4">
              <span class="font-serif font-bold text-sm text-[#243821] block">
                {{ currencyFormat(td.total_price) }}
              </span>
              <span
                class="text-[10px] uppercase tracking-wider font-semibold"
                :class="td.payment_status === 'paid' ? 'text-emerald-700' : 'text-amber-700'"
              >
                {{ td.payment_status || "Paid" }}
              </span>
            </td>
            <td class="px-6 py-4">
              <span
                class="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider inline-flex items-center gap-1 border"
                :class="getStatusClass(td.status)"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-current"></span>
                {{ td.status || "Confirmed" }}
              </span>
            </td>
            <td class="px-6 py-4 text-center">
              <div class="inline-flex items-center gap-2">
                <button
                  @click="openViewModal(td)"
                  class="px-3 py-1.5 rounded-xl bg-[#243821]/10 text-[#243821] hover:bg-[#243821] hover:text-white font-semibold text-xs transition-all active:scale-95 flex items-center gap-1"
                >
                  <i class="fa fa-eye text-[11px]"></i>
                  <span>Folio</span>
                </button>
                <button
                  @click="handleDelete(td.id)"
                  class="w-7 h-7 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all flex items-center justify-center text-xs active:scale-95"
                  title="Remove Reservation"
                >
                  <i class="fa fa-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination Footer -->
    <div
      v-if="!loading && tbody.length"
      class="p-4 border-t border-gray-100 bg-[#FAF8F5]"
    >
      <PaginationComponent />
    </div>

    <!-- View & Check-in Modal -->
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
            class="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />
        </TransitionChild>

        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div
            class="flex min-h-full items-center justify-center p-4 text-center sm:p-0"
          >
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-xl border border-[#9B7846]/20 p-0"
              >
                <ViewReservation v-if="isOpen && booking" :booking="booking" />
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { reactive, provide, onMounted, ref, watch, inject } from "vue";
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

const toast = useToast();
const currencyFormat = inject(
  "currencyFormat",
  (v) => `₦${Number(v || 0).toLocaleString()}`
);

const booking = ref(null);
const isOpen = ref(false);
const loading = ref(true);
const tbody = ref([]);

const queryParams = reactive({
  pageNumber: 1,
  pageSize: 10,
  pageCount: 0,
  total: 0,
  search: "",
});

provide("queryParams", queryParams);
provide("getData", getData);
provide("isOpen", isOpen);

onMounted(() => {
  getData();
});

function getData() {
  loading.value = true;
  getReservations(queryParams)
    .then((res) => {
      if (res.status === 200) {
        tbody.value = res.data.data || [];
        queryParams.total = res.data.total || 0;
      }
      loading.value = false;
    })
    .catch(() => {
      loading.value = false;
    });
}

const debounceSearch = debounce(() => {
  getData();
}, 600);

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

function getStatusClass(status) {
  const s = (status || "").toLowerCase();
  if (s === "checked in")
    return "bg-green-100 text-green-800 border border-green-200";
  if (s === "checked out")
    return "bg-gray-100 text-gray-700 border border-gray-200";
  if (s === "cancelled") return "bg-red-100 text-red-800 border border-red-200";
  return "bg-amber-100 text-amber-800 border border-amber-200";
}

function openViewModal(item) {
  booking.value = item;
  isOpen.value = true;
}

function handleDelete(id) {
  if (window.confirm("Are you sure you want to drop this reservation?")) {
    dropReservation(id)
      .then(() => {
        toast.success("Reservation removed");
        getData();
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.errors || "Error removing reservation"
        );
      });
  }
}
</script>
