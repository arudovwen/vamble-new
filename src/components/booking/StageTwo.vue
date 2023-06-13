<template>
  <div>
    <div class="grid lg:grid-cols-2 gap-x-8">
      <div class="text-left mb-6">
        <label class="block mb-2 text-xs">Full name</label>
        <input
          v-model="formData.fullName"
          class="border px-3 py-3 rounded-lg w-full outline-none focus:border-[#2c3e50]/20"
          placeholder="Provide your full name"
        />
      </div>
      <div class="text-left mb-6">
        <label class="block mb-2 text-xs">E-mail</label>
        <input
          v-model="formData.email"
          type="email"
          class="border px-3 py-3 rounded-lg w-full outline-none focus:border-[#2c3e50]/20"
          placeholder="Provide your email"
        />
      </div>
    </div>
    <div class="grid lg:grid-cols-3 gap-x-8">
      <div class="text-left mb-6">
        <label class="block mb-2 text-xs">Phone number</label>
        <input
          v-model="formData.phone"
          class="border px-3 py-3 rounded-lg w-full outline-none focus:border-[#2c3e50]/20"
          placeholder="Provide your phone number"
        />
      </div>
      <div class="text-left mb-6">
        <label class="block mb-2 text-xs">Gender</label>
        <select
          v-model="formData.gender"
          class="border px-3 py-3 rounded-lg w-full outline-none focus:border-[#2c3e50]/20 capitalize"
        >
          <option value="" disabled>Choose your gender</option>
          <option v-for="cat in category" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>
      </div>
      <div class="text-left mb-6">
        <label class="block mb-2 text-xs">Nationality</label>

        <input
          v-model="formData.nationality"
          class="border px-3 py-3 rounded-lg w-full outline-none focus:border-[#2c3e50]/20"
          placeholder="Provide your nationality"
        />
      </div>
    </div>
    <div class="grid grid-cols-1 gap-x-8">
      <div class="text-left mb-6">
        <label class="block mb-2 text-xs">Residential address</label>
        <input
          v-model="formData.address"
          class="border px-3 py-3 rounded-lg w-full outline-none focus:border-[#2c3e50]/20"
          placeholder="Provide your full residential address"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { inject } from "vue";

const category = ["male", "female", "other"];
const formData = inject("formData");
</script>
