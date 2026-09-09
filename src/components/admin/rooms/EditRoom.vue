<template>
  <form @submit.prevent="handleSubmit" class="text-left font-sans flex flex-col">
    <!-- Header -->
    <div class="p-6 bg-[#132212] text-white flex items-start justify-between border-b border-white/10">
      <div class="flex items-center gap-3.5">
        <div class="w-12 h-12 rounded-2xl bg-[#9B7846] text-white flex items-center justify-center text-lg font-bold border border-white/20 shadow-md">
          <i class="fa fa-bed"></i>
        </div>
        <div>
          <span class="text-[10px] uppercase tracking-widest text-[#c5a880] font-bold block">Suite Management</span>
          <h3 class="font-serif text-xl font-normal text-white mt-0.5">Update Suite Details</h3>
        </div>
      </div>

      <button
        @click="isOpen = false"
        type="button"
        class="text-white/60 hover:text-white text-sm w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-colors"
      >
        <i class="fa fa-times"></i>
      </button>
    </div>

    <!-- Body Fields -->
    <div class="p-6 space-y-4 text-xs max-h-[70vh] overflow-y-auto">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <!-- Category -->
        <div>
          <label class="block mb-1.5 font-bold uppercase text-[10px] text-gray-500">Suite Category</label>
          <div class="relative">
            <select
              v-model="v$.flat_type.$model"
              class="w-full pl-3 pr-8 py-2.5 rounded-xl border border-gray-300 focus:border-[#9B7846] outline-none text-xs bg-white capitalize shadow-2xs transition-colors"
            >
              <option value="" disabled>Select category</option>
              <option v-for="cat in categories" :key="cat" :value="cat">
                {{ cat }}
              </option>
            </select>
          </div>
          <div v-for="error of v$.flat_type.$errors" :key="error.$uid" class="text-red-500 text-[10px] mt-1 font-semibold">
            {{ error.$message }}
          </div>
        </div>

        <!-- Flat Type -->
        <div>
          <label class="block mb-1.5 font-bold uppercase text-[10px] text-gray-500">Residence Type</label>
          <select
            v-model="v$.flat_name.$model"
            class="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:border-[#9B7846] outline-none text-xs bg-white capitalize shadow-2xs transition-colors"
          >
            <option value="" disabled>Select type</option>
            <option v-for="t in types" :key="t" :value="t">
              {{ t }}
            </option>
          </select>
          <div v-for="error of v$.flat_name.$errors" :key="error.$uid" class="text-red-500 text-[10px] mt-1 font-semibold">
            {{ error.$message }}
          </div>
        </div>

        <!-- Room Code -->
        <div>
          <label class="block mb-1.5 font-bold uppercase text-[10px] text-gray-500">Room Code / Number</label>
          <div class="relative">
            <i class="fa fa-door-closed absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
            <input
              v-model="v$.room_name.$model"
              class="w-full pl-8 pr-3 py-2.5 rounded-xl border border-gray-300 focus:border-[#9B7846] outline-none text-xs bg-white shadow-2xs font-mono transition-colors"
              placeholder="e.g. Suite 201 or Apt 401"
            />
          </div>
          <div v-for="error of v$.room_name.$errors" :key="error.$uid" class="text-red-500 text-[10px] mt-1 font-semibold">
            {{ error.$message }}
          </div>
        </div>

        <!-- Nightly Rate -->
        <div>
          <label class="block mb-1.5 font-bold uppercase text-[10px] text-gray-500">Nightly Rate (NGN)</label>
          <div class="relative">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-xs">₦</span>
            <input
              v-model="v$.price.$model"
              type="number"
              class="w-full pl-7 pr-3 py-2.5 rounded-xl border border-gray-300 focus:border-[#9B7846] outline-none text-xs bg-white shadow-2xs font-mono font-semibold transition-colors"
              placeholder="e.g. 95000"
            />
          </div>
          <div v-for="error of v$.price.$errors" :key="error.$uid" class="text-red-500 text-[10px] mt-1 font-semibold">
            {{ error.$message }}
          </div>
        </div>

        <!-- Max Occupancy -->
        <div>
          <label class="block mb-1.5 font-bold uppercase text-[10px] text-gray-500">Max Guest Occupancy</label>
          <div class="relative">
            <i class="fa fa-users absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
            <input
              v-model="v$.max_occupancy.$model"
              type="number"
              class="w-full pl-8 pr-3 py-2.5 rounded-xl border border-gray-300 focus:border-[#9B7846] outline-none text-xs bg-white shadow-2xs font-mono transition-colors"
              placeholder="e.g. 2"
            />
          </div>
          <div v-for="error of v$.max_occupancy.$errors" :key="error.$uid" class="text-red-500 text-[10px] mt-1 font-semibold">
            {{ error.$message }}
          </div>
        </div>

        <!-- Floor -->
        <div>
          <label class="block mb-1.5 font-bold uppercase text-[10px] text-gray-500">Building Floor Level</label>
          <div class="relative">
            <i class="fa fa-building absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
            <input
              v-model="v$.floor.$model"
              type="number"
              class="w-full pl-8 pr-3 py-2.5 rounded-xl border border-gray-300 focus:border-[#9B7846] outline-none text-xs bg-white shadow-2xs font-mono transition-colors"
              placeholder="e.g. 2"
            />
          </div>
          <div v-for="error of v$.floor.$errors" :key="error.$uid" class="text-red-500 text-[10px] mt-1 font-semibold">
            {{ error.$message }}
          </div>
        </div>
      </div>

      <!-- Description -->
      <div>
        <label class="block mb-1.5 font-bold uppercase text-[10px] text-gray-500">Suite Amenities & Description</label>
        <textarea
          v-model="v$.description.$model"
          rows="3"
          class="w-full p-3 rounded-xl border border-gray-300 focus:border-[#9B7846] outline-none text-xs bg-white shadow-2xs transition-colors"
          placeholder="Detail key features (e.g. King Bed, Ensuite Bath, Starlink WiFi, Gourmet Kitchen)..."
        ></textarea>
        <div v-for="error of v$.description.$errors" :key="error.$uid" class="text-red-500 text-[10px] mt-1 font-semibold">
          {{ error.$message }}
        </div>
      </div>
    </div>

    <!-- Footer Actions -->
    <div class="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-3">
      <button
        @click="isOpen = false"
        type="button"
        class="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold text-xs transition-colors"
      >
        Cancel
      </button>
      <button
        type="submit"
        :disabled="isLoading"
        class="inline-flex items-center gap-2 bg-[#243821] hover:bg-[#182716] text-white px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold shadow-md transition-all active:scale-95 disabled:opacity-60"
      >
        <i v-if="isLoading" class="fa fa-spinner fa-spin"></i>
        <i v-else class="fa fa-check"></i>
        <span>{{ isLoading ? "Updating..." : "Update Suite" }}</span>
      </button>
    </div>
  </form>
</template>

<script setup>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { ref, reactive, onMounted, inject, defineProps } from "vue";
import { getRoomCategories, updateRoom } from "@/services/roomservice";
import { useToast } from "vue-toast-notification";

const props = defineProps(["detail"]);
const toast = useToast();
const isOpen = inject("isOpen");
const isEdit = inject("isEdit");
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
  formData.id = props.detail.id;
  updateRoom(formData)
    .then((res) => {
      if (res.status === 200) {
        isLoading.value = false;
        isEdit.value = isOpen.value = false;
        getData();
        toast.success("Suite updated successfully");
      }
    })
    .catch((err) => {
      isLoading.value = false;
      toast.error(err?.response?.data?.errors || "Failed to update suite");
    });
}

onMounted(() => {
  getRoomCategories().then((res) => {
    categories.value = res.data;
  });
  if (props.detail) {
    formData.flat_name = props.detail.flat_name;
    formData.flat_type = props.detail.flat_type;
    formData.room_name = props.detail.room_name;
    formData.price = props.detail.price;
    formData.max_occupancy = props.detail.max_occupancy;
    formData.floor = props.detail.floor;
    formData.description = props.detail.description;
  }
});
</script>
