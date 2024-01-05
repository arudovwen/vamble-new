<template>
  <div class="bg-white rounded-lg border shadow text-left overflow-hidden">
    <div class="flex justify-between items-center bg-gray-100 px-6 py-6 mb-5">
      <div>
        <input
          v-model="queryParams.search"
          placeholder="Search full name and email"
          class="border text-sm px-3 py-2 rounded-lg outline-none focus:border-[#2c3e50]/20 w-[300px]"
        />
      </div>
      <button
        class="flex items-center justify-between text-sm rounded-lg bg-[#2c3e50] border border-[#2c3e50] text-white px-5 py-2 hover:opacity-90 active:scale-95"
      >
        Export
      </button>
    </div>
    <div class="w-full pb-6">
      <table class="w-full" v-if="!loading">
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
            <td class="px-6 py-6 text-sm font-normal capitalize">
              {{ td.name }}
            </td>
            <td class="px-6 py-6 text-sm font-normal capitalize">
              {{ td.email }}
            </td>
            <td class="px-6 py-6 text-sm font-normal capitalize">
              {{ td.phone }}
            </td>
            <td class="px-6 py-6 text-sm font-normal capitalize">
              {{ td.address }}
            </td>
            <td class="px-6 py-6 text-sm font-normal capitalize">
              {{ td.gender }}
            </td>
            <td class="px-6 py-6 text-sm font-normal capitalize">
              {{ td.nationality }}
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <PaginationComponent v-if="!loading" />
      </div>
      <div>
        <AppLoader v-if="loading" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, provide, onMounted, ref, watch } from "vue";
import PaginationComponent from "@/components/PaginationComponent.vue";
import { getUsers } from "@/services/userservices";
import debounce from "lodash/debounce";
import AppLoader from "@/components/AppLoader";

const queryParams = reactive({
  pageNumber: 1,
  pageSize: 10,
  pageCount: 0,
  total: 0,
  search: "",
});

provide("queryParams", queryParams);
const thead = ["name", "email", "phone", "address", "gender", "nationality"];
const tbody = ref([]);

onMounted(() => {
  getData();
});
const loading = ref(true);
function getData() {
  loading.value = true;
  getUsers(queryParams).then((res) => {
    if (res.status === 200) {
      tbody.value = res.data.data;
      queryParams.total = res.data.total;
      loading.value = false;
    }
  });
}
const debounceSearch = debounce(() => {
  getData();
}, 1500);
watch(
  () => queryParams.search,
  () => {
    debounceSearch();
  }
);
watch(
  () => [queryParams.pageNumber],
  () => {
    getData();
  }
);
</script>
