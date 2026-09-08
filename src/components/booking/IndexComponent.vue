<template>
  <section class="min-h-screen py-8 lg:py-16 bg-[#FAF8F5]">
    <div class="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
      <!-- Top Title Bar -->
      <div class="mb-8 sm:mb-10 text-left">
        <router-link
          to="/"
          class="inline-flex items-center gap-2 text-xs font-semibold text-[#9B7846] hover:text-[#243821] transition-colors mb-3"
        >
          <i class="fa fa-arrow-left"></i>
          <span>Return to Home</span>
        </router-link>
        <h1
          class="font-serif text-2xl sm:text-4xl lg:text-5xl text-[#1A1816] font-normal"
        >
          Reservation &
          <span class="italic text-[#243821] font-serif">Booking Checkout</span>
        </h1>
        <p class="text-xs sm:text-sm text-gray-600 mt-2 font-sans">
          Complete your details below to reserve your luxury stay at Vamble
          Apartments & Suites, Jahi Abuja.
        </p>
      </div>

      <!-- Confirmation Screen (Stage 4) takes full width -->
      <div v-if="stage === 4">
        <StageFour />
      </div>

      <!-- Multi-step Checkout Layout (Stages 1-3) -->
      <div
        v-else
        class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start text-left"
      >
        <!-- Left Column: Checkout Steps & Forms -->
        <div
          class="lg:col-span-8 bg-white rounded-3xl p-4 sm:p-8 lg:p-10 border border-[#9B7846]/20 shadow-lg space-y-6 sm:space-y-8"
        >
          <!-- Stepper Indicator -->
          <div class="grid grid-cols-3 gap-2 sm:gap-3 border-b border-[#9B7846]/15 pb-4 sm:pb-6">
            <div
              v-for="s in stages"
              :key="s.id"
              :class="[
                stage === s.id
                  ? 'border-[#243821] text-[#243821] font-bold'
                  : stage > s.id
                  ? 'border-[#9B7846] text-[#9B7846]'
                  : 'border-gray-200 text-gray-400',
                'border-t-2 pt-3 text-[11px] sm:text-xs uppercase tracking-wider flex items-center gap-1.5 sm:gap-2 transition-all',
              ]"
            >
              <span
                :class="[
                  stage === s.id
                    ? 'bg-[#243821] text-white'
                    : stage > s.id
                    ? 'bg-[#9B7846] text-white'
                    : 'bg-gray-100 text-gray-400',
                  'w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0',
                ]"
              >
                {{ stage > s.id ? "✓" : s.id }}
              </span>
              <span class="hidden sm:inline">{{ s.text }}</span>
              <span class="sm:hidden text-[10px] truncate">{{ s.short }}</span>
            </div>
          </div>

          <!-- Active Form Stage -->
          <div>
            <StageOne v-if="stage === 1" />
            <StageTwo v-if="stage === 2" />
            <StageThree v-if="stage === 3" />
          </div>
        </div>

        <!-- Right Column: Sticky Reservation Summary Card -->
        <div class="lg:col-span-4 sticky top-28 space-y-6">
          <div
            class="bg-white rounded-3xl p-6 sm:p-8 border border-[#9B7846]/20 shadow-lg space-y-6"
          >
            <div
              class="flex items-center justify-between pb-4 border-b border-[#9B7846]/15"
            >
              <h3 class="font-serif text-xl font-medium text-[#1A1816]">
                Reservation Summary
              </h3>
              <span
                class="text-xs uppercase tracking-wider font-semibold text-[#9B7846] bg-[#9B7846]/10 px-3 py-1 rounded-full"
              >
                Abuja, NG
              </span>
            </div>

            <!-- Suite Image Preview & Name -->
            <div class="space-y-3">
              <div
                class="aspect-[16/10] rounded-2xl overflow-hidden bg-gray-100 border border-gray-100"
              >
                <img
                  :src="summaryImage"
                  alt="Selected Suite"
                  class="w-full h-full object-cover"
                />
              </div>
              <div>
                <span
                  class="text-[10px] uppercase tracking-widest text-[#9B7846] font-semibold"
                >
                  {{
                    activeSuite?.flat_type === "apartment"
                      ? "Serviced Apartment"
                      : "Private Suite"
                  }}
                </span>
                <h4 class="font-serif text-lg font-medium text-[#1A1816]">
                  {{
                    activeSuite?.flat_name ||
                    formData.type ||
                    "Standard Luxury Room"
                  }}
                </h4>
                <p class="text-xs text-gray-500">
                  Plot 790, Sector Centre, Cadastral Zone, Jahi, Abuja
                </p>
              </div>
            </div>

            <!-- Schedule Dates -->
            <div
              class="p-4 rounded-2xl bg-[#FAF8F5] border border-[#9B7846]/15 space-y-3 text-xs"
            >
              <div class="flex justify-between items-center">
                <span class="text-gray-500">Check-in:</span>
                <span class="font-bold text-[#1A1816]"
                  >{{
                    moment(formData.checkin).format("ddd, MMM D, YYYY")
                  }}
                  (2:00 PM)</span
                >
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-500">Check-out:</span>
                <span class="font-bold text-[#1A1816]"
                  >{{
                    moment(formData.checkout).format("ddd, MMM D, YYYY")
                  }}
                  (12:00 PM)</span
                >
              </div>
              <div
                class="flex justify-between items-center pt-2 border-t border-[#9B7846]/15"
              >
                <span class="text-gray-500">Duration:</span>
                <span class="font-bold text-[#243821]"
                  >{{ totalNights }}
                  {{ totalNights === 1 ? "Night" : "Nights" }}</span
                >
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-500">Guests & Rooms:</span>
                <span class="font-bold text-[#1A1816]"
                  >{{ formData.no_of_guests }} Guests •
                  {{ formData.no_of_rooms }} Room</span
                >
              </div>
            </div>

            <!-- Price Breakdown -->
            <div class="space-y-2.5 text-xs">
              <div class="flex justify-between text-gray-600">
                <span
                  >Room Rate ({{ currencyFormat(ratePerNight) }} ×
                  {{ totalNights }} nights)</span
                >
                <span class="font-medium text-[#1A1816]">{{
                  currencyFormat(subTotal)
                }}</span>
              </div>
              <div class="flex justify-between text-gray-600">
                <span>Taxes & Service Charge</span>
                <span class="font-medium text-[#243821]"
                  >Included (7.5% VAT)</span
                >
              </div>
              <div
                v-if="discountAmount > 0"
                class="flex justify-between text-green-700 font-semibold"
              >
                <span>Coupon Savings</span>
                <span>-{{ currencyFormat(discountAmount) }}</span>
              </div>

              <!-- Grand Total -->
              <div
                class="pt-4 border-t border-[#9B7846]/20 flex justify-between items-baseline"
              >
                <div>
                  <span
                    class="text-xs uppercase tracking-wider font-semibold text-gray-500 block"
                    >Total Due</span
                  >
                  <span class="text-[10px] text-gray-400"
                    >All taxes included</span
                  >
                </div>
                <div class="text-right">
                  <span class="font-serif text-2xl font-bold text-[#243821]">
                    {{ currencyFormat(finalTotal) }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Trust Guarantees -->
            <div
              class="pt-4 border-t border-gray-100 space-y-2 text-[11px] text-gray-500"
            >
              <div class="flex items-center gap-2">
                <i class="fa fa-shield text-[#243821]"></i>
                <span>Secure SSL Encrypted Checkout</span>
              </div>
              <div class="flex items-center gap-2">
                <i class="fa fa-bolt text-[#9B7846]"></i>
                <span>Instant Confirmation & Digital Key Pass</span>
              </div>
              <div class="flex items-center gap-2">
                <i class="fa fa-phone text-[#9B7846]"></i>
                <span>24/7 Concierge Support on Arrival</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import StageOne from "./StageOne.vue";
import StageTwo from "./StageTwo.vue";
import StageThree from "./StageThree.vue";
import StageFour from "./StageFour.vue";
import { ref, reactive, provide, onMounted, computed } from "vue";
import store from "@/store";
import moment from "moment";
import { useRoute } from "vue-router";
import { getRoomCategories, getRoomTypes } from "@/services/roomservice";

const route = useRoute();
const currencyFormat = (val) => `₦${Number(val || 0).toLocaleString()}`;
const userInfo = computed(() => store.getters.userInfo || {});

const formData = reactive({
  checkin: route.query.checkin ? new Date(route.query.checkin) : new Date(),
  checkout: route.query.checkout
    ? new Date(route.query.checkout)
    : new Date(moment().add(1, "days")),
  category: route.query.category || "room",
  type: route.query.type || "",
  no_of_rooms: Number(route.query.no_of_rooms) || 1,
  no_of_guests: Number(route.query.guests || route.query.no_of_guests) || 2,
  name: userInfo.value.name || "",
  email: userInfo.value.email || "",
  phone: userInfo.value.phone || "",
  gender: userInfo.value.gender || "male",
  nationality: userInfo.value.nationality || "Nigerian",
  address: userInfo.value.address || "Abuja, Nigeria",
  special_requests: "",
  coupon: "",
  total_price: 0,
  payment_type: "online",
  payment_status: "pending",
  status: "reserved",
  price_per_night: 65000,
  room_id: "",
  flats: [],
  bookingNo: null,
  response: null,
});

const categories = ref([]);
const types = ref([]);
const stage = ref(1);
const discountAmount = ref(0);

const stages = [
  { id: 1, text: "Dates & Suite", short: "Dates" },
  { id: 2, text: "Guest Details", short: "Details" },
  { id: 3, text: "Payment", short: "Payment" },
];

const totalNights = computed(() => {
  const diff = moment(formData.checkout)
    .startOf("day")
    .diff(moment(formData.checkin).startOf("day"), "days");
  return diff > 0 ? diff : 1;
});

const activeSuite = computed(() => {
  if (!types.value.length) return null;
  return (
    types.value.find(
      (r) =>
        r.flat_name?.toLowerCase() === formData.type?.toLowerCase() ||
        r.room_name?.toLowerCase() === formData.type?.toLowerCase()
    ) ||
    types.value.find((r) => r.flat_type === formData.category) ||
    types.value[0]
  );
});

const ratePerNight = computed(() => {
  return activeSuite.value?.price || formData.price_per_night || 65000;
});

const subTotal = computed(() => {
  return ratePerNight.value * totalNights.value * formData.no_of_rooms;
});

const finalTotal = computed(() => {
  const total = subTotal.value - discountAmount.value;
  return total > 0 ? total : 0;
});

const summaryImage = computed(() => {
  const name = activeSuite.value?.flat_name?.toLowerCase() || "";
  if (name.includes("executive"))
    return require("@/assets/images/rooms/bed6.jpg");
  if (name.includes("1-bedroom"))
    return require("@/assets/images/rooms/living1.jpg");
  if (name.includes("2-bedroom"))
    return require("@/assets/images/rooms/sitting7.jpg");
  if (name.includes("penthouse"))
    return require("@/assets/images/rooms/sitting16.jpg");
  return require("@/assets/images/rooms/bed1.jpg");
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
      if (!formData.type && types.value.length > 0) {
        formData.type = types.value[0].flat_name;
        formData.price_per_night = types.value[0].price;
        formData.room_id = types.value[0].id;
      }
    }
  } catch (err) {
    console.error("Error loading room types:", err);
  }
});

provide("formData", formData);
provide("stage", stage);
provide("categories", categories);
provide("types", types);
provide("totalNights", totalNights);
provide("currencyFormat", currencyFormat);
provide("discountAmount", discountAmount);
provide("ratePerNight", ratePerNight);
provide("finalTotal", finalTotal);
provide("activeSuite", activeSuite);
</script>
