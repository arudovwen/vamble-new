<template>
  <section
    class="grid gri-cols-1 lg:grid-cols-2 px-6 sm:px-8 lg:px-16 border-t border-b border-[#a18463]/20 mb-10 mt-20 py-16 lg:py-0"
  >
    <div class="relative lg:border-r border-[#a18463]/20 mb-4 lg:mb-0">
      <div
        class="w-full h-[500px] py-10 pr-10 hidden lg:block overflow-hidden"
        v-animate-onscroll="'scale-in-center'"
      >
        <img
          src="@/assets/images/testv.jpeg"
          class="w-full h-full transition-all duration-1000 hover:scale-105"
        />
      </div>

      <span
        class="bg-[#f6f3e9] px-4 py-1 lg:absolute font-bold -top-4 -left-4 text-3xl lg:text-3xl zendaya text-shadow-drop-center"
        >TESTIMONIALS</span
      >
    </div>

    <div class="pl-8 p-6 lg:p-16 relative">
      <span class="absolute z-[1] top-4 left-6 opacity-40 text-8xl">"</span>
      <div class="max-w-[400px] text-left z-[2] relative">
        <p
          class="text-sm lg:text-2xl font-semibold mb-6"
          v-animate-onscroll="'fade-in-bottom'"
        >
          We had the best time of our lives enjoying our honeymoon at the Luxury
          apartment. It was like our first home as a couple. The environment is
          secure and we had every single thing we needed from the living room to
          the kitchen.
        </p>
        <p
          class="text-sm lg:text-lg font-medium"
          v-animate-onscroll="'fade-in-bottom'"
        >
          Obinna & Kate Nwachukwu
        </p>
        <div
          class="w-[100px] my-1 sm:my-2 border"
          v-animate-onscroll="'fade-in-bottom'"
        />
        <p
          class="text-xs lg:text-sm text-green-700 font-medium"
          v-animate-onscroll="'fade-in-bottom'"
        >
          May 2022
        </p>
      </div>
      <div
        class="bg-[#f6f3e9] px-6 py-1 mb-6 flex items-center justify-between absolute font-bold -bottom-10 left-0"
      >
        <div class="flex items-center gap-x-4">
          <span
            class="border rounded-sm p-1 text-[#2d5c1f] border-[#2d5c1f] cursor-pointer"
            ><ArrowLeftIcon class="w-4 h-4"
          /></span>
          <span
            class="bg-[#2d5c1f] text-white p-1 rounded-sm border border-[#2d5c1f] cursor-pointer"
            ><ArrowRightIcon class="w-4 h-4"
          /></span>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/vue/24/outline";
</script>
