<template>
  <div
    class="flex justify-between items-center px-6 pt-4 text-xs sm:text-sm text-[#344054]"
  >
    <span>Page {{ queryParams.pageNumber || 1 }} of {{ lastpage || 1 }}</span>
    <span class="flex items-center gap-x-4">
      <button
        :disabled="queryParams.pageNumber == 1"
        @click="prev"
        class="px-4 py-2 text-xs sm:text-sm border border-[#D0D5DD] rounded-lg hover:bg-gray-50 text-[#344054] h-9 leading-[normal] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <button
        :disabled="queryParams.pageNumber == lastpage"
        @click="next"
        class="px-4 py-2 text-xs sm:text-sm border border-[#D0D5DD] rounded-lg hover:bg-gray-50 text-[#344054] h-9 leading-[normal] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </span>
  </div>
</template>
<script setup>
import { inject, computed } from "vue";

const queryParams = inject("queryParams");

function next() {
  queryParams.pageNumber++;
}
function prev() {
  if (queryParams.pageNumber > 1) {
    queryParams.pageNumber--;
  }
}

const lastpage = computed(() => {
  return Math.ceil(queryParams.total / queryParams.pageSize) || 1;
});
</script>
