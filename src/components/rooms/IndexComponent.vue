<template>
  <div class="bg-[#FAF8F5] text-[#1A1816] min-h-screen">
    <!-- Hero Banner -->
    <section
      class="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#132212] text-white"
    >
      <div class="absolute inset-0 z-0 opacity-25 mix-blend-overlay">
        <img
          src="@/assets/images/rooms/building7.jpg"
          alt="Vamble Suites Architecture"
          class="w-full h-full object-cover"
        />
      </div>
      <div
        class="absolute inset-0 bg-gradient-to-t from-[#132212] via-[#132212]/60 to-transparent z-0"
      ></div>

      <div
        class="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 text-center"
      >
        <div
          class="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#9B7846]/20 border border-[#9B7846]/40 text-[#c5a880] text-[11px] sm:text-xs font-semibold tracking-widest uppercase mb-4 sm:mb-6"
        >
          <i class="fa fa-sparkles text-xs"></i>
          <span>Curated Accommodations</span>
        </div>

        <h1
          class="font-serif text-3xl sm:text-5xl lg:text-7xl font-normal tracking-tight text-white mb-4 sm:mb-6 max-w-4xl mx-auto leading-tight"
        >
          Sanctuaries of
          <span class="italic text-[#c5a880]">Timeless Luxury</span> &
          Discretion
        </h1>

        <p
          class="font-sans text-sm sm:text-lg lg:text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed mb-8 sm:mb-10"
        >
          Immerse yourself in our collection of bespoke master suites and fully
          serviced private apartments in Jahi, Abuja. Crafted for diplomacy,
          business, and tranquil living.
        </p>

        <!-- Quick Filter Tabs -->
        <div class="flex flex-wrap justify-center gap-2 sm:gap-3">
          <button
            v-for="cat in categories"
            :key="cat.id"
            @click="activeCategory = cat.id"
            :class="[
              activeCategory === cat.id
                ? 'bg-[#9B7846] text-white shadow-lg border-[#9B7846]'
                : 'bg-white/10 text-white/80 hover:bg-white/20 border-white/20',
              'px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs uppercase tracking-wider font-semibold border transition-all duration-300',
            ]"
          >
            {{ cat.name }}
          </button>
        </div>
      </div>
    </section>

    <!-- Key Distinction Highlights -->
    <section
      class="border-b border-[#9B7846]/20 bg-white/70 backdrop-blur-md py-4 sm:py-6"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 text-center">
          <div class="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-center sm:text-left p-2">
            <div
              class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#243821]/10 flex items-center justify-center text-[#243821] shrink-0"
            >
              <i class="fa fa-bolt text-xs sm:text-sm"></i>
            </div>
            <div>
              <span
                class="block text-[10px] sm:text-xs uppercase tracking-wider text-gray-400 font-bold"
                >Power</span
              >
              <span class="text-xs sm:text-sm font-bold text-[#1A1816]"
                >24/7 Redundant</span
              >
            </div>
          </div>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-center sm:text-left p-2">
            <div
              class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#243821]/10 flex items-center justify-center text-[#243821] shrink-0"
            >
              <i class="fa fa-wifi text-xs sm:text-sm"></i>
            </div>
            <div>
              <span
                class="block text-[10px] sm:text-xs uppercase tracking-wider text-gray-400 font-bold"
                >Connectivity</span
              >
              <span class="text-xs sm:text-sm font-bold text-[#1A1816]"
                >Starlink Ultra-Fiber</span
              >
            </div>
          </div>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-center sm:text-left p-2">
            <div
              class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#243821]/10 flex items-center justify-center text-[#243821] shrink-0"
            >
              <i class="fa fa-shield-alt text-xs sm:text-sm"></i>
            </div>
            <div>
              <span
                class="block text-[10px] sm:text-xs uppercase tracking-wider text-gray-400 font-bold"
                >Security</span
              >
              <span class="text-xs sm:text-sm font-bold text-[#1A1816]"
                >24/7 Monitored CCTV</span
              >
            </div>
          </div>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-center sm:text-left p-2">
            <div
              class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#243821]/10 flex items-center justify-center text-[#243821] shrink-0"
            >
              <i class="fa fa-concierge-bell text-xs sm:text-sm"></i>
            </div>
            <div>
              <span
                class="block text-[10px] sm:text-xs uppercase tracking-wider text-gray-400 font-bold"
                >Service</span
              >
              <span class="text-xs sm:text-sm font-bold text-[#1A1816]"
                >Dedicated Concierge</span
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Suites Showcase -->
    <section class="py-12 sm:py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
      <div class="space-y-16 lg:space-y-24">
        <article
          v-for="(suite, idx) in filteredSuites"
          :key="suite.id"
          class="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-[#9B7846]/20 transition-all duration-500 hover:shadow-2xl hover:border-[#9B7846]/40 flex flex-col lg:flex-row"
          :class="{ 'lg:flex-row-reverse': idx % 2 === 1 }"
        >
          <!-- Left/Right: Gallery Slider / Showcase -->
          <div
            class="lg:w-1/2 relative min-h-[340px] lg:min-h-[460px] bg-neutral-900 group"
          >
            <img
              :src="suite.activeImage"
              :alt="suite.name"
              class="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"
            ></div>

            <!-- Top Pill Badge -->
            <div class="absolute top-5 left-5 z-10 flex gap-2">
              <span
                class="px-3 py-1.5 rounded-full bg-[#243821]/90 backdrop-blur-md text-white text-[11px] font-semibold tracking-wider uppercase border border-white/20"
              >
                {{ suite.badge }}
              </span>
              <span
                class="px-3 py-1.5 rounded-full bg-[#9B7846]/90 backdrop-blur-md text-white text-[11px] font-semibold tracking-wider uppercase border border-white/20"
              >
                Floor {{ suite.floor }}
              </span>
            </div>

            <!-- Thumbnail Selector Strip -->
            <div
              class="absolute bottom-4 inset-x-4 flex items-center justify-center gap-2 z-10 overflow-x-auto py-1"
            >
              <button
                v-for="(thumb, tidx) in suite.gallery"
                :key="tidx"
                @click="suite.activeImage = thumb"
                class="w-12 h-12 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer"
                :class="
                  suite.activeImage === thumb
                    ? 'border-[#c5a880] scale-110 shadow-lg'
                    : 'border-white/50 opacity-70 hover:opacity-100'
                "
              >
                <img :src="thumb" class="w-full h-full object-cover" />
              </button>
            </div>
          </div>

          <!-- Content Description & Booking -->
          <div
            class="lg:w-1/2 p-5 sm:p-8 lg:p-12 flex flex-col justify-between text-left"
          >
            <div>
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 mb-3">
                <span
                  class="text-xs uppercase tracking-widest font-bold text-[#9B7846]"
                >
                  {{ suite.categoryName }}
                </span>
                <div class="text-left sm:text-right">
                  <span
                    class="font-serif text-2xl sm:text-3xl font-bold text-[#243821]"
                  >
                    {{ currencyFormat(suite.price) }}
                  </span>
                  <span class="text-xs text-gray-500 font-sans block"
                    >/ night (all inclusive)</span
                  >
                </div>
              </div>

              <h2
                class="font-serif text-2xl sm:text-4xl text-[#1A1816] font-normal mb-3 sm:mb-4"
              >
                {{ suite.name }}
              </h2>

              <p
                class="font-sans text-gray-600 text-xs sm:text-base leading-relaxed mb-6 font-light"
              >
                {{ suite.description }}
              </p>

              <!-- Specs Grid -->
              <div
                class="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-[#9B7846]/15 mb-6 text-xs text-[#1A1816]"
              >
                <div class="flex items-center gap-2">
                  <i class="fa fa-users text-[#9B7846]"></i>
                  <span>Max {{ suite.maxOccupancy }} Guests</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="fa fa-bed text-[#9B7846]"></i>
                  <span>{{ suite.bedType }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="fa fa-bath text-[#9B7846]"></i>
                  <span>Ensuite Bath</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="fa fa-expand-arrows-alt text-[#9B7846]"></i>
                  <span>{{ suite.size }}</span>
                </div>
              </div>

              <!-- Amenity Badges -->
              <div class="flex flex-wrap gap-2 mb-8">
                <span
                  v-for="amenity in suite.amenities"
                  :key="amenity"
                  class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] text-xs font-medium text-gray-700 border border-gray-200"
                >
                  <i class="fa fa-check text-[10px] text-[#243821]"></i>
                  {{ amenity }}
                </span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div
              class="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-gray-100"
            >
              <router-link
                :to="`/booking?type=${encodeURIComponent(suite.name)}`"
                class="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 bg-[#243821] hover:bg-[#182716] text-white px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 text-center"
              >
                <span>Reserve {{ suite.name }}</span>
                <i class="fa fa-arrow-right text-xs"></i>
              </router-link>

              <router-link
                to="/enquiry"
                class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-gray-300 hover:border-[#243821] text-xs uppercase tracking-wider font-semibold text-gray-700 hover:text-[#243821] transition-colors"
              >
                <i class="fa fa-envelope-o"></i>
                <span>Enquire</span>
              </router-link>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- World-Class Hospitality Promises -->
    <section class="py-14 sm:py-20 bg-[#1A1816] text-white relative overflow-hidden">
      <div
        class="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10 text-center"
      >
        <span
          class="text-xs uppercase tracking-widest font-semibold text-[#c5a880] block mb-3"
        >
          The Vamble Apartments Standard
        </span>
        <h2
          class="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white mb-6"
        >
          Every Stay Includes Unmatched Luxury
        </h2>
        <p
          class="font-sans text-gray-400 text-sm sm:text-lg max-w-2xl mx-auto mb-10 sm:mb-14 font-light"
        >
          We pride ourselves on providing the calm privacy of a private
          residence combined with five-star hotel services.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left">
          <div
            class="p-5 sm:p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#9B7846]/50 transition-all duration-300"
          >
            <div
              class="w-12 h-12 rounded-xl bg-[#9B7846]/20 border border-[#9B7846]/40 flex items-center justify-center text-[#c5a880] text-xl mb-6"
            >
              <i class="fa fa-shield"></i>
            </div>
            <h3 class="font-serif text-xl font-medium text-white mb-3">
              Discreet Executive Security
            </h3>
            <p
              class="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed font-light"
            >
              Protected perimeter, smart electronic keycard locks,
              high-resolution CCTV coverage, and 24-hour vetted security staff.
            </p>
          </div>

          <div
            class="p-5 sm:p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#9B7846]/50 transition-all duration-300"
          >
            <div
              class="w-12 h-12 rounded-xl bg-[#9B7846]/20 border border-[#9B7846]/40 flex items-center justify-center text-[#c5a880] text-xl mb-6"
            >
              <i class="fa fa-utensils"></i>
            </div>
            <h3 class="font-serif text-xl font-medium text-white mb-3">
              Artisan Breakfast & In-Suite Chef
            </h3>
            <p
              class="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed font-light"
            >
              Complimentary fresh morning breakfast options, fully stocked
              espresso & tea bar, and private in-suite chef services upon
              request.
            </p>
          </div>

          <div
            class="p-5 sm:p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#9B7846]/50 transition-all duration-300"
          >
            <div
              class="w-12 h-12 rounded-xl bg-[#9B7846]/20 border border-[#9B7846]/40 flex items-center justify-center text-[#c5a880] text-xl mb-6"
            >
              <i class="fa fa-car"></i>
            </div>
            <h3 class="font-serif text-xl font-medium text-white mb-3">
              Chauffeur & Airport Transport
            </h3>
            <p
              class="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed font-light"
            >
              Stress-free VIP transfers from Nnamdi Azikiwe International
              Airport directly to your suite with executive chauffeur service.
            </p>
          </div>
        </div>

        <div class="mt-14">
          <router-link
            to="/booking"
            class="inline-flex items-center gap-3 bg-[#9B7846] hover:bg-[#856538] text-white px-10 py-4 rounded-full text-xs uppercase tracking-widest font-semibold shadow-2xl transition-all active:scale-95"
          >
            <span>Begin Your Reservation</span>
            <i class="fa fa-calendar-check-o"></i>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, inject } from "vue";
