<template>
  <div class="p-10">
    <div class="text-center max-w-[350px] mx-auto">
      <img
        src="@/assets/images/check.gif"
        width="150"
        height="150"
        class="mx-auto"
        style="width: 150px; height: 150px"
      />

      <h4 class="text-2xl font-bold mb-2">
        Booking No: #{{ formData.bookingNo }}
      </h4>
      <p>
        Your booking has been made, and your reservation is being processed.
      </p>
      <p>Please ensure you come with a valid means of identification.</p>
      <div class="mt-8">
        <button
          @click="refresh"
          type="button"
          class="capitalize bg-[#2d5c1f] text-white text-sm px-6 py-3 rounded-lg hover:opacity-80 active:scale-95"
        >
          Reserve another
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { inject } from "vue";

const formData = inject("formData");
// const stage = inject("stage");

function refresh() {
  window.location.reload();
}
</script>
