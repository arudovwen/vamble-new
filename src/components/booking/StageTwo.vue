<template>
  <div>
    <div class="grid lg:grid-cols-2 gap-x-8">
      <div class="text-left mb-6">
        <label class="block mb-2 text-xs">Full name</label>
        <input
          v-model="v$.name.$model"
          class="border px-3 py-3 rounded-lg w-full outline-none focus:border-[#2c3e50]/20"
          placeholder="Provide your full name"
        />
        <div
          class="text-red-500 mt-1"
          v-for="error of v$.name.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-error text-xs font-semibold">
            {{ error.$message }}
          </div>
        </div>
      </div>
      <div class="text-left mb-6">
        <label class="block mb-2 text-xs">E-mail</label>
        <input
          v-model="v$.email.$model"
          type="email"
          class="border px-3 py-3 rounded-lg w-full outline-none focus:border-[#2c3e50]/20"
          placeholder="Provide your email"
        />
        <div
          class="text-red-500 mt-1"
          v-for="error of v$.email.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-error text-xs font-semibold">
            {{ error.$message }}
          </div>
        </div>
      </div>
    </div>
    <div class="grid lg:grid-cols-3 gap-x-8">
      <div class="text-left mb-6">
        <label class="block mb-2 text-xs">Phone number</label>
        <input
          v-model="v$.phone.$model"
          class="border px-3 py-3 rounded-lg w-full outline-none focus:border-[#2c3e50]/20"
          placeholder="Provide your phone number"
        />
        <div
          class="text-red-500 mt-1"
          v-for="error of v$.phone.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-error text-xs font-semibold">
            {{ error.$message }}
          </div>
        </div>
      </div>
      <div class="text-left mb-6">
        <label class="block mb-2 text-xs">Gender</label>
        <select
          v-model="v$.gender.$model"
          class="border px-3 py-3 rounded-lg w-full outline-none focus:border-[#2c3e50]/20 capitalize"
        >
          <option value="" disabled>Choose your gender</option>
          <option v-for="cat in category" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>
        <div
          class="text-red-500 mt-1"
          v-for="error of v$.gender.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-error text-xs font-semibold">
            {{ error.$message }}
          </div>
        </div>
      </div>
      <div class="text-left mb-6">
        <label class="block mb-2 text-xs">Nationality</label>

        <input
          v-model="v$.nationality.$model"
          class="border px-3 py-3 rounded-lg w-full outline-none focus:border-[#2c3e50]/20"
          placeholder="Provide your nationality"
        />
        <div
          class="text-red-500 mt-1"
          v-for="error of v$.nationality.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-error text-xs font-semibold">
            {{ error.$message }}
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 gap-x-8">
      <div class="text-left mb-6">
        <label class="block mb-2 text-xs">Residential address</label>
        <input
          v-model="v$.address.$model"
          class="border px-3 py-3 rounded-lg w-full outline-none focus:border-[#2c3e50]/20"
          placeholder="Provide your full residential address"
        />
        <div
          class="text-red-500 mt-1"
          v-for="error of v$.address.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-error text-xs font-semibold">
            {{ error.$message }}
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex flex-col lg:flex-row gap-5 items-center justify-between mt-10 max-w-[400px] sm:max-w-none mx-auto"
    >
      <button
        @click="stage--"
        type="button"
        :disabled="stage === 1"
        class="capitalize bg-transparent border border-gray-300 text-sm px-6 py-3 w-full lg:w-[150px] hover:opacity-80 active:scale-95 disabled:active:scale-100 rounded-lg disabled:cursor-not-allowed"
      >
        Back
      </button>
      <button
        @click="saveDetails"
        type="button"
        class="capitalize bg-[#2d5c1f] text-white text-sm px-6 py-3 w-full lg:w-[150px] hover:opacity-80 active:scale-95 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  </div>
</template>
<script setup>
import { inject } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

const category = ["male", "female", "other"];
const formData = inject("formData");
const stage = inject("stage");

const rules = {
  name: { required },
  email: { required },
  phone: { required },
  nationality: { required },
  address: { required },
  gender: { required },
};
const v$ = useVuelidate(rules, formData);

async function saveDetails() {
  const result = await v$.value.$validate();
  if (!result) return;

  stage.value++;
}
</script>
