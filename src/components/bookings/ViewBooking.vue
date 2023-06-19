<template>
  <div class="text-left bg-white p-6 sm:p-8 rounded-md">
    <table v-if="booking">
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
</template>
<script setup>
import { defineProps } from "vue";
import moment from "moment";

defineProps(["booking"]);
</script>
