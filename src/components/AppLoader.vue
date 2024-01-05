<template>
  <div class="loader-container">
    <div
      class="loader border-t-8 border-[#2d5c1f] border-solid rounded-full h-16 w-16 animate-spin"
    ></div>
  </div>
</template>

<style scoped>
.loader-container {
  @apply flex items-center justify-center h-[300px];
}

.loader {
  @apply border-t-8 border-[#2d5c1f] border-solid rounded-full h-16 w-16 animate-spin;
}
</style>
