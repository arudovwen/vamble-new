<template>
  <section class="py-14 sm:py-20 lg:py-28 border-b border-[#9B7846]/15 bg-[#FAF8F5]">
    <div class="max-w-[1440px] mx-auto px-4 sm:px-10 lg:px-16">
      <!-- Section Title & Filter Tabs -->
      <div
        class="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6"
      >
        <div class="text-left space-y-3">
          <span
            class="text-xs uppercase tracking-widest font-semibold text-[#9B7846] block"
          >
            Exclusive Accommodations
          </span>
          <h2
            class="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1816] font-normal leading-tight"
          >
            Suites &
            <span class="italic text-[#243821] font-serif">Apartments</span>
          </h2>
          <p class="text-sm text-gray-600 max-w-lg font-sans">
            Choose from our bespoke collection of hotel suites and expansive
            multi-bedroom serviced apartments.
          </p>
        </div>

        <!-- Filter Tabs -->
        <div class="flex flex-wrap gap-2">
          <button
            v-for="tab in filterTabs"
            :key="tab.value"
            @click="activeFilter = tab.value"
            :class="[
              activeFilter === tab.value
                ? 'bg-[#243821] text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-[#9B7846]/10 border border-[#9B7846]/20',
              'px-4 sm:px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer',
            ]"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>

      <!-- Featured Room Showcase Banner -->
      <div
        v-if="featuredRoom"
        class="mb-12 sm:mb-16 bg-white rounded-3xl overflow-hidden border border-[#9B7846]/20 shadow-lg grid grid-cols-1 lg:grid-cols-12 text-left"
      >
        <!-- Gallery Images Column -->
        <div
          class="lg:col-span-7 p-4 sm:p-8 flex flex-col justify-between space-y-3 sm:space-y-4"
        >
          <div
            class="relative rounded-2xl overflow-hidden aspect-[16/10] bg-gray-100 shadow-inner"
          >
            <img
              :src="currentMainImage"
              :alt="featuredRoom.flat_name"
              class="w-full h-full object-cover transition-all duration-500"
            />
            <span
              class="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#243821] text-white px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider shadow"
            >
              Featured Suite
            </span>
          </div>

          <!-- Thumbnails Row -->
          <div class="grid grid-cols-4 gap-2 sm:gap-3">
            <button
              v-for="(thumb, idx) in previewThumbnails"
              :key="idx"
              @click="currentMainImage = thumb"
              :class="[
                currentMainImage === thumb
                  ? 'ring-2 ring-[#243821] opacity-100'
                  : 'opacity-70 hover:opacity-100',
                'rounded-xl overflow-hidden aspect-[4/3] transition-all',
              ]"
            >
              <img
                :src="thumb"
                class="w-full h-full object-cover"
                alt="Room preview"
              />
            </button>
          </div>
        </div>

        <!-- Room Specs & Booking Action Column -->
        <div
          class="lg:col-span-5 p-6 sm:p-10 lg:border-l border-[#9B7846]/15 flex flex-col justify-between bg-[#FAF8F5]/40 space-y-6"
        >
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span
                class="text-xs uppercase tracking-widest font-semibold text-[#9B7846]"
              >
                {{
                  featuredRoom.flat_type === "apartment"
                    ? "Serviced Residence"
                    : "Private Suite"
                }}
              </span>
              <div class="flex text-amber-500 text-xs">
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
              </div>
            </div>

            <h3
              class="font-serif text-2xl sm:text-3xl font-medium text-[#1A1816] capitalize"
            >
              {{ featuredRoom.flat_name }}
            </h3>

            <p class="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {{ featuredRoom.description }}
            </p>

            <!-- Amenities Badges -->
            <div class="pt-2">
              <span
                class="text-[11px] uppercase tracking-wider font-semibold text-gray-500 block mb-2.5"
              >
                Included Comforts
              </span>
              <div class="grid grid-cols-2 gap-2 text-xs text-[#1A1816]">
                <div class="flex items-center gap-2">
                  <i class="fa fa-bed text-[#9B7846]"></i>
                  <span>King Size Bed</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="fa fa-users text-[#9B7846]"></i>
                  <span>Up to {{ featuredRoom.max_occupancy }} Guests</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="fa fa-wifi text-[#9B7846]"></i>
                  <span>High-Speed Wi-Fi</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="fa fa-tv text-[#9B7846]"></i>
                  <span>Smart 4K Cinema TV</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="fa fa-snowflake-o text-[#9B7846]"></i>
                  <span>Air Conditioning</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="fa fa-bath text-[#9B7846]"></i>
                  <span>En-suite Bathroom</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Price & Reserve CTA -->
          <div
            class="pt-6 border-t border-[#9B7846]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <p
                class="text-[11px] uppercase tracking-wider text-gray-500 font-semibold"
              >
                Starting From
              </p>
              <p
                class="font-serif text-2xl sm:text-3xl font-semibold text-[#243821]"
              >
                {{ currencyFormat(featuredRoom.price) }}
                <span class="text-xs font-sans font-normal text-gray-500"
                  >/ night</span
                >
              </p>
            </div>

            <router-link
              :to="{
                path: '/booking',
                query: {
                  category: featuredRoom.flat_type,
                  type: featuredRoom.flat_name,
                },
              }"
            >
              <button
                type="button"
                class="w-full sm:w-auto bg-[#243821] hover:bg-[#182716] text-white px-8 py-3.5 rounded-full text-xs uppercase tracking-wider font-semibold shadow-md active:scale-95 transition-all"
              >
                Reserve Suite
              </button>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Other Accommodations Grid -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left"
      >
        <div
          v-for="room in filteredRooms"
          :key="room.id || room.room_name"
          class="bg-white rounded-2xl overflow-hidden border border-[#9B7846]/20 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
        >
          <div>
            <div class="aspect-[16/10] overflow-hidden relative bg-gray-100">
              <img
                :src="getRoomImage(room)"
                :alt="room.flat_name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <span
                class="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#243821] shadow"
              >
                {{ currencyFormat(room.price) }} / night
              </span>
            </div>

            <div class="p-6 space-y-2.5">
              <div class="flex items-center justify-between">
                <span
                  class="text-[11px] uppercase tracking-widest font-semibold text-[#9B7846]"
                >
                  {{
                    room.flat_type === "apartment"
                      ? "Apartment"
                      : "Executive Suite"
                  }}
                </span>
                <span class="text-xs text-gray-500 flex items-center gap-1">
                  <i class="fa fa-user text-[10px]"></i>
                  {{ room.max_occupancy }} Guests
                </span>
              </div>

              <h3 class="font-serif text-xl font-medium text-[#1A1816] capitalize">
                {{ room.flat_name }}
              </h3>

              <p class="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                {{ room.description }}
              </p>
            </div>
          </div>

          <div class="p-6 pt-0">
            <router-link
              :to="{
                path: '/booking',
                query: {
                  category: room.flat_type,
                  type: room.flat_name,
                },
              }"
            >
              <button
                type="button"
                class="w-full border border-[#243821] hover:bg-[#243821] text-[#243821] hover:text-white py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all"
              >
                Select & Book
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, inject } from "vue";
import { getRoomTypes } from "@/services/roomservice";

