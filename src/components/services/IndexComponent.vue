<template>
  <div class="bg-[#FAF8F5] text-[#1A1816] min-h-screen">
    <!-- Hero Banner -->
    <section
      class="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#132212] text-white"
    >
      <div class="absolute inset-0 z-0 opacity-25 mix-blend-overlay">
        <img
          src="@/assets/images/rooms/sittingceiling.jpg"
          alt="Vamble Hospitality Services"
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
          <i class="fa fa-gem text-xs"></i>
          <span>Bespoke Hospitality</span>
        </div>

        <h1
          class="font-serif text-3xl sm:text-5xl lg:text-7xl font-normal tracking-tight text-white mb-4 sm:mb-6 max-w-4xl mx-auto leading-tight"
        >
          Every Need Anticipated.
          <span class="italic text-[#c5a880]">Every Expectation</span>
          Surpassed.
        </h1>

        <p
          class="font-sans text-sm sm:text-lg lg:text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed mb-8 sm:mb-10"
        >
          At Vamble Apartments & Suites, our hospitality philosophy blends the
          discreet privacy of a private residence with the attentive white-glove
          service of a luxury hotel.
        </p>

        <div class="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 max-w-xs sm:max-w-none mx-auto w-full">
          <router-link
            to="/booking"
            class="w-full sm:w-auto bg-[#9B7846] hover:bg-[#856538] text-white px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold shadow-xl transition-all active:scale-95 text-center"
          >
            Book Your Stay
          </router-link>
          <router-link
            to="/enquiry"
            class="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all text-center"
          >
            Special Requests
          </router-link>
        </div>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="py-14 sm:py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
      <div class="text-center max-w-3xl mx-auto mb-16 md:mb-24">
        <span
          class="text-xs uppercase tracking-widest font-bold text-[#9B7846] block mb-3"
        >
          Comprehensive Amenities
        </span>
        <h2
          class="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1816] font-normal mb-6"
        >
          Designed for Your Ultimate Peace of Mind
        </h2>
        <p
          class="font-sans text-gray-600 text-base sm:text-lg leading-relaxed font-light"
        >
          Whether you are in Abuja for an extended diplomatic mission, business
          conference, or relaxing weekend retreat, our world-class amenities
          ensure flawless comfort.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="service in services"
          :key="service.title"
          class="bg-white rounded-3xl overflow-hidden border border-[#9B7846]/20 shadow-[0_4px_25px_rgb(0,0,0,0.04)] hover:shadow-2xl hover:border-[#9B7846]/50 transition-all duration-500 flex flex-col group"
        >
          <!-- Image Header -->
          <div class="relative h-56 overflow-hidden bg-neutral-900">
            <img
              :src="service.image"
              :alt="service.title"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
            ></div>
            <div
              class="absolute bottom-4 left-5 right-5 flex items-center justify-between"
            >
              <div
                class="w-11 h-11 rounded-full bg-[#9B7846] text-white flex items-center justify-center shadow-lg"
              >
                <i :class="service.icon" class="text-base"></i>
              </div>
              <span
                class="text-[11px] uppercase tracking-wider font-semibold text-white/90 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20"
              >
                {{ service.badge }}
              </span>
            </div>
          </div>

          <!-- Content -->
          <div class="p-5 sm:p-8 flex-1 flex flex-col justify-between text-left">
            <div>
              <h3
                class="font-serif text-xl sm:text-2xl text-[#1A1816] font-medium mb-3 group-hover:text-[#243821] transition-colors"
              >
                {{ service.title }}
              </h3>
              <p
                class="font-sans text-gray-600 text-xs sm:text-sm leading-relaxed mb-6 font-light"
              >
                {{ service.description }}
              </p>

              <!-- Inclusions List -->
              <ul class="space-y-2.5 mb-6 text-xs text-gray-700">
                <li
                  v-for="feature in service.features"
                  :key="feature"
                  class="flex items-start gap-2.5"
                >
                  <i
                    class="fa fa-check-circle text-[#9B7846] mt-0.5 shrink-0"
                  ></i>
                  <span class="leading-snug">{{ feature }}</span>
                </li>
              </ul>
            </div>

            <div
              class="pt-4 border-t border-gray-100 flex items-center justify-between"
            >
              <span
                class="text-xs font-semibold text-[#243821] uppercase tracking-wider"
              >
                Included with your stay
              </span>
              <router-link
                to="/booking"
                class="text-xs font-bold text-[#9B7846] hover:text-[#243821] transition-colors flex items-center gap-1.5"
              >
                <span>Reserve</span>
                <i class="fa fa-angle-right"></i>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- The Vamble Commitments -->
    <section class="py-14 sm:py-20 bg-[#132212] text-white relative overflow-hidden">
      <div
        class="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 text-center relative z-10"
      >
        <span
          class="text-xs uppercase tracking-widest font-semibold text-[#c5a880] block mb-3"
        >
          Our Guarantee to You
        </span>
        <h2
          class="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white mb-6"
        >
          The Four Pillars of Vamble Suites
        </h2>
        <p
          class="font-sans text-white/80 text-sm sm:text-lg max-w-2xl mx-auto mb-12 sm:mb-16 font-light"
        >
          We do not compromise on reliability, safety, or guest comfort. Every
          aspect of our infrastructure has been engineered for continuous
          performance.
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-left">
          <div
            class="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
          >
            <span
              class="font-serif text-4xl font-light text-[#c5a880] block mb-3"
              >100%</span
            >
            <h4 class="font-serif text-lg font-medium text-white mb-2">
              Power Reliability
            </h4>
            <p
              class="font-sans text-xs text-gray-300 font-light leading-relaxed"
            >
              Automated dual Caterpillar generators and clean battery backup
              guarantee no blackouts ever disrupt your stay.
            </p>
          </div>

          <div
            class="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
          >
            <span
              class="font-serif text-4xl font-light text-[#c5a880] block mb-3"
              >24/7</span
            >
            <h4 class="font-serif text-lg font-medium text-white mb-2">
              Executive Security
            </h4>
            <p
              class="font-sans text-xs text-gray-300 font-light leading-relaxed"
            >
              Monitored CCTV systems, guarded perimeter gates, smart digital
              locks, and discrete security personnel on site.
            </p>
          </div>

          <div
            class="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
          >
            <span
              class="font-serif text-4xl font-light text-[#c5a880] block mb-3"
              >&lt; 5m</span
            >
            <h4 class="font-serif text-lg font-medium text-white mb-2">
              Concierge Response
            </h4>
            <p
              class="font-sans text-xs text-gray-300 font-light leading-relaxed"
            >
              Need fresh towels, in-suite dining, or local transport? Our
              dedicated concierge team responds within minutes.
            </p>
          </div>

          <div
            class="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
          >
            <span
              class="font-serif text-4xl font-light text-[#c5a880] block mb-3"
              >100%</span
            >
            <h4 class="font-serif text-lg font-medium text-white mb-2">
              Discretion & Privacy
            </h4>
            <p
              class="font-sans text-xs text-gray-300 font-light leading-relaxed"
            >
              Total confidentiality for visiting executives, VIPs, and families
              seeking a calm sanctuary away from bustling crowds.
            </p>
          </div>
        </div>

        <!-- Banner CTA -->
        <div
          class="mt-12 sm:mt-16 bg-[#9B7846]/20 border border-[#9B7846]/40 rounded-3xl p-6 sm:p-12 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left"
        >
          <div>
            <h3
              class="font-serif text-2xl sm:text-3xl font-normal text-white mb-2"
            >
              Ready to experience tranquil luxury?
            </h3>
            <p class="font-sans text-sm text-gray-300 font-light">
              Book online in just a few minutes with instant digital
              confirmation.
            </p>
          </div>
          <router-link
            to="/booking"
            class="w-full sm:w-auto bg-[#c5a880] hover:bg-white text-[#132212] px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-bold shadow-2xl transition-all active:scale-95 whitespace-nowrap text-center"
          >
            Reserve Your Room
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import frontdesk from "@/assets/images/rooms/frontdesk.jpg";
import building8 from "@/assets/images/rooms/building8.jpg";
import kitchen from "@/assets/images/rooms/kitchen.jpg";
import sitting14 from "@/assets/images/rooms/sitting14.jpg";
import sittingceiling from "@/assets/images/rooms/sittingceiling.jpg";
import stairs from "@/assets/images/rooms/stairs.jpg";

