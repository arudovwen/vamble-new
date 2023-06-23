<template>
  <section
    class="px-6 sm:px-8 xl:px-16 py-20 border-b border-[#a18463]/20 text-center"
  >
    <div
      class="w-full h-[600px] md:h-[300px] mb-10 grid md:grid-cols-3 gap-[2px]"
    >
      <div
        v-for="(item, idx) in content"
        :key="idx"
        class="group h-full overflow-hidden"
      >
        <div
          :class="`flex-1 overflow-hidden relative bg-cover bg-center transition-all duration-1000 hover:scale-105 h-full`"
          v-animate-onscroll="'scale-in-center'"
        >
          <img :src="item.img" class="w-full h-full object-cover" />
          <div
            class="absolute top-0 right-0 w-full h-full flex justify-start items-end bg-gray-900/50 p-6 md:p-8 font-bold text-center"
          >
            <span
              class="text-3xl xl:text-4xl fomt-bold text-[#ecf7e9] zendaya"
              >{{ item.text }}</span
            >
          </div>
        </div>
      </div>
    </div>

    <div>
      <p
        class="max-w-lg mb-6 mx-auto text-base sm:text-xl"
        v-animate-onscroll="'fade-in-bottom'"
      >
        Located in a Serene and Hospitable environment, with 24 hours security
        system, Well equipped and mannered security guards, 24 hours power
        supply as well as uninterrupted internet connection.
      </p>
      <router-link to="/about">
        <button
          type="button"
          v-animate-onscroll="'fade-in-bottom'"
          class="bg-[#2d5c1f]/90 text-white px-10 font-medium hover:opacity-80 active:scale-95 py-3 text-sm sm:text-base"
        >
          Know more
        </button>
      </router-link>
    </div>
  </section>
</template>
<script setup>
const content = [
  {
    img: require("@/assets/images/rooms/sitting13.jpg"),
    text: "World Class Sitting Room",
  },
  {
    img: require("@/assets/images/rooms/bed5.jpg"),
    text: "Executive Bedrooms",
  },
  {
    img: require("@/assets/images/rooms/kitchen2.jpg"),
    text: "Fully Equipped Kitchen",
  },
];
</script>
