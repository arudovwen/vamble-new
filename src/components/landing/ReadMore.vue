<template>
  <section class="overflow-hidden">
    <div
      class="flex-1 overflow-hidden bg-[url('@/assets/images/testv.jpeg')] bg-cover bg-center transition-all duration-1000 hover:scale-105"
    >
      <div
        class="px-6 sm:px-8 lg:px-16 py-36 w-full h-full flex justify-center items-center bg-[#3d3126]/70 backdrop-brightness-50"
      >
        <div class="max-w-[650px] mx-auto">
          <h2
            class="text-white text-4xl lg:text-8xl font-semibold mb-4 zendaya"
            v-animate-onscroll="'fade-in-bottom'"
          >
            What we are about
          </h2>
          <p
            class="text-white mb-8 lg:text-xl"
            v-animate-onscroll="'fade-in-bottom'"
          >
            We at Vamble Apartments & Suites are dedicated to making your every
            stay a wonderful experience. We offer state of the art facilities,
            world class interiors, comfortable and well furnished rooms. Our aim
            is to provide a home away from home, located in serene and secured
            environment.
          </p>
          <button
            type="button"
            v-animate-onscroll="'fade-in-bottom'"
            class="bg-[#2d5c1f] text-white px-10 py-3 text-[15px] font-medium hover:opacity-80 active:scale-95"
          >
            Read more
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
