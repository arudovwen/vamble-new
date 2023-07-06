<template>
  <div class="text-left">
    <table>
      <tbody>
        <tr>
          <td class="pr-6 py-2 text-[15px] font-bold">Full name</td>
          <td class="px-6 py-2 text-[15px] capitalize">
            {{ formData.name }}
          </td>
        </tr>
        <tr>
          <td class="pr-6 py-2 text-[15px] font-bold">E-mail</td>
          <td class="px-6 py-2 text-[15px]">{{ formData.email }}</td>
        </tr>
        <tr>
          <td class="pr-6 py-2 text-[15px] font-bold">Phone number</td>
          <td class="px-6 py-2 text-[15px]">{{ formData.phone }}</td>
        </tr>
        <tr>
          <td class="pr-6 py-2 text-[15px] font-bold">Gender</td>
          <td class="px-6 py-2 text-[15px] capitalize">
            {{ formData.gender }}
          </td>
        </tr>
        <tr>
          <td class="pr-6 py-2 text-[15px] font-bold">Nationality</td>
          <td class="px-6 py-2 text-[15px] capitalize">
            {{ formData.nationality }}
          </td>
        </tr>
        <tr>
          <td class="pr-6 py-2 text-[15px] font-bold">Address</td>
          <td class="px-6 py-2 text-[15px]">{{ formData.address }}</td>
        </tr>
        <tr>
          <td class="pr-6 py-2 text-[15px] font-bold">Check-in Date</td>
          <td class="px-6 py-2 text-[15px]">
            {{ moment(formData.checkin).format("ll") }}
          </td>
        </tr>
        <tr>
          <td class="pr-6 py-2 text-[15px] font-bold">Check-in Date</td>
          <td class="px-6 py-2 text-[15px]">
            {{ moment(formData.checkout).format("ll") }}
          </td>
        </tr>
        <tr>
          <td class="pr-6 py-2 text-[15px] font-bold">Room category</td>
          <td class="px-6 py-2 text-[15px] capitalize">
            {{ formData.category }}
          </td>
        </tr>
        <tr>
          <td class="pr-6 py-2 text-[15px] font-bold">Room type</td>
          <td class="px-6 py-2 text-[15px] capitalize">{{ formData.type }}</td>
        </tr>
        <tr>
          <td class="pr-6 py-2 text-[15px] font-bold">Number of rooms</td>
          <td class="px-6 py-2 text-[15px]">{{ formData.no_of_rooms }}</td>
        </tr>
        <tr>
          <td class="pr-6 py-2 text-[15px] font-bold">Number of guests</td>
          <td class="px-6 py-2 text-[15px]">{{ formData.no_of_guests }}</td>
        </tr>
      </tbody>
    </table>
    <div class="text-left mb-6 mt-6 sm:max-w-[200px] ml-auto">
      <label class="block mb-2 text-xs">Enter coupon (Optional)</label>

      <input
        v-model="formData.coupon"
        class="border px-3 py-3 rounded-lg w-full outline-none focus:border-[#2c3e50]/20"
        placeholder="Provide coupon code"
        minlength="6"
        maxlength="6"
      />
    </div>
    <div class="grid grid-cols-2 gap-x-6 gap-y-2">
      <span class="text-right text-lg">Price per night</span>
      <span class="text-right text-lg">{{
        currencyFormat(selectedRoom.price)
      }}</span>
      <span></span>
      <span class="text-right text-lg"
        >{{ formData.no_of_rooms }} {{ formData.category }}(s),
        {{ totalNights }} night(s)</span
      >
      <span class="text-right text-lg">Subtotal</span>
      <span class="text-right text-lg">{{ currencyFormat(totalPrice) }}</span>
      <span class="text-right text-lg">Coupon discount</span>
      <span class="text-right text-lg">{{ currencyFormat(discount) }}</span>

      <span class="text-right text-2xl form-bold">Total price</span>
      <span class="text-right text-3xl font-bold">{{
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
            class="fa fa-spinner ml-2"
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

const toast = useToast();
const discount = ref(0);
const stage = inject("stage");
const formData = inject("formData");
const currencyFormat = inject("currencyFormat");
const types = inject("types");
const totalPrice = computed(() => {
  return formData.no_of_rooms * selectedRoom.value.price * totalNights.value;
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
const totalNights = inject("totalNights");
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
// function handleHotelPayment() {
//   isLoading.value = false;
//   payType.value = "hotel";
//   isLoading.value = true;
//   formData.total_price = totalDiscountedPrice.value;
//   formData.payment_type = "pay at hotel";
//   formData.payment_status = "pending";
//   formData.status = "reserved";
//   formData.price_per_night = selectedRoom.value.price;
//   formData.room_id = selectedRoom.value.id;

//   payAtHotel(formData)
//     .then((res) => {
//       if (res.status == 201) {
//         formData.bookingNo = res.data.booking_no;
//         stage.value++;
//         isLoading.value = false;
//       }
//     })
//     .catch(() => {
//       isLoading.value = false;
//     });
// }

function handleOnlinePayment() {
  isLoading.value = false;
  payType.value = "online";
  isLoading.value = true;
  formData.total_price = totalDiscountedPrice.value;
  formData.payment_type = "online";
  formData.payment_status = "pending";
  formData.status = "reserved";
  formData.price_per_night = selectedRoom.value.price;
  formData.room_id = selectedRoom.value.id;
  // handelOnComplete();
  paystackPayment(formData, handelOnComplete, onClose);
}
function handelOnComplete(response) {
  formData.payment_status = "paid";
  payAtHotel(formData)
    .then((res) => {
      if (res.status == 201) {
        formData.bookingNo = res.data.booking_no;
        formData.response = response;
        addTransaction(formData).then((resp) => {
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
