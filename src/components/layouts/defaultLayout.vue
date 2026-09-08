<template>
  <div
    class="max-w-[1536px] mx-auto relative min-h-screen border-l border-r border-[#9B7846]/15 bg-[#FAF8F5] shadow-sm font-sans"
  >
    <!-- Page here -->
    <div
      class="content bg-[#FAF8F5] relative h-full min-h-screen flex flex-col text-[#1A1816]"
    >
      <!-- Navigation here  -->
      <AppHeader />
      <slot name="content"></slot>
      <AppFooter />
    </div>
    <!-- scroll to top component  -->
    <ScrollToTop />
  </div>
</template>

<script setup>
import AppHeader from "../navigation/AppHeader.vue";
import AppFooter from "../navigation/AppFooter.vue";
import ScrollToTop from "../scrollToTop.vue";
</script>
