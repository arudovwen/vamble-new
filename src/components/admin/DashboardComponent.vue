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
        <h3 class="text-sm mb-8 font-bold">Quick actions</h3>
        <div class="flex flex-col gap-y-5 text-left">
          <router-link to="/admin/rooms" class="w-full">
            <button
              class="flex items-center justify-between text-[15px] rounded-lg w-full bg-[#2c3e50] border border-[#2c3e50] text-white px-5 py-3 hover:opacity-90 active:scale-95"
            >
              View rooms <i class="fa fa-arrow-right" aria-hidden="true"></i>
            </button>
          </router-link>
          <router-link to="/admin/coupons" class="w-full">
            <button
              class="flex items-center w-full justify-between text-[15px] rounded-lg bg-[#2c3e50] border border-[#2c3e50] text-white px-5 py-3 hover:opacity-90 active:scale-95"
            >
              View coupons
              <i class="fa fa-arrow-right" aria-hidden="true"></i></button
          ></router-link>
          <router-link to="/admin/reservations" class="w-full">
            <button
              class="flex items-center w-full justify-between text-[15px] rounded-lg bg-[#2c3e50] border border-[#2c3e50] text-white px-5 py-3 hover:opacity-90 active:scale-95"
            >
              View reservations
              <i class="fa fa-arrow-right" aria-hidden="true"></i></button
          ></router-link>
          <router-link to="/admin/reservations" class="w-full">
            <button
              class="flex items-center w-full justify-between text-[15px] rounded-lg bg-[#2c3e50] border border-[#2c3e50] text-white px-5 py-3 hover:opacity-90 active:scale-95"
            >
              Search bookings
              <i class="fa fa-arrow-right" aria-hidden="true"></i>
            </button> </router-link
          ><router-link to="/admin/transactions" class="w-full">
            <button
              class="flex items-center w-full justify-between text-[15px] rounded-lg bg-[#2c3e50] border border-[#2c3e50] text-white px-5 py-3 hover:opacity-90 active:scale-95"
            >
              View transactions
              <i class="fa fa-arrow-right" aria-hidden="true"></i></button
          ></router-link>
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
      categories: moment.monthsShort(),
    },
    tooltip: {
      y: {
        format: "MM dd",
        formatter: (value) => value,
      },
    },
  };
});
const metrics = ref(null);
const reservations = ref([]);
onMounted(() => {
  getMetrics().then((res) => {
    if (res.status === 200) {
      metrics.value = res.data.data;
      moment.monthsShort().forEach((item) => {
        reservations.value.push(
          res.data.reservations.filter(
            (v) => moment(v).format("MMM").toLowerCase() === item.toLowerCase()
          ).length
        );
      });
    }
  });
});
</script>
