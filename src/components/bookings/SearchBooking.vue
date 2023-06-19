<template>
  <div class="text-left mb-6">
    <label class="block mb-2 text-xs sr-only">Search booking</label>
    <input
      v-model="detail.bookingNo"
      class="border px-3 py-3 rounded-lg w-full outline-none focus:border-[#2c3e50]/20"
      placeholder="Search booking no"
    />
  </div>
  <div
    class="text-left bg-white p-6 sm:p-8 rounded-md"
    v-if="booking && !isLoading"
  >
    <table>
      <tbody>
        <tr>
          <td class="pr-6 py-2 text-[15px] font-bold">Full name</td>
          <td class="px-6 py-2 text-[15px] capitalize">
            {{ booking.user.name }}
          </td>
        </tr>
        <tr>
          <td class="pr-6 py-2 text-[15px] font-bold">E-mail</td>
          <td class="px-6 py-2 text-[15px]">{{ booking.user.email }}</td>
        </tr>
        <tr>
          <td class="pr-6 py-2 text-[15px] font-bold">Phone number</td>
          <td class="px-6 py-2 text-[15px]">{{ booking.user.phone }}</td>
        </tr>
        <tr>
          <td class="pr-6 py-2 text-[15px] font-bold">Gender</td>
          <td class="px-6 py-2 text-[15px] capitalize">
            {{ booking.user.gender }}
          </td>
        </tr>
        <tr>
          <td class="pr-6 py-2 text-[15px] font-bold">Nationality</td>
          <td class="px-6 py-2 text-[15px] capitalize">
            {{ booking.user.nationality }}
          </td>
        </tr>
        <tr>
          <td class="pr-6 py-2 text-[15px] font-bold">Address</td>
          <td class="px-6 py-2 text-[15px]">{{ booking.user.address }}</td>
        </tr>
        <tr>
          <td class="pr-6 py-2 text-[15px] font-bold">Check-in Date</td>
          <td class="px-6 py-2 text-[15px]">
            {{ moment(booking.check_in).format("ll") }}
          </td>
        </tr>
        <tr>
          <td class="pr-6 py-2 text-[15px] font-bold">Check-in Date</td>
          <td class="px-6 py-2 text-[15px]">
            {{ moment(booking.check_out).format("ll") }}
          </td>
        </tr>
        <tr>
          <td class="pr-6 py-2 text-[15px] font-bold">Type</td>
          <td class="px-6 py-2 text-[15px] capitalize">
            {{ booking.room }}
          </td>
        </tr>
        <tr>
          <td class="pr-6 py-2 text-[15px] font-bold">Number of rooms</td>
          <td class="px-6 py-2 text-[15px]">{{ booking.no_of_rooms }}</td>
        </tr>
        <tr>
          <td class="pr-6 py-2 text-[15px] font-bold">Number of guests</td>
          <td class="px-6 py-2 text-[15px]">{{ booking.no_of_guests }}</td>
        </tr>
        <tr>
          <td class="pr-6 py-2 text-[15px] font-bold">Payment status</td>
          <td class="px-6 py-2 text-[15px] capitalize">
            {{ booking.payment_status }}
          </td>
        </tr>
        <tr>
          <td class="pr-6 py-2 text-[15px] font-bold">Payment type</td>
          <td class="px-6 py-2 text-[15px] capitalize">
            {{ booking.payment_type }}
          </td>
        </tr>
        <tr>
          <td class="pr-6 py-2 text-[15px] font-bold">Status</td>
          <td class="px-6 py-2 text-[15px] capitalize">{{ booking.status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-if="isLoading" class="text-center p-10">
    <i class="fa fa-recycle fa-spin fa-3x" aria-hidden="true"></i>
  </div>
</template>
<script setup>
import { findBooking } from "@/services/roomservice";
import { ref, reactive, watch } from "vue";
import moment from "moment";

const booking = ref(null);
const detail = reactive({ bookingNo: "" });
const isLoading = ref(false);
function getBooking() {
  isLoading.value = true;
  findBooking(detail.bookingNo).then((res) => {
    if (res.status === 200) {
      booking.value = res.data;
      isLoading.value = false;
    }
  });
}
watch(
  () => [detail.bookingNo],
  () => {
    if (detail.bookingNo.length < 8) return;
    getBooking(detail);
  }
);
</script>
