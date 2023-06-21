<template>
  <div class="bg-white rounded-lg border shadow text-left overflow-hidden p-6">
    <Qalendar :events="booking" :config="config" />
  </div>
</template>
<script setup>
import { Qalendar } from "qalendar";
import { getReservations } from "@/services/roomservice";
import { onMounted, ref, reactive, inject } from "vue";
import moment from "moment";

const currencyFormat = inject("currencyFormat");
const booking = ref([]);
const queryParams = reactive({
  pageNumber: 1,
  pageSize: 1000,
  pageCount: 0,
  total: 0,
  search: "",
});
onMounted(() => {
  getData();
});
const months = ["blue", "yellow", "green", "red"];
function getData() {
  getReservations(queryParams).then((res) => {
    if (res.status === 200) {
      booking.value = res.data.data.map((i) => {
        return {
          title: `${i.user.name.toUpperCase()} RESERVATION`,
          with: `${i.user.name.toUpperCase()}`,
          time: {
            start: moment(i.check_in).format("YYYY-MM-DD hh:mm"),
            end: moment(i.check_out).format("YYYY-MM-DD hh:mm"),
          },
          color: months[Math.floor(Math.random() * 4)],
          isEditable: false,
          id: i.booking_no,
          description: `${i.room}, ${i.no_of_guests} guests, ${
            i.no_of_rooms
          } rooms, ${currencyFormat(i.total_price)}`,
        };
      });
    }
  });
}

const config = {
  defaultMode: "month",
};
</script>
<style></style>
