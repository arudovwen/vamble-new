<template>
  <div>
    <div class="grid grid-cols-4 gap-x-6 mb-10">
      <div
        v-for="(i, index) in tabs"
        :key="index"
        :class="`${i.iconClass} p-6 rounded-lg flex items-center justify-between border shadow h-[114px] `"
      >
        <div class="text-left">
          <span class="block text-xs font-bold text-gray-500 mb-2">{{
            i.text
          }}</span>
          <span class="block text-2xl font-bold text-gray-700">{{
            metrics[index]?.count || 0
          }}</span>
        </div>
        <div
          :class="`h-16 w-16  rounded-full flex items-center justify-center ${i.iconClass}`"
        >
          <i :class="`fa ${i.icon} text-2xl`" aria-hidden="true"></i>
        </div>
      </div>
    </div>
    <div class="flex gap-x-6">
      <div class="flex-1 bg-white rounded-lg p-6 border shadow text-left">
        <h3 class="text-sm mb-6 font-bold">Reservations report</h3>
        <div id="chart">
          <apexchart
            type="area"
            height="300"
            :options="chartOptions"
            :series="series"
          ></apexchart>
        </div>
      </div>

      <div
        class="bg-white rounded-lg p-6 border shadow text-left flex flex-col w-[350px]"
      >
        <h3 class="text-sm mb-8 font-bold">Quick actions</h3>
        <div class="grid grid-cols-2 gap-5 text-center flex-1">
          <router-link to="/admin/rooms" class="w-full h-full">
            <div
              class="flex font-bold text-center items-center justify-center text-[15px] rounded-lg w-full h-full bg-[#2c3e50] border border-[#2c3e50] text-white px-5 py-3 hover:opacity-90 active:scale-95"
            >
              Rooms
            </div>
          </router-link>
          <!-- <router-link to="/admin/coupons" class="w-full">
            <button
              class="flex items-center w-full justify-between text-[15px] rounded-lg bg-[#2c3e50] border border-[#2c3e50] text-white px-5 py-3 hover:opacity-90 active:scale-95"
            >
              View coupons
              <i class="fa fa-arrow-right" aria-hidden="true"></i></button
          ></router-link> -->
          <router-link to="/admin/reservations" class="w-full h-full">
            <div
              class="flex w-full h-full font-bold text-center items-center justify-center text-[15px] rounded-lg bg-[#2c3e50] border border-[#2c3e50] text-white px-5 py-3 hover:opacity-90 active:scale-95"
            >
              Reservations
            </div></router-link
          >
          <router-link to="/admin/reservations" class="w-full h-full">
            <div
              class="flex w-full h-full font-bold text-center items-center justify-center text-[15px] rounded-lg bg-[#2c3e50] border border-[#2c3e50] text-white px-5 py-3 hover:opacity-90 active:scale-95"
            >
              Bookings
            </div> </router-link
          ><router-link to="/admin/transactions" class="w-full h-full">
            <div
              class="flex w-full h-full font-bold text-center items-center justify-center text-[15px] rounded-lg bg-[#2c3e50] border border-[#2c3e50] text-white px-5 py-3 hover:opacity-90 active:scale-95"
            >
              Transactions
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// eslint-disable-next-line no-unused-vars
import { onMounted, computed, ref } from "vue";
import VueApexCharts from "vue3-apexcharts";
import moment from "moment";
import { getMetrics } from "@/services/dashboardservices";

const apexchart = VueApexCharts;
const series = computed(() => {
  return [
    {
      name: "Total reservations",
      data: reservations.value,
    },
  ];
});
// const currencyFormat = inject("currencyFormat");
const chartOptions = computed(() => {
  return {
    colors: ["#2d5c1f"],
    yaxis: {
      show: true,
    },
    legend: {
      show: false,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
      },
    },
    chart: {
      toolbar: {
        show: false,
      },
    },
    grid: {
      show: true,
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 1,
    },
    xaxis: {
      categories: moment.months(),
    },
    tooltip: {
      y: {
        format: "MM dd",
        formatter: (value) => value,
      },
    },
  };
});
const metrics = ref([]);
const reservations = ref([]);
onMounted(() => {
  getMetrics().then((res) => {
    if (res.status === 200) {
      metrics.value = res.data.data;
      moment.months().forEach((item) => {
        reservations.value.push(
          res.data.reservations.filter(
            (v) => moment(v).format("MMMM").toLowerCase() === item.toLowerCase()
          ).length
        );
      });
    }
  });
});

const tabs = [
  {
    text: "Total customers",
    count: 8,
    icon: "fa-users",
    border: "border-l-4 border-green-700",
    iconClass: "text-green-700 bg-green-50",
  },
  {
    text: "Total rooms",
    count: 12,
    icon: "fa-bed",
    border: "border-l-4 border-blue-700",
    iconClass: "text-blue-700 bg-blue-50",
  },
  {
    text: "Today's Reservations",
    count: 11,
    icon: "fa-calendar-plus",
    border: "border-l-4 border-red-700",
    iconClass: "text-red-700 bg-red-50",
  },
  {
    text: "Todays Check-ins",
    count: 0,
    icon: "fa-user-check",
    border: "border-l-4 border-yellow-700",
    iconClass: "text-yellow-700 bg-yellow-50",
  },
];
</script>
