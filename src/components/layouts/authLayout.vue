<template>
  <section
    class="bg-[#f6f3e9] h-screen w-screen flex items-center justify-center bg-[url('@/assets/images/rooms/frontdesk.jpg')] bg-cover bg-center"
  >
    <div class="flex items-center flex-col lg:mt-52 w-full">
      <slot name="content"></slot>
      <router-link to="/" class="mt-6">
        <h1 class="text-white uppercase font-extrabold hover:underline">
          back to home
        </h1></router-link
      >
    </div>
  </section>
</template>
