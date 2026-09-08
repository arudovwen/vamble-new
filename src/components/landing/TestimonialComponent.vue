<template>
  <section class="py-20 lg:py-28 border-b border-[#9B7846]/15 bg-[#FAF8F5]">
    <div class="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
      <div
        class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
      >
        <!-- Left Column: Section Title & Star Rating Summary -->
        <div class="lg:col-span-5 text-left space-y-5">
          <span
            class="text-xs uppercase tracking-widest font-semibold text-[#9B7846] block"
          >
            Guest Endorsements
          </span>
          <h2
            class="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1816] font-normal leading-tight"
          >
            Voices of
            <span class="italic text-[#243821] font-serif">Discretion</span>
          </h2>
          <p class="text-sm text-gray-600 leading-relaxed font-sans">
            Hear from corporate executives, diplomats, and international
            travelers who choose Vamble Apartments & Suites for unmatched
            comfort and uncompromising discretion in Abuja.
          </p>

          <!-- Rating Stars & Badge -->
          <div class="pt-4 flex items-center gap-4">
            <div class="flex text-amber-500 text-lg">
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
            </div>
            <div class="border-l border-gray-300 pl-4">
              <p class="text-xs font-bold text-[#1A1816]">5.0 / 5.0 Rating</p>
              <p class="text-[11px] text-gray-500">From 120+ Verified Stays</p>
            </div>
          </div>

          <!-- Carousel Controls -->
          <div class="flex items-center gap-3 pt-4">
            <button
              @click="prevTestimonial"
              class="w-10 h-10 rounded-full border border-[#9B7846]/30 hover:border-[#243821] hover:bg-[#243821] hover:text-white text-[#1A1816] flex items-center justify-center transition-all cursor-pointer"
              aria-label="Previous Review"
            >
              <i class="fa fa-angle-left text-base"></i>
            </button>
            <button
              @click="nextTestimonial"
              class="w-10 h-10 rounded-full border border-[#9B7846]/30 hover:border-[#243821] hover:bg-[#243821] hover:text-white text-[#1A1816] flex items-center justify-center transition-all cursor-pointer"
              aria-label="Next Review"
            >
              <i class="fa fa-angle-right text-base"></i>
            </button>
          </div>
        </div>

        <!-- Right Column: Testimonial Card with Quote Mark -->
        <div class="lg:col-span-7">
          <div
            class="relative bg-white rounded-3xl p-8 sm:p-12 border border-[#9B7846]/20 shadow-lg text-left"
          >
            <!-- Large Decorative Quotation Mark -->
            <div
              class="text-[#9B7846]/20 font-serif text-8xl absolute top-4 right-8 select-none pointer-events-none leading-none"
            >
              ”
            </div>

            <div class="relative z-10 space-y-6">
              <!-- Star Rating -->
              <div class="flex text-amber-500 text-sm">
                <i
                  v-for="s in currentReview.rating"
                  :key="s"
                  class="fa fa-star"
                ></i>
              </div>

              <!-- Review Text -->
              <blockquote
                class="font-serif text-lg sm:text-2xl text-[#1A1816] leading-relaxed font-normal italic"
              >
                "{{ currentReview.text }}"
              </blockquote>

              <!-- Author Info -->
              <div
                class="flex items-center gap-4 pt-4 border-t border-gray-100"
              >
                <div
                  class="w-12 h-12 rounded-full bg-[#243821] text-white flex items-center justify-center font-serif text-base font-semibold"
                >
                  {{ currentReview.author.charAt(0) }}
                </div>
                <div>
                  <h4 class="font-serif font-medium text-[#1A1816] text-base">
                    {{ currentReview.author }}
                  </h4>
                  <p class="text-xs text-gray-500">
                    {{ currentReview.role }} • {{ currentReview.location }}
                  </p>
                </div>
                <div
                  class="ml-auto hidden sm:flex items-center gap-1.5 text-[11px] text-[#243821] bg-[#243821]/10 px-3 py-1 rounded-full font-semibold"
                >
                  <i class="fa fa-check-circle"></i> Verified Stay
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";

const currentIndex = ref(0);

const testimonials = [
  {
    author: "Mr. Emeka Okonkwo",
    role: "Managing Director",
    location: "Lagos / Abuja",
    rating: 5,
    text: "We had the best time at Vamble, enjoying our stay in Abuja. The apartment is everything it said and more. Quiet, pristine, high-speed internet that never blinked, and security was top notch. We couldn't have asked for a better place!",
  },
  {
    author: "Dr. Fatima Bello",
    role: "Senior Policy Advisor",
    location: "Abuja",
    rating: 5,
    text: "The serenity of Jahi coupled with the luxury fittings of Vamble make it my go-to choice when hosting visiting diplomatic colleagues. The 24/7 power and swift concierge response are truly exceptional.",
  },
  {
    author: "David & Sarah Hughes",
    role: "International Consultants",
    location: "United Kingdom",
    rating: 5,
    text: "Spotlessly clean, expansive gourmet kitchen, and plush king bed. Coming home to Vamble after busy meetings in the Central District felt like having a true private sanctuary in Abuja.",
  },
];

const currentReview = computed(() => testimonials[currentIndex.value]);

function nextTestimonial() {
  currentIndex.value = (currentIndex.value + 1) % testimonials.length;
}

function prevTestimonial() {
  currentIndex.value =
    (currentIndex.value - 1 + testimonials.length) % testimonials.length;
}
</script>
