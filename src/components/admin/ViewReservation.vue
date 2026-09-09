<template>
  <div class="text-left font-sans flex flex-col">
    <!-- Executive Header -->
    <div class="p-6 bg-[#132212] text-white flex items-start justify-between border-b border-white/10">
      <div class="flex items-center gap-3.5">
        <div class="w-12 h-12 rounded-2xl bg-[#9B7846] text-white flex items-center justify-center text-lg font-bold border border-white/20 shadow-md">
          <i class="fa fa-concierge-bell"></i>
        </div>
        <div>
          <div class="flex items-center gap-2">
            <span class="text-[10px] uppercase tracking-widest text-[#c5a880] font-bold">Reservation Folio</span>
            <span
              class="px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wider inline-block"
              :class="
                booking.payment_status === 'paid'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              "
            >
              {{ booking.payment_status || "Paid" }}
            </span>
          </div>
          <h3 class="font-serif text-xl font-normal text-white mt-0.5">
            Booking #{{ booking.booking_no }}
          </h3>
        </div>
      </div>

      <button
        @click="isOpen = false"
        type="button"
        class="text-white/60 hover:text-white text-sm w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-colors"
      >
        <i class="fa fa-times"></i>
      </button>
    </div>

    <!-- Status & Timing Banner -->
    <div class="p-5 bg-[#FAF8F5] border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-[#243821]/10 text-[#243821] flex items-center justify-center font-serif font-bold text-sm">
          {{ (booking.user?.name || "G").charAt(0).toUpperCase() }}
        </div>
        <div>
          <span class="text-[10px] text-gray-400 uppercase font-bold block">Primary Guest</span>
          <span class="font-medium text-sm text-[#1A1816] capitalize">{{ booking.user?.name || "Valued Guest" }}</span>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <span
          class="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 border"
          :class="getStatusClass(booking.status)"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-current"></span>
          {{ booking.status || "Confirmed" }}
        </span>
      </div>
    </div>

    <!-- Content Sections -->
    <div class="p-6 space-y-5 text-xs max-h-[65vh] overflow-y-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Guest Details Card -->
        <div class="bg-gray-50/70 p-4 rounded-2xl border border-gray-200/80 space-y-2.5">
          <div class="flex items-center gap-2 pb-2 border-b border-gray-200/60">
            <i class="fa fa-user-circle text-[#9B7846] text-sm"></i>
            <h4 class="font-serif text-xs font-bold text-[#1A1816] uppercase tracking-wider">
              Guest Profile
            </h4>
          </div>
          <div class="flex justify-between py-1 border-b border-gray-100">
            <span class="text-gray-500">Email Address</span>
            <span class="text-[#1A1816] font-medium">{{ booking.user?.email || "—" }}</span>
          </div>
          <div class="flex justify-between py-1 border-b border-gray-100">
            <span class="text-gray-500">Phone Contact</span>
            <span class="text-[#1A1816] font-mono">{{ booking.user?.phone || "—" }}</span>
          </div>
          <div class="flex justify-between py-1 border-b border-gray-100">
            <span class="text-gray-500">Nationality</span>
            <span class="text-[#1A1816] capitalize">{{ booking.user?.nationality || "Nigerian" }}</span>
          </div>
          <div class="flex justify-between py-1">
            <span class="text-gray-500">Physical Address</span>
            <span class="text-[#1A1816] text-right max-w-[180px] truncate" :title="booking.user?.address">
              {{ booking.user?.address || "—" }}
            </span>
          </div>
        </div>

        <!-- Stay Specifications Card -->
        <div class="bg-gray-50/70 p-4 rounded-2xl border border-gray-200/80 space-y-2.5">
          <div class="flex items-center gap-2 pb-2 border-b border-gray-200/60">
            <i class="fa fa-hotel text-[#9B7846] text-sm"></i>
            <h4 class="font-serif text-xs font-bold text-[#1A1816] uppercase tracking-wider">
              Suite & Schedule
            </h4>
          </div>
          <div class="flex justify-between py-1 border-b border-gray-100">
            <span class="text-gray-500">Residence Suite</span>
            <span class="font-bold text-[#243821]">
              {{ booking.room?.flat_name || booking.room?.room_name || booking.room || "Luxury Suite" }}
            </span>
          </div>
          <div class="flex justify-between py-1 border-b border-gray-100">
            <span class="text-gray-500">Arrival (Check-in)</span>
            <span class="font-mono font-medium text-[#1A1816]">
              {{ moment(booking.check_in).format("MMM DD, YYYY") }}
            </span>
          </div>
          <div class="flex justify-between py-1 border-b border-gray-100">
            <span class="text-gray-500">Departure (Check-out)</span>
            <span class="font-mono font-medium text-[#1A1816]">
              {{ moment(booking.check_out).format("MMM DD, YYYY") }}
            </span>
          </div>
          <div class="flex justify-between py-1">
            <span class="text-gray-500">Guests & Suites</span>
            <span class="text-[#1A1816] font-medium">
              {{ booking.no_of_guests || 2 }} Guests &bull; {{ booking.no_of_rooms || 1 }} Room
            </span>
          </div>
        </div>
      </div>

      <!-- Timestamps Row if available -->
      <div v-if="booking.check_in_time || booking.check_out_time" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div v-if="booking.check_in_time" class="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center gap-3">
          <i class="fa fa-user-check text-emerald-600 text-base"></i>
          <div>
            <span class="text-[10px] text-emerald-800 uppercase font-bold block">Actual Check-In</span>
            <span class="font-mono text-xs font-semibold text-emerald-950">
              {{ moment(booking.check_in_time).format("MMM DD, YYYY · HH:mm") }}
            </span>
          </div>
        </div>
        <div v-if="booking.check_out_time" class="p-3 bg-gray-100 rounded-xl border border-gray-200 flex items-center gap-3">
          <i class="fa fa-sign-out-alt text-gray-600 text-base"></i>
          <div>
            <span class="text-[10px] text-gray-700 uppercase font-bold block">Actual Check-Out</span>
            <span class="font-mono text-xs font-semibold text-gray-900">
              {{ moment(booking.check_out_time).format("MMM DD, YYYY · HH:mm") }}
            </span>
          </div>
        </div>
      </div>

      <!-- Financial Breakdown -->
      <div class="p-4 rounded-2xl bg-[#FAF8F5] border border-[#9B7846]/20 flex items-center justify-between">
        <div>
          <span class="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Folio Financial Total</span>
          <span class="text-xs text-gray-600">All nights, amenities & service charges inclusive</span>
        </div>
        <div class="text-right">
          <span class="font-serif font-bold text-xl text-[#243821] block">
            {{ currencyFormat(booking.total_price) }}
          </span>
          <span class="text-[10px] text-emerald-700 font-semibold inline-flex items-center gap-1">
            <i class="fa fa-check-circle"></i> Verified Payment
          </span>
        </div>
      </div>
    </div>

    <!-- Footer Actions -->
    <div class="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-3">
      <button
        @click="isOpen = false"
        type="button"
        class="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold text-xs transition-colors"
      >
        Close Folio
      </button>

      <button
        v-if="!booking.check_in_time"
        :disabled="isLoading"
        @click="handleCheckin"
        class="inline-flex items-center gap-2 bg-[#243821] hover:bg-[#182716] text-white px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold shadow-md active:scale-95 transition-all disabled:opacity-50"
      >
        <i v-if="isLoading" class="fa fa-spinner fa-spin"></i>
        <i v-else class="fa fa-user-check"></i>
        <span>Check In Guest</span>
      </button>

      <button
        v-if="booking.check_in_time && !booking.check_out_time"
        :disabled="isLoading"
        @click="handleCheckout"
        class="inline-flex items-center gap-2 bg-[#9B7846] hover:bg-[#7D5F33] text-white px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold shadow-md active:scale-95 transition-all disabled:opacity-50"
      >
        <i v-if="isLoading" class="fa fa-spinner fa-spin"></i>
        <i v-else class="fa fa-sign-out-alt"></i>
        <span>Check Out Guest</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, inject, ref } from "vue";
