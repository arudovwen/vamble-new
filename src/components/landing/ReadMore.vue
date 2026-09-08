<template>
  <section
    class="py-24 lg:py-32 bg-[#243821] text-[#FAF8F5] relative overflow-hidden"
  >
    <!-- Subtle Background Glows -->
    <div
      class="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none"
    ></div>
    <div
      class="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#9B7846]/20 blur-3xl pointer-events-none"
    ></div>

    <div
      class="max-w-4xl mx-auto px-6 sm:px-10 text-center relative z-10 space-y-8"
    >
      <!-- Decorative Accent -->
      <div class="flex items-center justify-center gap-3">
        <span class="w-12 h-[1px] bg-[#9B7846]/40"></span>
        <span class="text-[#9B7846] text-sm">✦ ✦ ✦</span>
        <span class="w-12 h-[1px] bg-[#9B7846]/40"></span>
      </div>

      <!-- Quote in Serif Italic -->
      <blockquote
        class="font-serif text-2xl sm:text-4xl lg:text-5xl font-normal italic leading-snug sm:leading-tight text-white/95 tracking-tight"
      >
        "Dedicated to making your everyday a wonderful experience in serene,
        central Abuja luxury."
      </blockquote>

      <p class="text-xs uppercase tracking-widest text-[#9B7846] font-semibold">
        The Vamble Apartments & Suites Promise
      </p>

      <!-- Action Button -->
      <div class="pt-4">
        <router-link to="/booking">
          <button
            type="button"
            class="bg-white hover:bg-[#FAF8F5] text-[#243821] px-9 py-3.5 rounded-full text-xs uppercase tracking-wider font-semibold shadow-xl active:scale-95 transition-all"
          >
            Check Available Dates
          </button>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
// Presentation quote banner
</script>
