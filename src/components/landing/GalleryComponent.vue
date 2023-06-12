<template>
  <section class="p-6 sm:p-8 lg:p-16">
    <h2
      class="text-5xl lg:text-7xl font-semibold mb-6 text-left zendaya text-shadow-drop-center"
    >
      Our Gallery
    </h2>
    <div class="w-full h-[500px] mb-10 grid grid-cols-2 lg:grid-cols-6 mt-16">
      <div
        v-for="(item, idx) in content"
        :key="idx"
        class="flex-1 overflow-hidden bg-cover bg-center"
        v-animate-onscroll="'scale-in-center'"
      >
        <div
          class="w-full h-full flex justify-center items-center bg-gray-500/20 backdrop-brightness-50"
        ></div>
      </div>
    </div>
  </section>
</template>
<script setup>
const content = [
  {
    img: "",
    text: "",
  },
  {
    img: "",
    text: "",
  },
  {
    img: "",
    text: "",
  },
  {
    img: "",
    text: "",
  },
  {
    img: "",
    text: "",
  },
  {
    img: "",
    text: "",
  },
];
</script>
