<template>
  <section class="relative h-screen flex adminbody">
    <aside class="w-[240px] h-full bg-[#f6f3e9]"><AdminSideBar /></aside>
    <main class="flex-1 h-full overflow-auto flex flex-col bg-gray-50">
      <div class="h-[70px] px-8 border-b"><AdminTopBar /></div>
      <div class="flex-1 px-8 py-8">
        <slot name="content"></slot>
      </div>
    </main>
  </section>
</template>
<script setup>
import AdminSideBar from "../navigation/AdminSideBar.vue";
import AdminTopBar from "../navigation/AdminTopBar.vue";
</script>
