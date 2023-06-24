<template>
  <section class="relative">
    <div
      class="grid grid-cols-1 lg:grid-cols-2 px-6 sm:px-8 lg:px-16 border-t border-b border-[#a18463]/20 mb-10 mt-20 py-16 lg:py-0"
    >
      <div class="relative lg:border-r border-[#a18463]/20 mb-4 lg:mb-0">
        <carousel
          :autoplay="4000"
          :modelValue="slideIndex"
          :items-to-show="1"
          ref="mainSlide"
          wrapAround
        >
          <slide
            class="flex flex-col text-left items-start"
            v-for="(slide, i) in testimonials"
            :key="i"
          >
            <div
              class="w-full h-[500px] py-10 pr-10 hidden lg:block overflow-hidden"
              v-animate-onscroll="'scale-in-center'"
            >
              <img :src="slide.img" class="w-full h-full object-contain" />
            </div>
          </slide>
        </carousel>
        <span
          class="bg-[#f6f3e9] px-4 py-1 lg:absolute font-bold -top-4 -left-4 text-3xl lg:text-3xl zendaya"
          >TESTIMONIALS</span
        >
      </div>

      <div class="pl-8 p-6 lg:p-10 relative flex flex-col justify-center">
        <span class="absolute z-[1] top-4 left-6 opacity-20">
          <i class="fa fa-quote-left fa-5x quote" aria-hidden="true"></i
        ></span>
        <span class="absolute z-[1] bottom-4 right-6 opacity-20">
          <i class="fa fa-quote-right fa-5x quote" aria-hidden="true"></i
        ></span>
        <carousel
          :autoplay="4000"
          :modelValue="slideIndex"
          :items-to-show="1"
          ref="sideSlide"
          wrapAround
        >
          <slide
            class="justify-start"
            v-for="(slide, i) in testimonials"
            :key="i"
          >
            <div class="text-left z-[2] relative">
              <p
                class="text-sm lg:text-xl font-semibold mb-6"
                v-animate-onscroll="'fade-in-bottom'"
              >
                {{ slide.text }}
              </p>
              <p
                class="text-sm lg:text-lg font-medium"
                v-animate-onscroll="'fade-in-bottom'"
              >
                {{ slide.title }}
              </p>
              <div
                class="w-[100px] my-1 sm:my-2 border"
                v-animate-onscroll="'fade-in-bottom'"
              />
              <p
                class="text-xs lg:text-sm text-green-700 font-medium"
                v-animate-onscroll="'fade-in-bottom'"
              >
                {{ slide.date }}
              </p>
            </div>
          </slide>
        </carousel>
        <div
          class="bg-[#f6f3e9] px-6 py-1 mb-6 flex items-center justify-between absolute font-bold -bottom-10 left-0"
        >
          <div class="flex items-center gap-x-4">
            <span
              @click="handlePrev()"
              class="border rounded-sm p-1 text-[#2d5c1f] border-[#2d5c1f] cursor-pointer"
              ><ArrowLeftIcon class="w-4 h-4"
            /></span>
            <span
              @click="handleNext()"
              class="bg-[#2d5c1f] text-white p-1 rounded-sm border border-[#2d5c1f] cursor-pointer"
              ><ArrowRightIcon class="w-4 h-4"
            /></span>
          </div>
        </div>
      </div>
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
const testimonials = [
  {
    title: "Zinny Michael",
    text: "You glow differently when relaxing in the right location pampered with vamble staff",
    img: require("@/assets/images/testimonial.jpg"),
    date: "May 21",
  },
  {
    title: "Sadiq Nuhu",
    text: "My stay was comfortable throughout the two weeks I spent. I would definitely patronize Vamble Apartments and Suites the next time I come to Nigeria.",
    img: require("@/assets/images/testi1.jpg"),
    date: "Dec 18",
  },
  {
    title: "Obinna & Kate Nwachukwu",
    text: "We had the best time of our lives enjoying our honeymoon at the Luxury apartment. It was like our first home as a couple. The environment is secure and we had every single thing we needed from the living room to the kitchen.",
    img: require("@/assets/images/testi.jpg"),
    date: "Sept 18",
  },
  {
    title: "Courtney Uche",
    text: "My bridal shower was absolutely fantastic. From the moment we arrived, the staff went above and beyond to ensure our comfort and satisfaction. The elegant decor, impeccable service, and delightful amenities provided an unforgettable experience for everyone in attendance.",
    img: require("@/assets/images/testi2.jpg"),
    date: "Nov 04",
  },
];
function handleNext() {
  mainSlide.value.next();
  sideSlide.value.next();
}
function handlePrev() {
  mainSlide.value.prev();
  sideSlide.value.prev();
}
</script>
