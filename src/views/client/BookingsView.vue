<template>
  <DefaultLayout>
    <template #content>
      <IndexComponent />
    </template>
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from "@/components/layouts/defaultLayout.vue";
import IndexComponent from "@/components/bookings/IndexComponent.vue";
</script>
