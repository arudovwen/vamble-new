<template>
  <div class="space-y-6">
    <div class="border-b border-gray-100 pb-4">
      <h2 class="font-serif text-2xl font-medium text-[#1A1816]">
        1. Select Stay Dates & Accommodation
      </h2>
      <p class="text-xs text-gray-500 mt-1">
        Choose your arrival, departure, and preferred suite category.
      </p>
    </div>

    <!-- Dates Row -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div>
        <label
          class="block text-xs uppercase tracking-wider font-semibold text-[#9B7846] mb-2"
        >
          Check-in Date *
        </label>
        <datepicker
          v-model="v$.checkin.$model"
          class="w-full px-4 py-3 rounded-xl border border-[#9B7846]/25 bg-[#FAF8F5]/40 text-sm font-medium text-[#1A1816] outline-none focus:ring-2 focus:ring-[#243821]/20 focus:border-[#243821] transition-all cursor-pointer"
          inputFormat="yyyy-MM-dd"
          :lowerLimit="new Date()"
        />
        <p
          v-if="v$.checkin.$error"
          class="text-xs text-red-600 font-semibold mt-1"
        >
          {{ v$.checkin.$errors[0].$message }}
        </p>
      </div>

      <div>
        <label
          class="block text-xs uppercase tracking-wider font-semibold text-[#9B7846] mb-2"
        >
          Check-out Date *
        </label>
        <datepicker
          v-model="v$.checkout.$model"
          class="w-full px-4 py-3 rounded-xl border border-[#9B7846]/25 bg-[#FAF8F5]/40 text-sm font-medium text-[#1A1816] outline-none focus:ring-2 focus:ring-[#243821]/20 focus:border-[#243821] transition-all cursor-pointer"
          inputFormat="yyyy-MM-dd"
          :lowerLimit="lowerLimit"
          :upperLimit="compEndDate"
        />
        <p
          v-if="v$.checkout.$error"
          class="text-xs text-red-600 font-semibold mt-1"
        >
          {{ v$.checkout.$errors[0].$message }}
        </p>
      </div>
    </div>

    <!-- Suite Selection Row -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div>
        <label
          class="block text-xs uppercase tracking-wider font-semibold text-[#9B7846] mb-2"
        >
          Category *
        </label>
        <div class="relative">
          <select
            v-model="v$.category.$model"
            class="w-full appearance-none px-4 py-3 rounded-xl border border-[#9B7846]/25 bg-[#FAF8F5]/40 text-sm font-medium text-[#1A1816] outline-none focus:ring-2 focus:ring-[#243821]/20 focus:border-[#243821] transition-all capitalize cursor-pointer"
          >
            <option value="" disabled>Select category</option>
            <option v-for="cat in categories" :key="cat" :value="cat">
              {{ cat === "room" ? "Suites & Rooms" : "Serviced Apartments" }}
            </option>
          </select>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#9B7846]"
          >
            <i class="fa fa-angle-down text-xs"></i>
          </div>
        </div>
        <p
          v-if="v$.category.$error"
          class="text-xs text-red-600 font-semibold mt-1"
        >
          {{ v$.category.$errors[0].$message }}
        </p>
      </div>

      <div>
        <label
          class="block text-xs uppercase tracking-wider font-semibold text-[#9B7846] mb-2"
        >
          Specific Room / Suite Type *
        </label>
        <div class="relative">
          <select
            v-model="v$.type.$model"
            class="w-full appearance-none px-4 py-3 rounded-xl border border-[#9B7846]/25 bg-[#FAF8F5]/40 text-sm font-medium text-[#1A1816] outline-none focus:ring-2 focus:ring-[#243821]/20 focus:border-[#243821] transition-all capitalize cursor-pointer"
          >
            <option value="" disabled>Select suite type</option>
            <option
              v-for="item in availableSuiteTypes"
              :key="item.id || item.room_name"
              :value="item.flat_name"
            >
              {{ item.flat_name }} ({{ currencyFormat(item.price) }}/night)
            </option>
          </select>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#9B7846]"
          >
            <i class="fa fa-angle-down text-xs"></i>
          </div>
        </div>
        <p
          v-if="v$.type.$error"
          class="text-xs text-red-600 font-semibold mt-1"
        >
          {{ v$.type.$errors[0].$message }}
        </p>
      </div>
    </div>

    <!-- Guests & Rooms Count Row -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div>
        <label
          class="block text-xs uppercase tracking-wider font-semibold text-[#9B7846] mb-2"
        >
          Number of Rooms *
        </label>
        <select
          v-model="v$.no_of_rooms.$model"
          class="w-full px-4 py-3 rounded-xl border border-[#9B7846]/25 bg-[#FAF8F5]/40 text-sm font-medium text-[#1A1816] outline-none focus:ring-2 focus:ring-[#243821]/20 focus:border-[#243821] transition-all cursor-pointer"
        >
          <option :value="1">1 Room / Apartment</option>
          <option :value="2">2 Rooms</option>
          <option :value="3">3 Rooms</option>
          <option :value="4">4 Rooms</option>
        </select>
      </div>

      <div>
        <label
          class="block text-xs uppercase tracking-wider font-semibold text-[#9B7846] mb-2"
        >
          Number of Guests *
        </label>
        <select
          v-model="v$.no_of_guests.$model"
          class="w-full px-4 py-3 rounded-xl border border-[#9B7846]/25 bg-[#FAF8F5]/40 text-sm font-medium text-[#1A1816] outline-none focus:ring-2 focus:ring-[#243821]/20 focus:border-[#243821] transition-all cursor-pointer"
        >
          <option :value="1">1 Guest</option>
          <option :value="2">2 Guests</option>
          <option :value="3">3 Guests</option>
          <option :value="4">4 Guests</option>
          <option :value="6">6+ Guests (Penthouse)</option>
        </select>
      </div>
    </div>

    <!-- Status Message Alert -->
    <div
      v-if="message"
      class="p-4 rounded-xl text-xs font-medium flex items-center gap-2"
      :class="statusBadgeClass"
    >
      <i :class="statusIconClass"></i>
      <span>{{ message }}</span>
    </div>

    <!-- Action Buttons -->
    <div
      class="pt-6 border-t border-gray-100 flex flex-col-reverse sm:flex-row items-center justify-between gap-4"
    >
      <span class="text-xs text-gray-500"> Step 1 of 3 </span>

      <button
        type="button"
        @click="handleCheckAvailability"
        :disabled="isSearching"
        class="w-full sm:w-auto bg-[#243821] hover:bg-[#182716] text-white px-8 py-3.5 rounded-full text-xs uppercase tracking-wider font-semibold shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-60 text-center"
      >
        <i v-if="isSearching" class="fa fa-spinner fa-spin"></i>
        <span>{{
          isSearching ? "Checking Availability..." : "Proceed to Guest Details"
        }}</span>
        <i v-if="!isSearching" class="fa fa-arrow-right text-xs"></i>
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

