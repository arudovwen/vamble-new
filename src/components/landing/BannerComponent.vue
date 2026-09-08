<template>
  <section class="relative pt-12 pb-16 lg:pt-16 lg:pb-24 overflow-hidden">
    <!-- Subtle Background Ambient Accents -->
    <div
      class="absolute top-0 right-0 w-96 h-96 bg-[#9B7846]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"
    ></div>
    <div
      class="absolute bottom-0 left-0 w-96 h-96 bg-[#243821]/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"
    ></div>

    <div class="max-w-[1440px] mx-auto px-4 sm:px-10 lg:px-16">
      <div
        class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center"
      >
        <!-- Left Column: Copy & CTAs -->
        <div class="lg:col-span-7 text-left space-y-5 sm:space-y-6">
          <!-- Tag Badge -->
          <div
            class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#243821]/10 border border-[#243821]/15 text-[#243821] text-[11px] sm:text-xs font-semibold tracking-wide uppercase"
          >
            <span
              class="w-2 h-2 rounded-full bg-[#243821] animate-pulse"
            ></span>
            <span>Abuja's Premier Serviced Suites • Jahi</span>
          </div>

          <!-- Main Headline -->
          <h1
            class="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#1A1816] font-normal leading-[1.15] tracking-tight"
          >
            A Home Away from Home.
            <span class="block text-[#243821] italic font-serif mt-1 sm:mt-2"
              >Redefined in Abuja.</span
            >
          </h1>

          <!-- Subtitle / Value Proposition -->
          <p
            class="text-sm sm:text-lg text-[#1A1816]/75 font-sans leading-relaxed max-w-xl"
          >
            Immerse yourself in discreet luxury, refined aesthetics, and
            tailored hospitality. Designed for discerning executives, extended
            business stays, and serene weekend getaways.
          </p>

          <!-- CTAs -->
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
            <router-link to="/booking">
              <button
                type="button"
                class="w-full sm:w-auto justify-center bg-[#243821] hover:bg-[#182716] text-white px-8 py-3.5 rounded-full text-xs uppercase tracking-wider font-semibold shadow-lg shadow-[#243821]/20 hover:shadow-xl transition-all active:scale-95 flex items-center gap-2.5 min-h-[44px]"
              >
                <span>Reserve a Suite</span>
                <i class="fa fa-arrow-right text-xs"></i>
              </button>
            </router-link>

            <router-link to="/rooms">
              <button
                type="button"
                class="w-full sm:w-auto justify-center border border-[#9B7846]/40 hover:border-[#9B7846] text-[#1A1816] hover:bg-[#9B7846]/10 px-7 py-3.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all active:scale-95 min-h-[44px]"
              >
                View Accommodations
              </button>
            </router-link>
          </div>

          <!-- Trust Badges & Metrics -->
          <div
            class="pt-6 border-t border-[#9B7846]/20 grid grid-cols-3 gap-2 sm:gap-4 max-w-lg"
          >
            <div>
              <p
                class="font-serif text-2xl sm:text-3xl text-[#243821] font-semibold"
              >
                100%
              </p>
              <p class="text-xs text-[#1A1816]/70 mt-0.5">Guaranteed Privacy</p>
            </div>
            <div>
              <p
                class="font-serif text-2xl sm:text-3xl text-[#243821] font-semibold"
              >
                24/7
              </p>
              <p class="text-xs text-[#1A1816]/70 mt-0.5">Concierge & Power</p>
            </div>
            <div>
              <div
                class="flex items-center gap-1 font-serif text-2xl sm:text-3xl text-[#243821] font-semibold"
              >
                <span>4.9</span>
                <span class="text-sm text-[#9B7846]">★</span>
              </div>
              <p class="text-xs text-[#1A1816]/70 mt-0.5">Guest Satisfaction</p>
            </div>
          </div>
        </div>

        <!-- Right Column: Visual Showcase -->
        <div class="lg:col-span-5 relative">
          <div class="relative mx-auto max-w-md lg:max-w-none">
            <!-- Main Arched / Rounded Image -->
            <div
              class="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] bg-gray-100"
            >
              <img
                src="@/assets/images/rooms/luxury_hero_suite.jpg"
                alt="Vamble Luxury Suite"
                class="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
              ></div>

              <!-- Bottom Image Card Overlay -->
              <div
                class="absolute bottom-6 left-6 right-6 text-white text-left"
              >
                <span
                  class="inline-block text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-md bg-[#9B7846] text-white mb-2"
                >
                  Executive Suite
                </span>
                <h3 class="font-serif text-xl font-medium">
                  Understated Luxury
                </h3>
                <p class="text-xs text-white/80 mt-1">
                  King Bed • En-suite Bath • High-Speed Fiber
                </p>
              </div>
            </div>

            <!-- Floating Top-Right Mini Badge -->
            <div
              class="absolute -top-4 -right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-[#9B7846]/20 hidden sm:flex items-center gap-3"
            >
              <div
                class="w-10 h-10 rounded-full bg-[#243821] flex items-center justify-center text-white text-sm"
              >
                <i class="fa fa-shield"></i>
              </div>
              <div class="text-left">
                <p class="text-xs font-bold text-[#1A1816]">Gated & Secure</p>
                <p class="text-[11px] text-gray-500">24hr Surveillance</p>
              </div>
            </div>

            <!-- Floating Bottom-Left Mini Badge -->
            <div
              class="absolute -bottom-5 -left-5 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-[#9B7846]/20 hidden sm:flex items-center gap-2.5"
            >
              <div class="flex text-amber-500 text-xs">
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
              </div>
              <span class="text-xs font-bold text-[#1A1816]"
                >Top Rated in Jahi</span
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Availability Widget (Floating Bar) -->
      <div class="mt-12 lg:mt-16">
        <BookingComponent />
      </div>
    </div>
  </section>
</template>

<script setup>
import BookingComponent from "./BookingComponent.vue";
</script>
