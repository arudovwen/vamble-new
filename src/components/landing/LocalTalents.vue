<template>
  <section id="about" class="py-14 sm:py-20 lg:py-28 border-b border-[#9B7846]/15 bg-[#FAF8F5]">
    <div class="max-w-[1440px] mx-auto px-4 sm:px-10 lg:px-16">
      <div
        class="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start"
      >
        <!-- Left Column: Editorial Headline & Narrative -->
        <div class="lg:col-span-5 text-left space-y-5 sm:space-y-6">
          <div
            class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9B7846]/10 text-[#9B7846] text-xs font-semibold uppercase tracking-wider"
          >
            <span>Our Philosophy</span>
          </div>

          <h2
            class="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1816] font-normal leading-tight"
          >
            A Bit About
            <span class="italic text-[#243821] font-serif">Vamble.</span>
          </h2>

          <p class="text-base text-[#1A1816]/75 font-sans leading-relaxed">
            Vamble Apartments & Suites is an exclusive collection of luxury
            serviced residences nestled in the serene district of Jahi, Abuja.
            We bridge the privacy and freedom of a personal residence with the
            flawless standard of a world-class boutique hotel.
          </p>

          <p class="text-sm text-[#1A1816]/70 leading-relaxed">
            Whether for diplomatic visits, extended executive engagements, or
            peaceful personal escapes, our suites are acoustically designed and
            custom-furnished to elevate your everyday living.
          </p>

          <div class="pt-2">
            <router-link to="/about">
              <button
                type="button"
                class="inline-flex items-center gap-2.5 text-xs uppercase tracking-wider font-semibold text-[#243821] border-b-2 border-[#243821] pb-1 hover:text-[#9B7846] hover:border-[#9B7846] transition-colors"
              >
                <span>Discover Our Full Story</span>
                <i class="fa fa-arrow-right text-xs"></i>
              </button>
            </router-link>
          </div>
        </div>

        <!-- Right Column: 4-Item Feature Cards Grid -->
        <div
          class="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left"
        >
          <!-- Feature 1 -->
          <div
            class="p-6 rounded-2xl bg-white border border-[#9B7846]/20 shadow-sm hover:shadow-md transition-shadow"
          >
            <div
              class="w-12 h-12 rounded-xl bg-[#243821]/10 text-[#243821] flex items-center justify-center text-xl mb-4"
            >
              <i class="fa fa-bolt"></i>
            </div>
            <h3 class="font-serif text-lg font-medium text-[#1A1816] mb-2">
              24/7 Uninterrupted Power
            </h3>
            <p class="text-xs text-gray-600 leading-relaxed">
              Industrial dual generator redundancy combined with silent solar
              inverters ensures constant electricity day and night.
            </p>
          </div>

          <!-- Feature 2 -->
          <div
            class="p-6 rounded-2xl bg-white border border-[#9B7846]/20 shadow-sm hover:shadow-md transition-shadow"
          >
            <div
              class="w-12 h-12 rounded-xl bg-[#9B7846]/10 text-[#9B7846] flex items-center justify-center text-xl mb-4"
            >
              <i class="fa fa-wifi"></i>
            </div>
            <h3 class="font-serif text-lg font-medium text-[#1A1816] mb-2">
              High-Speed Fiber Wi-Fi
            </h3>
            <p class="text-xs text-gray-600 leading-relaxed">
              Ultra-fast dedicated enterprise fiber bandwidth throughout all
              rooms and communal areas, optimized for video calls and streaming.
            </p>
          </div>

          <!-- Feature 3 -->
          <div
            class="p-6 rounded-2xl bg-white border border-[#9B7846]/20 shadow-sm hover:shadow-md transition-shadow"
          >
            <div
              class="w-12 h-12 rounded-xl bg-[#243821]/10 text-[#243821] flex items-center justify-center text-xl mb-4"
            >
              <i class="fa fa-map-marker"></i>
            </div>
            <h3 class="font-serif text-lg font-medium text-[#1A1816] mb-2">
              Prime Tranquil Location
            </h3>
            <p class="text-xs text-gray-600 leading-relaxed">
              Quiet, secure enclave in Jahi, just 10 minutes to Jabi Lake Mall
              and 15 minutes to Abuja's Central Business District.
            </p>
          </div>

          <!-- Feature 4 -->
          <div
            class="p-6 rounded-2xl bg-white border border-[#9B7846]/20 shadow-sm hover:shadow-md transition-shadow"
          >
            <div
              class="w-12 h-12 rounded-xl bg-[#9B7846]/10 text-[#9B7846] flex items-center justify-center text-xl mb-4"
            >
              <i class="fa fa-shield"></i>
            </div>
            <h3 class="font-serif text-lg font-medium text-[#1A1816] mb-2">
              Bespoke Concierge & Security
            </h3>
            <p class="text-xs text-gray-600 leading-relaxed">
              Discreet 24-hour on-premise security, intelligent access control,
              and a dedicated concierge catering to your every request.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Pure presentation component with Vamble Apartments styling
</script>
