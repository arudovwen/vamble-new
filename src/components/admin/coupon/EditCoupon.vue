<template>
  <form @submit.prevent="handleSubmit" class="text-left font-sans flex flex-col">
    <!-- Header -->
    <div class="p-6 bg-[#132212] text-white flex items-start justify-between border-b border-white/10">
      <div class="flex items-center gap-3.5">
        <div class="w-12 h-12 rounded-2xl bg-[#9B7846] text-white flex items-center justify-center text-lg font-bold border border-white/20 shadow-md">
          <i class="fa fa-tags"></i>
        </div>
        <div>
          <span class="text-[10px] uppercase tracking-widest text-[#c5a880] font-bold block">Promotional Campaigns</span>
          <h3 class="font-serif text-xl font-normal text-white mt-0.5">Update Coupon #{{ detail?.coupon }}</h3>
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
    <div class="p-6 space-y-4 text-xs">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <!-- Discount Type -->
        <div>
          <label class="block mb-1.5 font-bold uppercase text-[10px] text-gray-500">Discount Format</label>
          <div class="relative">
            <select
              v-model="v$.type.$model"
              class="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:border-[#9B7846] outline-none text-xs bg-white capitalize shadow-2xs transition-colors"
            >
              <option value="" disabled>Select format</option>
              <option value="percentage">Percentage Discount (%)</option>
              <option value="subtraction">Flat Cash Reduction (₦)</option>
            </select>
          </div>
          <div v-for="error of v$.type.$errors" :key="error.$uid" class="text-red-500 text-[10px] mt-1 font-semibold">
            {{ error.$message }}
          </div>
        </div>

        <!-- Discount Value -->
        <div>
          <label class="block mb-1.5 font-bold uppercase text-[10px] text-gray-500">
            Discount Value ({{ formData.type === 'percentage' ? '%' : '₦' }})
          </label>
          <div class="relative">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-xs">
              {{ formData.type === 'percentage' ? '%' : '₦' }}
            </span>
            <input
              v-model="v$.discount.$model"
              type="number"
              class="w-full pl-8 pr-3 py-2.5 rounded-xl border border-gray-300 focus:border-[#9B7846] outline-none text-xs bg-white shadow-2xs font-mono font-semibold transition-colors"
              :placeholder="formData.type === 'percentage' ? 'e.g. 15' : 'e.g. 10000'"
            />
          </div>
          <div v-for="error of v$.discount.$errors" :key="error.$uid" class="text-red-500 text-[10px] mt-1 font-semibold">
            {{ error.$message }}
          </div>
        </div>

        <!-- Max Usage -->
        <div>
          <label class="block mb-1.5 font-bold uppercase text-[10px] text-gray-500">Redemption Limit</label>
          <div class="relative">
            <i class="fa fa-users absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
            <input
              v-model="v$.count.$model"
              type="number"
              class="w-full pl-8 pr-3 py-2.5 rounded-xl border border-gray-300 focus:border-[#9B7846] outline-none text-xs bg-white shadow-2xs font-mono transition-colors"
              placeholder="e.g. 50"
            />
          </div>
          <div v-for="error of v$.count.$errors" :key="error.$uid" class="text-red-500 text-[10px] mt-1 font-semibold">
            {{ error.$message }}
          </div>
        </div>

        <!-- Status -->
        <div>
          <label class="block mb-1.5 font-bold uppercase text-[10px] text-gray-500">Voucher Status</label>
          <select
            v-model="v$.status.$model"
            class="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:border-[#9B7846] outline-none text-xs bg-white shadow-2xs transition-colors"
          >
            <option value="" disabled>Select status</option>
            <option :value="true">Active & Live</option>
            <option :value="false">Disabled / Paused</option>
          </select>
          <div v-for="error of v$.status.$errors" :key="error.$uid" class="text-red-500 text-[10px] mt-1 font-semibold">
            {{ error.$message }}
          </div>
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
        <span>{{ isLoading ? "Updating..." : "Update Coupon" }}</span>
      </button>
    </div>
  </form>
</template>

<script setup>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { ref, reactive, onMounted, inject, defineProps } from "vue";
import { updateCoupon } from "@/services/userservices";
import { useToast } from "vue-toast-notification";

const props = defineProps(["detail"]);
const toast = useToast();
const isOpen = inject("isOpen");
const isEdit = inject("isEdit");
const getData = inject("getData");

const isLoading = ref(false);
const formData = reactive({
  discount: "",
  type: "percentage",
  count: "",
  status: true,
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
  formData.id = props.detail.id;
  updateCoupon(formData)
    .then((res) => {
      if (res.status === 200) {
        isLoading.value = false;
        isEdit.value = isOpen.value = false;
        getData();
        toast.success("Coupon updated successfully");
      }
    })
    .catch((err) => {
      isLoading.value = false;
      toast.error(err?.response?.data?.errors || "Failed to update coupon");
    });
}

onMounted(() => {
  if (props.detail) {
    formData.discount = props.detail.discount;
    formData.type = props.detail.type;
    formData.count = props.detail.count;
    formData.status = Boolean(props.detail.status);
  }
});
</script>
