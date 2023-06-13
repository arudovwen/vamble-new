<template>
  <AdminLayout>
    <template #content>
      <CouponComponent />
    </template>
  </AdminLayout>
</template>
<script setup>
import AdminLayout from "@/components/layouts/adminLayout.vue";
import CouponComponent from "@/components/admin/CouponComponent";
</script>
