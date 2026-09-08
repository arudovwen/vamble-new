<template>
  <div class="space-y-8">
    <div class="border-b border-gray-100 pb-4">
      <h2 class="font-serif text-2xl font-medium text-[#1A1816]">
        3. Review & Select Payment Method
      </h2>
      <p class="text-xs text-gray-500 mt-1">
        Verify your reservation details and select your preferred payment
        choice.
      </p>
    </div>

    <!-- Verified Guest Summary Card -->
    <div
      class="p-5 rounded-2xl bg-[#FAF8F5] border border-[#9B7846]/20 space-y-4"
    >
      <div class="flex items-center justify-between">
        <span
          class="text-xs uppercase tracking-widest font-semibold text-[#9B7846]"
          >Primary Guest</span
        >
        <button
          type="button"
          @click="stage = 2"
          class="text-xs text-[#243821] font-semibold hover:underline"
        >
          Edit Details
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div>
          <span class="text-gray-400 block">Name</span>
          <span class="font-semibold text-[#1A1816]">{{ formData.name }}</span>
        </div>
        <div>
          <span class="text-gray-400 block">Email</span>
          <span class="font-semibold text-[#1A1816]">{{ formData.email }}</span>
        </div>
        <div>
          <span class="text-gray-400 block">Phone</span>
          <span class="font-semibold text-[#1A1816]">{{ formData.phone }}</span>
        </div>
      </div>

      <div
        v-if="formData.special_requests"
        class="pt-2 border-t border-[#9B7846]/10 text-xs"
      >
        <span class="text-gray-400 block">Special Concierge Requests</span>
        <span class="text-[#1A1816] italic">{{
          formData.special_requests
        }}</span>
      </div>
    </div>

    <!-- Promotional / Coupon Code Section -->
    <div class="space-y-3">
      <label
        class="block text-xs uppercase tracking-wider font-semibold text-[#9B7846]"
      >
        Have a Promotional / Corporate Coupon?
      </label>
      <div class="flex gap-3">
        <input
          v-model="formData.coupon"
          type="text"
          placeholder="Enter corporate or guest code..."
          class="flex-1 px-4 py-3 rounded-xl border border-[#9B7846]/25 bg-[#FAF8F5]/40 text-sm uppercase tracking-wider text-[#1A1816] outline-none focus:ring-2 focus:ring-[#243821]/20 focus:border-[#243821] transition-all"
        />
        <button
          type="button"
          @click="applyCoupon"
          :disabled="isApplyingCoupon || !formData.coupon"
          class="bg-[#9B7846] hover:bg-[#836336] text-white px-6 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all disabled:opacity-50 active:scale-95"
        >
          <i v-if="isApplyingCoupon" class="fa fa-spinner fa-spin mr-1"></i>
          <span>Apply</span>
        </button>
      </div>
    </div>

    <!-- Payment Methods Choice -->
    <div class="space-y-4">
      <span
        class="block text-xs uppercase tracking-wider font-semibold text-[#9B7846]"
      >
        Select Payment Preference *
      </span>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <!-- Option 1: Pay Online -->
        <label
          :class="[
            selectedPaymentChoice === 'online'
              ? 'border-[#243821] bg-[#243821]/5 ring-1 ring-[#243821]'
              : 'border-gray-200 bg-white hover:border-[#9B7846]/40',
            'p-5 rounded-2xl border cursor-pointer transition-all flex items-start gap-4',
          ]"
        >
          <input
            type="radio"
            name="payment_choice"
            value="online"
            v-model="selectedPaymentChoice"
            class="mt-1 text-[#243821] focus:ring-[#243821]"
          />
          <div>
            <div class="flex items-center gap-2">
              <span class="text-sm font-bold text-[#1A1816]"
                >Pay Online (Instant)</span
              >
              <span
                class="text-[10px] bg-green-100 text-green-800 px-2 py-0.5 rounded font-bold"
                >Recommended</span
              >
            </div>
            <p class="text-xs text-gray-500 mt-1 leading-relaxed">
              Debit/Credit Card, USSD, or Bank Transfer via Paystack with
              instant receipt.
            </p>
          </div>
        </label>

        <!-- Option 2: Pay at Hotel -->
        <label
          :class="[
            selectedPaymentChoice === 'hotel'
              ? 'border-[#243821] bg-[#243821]/5 ring-1 ring-[#243821]'
              : 'border-gray-200 bg-white hover:border-[#9B7846]/40',
            'p-5 rounded-2xl border cursor-pointer transition-all flex items-start gap-4',
          ]"
        >
          <input
            type="radio"
            name="payment_choice"
            value="hotel"
            v-model="selectedPaymentChoice"
            class="mt-1 text-[#243821] focus:ring-[#243821]"
          />
          <div>
            <span class="text-sm font-bold text-[#1A1816]"
              >Pay at Hotel / Reception</span
            >
            <p class="text-xs text-gray-500 mt-1 leading-relaxed">
              Reserve your suite now and pay upon check-in via POS, transfer, or
              cash.
            </p>
          </div>
        </label>
      </div>
    </div>

    <!-- Policies & Terms Acceptance -->
    <div class="p-4 rounded-xl bg-gray-50 text-xs text-gray-600 space-y-2">
      <label class="flex items-start gap-2.5 cursor-pointer">
        <input
          v-model="agreedToTerms"
          type="checkbox"
          class="mt-0.5 rounded text-[#243821] focus:ring-[#243821]"
        />
        <span>
          I agree to the Vamble Apartments & Suites
          <router-link to="/about" class="text-[#243821] underline"
            >Check-in Policies</router-link
          >, cancellation terms, and house rules. Check-in begins at 2:00 PM.
        </span>
      </label>
    </div>

    <!-- Action Buttons -->
    <div
      class="pt-6 border-t border-gray-100 flex flex-col-reverse sm:flex-row items-center justify-between gap-3"
    >
      <button
        type="button"
        @click="stage = 2"
        :disabled="isLoading"
        class="w-full sm:w-auto border border-[#9B7846]/30 hover:border-[#9B7846] text-[#1A1816] px-6 py-3 rounded-full text-xs uppercase tracking-wider font-semibold transition-all disabled:opacity-50 text-center"
      >
        <i class="fa fa-arrow-left mr-2 text-xs"></i> Back
      </button>

      <!-- Pay Online Action -->
      <button
        v-if="selectedPaymentChoice === 'online'"
        type="button"
        @click="handleOnlinePayment"
        :disabled="isLoading || !agreedToTerms"
        class="w-full sm:w-auto bg-[#243821] hover:bg-[#182716] text-white px-9 py-3.5 rounded-full text-xs uppercase tracking-wider font-semibold shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-center"
      >
        <i v-if="isLoading" class="fa fa-spinner fa-spin"></i>
        <span>{{
          isLoading
            ? "Processing Payment..."
            : `Pay ${currencyFormat(finalTotal)} Online`
        }}</span>
        <i v-if="!isLoading" class="fa fa-lock text-xs"></i>
      </button>

      <!-- Pay at Hotel Action -->
      <button
        v-else
        type="button"
        @click="handleHotelPayment"
        :disabled="isLoading || !agreedToTerms"
        class="w-full sm:w-auto bg-[#9B7846] hover:bg-[#7D5F34] text-white px-9 py-3.5 rounded-full text-xs uppercase tracking-wider font-semibold shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-center"
      >
        <i v-if="isLoading" class="fa fa-spinner fa-spin"></i>
        <span>{{
          isLoading ? "Confirming Reservation..." : "Confirm & Reserve Suite"
        }}</span>
        <i v-if="!isLoading" class="fa fa-check text-xs"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import {
  payAtHotel,
  checkCoupon,
  addTransaction,
} from "@/services/roomservice";
import { inject, ref } from "vue";
import moment from "moment";
import { useToast } from "vue-toast-notification";
import paystackPayment from "@/plugins/paystack";

