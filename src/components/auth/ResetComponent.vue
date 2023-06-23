<template>
  <AuthLayout>
    <template #content>
      <div
        class="text-left p-8 w-[95%] sm:w-[380px] rounded-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 bg-black shadow-[rgba(0,0,0,0.35)_0px_5px_15px]"
      >
        <form @submit.prevent="handleSubmit">
          <legend class="text-lg lg:text-2xl mb-7 font-semibold text-white">
            Create your new password
          </legend>
          <div class="text-left mb-6">
            <label class="block mb-2 text-xs text-white">New Password</label>
            <input
              v-model="v$.password.$model"
              type="password"
              class="border px-3 py-3 rounded-lg w-full outline-none focus:border-[#2c3e50]/20 text-sm"
              placeholder="Provide your new password"
            />
            <div
              class="text-red-500 mt-1"
              v-for="error of v$.password.$errors"
              :key="error.$uid"
            >
              <div class="error-msg text-error text-xs font-semibold">
                {{ error.$message }}
              </div>
            </div>
          </div>
          <div class="text-left mb-6">
            <label class="block mb-2 text-xs text-white"
              >Confirm Password</label
            >
            <input
              v-model="v$.password_confirmation.$model"
              type="password"
              class="border px-3 py-3 rounded-lg w-full outline-none focus:border-[#2c3e50]/20"
              placeholder="Confirm your password"
            />
            <div
              class="text-red-500 mt-1"
              v-for="error of v$.password_confirmation.$errors"
              :key="error.$uid"
            >
              <div class="error-msg text-error text-xs font-semibold">
                {{ error.$message }}
              </div>
            </div>
          </div>
          <div class="mt-6 w-full">
            <button
              :disabled="isLoading"
              type="submit"
              class="uppercase bg-[#2d5c1f] text-white text-sm font-medium px-6 py-3 w-full rounded-lg hover:opacity-80 active:scale-95 disabled:opacity-60"
            >
              Reset
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
import { required, helpers, minLength, maxLength } from "@vuelidate/validators";
import { reactive, ref } from "vue";
import { resetPassword } from "@/services/authservices";
import { useToast } from "vue-toast-notification";
import { useRouter, useRoute } from "vue-router";

const toast = useToast();
const router = useRouter();
const route = useRoute();
const form = reactive({
  password_confirmation: "",
  password: "",
  token: route.params.code,
});
const validPassword = (value) => {
  let res = /[a-z]/.test(value) && /[A-Z]/.test(value) && /[0-9]/.test(value);

  return res;
};
const samePassword = (value) => value === form.password;
const rules = {
  password: {
    required: helpers.withMessage("Password field cannot be empty", required),
    minLength: minLength(8),
    validPassword: helpers.withMessage("Password is invalid", validPassword),
    maxLength: maxLength(24),
  },
  password_confirmation: {
    samePassword: helpers.withMessage("Passwords do not match!", samePassword),
  },
};
const v$ = useVuelidate(rules, form);
const isLoading = ref(false);
async function handleSubmit() {
  const result = await v$.value.$validate();
  if (!result) return;
  isLoading.value = true;
  resetPassword(form)
    .then((res) => {
      if (res.status === 200) {
        toast.success("Password reset successful!");
        router.push("/login");
      }
    })
    .catch((err) => {
      toast.error(err.response.data.message);
      isLoading.value = false;
    });
}
</script>
