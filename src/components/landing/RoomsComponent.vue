<template>
  <section
    class="flex flex-col lg:flex-row gap-8 px-6 sm:px-8 xl:px-16 py-16 lg:py-0"
  >
    <div
      class="lg:w-[38%] lg:py-16 lg:pr-10 text-left relative lg:border-r border-[#a18463]/20"
      v-animate-onscroll="'scale-in-center'"
    >
      <div class="mb-6 flex items-center justify-between">
        <h2 class="text-6xl zendaya font-bold max-w-[250px]">
          Rooms & Apartments
        </h2>
        <div class="flex items-center gap-x-4">
          <button
            type="button"
            @click="handlePrev()"
            class="border rounded-sm p-1 text-[#2d5c1f] border-[#2d5c1f] cursor-pointer"
          >
            <ArrowLeftIcon class="w-4 h-4" />
          </button>
          <button
            type="button"
            @click="handleNext"
            class="bg-[#2d5c1f] text-white p-1 rounded-sm border border-[#2d5c1f] cursor-pointer"
          >
            <ArrowRightIcon class="w-4 h-4" />
          </button>
        </div>
      </div>

      <carousel :modelValue="slideIndex" :items-to-show="1" ref="mainSlide">
        <slide
          class="flex flex-col text-left items-start"
          v-for="slide in 10"
          :key="slide"
        >
          <div class="w-full h-[500px] mb-10 hidden lg:inline-block">
            <img
              src="@/assets/images/testv.jpeg"
              class="w-full h-full transition-all duration-1000 hover:scale-105"
            />
          </div>
        </slide>
      </carousel>

      <span
        class="bg-[#f6f3e9] px-4 py-1 absolute top-32 -right-[90px] rotate-90 text-xs hidden lg:inline"
        >Vamble Apartment & Suites</span
      >
    </div>
    <div class="flex-1 lg:max-w-[60%]">
      <carousel :modelValue="slideIndex" :items-to-show="1" ref="sideSlide">
        <slide class="justify-start" v-for="slide in 10" :key="slide">
          <div class="lg:py-16 text-left relative">
            <div class="w-full mb-10 grid grid-cols-2 gap-6">
              <div v-for="n in 4" :key="n">
                <img
                  src="@/assets/images/testv.jpeg"
                  class="object-cover transition-all duration-1000 hover:scale-105 max-w-[378px] w-full"
                  v-animate-onscroll="'scale-in-center'"
                />
              </div>
            </div>
            <div class="max-w-[500px]">
              <h5 class="text-lg font-bold lg:text-2xl text-left mb-2">
                Standard Room
              </h5>
              <p
                class="text-base mb-6 lg:text-xl"
                v-animate-onscroll="'fade-in-bottom'"
              >
                Get comfy in our fully air-conditioned rooms, setup to give you
                the perfect feel of a standard bedroom. Spacious and cozy with
                your own TV,free wifi, re.. ₦30,000 per night
              </p>
              <router-link to="/booking">
                <button
                  type="button"
                  class="bg-[#2d5c1f] text-white px-10 py-3 text-sm sm:text-[15px] hover:opacity-80 active:scale-95"
                  v-animate-onscroll="'fade-in-bottom'"
                >
                  Reserve now
                </button>
              </router-link>
            </div>
          </div>
        </slide>
      </carousel>
    </div>
  </section>
</template>

<script setup>
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/vue/24/outline";
import { Carousel, Slide } from "vue3-carousel";
import { ref } from "vue";

const mainSlide = ref(null);
const sideSlide = ref(null);
const slideIndex = ref(0);
function handleNext() {
  mainSlide.value.next();
  sideSlide.value.next();
}
function handlePrev() {
  mainSlide.value.prev();
  sideSlide.value.prev();
}
</script>
