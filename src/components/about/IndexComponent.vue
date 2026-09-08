<template>
  <section class="relative border-b border-[#9B7846]/20 pb-10 bg-[#FAF8F5] text-[#1A1816] font-sans">
    <!-- Hero Header Banner -->
    <div class="flex flex-col md:flex-row z-[2] w-full border-b border-[#9B7846]/20 bg-white">
      <div
        class="w-full md:w-[60%] lg:w-[600px] pt-28 sm:pt-36 lg:pt-40 pb-10 text-left px-5 sm:px-8 lg:px-16 flex flex-col justify-center"
      >
        <div class="space-y-3">
          <span class="text-xs uppercase tracking-widest font-semibold text-[#9B7846] block">
            The Philosophy of Hospitality
          </span>
          <h1 class="text-[#243821] font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-tight">
            About Vamble <br class="hidden sm:inline" />
            <span class="italic text-[#9B7846]">Apartments & Suites</span>
          </h1>
          <p class="text-xs sm:text-sm text-gray-600 leading-relaxed font-light pt-2 max-w-md">
            Abuja's sanctuary for discerning executives, extended business stays, and serene weekend getaways in Jahi.
          </p>
        </div>
      </div>

      <div
        class="h-64 md:h-auto flex-1 overflow-hidden bg-[url('@/assets/images/rooms/sitting7.jpg')] bg-cover bg-center min-h-[220px]"
      >
        <div
          class="w-full h-full flex justify-center items-center bg-black/30 backdrop-brightness-75"
        ></div>
      </div>
    </div>

    <!-- Our Story Section -->
    <div class="flex flex-col md:flex-row bg-white border-b border-[#9B7846]/20">
      <div class="w-full md:w-1/2 p-6 sm:p-10 lg:p-16 text-left space-y-4">
        <span class="text-xs uppercase tracking-widest font-semibold text-[#9B7846] block">
          Heritage & Mission
        </span>
        <h2 class="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1816]">
          Our Story
        </h2>
        <p class="text-sm sm:text-base text-gray-700 leading-relaxed font-light">
          Vamble Apartments & Suites Limited is an exclusive lodging residence crafted to provide the calm privacy of an intimate home with the seamless service of a luxury hotel.
        </p>
        <p class="text-sm sm:text-base text-gray-700 leading-relaxed font-light">
          Our Standard, Executive, and Platinum Residences are fully furnished with bespoke sitting lounges, fully equipped kitchens, and sound-insulated bedrooms to ensure complete tranquility during your time in the Federal Capital Territory.
        </p>
      </div>

      <div class="w-full md:w-1/2 p-8 sm:p-12 flex items-center justify-center bg-[#FAF8F5] border-t md:border-t-0 md:border-l border-[#9B7846]/20">
        <div class="text-center space-y-2">
          <i class="fa fa-quote-left text-2xl text-[#9B7846]/40"></i>
          <span
            class="block text-[#243821] font-serif text-2xl sm:text-3xl lg:text-4xl max-w-[450px] mx-auto font-medium italic"
          >
            "A Home Away from Home. Redefined in Abuja."
          </span>
          <span class="text-xs uppercase tracking-widest text-[#9B7846] font-semibold block pt-2">
            The Vamble Promise
          </span>
        </div>
      </div>
    </div>

    <!-- Location & Map Section -->
    <div class="flex flex-col-reverse md:flex-row bg-white">
      <div class="w-full md:w-1/2 min-h-[300px] sm:min-h-[400px]">
        <iframe
          title="Vamble Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.5105067473924!2d7.447596600000001!3d9.1082761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0bfbbbded751%3A0x573b19a3d21334d7!2sVamble%20Apartments%20and%20Suites%2C%20Jahi%2C%20Abuja!5e0!3m2!1sen!2sng!4v1686597784390!5m2!1sen!2sng"
          class="w-full h-full min-h-[300px] sm:min-h-[400px] border-0"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <div
        class="w-full md:w-1/2 p-6 sm:p-10 lg:p-16 md:border-l border-[#9B7846]/20 text-left space-y-4"
      >
        <span class="text-xs uppercase tracking-widest font-semibold text-[#9B7846] block">
          Prime Enclave
        </span>
        <h2 class="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1816]">
          Our Location
        </h2>
        <p class="text-sm sm:text-base text-gray-700 leading-relaxed font-light">
          Situated at
          <a
            class="text-[#243821] font-semibold hover:underline"
            href="https://goo.gl/maps/myfbJDfZEmgXgBpJ6"
            target="_blank"
            rel="noopener"
          >
            Plot 790, Sector Centre, Cadastral Zone B08, Jahi, Abuja
          </a>,
          our enclave offers quiet, tree-lined streets with multi-tiered gate access while remaining just minutes from Jabi Lake and central embassies.
        </p>

        <div class="grid grid-cols-2 gap-3 pt-4 text-xs font-medium text-gray-700">
          <div class="flex items-center gap-2 p-3 rounded-xl bg-[#FAF8F5] border border-gray-100">
            <i class="fa fa-shield-alt text-[#9B7846]"></i>
            <span>24/7 Security</span>
          </div>
          <div class="flex items-center gap-2 p-3 rounded-xl bg-[#FAF8F5] border border-gray-100">
            <i class="fa fa-bolt text-[#9B7846]"></i>
            <span>24/7 Power</span>
          </div>
          <div class="flex items-center gap-2 p-3 rounded-xl bg-[#FAF8F5] border border-gray-100">
            <i class="fa fa-wifi text-[#9B7846]"></i>
            <span>Starlink Fiber</span>
          </div>
          <div class="flex items-center gap-2 p-3 rounded-xl bg-[#FAF8F5] border border-gray-100">
            <i class="fa fa-car text-[#9B7846]"></i>
            <span>Secure Parking</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup></script>
