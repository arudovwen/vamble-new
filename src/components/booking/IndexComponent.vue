<template>
  <section class="relative pb-16 flex-1">
    <div class="flex z-[2] w-full border-b border-[#a18463]/20 mb-10 sm:mb-20">
      <div
        class="w-[80%] sm:w-[70%] lg:w-[600px] pt-40 pb-10 text-left px-6 sm:px-8 lg:px-16"
      >
        <div class="mb-4">
          <h1 class="text-[#2d5c1f] mb-3 lg:mb-4 zendaya text-5xl font-bold">
            Reserve your stay
          </h1>
          <p class="text-base xl:text-lg text-left">
            You don't need to be physically present before you book an apartment
            with us, just use our booking engine to reserve your stay with ease
            today.
          </p>
        </div>
      </div>

      <div
        class="flex-1 overflow-hidden bg-[url('@/assets/images/rooms/sitting9.jpg')] bg-cover bg-center"
      >
        <div
          class="w-full h-full flex justify-start items-center bg-gray-500/20 backdrop-brightness-50"
        ></div>
      </div>
    </div>
    <div
      class="w-full lg:w-[900px] lg:border border-[#a18463]/20 p-6 sm:p-8 mx-auto rounded-lg mb-10 bg-white shadow"
    >
      <form>
        <div
          v-if="stage !== 4"
          class="grid grid-cols-4 gap-x-2 sm:gap-x-4 mb-12"
        >
          <div
            v-for="n in stages"
            :key="n.id"
            :class="` transition-all flex items-center justify-center duration-500 px-2 py-4 rounded-full capitalize border border-[#2c3e50] text-xs sm:text-[15px] zendaya font-bold leading-none relative ${
              stage >= n.id ? 'bg-[#2c3e50]  text-white' : ''
            } after:content-[''] after:absolute after:-right-[10px] sm:after:-right-[18px] after:border-b 
            after:h-[2px] after:-mt-[1px]
            after:w-[10px] sm:after:w-[18px] after:border-[#2c3e50] after:top-[50%] after:last:content-none`"
          >
            {{ n.text }}
          </div>
        </div>
        <div class="max-w-[400px] sm:max-w-[700px] xl:max-w-[900px] mx-auto">
          <StageOne v-if="stage === 1" />
          <StageTwo v-if="stage === 2" />
          <StageThree v-if="stage === 3" />
          <StageFour v-if="stage === 4" />
        </div>

        <!-- <div
          class="flex flex-col lg:flex-row gap-5 items-center justify-between mt-10 max-w-[400px] sm:max-w-none mx-auto"
        >
          <button
            @click="stage--"
            v-if="stage !== 4"
            type="button"
            :disabled="stage === 1"
            class="capitalize bg-transparent border border-gray-300 text-sm px-6 py-3 w-full lg:w-[150px] hover:opacity-80 active:scale-95 disabled:active:scale-100 rounded-lg disabled:cursor-not-allowed"
          >
            Back
          </button>
          <button
            @click="stage++"
            v-if="stage < 3"
            type="button"
            :disabled="!canProceed"
            class="capitalize bg-[#2d5c1f] text-white text-sm px-6 py-3 w-full lg:w-[150px] hover:opacity-80 active:scale-95 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Next
          </button>
          <div
            v-if="stage === 3"
            class="flex flex-col lg:flex-row gap-5 w-full"
          >
            <button
              @click="stage++"
              type="button"
              class="capitalize bg-[#2c3e50] text-white text-sm px-6 py-3 w-full lg:w-[150px] hover:opacity-80 active:scale-95 rounded-lg disabled:cursor-not-allowed"
            >
              Pay at hotel
            </button>
            <button
              v-if="stage === 3"
              @click="stage++"
              type="button"
              class="capitalize bg-[#2d5c1f] text-white text-sm px-6 py-3 w-full lg:w-[200px] hover:opacity-80 active:scale-95 rounded-lg disabled:cursor-not-allowed"
            >
              Complete payment
            </button>
          </div>
        </div> -->
      </form>
    </div>
  </section>
</template>
<script setup>
import StageOne from "./StageOne.vue";
import StageTwo from "./StageTwo.vue";
import StageThree from "./StageThree.vue";
import StageFour from "./StageFour.vue";
import { ref, reactive, provide, onMounted, computed } from "vue";
import store from "@/store";
import moment from "moment";
import { useRoute } from "vue-router";
import { getRoomCategories, getRoomTypes } from "@/services/roomservice";

const route = useRoute();
const userInfo = computed(() => store.getters.userInfo);
const formData = reactive({
  checkin: route.query.checkin ? new Date(route.query.checkin) : new Date(),
  checkout: route.query.checkout
    ? new Date(route.query.checkout)
    : new Date(moment().add(1, "days")),
  category: route.query.category || "",
  type: route.query.type || "",
  no_of_rooms: route.query.no_of_rooms || 1,
  no_of_guests: route.query.no_of_guests || 1,
  name: userInfo.value.name || "",
  email: userInfo.value.email || "",
  phone: userInfo.value.phone || "",
  gender: userInfo.value.gender || "",
  nationality: userInfo.value.nationality || "",
  address: userInfo.value.address || "",
  coupon: "",
  total_price: 0,
  payment_type: "",
  payment_status: "",
  status: "",
  price_per_night: "",
  room_id: "",
  flats: [],
  bookingNo: null,
  response: null,
});
const categories = ref([]);
const types = ref([]);
const stage = ref(1);
const stages = [
  {
    id: 1,
    text: "reservation",
  },
  {
    id: 2,
    text: "guest details",
  },
  {
    id: 3,
    text: "complete reservation",
  },
  {
    id: 4,
    text: "summary",
  },
];
const totalNights = computed(() => {
  return moment(formData.checkout)
    .startOf("day")
    .diff(moment(formData.checkin).startOf("day"), "days");
});

onMounted(() => {
  getRoomCategories().then((res) => {
    if (res.status === 200) {
      categories.value = res.data;
    }
  });
  getRoomTypes().then((res) => {
    if (res.status === 200) {
      types.value = res.data;
    }
  });
});

provide("formData", formData);
provide("stage", stage);
provide("categories", categories);
provide("types", types);
provide("totalNights", totalNights);
</script>
,
