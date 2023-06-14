<template>
  <div class="bg-white rounded-lg border shadow text-left overflow-hidden">
    <div class="flex justify-between items-center bg-gray-100 px-6 py-4 mb-5">
      <div>
        <input
          placeholder="Search full name and email"
          class="border text-sm px-3 py-2 rounded-lg outline-none focus:border-[#2c3e50]/20 w-[300px]"
        />
      </div>
      <button
        class="flex items-center justify-between text-sm rounded-lg bg-[#2c3e50] border border-[#2c3e50] text-white px-5 py-2 hover:opacity-90 active:scale-95"
      >
        Add room
      </button>
    </div>
    <div class="w-full pb-6">
      <table class="w-full">
        <thead class="w-full">
          <tr class="w-full">
            <th
              v-for="th in thead"
              :key="th"
              class="px-6 py-2 text-xs font-semibold capitalize border-b"
            >
              {{ th }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(td, tid) in tbody" :key="tid" class="border-b">
            <td class="px-6 py-4 text-sm font-normal capitalize">
              {{ td.name }}
            </td>
            <td class="px-6 py-4 text-sm font-normal capitalize">
              {{ td.email }}
            </td>
            <td class="px-6 py-4 text-sm font-normal capitalize">
              {{ td.phone }}
            </td>
            <td class="px-6 py-4 text-sm font-normal capitalize">
              {{ td.address }}
            </td>
            <td class="px-6 py-4 text-sm font-normal capitalize">
              {{ td.gender }}
            </td>
            <td class="px-6 py-4 text-sm font-normal capitalize">
              {{ td.nationality }}
            </td>
            <td
              class="px-4 py-4 text-sm font-normal capitalize flex gap-x-4 justify-center"
            >
              <button class="text-xs">Edit</button>
              <button class="text-xs">Drop</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <PaginationComponent />
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, provide } from "vue";
import PaginationComponent from "@/components/PaginationComponent.vue";
const queryParams = reactive({
  pageNumber: 1,
  pageSize: 15,
  pageCount: 0,
  total: 0,
});
provide("queryParams", queryParams);
const thead = [
  "Catgory",
  "type",
  "name",
  "address",
  "description",
  "floor",
  "max guests",
  "price",
  "",
];
const tbody = [
  {
    name: "John doe",
    email: "jdoe@email.com",
    phone: "08160724663",
    address: "Lagos",
    gender: "Male",
    nationality: "Nigerian",
  },
];
</script>
