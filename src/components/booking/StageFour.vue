<template>
  <div class="space-y-10 text-left max-w-4xl mx-auto">
    <!-- Top Deep Forest Green Banner (Matches Screen 3) -->
    <div
      class="bg-[#243821] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl"
    >
      <div
        class="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/5 blur-2xl"
      ></div>
      <div class="relative z-10 space-y-4">
        <span
          class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#9B7846] text-white text-xs uppercase tracking-wider font-semibold"
        >
          <i class="fa fa-check"></i> Reservation Confirmed
        </span>

        <h1
          class="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight"
        >
          We Look Forward to Welcoming You,
          <span class="block text-[#FAF8F5] italic font-serif mt-1">{{
            formData.name || "Valued Guest"
          }}</span>
        </h1>

        <p
          class="text-sm sm:text-base text-gray-200 max-w-2xl font-sans leading-relaxed"
        >
          Your reservation is officially confirmed. A confirmation receipt has
          been dispatched to
          <span class="font-bold underline">{{ formData.email }}</span
          >.
        </p>
      </div>
    </div>

    <!-- Digital Access Pass & Details Card (Matches Screen 3) -->
    <div
      class="bg-white rounded-3xl p-6 sm:p-10 border border-[#9B7846]/25 shadow-xl space-y-8 print:border-none print:shadow-none"
    >
      <!-- Pass Header -->
      <div
        class="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#9B7846]/15 gap-4"
      >
        <div>
          <span
            class="text-xs uppercase tracking-widest font-semibold text-[#9B7846] block"
          >
            Digital Access Pass & Receipt
          </span>
          <h2 class="font-serif text-2xl font-medium text-[#1A1816] mt-0.5">
            Booking Reference: #{{ formData.bookingNo || "VMB-749210" }}
          </h2>
        </div>

        <div class="flex items-center gap-2">
          <span
            :class="[
              formData.payment_status === 'paid'
                ? 'bg-green-100 text-green-800 border-green-200'
                : 'bg-amber-100 text-amber-800 border-amber-200',
              'px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border',
            ]"
          >
            {{
              formData.payment_status === "paid"
                ? "Paid in Full"
                : "Payment on Arrival"
            }}
          </span>
        </div>
      </div>

      <!-- Pass Grid: QR Code & Stay Schedule -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <!-- Left: Stay Schedule & Suite -->
        <div class="md:col-span-8 space-y-6">
          <div
            class="grid grid-cols-2 gap-4 p-5 rounded-2xl bg-[#FAF8F5] border border-[#9B7846]/15 text-xs"
          >
            <div>
              <span
                class="text-gray-400 block uppercase tracking-wider text-[10px] font-semibold"
                >Check-in</span
              >
              <span class="text-sm font-bold text-[#1A1816] block mt-1">
                {{ moment(formData.checkin).format("ddd, MMM D, YYYY") }}
              </span>
              <span class="text-gray-500">From 2:00 PM onwards</span>
            </div>
            <div>
              <span
                class="text-gray-400 block uppercase tracking-wider text-[10px] font-semibold"
                >Check-out</span
              >
              <span class="text-sm font-bold text-[#1A1816] block mt-1">
                {{ moment(formData.checkout).format("ddd, MMM D, YYYY") }}
              </span>
              <span class="text-gray-500">Before 12:00 PM</span>
            </div>
          </div>

          <!-- Suite & Guest Specs -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <span class="text-gray-400 block text-[11px]"
                >Reserved Suite</span
              >
              <span class="font-bold text-[#243821] text-sm">{{
                formData.type || "Executive Suite"
              }}</span>
            </div>
            <div>
              <span class="text-gray-400 block text-[11px]"
                >Guests & Rooms</span
              >
              <span class="font-bold text-[#1A1816] text-sm"
                >{{ formData.no_of_guests }} Guests •
                {{ formData.no_of_rooms }} Room</span
              >
            </div>
            <div>
              <span class="text-gray-400 block text-[11px]">Total Amount</span>
              <span class="font-bold text-[#243821] text-sm">{{
                currencyFormat(formData.total_price)
              }}</span>
            </div>
          </div>

          <!-- Inclusions -->
          <div class="pt-4 border-t border-gray-100">
            <span
              class="text-[11px] uppercase tracking-wider font-semibold text-[#9B7846] block mb-2"
            >
              Complimentary Inclusions
            </span>
            <div class="flex flex-wrap gap-2 text-xs text-gray-700">
              <span class="px-3 py-1 rounded-full bg-gray-100"
                >✓ 24/7 Uninterrupted Power</span
              >
              <span class="px-3 py-1 rounded-full bg-gray-100"
                >✓ High-Speed Fiber Internet</span
              >
              <span class="px-3 py-1 rounded-full bg-gray-100"
                >✓ Daily Housekeeping</span
              >
              <span class="px-3 py-1 rounded-full bg-gray-100"
                >✓ Dedicated Concierge</span
              >
            </div>
          </div>
        </div>

        <!-- Right: Digital QR Code Visual -->
        <div
          class="md:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-[#FAF8F5] border border-[#9B7846]/20 text-center space-y-3"
        >
          <!-- QR Code Representation -->
          <div
            class="w-40 h-40 bg-white p-2 rounded-xl shadow-inner border border-gray-200 flex items-center justify-center"
          >
            <img
              :src="`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=VAMBLE-BOOKING-${
                formData.bookingNo || 'VMB-749210'
              }`"
              alt="Fast Check-in QR Code"
              class="w-full h-full object-contain"
            />
          </div>
          <div>
            <p
              class="text-[11px] font-bold text-[#1A1816] uppercase tracking-wider"
            >
              Fast Front-Desk Check-in
            </p>
            <p class="text-[10px] text-gray-500">
              Present this QR code on arrival at reception
            </p>
          </div>
        </div>
      </div>

      <!-- Location & Concierge Row -->
      <div
        class="pt-6 border-t border-[#9B7846]/15 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-gray-600"
      >
        <div class="flex items-start gap-3">
          <i class="fa fa-map-marker text-[#9B7846] text-lg mt-0.5"></i>
          <div>
            <span class="font-bold text-[#1A1816] block"
              >Residence Address</span
            >
            <span
              >Plot 790, Sector Centre, Cadastral Zone B08, Jahi, Abuja,
              Nigeria</span
            >
          </div>
        </div>
        <div class="flex items-start gap-3">
          <i class="fa fa-phone text-[#9B7846] text-lg mt-0.5"></i>
          <div>
            <span class="font-bold text-[#1A1816] block"
              >Concierge & Front Desk</span
            >
            <span>+234 906 464 5461 • Available 24 Hours</span>
          </div>
        </div>
      </div>

      <!-- Action CTAs -->
      <div
        class="pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4 print:hidden"
      >
        <button
          type="button"
          @click="printPass"
          class="border border-[#243821] text-[#243821] hover:bg-[#243821] hover:text-white px-6 py-3 rounded-full text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-2"
        >
          <i class="fa fa-print"></i>
          <span>Print / Save Pass</span>
        </button>

        <div class="flex items-center gap-3">
          <a
            :href="`https://wa.me/2349064645461?text=Hello%20Vamble,%20I%20have%20confirmed%20booking%20%23${formData.bookingNo}`"
            target="_blank"
            rel="noopener"
            class="bg-[#243821] hover:bg-[#182716] text-white px-6 py-3 rounded-full text-xs uppercase tracking-wider font-semibold shadow transition-all flex items-center gap-2"
          >
            <i class="fa fa-whatsapp text-sm"></i>
            <span>Message Concierge</span>
          </a>

          <router-link to="/">
            <button
              type="button"
              class="bg-[#9B7846] hover:bg-[#836336] text-white px-6 py-3 rounded-full text-xs uppercase tracking-wider font-semibold shadow transition-all"
            >
              Return Home
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject } from "vue";
import moment from "moment";

const formData = inject("formData");
const currencyFormat = inject(
  "currencyFormat",
  (val) => `₦${Number(val || 0).toLocaleString()}`
);

function printPass() {
  window.print();
}
</script>
