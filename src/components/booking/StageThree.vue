<template>
  <div class="text-left">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
      <div>
        <div class="text-[13px] font-bold">Full name</div>
        <div class="text-[15px] capitalize">
          {{ formData.name }}
        </div>
      </div>
      <div>
        <div class="text-[13px] font-bold">E-mail</div>
        <div class="text-[15px]">{{ formData.email }}</div>
      </div>
      <div>
        <div class="text-[13px] font-bold">Phone number</div>
        <div class="text-[15px]">{{ formData.phone }}</div>
      </div>
      <div>
        <div class="text-[13px] font-bold">Gender</div>
        <div class="text-[15px] capitalize">
          {{ formData.gender }}
        </div>
      </div>
      <div>
        <div class="text-[13px] font-bold">Nationality</div>
        <div class="text-[15px] capitalize">
          {{ formData.nationality }}
        </div>
      </div>
      <div>
        <div class="text-[13px] font-bold">Address</div>
        <div class="text-[15px]">{{ formData.address }}</div>
      </div>
      <div>
        <div class="text-[13px] font-bold">Check-in Date</div>
        <div class="text-[15px]">
          {{ moment(formData.checkin).format("ll") }}
        </div>
      </div>
      <div>
        <div class="text-[13px] font-bold">Check-in Date</div>
        <div class="text-[15px]">
          {{ moment(formData.checkout).format("ll") }}
        </div>
      </div>
      <div>
        <div class="text-[13px] font-bold">Room category</div>
        <div class="text-[15px] capitalize">
          {{ formData.category }}
        </div>
      </div>
      <div>
        <div class="text-[13px] font-bold">Room type</div>
        <div class="text-[15px] capitalize">
          {{ formData.type }}
        </div>
      </div>
      <div>
        <div class="text-[13px] font-bold">Number of rooms</div>
        <div class="text-[15px]">{{ formData.no_of_rooms }}</div>
      </div>
      <div>
        <div class="text-[13px] font-bold">Number of guests</div>
        <div class="text-[15px]">{{ formData.no_of_guests }}</div>
      </div>
    </div>

    <div class="text-left mb-6 mt-6 sm:max-w-[200px] ml-auto">
      <label class="block mb-1 text-xs">Enter coupon (Optional)</label>

      <input
        v-model="formData.coupon"
        class="border px-3 py-3 rounded-lg w-full outline-none focus:border-[#2c3e50]/20"
        placeholder="Provide coupon code"
        minlength="6"
        maxlength="6"
      />
    </div>
    <div class="grid grid-cols-2 gap-x-6 gap-y-2">
      <span class="text-right text-sm">Price per night</span>
      <span class="text-right text-sm">{{
        currencyFormat(selectedRoom?.price)
      }}</span>
      <span></span>
      <span class="text-right text-sm"
        >{{ formData.no_of_rooms }} {{ formData.category }}(s),
        {{ totalNights }} night(s)</span
      >
      <span class="text-right text-sm">Subtotal</span>
      <span class="text-right text-sm">{{ currencyFormat(totalPrice) }}</span>
      <span class="text-right text-sm">Coupon discount</span>
      <span class="text-right text-sm">{{ currencyFormat(discount) }}</span>

      <span class="text-right text-xl form-bold">Total price</span>
      <span class="text-right text-xl font-bold">{{
        currencyFormat(totalDiscountedPrice)
      }}</span>
    </div>
    <div
      class="flex flex-col lg:flex-row gap-5 items-center justify-between mt-10 max-w-[400px] sm:max-w-none mx-auto w-full"
    >
      <button
        @click="stage--"
        v-if="stage !== 4"
        type="button"
        :disabled="stage === 1 || isLoading"
        class="capitalize bg-transparent border border-gray-300 text-sm px-6 py-3 w-full lg:w-[150px] hover:opacity-80 active:scale-95 disabled:active:scale-100 rounded-lg disabled:cursor-not-allowed"
      >
        Back
      </button>

      <div v-if="stage === 3" class="flex flex-col lg:flex-row gap-5">
        <!-- <button
          @click="handleHotelPayment"
          type="button"
          :disabled="isLoading"
          class="capitalize bg-[#2c3e50] text-white text-sm px-6 py-3 w-full lg:w-[150px] hover:opacity-80 active:scale-95 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span> Pay at hotel</span>
          <i
            class="fa fa-spinner ml-2"
            v-if="isLoading && payType == 'hotel'"
            aria-hidden="true"
          ></i>
        </button> -->
        <button
          v-if="stage === 3"
          @click="handleOnlinePayment"
          type="button"
          :disabled="isLoading"
          class="capitalize bg-[#2d5c1f] text-white text-sm px-6 py-3 w-full lg:w-[200px] hover:opacity-80 active:scale-95 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Complete payment
          <i
            class="fa fa-spinner fa-spin ml-2"
            v-if="isLoading && payType == 'online'"
            aria-hidden="true"
          ></i>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import {
  payAtHotel,
  checkCoupon,
  addTransaction,
} from "@/services/roomservice";
import { inject, computed, watch, ref } from "vue";
import moment from "moment";
import { useToast } from "vue-toast-notification";
// eslint-disable-next-line no-unused-vars
import paystackPayment from "@/plugins/paystack";

