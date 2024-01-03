<template>
  <div
    class="border-b border-[#a18463]/20 flex flex-col sm:flex-row py-16 sm:py-0 px-6 sm:px-0"
  >
    <div
      class="sm:px-16 sm:py-16 sm:border-r sm:border-[#a18463]/20 sm:w-[38%] text-left lg:flex items-center"
    >
      <h2
        class="text-6xl font-bold max-w-[400px] mb-6 sm:mb-0 zendaya"
        data-aos="fade-up"
        data-aos-once="true"
      >
        A Bit <span class="text-[#2d5c1f]">About Us</span>
      </h2>
    </div>
    <div
      class="sm:px-16 sm:py-16 flex justify-between flex-1 text-left sm:text-right"
    >
      <div class="p-3 grid grid-cols-2 items-center justify-center gap-6">
        <a v-for="i in socials" :key="i.icon" :href="i.url" target="_blank">
          <div
            v-tooltip
            :title="`Visit ${i.title}`"
            class="hover:text-blue-900 flex items-center justify-center"
          >
            <i :class="i.icon" aria-hidden="true"></i> <br />
          </div>
        </a>
      </div>
      <p
        class="text-base sm:text-lg sm:max-w-md ml-auto"
        data-aos="fade-up"
        data-aos-once="true"
      >
        <span class="font-semibold"> Vamble Apartments and Suites</span> Limited
        is a collection of the finest independent
        <span class="font-semibold">Luxury homes</span> in Abuja, Nigeria. Our
        luxury suites are both impressive and flexible. Plush interior design,
        and so much more.
      </p>
    </div>
  </div>
</template>

<script setup>
const socials = [
  {
    title: "@vambleapartments",
    icon: "fab fa-instagram fa-2x",
    url: "https://instagram.com/vambleapartments",
  },
  {
    title: "vambleapartments",
    icon: "fab fa-whatsapp fa-2x",
    url: "https://wa.me/2349064645461",
  },
  {
    title: "@vambleapartments",
    icon: "fab fa-twitter fa-2x",
    url: "https://twitter.com/vambleapartments",
  },
  {
    title: "@vambleapartments",
    icon: "fab fa-facebook fa-2x",
    url: "https://facebook.com/vambleapartments",
  },
];
</script>
