<template>
  <div
    class="w-full max-w-5xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-xl shadow-black/5 border border-[#9B7846]/20 p-4 sm:p-6 transition-all"
  >
    <form
      @submit.prevent="submitSearch"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end"
    >
      <!-- Check-in Date -->
      <div class="text-left">
        <label
          class="block text-[11px] uppercase tracking-wider font-semibold text-[#9B7846] mb-1.5 flex items-center gap-1.5"
        >
          <i class="fa fa-calendar-o text-xs"></i> Check-in Date
        </label>
        <datepicker
          v-model="formData.checkin"
          class="w-full px-3.5 py-2.5 rounded-xl border border-[#9B7846]/25 bg-[#FAF8F5]/50 text-sm font-medium text-[#1A1816] outline-none focus:ring-2 focus:ring-[#243821]/20 focus:border-[#243821] transition-all cursor-pointer"
          inputFormat="yyyy-MM-dd"
          :lowerLimit="new Date()"
        />
      </div>

      <!-- Check-out Date -->
      <div class="text-left">
        <label
          class="block text-[11px] uppercase tracking-wider font-semibold text-[#9B7846] mb-1.5 flex items-center gap-1.5"
        >
          <i class="fa fa-calendar-check-o text-xs"></i> Check-out Date
        </label>
        <datepicker
          v-model="formData.checkout"
          class="w-full px-3.5 py-2.5 rounded-xl border border-[#9B7846]/25 bg-[#FAF8F5]/50 text-sm font-medium text-[#1A1816] outline-none focus:ring-2 focus:ring-[#243821]/20 focus:border-[#243821] transition-all cursor-pointer"
          inputFormat="yyyy-MM-dd"
          :lowerLimit="lowerLimit"
          :upperLimit="compEndDate"
        />
      </div>

      <!-- Room Category -->
      <div class="text-left">
        <label
          class="block text-[11px] uppercase tracking-wider font-semibold text-[#9B7846] mb-1.5 flex items-center gap-1.5"
        >
          <i class="fa fa-bed text-xs"></i> Accommodation Type
        </label>
        <div class="relative">
          <select
            v-model="formData.category"
            class="w-full appearance-none px-3.5 py-2.5 rounded-xl border border-[#9B7846]/25 bg-[#FAF8F5]/50 text-sm font-medium text-[#1A1816] outline-none focus:ring-2 focus:ring-[#243821]/20 focus:border-[#243821] transition-all capitalize cursor-pointer"
          >
            <option value="">All Categories</option>
            <option v-for="cat in categories" :key="cat" :value="cat">
              {{ cat === "room" ? "Suites & Rooms" : "Serviced Apartments" }}
            </option>
          </select>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#9B7846]"
          >
            <i class="fa fa-angle-down text-xs"></i>
          </div>
        </div>
      </div>

      <!-- Guests -->
      <div class="text-left">
        <label
          class="block text-[11px] uppercase tracking-wider font-semibold text-[#9B7846] mb-1.5 flex items-center gap-1.5"
        >
          <i class="fa fa-user-o text-xs"></i> Guests
        </label>
        <div class="relative">
          <select
            v-model="formData.no_of_guests"
            class="w-full appearance-none px-3.5 py-2.5 rounded-xl border border-[#9B7846]/25 bg-[#FAF8F5]/50 text-sm font-medium text-[#1A1816] outline-none focus:ring-2 focus:ring-[#243821]/20 focus:border-[#243821] transition-all cursor-pointer"
          >
            <option :value="1">1 Guest</option>
            <option :value="2">2 Guests</option>
            <option :value="3">3 Guests</option>
            <option :value="4">4 Guests</option>
            <option :value="5">5+ Guests (Penthouse)</option>
          </select>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#9B7846]"
          >
            <i class="fa fa-angle-down text-xs"></i>
          </div>
        </div>
      </div>

      <!-- Action Button -->
      <div>
        <button
          type="submit"
          class="w-full bg-[#243821] hover:bg-[#182716] text-white py-3 px-5 rounded-xl text-xs uppercase tracking-wider font-semibold shadow-md shadow-[#243821]/20 hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <span>Check Availability</span>
          <i class="fa fa-arrow-right text-xs"></i>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { getRoomCategories, getRoomTypes } from "@/services/roomservice";
import { computed, reactive, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import Datepicker from "vue3-datepicker";
import moment from "moment";

const router = useRouter();
const categories = ref([]);
const types = ref([]);

const formData = reactive({
  checkin: new Date(),
  checkout: new Date(moment().add(1, "days")),
  category: "",
  type: "",
  no_of_rooms: 1,
  no_of_guests: 2,
});

onMounted(async () => {
  try {
    const catRes = await getRoomCategories();
    if (catRes.status === 200) {
      categories.value = catRes.data;
    }
  } catch (err) {
    categories.value = ["room", "apartment"];
  }

  try {
    const typeRes = await getRoomTypes();
    if (typeRes.status === 200) {
      types.value = typeRes.data;
    }
  } catch (err) {
    console.error("Failed loading room types", err);
  }
});

const compEndDate = computed(() => {
  return new Date(moment(formData.checkin).add(6, "months"));
});

const lowerLimit = computed(() => {
  return new Date(moment(formData.checkin).add(1, "days"));
});

watch(lowerLimit, (newVal) => {
  if (moment(formData.checkout).isSameOrBefore(formData.checkin)) {
    formData.checkout = newVal;
  }
});

function submitSearch() {
  const checkinStr = moment(formData.checkin).format("YYYY-MM-DD");
  const checkoutStr = moment(formData.checkout).format("YYYY-MM-DD");
  router.push({
    path: "/booking",
    query: {
      checkin: checkinStr,
      checkout: checkoutStr,
      category: formData.category || undefined,
      guests: formData.no_of_guests,
    },
  });
}
</script>
