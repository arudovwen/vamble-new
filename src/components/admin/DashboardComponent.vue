<template>
  <div>
    <div class="grid grid-cols-4 gap-x-6 mb-10">
      <div
        v-for="i in metrics"
        :key="i.text"
        :class="`p-6 rounded-lg flex items-center justify-between border shadow`"
      >
        <div class="text-left">
          <span class="block text-xs font-bold text-gray-500 mb-2">{{
            i.text
          }}</span>
          <span class="block text-2xl font-bold text-gray-700">{{
            i.count
          }}</span>
        </div>
        <div
          :class="`h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center ${i.iconClass}`"
        >
          <i :class="`fa ${i.icon} text-2xl`" aria-hidden="true"></i>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-4 gap-x-6">
      <div class="col-span-3 bg-white rounded-lg p-6 border shadow text-left">
        <h3 class="text-sm mb-6 font-bold">Reservations report</h3>
        <div id="chart">
          <apexchart
            type="bar"
            height="300"
            :options="chartOptions"
            :series="series"
          ></apexchart>
        </div>
      </div>
      <div class="bg-white rounded-lg p-6 border shadow text-left">
        <h3 class="text-sm mb-6 font-bold">Quick actions</h3>
        <div class="flex flex-col gap-y-5 text-left">
          <button
            class="flex items-center justify-between text-[15px] rounded-lg bg-[#2c3e50] border border-[#2c3e50] text-white px-5 py-3 hover:opacity-90 active:scale-95"
          >
            Add room <i class="fa fa-arrow-right" aria-hidden="true"></i>
          </button>
          <button
            class="flex items-center justify-between text-[15px] rounded-lg bg-[#2c3e50] border border-[#2c3e50] text-white px-5 py-3 hover:opacity-90 active:scale-95"
          >
            Make reservation
            <i class="fa fa-arrow-right" aria-hidden="true"></i>
          </button>
          <button
            class="flex items-center justify-between text-[15px] rounded-lg bg-[#2c3e50] border border-[#2c3e50] text-white px-5 py-3 hover:opacity-90 active:scale-95"
          >
            Search bookings <i class="fa fa-arrow-right" aria-hidden="true"></i>
          </button>
          <button
            class="flex items-center justify-between text-[15px] rounded-lg bg-[#2c3e50] border border-[#2c3e50] text-white px-5 py-3 hover:opacity-90 active:scale-95"
          >
            View transactions
            <i class="fa fa-arrow-right" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { inject, computed } from "vue";
import VueApexCharts from "vue3-apexcharts";
import moment from "moment";

const apexchart = VueApexCharts;
const series = computed(() => {
  return [
    {
      name: "This year",
      data: [3, 22, 25, 85, 3, 22, 25, 85, 36, 45, 76, 18],
    },
  ];
});
const currencyFormat = inject("currencyFormat");
const chartOptions = computed(() => {
  return {
    colors: ["#2d5c1f"],
    yaxis: {
      show: false,
    },
    legend: {
      show: false,
    },
    chart: {
      toolbar: {
        show: false,
      },
    },
    grid: {
      show: false,
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 1,
    },
    xaxis: {
      categories: moment.monthsShort(),
    },
    tooltip: {
      y: {
        format: "MM dd",
        formatter: (value) => currencyFormat(value),
      },
    },
  };
});
const metrics = [
  {
    text: "Total customers",
    count: "3",
    icon: "fa-users",
    border: "border-l-4 border-green-700",
    iconClass: "text-green-700 bg-green-50",
  },
  {
    text: "Total rooms",
    count: "5",
    icon: "fa-bed",
    border: "border-l-4 border-blue-700",
    iconClass: "text-blue-700 bg-blue-50",
  },

  {
    text: "Total Reservations",
    count: "89",
    icon: "fa-calendar-plus",
    border: "border-l-4 border-red-700",
    iconClass: "text-red-700 bg-red-50",
  },
  {
    text: "Todays Check-ins",
    count: "8",
    icon: "fa-user-check",
    border: "border-l-4 border-yellow-700",
    iconClass: "text-yellow-700 bg-yellow-50",
  },
];
</script>