const services = ref([
  {
    title: "Executive Security & 24/7 Protection",
    badge: "Maximum Safety",
    icon: "fa fa-shield-alt",
    image: building8,
    description:
      "Located in a serene and secure enclave of Jahi, Abuja, with multi-layer perimeter protection and constant surveillance.",
    features: [
      "High-definition CCTV coverage across all public spaces",
      "Vetted 24/7 security personnel and perimeter gate guards",
      "Smart digital electronic door access for each residence",
      "Private VIP security escorts available upon advance request",
    ],
  },
  {
    title: "Uninterrupted 24/7 Clean Power & Fiber",
    badge: "100% Uptime",
    icon: "fa fa-bolt",
    image: sittingceiling,
    description:
      "Dual industrial standby generators paired with automated inverters ensure completely uninterrupted electricity and high-speed Wi-Fi.",
    features: [
      "Dual soundproof Caterpillar backup generators",
      "Seamless automated switchover with zero outage delay",
      "Ultra-fast low-latency Starlink fiber Wi-Fi in every suite",
      "Dedicated workstations with international multi-plug adapters",
    ],
  },
  {
    title: "Gourmet Kitchens & In-Suite Culinary",
    badge: "Fine Dining",
    icon: "fa fa-utensils",
    image: kitchen,
    description:
      "Prepare home-cooked meals in your fully equipped designer kitchen, or enjoy our in-suite room service and private chef experiences.",
    features: [
      "Fully appointed kitchens with microwave, oven & cookware",
      "Full-sized refrigerator and modern cabinetry",
      "Complimentary artisan morning tea and espresso station",
      "Private personal chef on demand for intimate dinners",
    ],
  },
  {
    title: "Bespoke Housekeeping & Valet Laundry",
    badge: "Pristine Care",
    icon: "fa fa-tshirt",
    image: sitting14,
    description:
      "Our dedicated housekeeping team maintains every suite in immaculate condition with five-star standard sanitation and linen changes.",
    features: [
      "Daily comprehensive housekeeping and turndown service",
      "Premium 400-thread-count Egyptian cotton linens",
      "Same-day laundry, dry cleaning, and garment pressing",
      "Eco-friendly organic luxury bathroom amenities",
    ],
  },
  {
    title: "VIP Airport Chauffeur & City Transport",
    badge: "Executive Transit",
    icon: "fa fa-car",
    image: frontdesk,
    description:
      "Enjoy stress-free transportation from Nnamdi Azikiwe International Airport directly to Vamble Suites in executive comfort.",
    features: [
      "Airport meet-and-greet service by professional chauffeurs",
      "Fleet of pristine air-conditioned SUVs and executive sedans",
      "Dedicated full-day or half-day city escort booking",
      "Reliable luggage assistance from arrival to departure",
    ],
  },
  {
    title: "24/7 Front Desk & Concierge Support",
    badge: "Round-the-Clock",
    icon: "fa fa-concierge-bell",
    image: stairs,
    description:
      "Our multilingual concierge team is on call 24 hours a day to handle any request, reservation, or local guidance with warmth.",
    features: [
      "Express contact-free check-in and check-out service",
      "Pre-arrival grocery and beverage stocking in your suite",
      "Abuja restaurant and cultural excursion reservations",
      "Dedicated luggage storage and parcel reception",
    ],
  },
]);
</script>

<style scoped>
/* Scoped styles */
</style>
