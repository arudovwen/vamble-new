<template>
  <AdminLayout>
    <template #content>
      <TransactionComponent />
    </template>
  </AdminLayout>
</template>
<script setup>
import AdminLayout from "@/components/layouts/adminLayout.vue";
import TransactionComponent from "@/components/admin/TransactionComponent";
</script>
