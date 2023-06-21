<template>
  <form @submit.prevent="handleSubmit" class="p-4">
    <legend class="text-xl font-bold mb-8 block">Add new room</legend>

    <div class="grid grid-cols-2 gap-6">
      <div class="">
        <div class="text-left mb-6">
          <label class="block mb-2 text-xs">Category</label>
          <select
            v-model="v$.flat_name.$model"
            class="border px-3 py-3 rounded-lg w-full outline-none focus:border-[#2c3e50]/20 capitalize"
          >
            <option value="" disabled>Choose a category</option>
            <option v-for="cat in categories" :key="cat" :value="cat">
              {{ cat }}
            </option>
          </select>
          <div
            class="text-red-500 mt-1"
            v-for="error of v$.flat_name.$errors"
            :key="error.$uid"
          >
            <div class="error-msg text-error text-xs font-semibold">
              {{ error.$message }}
            </div>
          </div>
        </div>
      </div>
      <div class="">
        <div class="text-left mb-6">
          <label class="block mb-2 text-xs">Choose type</label>
          <select
            v-model="v$.flat_type.$model"
            class="border px-3 py-3 rounded-lg w-full outline-none focus:border-[#2c3e50]/20 capitalize"
          >
            <option value="" disabled>Choose a type</option>
            <option v-for="cat in types" :key="cat" :value="cat">
              {{ cat }}
            </option>
          </select>
          <div
            class="text-red-500 mt-1"
            v-for="error of v$.flat_type.$errors"
            :key="error.$uid"
          >
            <div class="error-msg text-error text-xs font-semibold">
              {{ error.$message }}
            </div>
          </div>
        </div>
      </div>

      <div class="text-left mb-6">
        <label class="block mb-2 text-xs">Room number</label>
        <input
          v-model="v$.room_name.$model"
          class="border px-3 py-3 rounded-lg w-full outline-none focus:border-[#2c3e50]/20"
          placeholder="Porivde a room number"
        />
        <div
          class="text-red-500 mt-1"
          v-for="error of v$.room_name.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-error text-xs font-semibold">
            {{ error.$message }}
          </div>
        </div>
      </div>
      <div class="text-left mb-6">
        <label class="block mb-2 text-xs">Price</label>
        <input
          v-model="v$.price.$model"
          class="border px-3 py-3 rounded-lg w-full outline-none focus:border-[#2c3e50]/20"
          placeholder="What's the price?"
          type="number"
        />
        <div
          class="text-red-500 mt-1"
          v-for="error of v$.price.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-error text-xs font-semibold">
            {{ error.$message }}
          </div>
        </div>
      </div>
      <div class="text-left mb-6">
        <label class="block mb-2 text-xs">Max occupancy</label>
        <input
          v-model="v$.max_occupancy.$model"
          class="border px-3 py-3 rounded-lg w-full outline-none focus:border-[#2c3e50]/20"
          placeholder="What's the max occupancy"
          type="number"
        />
        <div
          class="text-red-500 mt-1"
          v-for="error of v$.max_occupancy.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-error text-xs font-semibold">
            {{ error.$message }}
          </div>
        </div>
      </div>
      <div class="text-left mb-6">
        <label class="block mb-2 text-xs">Floor</label>
        <input
          v-model="v$.floor.$model"
          class="border px-3 py-3 rounded-lg w-full outline-none focus:border-[#2c3e50]/20"
          placeholder="What floor is it located?"
          type="number"
        />
        <div
          class="text-red-500 mt-1"
          v-for="error of v$.floor.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-error text-xs font-semibold">
            {{ error.$message }}
          </div>
        </div>
      </div>
    </div>
    <div class="text-left mb-6">
      <label class="block mb-2 text-xs">Description</label>
      <textarea
        v-model="v$.description.$model"
        class="border px-3 py-3 rounded-lg w-full outline-none focus:border-[#2c3e50]/20"
        placeholder="Provide a description"
      ></textarea>
      <div
        class="text-red-500 mt-1"
        v-for="error of v$.description.$errors"
        :key="error.$uid"
      >
        <div class="error-msg text-error text-xs font-semibold">
          {{ error.$message }}
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
import { ref, reactive, onMounted, inject } from "vue";
import { getRoomCategories, addRoom } from "@/services/roomservice";
import { useToast } from "vue-toast-notification";

const toast = useToast();
const isOpen = inject("isOpen");
const isAdd = inject("isAdd");
const getData = inject("getData");
const types = ["standard", "executive", "platinum"];
const isLoading = ref(false);
const formData = reactive({
  flat_name: "",
  flat_type: "",
  room_name: "",
  price: null,
  max_occupancy: "",
  floor: "",
  description: "",
});

const categories = ref(null);
const rules = {
  flat_name: { required },
  flat_type: { required },
  room_name: { required },
  price: { required },
  max_occupancy: { required },
  floor: { required },
  description: { required },
};
const v$ = useVuelidate(rules, formData);

async function handleSubmit() {
  const result = await v$.value.$validate();
  if (!result) return;
  isLoading.value = true;
  addRoom(formData)
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

onMounted(() => {
  getRoomCategories().then((res) => {
    categories.value = res.data;
  });
});
</script>
