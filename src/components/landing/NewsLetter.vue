<template>
  <div>
    <!-- Section 1: Located in Tranquil Jahi / Neighborhood -->
    <section class="py-20 lg:py-28 border-b border-[#9B7846]/15 bg-[#FAF8F5]">
      <div class="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div
          class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          <!-- Left Column: Location Details & Distances -->
          <div class="lg:col-span-6 text-left space-y-6">
            <span
              class="text-xs uppercase tracking-widest font-semibold text-[#9B7846] block"
            >
              The Neighborhood
            </span>
            <h2
              class="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1816] font-normal leading-tight"
            >
              Located in
              <span class="italic text-[#243821] font-serif"
                >Tranquil Jahi</span
              >
            </h2>
            <p
              class="text-sm sm:text-base text-gray-600 font-sans leading-relaxed"
            >
              Vamble Apartments & Suites is nestled in Cadastral Zone B08, Jahi.
              Known for its quiet, tree-lined streets, secure access gates, and
              easy proximity to central Abuja landmarks.
            </p>

            <!-- Distances Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div
                class="p-4 rounded-xl bg-white border border-[#9B7846]/20 flex items-center gap-3"
              >
                <div
                  class="w-10 h-10 rounded-lg bg-[#243821]/10 text-[#243821] flex items-center justify-center font-bold text-sm"
                >
                  10m
                </div>
                <div>
                  <h4 class="text-xs font-bold text-[#1A1816]">
                    Jabi Lake Mall
                  </h4>
                  <p class="text-[11px] text-gray-500">Shopping & Promenade</p>
                </div>
              </div>

              <div
                class="p-4 rounded-xl bg-white border border-[#9B7846]/20 flex items-center gap-3"
              >
                <div
                  class="w-10 h-10 rounded-lg bg-[#9B7846]/10 text-[#9B7846] flex items-center justify-center font-bold text-sm"
                >
                  15m
                </div>
                <div>
                  <h4 class="text-xs font-bold text-[#1A1816]">
                    Central Business District
                  </h4>
                  <p class="text-[11px] text-gray-500">
                    Ministries & Embassies
                  </p>
                </div>
              </div>

              <div
                class="p-4 rounded-xl bg-white border border-[#9B7846]/20 flex items-center gap-3"
              >
                <div
                  class="w-10 h-10 rounded-lg bg-[#9B7846]/10 text-[#9B7846] flex items-center justify-center font-bold text-sm"
                >
                  25m
                </div>
                <div>
                  <h4 class="text-xs font-bold text-[#1A1816]">
                    Nnamdi Azikiwe Airport
                  </h4>
                  <p class="text-[11px] text-gray-500">Expressway Route</p>
                </div>
              </div>

              <div
                class="p-4 rounded-xl bg-white border border-[#9B7846]/20 flex items-center gap-3"
              >
                <div
                  class="w-10 h-10 rounded-lg bg-[#243821]/10 text-[#243821] flex items-center justify-center font-bold text-sm"
                >
                  8m
                </div>
                <div>
                  <h4 class="text-xs font-bold text-[#1A1816]">
                    Nizamiye Hospital
                  </h4>
                  <p class="text-[11px] text-gray-500">Medical Facilities</p>
                </div>
              </div>
            </div>

            <!-- Google Map Directions Button -->
            <div class="pt-2">
              <a
                href="https://maps.google.com/?q=Plot+790+Sector+Centre+Jahi+Abuja"
                target="_blank"
                rel="noopener"
                class="inline-flex items-center gap-2 bg-[#243821] text-white hover:bg-[#182716] px-6 py-3 rounded-full text-xs uppercase tracking-wider font-semibold shadow-md active:scale-95 transition-all"
              >
                <i class="fa fa-location-arrow"></i>
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>

          <!-- Right Column: Location Visual / Map Card -->
          <div class="lg:col-span-6">
            <div
              class="rounded-3xl overflow-hidden shadow-xl border border-[#9B7846]/20 relative aspect-[16/11] bg-gray-200"
            >
              <iframe
                title="Vamble Apartments Jahi Abuja Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15760.30602498263!2d7.4206!3d9.0833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0af970ebef67%3A0x6b772b25dbbe72a0!2sJahi%2C%20Abuja!5e0!3m2!1sen!2sng!4v1694000000000!5m2!1sen!2sng"
                class="w-full h-full border-0"
                loading="lazy"
              ></iframe>

              <!-- Floating Address Pill -->
              <div
                class="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-[#9B7846]/20 flex items-center justify-between"
              >
                <div class="text-left">
                  <p class="text-xs font-bold text-[#1A1816]">
                    Vamble Apartments & Suites
                  </p>
                  <p class="text-[11px] text-gray-600">
                    Plot 790, Sector Centre, Cadastral Zone B08, Jahi, Abuja
                  </p>
                </div>
                <div
                  class="w-8 h-8 rounded-full bg-[#243821] text-white flex items-center justify-center text-xs"
                >
                  <i class="fa fa-map-pin"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 2: Newsletter & Exclusive Rates -->
    <section class="py-16 bg-white border-b border-[#9B7846]/15">
      <div class="max-w-3xl mx-auto px-6 text-center space-y-6">
        <span
          class="text-xs uppercase tracking-widest font-semibold text-[#9B7846] block"
        >
          Private Member Privileges
        </span>
        <h3
          class="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#1A1816] font-normal"
        >
          Subscribe to Receive Event News &
          <span class="italic text-[#243821] font-serif">Exclusive Rates</span>
        </h3>
        <p
          class="text-xs sm:text-sm text-gray-600 font-sans max-w-xl mx-auto leading-relaxed"
        >
          Be the first to know about seasonal long-stay packages, diplomatic
          offers, and bespoke experiences in Abuja.
        </p>

        <!-- Newsletter Form -->
        <form
          @submit.prevent="handleSubscribe"
          class="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto pt-2"
        >
          <input
            v-model="email"
            type="email"
            required
            placeholder="Enter your official or personal email address..."
            class="flex-1 px-5 py-3 rounded-full border border-[#9B7846]/30 bg-[#FAF8F5] text-sm text-[#1A1816] outline-none focus:border-[#243821] focus:ring-2 focus:ring-[#243821]/20 transition-all"
          />
          <button
            type="submit"
            :disabled="subscribed"
            class="bg-[#243821] hover:bg-[#182716] text-white px-8 py-3 rounded-full text-xs uppercase tracking-wider font-semibold shadow-md active:scale-95 transition-all whitespace-nowrap"
          >
            {{ subscribed ? "Subscribed!" : "Join Private Circle" }}
          </button>
        </form>

        <p v-if="subscribed" class="text-xs text-[#243821] font-semibold pt-1">
          ✓ Thank you for subscribing! Welcome to the Vamble private guest
          circle.
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");
const subscribed = ref(false);

function handleSubscribe() {
  if (email.value) {
    subscribed.value = true;
    email.value = "";
    setTimeout(() => {
      subscribed.value = false;
    }, 6000);
  }
}
</script>
