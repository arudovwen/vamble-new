<template>
  <div class="w-full max-w-5xl mx-auto bg-white rounded shadow-sm p-2 sm:p-3 transition-all">
    <form
      @submit.prevent="submitSearch"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 items-stretch"
    >
      <!-- Check-in Date -->
      <div class="text-left bg-[#FCFBF9] p-3 sm:px-4 sm:py-3 h-full flex flex-col justify-center">
        <label class="text-[10px] uppercase tracking-wider font-semibold text-[#8C6D41] mb-1 flex items-center gap-1.5">
          <i class="fa fa-calendar-o text-xs"></i> Check-in Date
        </label>
        
        <datepicker
          v-model="formData.checkin"
          class="custom-datepicker w-full bg-transparent text-sm font-medium text-[#1A1816] outline-none cursor-pointer"
          inputFormat="MM/dd/yyyy"
          :lowerLimit="new Date()"
        />
      </div>

      <!-- Check-out Date -->
      <div class="text-left bg-[#FCFBF9] p-3 sm:px-4 sm:py-3 h-full flex flex-col justify-center">
        <label class="text-[10px] uppercase tracking-wider font-semibold text-[#8C6D41] mb-1 flex items-center gap-1.5">
          <i class="fa fa-calendar-o text-xs"></i> Check-out Date
        </label>
        <datepicker
          v-model="formData.checkout"
          class="custom-datepicker w-full bg-transparent text-sm font-medium text-[#1A1816] outline-none cursor-pointer"
          inputFormat="MM/dd/yyyy"
          :lowerLimit="lowerLimit"
          :upperLimit="compEndDate"
        />
      </div>

      <!-- Room Category -->
      <div class="text-left bg-[#FCFBF9] p-3 sm:px-4 sm:py-3 h-full flex flex-col justify-center">
        <label class="block text-[10px] uppercase tracking-wider font-semibold text-[#8C6D41] mb-1 flex items-center gap-1.5">
          <i class="fa fa-bed text-xs"></i> Category
        </label>
        <div class="relative">
          <select
            v-model="formData.category"
            class="w-full appearance-none bg-transparent text-sm font-medium text-[#1A1816] outline-none capitalize cursor-pointer"
          >
            <option value="">Standard Room</option>
            <option v-for="cat in categories" :key="cat" :value="cat">
              {{ cat === "room" ? "Standard Room" : "Serviced Apartments" }}
            </option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center text-[#1A1816]">
            <i class="fa fa-angle-down text-xs"></i>
          </div>
        </div>
      </div>

      <!-- Guests -->
      <div class="text-left bg-[#FCFBF9] p-3 sm:px-4 sm:py-3 h-full flex flex-col justify-center">
        <label class="block text-[10px] uppercase tracking-wider font-semibold text-[#8C6D41] mb-1 flex items-center gap-1.5">
          <i class="fa fa-users text-xs"></i> Residency
        </label>
        <div class="relative">
          <select
            v-model="formData.no_of_guests"
            class="w-full appearance-none bg-transparent text-sm font-medium text-[#1A1816] outline-none cursor-pointer"
          >
            <option :value="1">1 Guest</option>
            <option :value="2">2 Guests</option>
            <option :value="3">3 Guests</option>
            <option :value="4">4 Guests</option>
            <option :value="5">5+ Guests</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center text-[#1A1816]">
            <i class="fa fa-angle-down text-xs"></i>
          </div>
        </div>
      </div>

      <!-- Action Button -->
      <div class="h-full">
        <button
          type="submit"
          class="w-full h-full bg-[#102411] hover:bg-[#0B1A0C] text-white py-3 px-5 text-sm tracking-wide font-medium transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <i class="fa fa-search text-sm"></i>
          <span>Check Rates</span>
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
<style scoped>
/* Wrapper styling */
.datepicker-wrapper {
  max-width: 320px;
  margin: 40px auto;
  font-family: 'Inter', system-ui, sans-serif;
  text-align: center;
}

/* Custom datepicker input */
:deep(.custom-datepicker input) {
  width: 100%;
  padding: 0;
  font-size: 14px;
  border: none;
  background-color: transparent;
  color: #1A1816;
  box-shadow: none;
  font-weight: 500;
  outline: none;
}

:deep(.custom-datepicker input:focus) {
  border: none;
  box-shadow: none;
  outline: none;
}

/* Popup calendar styling */
:deep(.custom-datepicker .datepicker-popup) {
  border-radius: 10px;
  border: 1px solid #e0e0e0;
  background: #fff;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  padding: 8px;
  animation: fadeIn 0.15s ease-in-out;
}

/* Calendar day cells */
:deep(.custom-datepicker .cell) {
  border-radius: 6px;
  transition: background 0.2s ease, color 0.2s ease;
}

:deep(.custom-datepicker .cell:hover) {
  background: #f0f4ff;
  color: #4a90e2;
}

:deep(.custom-datepicker .cell.selected) {
  background: #4a90e2;
  color: #fff;
}

/* Fade-in animation */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Selected date text */
.selected-date {
  margin-top: 12px;
  font-size: 14px;
  color: #666;
}
</style>