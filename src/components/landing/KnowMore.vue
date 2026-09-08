<template>
  <section class="py-20 lg:py-28 border-b border-[#9B7846]/15 bg-white">
    <div class="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 text-center">
      <!-- Section Header -->
      <div class="max-w-2xl mx-auto space-y-4 mb-16">
        <span
          class="text-xs uppercase tracking-widest font-semibold text-[#9B7846] block"
        >
          Curated Excellence
        </span>
        <h2
          class="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1816] font-normal leading-tight"
        >
          The Vamble Living
          <span class="italic text-[#243821] font-serif">Standard</span>
        </h2>
        <p class="text-sm sm:text-base text-gray-600 font-sans leading-relaxed">
          Every stay is carefully designed with exceptional attention to detail,
          tranquil aesthetics, and uncompromising personal privacy.
        </p>
      </div>

      <!-- 3-Column Luxury Feature Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
        <!-- Card 1 -->
        <div
          class="group rounded-2xl overflow-hidden border border-[#9B7846]/20 bg-[#FAF8F5] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        >
          <div class="aspect-[16/10] overflow-hidden relative">
            <img
              src="@/assets/images/rooms/sitting16.jpg"
              alt="World-Class Amenities"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
            ></div>
          </div>
          <div class="p-6 sm:p-8 space-y-3">
            <span
              class="text-[11px] uppercase tracking-wider font-semibold text-[#9B7846]"
              >Living & Lounge</span
            >
            <h3 class="font-serif text-xl font-medium text-[#1A1816]">
              World-Class Living Areas
            </h3>
            <p class="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Expansive, thoughtfully furnished living lounges fitted with
              imported Italian sofas, ambient mood lighting, and high-definition
              smart cinema screens.
            </p>
          </div>
        </div>

        <!-- Card 2 -->
        <div
          class="group rounded-2xl overflow-hidden border border-[#9B7846]/20 bg-[#FAF8F5] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        >
          <div class="aspect-[16/10] overflow-hidden relative">
            <img
              src="@/assets/images/rooms/bed5.jpg"
              alt="Soundproofed Sanctuaries"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
            ></div>
          </div>
          <div class="p-6 sm:p-8 space-y-3">
            <span
              class="text-[11px] uppercase tracking-wider font-semibold text-[#9B7846]"
              >Bedrooms & Suites</span
            >
            <h3 class="font-serif text-xl font-medium text-[#1A1816]">
              Soundproofed Sanctuaries
            </h3>
            <p class="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Acoustically insulated walls and double-glazed windows ensure
              restful quiet, matched with bespoke orthopedic king mattresses and
              500-thread-count Egyptian cotton linens.
            </p>
          </div>
        </div>

        <!-- Card 3 -->
        <div
          class="group rounded-2xl overflow-hidden border border-[#9B7846]/20 bg-[#FAF8F5] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        >
          <div class="aspect-[16/10] overflow-hidden relative">
            <img
              src="@/assets/images/rooms/kitchen2.jpg"
              alt="Fully Equipped Kitchens"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
            ></div>
          </div>
          <div class="p-6 sm:p-8 space-y-3">
            <span
              class="text-[11px] uppercase tracking-wider font-semibold text-[#9B7846]"
              >Culinary Independence</span
            >
            <h3 class="font-serif text-xl font-medium text-[#1A1816]">
              Fully Equipped Kitchens
            </h3>
            <p class="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Gourmet designer kitchens complete with induction hobs,
              microwaves, large double-door refrigerators, full cookware sets,
              and dining tableware.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Pure presentation component
</script>
