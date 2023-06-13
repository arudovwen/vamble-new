<template>
  <div
    class="shadow-ex bg-white px-5 py-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 items-center gap-6 hidden lg:grid"
  >
    <div class="text-left">
      <span class="text-xs font-semibold text-[#2d5c1f] block mb-2"
        >Arrival date</span
      >

      <input
        v-model="formData.checkin"
        class="border px-3 py-2 rounded-lg text-sm w-full outline-none focus:border-[#2c3e50]/20"
        type="date"
      />
    </div>

    <div class="text-left">
      <span class="text-xs font-semibold text-[#2d5c1f] block mb-2"
        >Arrival date</span
      >
      <input
        v-model="formData.checkout"
        class="border px-3 py-2 rounded-lg text-sm w-full outline-none focus:border-[#2c3e50]/20"
        type="date"
      />
    </div>

    <div class="text-left">
      <span class="text-xs font-semibold text-[#2d5c1f] block mb-2"
        >Room category</span
      >
      <select
        v-model="formData.category"
        class="border px-3 py-2 rounded-lg text-sm w-full outline-none focus:border-[#2c3e50]/20 capitalize"
      >
        <option value="" disabled>Choose</option>
        <option v-for="cat in category" :key="cat" :value="cat">
          {{ cat }}
        </option>
      </select>
    </div>
    <div class="text-left">
      <span class="text-xs font-semibold text-[#2d5c1f] block mb-2"
        >Room Type</span
      >
      <select
        v-model="formData.type"
        class="border px-3 py-2 rounded-lg text-sm w-full outline-none focus:border-[#2c3e50]/20 capitalize"
      >
        <option value="" disabled>Choose</option>
        <option v-for="cat in compType" :key="cat.text" :value="cat.text">
          {{ cat.text }}
        </option>
      </select>
    </div>

    <div class="flex gap-x-2">
      <div class="text-left">
        <span class="text-xs font-semibold text-[#2d5c1f] block mb-2"
          >Rooms</span
        >
        <select
          v-model="formData.no_of_guests"
          class="border px-3 py-2 rounded-lg text-sm w-full outline-none focus:border-[#2c3e50]/20"
        >
          <option :value="n" v-for="n in 50" :key="n">{{ n }}</option>
        </select>
      </div>

      <div class="text-left">
        <span class="text-xs font-semibold text-[#2d5c1f] block mb-2"
          >Guests</span
        >
        <select
          v-model="formData.no_of_guests"
          class="border px-3 py-2 rounded-lg text-sm w-full outline-none focus:border-[#2c3e50]/20"
        >
          <option :value="n" v-for="n in 50" :key="n">{{ n }}</option>
        </select>
      </div>
    </div>
    <div>
      <button
        type="button"
        class="capitalize bg-[#2d5c1f]/90 text-white text-sm px-6 py-2 font-semibold rounded-sm hover:opacity-80 active:scale-95"
      >
        Check Availability
      </button>
    </div>
  </div>
</template>
<script setup>
import { computed, reactive } from "vue";
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
const formData = reactive({
  checkin: "",
  checkout: "",
  category: "",
  type: "",
  no_of_rooms: "",
  no_of_guests: "",
  fullName: "",
  email: "",
  phone: "",
  gender: "",
  nationality: "",
  address: "",
  coupon: "",
});
const compType = computed(() =>
  type.filter((i) => i.type === formData.category)
);
</script>

<style>
.shadow-ex {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
</style>
