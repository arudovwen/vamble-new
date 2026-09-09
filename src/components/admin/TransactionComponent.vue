<template>
  <div
    class="bg-white rounded-2xl border border-[#9B7846]/20 shadow-sm text-left overflow-hidden"
  >
    <!-- Toolbar -->
    <div
      class="p-6 border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#FAF8F5]"
    >
      <div class="relative w-full sm:w-80">
        <i
          class="fa fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs"
        ></i>
        <input
          v-model="queryParams.search"
          placeholder="Search by ref, booking no, customer..."
          class="pl-9 pr-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#9B7846] outline-none text-xs w-full bg-white shadow-xs"
        />
      </div>

      <div class="flex items-center gap-3">
        <button
          @click="getData"
          class="p-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-[#243821] text-xs font-semibold shadow-xs transition-colors"
          title="Refresh"
        >
          <i class="fa fa-sync-alt" :class="{ 'fa-spin': loading }"></i>
        </button>
        <button
          @click="exportToCSV"
          class="inline-flex items-center gap-2 bg-[#243821] hover:bg-[#182716] text-white px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold shadow-sm transition-all active:scale-95"
        >
          <i class="fa fa-file-export"></i>
          <span>Export Ledger</span>
        </button>
      </div>
    </div>

    <!-- Data Table -->
    <div class="w-full overflow-x-auto">
      <div v-if="loading" class="py-16 text-center text-gray-400">
        <i class="fa fa-spinner fa-spin text-2xl text-[#9B7846]"></i>
        <p class="mt-2 text-xs">Loading transaction logs...</p>
      </div>

      <div v-else-if="!tbody.length" class="py-16 text-center text-gray-400">
        <i class="fa fa-credit-card text-3xl mb-2 text-gray-300"></i>
        <p class="text-sm font-medium text-gray-600">
          No transactions recorded
        </p>
        <p class="text-xs text-gray-400 mt-1">
          Payment records from Paystack checkout will appear here
        </p>
      </div>

      <table v-else class="w-full text-left font-sans border-collapse">
        <thead>
          <tr
            class="text-[11px] uppercase tracking-wider text-gray-500 bg-[#FAF8F5] border-b border-gray-200"
          >
            <th class="px-6 py-4 font-bold">Transaction Ref</th>
            <th class="px-6 py-4 font-bold">Date & Time</th>
            <th class="px-6 py-4 font-bold">Payment Gateway</th>
            <th class="px-6 py-4 font-bold">Amount Paid</th>
            <th class="px-6 py-4 font-bold">Booking Reference</th>
            <th class="px-6 py-4 font-bold">Customer</th>
            <th class="px-6 py-4 font-bold">Payment Status</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 text-xs">
          <tr
            v-for="td in tbody"
            :key="td.id"
            class="hover:bg-[#FAF8F5]/60 transition-colors group"
          >
            <td class="px-6 py-4">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center text-xs">
                  <i class="fa fa-receipt"></i>
                </div>
                <div>
                  <span class="font-mono font-bold text-xs text-[#9B7846] block tracking-wide">
                    {{ td.trxref || td.reference || `TRX-${td.id}` }}
                  </span>
                  <span class="text-[10px] text-gray-400">ID #{{ td.id }}</span>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 font-mono text-gray-600 text-xs">
              {{ moment(td.created_at).format("MMM DD, YYYY · HH:mm") }}
            </td>
            <td class="px-6 py-4 capitalize text-gray-700">
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-gray-100 border border-gray-200">
                <i class="fa fa-shield-alt text-emerald-600 text-[10px]"></i>
                <span>{{ td.payment_type || "Paystack Checkout" }}</span>
              </span>
            </td>
            <td class="px-6 py-4">
              <span class="font-serif font-bold text-sm text-[#243821] block">
                {{ currencyFormat(td.amount) }}
              </span>
              <span class="text-[10px] text-gray-400">NGN settled</span>
            </td>
            <td class="px-6 py-4 font-mono font-bold text-xs text-gray-800">
              <span class="px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#9B7846]/30 text-[#9B7846]">
                #{{ td.reservation?.booking_no || td.booking_no || "—" }}
              </span>
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center gap-2">
                <div class="w-7 h-7 rounded-full bg-[#243821]/10 text-[#243821] flex items-center justify-center font-bold text-[11px]">
                  {{ (td.user?.name || "G").charAt(0).toUpperCase() }}
                </div>
                <div>
                  <span class="font-medium text-[#1A1816] block capitalize">{{ td.user?.name || "Guest" }}</span>
                  <span class="text-[10px] text-gray-400 block truncate max-w-[150px]">{{ td.user?.email || "—" }}</span>
                </div>
              </div>
            </td>
            <td class="px-6 py-4">
              <span
                class="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider inline-flex items-center gap-1 border"
                :class="
                  td.reservation?.payment_status === 'paid' ||
                  td.status === 'success' ||
                  td.status === 'paid'
                    ? 'bg-green-50 text-green-800 border-green-200'
                    : 'bg-amber-50 text-amber-800 border-amber-200'
                "
              >
                <span class="w-1.5 h-1.5 rounded-full" :class="td.reservation?.payment_status === 'paid' || td.status === 'success' || td.status === 'paid' ? 'bg-green-600' : 'bg-amber-500'"></span>
                {{ td.reservation?.payment_status || td.status || "Settled" }}
              </span>
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
  </div>
</template>

<script setup>
import { reactive, provide, onMounted, ref, watch, inject } from "vue";
import PaginationComponent from "@/components/PaginationComponent.vue";
import { getTransactions } from "@/services/userservices";
import debounce from "lodash/debounce";
import moment from "moment";

const currencyFormat = inject(
  "currencyFormat",
  (v) => `₦${Number(v || 0).toLocaleString()}`
);

const queryParams = reactive({
  pageNumber: 1,
  pageSize: 15,
  pageCount: 0,
  total: 0,
  search: "",
});

provide("queryParams", queryParams);

const tbody = ref([]);
const loading = ref(true);

onMounted(() => {
  getData();
});

function getData() {
  loading.value = true;
  getTransactions(queryParams)
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

function exportToCSV() {
  if (!tbody.value.length) {
    alert("No records to export");
    return;
  }
  const headers = [
    "Date",
    "Transaction Ref",
    "Channel",
    "Amount",
    "Booking No",
    "Customer",
    "Status",
  ];
  const rows = tbody.value.map((t) => [
    moment(t.created_at).format("YYYY-MM-DD HH:mm"),
    t.trxref || t.reference,
    t.payment_type,
    t.amount,
    t.reservation?.booking_no,
    t.user?.name,
    t.reservation?.payment_status || t.status,
  ]);
  const csvContent =
    "data:text/csv;charset=utf-8," +
    [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute(
    "download",
    `vamble_transactions_${moment().format("YYYYMMDD")}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
</script>
