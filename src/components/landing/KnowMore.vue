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
          :class="`flex-1 overflow-hidden relative bg-cover bg-center h-full`"
          data-aos="zoom-in"
          data-aos-once="true"
          data-aos-easing="linear"
          data-aos-duration="500"
        >
          <img :src="item.img" class="w-full h-full object-cover" />
          <div
            class="absolute bottom-0 right-0 w-full transition-all ease-in-out duration-500 h-[85px] group-hover:h-full flex justify-start items-start bg-gray-900/60 p-6 md:p-6 font-bold text-center"
          >
            <div>
              <span
                class="mb-6 w-full text-left block border-b pb-2 text-lg xl:text-2xl font-bold text-[#f2f7f0] border-[#d0decd]"
                >{{ item.text }}</span
              >
              <p class="text-[13px] text-white text-left font-normal">
                {{ item.desc }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <p
        class="max-w-lg mb-6 mx-auto text-base sm:text-xl"
        data-aos="fade-up"
        data-aos-once="true"
        data-aos-easing="linear"
        data-aos-duration="500"
      >
        Located in a Serene and Hospitable environment, with 24 hours security
        system, Well equipped and mannered security guards, 24 hours power
        supply as well as uninterrupted internet connection.
      </p>
      <router-link to="/about">
        <button
          type="button"
          data-aos="fade-up"
          data-aos-once="true"
          data-aos-easing="linear"
          data-aos-duration="500"
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
    desc: "Experience the pinnacle of luxury in the World Class Sitting Room. Immerse yourself in opulence and elegance, where every detail exudes sophistication. Relax on plush sofas, indulge in state-of-the-art entertainment, and bask in the exquisite ambiance of this extraordinary space.",
  },
  {
    img: require("@/assets/images/rooms/bed5.jpg"),
    text: "Executive Bedrooms",
    desc: "Experience the epitome of luxury with our executive bedrooms. Immerse yourself in refined elegance, state-of-the-art technology, and a tranquil ambiance. Enjoy exclusive access to our executive lounge and personalized service. Indulge in a haven of opulence during your stay with us.",
  },
  {
    img: require("@/assets/images/rooms/kitchen2.jpg"),
    text: "Fully Equipped Kitchen",
    desc: "Welcome to our fully equipped kitchen, where culinary possibilities are endless! With top-of-the-line appliances, a comprehensive selection of cookware, and ample counter space, you'll have everything you need to unleash your culinary creativity and prepare delicious meals. Happy cooking!",
  },
];
</script>
