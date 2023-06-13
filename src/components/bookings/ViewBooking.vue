<template>
  <div class="text-left bg-white p-6 sm:p-8 rounded-md">
    <table v-if="formData">
      <tbody>
        <tr>
          <td class="pr-6 py-2 text-[15px] font-bold">Full name</td>
          <td class="px-6 py-2 text-[15px] capitalize">
            {{ formData.fullName }}
          </td>
        </tr>
        <tr>
          <td class="pr-6 py-2 text-[15px] font-bold">E-mail</td>
          <td class="px-6 py-2 text-[15px]">{{ formData.email }}</td>
        </tr>
        <tr>
          <td class="pr-6 py-2 text-[15px] font-bold">Phone number</td>
          <td class="px-6 py-2 text-[15px]">{{ formData.phone }}</td>
        </tr>
        <tr>
          <td class="pr-6 py-2 text-[15px] font-bold">Gender</td>
          <td class="px-6 py-2 text-[15px] capitalize">
            {{ formData.gender }}
          </td>
        </tr>
        <tr>
          <td class="pr-6 py-2 text-[15px] font-bold">Nationality</td>
          <td class="px-6 py-2 text-[15px] capitalize">
            {{ formData.nationality }}
          </td>
        </tr>
        <tr>
          <td class="pr-6 py-2 text-[15px] font-bold">Address</td>
          <td class="px-6 py-2 text-[15px]">{{ formData.address }}</td>
        </tr>
        <tr>
          <td class="pr-6 py-2 text-[15px] font-bold">Check-in Date</td>
          <td class="px-6 py-2 text-[15px]">{{ formData.checkin }}</td>
        </tr>
        <tr>
          <td class="pr-6 py-2 text-[15px] font-bold">Check-in Date</td>
          <td class="px-6 py-2 text-[15px]">{{ formData.checkout }}</td>
        </tr>
        <tr>
          <td class="pr-6 py-2 text-[15px] font-bold">Room category</td>
          <td class="px-6 py-2 text-[15px] capitalize">
            {{ formData.category }}
          </td>
        </tr>
        <tr>
          <td class="pr-6 py-2 text-[15px] font-bold">Room type</td>
          <td class="px-6 py-2 text-[15px] capitalize">{{ formData.type }}</td>
        </tr>
        <tr>
          <td class="pr-6 py-2 text-[15px] font-bold">Number of rooms</td>
          <td class="px-6 py-2 text-[15px]">{{ formData.no_of_rooms }}</td>
        </tr>
        <tr>
          <td class="pr-6 py-2 text-[15px] font-bold">Number of guests</td>
          <td class="px-6 py-2 text-[15px]">{{ formData.no_of_guests }}</td>
        </tr>
        <tr>
          <td class="pr-6 py-2 text-[15px] font-bold">Payment status</td>
          <td class="px-6 py-2 text-[15px]">{{ formData.no_of_guests }}</td>
        </tr>
        <tr>
          <td class="pr-6 py-2 text-[15px] font-bold">Status</td>
          <td class="px-6 py-2 text-[15px]">{{ formData.no_of_guests }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { ref } from "vue";

const formData = ref(null);
</script>
