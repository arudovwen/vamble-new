<template>
  <section class="relative pb-16">
    <div class="flex z-[2] w-full border-b border-[#a18463]/20">
      <div
        class="w-[80%] sm:w-[70%] lg:w-[600px] pt-40 pb-20 lg:pb-40 text-left px-6 sm:px-8 lg:px-16"
      >
        <div class="mb-4">
          <h1
            class="text-[#2d5c1f] mb-3 lg:mb-6 zendaya text-5xl xl:text-7xl font-bold"
          >
            Rooms & Apartments
          </h1>
          <p class="text-base xl:text-2xl text-left">
            A look at our rooms, apartments, sitting rooms and so much more, so
            you will havea clue of what to expect
          </p>
        </div>
      </div>

      <div
        class="flex-1 overflow-hidden bg-[url('@/assets/images/testv.jpeg')] bg-cover bg-center"
      >
        <div
          class="w-full h-full flex justify-start items-center bg-gray-500/20 backdrop-brightness-50"
        ></div>
      </div>
    </div>
    <div
      v-for="room in rooms"
      :key="room.title"
      class="lg:flex border-b border-[#a18463]/20 pb-6 sm:pb-8 lg:pb-16"
    >
      <div class="lg:w-1/2 px-6 pt-6 pb-0 sm:px-8 sm:pt-8 lg:px-16 lg:pt-16">
        <h2
          class="text-4xl sm:text-5xl lg:text-6xl font-semibold mb-6 text-left zendaya"
        >
          {{ room.title }}
        </h2>
        <div>
          <carousel :items-to-show="1.5">
            <slide v-for="slide in 10" :key="slide">
              {{ slide }}
            </slide>

            <template #addons>
              <navigation />
              <pagination />
            </template>
          </carousel>
        </div>
      </div>
      <div class="lg:w-1/2 px-6 pt-6 pb-0 sm:px-8 sm:pt-8 lg:px-16 lg:pt-16">
        <p class="text-base xl:text-2xl text-left">
          {{ room.text }}
        </p>
      </div>
    </div>
  </section>
</template>
<script setup>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

const rooms = [
  {
    title: "Standard Room",
    text: "Get comfy in our fully air-conditioned rooms, setup to give you the perfect feel of a standard bedroom. Spacious and cozy with your own TV,free wifi, refrigerator, bathroom and so much more; Vamble Apartments and Suites is always available to serve you.",
    urls: ["", "", ""],
  },
  {
    title: "Executive Room",
    text: "We strive to provide a hospitable surrounding with our executive masters bedroom. You get free wifi, TV, a refrigerator, massive bedroom space, a shared grand sitting room and so much more to accommodate you wholesomely. Let Vamble Apartments and Suites be your home away from home.",
    urls: ["", "", ""],
  },
  {
    title: "Standard Apartment",
    text: "Our Standard Apartments are modern and stylish, equipped with a fully furnished air-conditioned rooms , 75inch flat-screen television, a magnificent sitting room and so many other amenities that will make your stay very pleasurable. Fully equipped with state of the art furnitures, a grand sitting room, cable tv, and free wifi.",
    urls: ["", "", ""],
  },
  {
    title: "Executive Apartment",
    text: "Our executive Apartment welcomes you with a gorgeously-appointed classical interior, separate bedroom and living room, extra-spacious bathroom and a balcony overlooking the fancy estate. With a classy debonair appearance to make your stay memorable. Fully equipped with state of the art furnitures, a grand sitting room, cable tv, and free wifi. Feel at home in this spacious suite.",
    urls: ["", "", ""],
  },
  {
    title: "Platinum Apartment",
    text: "Our Platinum Apartments will leave you enthralled in its grandeur and luxury. Its interior is classy and fully equipped from the grand sitting room to the magnificent bedrooms and standardized kitchen, accompanied by cable tv and free WiFi. Your stay at Vamble Apartments and Suites is nothing short of royal.",
    urls: ["", "", ""],
  },
];
</script>
