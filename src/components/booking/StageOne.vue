<template>
  <div>
    <div class="grid lg:grid-cols-2 gap-x-8">
      <div class="text-left mb-6">
        <label class="block mb-2 text-xs">Arrival date</label>
        <datepicker
          v-model="v$.checkin.$model"
          class="border px-3 py-3 rounded-lg w-full outline-none focus:border-[#2c3e50]/20"
          type="date"
          :lowerLimit="new Date()"
        />
        <div
          class="text-red-500 mt-1"
          v-for="error of v$.checkin.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-error text-xs font-semibold">
            {{ error.$message }}
          </div>
        </div>
      </div>
      <div class="text-left mb-6">
        <label class="block mb-2 text-xs">Departure date</label>
        <datepicker
          v-model="v$.checkout.$model"
          class="border px-3 py-3 rounded-lg w-full outline-none focus:border-[#2c3e50]/20"
          inputFormat="yyyy-MM-dd"
          :lowerLimit="lowerLimit"
          :upperLimit="compEndDate"
        />
        <div
          class="text-red-500 mt-1"
          v-for="error of v$.checkout.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-error text-xs font-semibold">
            {{ error.$message }}
          </div>
        </div>
      </div>
    </div>
    <div class="grid lg:grid-cols-2 gap-x-8">
      <div class="text-left mb-6">
        <label class="block mb-2 text-xs">Room category</label>
        <select
          v-model="v$.category.$model"
          class="border px-3 py-3 rounded-lg w-full outline-none focus:border-[#2c3e50]/20 capitalize"
        >
          <option value="" disabled>Choose a category</option>
          <option v-for="cat in categories" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>
        <div
          class="text-red-500 mt-1"
          v-for="error of v$.category.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-error text-xs font-semibold">
            {{ error.$message }}
          </div>
        </div>
      </div>
      <div class="text-left mb-6">
        <label class="block mb-2 text-xs">Room type</label>
        <select
          v-model="v$.type.$model"
          class="border px-3 py-3 rounded-lg w-full outline-none focus:border-[#2c3e50]/20 capitalize"
        >
          <option value="" disabled>Choose a type</option>
          <option
            v-for="cat in compType"
            :key="cat.flat_type"
            :value="cat.flat_type"
          >
            {{ cat.flat_type }} -
            {{ currencyFormat(cat.price) }}
          </option>
        </select>
        <div
          class="text-red-500 mt-1"
          v-for="error of v$.type.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-error text-xs font-semibold">
            {{ error.$message }}
          </div>
        </div>
      </div>
    </div>
    <div class="grid lg:grid-cols-2 gap-x-8">
      <div class="text-left mb-6">
        <label class="block mb-2 text-xs">Number of rooms</label>
        <select
          v-model="v$.no_of_rooms.$model"
          class="border px-3 py-3 rounded-lg w-full outline-none focus:border-[#2c3e50]/20"
        >
          <option :value="n" v-for="n in 50" :key="n">{{ n }}</option>
        </select>
        <div
          class="text-red-500 mt-1"
          v-for="error of v$.no_of_rooms.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-error text-xs font-semibold">
            {{ error.$message }}
          </div>
        </div>
      </div>
      <div class="text-left mb-6">
        <label class="block mb-2 text-xs">Number of guests</label>
        <select
          v-model="v$.no_of_guests.$model"
          class="border px-3 py-3 rounded-lg w-full outline-none focus:border-[#2c3e50]/20"
        >
          <option :value="n" v-for="n in 50" :key="n">{{ n }}</option>
        </select>
        <div
          class="text-red-500 mt-1"
          v-for="error of v$.no_of_guests.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-error text-xs font-semibold">
            {{ error.$message }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center flex-col items-center">
      <button type="button" class="text-cs px-6 py-3 rounded-md">
        <!-- <span v-if="!isSearching">Click to check availability</span> -->
        <i
          v-if="isSearching"
          class="fa fa-spinner fa-spin"
          aria-hidden="true"
        ></i>
      </button>
      <span
        v-if="message"
        :class="`text-[11px] px-4 py-1 ${
          searchStatus === 'available' && 'bg-green-50 text-green-600'
        }
      ${searchStatus === 'unavailable' && 'bg-red-50 text-red-600'}
      ${searchStatus === 'less-available' && 'bg-gray-50 text-gray-600'}`"
        >{{ message }}</span
      >
    </div>
    <div
      class="flex flex-col lg:flex-row gap-5 items-center justify-between mt-10 max-w-[400px] sm:max-w-none mx-auto"
    >
      <button
        @click="stage--"
        type="button"
        :disabled="stage === 1"
        class="capitalize bg-transparent border border-gray-300 text-sm px-6 py-3 w-full lg:w-[150px] hover:opacity-80 active:scale-95 disabled:active:scale-100 rounded-lg disabled:cursor-not-allowed"
      >
        Back
      </button>
      <button
        @click="handleAvailability"
        type="button"
        :disabled="searchStatus === 'available'"
        class="capitalize bg-[#2d5c1f] text-white text-sm px-6 py-3 w-full lg:w-[150px] hover:opacity-80 active:scale-95 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  </div>
</template>
<script setup>
import { checkAvailability } from "@/services/roomservice";
import { computed, ref, inject, watch } from "vue";
import Datepicker from "vue3-datepicker";
import moment from "moment";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

const currencyFormat = inject("currencyFormat");
const categories = inject("categories");
const types = inject("types");
const formData = inject("formData");
const stage = inject("stage");
const compType = computed(() =>
  types.value.filter((i) => i.flat_name === formData.category)
);
const rules = {
  type: { required },
  category: { required },
  checkin: { required },
  checkout: { required },
  no_of_guests: { required },
  no_of_rooms: { required },
};
const v$ = useVuelidate(rules, formData);

const compEndDate = computed(() => {
  return new Date(moment(moment(formData.checkin)).add(4, "months"));
});
const lowerLimit = computed(() => {
  return new Date(moment(moment(formData.checkin)).add(1, "days"));
});
watch(lowerLimit, () => {
  formData.checkout = lowerLimit.value;
});
const isSearching = ref(false);
const searchStatus = ref("default");
const message = ref("");
async function handleAvailability() {
  const result = await v$.value.$validate();
  if (!result) return;
  isSearching.value = true;
  let detail = {};
  detail.rooms = formData.no_of_rooms;
  detail.flat_type = formData.type;
  detail.flat_name = formData.category;
  detail.guests = formData.no_of_guests;
  detail.checkin = formData.checkin;
  detail.checkout = formData.checkout;

  checkAvailability(detail)
    .then((res) => {
      if (res.status === 200) {
        isSearching.value = false;
        searchStatus.value = res.data.status;
        message.value = res.data.message;
        if (res.data.status === "available") {
          formData.flats = res.data.rooms;
          stage.value++;
        }
      }
    })
    .catch(() => {
      isSearching.value = false;
    });
}
</script>