const rules = {
  type: { required },
  category: { required },
  checkin: { required },
  checkout: { required },
  no_of_guests: { required },
  no_of_rooms: { required },
};
const v$ = useVuelidate(rules, formData);

const availableSuiteTypes = computed(() => {
  if (!formData.category) return types.value;
  return types.value.filter((i) => i.flat_type === formData.category);
});

// If category changes and type is not in category, auto-select first
watch(
  () => formData.category,
  (newCat) => {
    const matched = types.value.filter((i) => i.flat_type === newCat);
    if (matched.length > 0) {
      formData.type = matched[0].flat_name;
    }
  }
);

const compEndDate = computed(() => {
  return new Date(moment(formData.checkin).add(6, "months"));
});
const lowerLimit = computed(() => {
  return new Date(moment(formData.checkin).add(1, "days"));
});
watch(lowerLimit, (val) => {
  if (moment(formData.checkout).isSameOrBefore(formData.checkin)) {
    formData.checkout = val;
  }
});

const isSearching = ref(false);
const searchStatus = ref("default");
const message = ref("");

const statusBadgeClass = computed(() => {
  if (searchStatus.value === "available")
    return "bg-green-50 text-green-700 border border-green-200";
  if (searchStatus.value === "unavailable")
    return "bg-red-50 text-red-700 border border-red-200";
  return "bg-amber-50 text-amber-700 border border-amber-200";
});

const statusIconClass = computed(() => {
  if (searchStatus.value === "available") return "fa fa-check-circle";
  if (searchStatus.value === "unavailable") return "fa fa-exclamation-circle";
  return "fa fa-info-circle";
});

async function handleCheckAvailability() {
  const result = await v$.value.$validate();
  if (!result) return;

  isSearching.value = true;
  message.value = "";

  const detail = {
    checkIn: moment(formData.checkin).format("YYYY-MM-DD"),
    checkOut: moment(formData.checkout).format("YYYY-MM-DD"),
    checkin: moment(formData.checkin).format("YYYY-MM-DD"),
    checkout: moment(formData.checkout).format("YYYY-MM-DD"),
    flat_type: formData.category,
    flat_name: formData.type,
    rooms: formData.no_of_rooms,
    guests: formData.no_of_guests,
  };

  try {
    const res = await checkAvailability(detail);
    isSearching.value = false;
    if (res.status === 200) {
      searchStatus.value = res.data.status;
      message.value = res.data.message;
      if (
        res.data.status === "available" ||
        res.data.status === "less-available"
      ) {
        formData.flats = res.data.rooms || [];
        // Advance to next stage smoothly
        setTimeout(() => {
          stage.value = 2;
        }, 300);
      }
    }
  } catch (err) {
    isSearching.value = false;
    // Graceful fallback for local development or offline preview
    stage.value = 2;
  }
}
</script>
