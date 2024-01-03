<template>
  <section class="relative border-b border-[#a18463]/20 flex-1">
    <div class="flex z-[2] w-full">
      <div
        class="w-[80%] sm:w-[70%] lg:w-[600px] pt-40 pb-20 lg:pb-40 text-left px-6 sm:px-8 lg:px-16"
      >
        <div class="mb-4">
          <h1
            class="text-4xl sm:text-5xl xl:text-6xl font-semibold mb-6 xl:leading-[70px]"
          >
            Vamble Apartments & Suites.
            <span class="">
              A
              <span
                class="text-[#2d5c1f] zendaya text-shadow-drop-center xl:text-7xl"
                >home</span
              >
              away from
              <span
                class="text-[#2d5c1f] zendaya text-shadow-drop-center xl:text-7xl"
                >home</span
              >
            </span>
          </h1>
          <p
            class="text-xl sm:text-2xl font-semibold zendaya tracking-in-expand text-[#2d5c1f]"
          >
            Book now and get the best prices
          </p>
          <div class="lg:hidden mt-6 max-w-sm w-full">
            <router-link to="/booking">
              <button
                type="button"
                class="capitalize bg-[#2d5c1f] text-white text-sm px-6 py-3 w-full hover:opacity-80 active:scale-95"
              >
                Book a stay
              </button>
            </router-link>
          </div>
        </div>
      </div>

      <div class="flex-1 overflow-hidden relative">
        <video
          autoplay
          poster="@/assets/images/testv.jpeg"
          class="w-full h-full max-h-[700px] object-cover"
          loop
          muted
        >
          <source
            src="https://res.cloudinary.com/arudovwen-me/video/upload/f_auto:video,q_auto/x3yqwfsqlr9jhg5lbhq2"
            type="video/mp4"
          />
        </video>
        <div
          class="absolute z-10 top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500/50"
        ></div>
      </div>
    </div>
    <div
      class="absolute bottom-[50px] lg:bottom-[70px] px-6 sm:px-8 lg:px-16 z-20"
    >
      <BookingComponent />
    </div>
  </section>
</template>
<script setup>
import BookingComponent from "./BookingComponent.vue";
</script>
