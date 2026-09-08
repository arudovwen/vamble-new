<template>
  <div class="bg-white rounded-2xl border border-[#9B7846]/20 shadow-sm text-left overflow-hidden">
    <!-- Toolbar -->
    <div class="p-6 border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#FAF8F5]">
      <div class="relative w-full sm:w-80">
        <i class="fa fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
        <input
          v-model="queryParams.search"
          placeholder="Search by name or email..."
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
          <span>Export Guests</span>
        </button>
      </div>
    </div>

    <!-- Data Table -->
    <div class="w-full overflow-x-auto">
      <div v-if="loading" class="py-16 text-center text-gray-400">
        <i class="fa fa-spinner fa-spin text-2xl text-[#9B7846]"></i>
        <p class="mt-2 text-xs">Loading user registry...</p>
      </div>

      <div v-else-if="!tbody.length" class="py-16 text-center text-gray-400">
        <i class="fa fa-users text-3xl mb-2 text-gray-300"></i>
        <p class="text-sm font-medium text-gray-600">No guests registered yet</p>
        <p class="text-xs text-gray-400 mt-1">Guests will appear here when accounts are registered or bookings created</p>
      </div>

      <table v-else class="w-full text-left font-sans border-collapse">
        <thead>
          <tr class="text-[11px] uppercase tracking-wider text-gray-500 bg-[#FAF8F5] border-b border-gray-200">
            <th class="px-6 py-4 font-bold">Guest Profile</th>
            <th class="px-6 py-4 font-bold">Email</th>
            <th class="px-6 py-4 font-bold">Phone</th>
            <th class="px-6 py-4 font-bold">Address</th>
            <th class="px-6 py-4 font-bold">Nationality</th>
            <th class="px-6 py-4 font-bold">Registered</th>
            <th class="px-6 py-4 font-bold text-center">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 text-xs">
          <tr
            v-for="td in tbody"
            :key="td.id"
            class="hover:bg-[#FAF8F5]/60 transition-colors"
          >
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-[#243821]/10 text-[#243821] flex items-center justify-center font-bold text-xs uppercase shrink-0">
                  {{ (td.name || 'G').slice(0, 2) }}
                </div>
                <span class="font-medium text-[#1A1816]">{{ td.name }}</span>
              </div>
            </td>
            <td class="px-6 py-4 text-gray-600 font-mono">
              {{ td.email }}
            </td>
            <td class="px-6 py-4 text-gray-600 font-mono">
              {{ td.phone || '—' }}
            </td>
            <td class="px-6 py-4 text-gray-600 max-w-[200px] truncate" :title="td.address">
              {{ td.address || '—' }}
            </td>
            <td class="px-6 py-4 text-gray-600 capitalize">
              {{ td.nationality || 'Nigerian' }}
            </td>
            <td class="px-6 py-4 text-gray-500 font-mono">
              {{ td.created_at ? moment(td.created_at).format("ll") : '—' }}
            </td>
            <td class="px-6 py-4 text-center">
              <button
                @click="openUserModal(td)"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#243821]/10 text-[#243821] hover:bg-[#243821] hover:text-white font-semibold text-xs transition-colors"
              >
                <i class="fa fa-id-card-alt text-[11px]"></i>
                <span>View Activity</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination Footer -->
    <div v-if="!loading && tbody.length" class="p-4 border-t border-gray-100 bg-[#FAF8F5]">
      <PaginationComponent />
    </div>

    <!-- SINGLE USER FULL DETAILS & ACTIVITY MODAL -->
    <TransitionRoot as="template" :show="isUserModalOpen">
      <Dialog as="div" class="relative z-50" @close="isUserModalOpen = false">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel class="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-3xl border border-[#9B7846]/20 flex flex-col max-h-[90vh]">
                <!-- Header Card -->
                <div class="p-6 bg-[#132212] text-white border-b border-white/10 flex items-start justify-between">
                  <div class="flex items-center gap-4">
                    <div class="w-14 h-14 rounded-2xl bg-[#9B7846] text-white flex items-center justify-center font-serif text-xl font-bold border border-white/20 shadow-md">
                      {{ (selectedUser?.name || 'G').slice(0, 2).toUpperCase() }}
                    </div>
                    <div>
                      <div class="flex items-center gap-2">
                        <span class="text-[10px] uppercase tracking-widest text-[#c5a880] font-bold">Guest Portfolio</span>
                        <span class="px-2 py-0.5 rounded-full bg-white/10 text-white text-[10px] font-bold">
                          User #{{ selectedUser?.id }}
                        </span>
                      </div>
                      <h3 class="font-serif text-2xl font-normal text-white mt-0.5">
                        {{ selectedUser?.name }}
                      </h3>
                      <p class="text-xs text-white/70 font-mono mt-0.5">
                        {{ selectedUser?.email }} &bull; {{ selectedUser?.phone || 'No phone' }}
                      </p>
                    </div>
                  </div>

                  <button
                    @click="isUserModalOpen = false"
                    class="text-white/60 hover:text-white text-sm w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-colors"
                  >
                    <i class="fa fa-times"></i>
                  </button>
                </div>

                <!-- KPI Quick Bar -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-[#FAF8F5] border-b border-gray-100 text-xs">
                  <div>
                    <span class="block text-gray-400 uppercase font-bold text-[10px]">Reservations</span>
                    <span class="font-serif font-bold text-lg text-[#1A1816]">{{ userReservations.length }}</span>
                  </div>
                  <div>
                    <span class="block text-gray-400 uppercase font-bold text-[10px]">Total Paid</span>
                    <span class="font-serif font-bold text-lg text-[#243821]">{{ currencyFormat(userTotalSpent) }}</span>
                  </div>
                  <div>
                    <span class="block text-gray-400 uppercase font-bold text-[10px]">Transactions</span>
                    <span class="font-serif font-bold text-lg text-[#9B7846]">{{ userTransactions.length }}</span>
                  </div>
                  <div>
                    <span class="block text-gray-400 uppercase font-bold text-[10px]">Member Since</span>
                    <span class="font-medium text-gray-700">{{ selectedUser?.created_at ? moment(selectedUser.created_at).format("MMM YYYY") : '—' }}</span>
                  </div>
                </div>

                <!-- Sub-Navigation Tabs -->
                <div class="flex border-b border-gray-200 px-6 bg-white overflow-x-auto">
                  <button
                    v-for="t in userModalTabs"
                    :key="t.id"
                    @click="activeUserTab = t.id"
                    :class="[
                      activeUserTab === t.id
                        ? 'border-[#243821] text-[#243821] font-bold border-b-2'
                        : 'border-transparent text-gray-500 hover:text-[#243821]',
                      'py-3 px-4 text-xs uppercase tracking-wider whitespace-nowrap transition-colors'
                    ]"
                  >
                    <i :class="t.icon" class="mr-1.5"></i>
                    {{ t.label }}
                  </button>
                </div>

                <!-- Modal Body Content -->
                <div class="p-6 overflow-y-auto flex-1 text-xs">
                  <!-- TAB 1: PROFILE INFO -->
                  <div v-if="activeUserTab === 'info'" class="space-y-4">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div class="p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                        <span class="block text-gray-400 uppercase font-bold text-[10px]">Full Name</span>
                        <span class="font-medium text-sm text-[#1A1816]">{{ selectedUser?.name }}</span>
                      </div>
                      <div class="p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                        <span class="block text-gray-400 uppercase font-bold text-[10px]">Email Address</span>
                        <span class="font-mono text-sm text-[#1A1816]">{{ selectedUser?.email }}</span>
                      </div>
                      <div class="p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                        <span class="block text-gray-400 uppercase font-bold text-[10px]">Phone Number</span>
                        <span class="font-mono text-sm text-[#1A1816]">{{ selectedUser?.phone || '—' }}</span>
                      </div>
                      <div class="p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                        <span class="block text-gray-400 uppercase font-bold text-[10px]">Nationality</span>
                        <span class="font-medium text-sm text-[#1A1816] capitalize">{{ selectedUser?.nationality || 'Nigerian' }}</span>
                      </div>
                      <div class="p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                        <span class="block text-gray-400 uppercase font-bold text-[10px]">Gender</span>
                        <span class="font-medium text-sm text-[#1A1816] capitalize">{{ selectedUser?.gender || '—' }}</span>
                      </div>
                      <div class="p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                        <span class="block text-gray-400 uppercase font-bold text-[10px]">Account Role</span>
                        <span class="font-medium text-sm text-[#9B7846] capitalize">Guest / Client</span>
                      </div>
                      <div class="sm:col-span-2 p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                        <span class="block text-gray-400 uppercase font-bold text-[10px]">Residential Address</span>
                        <span class="font-medium text-sm text-[#1A1816]">{{ selectedUser?.address || 'No residential address provided' }}</span>
                      </div>
                    </div>

                    <div class="flex items-center gap-3 pt-3">
                      <a
                        :href="`mailto:${selectedUser?.email}`"
                        class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#243821] text-white hover:bg-[#182716] font-semibold transition-colors"
                      >
                        <i class="fa fa-envelope"></i>
                        <span>Send Email</span>
                      </a>
                      <a
                        v-if="selectedUser?.phone"
                        :href="`tel:${selectedUser.phone}`"
                        class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold transition-colors"
                      >
                        <i class="fa fa-phone"></i>
                        <span>Call Guest</span>
                      </a>
                    </div>
                  </div>

                  <!-- TAB 2: RESERVATIONS -->
                  <div v-if="activeUserTab === 'reservations'">
                    <div v-if="userReservationsLoading" class="py-12 text-center text-gray-400">
                      <i class="fa fa-spinner fa-spin text-xl text-[#9B7846]"></i>
                      <p class="mt-2">Loading user reservations...</p>
                    </div>

                    <div v-else-if="!userReservations.length" class="py-12 text-center text-gray-400">
                      <i class="fa fa-calendar-times text-2xl text-gray-300 mb-2"></i>
                      <p class="text-gray-600 font-medium">No reservations recorded for this guest</p>
                    </div>

                    <div v-else class="space-y-3">
                      <div
                        v-for="res in userReservations"
                        :key="res.id"
                        class="p-4 rounded-xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                      >
                        <div class="space-y-1">
                          <div class="flex items-center gap-2">
                            <span class="font-mono font-bold text-[#9B7846]">#{{ res.booking_no }}</span>
                            <span
                              class="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase"
                              :class="res.status === 'checked in' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'"
                            >
                              {{ res.status || 'Confirmed' }}
                            </span>
                            <span
                              class="px-2 py-0.5 rounded-full text-[10px]"
                              :class="res.payment_status === 'paid' ? 'bg-emerald-50 text-emerald-700 font-bold' : 'bg-gray-200 text-gray-700'"
                            >
                              {{ res.payment_status || 'Paid' }}
                            </span>
                          </div>
                          <p class="font-serif font-medium text-sm text-[#1A1816]">
                            {{ res.room?.flat_name || res.room?.room_name || res.room || 'Suite' }}
                          </p>
                          <p class="text-gray-500 text-[11px]">
                            {{ moment(res.check_in).format("ll") }} &rarr; {{ moment(res.check_out).format("ll") }}
                            ({{ res.no_of_guests || 2 }} guests, {{ res.no_of_rooms || 1 }} room)
                          </p>
                        </div>

                        <div class="text-right">
                          <span class="block font-serif font-bold text-base text-[#243821]">
                            {{ currencyFormat(res.total_price) }}
                          </span>
                          <span class="text-[10px] text-gray-400 font-mono">
                            {{ moment(res.created_at).format("MMM DD, YYYY") }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- TAB 3: TRANSACTIONS -->
                  <div v-if="activeUserTab === 'transactions'">
                    <div v-if="userTransactionsLoading" class="py-12 text-center text-gray-400">
                      <i class="fa fa-spinner fa-spin text-xl text-[#9B7846]"></i>
                      <p class="mt-2">Loading user payment transactions...</p>
                    </div>

                    <div v-else-if="!userTransactions.length" class="py-12 text-center text-gray-400">
                      <i class="fa fa-credit-card text-2xl text-gray-300 mb-2"></i>
                      <p class="text-gray-600 font-medium">No payment transactions recorded for this guest</p>
                    </div>

                    <div v-else class="space-y-3">
                      <div
                        v-for="trx in userTransactions"
                        :key="trx.id"
                        class="p-4 rounded-xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                      >
                        <div class="space-y-1">
                          <div class="flex items-center gap-2">
                            <span class="font-mono font-bold text-xs text-[#9B7846]">{{ trx.trxref || trx.reference }}</span>
                            <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-green-100 text-green-800">
                              {{ trx.status || 'Success' }}
                            </span>
                          </div>
                          <p class="text-gray-700 text-xs">
                            Booking Ref: <span class="font-mono font-bold">#{{ trx.reservation?.booking_no || '—' }}</span> &bull; Channel: <span class="capitalize">{{ trx.payment_type || 'Paystack' }}</span>
                          </p>
                          <p class="text-gray-400 text-[11px] font-mono">
                            {{ moment(trx.created_at).format("lll") }}
                          </p>
                        </div>

                        <div class="text-right">
                          <span class="block font-serif font-bold text-base text-[#243821]">
                            {{ currencyFormat(trx.amount) }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Modal Footer -->
                <div class="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                  <button
                    @click="isUserModalOpen = false"
                    class="px-6 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold text-xs uppercase tracking-wider transition-colors"
                  >
                    Close
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { reactive, provide, onMounted, ref, watch, inject, computed } from "vue";
import PaginationComponent from "@/components/PaginationComponent.vue";
import { getUsers, getReservations, getTransactions } from "@/services/userservices";
import debounce from "lodash/debounce";
import moment from "moment";
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from "@headlessui/vue";

const currencyFormat = inject("currencyFormat", (v) => `₦${Number(v || 0).toLocaleString()}`);

const queryParams = reactive({
  pageNumber: 1,
  pageSize: 10,
  pageCount: 0,
  total: 0,
  search: "",
});

provide("queryParams", queryParams);

const tbody = ref([]);
const loading = ref(true);

// Single User Modal State
const isUserModalOpen = ref(false);
const selectedUser = ref(null);
const activeUserTab = ref("info");
const userModalTabs = [
  { id: "info", label: "Profile Information", icon: "fa fa-user-circle" },
  { id: "reservations", label: "Reservations", icon: "fa fa-calendar-check" },
  { id: "transactions", label: "Transactions", icon: "fa fa-credit-card" },
];

const userReservations = ref([]);
const userReservationsLoading = ref(false);
const userTransactions = ref([]);
const userTransactionsLoading = ref(false);

const userTotalSpent = computed(() => {
  return userTransactions.value.reduce((acc, curr) => acc + Number(curr.amount || 0), 0) ||
    userReservations.value.reduce((acc, curr) => acc + Number(curr.total_price || 0), 0);
});

onMounted(() => {
  getData();
});

function getData() {
  loading.value = true;
  getUsers(queryParams)
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

function openUserModal(user) {
  selectedUser.value = user;
  activeUserTab.value = "info";
  isUserModalOpen.value = true;
  loadUserActivity(user);
}

function loadUserActivity(user) {
  userReservationsLoading.value = true;
  userTransactionsLoading.value = true;
  userReservations.value = [];
  userTransactions.value = [];

  // Fetch reservations
  getReservations({ pageNumber: 1, pageSize: 100, search: "" })
    .then((res) => {
      if (res?.status === 200 && res.data?.data) {
        const allRes = res.data.data;
        userReservations.value = allRes.filter(
          (r) =>
            r.user_id === user.id ||
            r.user?.id === user.id ||
            r.user?.email?.toLowerCase() === user.email?.toLowerCase()
        );
      }
      userReservationsLoading.value = false;
    })
    .catch(() => {
      userReservationsLoading.value = false;
    });

  // Fetch transactions
  getTransactions({ pageNumber: 1, pageSize: 100, search: "" })
    .then((res) => {
      if (res?.status === 200 && res.data?.data) {
        const allTrx = res.data.data;
        userTransactions.value = allTrx.filter(
          (t) =>
            t.user_id === user.id ||
            t.user?.id === user.id ||
            t.user?.email?.toLowerCase() === user.email?.toLowerCase()
        );
      }
      userTransactionsLoading.value = false;
    })
    .catch(() => {
      userTransactionsLoading.value = false;
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
    alert("No guest records to export");
    return;
  }
  const headers = ["Name", "Email", "Phone", "Address", "Nationality", "Gender", "Registered"];
  const rows = tbody.value.map((u) => [
    u.name,
    u.email,
    u.phone,
    `"${(u.address || "").replace(/"/g, '""')}"`,
    u.nationality,
    u.gender,
    u.created_at ? moment(u.created_at).format("YYYY-MM-DD") : "",
  ]);
  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `vamble_guests_${moment().format("YYYYMMDD")}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
</script>