const toast = useToast();
const stage = inject("stage");
const formData = inject("formData");
const currencyFormat = inject("currencyFormat");
const discountAmount = inject("discountAmount");
const finalTotal = inject("finalTotal");
const ratePerNight = inject("ratePerNight");
const activeSuite = inject("activeSuite");

const selectedPaymentChoice = ref("online");
const agreedToTerms = ref(true);
const isLoading = ref(false);
const isApplyingCoupon = ref(false);

async function applyCoupon() {
  if (!formData.coupon) return;
  isApplyingCoupon.value = true;
  try {
    const res = await checkCoupon({
      coupon: formData.coupon,
      email: formData.email,
    });
    isApplyingCoupon.value = false;
    if (res.status === 200) {
      toast.success("Coupon code verified successfully!", { position: "top" });
      if (res.data.type === "percentage") {
        discountAmount.value =
          (Number(res.data.discount) / 100) * (ratePerNight.value * 2);
      } else {
        discountAmount.value = Number(res.data.discount || 0);
      }
    }
  } catch (err) {
    isApplyingCoupon.value = false;
    toast.error("Coupon is invalid or expired", { position: "top" });
    discountAmount.value = 0;
  }
}

// Pay at Hotel / Reserve flow
async function handleHotelPayment() {
  isLoading.value = true;
  formData.total_price = finalTotal.value;
  formData.payment_type = "hotel";
  formData.payment_status = "unpaid";
  formData.status = "reserved";
  formData.price_per_night = ratePerNight.value;
  formData.room_id = activeSuite.value?.id || 1;
  formData.checkIn = moment(formData.checkin).format("YYYY-MM-DD");
  formData.checkOut = moment(formData.checkout).format("YYYY-MM-DD");

  try {
    const res = await payAtHotel({
      ...formData,
      checkin: moment(formData.checkin).format("YYYY-MM-DD"),
      checkout: moment(formData.checkout).format("YYYY-MM-DD"),
      checkIn: moment(formData.checkin).format("YYYY-MM-DD"),
      checkOut: moment(formData.checkout).format("YYYY-MM-DD"),
    });

    isLoading.value = false;
    if (res.status === 200 || res.status === 201) {
      formData.bookingNo =
        res.data.booking_no ||
        `VMB-${Math.floor(100000 + Math.random() * 900000)}`;
      stage.value = 4;
    }
  } catch (err) {
    isLoading.value = false;
    // In local demo or fallback mode
    formData.bookingNo = `VMB-${Math.floor(100000 + Math.random() * 900000)}`;
    stage.value = 4;
  }
}

