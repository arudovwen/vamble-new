<template>
  <div class="space-y-6">
    <div class="border-b border-gray-100 pb-4">
      <h2 class="font-serif text-2xl font-medium text-[#1A1816]">
        2. Guest Personal Information
      </h2>
      <p class="text-xs text-gray-500 mt-1">
        Please provide the primary guest details for registration and digital
        pass delivery.
      </p>
    </div>

    <!-- Name & Email Row -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div>
        <label
          class="block text-xs uppercase tracking-wider font-semibold text-[#9B7846] mb-2"
        >
          Full Name *
        </label>
        <input
          v-model="v$.name.$model"
          type="text"
          placeholder="e.g. Mr. Emeka Okonkwo"
          class="w-full px-4 py-3 rounded-xl border border-[#9B7846]/25 bg-[#FAF8F5]/40 text-sm text-[#1A1816] outline-none focus:ring-2 focus:ring-[#243821]/20 focus:border-[#243821] transition-all"
        />
        <p
          v-if="v$.name.$error"
          class="text-xs text-red-600 font-semibold mt-1"
        >
          {{ v$.name.$errors[0].$message }}
        </p>
      </div>

      <div>
        <label
          class="block text-xs uppercase tracking-wider font-semibold text-[#9B7846] mb-2"
        >
          Email Address (for digital receipt) *
        </label>
        <input
          v-model="v$.email.$model"
          type="email"
          placeholder="e.g. emeka.o@company.com"
          class="w-full px-4 py-3 rounded-xl border border-[#9B7846]/25 bg-[#FAF8F5]/40 text-sm text-[#1A1816] outline-none focus:ring-2 focus:ring-[#243821]/20 focus:border-[#243821] transition-all"
        />
        <p
          v-if="v$.email.$error"
          class="text-xs text-red-600 font-semibold mt-1"
        >
          {{ v$.email.$errors[0].$message }}
        </p>
      </div>
    </div>

    <!-- Phone, Gender, Nationality Row -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div>
        <label
          class="block text-xs uppercase tracking-wider font-semibold text-[#9B7846] mb-2"
        >
          Phone Number *
        </label>
        <input
          v-model="v$.phone.$model"
          type="tel"
          placeholder="+234 800 000 0000"
          class="w-full px-4 py-3 rounded-xl border border-[#9B7846]/25 bg-[#FAF8F5]/40 text-sm text-[#1A1816] outline-none focus:ring-2 focus:ring-[#243821]/20 focus:border-[#243821] transition-all"
        />
        <p
          v-if="v$.phone.$error"
          class="text-xs text-red-600 font-semibold mt-1"
        >
          {{ v$.phone.$errors[0].$message }}
        </p>
      </div>

      <div>
        <label
          class="block text-xs uppercase tracking-wider font-semibold text-[#9B7846] mb-2"
        >
          Gender *
        </label>
        <div class="relative">
          <select
            v-model="v$.gender.$model"
            class="w-full appearance-none px-4 py-3 rounded-xl border border-[#9B7846]/25 bg-[#FAF8F5]/40 text-sm text-[#1A1816] outline-none focus:ring-2 focus:ring-[#243821]/20 focus:border-[#243821] transition-all cursor-pointer"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Prefer not to say</option>
          </select>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#9B7846]"
          >
            <i class="fa fa-angle-down text-xs"></i>
          </div>
        </div>
      </div>

      <div>
        <label
          class="block text-xs uppercase tracking-wider font-semibold text-[#9B7846] mb-2"
        >
          Nationality *
        </label>
        <input
          v-model="v$.nationality.$model"
          type="text"
          placeholder="e.g. Nigerian / British"
          class="w-full px-4 py-3 rounded-xl border border-[#9B7846]/25 bg-[#FAF8F5]/40 text-sm text-[#1A1816] outline-none focus:ring-2 focus:ring-[#243821]/20 focus:border-[#243821] transition-all"
        />
      </div>
    </div>

    <!-- Residential Address -->
    <div>
      <label
        class="block text-xs uppercase tracking-wider font-semibold text-[#9B7846] mb-2"
      >
        Residential or Official Address *
      </label>
      <input
        v-model="v$.address.$model"
        type="text"
        placeholder="e.g. Maitama, Abuja, Nigeria"
        class="w-full px-4 py-3 rounded-xl border border-[#9B7846]/25 bg-[#FAF8F5]/40 text-sm text-[#1A1816] outline-none focus:ring-2 focus:ring-[#243821]/20 focus:border-[#243821] transition-all"
      />
      <p
        v-if="v$.address.$error"
        class="text-xs text-red-600 font-semibold mt-1"
      >
        {{ v$.address.$errors[0].$message }}
      </p>
    </div>

    <!-- Special Concierge Requests -->
    <div>
      <label
        class="block text-xs uppercase tracking-wider font-semibold text-[#9B7846] mb-2"
      >
        Special Requests & Arrival Notes (Optional)
      </label>
      <textarea
        v-model="formData.special_requests"
        rows="3"
        placeholder="e.g. Late night check-in (10 PM), airport pickup required, extra orthopedic pillows, dietary preferences..."
        class="w-full px-4 py-3 rounded-xl border border-[#9B7846]/25 bg-[#FAF8F5]/40 text-sm text-[#1A1816] outline-none focus:ring-2 focus:ring-[#243821]/20 focus:border-[#243821] transition-all resize-none"
      ></textarea>
    </div>

    <!-- Action Buttons -->
    <div
      class="pt-6 border-t border-gray-100 flex flex-col-reverse sm:flex-row items-center justify-between gap-3"
    >
      <button
        type="button"
        @click="stage = 1"
        class="w-full sm:w-auto border border-[#9B7846]/30 hover:border-[#9B7846] text-[#1A1816] px-6 py-3 rounded-full text-xs uppercase tracking-wider font-semibold transition-all text-center"
      >
        <i class="fa fa-arrow-left mr-2 text-xs"></i> Back
      </button>

      <button
        type="button"
        @click="handleNext"
        class="w-full sm:w-auto bg-[#243821] hover:bg-[#182716] text-white px-8 py-3 rounded-full text-xs uppercase tracking-wider font-semibold shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 text-center"
      >
        <span>Review & Payment</span>
        <i class="fa fa-arrow-right text-xs"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { inject } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

const formData = inject("formData");
const stage = inject("stage");

const rules = {
  name: { required },
  email: { required, email },
  phone: { required },
  gender: { required },
  nationality: { required },
  address: { required },
};

const v$ = useVuelidate(rules, formData);

async function handleNext() {
  const result = await v$.value.$validate();
  if (result) {
    stage.value = 3;
  }
}
</script>
