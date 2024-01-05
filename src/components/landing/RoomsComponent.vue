<template>
  <section
    class="flex flex-col lg:flex-row gap-8 px-6 sm:px-8 xl:px-16 py-16 lg:py-0"
  >
    <div
      class="lg:w-[38%] lg:py-16 lg:pr-10 text-left relative lg:border-r border-[#a18463]/20"
      v-animate-onscroll="'scale-in-center'"
    >
      <div class="mb-6 flex items-center justify-between gap-x-6">
        <h2 class="text-4xl sm:text-6xl zendaya font-bold sm:max-w-[250px]">
          Rooms & <span class="text-[#2d5c1f]">Apartments</span>
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
        class="w-full h-[400px] mb-10 hidden lg:inline-block overflow-hidden"
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
        ref="sideSlide"
        wrapAround
      >
        <slide class="justify-start" v-for="(slide, idx) in rooms" :key="idx">
          <div class="lg:pt-16 relative">
            <div class="w-full grid grid-cols-2 gap-3 md:gap-12 mb-6 md:mb-0">
              <div
                v-for="n in slide.images"
                :key="n"
                class="overflow-hidden h-full w-full"
              >
                <img
                  :src="n"
                  v-animate-onscroll="'scale-in-center'"
                  class="object-cover transition-all duration-1000 h-full w-full hover:[kenburns-top] rounded"
                />
              </div>
            </div>
            <div
              class="md:w-[320px] h-[320px] md:absolute md:top-1/2 md:left-1/2 md:translate-x-[-50%] md:translate-y-[-50%] text-center bg-white md:shadow-lg p-3 md:rounded-full flex items-center justify-center"
            >
              <div>
                <h5 class="font-bold text-lg text-[#2d5c1f]">
                  {{ slide.title }}
                </h5>
                <p class="font-bold text-sm lg:text-xl mb-3">
                  {{ slide.price }}
                </p>
                <p
                  class="text-base mb-6 lg:text-xs"
                  data-aos="fade-up"
                  data-aos-once="true"
                >
                  {{ slide.description }}
                </p>

                <router-link to="/rooms">
                  <button
                    type="button"
                    class="bg-[#2d5c1f] text-white px-4 py-2 text-sm rounded hover:opacity-80 active:scale-95 shadow"
                    data-aos="fade-up"
                    data-aos-once="true"
                  >
                    View Rooms
                  </button>
                </router-link>
              </div>
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
      "We strive to provide a hospitable surrounding with our executive masters bedroom. You get free wifi, TV, a refrigerator, massive bedroom space, a shared grand sitting room and so much more to accommodate you wholesomely. Let Vamble Apartments and Suites be your home aw....",

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
      "Our Standard Apartments are modern and stylish, equipped with a fully furnished air-conditioned rooms , 75inch flat-screen television, a magnificent sitting room and so many other amenities that will make your stay very pleasurable. Fully equipped with state of the art furni...",
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
      "Our executive Apartment welcomes you with a gorgeously-appointed classical interior, separate bedroom and living room, extra-spacious bathroom and a balcony overlooking the fancy estate. With a classy debonair appearance to make your stay memorable. Fully equipped with state of the ...",

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
      "Our Platinum Apartments will leave you enthralled in its grandeur and luxury. Its interior is classy and fully equipped from the grand sitting room to the magnificent bedrooms and standardized kitchen, accompanied by cable tv and free WiFi...",

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
