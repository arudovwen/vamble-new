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

      <div
        class="w-full h-[500px] mb-10 hidden lg:inline-block overflow-hidden"
      >
        <img
          src="@/assets/images/rooms/nigh1.jpg"
          class="w-full h-full transition-all duration-1000 hover:scale-105 rounded-lg object-cover"
        />
      </div>

      <span
        class="bg-[#f6f3e9] px-4 py-1 absolute top-32 -right-[90px] rotate-90 text-xs hidden lg:inline"
        >Vamble Apartment & Suites</span
      >
    </div>
    <div class="flex-1 lg:max-w-[60%]">
      <carousel
        :modelValue="slideIndex"
        :items-to-show="1"
        :autoplay="3000"
        ref="sideSlide"
      >
        <slide class="justify-start" v-for="(slide, idx) in rooms" :key="idx">
          <div class="lg:py-16 text-left relative">
            <div class="w-full mb-10 grid grid-cols-2 gap-4">
              <div v-for="n in slide.images" :key="n" class="overflow-hidden">
                <img
                  :src="n"
                  v-animate-onscroll="'scale-in-center'"
                  class="object-cover transition-all duration-1000 max-w-[350px] w-full hover:[kenburns-top]"
                />
              </div>
            </div>
            <div class="xl:max-w-[600px]">
              <h5 class="text-lg font-bold lg:text-xl text-left mb-2">
                {{ slide.title }}
              </h5>
              <p class="font-bold text-xl lg:text-3xl mb-3 text-left">
                {{ slide.price }}
              </p>
              <p
                class="text-base mb-6 lg:text-xl"
                v-animate-onscroll="'fade-in-bottom'"
              >
                {{ slide.description }}
              </p>
              <router-link to="/rooms">
                <button
                  type="button"
                  class="bg-[#2d5c1f] text-white px-10 py-3 text-sm sm:text-[15px] hover:opacity-80 active:scale-95"
                  v-animate-onscroll="'fade-in-bottom'"
                >
                  View Rooms
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

const sideSlide = ref(null);
const slideIndex = ref(0);
function handleNext() {
  sideSlide.value.next();
}
function handlePrev() {
  sideSlide.value.prev();
}

const rooms = [
  {
    title: "Standard Room",
    price: "₦30,000 per night",
    description:
      "Get comfy in our fully air-conditioned rooms, setup to give you the perfect feel of a standard bedroom. Spacious and cozy with your own TV,free wifi, refrigerator, bathroom and so much more.",

    images: [
      require("@/assets/images/rooms/bed11.jpg"),
      require("@/assets/images/rooms/bed5.jpg"),
      require("@/assets/images/rooms/broom3.jpg"),
      require("@/assets/images/rooms/bed10.jpg"),
    ],
    tags: [
      " Family size beds",
      "Air conditioning",
      "Complementary breakfast",
      "Free toiletries",
      "Temperature sensored showers",
      " Desk Seating Area",
      "Smart TV",
      " 24 hours Laundry service",
      "24 hours bar service",
      "Refrigerator",
      "Satellite channels",
      "Wireless Internet",
    ],
  },
  {
    title: "Executive Room",
    price: "₦45,000 per night",
    description:
      "We strive to provide a hospitable surrounding with our executive masters bedroom. You get free wifi, TV, a refrigerator, massive bedroom space, a shared grand sitting room and so much more to accommodate you wholesomely. Let Vamble Apartments and Suites be your home away from home.",

    images: [
      require("@/assets/images/rooms/bed5.jpg"),
      require("@/assets/images/rooms/bed11.jpg"),
      require("@/assets/images/rooms/bed7.jpg"),
      require("@/assets/images/rooms/bed10.jpg"),
    ],
    tags: [
      " Family size beds",
      "Air conditioning",
      "Complementary breakfast",
      "Free toiletries",
      "Temperature sensored showers",
      " Desk Seating Area",
      "Smart TV",
      " 24 hours Laundry service",
      "24 hours bar service",
      "Refrigerator",
      "Satellite channels",
      "Wireless Internet",
    ],
  },
  {
    title: "Standard Apartment",
    description:
      "Our Standard Apartments are modern and stylish, equipped with a fully furnished air-conditioned rooms , 75inch flat-screen television, a magnificent sitting room and so many other amenities that will make your stay very pleasurable. Fully equipped with state of the art furnitures, a grand sitting room, cable tv, and free wifi.",
    price: "₦110,000 per night",

    images: [
      require("@/assets/images/rooms/sitting16.jpg"),
      require("@/assets/images/rooms/bed9.jpg"),
      require("@/assets/images/rooms/broom.jpg"),
      require("@/assets/images/rooms/sitting7.jpg"),
    ],
    tags: [
      " Family size beds",
      "Air conditioning",
      "Complementary breakfast",
      "Free toiletries",
      "Temperature sensored showers",
      " Desk Seating Area",
      "Smart TV",
      " 24 hours Laundry service",
      "24 hours bar service",
      "Refrigerator",
      "Satellite channels",
      "Wireless Internet",
    ],
  },
  {
    title: "Executive Apartment",
    price: "₦120,000 per night",
    description:
      "Our executive Apartment welcomes you with a gorgeously-appointed classical interior, separate bedroom and living room, extra-spacious bathroom and a balcony overlooking the fancy estate. With a classy debonair appearance to make your stay memorable. Fully equipped with state of the art furnitures, a grand sitting room, cable tv, and free wifi. Feel at home in this spacious suite.",

    images: [
      require("@/assets/images/rooms/living3.jpg"),
      require("@/assets/images/rooms/sitting7.jpg"),
      require("@/assets/images/rooms/bed2.jpg"),
      require("@/assets/images/rooms/kitchen.jpg"),
    ],
    tags: [
      "Family size beds",
      "Air conditioning",
      "Kitchen",
      "Complementary breakfast",
      "Free toiletries",
      "Temperature sensored showers",
      " Desk Seating Area",
      "Smart TV",
      " 24 hours Laundry service",
      "24 hours bar service",
      "Refrigerator",
      "Satellite channels",
      "Wireless Internet",
    ],
  },
  {
    title: "Platinum Apartment",
    price: "₦150,000 per night",
    description:
      "Our Platinum Apartments will leave you enthralled in its grandeur and luxury. Its interior is classy and fully equipped from the grand sitting room to the magnificent bedrooms and standardized kitchen, accompanied by cable tv and free WiFi. Your stay at Vamble Apartments and Suites is nothing short of royal.",

    images: [
      require("@/assets/images/rooms/sitting7.jpg"),
      require("@/assets/images/rooms/bed5.jpg"),
      require("@/assets/images/rooms/kitchen2.jpg"),
      require("@/assets/images/rooms/sitting13.jpg"),
    ],
    tags: [
      "Family size beds",
      "Air conditioning",
      "Kitchen",
      "Complementary breakfast",
      "Free toiletries",
      "Temperature sensored showers",
      " Desk Seating Area",
      "Smart TV",
      " 24 hours Laundry service",
      "24 hours bar service",
      "Refrigerator",
      "Satellite channels",
      "Wireless Internet",
    ],
  },
];
</script>
