<template>
  <div
    class="shadow-ex bg-white px-5 py-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 items-center gap-6 hidden lg:grid"
  >
    <div class="text-left">
      <span class="text-xs font-semibold text-[#2d5c1f] block mb-2"
        >Arrival date</span
      >

      <datepicker
        v-model="formData.checkin"
        class="border px-3 py-2 rounded-lg text-sm w-full outline-none focus:border-[#2c3e50]/20"
        inputFormat="yyyy-MM-dd"
      />
    </div>

    <div class="text-left">
      <span class="text-xs font-semibold text-[#2d5c1f] block mb-2"
        >Departure date</span
      >
      <datepicker
        v-model="formData.checkout"
        class="border px-3 py-2 rounded-lg text-sm w-full outline-none focus:border-[#2c3e50]/20"
        inputFormat="yyyy-MM-dd"
        :lowerLimit="lowerLimit"
        :upperLimit="compEndDate"
      />
    </div>

    <div class="text-left">
      <span class="text-xs font-semibold text-[#2d5c1f] block mb-2"
        >Room category</span
      >
      <select
        v-model="formData.category"
        class="border px-3 py-2 rounded-lg text-[13px] w-full outline-none focus:border-[#2c3e50]/20 capitalize"
      >
        <option value="" disabled>Choose category</option>
        <option v-for="cat in categories" :key="cat" :value="cat">
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
        class="border px-3 py-2 rounded-lg text-[13px] w-full outline-none focus:border-[#2c3e50]/20 capitalize"
      >
        <option value="" disabled>Choose type</option>
        <option
          v-for="cat in compType"
          :key="cat.flat_type"
          :value="cat.flat_type"
        >
          {{ cat.flat_type }} -
          {{ currencyFormat(cat.price) }}
        </option>
      </select>
    </div>

    <div class="flex gap-x-2">
      <div class="text-left">
        <span class="text-xs font-semibold text-[#2d5c1f] block mb-2"
          >Rooms</span
        >
        <select
          v-model="formData.no_of_rooms"
          class="border px-3 py-2 rounded-lg text-[13px] w-full outline-none focus:border-[#2c3e50]/20"
        >
          <option :value="n" v-for="n in 20" :key="n">{{ n }}</option>
        </select>
      </div>

      <div class="text-left">
        <span class="text-xs font-semibold text-[#2d5c1f] block mb-2"
          >Guests</span
        >
        <select
          v-model="formData.no_of_guests"
          class="border px-3 py-2 rounded-lg text-[13px] w-full outline-none focus:border-[#2c3e50]/20"
        >
          <option :value="n" v-for="n in 20" :key="n">{{ n }}</option>
        </select>
      </div>
    </div>
    <div>
      <router-link
        :to="
          encodeURI(
            `/booking?checkin=${formData.checkin}&checkout=${formData.checkout}&category=${formData.category}&type=${formData.type}&guests=${formData.no_of_guests}&rooms=${formData.no_of_rooms}`
          )
        "
      >
        <button
          type="button"
          class="capitalize bg-[#2d5c1f]/90 text-white text-sm px-6 py-2 font-semibold rounded-sm hover:opacity-80 active:scale-95"
        >
          Check Availability
        </button>
      </router-link>
    </div>
  </div>
</template>
<script setup>
import { getRoomCategories, getRoomTypes } from "@/services/roomservice";
import { computed, reactive, onMounted, ref, inject, watch } from "vue";
import Datepicker from "vue3-datepicker";
import moment from "moment";

const currencyFormat = inject("currencyFormat");
const categories = ref([]);
const types = ref([]);
const formData = reactive({
  checkin: new Date(),
  checkout: new Date(moment(moment(new Date())).add(1, "days")),
  category: "",
  type: "",
  no_of_rooms: 1,
  no_of_guests: 1,
});
const compType = computed(() =>
  types.value.filter((i) => i.flat_name === formData.category)
);

onMounted(() => {
  getRoomCategories().then((res) => {
    if (res.status === 200) {
      categories.value = res.data;
    }
  });
  getRoomTypes().then((res) => {
    if (res.status === 200) {
      types.value = res.data;
    }
  });
});
const compEndDate = computed(() => {
  return new Date(moment(moment(formData.checkin)).add(4, "months"));
});
const lowerLimit = computed(() => {
  return new Date(moment(moment(formData.checkin)).add(1, "days"));
});
watch(lowerLimit, () => {
  formData.checkout = lowerLimit.value;
});
</script>

<style>
.shadow-ex {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
</style>
