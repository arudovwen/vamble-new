<template>
  <footer
    class="bg-[#1A1816] text-[#FAF8F5] border-t border-[#9B7846]/20 mt-auto"
  >
    <!-- Main Footer Content -->
    <div class="max-w-[1440px] mx-auto px-4 sm:px-10 lg:px-16 py-12 sm:py-16 lg:py-20">
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8"
      >
        <!-- Brand / Intro Column -->
        <div class="lg:col-span-4 space-y-6">
          <router-link to="/" class="inline-block">
            <img
              src="@/assets/logo.png"
              class="h-12 w-auto brightness-0 invert"
              alt="Vamble Apartments & Suites"
              width="140"
              height="48"
            />
          </router-link>
          <p class="text-sm text-gray-300 leading-relaxed max-w-sm">
            Vamble Apartments & Suites is Abuja's premier destination for
            refined hospitality. Offering serene, private luxury suites and
            world-class serviced living in the tranquil heart of Jahi.
          </p>
          <div class="flex items-center gap-3 pt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener"
              class="w-9 h-9 rounded-full bg-white/10 hover:bg-[#9B7846] flex items-center justify-center text-white transition-colors"
              aria-label="Instagram"
            >
              <i class="fa fa-instagram text-sm"></i>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener"
              class="w-9 h-9 rounded-full bg-white/10 hover:bg-[#9B7846] flex items-center justify-center text-white transition-colors"
              aria-label="Facebook"
            >
              <i class="fa fa-facebook text-sm"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener"
              class="w-9 h-9 rounded-full bg-white/10 hover:bg-[#9B7846] flex items-center justify-center text-white transition-colors"
              aria-label="Twitter"
            >
              <i class="fa fa-twitter text-sm"></i>
            </a>
            <a
              href="https://wa.me/2349064645461"
              target="_blank"
              rel="noopener"
              class="w-9 h-9 rounded-full bg-white/10 hover:bg-[#243821] flex items-center justify-center text-white transition-colors"
              aria-label="WhatsApp"
            >
              <i class="fa fa-whatsapp text-sm"></i>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="lg:col-span-3 space-y-4">
          <h4
            class="text-xs uppercase tracking-widest font-semibold text-[#9B7846]"
          >
            Explore
          </h4>
          <ul class="space-y-2.5 text-sm text-gray-300">
            <li>
              <router-link to="/" class="hover:text-white transition-colors"
                >Home</router-link
              >
            </li>
            <li>
              <router-link
                to="/about"
                class="hover:text-white transition-colors"
                >About Us</router-link
              >
            </li>
            <li>
              <router-link
                to="/rooms"
                class="hover:text-white transition-colors"
                >Suites & Apartments</router-link
              >
            </li>
            <li>
              <router-link
                to="/services"
                class="hover:text-white transition-colors"
                >Amenities & Services</router-link
              >
            </li>
            <li>
              <router-link
                to="/#gallery"
                class="hover:text-white transition-colors"
                >Photo Gallery</router-link
              >
            </li>
            <li>
              <router-link
                to="/bookings"
                class="hover:text-white transition-colors"
                >Manage Reservations</router-link
              >
            </li>
          </ul>
        </div>

        <!-- Contact Information -->
        <div class="lg:col-span-5 space-y-4">
          <h4
            class="text-xs uppercase tracking-widest font-semibold text-[#9B7846]"
          >
            Concierge & Location
          </h4>
          <ul class="space-y-3.5 text-sm text-gray-300">
            <li class="flex items-start gap-3">
              <i class="fa fa-map-marker text-[#9B7846] mt-1 text-base"></i>
              <span
                >Plot 790, Sector Centre, Cadastral Zone B08, Jahi, Abuja, FCT,
                Nigeria</span
              >
            </li>
            <li class="flex items-center gap-3">
              <i class="fa fa-phone text-[#9B7846] text-base"></i>
              <a
                href="tel:+2349064645461"
                class="hover:text-white transition-colors"
                >+234 906 464 5461</a
              >
            </li>
            <li class="flex items-center gap-3">
              <i class="fa fa-envelope text-[#9B7846] text-base"></i>
              <a
                href="mailto:reservation@vambleapartments.com"
                class="hover:text-white transition-colors"
                >reservation@vambleapartments.com</a
              >
            </li>
            <li class="flex items-center gap-3">
              <i class="fa fa-clock-o text-[#9B7846] text-base"></i>
              <span>Check-in: 2:00 PM &nbsp;|&nbsp; Check-out: 12:00 PM</span>
            </li>
          </ul>

          <div class="pt-2">
            <router-link to="/booking">
              <button
                type="button"
                class="bg-[#9B7846] hover:bg-[#B9945F] text-white px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold shadow-md active:scale-95 transition-all"
              >
                Direct Online Reservation
              </button>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div
        class="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4"
      >
        <p>
          © {{ new Date().getFullYear() }} Vamble Apartments & Suites Ltd. All
          rights reserved.
        </p>
        <div class="flex items-center gap-6">
          <router-link to="/about" class="hover:text-white transition-colors"
            >Privacy Policy</router-link
          >
          <router-link to="/about" class="hover:text-white transition-colors"
            >Terms & Conditions</router-link
          >
          <router-link to="/enquiry" class="hover:text-white transition-colors"
            >Concierge Desk</router-link
          >
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Navigation state handled with standard router links
</script>
