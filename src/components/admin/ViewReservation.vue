<template>
  <div class="text-left bg-white p-6 sm:p-8 rounded-md relative">
    <div class="flex gap-x-6 mb-8">
      <span class="text-lg">Booking no :</span>
      <span class="font-bold text-xl">{{ booking.booking_no }}</span>
    </div>
    <table v-if="booking">
      <tbody>
        <tr>
          <td class="pr-6 py-2 text-[15px] font-bold">Date created</td>
          <td class="px-6 py-2 text-[15px] capitalize">
            {{ moment(booking.created_at).format("lll") }}
          </td>
        </tr>
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
          <td class="pr-6 py-2 text-[15px] font-bold">Arrival</td>
          <td class="px-6 py-2 text-[15px]">
            {{ moment(booking.check_in).format("ll") }}
          </td>
        </tr>
        <tr>
          <td class="pr-6 py-2 text-[15px] font-bold">Departure</td>
          <td class="px-6 py-2 text-[15px]">
            {{ moment(booking.check_out).format("ll") }}
          </td>
        </tr>
        <tr v-if="booking.check_in_time">
          <td class="pr-6 py-2 text-[15px] font-bold">Check-in Time</td>
          <td class="px-6 py-2 text-[15px]">
            {{ moment(booking.check_in_time).format("lll") }}
          </td>
        </tr>
        <tr v-if="booking.check_out_time">
          <td class="pr-6 py-2 text-[15px] font-bold">Check-out Time</td>
          <td class="px-6 py-2 text-[15px]">
            {{ moment(booking.check_out_time).format("lll") }}
          </td>
        </tr>
        <tr>
          <td class="pr-6 py-2 text-[15px] font-bold">Type</td>
          <td class="px-6 py-2 text-[15px] capitalize">{{ booking.room }}</td>
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
          <td class="pr-6 py-2 text-[15px] font-bold">Price per night</td>
          <td class="px-6 py-2 text-[15px] capitalize">
            {{ currencyFormat(booking.price_per_night) }}
          </td>
        </tr>
        <tr>
          <td class="pr-6 py-2 text-[15px] font-bold">Total price</td>
          <td class="px-6 py-2 text-[15px] capitalize">
            {{ currencyFormat(booking.total_price) }}
          </td>
        </tr>
        <tr>
          <td class="pr-6 py-2 text-[15px] font-bold">Discount</td>
          <td class="px-6 py-2 text-[15px] capitalize">
            {{ currencyFormat(booking.discount) }}
          </td>
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

    <div class="flex justify-center mt-7">
      <button @click="isOpen = false" class="text-xs absolute top-4 right-4">
        Close
      </button>
      <button
        :disabled="isLoading"
        v-if="!booking.check_in_time"
        @click="handleCheckin"
        class="capitalize bg-gray-700 text-white text-sm px-6 py-3 w-full hover:opacity-80 active:scale-95 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed"
      >
        Check in customer
      </button>
      <button
        :disabled="isLoading"
        v-if="booking.check_in_time && !booking.check_out_time"
        @click="handleCheckout"
        class="capitalize bg-gray-700 text-white text-sm px-6 py-3 w-full hover:opacity-80 active:scale-95 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed"
      >
        Check out customer
      </button>
    </div>
  </div>
</template>
<script setup>
import { defineProps, inject, ref } from "vue";
import moment from "moment";
import { customerCheckin, customerCheckout } from "@/services/userservices";
import { useToast } from "vue-toast-notification";

const toast = useToast();
const currencyFormat = inject("currencyFormat");
const isOpen = inject("isOpen");
const getData = inject("getData");
const props = defineProps(["booking"]);
const isLoading = ref(false);
function handleCheckin() {
  customerCheckin(props.booking.id)
    .then((res) => {
      if (res.status === 200) {
        isLoading.value = false;
        isOpen.value = isOpen.value = false;
        getData();
        toast.success("Check in successful");
      }
    })
    .catch((err) => {
      isLoading.value = false;
      toast.error(err.response.data.errors);
    });
}
function handleCheckout() {
  customerCheckout(props.booking.id)
    .then((res) => {
      if (res.status === 200) {
        isLoading.value = false;
        isOpen.value = isOpen.value = false;
        getData();
        toast.success("Check out successful");
      }
    })
    .catch((err) => {
      isLoading.value = false;
      toast.error(err.response.data.errors);
    });
}
</script>