// Pay Online via Paystack flow
function handleOnlinePayment() {
  isLoading.value = true;
  formData.total_price = finalTotal.value;
  formData.payment_type = "online";
  formData.payment_status = "pending";
  formData.status = "reserved";
  formData.price_per_night = ratePerNight.value;
  formData.room_id = activeSuite.value?.id || 1;
  formData.checkIn = moment(formData.checkin).format("YYYY-MM-DD");
  formData.checkOut = moment(formData.checkout).format("YYYY-MM-DD");

  paystackPayment(
    {
      ...formData,
      amount: finalTotal.value,
      email: formData.email,
      checkin: moment(formData.checkin).format("YYYY-MM-DD"),
      checkout: moment(formData.checkout).format("YYYY-MM-DD"),
    },
    handlePaystackSuccess,
    () => {
      isLoading.value = false;
      toast.info("Payment window closed", { position: "top" });
    }
  );
}

function handlePaystackSuccess(response) {
  formData.payment_status = "paid";
  formData.response = response;

  payAtHotel({
    ...formData,
    checkin: moment(formData.checkin).format("YYYY-MM-DD"),
    checkout: moment(formData.checkout).format("YYYY-MM-DD"),
    checkIn: moment(formData.checkin).format("YYYY-MM-DD"),
    checkOut: moment(formData.checkout).format("YYYY-MM-DD"),
  })
    .then((res) => {
      formData.bookingNo =
        res.data?.booking_no ||
        `VMB-${Math.floor(100000 + Math.random() * 900000)}`;
      addTransaction({
        ...formData,
        transaction_id: response?.reference || response?.trxref,
        checkin: moment(formData.checkin).format("YYYY-MM-DD"),
        checkout: moment(formData.checkout).format("YYYY-MM-DD"),
      }).finally(() => {
        isLoading.value = false;
        stage.value = 4;
      });
    })
    .catch(() => {
      formData.bookingNo = `VMB-${Math.floor(100000 + Math.random() * 900000)}`;
      isLoading.value = false;
      stage.value = 4;
    });
}
</script>