import bed1 from "@/assets/images/rooms/bed1.jpg";
import bed2 from "@/assets/images/rooms/bed2.jpg";
import bed4 from "@/assets/images/rooms/bed4.jpg";
import bed6 from "@/assets/images/rooms/bed6.jpg";
import bed8 from "@/assets/images/rooms/bed8.jpg";
import living1 from "@/assets/images/rooms/living1.jpg";
import living2 from "@/assets/images/rooms/living2.jpg";
import living3 from "@/assets/images/rooms/living3.jpg";
import sitting8 from "@/assets/images/rooms/sitting8.jpg";
import sitting16 from "@/assets/images/rooms/sitting16.jpg";
import kitchen from "@/assets/images/rooms/kitchen.jpg";
import kitchen2 from "@/assets/images/rooms/kitchen2.jpg";

const currencyFormat = inject(
  "currencyFormat",
  (val) => `₦${Number(val || 0).toLocaleString()}`
);

const activeCategory = ref("all");
const categories = [
  { id: "all", name: "All Residences" },
  { id: "room", name: "Luxury Hotel Rooms" },
  { id: "apartment", name: "Serviced Apartments" },
];

const suitesList = ref([
  {
    id: 1,
    category: "room",
    categoryName: "Hotel Room",
    name: "Standard Room",
    roomCode: "Room 101",
    floor: 1,
    price: 65000,
    maxOccupancy: 2,
    bedType: "1 Plush King Bed",
    size: "350 sq ft",
    badge: "Boutique Comfort",
    activeImage: bed1,
    gallery: [bed1, bed2, sitting8],
    description:
      "An intimate, quiet sanctuary designed for solo travelers or couples. Features a master plush king bed, ensuite Italian marble bathroom, smart entertainment, and custom climate control.",
    amenities: [
      "King Size Bed",
      "Ensuite Rain Shower",
      "4K Smart TV",
      "Starlink Wi-Fi",
      "Daily Housekeeping",
      "Work Desk",
      "Digital Safe",
    ],
  },
  {
    id: 2,
    category: "room",
    categoryName: "Executive Suite",
    name: "Executive Suite",
    roomCode: "Suite 201",
    floor: 2,
    price: 95000,
    maxOccupancy: 2,
    bedType: "1 Grand King Bed",
    size: "480 sq ft",
    badge: "Executive Choice",
    activeImage: bed6,
    gallery: [bed6, living1, sitting16],
    description:
      "Expansive luxury designed for business leaders and discerning couples. Includes an integrated executive lounge sitting area, panoramic window view, espresso machine, and deluxe bathroom.",
    amenities: [
      "Grand King Bed",
      "Private Sitting Lounge",
      "Nespresso Machine",
      "Smart 4K HDTV",
      "Starlink Wi-Fi",
      "Luxury Bathrobes",
      "Room Service 24/7",
    ],
  },
  {
    id: 3,
    category: "apartment",
    categoryName: "Serviced Apartment",
    name: "Luxury 1-Bedroom Apartment",
    roomCode: "Apt 301",
    floor: 3,
    price: 135000,
    maxOccupancy: 3,
    bedType: "1 King Bed + Sleeper",
    size: "720 sq ft",
    badge: "Spacious Living",
    activeImage: living2,
    gallery: [living2, bed4, kitchen],
    description:
      "A complete private home offering uncompromising privacy. Features a separate designer living room, gourmet fully fitted kitchen with microwave and refrigerator, and dedicated dining space.",
    amenities: [
      "Private Living Room",
      "Gourmet Kitchen",
      "Full Sized Fridge",
      "Microwave & Oven",
      "Dining Table",
      "Washing Machine",
      "Balcony View",
    ],
  },
  {
    id: 4,
    category: "apartment",
    categoryName: "Serviced Apartment",
    name: "Royal 2-Bedroom Apartment",
    roomCode: "Apt 401",
    floor: 4,
    price: 185000,
    maxOccupancy: 4,
    bedType: "2 Ensuite King Beds",
    size: "1,150 sq ft",
    badge: "Family & Diplomats",
    activeImage: sitting8,
    gallery: [sitting8, bed8, kitchen2, living3],
    description:
      "Sprawling two-bedroom residence featuring two master ensuite bedrooms, an expansive entertainment salon, dining suite for six, modern kitchen, and elevated vistas of Abuja.",
    amenities: [
      "2 Ensuite Master Bedrooms",
      "Spacious Salon",
      "Gourmet Kitchen",
      "6-Seater Dining",
      "Laundry Facilities",
      "High-Speed Wi-Fi",
      "Private Balcony",
    ],
  },
  {
    id: 5,
    category: "apartment",
    categoryName: "Signature Penthouse",
    name: "Presidential Penthouse Suite",
    roomCode: "Penthouse 501",
    floor: 5,
    price: 280000,
    maxOccupancy: 6,
    bedType: "3 Master King Bedrooms",
    size: "1,850 sq ft",
    badge: "Pinnacle of Luxury",
    activeImage: living3,
    gallery: [living3, bed8, kitchen, sitting16],
    description:
      "The absolute crown jewel of Vamble Apartments. Occupies the private penthouse floor with bespoke concierge service, expansive private terrace, private chef access, and luxury finishings throughout.",
    amenities: [
      "Private Penthouse Floor",
      "3 Master Bedrooms",
      "Private Terrace Lounge",
      "Dedicated Butler",
      "Chef's Kitchen",
      "VIP Airport Transfer",
      "Ultimate Privacy",
    ],
  },
]);

const filteredSuites = computed(() => {
  if (activeCategory.value === "all") return suitesList.value;
  return suitesList.value.filter((s) => s.category === activeCategory.value);
});
</script>

<style scoped>
/* Scoped custom styling for smooth interactions */
</style>
