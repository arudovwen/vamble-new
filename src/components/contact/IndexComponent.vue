<template>
  <section class="relative pb-16">
    <div class="flex z-[2] w-full border-b border-[#a18463]/20 mb-10 sm:mb-20">
      <div
        class="w-[80%] sm:w-[70%] lg:w-[600px] pt-40 pb-10 text-left px-6 sm:px-8 lg:px-16"
      >
        <div class="mb-4">
          <h1
            class="text-[#2d5c1f] mb-3 lg:mb-6 zendaya text-5xl xl:text-6xl font-bold"
          >
            Contact us today
          </h1>
          <ul>
            <li class="text-base xl:text-lg text-left mb-1">
              Phone :
              <a class="text-[#3d3126] font-semibold" href="tel:+2349064645461"
                >+2349064645461</a
              >
            </li>
            <li class="text-base xl:text-lg text-left mb-1">
              Address :
              <a
                class="text-[#3d3126] font-semibold"
                href="https://goo.gl/maps/myfbJDfZEmgXgBpJ6"
                >Plot 790, sector center, Cadastral zone. Jahi. Abuja</a
              >
            </li>
            <li class="text-base xl:text-lg text-left">
              Email :
              <a
                class="text-[#3d3126] font-semibold"
                href="mailto:enquiry@vambleapartments.com"
                >enquiry@vambleapartments.com</a
              >
            </li>
          </ul>
        </div>
      </div>

      <div
        class="flex-1 overflow-hidden bg-[url('@/assets/images/rooms/front.jpg')] bg-cover bg-center"
      >
        <div
          class="w-full h-full flex justify-start items-center bg-gray-500/20 backdrop-brightness-50"
        ></div>
      </div>
    </div>
    <div
      class="w-full lg:w-[500px] lg:border border-[#a18463]/20 p-6 sm:p-8 mx-auto rounded-lg mb-10 shadow bg-white"
    >
      <h2 class="text-4xl sm:text-5xl font-semibold mb-6 text-left zendaya">
        Feel free to write to us
      </h2>
      <form @submit.prevent="handleSubmit">
        <div class="text-left mb-6">
          <label class="block mb-2 text-xs">Full name</label>
          <input
            class="border px-3 py-3 rounded-lg w-full outline-none focus:border-[#2c3e50]/20"
            placeholder="Provide your full name"
            v-model="form.name"
            required
          />
        </div>
        <div class="text-left mb-6">
          <label class="block mb-2 text-xs">E-mail</label>
          <input
            class="border px-3 py-3 rounded-lg w-full outline-none focus:border-[#2c3e50]/20"
            placeholder="Provide your email address"
            v-model="form.email"
            required
            type="email"
          />
        </div>
        <div class="text-left mb-6">
          <label class="block mb-2 text-xs">Message</label>
          <textarea
            v-model="form.body"
            rows="4"
            class="border px-3 py-3 rounded-lg w-full outline-none focus:border-[#2c3e50]/20"
            placeholder="Provide your full name"
            required
          ></textarea>
        </div>
        <div>
          <button
            :disabled="isLoading"
            type="submit"
            class="gap-x-1 bg-[#2d5c1f] disabled:opacity-60 text-white px-10 w-full font-medium hover:opacity-80 rounded-lg active:scale-95 py-4 text-sm sm:text-base"
          >
            Send message
            <i
              class="fa fa-refresh fa-spin"
              v-if="isLoading"
              aria-hidden="true"
            ></i>
          </button>
        </div>
      </form>
    </div>

    <div class="">
      <div class="p-6 sm:p-8 lg:p-16 flex items-center justify-center flex-col">
        <h2
          class="text-4xl sm:text-5xl lg:text-6xl font-semibold lg:mb-1 text-left zendaya"
        >
          Social Connect
        </h2>
        <p class="text-base xl:text-lg text-left mb-6">
          Also write us on one of our social handles
        </p>
        <div class="p-3 flex justify-center gap-x-4">
          <a v-for="i in socials" :key="i.icon" :href="i.url" target="_blank">
            <div class="hover:text-blue-900">
              <i :class="i.icon" aria-hidden="true"></i> <br />
              <small>
                {{ i.title }}
              </small>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { reactive, ref } from "vue";
import { sendMessage } from "@/services/authservices";
import { useToast } from "vue-toast-notification";

const toast = useToast();
const form = reactive({
  name: "",
  email: "",
  body: "",
});

const socials = [
  {
    title: "@vambleapartments",
    icon: "fab fa-instagram fa-2x",
    url: "https://instagram.com/vambleapartments",
  },
  {
    title: "vambleapartments",
    icon: "fab fa-whatsapp fa-2x",
    url: "https://wa.me/2349064645461",
  },
  {
    title: "@vambleapartments",
    icon: "fab fa-twitter fa-2x",
    url: "https://twitter.com/vambleapartments",
  },
];

const isLoading = ref(false);
async function handleSubmit() {
  isLoading.value = true;
  sendMessage(form)
    .then((res) => {
      if (res.status === 200) {
        toast.success("Message sent!");
        form.name = form.email = form.body = "";
        isLoading.value = false;
      }
    })
    .catch((err) => {
      toast.error(err.response.data.message);
      isLoading.value = false;
    });
}
</script>
