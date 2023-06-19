import PaystackPop from "@paystack/inline-js";
// import { payAtHotel } from "@/services/roomservice";

const paystack = new PaystackPop();
export default function paystackPayment(data, handelOnComplete, onClose) {
  paystack.newTransaction({
    key: process.env.VUE_APP_PAYSTACK_KEY,
    email: data.email,
    amount: data.total_price * 100,
    onSuccess: (transaction) => {
      console.log(transaction);
      handelOnComplete(transaction);
    },
    onCancel: () => {
      // user closed popup
      onClose();
    },
  });
}
