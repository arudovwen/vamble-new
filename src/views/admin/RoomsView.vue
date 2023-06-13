<template>
  <AdminLayout>
    <template #content>
      <RoomsComponent />
    </template>
  </AdminLayout>
</template>
<script setup>
import AdminLayout from "@/components/layouts/adminLayout.vue";
import RoomsComponent from "@/components/admin/RoomsComponent";
</script>
