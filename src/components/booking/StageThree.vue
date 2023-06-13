<template>
  <div class="text-left">
    <table>
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
      </tbody>
    </table>
    <div class="text-left mb-6 mt-6 sm:max-w-[200px] ml-auto">
      <label class="block mb-2 text-xs">Enter coupon</label>

      <input
        v-model="formData.coupon"
        class="border px-3 py-3 rounded-lg w-full outline-none focus:border-[#2c3e50]/20"
        placeholder="Provide coupon"
      />
    </div>
  </div>
</template>
<script setup>
import { inject } from "vue";

const formData = inject("formData");
</script>
