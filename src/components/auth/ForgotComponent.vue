<template>
  <AuthLayout>
    <template #content>
      <div
        class="text-left p-8 w-[380px] rounded-lg bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 bg-black shadow-[rgba(0,0,0,0.35)_0px_5px_15px]"
      >
        <form @submit.prevent="handleSubmit">
          <legend class="text-2xl mb-7 font-semibold text-white">
            Reset your password
          </legend>
          <div class="text-left mb-6">
            <label class="block mb-2 text-xs text-white">E-mail</label>
            <input
              v-model="v$.email.$model"
              type="email"
              class="border px-3 py-3 rounded-lg w-full outline-none focus:border-[#2c3e50]/20"
              placeholder="Provide your registered email"
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
          <div class="text-white text-sm text-right">
            <router-link to="/login" class="hover:underline"
              >Back to login</router-link
            >
          </div>
          <div class="mt-6 w-full">
            <button
              :disabled="isLoading"
              type="submit"
              class="uppercase bg-[#2d5c1f] text-white text-base font-semibold px-6 py-3 w-full rounded-lg hover:opacity-80 active:scale-95 disabled:opacity-60"
            >
              Send link
              <i
                class="fa fa-refresh fa-spin"
                v-if="isLoading"
                aria-hidden="true"
              ></i>
            </button>
          </div>
        </form>
      </div>
    </template>
  </AuthLayout>
</template>
<script setup>
import AuthLayout from "@/components/layouts/authLayout.vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { reactive, ref } from "vue";
import { forgotPassword } from "@/services/authservices";
import { useToast } from "vue-toast-notification";

const toast = useToast();
const form = reactive({
  email: "",
});
const rules = {
  email: { required },
};
const v$ = useVuelidate(rules, form);
const isLoading = ref(false);
async function handleSubmit() {
  const result = await v$.value.$validate();
  if (!result) return;
  isLoading.value = true;
  forgotPassword(form)
    .then((res) => {
      if (res.status === 200) {
        toast.success("Email link sent!");
        isLoading.value = false;
      }
    })
    .catch((err) => {
      toast.error(err.response.data.message);
      isLoading.value = false;
    });
}
</script>
