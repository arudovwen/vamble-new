<template>
  <div class="2xl:container relative min-h-screen">
    <!-- Page here -->
    <div
      class="content bg-[#f6f3e9] relative h-full min-h-screen flex flex-col"
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
