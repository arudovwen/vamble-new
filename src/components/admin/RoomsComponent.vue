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
          placeholder="Search rooms or suites..."
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
          <span>Add New Room</span>
        </button>
      </div>
    </div>

    <!-- Data Table -->
    <div class="w-full overflow-x-auto">
      <div v-if="loading" class="py-16 text-center text-gray-400">
        <i class="fa fa-spinner fa-spin text-2xl text-[#9B7846]"></i>
        <p class="mt-2 text-xs">Loading rooms catalogue...</p>
      </div>

      <div v-else-if="!tbody.length" class="py-16 text-center text-gray-400">
        <i class="fa fa-bed text-3xl mb-2 text-gray-300"></i>
        <p class="text-sm font-medium text-gray-600">No rooms available</p>
        <p class="text-xs text-gray-400 mt-1">
          Click "Add New Room" above to create one
        </p>
      </div>

      <table v-else class="w-full text-left font-sans border-collapse">
        <thead>
          <tr
            class="text-[11px] uppercase tracking-wider text-gray-500 bg-[#FAF8F5] border-b border-gray-200"
          >
            <th class="px-6 py-4 font-bold">Suite Details</th>
            <th class="px-6 py-4 font-bold">Residence Class</th>
            <th class="px-6 py-4 font-bold">Code</th>
            <th class="px-6 py-4 font-bold">Nightly Rate</th>
            <th class="px-6 py-4 font-bold">Occupancy</th>
            <th class="px-6 py-4 font-bold">Location</th>
            <th class="px-6 py-4 font-bold">Amenities</th>
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
                  class="w-9 h-9 rounded-xl bg-[#243821]/10 text-[#243821] flex items-center justify-center font-serif font-bold text-sm border border-[#243821]/10 shrink-0 group-hover:bg-[#243821] group-hover:text-white transition-colors"
                >
                  <i class="fa fa-bed text-xs"></i>
                </div>
                <div>
                  <span class="font-serif font-bold text-sm text-[#1A1816] block">
                    {{ td.flat_name }}
                  </span>
                  <span class="text-[11px] text-gray-400">ID #{{ td.id }}</span>
                </div>
              </div>
            </td>
            <td class="px-6 py-4">
              <span
                class="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider inline-flex items-center gap-1 border"
                :class="
                  td.flat_type === 'apartment'
                    ? 'bg-[#9B7846]/10 text-[#9B7846] border-[#9B7846]/30'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                "
              >
                <span class="w-1.5 h-1.5 rounded-full" :class="td.flat_type === 'apartment' ? 'bg-[#9B7846]' : 'bg-emerald-600'"></span>
                {{ td.flat_type }}
              </span>
            </td>
            <td class="px-6 py-4">
              <span class="px-2.5 py-1 rounded-lg bg-gray-100 font-mono font-bold text-xs text-[#9B7846] border border-gray-200">
                {{ td.room_name }}
              </span>
            </td>
            <td class="px-6 py-4">
              <span class="font-serif font-bold text-sm text-[#243821] block">
                {{ currencyFormat(td.price) }}
              </span>
              <span class="text-[10px] text-gray-400">per night</span>
            </td>
            <td class="px-6 py-4 text-gray-700">
              <div class="flex items-center gap-1.5">
                <i class="fa fa-users text-gray-400 text-xs"></i>
                <span class="font-medium">{{ td.max_occupancy }} Guests</span>
              </div>
            </td>
            <td class="px-6 py-4 text-gray-600">
              <span class="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-gray-50 border border-gray-200 text-gray-600">
                Floor {{ td.floor }}
              </span>
            </td>
            <td
              class="px-6 py-4 text-gray-500 max-w-[200px] truncate"
              :title="td.description"
            >
              {{ td.description }}
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
                  title="Delete room"
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

    <!-- Add / Edit Modal -->
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
                class="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-xl border border-[#9B7846]/20 p-0"
              >
                <AddRoom v-if="isOpen && isAdd" />
                <EditRoom v-if="isOpen && isEdit" :detail="detail" />
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { reactive, provide, onMounted, ref, watch, inject } from "vue";
import PaginationComponent from "@/components/PaginationComponent.vue";
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { getRooms, deleteRoom } from "@/services/roomservice";
import debounce from "lodash/debounce";
import AddRoom from "./rooms/AddRoom";
import EditRoom from "./rooms/EditRoom";
import { useToast } from "vue-toast-notification";

const toast = useToast();
const currencyFormat = inject(
  "currencyFormat",
  (v) => `₦${Number(v || 0).toLocaleString()}`
);

const detail = ref(null);
const isAdd = ref(false);
const isEdit = ref(false);
const isOpen = ref(false);
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
  getRooms(queryParams)
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

function openEditModal(room) {
  detail.value = room;
  isAdd.value = false;
  isEdit.value = true;
  isOpen.value = true;
}

function handleDelete(id) {
  if (window.confirm("Are you sure you want to delete this room?")) {
    deleteRoom(id)
      .then(() => {
        toast.success("Room deleted successfully");
        getData();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.errors || "Error deleting room");
      });
  }
}
</script>
