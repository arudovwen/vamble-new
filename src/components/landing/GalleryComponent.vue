<template>
  <section class="p-6 sm:p-8 lg:p-16">
    <h2 class="text-5xl lg:text-7xl font-semibold mb-6 text-left zendaya">
      Our <span class="text-[#2d5c1f]">Gallery</span>
    </h2>
    <div
      class="w-full h-[300px] mb-10 grid grid-cols-2 lg:grid-cols-6 mt-16 gap-[2px]"
    >
      <div
        v-for="(item, idx) in content"
        :key="idx"
        :class="`flex-1 overflow-hidden relative bg-cover bg-center group`"
        v-animate-onscroll="'scale-in-center'"
      >
        <img
          :src="item.img"
          class="w-full h-full object-cover group-hover:kenburns-top"
        />
        <div
          class="absolute top-0 right-0 w-full h-full flex justify-center items-center bg-gray-500/20 backdrop-brightness-70"
        ></div>
      </div>
    </div>
  </section>
</template>
<script setup>
const content = [
  {
    img: require("@/assets/images/rooms/sitting7.jpg"),
    text: "",
  },

  {
    img: require("@/assets/images/rooms/sitting9.jpg"),
    text: "",
  },

  {
    img: require("@/assets/images/rooms/bed6.jpg"),
    text: "",
  },
  {
    img: require("@/assets/images/rooms/sitting.jpg"),
    text: "",
  },
  {
    img: require("@/assets/images/rooms/sittingceiling.jpg"),
    text: "",
  },
  {
    img: require("@/assets/images/rooms/sitting12.jpg"),
    text: "",
  },
];
</script>
