<template>
  <AdminLayout>
    <template #content>
      <DashboardComponent />
    </template>
  </AdminLayout>
</template>
<script setup>
import AdminLayout from "@/components/layouts/adminLayout.vue";
import DashboardComponent from "@/components/admin/DashboardComponent";
</script>
