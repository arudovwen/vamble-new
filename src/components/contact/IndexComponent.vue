<template>
  <section class="relative pb-16 bg-[#FAF8F5] text-[#1A1816] font-sans">
    <!-- Hero Header Banner -->
    <div class="flex flex-col md:flex-row z-[2] w-full border-b border-[#9B7846]/20 mb-8 sm:mb-16 bg-white">
      <div
        class="w-full md:w-[60%] lg:w-[600px] pt-28 sm:pt-36 lg:pt-40 pb-10 text-left px-5 sm:px-8 lg:px-16 flex flex-col justify-center"
      >
        <div class="space-y-4">
          <span class="text-xs uppercase tracking-widest font-semibold text-[#9B7846] block">
            Guest Concierge & Inquiries
          </span>
          <h1 class="text-[#243821] font-serif text-3xl sm:text-5xl xl:text-6xl font-normal leading-tight">
            Contact Us Today
          </h1>
          <ul class="space-y-2 text-xs sm:text-sm text-gray-700 pt-1">
            <li class="flex items-center gap-2">
              <i class="fa fa-phone text-[#9B7846]"></i>
              <span>Phone:</span>
              <a class="text-[#243821] font-semibold hover:underline" href="tel:+2349064645461">+234 906 464 5461</a>
            </li>
            <li class="flex items-start gap-2">
              <i class="fa fa-map-marker text-[#9B7846] mt-0.5"></i>
              <span>Address:</span>
              <a
                class="text-[#243821] font-semibold hover:underline"
                href="https://goo.gl/maps/myfbJDfZEmgXgBpJ6"
                target="_blank"
                rel="noopener"
              >
                Plot 790, Sector Centre, Cadastral Zone B08, Jahi, Abuja
              </a>
            </li>
            <li class="flex items-center gap-2">
              <i class="fa fa-envelope text-[#9B7846]"></i>
              <span>Email:</span>
              <a
                class="text-[#243821] font-semibold hover:underline truncate"
                href="mailto:reservation@vambleapartments.com"
              >
                reservation@vambleapartments.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="h-56 md:h-auto flex-1 overflow-hidden bg-[url('@/assets/images/rooms/front.jpg')] bg-cover bg-center min-h-[200px]"
      >
        <div
          class="w-full h-full flex justify-start items-center bg-black/30 backdrop-brightness-75"
        ></div>
      </div>
    </div>

    <!-- Contact Form Card -->
    <div class="max-w-xl mx-auto px-4 sm:px-6 mb-12">
      <div
        class="w-full border border-[#9B7846]/20 p-6 sm:p-10 rounded-3xl shadow-sm bg-white text-left"
      >
        <div class="mb-6">
          <span class="text-[10px] uppercase font-bold tracking-widest text-[#9B7846] block">
            Direct Concierge Dispatch
          </span>
          <h2 class="text-2xl sm:text-3xl font-serif font-normal text-[#1A1816] mt-1">
            Send an Inquiry
          </h2>
          <p class="text-xs text-gray-500 mt-1">
            Our guest relations desk responds within minutes for bookings, corporate accounts, or special requests.
          </p>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4 text-xs font-sans">
          <div>
            <label class="block mb-1.5 font-bold uppercase text-[10px] text-gray-500">Full Name *</label>
            <input
              class="border border-gray-300 focus:border-[#9B7846] px-3.5 py-3 rounded-xl w-full outline-none text-xs bg-[#FAF8F5]/50 transition-colors"
              placeholder="e.g. Adebayo Adeleke"
              v-model="form.name"
              required
            />
          </div>

          <div>
            <label class="block mb-1.5 font-bold uppercase text-[10px] text-gray-500">Email Address *</label>
            <input
              class="border border-gray-300 focus:border-[#9B7846] px-3.5 py-3 rounded-xl w-full outline-none text-xs bg-[#FAF8F5]/50 transition-colors"
              placeholder="e.g. name@example.com"
              v-model="form.email"
              required
              type="email"
            />
          </div>

          <div>
            <label class="block mb-1.5 font-bold uppercase text-[10px] text-gray-500">Your Message *</label>
            <textarea
              v-model="form.body"
              rows="4"
              class="border border-gray-300 focus:border-[#9B7846] p-3.5 rounded-xl w-full outline-none text-xs bg-[#FAF8F5]/50 transition-colors"
              placeholder="Detail your reservation dates, suite preferences, or specific inquiries..."
              required
            ></textarea>
          </div>

          <div class="pt-2">
            <button
              :disabled="isLoading"
              type="submit"
              class="w-full bg-[#243821] hover:bg-[#182716] disabled:opacity-60 text-white py-3.5 rounded-xl font-semibold text-xs uppercase tracking-wider shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 min-h-[44px]"
            >
              <i
                class="fa fa-spinner fa-spin"
                v-if="isLoading"
                aria-hidden="true"
              ></i>
              <i v-else class="fa fa-paper-plane"></i>
              <span>{{ isLoading ? "Dispatching..." : "Send Message" }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Social Connect -->
    <div class="max-w-2xl mx-auto px-4 text-center">
      <h3 class="text-xl sm:text-2xl font-serif font-normal text-[#1A1816]">
        Direct Channels
      </h3>
      <p class="text-xs text-gray-500 mt-1 mb-5">
        Prefer direct instant messaging? Reach out to our social desks:
      </p>

      <div class="flex flex-wrap justify-center gap-3">
        <a
          v-for="i in socials"
          :key="i.icon"
          :href="i.url"
          target="_blank"
          rel="noopener"
          class="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-[#9B7846]/20 shadow-xs hover:border-[#243821] text-xs font-semibold text-gray-700 hover:text-[#243821] transition-all min-h-[40px]"
        >
          <i :class="i.icon" class="text-sm text-[#9B7846]"></i>
          <span>{{ i.title }}</span>
        </a>
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
    title: "Instagram",
    icon: "fab fa-instagram",
    url: "https://instagram.com/vambleapartments",
  },
  {
    title: "WhatsApp Chat",
    icon: "fab fa-whatsapp",
    url: "https://wa.me/2349064645461",
  },
  {
    title: "Twitter / X",
    icon: "fab fa-twitter",
    url: "https://twitter.com/vambleapartments",
  },
];

const isLoading = ref(false);
async function handleSubmit() {
  isLoading.value = true;
  sendMessage(form)
    .then((res) => {
      if (res.status === 200) {
        toast.success("Message dispatched to concierge!");
        form.name = form.email = form.body = "";
        isLoading.value = false;
      }
    })
    .catch((err) => {
      toast.error(err?.response?.data?.message || "Failed to dispatch message");
      isLoading.value = false;
    });
}
</script>