import moment from "moment";
import { customerCheckin, customerCheckout } from "@/services/userservices";
import { useToast } from "vue-toast-notification";

const props = defineProps(["booking"]);
const toast = useToast();
const currencyFormat = inject(
  "currencyFormat",
  (v) => `₦${Number(v || 0).toLocaleString()}`
);
const isOpen = inject("isOpen");
const getData = inject("getData");

const isLoading = ref(false);

function getStatusClass(status) {
  const s = (status || "").toLowerCase();
  if (s === "checked in")
    return "bg-emerald-50 text-emerald-800 border-emerald-200";
  if (s === "checked out")
    return "bg-gray-100 text-gray-700 border-gray-200";
  if (s === "cancelled")
    return "bg-red-50 text-red-800 border-red-200";
  return "bg-amber-50 text-amber-800 border-amber-200";
}

function handleCheckin() {
  isLoading.value = true;
  customerCheckin(props.booking.id)
    .then((res) => {
      isLoading.value = false;
      if (res.status === 200) {
        toast.success("Guest successfully checked in!");
        if (isOpen) isOpen.value = false;
        if (getData) getData();
      }
    })
    .catch((err) => {
      isLoading.value = false;
      toast.error(err?.response?.data?.errors || "Failed to check in guest");
    });
}

function handleCheckout() {
  isLoading.value = true;
  customerCheckout(props.booking.id)
    .then((res) => {
      isLoading.value = false;
      if (res.status === 200) {
        toast.success("Guest successfully checked out!");
        if (isOpen) isOpen.value = false;
        if (getData) getData();
      }
    })
    .catch((err) => {
      isLoading.value = false;
      toast.error(err?.response?.data?.errors || "Failed to check out guest");
    });
}
</script>
