<template>
  <div
    class="bg-white rounded-2xl border border-[#9B7846]/20 shadow-sm text-left overflow-hidden"
  >
    <!-- Toolbar -->
    <div
      class="p-6 border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#FAF8F5]"
    >
      <div class="relative w-full sm:w-80">
        <i
          class="fa fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs"
        ></i>
        <input
          v-model="queryParams.search"
          placeholder="Search promotional coupon codes..."
          class="pl-9 pr-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#9B7846] outline-none text-xs w-full bg-white shadow-xs"
        />
      </div>

      <div class="flex items-center gap-3">
        <button
          @click="getData"
          class="p-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-[#243821] text-xs font-semibold shadow-xs transition-colors"
          title="Refresh"
        >
          <i class="fa fa-sync-alt" :class="{ 'fa-spin': loading }"></i>
        </button>
        <button
          @click="openAddModal"
          class="inline-flex items-center gap-2 bg-[#243821] hover:bg-[#182716] text-white px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold shadow-sm transition-all active:scale-95"
        >
          <i class="fa fa-plus"></i>
          <span>Create Coupon</span>
        </button>
      </div>
    </div>

    <!-- Data Table -->
    <div class="w-full overflow-x-auto">
      <div v-if="loading" class="py-16 text-center text-gray-400">
        <i class="fa fa-spinner fa-spin text-2xl text-[#9B7846]"></i>
        <p class="mt-2 text-xs">Loading coupons...</p>
      </div>

      <div v-else-if="!tbody.length" class="py-16 text-center text-gray-400">
        <i class="fa fa-tags text-3xl mb-2 text-gray-300"></i>
        <p class="text-sm font-medium text-gray-600">No active coupons</p>
        <p class="text-xs text-gray-400 mt-1">
          Create a promotional code to offer guests booking discounts
        </p>
      </div>

      <table v-else class="w-full text-left font-sans border-collapse">
        <thead>
          <tr
            class="text-[11px] uppercase tracking-wider text-gray-500 bg-[#FAF8F5] border-b border-gray-200"
          >
            <th class="px-6 py-4 font-bold">Promo Voucher</th>
            <th class="px-6 py-4 font-bold">Discount Value</th>
            <th class="px-6 py-4 font-bold">Calculation Rule</th>
            <th class="px-6 py-4 font-bold">Usage Count</th>
            <th class="px-6 py-4 font-bold">Campaign Status</th>
            <th class="px-6 py-4 font-bold text-center">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 text-xs">
          <tr
            v-for="td in tbody"
            :key="td.id"
            class="hover:bg-[#FAF8F5]/60 transition-colors group"
          >
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div
                  class="w-9 h-9 rounded-xl bg-[#9B7846]/10 text-[#9B7846] flex items-center justify-center text-xs border border-[#9B7846]/20 group-hover:bg-[#9B7846] group-hover:text-white transition-colors"
                >
                  <i class="fa fa-ticket-alt"></i>
                </div>
                <div>
                  <span
                    class="px-2.5 py-1 rounded-lg bg-gray-100 font-mono font-bold text-xs text-[#9B7846] border border-gray-200 tracking-wider inline-block"
                  >
                    {{ td.coupon }}
                  </span>
                  <span class="block text-[10px] text-gray-400 mt-0.5">ID #{{ td.id }}</span>
                </div>
              </div>
            </td>
            <td class="px-6 py-4">
              <span class="font-serif font-bold text-base text-[#243821] block">
                {{
                  td.type === "percentage"
                    ? `${td.discount}% OFF`
                    : `₦${Number(td.discount).toLocaleString()} OFF`
                }}
              </span>
            </td>
            <td class="px-6 py-4 capitalize text-gray-600">
              <span class="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider bg-gray-100 border border-gray-200">
                {{ td.type === "percentage" ? "Percentage Reduction" : "Flat Cash Subtraction" }}
              </span>
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center gap-1.5 font-mono text-gray-700">
                <i class="fa fa-users text-gray-400 text-xs"></i>
                <span class="font-bold">{{ td.count || 0 }}</span>
                <span class="text-gray-400 text-[11px]">redemptions</span>
              </div>
            </td>
            <td class="px-6 py-4">
              <span
                class="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider inline-flex items-center gap-1 border"
                :class="
                  td.status
                    ? 'bg-green-50 text-green-800 border-green-200'
                    : 'bg-gray-100 text-gray-600 border-gray-200'
                "
              >
                <span class="w-1.5 h-1.5 rounded-full" :class="td.status ? 'bg-green-600' : 'bg-gray-400'"></span>
                {{ td.status ? "Active & Live" : "Disabled" }}
              </span>
            </td>
            <td class="px-6 py-4 text-center">
              <div class="inline-flex items-center gap-2">
                <button
                  @click="openEditModal(td)"
                  class="px-3 py-1.5 rounded-xl bg-[#243821]/10 text-[#243821] hover:bg-[#243821] hover:text-white font-semibold text-xs transition-all active:scale-95 flex items-center gap-1"
                >
                  <i class="fa fa-edit text-[11px]"></i>
                  <span>Edit</span>
                </button>
                <button
                  @click="handleDelete(td.id)"
                  class="w-7 h-7 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all flex items-center justify-center text-xs active:scale-95"
                  title="Delete coupon"
                >
                  <i class="fa fa-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination Footer -->
    <div
      v-if="!loading && tbody.length"
      class="p-4 border-t border-gray-100 bg-[#FAF8F5]"
    >
      <PaginationComponent />
    </div>

    <!-- Add/Edit Modal -->
    <TransitionRoot as="template" :show="isOpen">
      <Dialog as="div" class="relative z-50" @close="isOpen = false">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div
            class="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />
        </TransitionChild>

        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div
            class="flex min-h-full items-center justify-center p-4 text-center sm:p-0"
          >
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg border border-[#9B7846]/20 p-0"
              >
                <AddCoupon v-if="isOpen && isAdd" />
                <EditCoupon v-if="isOpen && isEdit" :detail="detail" />
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { reactive, provide, onMounted, ref, watch } from "vue";
import PaginationComponent from "@/components/PaginationComponent.vue";
import { getCoupons, deleteCoupon } from "@/services/userservices";
import debounce from "lodash/debounce";
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import AddCoupon from "./coupon/AddCoupon";
import EditCoupon from "./coupon/EditCoupon";
import { useToast } from "vue-toast-notification";

const toast = useToast();

const isAdd = ref(false);
const isEdit = ref(false);
const isOpen = ref(false);
const detail = ref(null);
const loading = ref(true);
const tbody = ref([]);

const queryParams = reactive({
  pageNumber: 1,
  pageSize: 10,
  pageCount: 0,
  total: 0,
  search: "",
});

provide("queryParams", queryParams);
provide("isEdit", isEdit);
provide("isAdd", isAdd);
provide("isOpen", isOpen);
provide("getData", getData);

onMounted(() => {
  getData();
});

function getData() {
  loading.value = true;
  getCoupons(queryParams)
    .then((res) => {
      if (res.status === 200) {
        tbody.value = res.data.data || [];
        queryParams.total = res.data.total || 0;
      }
      loading.value = false;
    })
    .catch(() => {
      loading.value = false;
    });
}

const debounceSearch = debounce(() => {
  getData();
}, 600);

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

function openAddModal() {
  isEdit.value = false;
  isAdd.value = true;
  isOpen.value = true;
}

function openEditModal(coupon) {
  detail.value = coupon;
  isAdd.value = false;
  isEdit.value = true;
  isOpen.value = true;
}

function handleDelete(id) {
  if (window.confirm("Are you sure you want to drop this coupon?")) {
    deleteCoupon(id)
      .then(() => {
        toast.success("Coupon removed");
        getData();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.errors || "Error deleting coupon");
      });
  }
}
</script>