const currencyFormat = inject(
  "currencyFormat",
  (val) => `₦${Number(val || 0).toLocaleString()}`
);

// Default Fallback Rooms matching database seed
const fallbackRooms = [
  {
    id: 1,
    flat_type: "room",
    flat_name: "Standard Room",
    room_name: "Room 101",
    price: 65000,
    max_occupancy: 2,
    description:
      "Elegantly furnished luxury standard room featuring a plush king-size bed, ensuite bathroom, smart HD TV, climate control, and high-speed Wi-Fi.",
  },
  {
    id: 2,
    flat_type: "room",
    flat_name: "Executive Suite",
    room_name: "Suite 201",
    price: 95000,
    max_occupancy: 2,
    description:
      "Spacious executive suite offering a refined sitting lounge, private balcony, king bed, workstation, premium minibar, and 24/7 dedicated room service.",
  },
  {
    id: 3,
    flat_type: "apartment",
    flat_name: "Luxury 1-Bedroom Apartment",
    room_name: "Apt 301",
    price: 135000,
    max_occupancy: 3,
    description:
      "Fully serviced luxury 1-bedroom apartment featuring a private living room, fully equipped gourmet kitchen, dining area, laundry facilities, and deluxe amenities.",
  },
  {
    id: 4,
    flat_type: "apartment",
    flat_name: "Royal 2-Bedroom Apartment",
    room_name: "Apt 401",
    price: 185000,
    max_occupancy: 4,
    description:
      "Exquisite 2-bedroom serviced apartment with two private ensuite bedrooms, expansive living area, modern kitchen, and stunning panoramic views of Abuja.",
  },
  {
    id: 5,
    flat_type: "apartment",
    flat_name: "Presidential Penthouse Suite",
    room_name: "Penthouse 501",
    price: 280000,
    max_occupancy: 6,
    description:
      "The pinnacle of discretion and luxury. Complete private penthouse floor with bespoke concierge, private chef service, expansive terrace, and ultra-high-speed fiber network.",
  },
];

const roomsList = ref(fallbackRooms);
const activeFilter = ref("all");

const filterTabs = [
  { label: "All Accommodations", value: "all" },
  { label: "Suites & Rooms", value: "room" },
  { label: "Serviced Apartments", value: "apartment" },
];

onMounted(async () => {
  try {
    const res = await getRoomTypes();
    if (res.status === 200 && Array.isArray(res.data) && res.data.length > 0) {
      roomsList.value = res.data;
    }
  } catch (err) {
    console.warn("Using fallback room types", err);
  }
});

const filteredRooms = computed(() => {
  if (activeFilter.value === "all") {
    return roomsList.value;
  }
  return roomsList.value.filter((r) => r.flat_type === activeFilter.value);
});

const featuredRoom = computed(() => {
  return roomsList.value[1] || roomsList.value[0];
});

// Image previews for featured room
const previewThumbnails = [
  require("@/assets/images/rooms/bed1.jpg"),
  require("@/assets/images/rooms/living.jpg"),
  require("@/assets/images/rooms/toilet.jpg"),
  require("@/assets/images/rooms/nigh.jpg"),
];

const currentMainImage = ref(previewThumbnails[0]);

function getRoomImage(room) {
  if (
    room.flat_name?.toLowerCase().includes("executive") ||
    room.room_name?.includes("201")
  ) {
    return require("@/assets/images/rooms/bed6.jpg");
  }
  if (
    room.flat_name?.toLowerCase().includes("1-bedroom") ||
    room.room_name?.includes("301")
  ) {
    return require("@/assets/images/rooms/living1.jpg");
  }
  if (
    room.flat_name?.toLowerCase().includes("2-bedroom") ||
    room.room_name?.includes("401")
  ) {
    return require("@/assets/images/rooms/sitting7.jpg");
  }
  if (
    room.flat_name?.toLowerCase().includes("penthouse") ||
    room.room_name?.includes("501")
  ) {
    return require("@/assets/images/rooms/sitting16.jpg");
  }
  return require("@/assets/images/rooms/bed2.jpg");
}
</script>
