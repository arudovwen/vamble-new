<template>
  <section class="overflow-hidden relative">
    <div
      v-animate-onscroll.repeat="'kenburns-top'"
      class="flex-1 overflow-hidden bg-[url('@/assets/images/testv.jpeg')] bg-cover bg-center absolute top-0 right-0 w-full h-full"
    ></div>
    <div
      class="px-6 sm:px-8 lg:px-16 py-36 w-full h-full flex justify-center items-center bg-[#3d3126]/80 backdrop-brightness-50"
    >
      <div class="max-w-[650px] mx-auto">
        <h2
          class="text-[#d4dfd1] text-4xl lg:text-6xl font-semibold mb-4 zendaya"
          data-aos="fade-up"
          data-aos-once="true"
        >
          What we are about
        </h2>
        <p
          class="text-white mb-8 lg:text-xl"
          data-aos="fade-up"
          data-aos-once="true"
        >
          We at Vamble Apartments & Suites are dedicated to making your every
          stay a wonderful experience. We offer state of the art facilities,
          world class interiors, comfortable and well furnished rooms. Our aim
          is to provide a home away from home, located in serene and secured
          environment.
        </p>
        <router-link to="/about">
          <button
            type="button"
            class="bg-[#2d5c1f] text-white px-10 py-3 text-[15px] font-medium hover:opacity-80 active:scale-95"
            data-aos="fade-up"
            data-aos-once="true"
          >
            Read more
          </button>
        </router-link>
      </div>
    </div>
  </section>
</template>
