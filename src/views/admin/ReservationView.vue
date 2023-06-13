<template>
  <AdminLayout>
    <template #content>
      <ReservationComponent />
    </template>
  </AdminLayout>
</template>
<script setup>
import AdminLayout from "@/components/layouts/adminLayout.vue";
import ReservationComponent from "@/components/admin/ReservationComponent";
</script>
