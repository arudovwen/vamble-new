<template>
  <AdminLayout>
    <template #content>
      <UserComponent />
    </template>
  </AdminLayout>
</template>
<script setup>
import AdminLayout from "@/components/layouts/adminLayout.vue";
import UserComponent from "@/components/admin/UserComponent";
</script>
