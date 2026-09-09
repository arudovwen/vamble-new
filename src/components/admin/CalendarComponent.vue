<template>
  <div class="space-y-6 text-left font-sans">
    <!-- Top KPI Stats Banner -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="p-5 rounded-3xl bg-white border border-[#9B7846]/20 shadow-xs flex items-center gap-4 transition-all hover:shadow-md">
        <div class="w-12 h-12 rounded-2xl bg-[#243821]/10 text-[#243821] flex items-center justify-center text-lg font-bold">
          <i class="fa fa-calendar-check"></i>
        </div>
        <div>
          <span class="block text-[10px] uppercase tracking-wider font-bold text-gray-400">Total Bookings</span>
          <span class="font-serif text-2xl font-bold text-[#1A1816]">{{ rawReservations.length }}</span>
          <span class="block text-[10px] text-gray-400 mt-0.5">{{ currentMonthLabel }}</span>
        </div>
      </div>

      <div class="p-5 rounded-3xl bg-white border border-[#9B7846]/20 shadow-xs flex items-center gap-4 transition-all hover:shadow-md">
        <div class="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-lg font-bold">
          <i class="fa fa-user-check"></i>
        </div>
        <div>
          <span class="block text-[10px] uppercase tracking-wider font-bold text-gray-400">In-House Guests</span>
          <span class="font-serif text-2xl font-bold text-emerald-700">{{ activeCheckedInCount }}</span>
          <span class="block text-[10px] text-emerald-600 font-medium mt-0.5">Active Suites Occupied</span>
        </div>
      </div>

      <div class="p-5 rounded-3xl bg-white border border-[#9B7846]/20 shadow-xs flex items-center gap-4 transition-all hover:shadow-md">
        <div class="w-12 h-12 rounded-2xl bg-[#9B7846]/10 text-[#9B7846] flex items-center justify-center text-lg font-bold">
          <i class="fa fa-percentage"></i>
        </div>
        <div>
          <span class="block text-[10px] uppercase tracking-wider font-bold text-gray-400">Occupancy Rate</span>
          <span class="font-serif text-2xl font-bold text-[#9B7846]">{{ occupancyRate }}%</span>
          <span class="block text-[10px] text-gray-400 mt-0.5">{{ totalNightsBooked }} room nights</span>
        </div>
      </div>

      <div class="p-5 rounded-3xl bg-white border border-[#9B7846]/20 shadow-xs flex items-center gap-4 transition-all hover:shadow-md">
        <div class="w-12 h-12 rounded-2xl bg-[#243821] text-white flex items-center justify-center text-lg font-bold">
          <i class="fa fa-coins"></i>
        </div>
        <div>
          <span class="block text-[10px] uppercase tracking-wider font-bold text-gray-400">Calendar Revenue</span>
          <span class="font-serif text-2xl font-bold text-[#243821]">{{ currencyFormat(totalRevenue) }}</span>
          <span class="block text-[10px] text-[#9B7846] font-medium mt-0.5">Avg {{ currencyFormat(avgDailyRate) }}/night</span>
        </div>
      </div>
    </div>

    <!-- Main Calendar Console Card -->
    <div class="bg-white rounded-3xl border border-[#9B7846]/20 shadow-sm overflow-hidden">
      <!-- Vamble Apartments Header Bar -->
      <div class="p-6 bg-[#132212] text-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <!-- Date Navigator & Title -->
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-1.5 bg-white/10 rounded-2xl p-1 border border-white/10">
            <button
              @click="prevMonth"
              class="w-9 h-9 rounded-xl hover:bg-white/15 flex items-center justify-center text-white/80 hover:text-white transition-colors"
              title="Previous Month"
            >
              <i class="fa fa-chevron-left text-xs"></i>
            </button>
            <button
              @click="goToToday"
              class="px-3 py-1.5 rounded-xl hover:bg-white/15 text-xs font-semibold text-white/90 transition-colors uppercase tracking-wider"
            >
              Today
            </button>
            <button
              @click="nextMonth"
              class="w-9 h-9 rounded-xl hover:bg-white/15 flex items-center justify-center text-white/80 hover:text-white transition-colors"
              title="Next Month"
            >
              <i class="fa fa-chevron-right text-xs"></i>
            </button>
          </div>

          <div>
            <h2 class="font-serif text-2xl font-normal text-white flex items-center gap-2.5">
              <span>{{ currentMonthYearTitle }}</span>
              <span class="text-xs font-sans uppercase tracking-widest text-[#c5a880] font-bold px-2.5 py-0.5 rounded-full bg-white/10">
                Live Occupancy
              </span>
            </h2>
            <p class="text-[11px] text-white/60 font-light mt-0.5">
              {{ filteredCalendarReservations.length }} active reservations scheduled in this view
            </p>
          </div>
        </div>

        <!-- View Mode Switcher & Tools -->
        <div class="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
          <!-- Mode Tabs -->
          <div class="bg-white/10 p-1 rounded-2xl border border-white/10 flex items-center text-xs">
            <button
              @click="viewMode = 'month'"
              :class="[
                viewMode === 'month' ? 'bg-[#9B7846] text-white font-semibold shadow-xs' : 'text-white/70 hover:text-white',
                'px-4 py-2 rounded-xl transition-all flex items-center gap-2'
              ]"
            >
              <i class="fa fa-th"></i>
              <span>Monthly Grid</span>
            </button>
            <button
              @click="viewMode = 'timeline'"
              :class="[
                viewMode === 'timeline' ? 'bg-[#9B7846] text-white font-semibold shadow-xs' : 'text-white/70 hover:text-white',
                'px-4 py-2 rounded-xl transition-all flex items-center gap-2'
              ]"
            >
              <i class="fa fa-stream"></i>
              <span>Suite Timeline (Rack)</span>
            </button>
          </div>

          <button
            @click="getData"
            class="w-10 h-10 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center transition-colors"
            title="Refresh schedule"
          >
            <i class="fa fa-sync-alt text-xs" :class="{ 'fa-spin': loading }"></i>
          </button>
        </div>
      </div>

      <!-- Filters & Suite Legend Sub-Bar -->
      <div class="p-4 px-6 border-b border-gray-100 bg-[#FAF8F5] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
        <div class="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <!-- Search -->
          <div class="relative w-full sm:w-64">
            <i class="fa fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
            <input
              v-model="searchQuery"
              placeholder="Search guest or suite..."
              class="pl-9 pr-4 py-2 rounded-xl border border-gray-300 focus:border-[#9B7846] outline-none text-xs w-full bg-white shadow-xs"
            />
          </div>

          <!-- Suite Filter -->
          <select
            v-model="selectedSuiteFilter"
            class="px-3 py-2 rounded-xl border border-gray-300 focus:border-[#9B7846] outline-none text-xs bg-white shadow-xs"
          >
            <option value="all">All Suites & Residences</option>
            <option value="Executive Suite">Executive Suite (201)</option>
            <option value="Luxury 1-Bedroom">Luxury 1-Bedroom (301)</option>
            <option value="Royal 2-Bedroom">Royal 2-Bedroom (401)</option>
            <option value="Presidential Penthouse">Presidential Penthouse (501)</option>
            <option value="Standard Room">Standard Room (101)</option>
          </select>

          <!-- Status Filter -->
          <select
            v-model="selectedStatusFilter"
            class="px-3 py-2 rounded-xl border border-gray-300 focus:border-[#9B7846] outline-none text-xs bg-white shadow-xs"
          >
            <option value="all">All Statuses</option>
            <option value="checked in">Checked In (In-House)</option>
            <option value="confirmed">Confirmed (Upcoming)</option>
            <option value="checked out">Checked Out</option>
          </select>
        </div>

        <!-- Suite Color Legend -->
        <div class="flex flex-wrap items-center gap-3 text-[11px] font-medium text-gray-600">
          <span class="flex items-center gap-1.5">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-600 ring-2 ring-emerald-100"></span> Exec Suite
          </span>
          <span class="flex items-center gap-1.5">
            <span class="w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-amber-100"></span> 1-Bed Apt
          </span>
          <span class="flex items-center gap-1.5">
            <span class="w-2.5 h-2.5 rounded-full bg-purple-600 ring-2 ring-purple-100"></span> 2-Bed Apt
          </span>
          <span class="flex items-center gap-1.5">
            <span class="w-2.5 h-2.5 rounded-full bg-rose-600 ring-2 ring-rose-100"></span> Penthouse
          </span>
          <span class="flex items-center gap-1.5">
            <span class="w-2.5 h-2.5 rounded-full bg-blue-600 ring-2 ring-blue-100"></span> Standard
          </span>
        </div>
      </div>

      <!-- VIEW 1: BESPOKE MONTHLY CALENDAR GRID -->
      <div v-if="viewMode === 'month'" class="p-6">
        <!-- Weekday Headers -->
        <div class="grid grid-cols-7 border-b border-gray-200 pb-3 mb-2 text-center text-[11px] font-semibold uppercase tracking-wider text-gray-400">
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div class="text-[#9B7846]">Sat</div>
          <div class="text-[#9B7846]">Sun</div>
        </div>

        <!-- Days Grid -->
        <div class="grid grid-cols-7 gap-2">
          <div
            v-for="(day, idx) in calendarDays"
            :key="idx"
            :class="[
              day.isCurrentMonth ? 'bg-white border-gray-200' : 'bg-gray-50/60 border-gray-100 opacity-40',
              day.isToday ? 'ring-2 ring-[#9B7846] bg-[#FAF8F5]' : '',
              'min-h-[120px] rounded-2xl border p-2 flex flex-col justify-between transition-all hover:border-[#9B7846]/60 hover:shadow-xs group text-left'
            ]"
          >
            <!-- Day Top Header -->
            <div class="flex items-center justify-between">
              <span
                :class="[
                  day.isToday
                    ? 'w-7 h-7 rounded-full bg-[#243821] text-white font-bold flex items-center justify-center text-xs shadow-xs'
                    : 'text-xs font-semibold text-[#1A1816]'
                ]"
              >
                {{ day.dayNumber }}
              </span>

              <!-- Daily Occupancy Dot -->
              <span
                v-if="day.reservations.length"
                class="px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider"
                :class="day.reservations.some(r => r.status === 'checked in') ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'"
              >
                {{ day.reservations.length }} stay{{ day.reservations.length > 1 ? 's' : '' }}
              </span>
            </div>

            <!-- Booking Cards Stack in Day Cell -->
            <div class="mt-2 space-y-1.5 flex-1">
              <div
                v-for="res in day.reservations.slice(0, 2)"
                :key="res.id"
                @click="openDetailModal(res)"
                :class="[
                  getSuiteCardBg(res.room),
                  'p-1.5 rounded-xl border text-[11px] cursor-pointer transition-all hover:scale-[1.02] hover:shadow-sm leading-tight flex items-center gap-1.5'
                ]"
              >
                <span class="w-1.5 h-1.5 rounded-full shrink-0" :class="getSuiteDotColor(res.room)"></span>
                <div class="truncate">
                  <span class="font-bold text-[#1A1816] truncate block capitalize">{{ res.user?.name || 'Guest' }}</span>
                  <span class="text-[9px] text-gray-500 truncate block">{{ getShortSuiteName(res.room) }}</span>
                </div>
              </div>

              <!-- More Stays Indicator -->
              <button
                v-if="day.reservations.length > 2"
                @click="openDayStaysModal(day)"
                class="w-full py-0.5 text-[9px] font-semibold text-[#9B7846] hover:underline text-center block"
              >
                +{{ day.reservations.length - 2 }} more stays
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- VIEW 2: LUXURY SUITE TIMELINE / RACK (GANTT) -->
      <div v-if="viewMode === 'timeline'" class="overflow-x-auto p-6">
        <div class="min-w-[900px]">
          <!-- Timeline Days Header -->
          <div class="flex border-b border-gray-200 pb-3 mb-3 text-xs font-semibold text-gray-500">
            <div class="w-60 shrink-0 font-bold uppercase tracking-wider text-[#1A1816] pl-2">
              Suites & Residences
            </div>
            <div class="flex-1 grid" :style="{ gridTemplateColumns: `repeat(${daysInCurrentMonth}, minmax(0, 1fr))` }">
              <div
                v-for="d in daysInCurrentMonth"
                :key="d"
                class="text-center font-mono text-[11px]"
                :class="isDayToday(d) ? 'font-bold text-[#9B7846]' : 'text-gray-400'"
              >
                {{ d }}
              </div>
            </div>
          </div>

          <!-- Suite Lanes -->
          <div class="space-y-3">
            <div
              v-for="suite in availableSuites"
              :key="suite.id"
              class="flex items-center rounded-2xl bg-[#FAF8F5] border border-gray-100 p-2 relative group hover:border-[#9B7846]/40 transition-colors"
            >
              <!-- Suite Identifier -->
              <div class="w-60 shrink-0 pr-4 flex items-center gap-3">
                <div class="w-9 h-9 rounded-xl bg-white border border-gray-200 text-[#243821] flex items-center justify-center text-xs font-bold shrink-0 shadow-2xs">
                  <i class="fa fa-bed"></i>
                </div>
                <div class="truncate">
                  <span class="font-serif font-bold text-xs text-[#1A1816] block truncate">{{ suite.flat_name }}</span>
                  <span class="text-[10px] text-gray-400 block">{{ suite.room_name }} &bull; {{ currencyFormat(suite.price) }}/night</span>
                </div>
              </div>

              <!-- Days Track with Reservation Bars -->
              <div class="flex-1 relative h-12 bg-white rounded-xl border border-gray-100 grid" :style="{ gridTemplateColumns: `repeat(${daysInCurrentMonth}, minmax(0, 1fr))` }">
                <!-- Day Column Dividers -->
                <div
                  v-for="d in daysInCurrentMonth"
                  :key="d"
                  class="border-r border-gray-50 h-full"
                  :class="isDayToday(d) ? 'bg-[#9B7846]/5' : ''"
                ></div>

                <!-- Reservation Bars Overlaid -->
                <div
                  v-for="res in getReservationsForSuite(suite)"
                  :key="res.id"
                  @click="openDetailModal(res)"
                  class="absolute top-1 bottom-1 rounded-xl cursor-pointer text-white px-2.5 flex items-center justify-between text-xs font-medium shadow-xs transition-all hover:scale-[1.01] hover:shadow-md overflow-hidden z-10"
                  :style="getGanttBarStyle(res)"
                  :class="getGanttBarColor(suite.flat_name)"
                >
                  <div class="flex items-center gap-1.5 truncate">
                    <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                    <span class="font-bold truncate text-[11px] capitalize">{{ res.user?.name || 'Guest' }}</span>
                    <span class="text-[9px] opacity-80 font-mono hidden sm:inline">#{{ res.booking_no }}</span>
                  </div>
                  <span class="text-[10px] font-mono font-bold opacity-90 ml-2 shrink-0">
                    {{ currencyFormat(res.total_price) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Booking Details Dialog Modal -->
    <TransitionRoot as="template" :show="isDetailModalOpen">
      <Dialog as="div" class="relative z-50" @close="isDetailModalOpen = false">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel class="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-xl border border-[#9B7846]/20">
                <!-- Header -->
                <div class="p-6 bg-[#132212] text-white border-b border-white/10 flex items-start justify-between">
                  <div class="flex items-center gap-3.5">
                    <div class="w-12 h-12 rounded-2xl bg-[#9B7846] capitalize text-white flex items-center justify-center font-serif text-lg font-bold border border-white/20">
                      {{ (selectedReservation?.user?.name || 'G').slice(0, 2).toUpperCase() }}
                    </div>
                    <div>
                      <div class="flex items-center gap-2">
                        <span class="text-[10px] uppercase tracking-widest text-[#c5a880] font-bold">Stay Schedule</span>
                        <span class="px-2 py-0.5 rounded-full bg-white/10 text-white text-[10px] font-mono">
                          #{{ selectedReservation?.booking_no }}
                        </span>
                      </div>
                      <h3 class="font-serif text-xl font-normal text-white mt-0.5 capitalize">
                        {{ selectedReservation?.user?.name || 'Guest' }}
                      </h3>
                    </div>
                  </div>

                  <button
                    @click="isDetailModalOpen = false"
                    class="text-white/60 hover:text-white text-sm w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-colors"
                  >
                    <i class="fa fa-times"></i>
                  </button>
                </div>

                <!-- Modal Body -->
                <div class="p-6 space-y-4 text-xs">
                  <!-- Suite & Dates Banner -->
                  <div class="p-4 bg-[#FAF8F5] rounded-2xl border border-gray-100 flex items-center justify-between">
                    <div>
                      <span class="block text-[10px] uppercase tracking-wider text-gray-400 font-bold">Suite Reserved</span>
                      <p class="font-serif text-base font-bold text-[#1A1816] mt-0.5">
                        {{ selectedReservation?.room }}
                      </p>
                      <p class="text-gray-500 text-[11px] mt-0.5">
                        {{ selectedReservation?.no_of_guests || 1 }} Guests &bull; {{ selectedReservation?.no_of_rooms || 1 }} Room
                      </p>
                    </div>

                    <div class="text-right">
                      <span
                        class="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-block"
                        :class="getStatusBadgeClass(selectedReservation?.status)"
                      >
                        {{ selectedReservation?.status || 'Confirmed' }}
                      </span>
                      <span class="block font-serif text-base font-bold text-[#243821] mt-1">
                        {{ currencyFormat(selectedReservation?.total_price) }}
                      </span>
                    </div>
                  </div>

                  <!-- Details Grid -->
                  <div class="grid grid-cols-2 gap-3.5">
                    <div class="p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <span class="block text-gray-400 uppercase font-bold text-[10px]">Check-In</span>
                      <span class="font-medium text-gray-800 text-xs">
                        {{ moment(selectedReservation?.check_in).format("ddd, MMM DD, YYYY") }}
                      </span>
                    </div>

                    <div class="p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <span class="block text-gray-400 uppercase font-bold text-[10px]">Check-Out</span>
                      <span class="font-medium text-gray-800 text-xs">
                        {{ moment(selectedReservation?.check_out).format("ddd, MMM DD, YYYY") }}
                      </span>
                    </div>

                    <div class="p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <span class="block text-gray-400 uppercase font-bold text-[10px]">Guest Contact</span>
                      <span class="font-mono text-gray-700 text-xs block truncate">
                        {{ selectedReservation?.user?.email || '—' }}
                      </span>
                      <span class="font-mono text-gray-500 text-[11px]">
                        {{ selectedReservation?.user?.phone || '—' }}
                      </span>
                    </div>

                    <div class="p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <span class="block text-gray-400 uppercase font-bold text-[10px]">Payment Status</span>
                      <span class="font-bold text-emerald-700 text-xs uppercase block">
                        {{ selectedReservation?.payment_status || 'Paid' }}
                      </span>
                      <span class="text-gray-400 text-[11px] capitalize">
                        Channel: {{ selectedReservation?.payment_type || 'Card' }}
                      </span>
                    </div>
                  </div>

                  <!-- Quick Actions inside modal -->
                  <div class="pt-2 flex items-center gap-3">
                    <button
                      v-if="selectedReservation?.status !== 'checked in'"
                      @click="handleCheckin(selectedReservation)"
                      class="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                    >
                      <i class="fa fa-user-check"></i>
                      <span>Check In Guest</span>
                    </button>

                    <button
                      v-if="selectedReservation?.status === 'checked in'"
                      @click="handleCheckout(selectedReservation)"
                      class="flex-1 py-2.5 rounded-xl bg-[#243821] hover:bg-[#182716] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                    >
                      <i class="fa fa-sign-out-alt"></i>
                      <span>Check Out Guest</span>
                    </button>
                  </div>
                </div>

                <!-- Footer -->
                <div class="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                  <router-link
                    to="/admin/reservations"
                    class="inline-flex items-center gap-1.5 text-xs text-[#243821] hover:underline font-semibold"
                  >
                    <span>View in Reservations Ledger</span>
                    <i class="fa fa-arrow-right text-[10px]"></i>
                  </router-link>

                  <button
                    @click="isDetailModalOpen = false"
                    class="px-5 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold text-xs transition-colors"
                  >
                    Close
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { getReservations } from "@/services/roomservice";
import { customerCheckin, customerCheckout } from "@/services/userservices";
import { onMounted, ref, reactive, inject, computed } from "vue";
import moment from "moment";
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from "@headlessui/vue";
import { useToast } from "vue-toast-notification";

const toast = useToast();
const currencyFormat = inject("currencyFormat", (v) => `₦${Number(v || 0).toLocaleString()}`);

const loading = ref(true);
const rawReservations = ref([]);
const viewMode = ref("month"); // 'month' or 'timeline'

// Selected reference month (defaults to September 2026 where system data resides)
const currentMoment = ref(moment("2026-09-01"));

const searchQuery = ref("");
const selectedSuiteFilter = ref("all");
const selectedStatusFilter = ref("all");

const isDetailModalOpen = ref(false);
const selectedReservation = ref(null);

const availableSuites = [
  { id: 1, flat_name: "Standard Room", room_name: "Room 101", price: 65000 },
  { id: 2, flat_name: "Executive Suite", room_name: "Suite 201", price: 95000 },
  { id: 3, flat_name: "Luxury 1-Bedroom Apartment", room_name: "Apt 301", price: 135000 },
  { id: 4, flat_name: "Royal 2-Bedroom Apartment", room_name: "Apt 401", price: 185000 },
  { id: 5, flat_name: "Presidential Penthouse Suite", room_name: "Penthouse 501", price: 280000 },
];

const queryParams = reactive({
  pageNumber: 1,
  pageSize: 1000,
  pageCount: 0,
  total: 0,
  search: "",
});

onMounted(() => {
  getData();
});

function getData() {
  loading.value = true;
  getReservations(queryParams)
    .then((res) => {
      if (res.status === 200 && res.data?.data) {
        rawReservations.value = res.data.data;
      }
      loading.value = false;
    })
    .catch(() => {
      loading.value = false;
    });
}

// Navigation
function prevMonth() {
  currentMoment.value = moment(currentMoment.value).subtract(1, "month");
}

function nextMonth() {
  currentMoment.value = moment(currentMoment.value).add(1, "month");
}

function goToToday() {
  currentMoment.value = moment("2026-09-08");
}

const currentMonthYearTitle = computed(() => {
  return currentMoment.value.format("MMMM YYYY");
});

const currentMonthLabel = computed(() => {
  return currentMoment.value.format("MMM YYYY");
});

const daysInCurrentMonth = computed(() => {
  return currentMoment.value.daysInMonth();
});

function isDayToday(d) {
  const check = moment(currentMoment.value).date(d);
  return check.format("YYYY-MM-DD") === "2026-09-08";
}

// Filtering
const filteredCalendarReservations = computed(() => {
  return rawReservations.value.filter((r) => {
    // Search
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase();
      const nameMatch = r.user?.name?.toLowerCase().includes(q);
      const emailMatch = r.user?.email?.toLowerCase().includes(q);
      const bookingMatch = String(r.booking_no).toLowerCase().includes(q);
      const roomMatch = r.room?.toLowerCase().includes(q);
      if (!nameMatch && !emailMatch && !bookingMatch && !roomMatch) {
        return false;
      }
    }

    // Suite
    if (selectedSuiteFilter.value !== "all") {
      if (!r.room?.toLowerCase().includes(selectedSuiteFilter.value.toLowerCase())) {
        return false;
      }
    }

    // Status
    if (selectedStatusFilter.value !== "all") {
      if ((r.status || "confirmed").toLowerCase() !== selectedStatusFilter.value.toLowerCase()) {
        return false;
      }
    }

    return true;
  });
});

// Month Grid Days Computation
const calendarDays = computed(() => {
  const startOfMonth = moment(currentMoment.value).startOf("month");

  // In standard ISO, Monday is 1, Sunday is 7
  const startDayOfWeek = startOfMonth.isoWeekday(); // 1 (Mon) to 7 (Sun)
  const daysInMonth = startOfMonth.daysInMonth();

  const days = [];

  // Previous month padding days
  const prevMonth = moment(startOfMonth).subtract(1, "month");
  const prevMonthDays = prevMonth.daysInMonth();
  for (let i = startDayOfWeek - 1; i > 0; i--) {
    const d = prevMonthDays - i + 1;
    const dateObj = moment(prevMonth).date(d);
    days.push({
      dayNumber: d,
      date: dateObj.format("YYYY-MM-DD"),
      isCurrentMonth: false,
      isToday: false,
      reservations: getReservationsForDate(dateObj),
    });
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    const dateObj = moment(startOfMonth).date(d);
    days.push({
      dayNumber: d,
      date: dateObj.format("YYYY-MM-DD"),
      isCurrentMonth: true,
      isToday: dateObj.format("YYYY-MM-DD") === "2026-09-08",
      reservations: getReservationsForDate(dateObj),
    });
  }

  // Next month padding days to round up to complete weeks (multiple of 7)
  const totalCells = Math.ceil(days.length / 7) * 7;
  const nextMonthPadding = totalCells - days.length;
  const nextMonth = moment(startOfMonth).add(1, "month");
  for (let d = 1; d <= nextMonthPadding; d++) {
    const dateObj = moment(nextMonth).date(d);
    days.push({
      dayNumber: d,
      date: dateObj.format("YYYY-MM-DD"),
      isCurrentMonth: false,
      isToday: false,
      reservations: getReservationsForDate(dateObj),
    });
  }

  return days;
});

function getReservationsForDate(dateObj) {
  const target = dateObj.format("YYYY-MM-DD");
  return filteredCalendarReservations.value.filter((r) => {
    const inDate = moment(r.check_in).format("YYYY-MM-DD");
    const outDate = moment(r.check_out).format("YYYY-MM-DD");
    return target >= inDate && target <= outDate;
  });
}

// Gantt / Timeline Calculations
function getReservationsForSuite(suite) {
  return filteredCalendarReservations.value.filter((r) => {
    const roomStr = (r.room || "").toLowerCase();
    const suiteName = suite.flat_name.toLowerCase();
    const roomCode = suite.room_name.toLowerCase();
    return roomStr.includes(suiteName) || roomStr.includes(roomCode);
  });
}

function getGanttBarStyle(res) {
  const startMonthDate = moment(currentMoment.value).startOf("month");
  const inDate = moment(res.check_in);
  const outDate = moment(res.check_out);

  const startDay = inDate.month() === startMonthDate.month() ? inDate.date() : 1;
  const endDay = outDate.month() === startMonthDate.month() ? outDate.date() : daysInCurrentMonth.value;

  const leftPercent = ((startDay - 1) / daysInCurrentMonth.value) * 100;
  const widthPercent = Math.max(((endDay - startDay + 1) / daysInCurrentMonth.value) * 100, 3);

  return {
    left: `${leftPercent}%`,
    width: `${widthPercent}%`,
  };
}

function getGanttBarColor(suiteName) {
  const s = (suiteName || "").toLowerCase();
  if (s.includes("penthouse")) return "bg-gradient-to-r from-rose-600 to-rose-700";
  if (s.includes("royal") || s.includes("2-bedroom")) return "bg-gradient-to-r from-purple-600 to-purple-700";
  if (s.includes("luxury") || s.includes("1-bedroom")) return "bg-gradient-to-r from-amber-500 to-amber-600";
  if (s.includes("executive")) return "bg-gradient-to-r from-emerald-600 to-emerald-700";
  return "bg-gradient-to-r from-blue-600 to-blue-700";
}

function getSuiteCardBg(roomName) {
  const r = (roomName || "").toLowerCase();
  if (r.includes("penthouse")) return "bg-rose-50/80 border-rose-200 text-rose-900";
  if (r.includes("royal") || r.includes("2-bedroom")) return "bg-purple-50/80 border-purple-200 text-purple-900";
  if (r.includes("luxury") || r.includes("1-bedroom")) return "bg-amber-50/80 border-amber-200 text-amber-900";
  if (r.includes("executive")) return "bg-emerald-50/80 border-emerald-200 text-emerald-900";
  return "bg-blue-50/80 border-blue-200 text-blue-900";
}

function getSuiteDotColor(roomName) {
  const r = (roomName || "").toLowerCase();
  if (r.includes("penthouse")) return "bg-rose-500";
  if (r.includes("royal") || r.includes("2-bedroom")) return "bg-purple-500";
  if (r.includes("luxury") || r.includes("1-bedroom")) return "bg-amber-500";
  if (r.includes("executive")) return "bg-emerald-500";
  return "bg-blue-500";
}

function getShortSuiteName(roomName) {
  if (!roomName) return "Suite";
  if (roomName.includes("Penthouse")) return "Penthouse 501";
  if (roomName.includes("Royal")) return "Royal Apt 401";
  if (roomName.includes("Luxury")) return "Luxury Apt 301";
  if (roomName.includes("Executive")) return "Exec Suite 201";
  if (roomName.includes("Standard")) return "Standard Rm 101";
  return roomName;
}

function getStatusBadgeClass(status) {
  const s = (status || "").toLowerCase();
  if (s === "checked in") return "bg-green-100 text-green-800 border border-green-200";
  if (s === "checked out") return "bg-gray-200 text-gray-700";
  if (s === "cancelled") return "bg-red-100 text-red-800 border border-red-200";
  return "bg-amber-100 text-amber-800 border border-amber-200";
}

// KPI Calculations
const activeCheckedInCount = computed(() => {
  return rawReservations.value.filter((r) => (r.status || "").toLowerCase() === "checked in").length;
});

const totalNightsBooked = computed(() => {
  return rawReservations.value.reduce((acc, curr) => acc + Number(curr.duration || 1), 0);
});

const totalRevenue = computed(() => {
  return rawReservations.value.reduce((acc, curr) => acc + Number(curr.total_price || 0), 0);
});

const occupancyRate = computed(() => {
  const totalAvailableNights = availableSuites.length * daysInCurrentMonth.value; // 5 suites * 30 days = 150 nights
  if (!totalAvailableNights) return 0;
  return Math.min(Math.round((totalNightsBooked.value / totalAvailableNights) * 100), 100);
});

const avgDailyRate = computed(() => {
  if (!totalNightsBooked.value) return 0;
  return Math.round(totalRevenue.value / totalNightsBooked.value);
});

function openDetailModal(res) {
  selectedReservation.value = res;
  isDetailModalOpen.value = true;
}

function openDayStaysModal(day) {
  if (day.reservations.length) {
    selectedReservation.value = day.reservations[0];
    isDetailModalOpen.value = true;
  }
}

function handleCheckin(res) {
  customerCheckin(res.id)
    .then(() => {
      toast.success(`Guest ${res.user?.name || ''} has been checked in`);
      res.status = "checked in";
      getData();
    })
    .catch(() => {
      toast.error("Failed to check in guest");
    });
}

function handleCheckout(res) {
  customerCheckout(res.id)
    .then(() => {
      toast.success(`Guest ${res.user?.name || ''} has been checked out`);
      res.status = "checked out";
      getData();
    })
    .catch(() => {
      toast.error("Failed to check out guest");
    });
}
</script>

<style scoped>
/* Scoped luxury styling */
</style>
