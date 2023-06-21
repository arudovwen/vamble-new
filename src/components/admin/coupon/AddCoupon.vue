<template>
  <form @submit.prevent="handleSubmit" class="p-4">
    <legend class="text-xl font-bold mb-8 block">Add new room</legend>

    <div class="grid grid-cols-2 gap-6">
      <div class="">
        <div class="text-left mb-6">
          <label class="block mb-2 text-xs">Discount type</label>
          <select
            v-model="v$.type.$model"
            class="border px-3 py-3 rounded-lg w-full outline-none focus:border-[#2c3e50]/20 capitalize"
          >
            <option value="" disabled>Choose a type</option>
            <option value="percentage">Percentage</option>
            <option value="subtraction">Subtraction</option>
          </select>
          <div
            class="text-red-500 mt-1"
            v-for="error of v$.type.$errors"
            :key="error.$uid"
          >
            <div class="error-msg text-error text-xs font-semibold">
              {{ error.$message }}
            </div>
          </div>
        </div>
      </div>
      <div class="text-left mb-6">
        <label class="block mb-2 text-xs">Discount</label>
        <input
          v-model="v$.discount.$model"
          class="border px-3 py-3 rounded-lg w-full outline-none focus:border-[#2c3e50]/20"
          placeholder="What's the discount?"
          type="number"
        />
        <div
          class="text-red-500 mt-1"
          v-for="error of v$.discount.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-error text-xs font-semibold">
            {{ error.$message }}
          </div>
        </div>
      </div>
      <div class="text-left mb-6">
        <label class="block mb-2 text-xs">Max usage</label>
        <input
          v-model="v$.count.$model"
          class="border px-3 py-3 rounded-lg w-full outline-none focus:border-[#2c3e50]/20"
          placeholder="What's the max usage"
          type="number"
        />
        <div
          class="text-red-500 mt-1"
          v-for="error of v$.count.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-error text-xs font-semibold">
            {{ error.$message }}
          </div>
        </div>
      </div>
      <div class="">
        <div class="text-left mb-6">
          <label class="block mb-2 text-xs">Status</label>
          <select
            v-model="v$.status.$model"
            class="border px-3 py-3 rounded-lg w-full outline-none focus:border-[#2c3e50]/20 capitalize"
          >
            <option value="" disabled>Choose status</option>
            <option :value="true">Active</option>
            <option :value="false">Inactive</option>
          </select>
          <div
            class="text-red-500 mt-1"
            v-for="error of v$.status.$errors"
            :key="error.$uid"
          >
            <div class="error-msg text-error text-xs font-semibold">
              {{ error.$message }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-between mt-7">
      <button
        @click="isOpen = false"
        type="button"
        class="capitalize bg-transparent border border-gray-300 text-sm px-6 py-3 w-full lg:w-[150px] hover:opacity-80 active:scale-95 disabled:active:scale-100 rounded-lg disabled:cursor-not-allowed"
      >
        Cancel
      </button>
      <button
        type="submit"
        :disabled="isLoading"
        class="capitalize bg-[#2d5c1f] text-white text-sm px-6 py-3 w-full lg:w-[150px] hover:opacity-80 active:scale-95 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed"
      >
        Submit
      </button>
    </div>
  </form>
</template>
<script setup>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { ref, reactive, inject } from "vue";
import { addCoupon } from "@/services/userservices";
import { useToast } from "vue-toast-notification";

const toast = useToast();
const isOpen = inject("isOpen");
const isAdd = inject("isAdd");
const getData = inject("getData");

const isLoading = ref(false);
const formData = reactive({
  discount: "",
  type: false,
  count: "",
  status: "",
});

const rules = {
  discount: { required },
  type: { required },
  count: { required },
  status: { required },
};
const v$ = useVuelidate(rules, formData);

async function handleSubmit() {
  const result = await v$.value.$validate();
  if (!result) return;
  isLoading.value = true;
  addCoupon(formData)
    .then((res) => {
      if (res.status === 200) {
        isLoading.value = false;
        isOpen.value = false;
        isAdd.value = false;
        getData();
        toast.success("Creation success");
      }
    })
    .catch((err) => {
      isLoading.value = false;
      toast.error(err.response.data.errors);
    });
}
</script>
