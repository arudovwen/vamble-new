<template>
  <div>
    <div class="grid lg:grid-cols-2 gap-x-8">
      <div class="text-left mb-6">
        <label class="block mb-2 text-xs">Check-in date</label>
        <input
          v-model="formData.checkin"
          class="border px-3 py-3 rounded-lg w-full outline-none focus:border-[#2c3e50]/20"
          type="date"
        />
      </div>
      <div class="text-left mb-6">
        <label class="block mb-2 text-xs">Check-out date</label>
        <input
          v-model="formData.checkout"
          class="border px-3 py-3 rounded-lg w-full outline-none focus:border-[#2c3e50]/20"
          type="date"
        />
      </div>
    </div>
    <div class="grid lg:grid-cols-2 gap-x-8">
      <div class="text-left mb-6">
        <label class="block mb-2 text-xs">Room category</label>
        <select
          v-model="formData.category"
          class="border px-3 py-3 rounded-lg w-full outline-none focus:border-[#2c3e50]/20 capitalize"
        >
          <option value="" disabled>Choose a category</option>
          <option v-for="cat in category" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>
      </div>
      <div class="text-left mb-6">
        <label class="block mb-2 text-xs">Room type</label>
        <select
          v-model="formData.type"
          class="border px-3 py-3 rounded-lg w-full outline-none focus:border-[#2c3e50]/20 capitalize"
        >
          <option value="" disabled>Choose a type</option>
          <option v-for="cat in compType" :key="cat.text" :value="cat.text">
            {{ cat.text }}
          </option>
        </select>
      </div>
    </div>
    <div class="grid lg:grid-cols-2 gap-x-8">
      <div class="text-left mb-6">
        <label class="block mb-2 text-xs">Number of rooms</label>
        <select
          v-model="formData.no_of_rooms"
          class="border px-3 py-3 rounded-lg w-full outline-none focus:border-[#2c3e50]/20"
        >
          <option :value="n" v-for="n in 50" :key="n">{{ n }}</option>
        </select>
      </div>
      <div class="text-left mb-6">
        <label class="block mb-2 text-xs">Number of guests</label>
        <select
          v-model="formData.no_of_guests"
          class="border px-3 py-3 rounded-lg w-full outline-none focus:border-[#2c3e50]/20"
        >
          <option :value="n" v-for="n in 50" :key="n">{{ n }}</option>
        </select>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, inject } from "vue";
const category = ["room", "apartment"];
const type = [
  {
    type: "room",
    text: "Standard room",
    price: "₦30,000.00 per night ",
  },
  {
    type: "room",
    text: "Executive room",
    price: "₦45,000.00 per night ",
  },
  {
    type: "apartment",
    text: "Standard apartment",
    price: "₦110,000.00 per night ",
  },
  {
    type: "apartment",
    text: "Executive apartment",
    price: "₦120,000.00 per night ",
  },
  {
    type: "apartment",
    text: "Platinum apartment",
    price: "₦150,000.00 per night ",
  },
];
const formData = inject("formData");
const compType = computed(() =>
  type.filter((i) => i.type === formData.category)
);
</script>
