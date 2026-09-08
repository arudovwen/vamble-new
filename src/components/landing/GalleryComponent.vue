<template>
  <section
    id="gallery"
    class="py-20 lg:py-28 border-b border-[#9B7846]/15 bg-white"
  >
    <div class="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
      <!-- Section Header -->
      <div class="text-center max-w-2xl mx-auto space-y-3 mb-14">
        <span
          class="text-xs uppercase tracking-widest font-semibold text-[#9B7846] block"
        >
          Visual Tour
        </span>
        <h2
          class="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1816] font-normal leading-tight"
        >
          Our <span class="italic text-[#243821] font-serif">Gallery</span>
        </h2>
        <p class="text-sm text-gray-600 font-sans">
          A glimpse into the thoughtful architecture, bespoke Italian
          furnishing, and peaceful ambiance awaiting you.
        </p>
      </div>

      <!-- 6-Photo Masonry / Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(photo, index) in galleryPhotos"
          :key="index"
          class="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100 shadow-sm border border-[#9B7846]/15 cursor-pointer"
          @click="selectedPhoto = photo"
        >
          <img
            :src="photo.src"
            :alt="photo.caption"
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-left"
          >
            <span
              class="text-[10px] uppercase tracking-widest text-[#9B7846] font-semibold"
            >
              {{ photo.category }}
            </span>
            <h4 class="font-serif text-lg font-medium text-white">
              {{ photo.caption }}
            </h4>
          </div>
        </div>
      </div>

      <!-- Modal Preview for Full Screen Zoom -->
      <div
        v-if="selectedPhoto"
        class="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
        @click="selectedPhoto = null"
      >
        <div
          class="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
          @click.stop
        >
          <button
            @click="selectedPhoto = null"
            class="absolute -top-12 right-0 text-white text-3xl hover:text-[#9B7846] transition-colors"
          >
            ✕
          </button>
          <img
            :src="selectedPhoto.src"
            :alt="selectedPhoto.caption"
            class="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl border border-white/10"
          />
          <p class="text-white text-sm font-serif mt-4 text-center">
            {{ selectedPhoto.caption }} • {{ selectedPhoto.category }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const selectedPhoto = ref(null);

const galleryPhotos = [
  {
    src: require("@/assets/images/rooms/bed1.jpg"),
    caption: "Master Suite with King Bed",
    category: "Suites",
  },
  {
    src: require("@/assets/images/rooms/living.jpg"),
    caption: "Executive Sitting Lounge",
    category: "Living",
  },
  {
    src: require("@/assets/images/rooms/toilet.jpg"),
    caption: "Marble En-suite Bathroom",
    category: "Bath",
  },
  {
    src: require("@/assets/images/rooms/kitchen2.jpg"),
    caption: "Gourmet Induction Kitchen",
    category: "Kitchen & Dining",
  },
  {
    src: require("@/assets/images/rooms/sitting7.jpg"),
    caption: "Royal 2-Bedroom Living Room",
    category: "Apartments",
  },
  {
    src: require("@/assets/images/rooms/nigh.jpg"),
    caption: "Exterior Architecture & Terrace",
    category: "Exterior & Night",
  },
];
</script>
