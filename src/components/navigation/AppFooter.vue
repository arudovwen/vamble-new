<template>
  <footer>
    <div class="flex-1 overflow-hidden bg-cover bg-center">
      <div
        class="pt-10 w-full h-full flex justify-center items-center bg-[#3d3126]/80 backdrop-brightness-50"
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
          <p class="text-white mb-4 text-sm">enquiry@vambleapartments.com</p>
          <div class="border-b border-t w-full mb-8">
            <ul
              class="flex gap-x-4 items-center py-2 max-w-[600px] mx-auto justify-center"
            >
              <li
                class="px-2 p-1 text-[13px] text-white"
                v-for="item in navigations"
                :key="item.title"
              >
                {{ item.title }}
              </li>
            </ul>
          </div>
          <p class="text-sm text-white mb-8">
            © Vamble Apartments & Suite ltd 2023
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
    url: "/",
  },

  {
    title: "Services",
    url: "/",
  },

  {
    title: "Enquiries",
    url: "/",
  },
];
</script>
