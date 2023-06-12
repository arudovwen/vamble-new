<template>
  <section class="relative pb-16">
    <div class="flex z-[2] w-full border-b border-[#a18463]/20 mb-10 sm:mb-20">
      <div
        class="w-[80%] sm:w-[70%] lg:w-[600px] pt-40 pb-10 text-left px-6 sm:px-8 lg:px-16"
      >
        <div class="mb-4">
          <h1
            class="text-[#2d5c1f] mb-3 lg:mb-6 zendaya text-shadow-drop-center text-5xl xl:text-7xl font-bold"
          >
            Reserve your stay
          </h1>
          <p class="text-base xl:text-2xl text-left">
            You don't need to be physically present before you book an apartment
            with us, just use our booking engine to reserve your stay with ease
            today.
          </p>
        </div>
      </div>

      <div
        class="flex-1 overflow-hidden bg-[url('@/assets/images/testv.jpeg')] bg-cover bg-center"
      >
        <div
          class="w-full h-full flex justify-start items-center bg-gray-500/20 backdrop-brightness-50"
        ></div>
      </div>
    </div>
    <div
      class="w-full lg:w-[800px] lg:border border-[#a18463]/20 p-6 sm:p-8 mx-auto rounded-lg mb-10"
    >
      <h2
        class="text-4xl sm:text-5xl lg:text-6xl font-semibold mb-6 text-left zendaya text-shadow-drop-center"
      >
        Feel free to write to us
      </h2>

      <form>
        <div class="text-left mb-6">
          <label class="block mb-2 text-xs">Full name</label>
          <input
            class="border px-3 py-3 rounded-lg w-full"
            placeholder="Provide your full name"
          />
        </div>
        <div class="text-left mb-6">
          <label class="block mb-2 text-xs">E-mail</label>
          <input
            class="border px-3 py-3 rounded-lg w-full"
            placeholder="Provide your email address"
          />
        </div>
        <div class="text-left mb-6">
          <label class="block mb-2 text-xs">Message</label>
          <textarea
            rows="4"
            class="border px-3 py-3 rounded-lg w-full"
            placeholder="Provide your full name"
          ></textarea>
        </div>
        <div>
          <button
            type="button"
            class="gap-x-1 bg-[#2d5c1f] text-white px-10 w-full font-medium hover:opacity-80 rounded-lg active:scale-95 py-3 text-sm sm:text-base"
          >
            Send message
          </button>
        </div>
      </form>
    </div>
  </section>
</template>
<script setup></script>
