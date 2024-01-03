<template>
  <main class="bg-[#f6f3e9]">
    <router-view />
  </main>
</template>

<script setup>
import { onMounted } from "vue";
import AOS from "aos";
import "aos/dist/aos.css";

onMounted(() => {
  AOS.init();
});
</script>
<style lang="scss" scoped>
#app {
  font-family: "Playfair Display", serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.zendaya {
  font-family: "Zeyada", cursive;
}
</style>