const totalNights = inject("totalNights");
const toast = useToast();
const discount = ref(0);
const stage = inject("stage");
const formData = inject("formData");
const currencyFormat = inject("currencyFormat");
const types = inject("types");
const totalPrice = computed(() => {
  return formData.no_of_rooms * selectedRoom.value?.price * totalNights.value;
});
const totalDiscountedPrice = computed(() => {
  return totalPrice.value - discount.value;
});
const selectedRoom = computed(() =>
  types.value.find(
    (i) =>
      i.flat_name.toLowerCase() === formData.category.toLowerCase() &&
      i.flat_type.toLowerCase() === formData.type.toLowerCase()
  )
);

function handleCoupon() {
  const data = {
    coupon: formData.coupon,
    email: formData.email,
  };
  checkCoupon(data)
    .then((res) => {
      if (res.status === 200) {
        toast.success("Coupon applied");
        if (res.data.type === "percentage") {
          discount.value = (res.data.discount / 100) * totalPrice.value;
        } else {
          discount.value = res.data.discount;
        }
      }
    })
    .catch(() => {
      toast.error("Invalid coupon");
      // formData.coupon = "";
      discount.value = 0;
    });
}
watch(
  () => [formData.coupon],
  () => {
    if (formData.coupon.length === 6) {
      handleCoupon();
    }
  }
);
const isLoading = ref(false);
const payType = ref("");

function handleOnlinePayment() {
  isLoading.value = false;
  payType.value = "online";
  isLoading.value = true;
  formData.total_price = totalDiscountedPrice.value;
  formData.payment_type = "online";
  formData.payment_status = "pending";
  formData.status = "reserved";
  formData.price_per_night = selectedRoom.value?.price;
  formData.room_id = selectedRoom.value?.id;

  // handelOnComplete();
  paystackPayment(
    {
      ...formData,
      checkin: moment(formData.checkin).format("yyyy-MM-DD"),
      checkout: moment(formData.checkout).format("yyyy-MM-DD"),
    },
    handelOnComplete,
    onClose
  );
}
function handelOnComplete(response) {
  formData.payment_status = "paid";
  payAtHotel(formData)
    .then((res) => {
      if (res.status == 201) {
        formData.bookingNo = res.data.booking_no;
        formData.response = response;
        addTransaction({
          ...formData,
          checkin: moment(formData.checkin).format("yyyy-MM-DD"),
          checkout: moment(formData.checkout).format("yyyy-MM-DD"),
        }).then((resp) => {
          if (resp.status === 201) {
            stage.value++;
            isLoading.value = false;
          }
        });
      }
    })
    .catch(() => {
      isLoading.value = false;
    });
}
// eslint-disable-next-line no-unused-vars
function onClose() {
  isLoading.value = false;
}
</script>
