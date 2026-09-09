<template>
  <div class="space-y-8 text-left font-sans">
    <!-- Welcome Banner -->
    <div
      class="p-6 sm:p-8 rounded-3xl bg-[#132212] text-white border border-[#9B7846]/30 shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6"
    >
      <div class="relative z-10">
        <div class="flex items-center gap-2 mb-2">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span class="text-[10px] uppercase font-bold tracking-widest text-[#c5a880]">
            Vamble Apartments &bull; Live Central Command
          </span>
        </div>
        <h2 class="font-serif text-2xl sm:text-3xl font-normal text-white">
          Executive Operations Dashboard
        </h2>
        <p class="text-xs text-white/70 mt-1 max-w-xl">
          Real-time suite inventory, guest arrival trajectories, revenue performance, and reservations at Vamble Apartments & Suites.
        </p>
      </div>

      <div class="relative z-10 flex flex-wrap items-center gap-3">
        <div class="px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 text-xs text-white">
          <span class="text-[10px] text-[#c5a880] uppercase font-bold block">Abuja Local Time</span>
          <span class="font-mono font-bold text-sm text-white">{{ currentTime }}</span>
        </div>

        <router-link
          to="/booking"
          target="_blank"
          class="inline-flex items-center gap-2 bg-[#9B7846] hover:bg-[#7D5F33] text-white px-5 py-2.5 rounded-2xl text-xs uppercase tracking-wider font-semibold shadow-md transition-all active:scale-95"
        >
          <i class="fa fa-plus"></i>
          <span>Direct Booking</span>
        </router-link>
      </div>

      <!-- Subtle background luxury pattern -->
      <div class="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-[#9B7846]/10 blur-2xl pointer-events-none"></div>
    </div>

    <!-- Top KPI Metric Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <div
        v-for="(card, index) in metricCards"
        :key="index"
        class="bg-white rounded-3xl p-6 border border-[#9B7846]/20 shadow-xs hover:shadow-md hover:border-[#9B7846]/40 transition-all flex items-center justify-between group"
      >
        <div>
          <span
            class="block text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1.5 font-sans"
          >
            {{ card.title }}
          </span>
          <span class="font-serif text-3xl font-bold text-[#1A1816] block">
            {{ card.count }}
          </span>
          <span class="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-semibold mt-1">
            <i class="fa fa-arrow-trend-up text-[10px]"></i>
            <span>{{ card.subtext || "Live PMS data" }}</span>
          </span>
        </div>
        <div
          :class="`w-14 h-14 rounded-2xl flex items-center justify-center text-xl shadow-xs transition-transform group-hover:scale-105 ${card.iconClass}`"
        >
          <i :class="`fa ${card.icon}`"></i>
        </div>
      </div>
    </div>

    <!-- Chart & Quick Actions Row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Reservations Chart (2 cols) -->
      <div
        class="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-[#9B7846]/20 shadow-xs flex flex-col justify-between"
      >
        <div
          class="flex items-center justify-between mb-6 pb-4 border-b border-gray-100"
        >
          <div>
            <span class="text-[10px] uppercase tracking-widest text-[#9B7846] font-bold block">
              Occupancy Trajectory
            </span>
            <h3 class="font-serif text-xl font-bold text-[#1A1816]">
              Annual Booking Performance
            </h3>
          </div>
          <span
            class="text-xs font-semibold px-3 py-1 rounded-full bg-[#9B7846]/10 text-[#9B7846] border border-[#9B7846]/20"
          >
            Calendar Year 2026
          </span>
        </div>

        <div id="chart" class="w-full">
          <apexchart
            type="area"
            height="320"
            :options="chartOptions"
            :series="series"
          ></apexchart>
        </div>
      </div>

      <!-- Quick Actions (1 col) -->
      <div
        class="bg-white rounded-3xl p-6 sm:p-8 border border-[#9B7846]/20 shadow-xs flex flex-col justify-between"
      >
        <div>
          <div class="mb-6 pb-4 border-b border-gray-100">
            <span class="text-[10px] uppercase tracking-widest text-[#9B7846] font-bold block">
              Concierge Command
            </span>
            <h3 class="font-serif text-xl font-bold text-[#1A1816]">
              Quick Actions
            </h3>
          </div>

          <div class="grid grid-cols-1 gap-3 font-sans">
            <router-link
              to="/admin/calendar"
              class="flex items-center justify-between p-3.5 rounded-2xl bg-[#FAF8F5] hover:bg-[#FAF8F5]/80 border border-[#9B7846]/20 hover:border-[#9B7846]/40 transition-all group"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 rounded-xl bg-[#243821] text-white flex items-center justify-center transition-colors shadow-xs"
                >
                  <i class="fa fa-calendar-alt text-xs"></i>
                </div>
                <div>
                  <span class="block text-xs font-bold text-[#1A1816]"
                    >Suite Calendar & Rack</span
                  >
                  <span class="block text-[10px] text-gray-400"
                    >Monthly grid & stay timeline</span
                  >
                </div>
              </div>
              <i
                class="fa fa-arrow-right text-xs text-gray-400 group-hover:text-[#9B7846] group-hover:translate-x-0.5 transition-all"
              ></i>
            </router-link>

            <router-link
              to="/admin/reservations"
              class="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50 hover:bg-[#FAF8F5] border border-gray-200/80 hover:border-[#9B7846]/30 transition-all group"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 rounded-xl bg-[#9B7846]/10 text-[#9B7846] flex items-center justify-center group-hover:bg-[#9B7846] group-hover:text-white transition-colors"
                >
                  <i class="fa fa-calendar-check text-xs"></i>
                </div>
                <div>
                  <span class="block text-xs font-bold text-[#1A1816]"
                    >View Reservations</span
                  >
                  <span class="block text-[10px] text-gray-400"
                    >Check-in & booking management</span
                  >
                </div>
              </div>
              <i
                class="fa fa-arrow-right text-xs text-gray-400 group-hover:text-[#9B7846] group-hover:translate-x-0.5 transition-all"
              ></i>
            </router-link>

            <router-link
              to="/admin/rooms"
              class="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50 hover:bg-[#FAF8F5] border border-gray-200/80 hover:border-[#9B7846]/30 transition-all group"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center group-hover:bg-emerald-700 group-hover:text-white transition-colors"
                >
                  <i class="fa fa-bed text-xs"></i>
                </div>
                <div>
                  <span class="block text-xs font-bold text-[#1A1816]"
                    >Rooms & Suites Catalogue</span
                  >
                  <span class="block text-[10px] text-gray-400"
                    >Add suites, adjust rates</span
                  >
                </div>
              </div>
              <i
                class="fa fa-arrow-right text-xs text-gray-400 group-hover:text-[#9B7846] group-hover:translate-x-0.5 transition-all"
              ></i>
            </router-link>

            <router-link
              to="/admin/users"
              class="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50 hover:bg-[#FAF8F5] border border-gray-200/80 hover:border-[#9B7846]/30 transition-all group"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center justify-center group-hover:bg-indigo-700 group-hover:text-white transition-colors"
                >
                  <i class="fa fa-user-circle text-xs"></i>
                </div>
                <div>
                  <span class="block text-xs font-bold text-[#1A1816]"
                    >Guest Portfolios</span
                  >
                  <span class="block text-[10px] text-gray-400"
                    >Customer profiles & history</span
                  >
                </div>
              </div>
              <i
                class="fa fa-arrow-right text-xs text-gray-400 group-hover:text-[#9B7846] group-hover:translate-x-0.5 transition-all"
              ></i>
            </router-link>
          </div>
        </div>

        <div
          class="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400"
        >
          <span class="inline-flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span>
            <span>PMS Core Status</span>
          </span>
          <span class="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full text-[10px]">
            Operational
          </span>
        </div>
      </div>
    </div>

    <!-- Recent Reservations & In-House Stays Table -->
    <div class="bg-white rounded-3xl border border-[#9B7846]/20 shadow-xs overflow-hidden">
      <div class="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FAF8F5]">
        <div>
          <span class="text-[10px] uppercase font-bold tracking-widest text-[#9B7846] block">Live Bookings Feed</span>
          <h3 class="font-serif text-lg font-bold text-[#1A1816]">Recent Reservations & Activity</h3>
        </div>

        <router-link
          to="/admin/reservations"
          class="inline-flex items-center gap-2 text-xs font-semibold text-[#243821] hover:text-[#9B7846] transition-colors"
        >
          <span>View All Reservations</span>
          <i class="fa fa-arrow-right text-[10px]"></i>
        </router-link>
      </div>

      <div class="w-full overflow-x-auto">
        <div v-if="loadingRecent" class="py-12 text-center text-gray-400">
          <i class="fa fa-spinner fa-spin text-2xl text-[#9B7846]"></i>
          <p class="mt-2 text-xs">Loading live reservations...</p>
        </div>

        <div v-else-if="!recentReservations.length" class="py-12 text-center text-gray-400">
          <i class="fa fa-calendar-times text-2xl mb-1 text-gray-300"></i>
          <p class="text-xs text-gray-500">No recent reservations found</p>
        </div>

        <table v-else class="w-full text-left font-sans border-collapse">
          <thead>
            <tr class="text-[11px] uppercase tracking-wider text-gray-500 bg-[#FAF8F5]/60 border-b border-gray-200">
              <th class="px-6 py-3.5 font-bold">Booking No</th>
              <th class="px-6 py-3.5 font-bold">Guest Profile</th>
              <th class="px-6 py-3.5 font-bold">Arrival Date</th>
              <th class="px-6 py-3.5 font-bold">Departure Date</th>
              <th class="px-6 py-3.5 font-bold">Folio Bill</th>
              <th class="px-6 py-3.5 font-bold">Status</th>
              <th class="px-6 py-3.5 font-bold text-center">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 text-xs">
            <tr
              v-for="res in recentReservations"
              :key="res.id"
              class="hover:bg-[#FAF8F5]/60 transition-colors group"
            >
              <td class="px-6 py-4">
                <span class="font-mono font-bold text-xs text-[#9B7846]">
                  #{{ res.booking_no }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-2.5">
                  <div class="w-7 h-7 rounded-full bg-[#243821]/10 text-[#243821] flex items-center justify-center font-bold text-[11px]">
                    {{ (res.user?.name || "G").charAt(0).toUpperCase() }}
                  </div>
                  <div>
                    <span class="font-medium text-[#1A1816] block capitalize">{{ res.user?.name || "Guest" }}</span>
                    <span class="text-[10px] text-gray-400 block truncate max-w-[140px]">{{ res.user?.email || "—" }}</span>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 font-mono font-medium text-gray-700">
                {{ moment(res.check_in).format("MMM DD, YYYY") }}
              </td>
              <td class="px-6 py-4 font-mono font-medium text-gray-700">
                {{ moment(res.check_out).format("MMM DD, YYYY") }}
              </td>
              <td class="px-6 py-4">
                <span class="font-serif font-bold text-sm text-[#243821] block">
                  {{ currencyFormat(res.total_price) }}
                </span>
              </td>
              <td class="px-6 py-4">
                <span
                  class="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider inline-flex items-center gap-1 border"
                  :class="getStatusClass(res.status)"
                >
                  <span class="w-1.5 h-1.5 rounded-full bg-current"></span>
                  {{ res.status || "Confirmed" }}
                </span>
              </td>
              <td class="px-6 py-4 text-center">
                <router-link
                  to="/admin/reservations"
                  class="px-3 py-1 rounded-lg bg-[#243821]/10 text-[#243821] hover:bg-[#243821] hover:text-white font-semibold text-xs transition-colors"
                >
                  Manage
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref, inject } from "vue";
import VueApexCharts from "vue3-apexcharts";
import moment from "moment";
import { getMetrics } from "@/services/dashboardservices";
import { getReservations } from "@/services/roomservice";

const apexchart = VueApexCharts;
const currentTime = ref(moment().format("HH:mm:ss"));
const loadingRecent = ref(true);
const recentReservations = ref([]);

const currencyFormat = inject(
  "currencyFormat",
  (v) => `₦${Number(v || 0).toLocaleString()}`
);

const metricCards = ref([
  {
    title: "Registered Guests",
    count: 0,
    subtext: "Verified guest accounts",
    icon: "fa-users",
    iconClass: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  },
  {
    title: "Active Suites & Apartments",
    count: 5,
    subtext: "Luxury inventory catalogue",
    icon: "fa-bed",
    iconClass: "bg-[#9B7846]/10 text-[#9B7846] border border-[#9B7846]/30",
  },
  {
    title: "Monthly Reservations",
    count: 0,
    subtext: "Bookings in current month",
    icon: "fa-calendar-check",
    iconClass: "bg-[#243821]/10 text-[#243821] border border-[#243821]/20",
  },
  {
    title: "Today's Active Check-ins",
    count: 0,
    subtext: "Guests currently in residence",
    icon: "fa-concierge-bell",
    iconClass: "bg-amber-50 text-amber-700 border border-amber-200",
  },
]);

const monthlyReservations = ref(new Array(12).fill(0));

const series = computed(() => {
  return [
    {
      name: "Total Reservations",
      data: monthlyReservations.value,
    },
  ];
});

const chartOptions = computed(() => {
  return {
    colors: ["#243821"],
    chart: {
      toolbar: { show: false },
      fontFamily: "Plus Jakarta Sans, sans-serif",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [0, 90, 100],
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
      colors: ["#243821"],
    },
    grid: {
      borderColor: "#f1f1f1",
      strokeDashArray: 4,
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      labels: {
        style: { colors: "#9ca3af", fontSize: "11px" },
      },
    },
    yaxis: {
      labels: {
        style: { colors: "#9ca3af", fontSize: "11px" },
      },
    },
    tooltip: {
      theme: "light",
      y: {
        formatter: (val) => `${val} reservations`,
      },
    },
  };
});

function getStatusClass(status) {
  const s = (status || "").toLowerCase();
  if (s === "checked in")
    return "bg-emerald-50 text-emerald-800 border-emerald-200";
  if (s === "checked out")
    return "bg-gray-100 text-gray-700 border-gray-200";
  if (s === "cancelled")
    return "bg-red-50 text-red-800 border-red-200";
  return "bg-amber-50 text-amber-800 border-amber-200";
}

onMounted(() => {
  setInterval(() => {
    currentTime.value = moment().format("HH:mm:ss");
  }, 1000);

  getMetrics()
    .then((res) => {
      if (res?.status === 200 && res.data) {
        const d = res.data.data || [];
        if (d[0]) metricCards.value[0].count = d[0].count ?? 0;
        if (d[1]) metricCards.value[1].count = d[1].count ?? 0;
        if (d[2]) metricCards.value[2].count = d[2].count ?? 0;
        if (d[3]) metricCards.value[3].count = d[3].count ?? 0;

        const resList = res.data.reservations || [];
        const monthCounts = new Array(12).fill(0);
        resList.forEach((r) => {
          const m = moment(r.created_at || r).month();
          if (m >= 0 && m < 12) monthCounts[m]++;
        });
        monthlyReservations.value = monthCounts;
      }
    })
    .catch((err) => {
      console.warn("Metrics load error:", err);
    });

  // Fetch recent reservations for dashboard live table
  getReservations({ pageNumber: 1, pageSize: 6 })
    .then((res) => {
      loadingRecent.value = false;
      if (res.status === 200 && res.data?.data) {
        recentReservations.value = res.data.data;
      }
    })
    .catch(() => {
      loadingRecent.value = false;
    });
});
</script>
