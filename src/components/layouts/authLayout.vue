<template>
  <section
    class="bg-[#f6f3e9] h-screen w-screen flex items-center justify-center bg-[url('@/assets/images/testv.jpeg')] bg-cover bg-center"
  >
    <div class="flex items-center flex-col">
      <router-link to="/" class="mb-6">
        <img src="@/assets/icon.png" width="100" height="100" alt="logo"
      /></router-link>
      <slot name="content"></slot>
    </div>
  </section>
</template>
