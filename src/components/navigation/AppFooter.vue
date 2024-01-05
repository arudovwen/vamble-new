<template>
  <footer>
    <div
      class="flex-1 overflow-hidden bg-[url('@/assets/images/rooms/nigh.jpg')] bg-cover bg-center"
    >
      <div
        class="pt-10 w-full h-full flex justify-center items-center bg-black/90"
      >
        <div class="w-full">
          <router-link to="/" class="mx-auto">
            <img
              src="@/assets/logo.png"
              class="h-auto w-32 mx-auto mb-10"
              width="80"
              height="auto"
              alt="logo"
          /></router-link>
          <p class="text-white mb-1 text-sm">+2349064645461</p>
          <p class="text-white mb-1 text-sm">
            Plot 790, sector center, Cadastral zone. Jahi. Abuja
          </p>
          <p class="text-white mb-4 text-sm">
            reservation@vambleapartments.com
          </p>
          <div class="border-b border-t w-full mb-8">
            <ul
              class="flex gap-x-4 items-center py-2 max-w-[600px] mx-auto justify-center"
            >
              <router-link
                v-for="item in navigations"
                :key="item.title"
                :to="item.url"
              >
                <li class="text-xs sm:text-[13px] text-white">
                  {{ item.title }}
                </li>
              </router-link>
            </ul>
          </div>
          <p class="text-sm text-white mb-8">
            © Vamble Apartments & Suite ltd {{ new Date().getFullYear() }}
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
<script setup>
const navigations = [
  {
    title: "Home",
    url: "/",
  },

  {
    title: "About",
    url: "/about",
  },

  {
    title: "Services",
    url: "/services",
  },
  {
    title: "Bookings",
    url: "/bookings",
  },
  {
    title: "Rooms",
    url: "/rooms",
  },

  {
    title: "enquiry",
    url: "/enquiry",
  },
];
</script>
