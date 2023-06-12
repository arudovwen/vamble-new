<template>
  <nav class="bg-transparent absolute w-full top-0 z-[3] h-[85px]">
    <div
      class="flex sm:gap-x-12 justify-between items-center border-b-2 border-[#a18463]/20 px-6 sm:px-8 lg:px-16 py-4 w-[80%] sm:w-[70%] lg:w-[600px]"
    >
      <router-link to="/">
        <img
          src="@/assets/logo.png"
          class="h-[50px] w-36"
          width="80"
          height="50"
          alt="logo"
      /></router-link>
      <ul class="lg:flex gap-x-2 hidden">
        <router-link
          v-for="item in navigations"
          :key="item.title"
          :to="item.url"
        >
          <li
            class="transition-all duration-500 px-2 text-sm text-gray-500 hover:text-gray-700 relative text-center group -mb-1 font-semibold"
          >
            <span class="block"> {{ item.title }}</span>
            <span
              class="block mx-auto w-1 h-1 rounded-full bg-gray-700 opacity-0 group-hover:opacity-100"
            ></span>
          </li>
        </router-link>
      </ul>
    </div>
    <div class="sm:pr-8 xl:pr-16 hidden lg:block">
      <router-link to="/booking">
        <button
          type="button"
          class="text-white/70 px-8 py-3 rounded-sm text-sm uppercase border-2 font-medium border-white/70 hover:border-white hover:text-white active:scale-95"
        >
          book now
        </button>
      </router-link>
    </div>
    <div class="bg-[#f6f3e9] p-1 rounded-sm mr-6 sm:mr-8 lg:hidden">
      <Bars3BottomRightIcon class="w-6 h-6" />
    </div>
  </nav>
</template>
<script setup>
import { Bars3BottomRightIcon } from "@heroicons/vue/24/outline";
const navigations = [
  {
    title: "About",
    url: "/about",
  },
  {
    title: "Services",
    url: "/services",
  },
  {
    title: "Enquiries",
    url: "/enquiries",
  },
];
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .router-link-exact-active li {
    color: #2d5c1f !important;
  }
}
</style>
