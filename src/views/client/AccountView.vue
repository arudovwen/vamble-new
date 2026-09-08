<template>
  <DefaultLayout>
    <template #content>
      <div
        class="bg-[#FAF8F5] min-h-screen text-[#1A1816] pt-28 pb-20 px-4 sm:px-6 lg:px-8"
      >
        <div class="max-w-7xl mx-auto">
          <!-- Top Welcome Card -->
          <div
            class="bg-[#132212] rounded-3xl p-5 sm:p-10 text-white relative overflow-hidden shadow-xl mb-8 sm:mb-10 border border-[#9B7846]/30"
          >
            <div
              class="absolute -right-16 -top-16 w-80 h-80 bg-[#9B7846]/15 rounded-full blur-3xl pointer-events-none"
            ></div>
            <div
              class="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div class="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
                <div
                  class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#9B7846] text-white flex items-center justify-center font-serif text-2xl sm:text-3xl font-bold shadow-lg border border-white/20 shrink-0"
                >
                  {{ userInitials }}
                </div>
                <div>
                  <div class="flex items-center gap-2 mb-1">
                    <span
                      class="text-xs uppercase tracking-widest text-[#c5a880] font-semibold"
                      >Guest Portal</span
                    >
                    <span
                      class="px-2.5 py-0.5 rounded-full bg-white/10 text-white text-[10px] font-bold tracking-wider uppercase border border-white/20"
                    >
                      VIP Guest
                    </span>
                  </div>
                  <h1
                    class="font-serif text-2xl sm:text-4xl font-normal text-white"
                  >
                    {{ userInfo?.name || "Valued Guest" }}
                  </h1>
                  <p class="text-xs sm:text-sm text-white/70 font-sans mt-1">
                    {{ userInfo?.email }} &bull;
                    {{ userInfo?.phone || "No phone on file" }}
                  </p>
                </div>
              </div>

              <!-- Quick Action Buttons -->
              <div class="flex flex-wrap items-center gap-3">
                <router-link
                  to="/booking"
                  class="bg-[#9B7846] hover:bg-[#856538] text-white px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold shadow-md active:scale-95 transition-all"
                >
                  <i class="fa fa-calendar-plus mr-1.5"></i>
                  New Reservation
                </router-link>
                <router-link
                  v-if="parseInt(userInfo?.role_id) === 1"
                  to="/admin/dashboard"
                  class="bg-white/15 hover:bg-white/25 text-white border border-white/20 px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all"
                >
                  <i class="fa fa-dashboard mr-1.5 text-[#c5a880]"></i>
                  Admin Panel
                </router-link>
                <button
                  @click="handleLogout"
                  class="bg-white/10 hover:bg-red-500/20 text-white/90 hover:text-red-300 border border-white/20 px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all"
                >
                  <i class="fa fa-sign-out-alt mr-1.5"></i>
                  Sign Out
                </button>
              </div>
            </div>

            <!-- Stats Bar -->
            <div
              class="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/10 text-left"
            >
              <div>
                <span
                  class="block text-xs uppercase tracking-wider text-white/50 font-sans"
                  >Total Reservations</span
                >
                <span class="font-serif text-2xl font-bold text-white">{{
                  bookings.length
                }}</span>
              </div>
              <div>
                <span
                  class="block text-xs uppercase tracking-wider text-white/50 font-sans"
                  >Active Bookings</span
                >
                <span class="font-serif text-2xl font-bold text-[#c5a880]">{{
                  activeBookingsCount
                }}</span>
              </div>
              <div>
                <span
                  class="block text-xs uppercase tracking-wider text-white/50 font-sans"
                  >Membership Status</span
                >
                <span class="font-serif text-lg font-bold text-white"
                  >Vamble Club</span
                >
              </div>
              <div>
                <span
                  class="block text-xs uppercase tracking-wider text-white/50 font-sans"
                  >Concierge Access</span
                >
                <span class="font-serif text-lg font-bold text-[#c5a880]"
                  >24/7 Priority</span
                >
              </div>
            </div>
          </div>

          <!-- Navigation Tabs -->
          <div class="flex border-b border-[#9B7846]/20 mb-8 overflow-x-auto">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                activeTab === tab.id
                  ? 'border-[#243821] text-[#243821] font-bold border-b-2'
                  : 'border-transparent text-gray-500 hover:text-[#243821]',
                'py-3.5 px-6 text-sm uppercase tracking-wider whitespace-nowrap transition-colors duration-200',
              ]"
            >
              <i :class="tab.icon" class="mr-2"></i>
              {{ tab.label }}
            </button>
          </div>

          <!-- TAB 1: RESERVATIONS -->
          <div v-if="activeTab === 'reservations'">
            <div v-if="loading" class="py-16 text-center">
              <i class="fa fa-spinner fa-spin text-3xl text-[#9B7846]"></i>
              <p class="mt-3 text-sm text-gray-500">
                Loading your reservations...
              </p>
            </div>

            <div
              v-else-if="bookings.length === 0"
              class="bg-white rounded-2xl p-12 text-center border border-[#9B7846]/20 shadow-sm"
            >
              <div
                class="w-16 h-16 rounded-full bg-[#FAF8F5] text-[#9B7846] flex items-center justify-center mx-auto text-2xl mb-4"
              >
                <i class="fa fa-bed"></i>
              </div>
              <h3 class="font-serif text-xl font-medium text-[#1A1816] mb-2">
                No Reservations Found
              </h3>
              <p class="text-sm text-gray-500 max-w-md mx-auto mb-6">
                You do not have any active or past reservations yet. Discover
                our luxury suites and reserve your tranquil retreat in Abuja.
              </p>
              <router-link
                to="/booking"
                class="inline-flex items-center gap-2 bg-[#243821] hover:bg-[#182716] text-white px-8 py-3 rounded-full text-xs uppercase tracking-widest font-semibold shadow-md active:scale-95 transition-all"
              >
                <span>Book a Suite</span>
                <i class="fa fa-arrow-right text-xs"></i>
              </router-link>
            </div>

            <div v-else class="space-y-6">
              <div
                v-for="booking in bookings"
                :key="booking.id"
                class="bg-white rounded-2xl p-6 sm:p-8 border border-[#9B7846]/20 shadow-sm hover:shadow-md transition-all text-left flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div class="space-y-3 flex-1">
                  <div class="flex flex-wrap items-center gap-2.5">
                    <span
                      class="font-mono text-xs font-bold text-[#9B7846] bg-[#9B7846]/10 px-3 py-1 rounded-md"
                    >
                      #{{ booking.booking_no }}
                    </span>
                    <span
                      class="px-3 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider"
                      :class="getStatusBadgeClass(booking.status)"
                    >
                      {{ booking.status || "Confirmed" }}
                    </span>
                    <span
                      class="px-2.5 py-0.5 rounded-full text-[10px] font-medium"
                      :class="
                        booking.payment_status === 'paid'
                          ? 'bg-green-50 text-green-700'
                          : 'bg-amber-50 text-amber-700'
                      "
                    >
                      Payment: {{ booking.payment_status || "Pending" }}
                    </span>
                  </div>

                  <h3
                    class="font-serif text-xl sm:text-2xl text-[#1A1816] font-medium"
                  >
                    {{
                      booking.room?.flat_name ||
                      booking.room?.room_name ||
                      "Luxury Suite"
                    }}
                  </h3>

                  <div
                    class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-gray-600 font-sans pt-1"
                  >
                    <div>
                      <span
                        class="block text-gray-400 text-[10px] uppercase font-bold"
                        >Check-In</span
                      >
                      <span class="font-medium text-[#1A1816]">{{
                        formatDate(booking.check_in)
                      }}</span>
                    </div>
                    <div>
                      <span
                        class="block text-gray-400 text-[10px] uppercase font-bold"
                        >Check-Out</span
                      >
                      <span class="font-medium text-[#1A1816]">{{
                        formatDate(booking.check_out)
                      }}</span>
                    </div>
                    <div>
                      <span
                        class="block text-gray-400 text-[10px] uppercase font-bold"
                        >Occupancy</span
                      >
                      <span class="font-medium text-[#1A1816]"
                        >{{ booking.no_of_guests || 2 }} Guests &bull;
                        {{ booking.no_of_rooms || 1 }} Room</span
                      >
                    </div>
                    <div>
                      <span
                        class="block text-gray-400 text-[10px] uppercase font-bold"
                        >Total Amount</span
                      >
                      <span
                        class="font-serif font-bold text-sm text-[#243821]"
                        >{{ currencyFormat(booking.total_price) }}</span
                      >
                    </div>
                  </div>
                </div>

                <!-- Digital Pass Button & Details -->
                <div
                  class="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto shrink-0"
                >
                  <button
                    @click="openDigitalPass(booking)"
                    class="inline-flex items-center justify-center gap-2 bg-[#9B7846] hover:bg-[#856538] text-white px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold shadow-md active:scale-95 transition-all"
                  >
                    <i class="fa fa-qrcode"></i>
                    <span>Digital Room Pass</span>
                  </button>
                  <button
                    @click="viewDetails(booking)"
                    class="inline-flex items-center justify-center gap-2 border border-gray-300 hover:border-[#243821] text-gray-700 hover:text-[#243821] px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all"
                  >
                    <i class="fa fa-info-circle"></i>
                    <span>View Summary</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- TAB 2: TRANSACTIONS -->
          <div v-if="activeTab === 'transactions'">
            <div
              class="bg-white rounded-2xl border border-[#9B7846]/20 shadow-sm overflow-hidden text-left"
            >
              <div
                class="p-6 bg-[#FAF8F5] border-b border-[#9B7846]/20 flex items-center justify-between"
              >
                <div>
                  <h3 class="font-serif text-lg font-medium text-[#1A1816]">
                    Payment History & Invoices
                  </h3>
                  <p class="text-xs text-gray-500">
                    Track all reservation deposits and payments made through our
                    secure checkout.
                  </p>
                </div>
                <span
                  class="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-800"
                >
                  <i class="fa fa-lock mr-1"></i> Paystack Encrypted
                </span>
              </div>

              <div
                v-if="bookings.length === 0"
                class="p-12 text-center text-gray-500 text-sm"
              >
                No payment transactions recorded yet.
              </div>

              <div v-else class="overflow-x-auto">
                <table class="w-full text-left">
                  <thead>
                    <tr
                      class="text-xs uppercase tracking-wider text-gray-400 bg-gray-50 border-b"
                    >
                      <th class="px-6 py-3 font-semibold">Date</th>
                      <th class="px-6 py-3 font-semibold">Booking Ref</th>
                      <th class="px-6 py-3 font-semibold">Description</th>
                      <th class="px-6 py-3 font-semibold">Payment Method</th>
                      <th class="px-6 py-3 font-semibold">Amount</th>
                      <th class="px-6 py-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-100 text-sm">
                    <tr
                      v-for="b in bookings"
                      :key="b.id"
                      class="hover:bg-gray-50/50 transition-colors"
                    >
                      <td class="px-6 py-4 text-xs font-mono text-gray-600">
                        {{ formatDate(b.created_at) }}
                      </td>
                      <td
                        class="px-6 py-4 font-mono font-semibold text-xs text-[#9B7846]"
                      >
                        #{{ b.booking_no }}
                      </td>
                      <td class="px-6 py-4 font-medium text-[#1A1816]">
                        {{
                          b.room?.flat_name ||
                          b.room?.room_name ||
                          "Suite Reservation"
                        }}
                      </td>
                      <td class="px-6 py-4 text-xs capitalize text-gray-600">
                        {{ b.payment_type || "Paystack / Card" }}
                      </td>
                      <td class="px-6 py-4 font-serif font-bold text-[#243821]">
                        {{ currencyFormat(b.total_price) }}
                      </td>
                      <td class="px-6 py-4">
                        <span
                          class="px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider"
                          :class="
                            b.payment_status === 'paid'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-amber-100 text-amber-800'
                          "
                        >
                          {{ b.payment_status || "Confirmed" }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- TAB 3: PROFILE & DETAILS -->
          <div v-if="activeTab === 'profile'">
            <div
              class="bg-white rounded-2xl border border-[#9B7846]/20 shadow-sm p-8 text-left max-w-2xl mx-auto"
            >
              <div class="mb-6 pb-6 border-b border-gray-100">
                <h3 class="font-serif text-2xl font-normal text-[#1A1816] mb-1">
                  Personal Profile Details
                </h3>
                <p class="text-xs text-gray-500">
                  Your profile information is automatically used to issue
                  digital access passes and check-in confirmation.
                </p>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                <div>
                  <label
                    class="block text-xs uppercase tracking-wider text-gray-500 font-bold mb-1.5"
                    >Full Name</label
                  >
                  <div
                    class="p-3 bg-[#FAF8F5] rounded-xl border border-gray-200 text-sm font-medium text-[#1A1816]"
                  >
                    {{ userInfo?.name }}
                  </div>
                </div>

                <div>
                  <label
                    class="block text-xs uppercase tracking-wider text-gray-500 font-bold mb-1.5"
                    >Email Address</label
                  >
                  <div
                    class="p-3 bg-[#FAF8F5] rounded-xl border border-gray-200 text-sm font-medium text-[#1A1816]"
                  >
                    {{ userInfo?.email }}
                  </div>
                </div>

                <div>
                  <label
                    class="block text-xs uppercase tracking-wider text-gray-500 font-bold mb-1.5"
                    >Phone Number</label
                  >
                  <div
                    class="p-3 bg-[#FAF8F5] rounded-xl border border-gray-200 text-sm font-medium text-[#1A1816]"
                  >
                    {{ userInfo?.phone || "Not specified" }}
                  </div>
                </div>

                <div>
                  <label
                    class="block text-xs uppercase tracking-wider text-gray-500 font-bold mb-1.5"
                    >Nationality</label
                  >
                  <div
                    class="p-3 bg-[#FAF8F5] rounded-xl border border-gray-200 text-sm font-medium text-[#1A1816]"
                  >
                    {{ userInfo?.nationality || "Nigerian" }}
                  </div>
                </div>

                <div class="sm:col-span-2">
                  <label
                    class="block text-xs uppercase tracking-wider text-gray-500 font-bold mb-1.5"
                    >Residential Address</label
                  >
                  <div
                    class="p-3 bg-[#FAF8F5] rounded-xl border border-gray-200 text-sm font-medium text-[#1A1816]"
                  >
                    {{ userInfo?.address || "Private Residence, Nigeria" }}
                  </div>
                </div>
              </div>

              <div
                class="p-4 rounded-xl bg-[#243821]/5 border border-[#243821]/15 text-xs text-gray-600 flex items-start gap-3"
              >
                <i class="fa fa-shield text-[#243821] text-base mt-0.5"></i>
                <p>
                  To update your primary profile or contact details, please
                  inform the front desk concierge upon check-in or send a
                  request to
                  <a
                    href="mailto:info@vambleapartments.com"
                    class="text-[#9B7846] font-bold underline"
                    >info@vambleapartments.com</a
                  >.
                </p>
              </div>
            </div>
          </div>

          <!-- TAB 4: CONCIERGE -->
          <div v-if="activeTab === 'concierge'">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div
                class="bg-white rounded-2xl p-8 border border-[#9B7846]/20 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div
                    class="w-12 h-12 rounded-xl bg-[#243821]/10 text-[#243821] flex items-center justify-center text-xl mb-4"
                  >
                    <i class="fa fa-phone"></i>
                  </div>
                  <h4
                    class="font-serif text-lg font-medium text-[#1A1816] mb-2"
                  >
                    Direct Front Desk
                  </h4>
                  <p class="text-xs text-gray-500 mb-6 font-light">
                    24/7 dedicated line for instant room service, housekeeping,
                    or amenities requests.
                  </p>
                </div>
                <a
                  href="tel:+2348012345678"
                  class="text-xs uppercase tracking-wider font-bold text-[#9B7846] hover:text-[#243821] flex items-center gap-1.5"
                >
                  <span>+234 801 234 5678</span>
                  <i class="fa fa-arrow-right"></i>
                </a>
              </div>

              <div
                class="bg-white rounded-2xl p-8 border border-[#9B7846]/20 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div
                    class="w-12 h-12 rounded-xl bg-[#243821]/10 text-[#243821] flex items-center justify-center text-xl mb-4"
                  >
                    <i class="fa fa-whatsapp"></i>
                  </div>
                  <h4
                    class="font-serif text-lg font-medium text-[#1A1816] mb-2"
                  >
                    WhatsApp Concierge
                  </h4>
                  <p class="text-xs text-gray-500 mb-6 font-light">
                    Chat live with our guest relations executive for airport
                    pickup, directions, or city advice.
                  </p>
                </div>
                <a
                  href="https://wa.me/2348012345678"
                  target="_blank"
                  class="text-xs uppercase tracking-wider font-bold text-[#9B7846] hover:text-[#243821] flex items-center gap-1.5"
                >
                  <span>Start WhatsApp Chat</span>
                  <i class="fa fa-arrow-right"></i>
                </a>
              </div>

              <div
                class="bg-white rounded-2xl p-8 border border-[#9B7846]/20 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div
                    class="w-12 h-12 rounded-xl bg-[#243821]/10 text-[#243821] flex items-center justify-center text-xl mb-4"
                  >
                    <i class="fa fa-map-marker-alt"></i>
                  </div>
                  <h4
                    class="font-serif text-lg font-medium text-[#1A1816] mb-2"
                  >
                    Location & Escort
                  </h4>
                  <p class="text-xs text-gray-500 mb-6 font-light">
                    Plot 1284, Cadastral Zone B08, Jahi District, Abuja,
                    Nigeria. Private parking available.
                  </p>
                </div>
                <router-link
                  to="/enquiry"
                  class="text-xs uppercase tracking-wider font-bold text-[#9B7846] hover:text-[#243821] flex items-center gap-1.5"
                >
                  <span>Directions & Map</span>
                  <i class="fa fa-arrow-right"></i>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- DIGITAL BOARDING PASS MODAL -->
      <TransitionRoot as="template" :show="isPassModalOpen">
        <Dialog as="div" class="relative z-50" @close="isPassModalOpen = false">
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
              class="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
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
                  class="relative transform overflow-hidden rounded-3xl bg-[#132212] text-white text-left shadow-2xl transition-all my-4 w-full max-w-[95vw] sm:max-w-md border border-[#9B7846]/40 p-5 sm:p-8"
                >
                  <!-- Header with Close Button -->
                  <div
                    class="flex items-center justify-between pb-4 border-b border-white/10 mb-6"
                  >
                    <div class="flex items-center gap-2">
                      <i class="fa fa-key text-[#c5a880]"></i>
                      <span class="font-serif text-lg font-medium tracking-wide"
                        >Digital Room Pass</span
                      >
                    </div>
                    <button
                      @click="isPassModalOpen = false"
                      class="text-white/60 hover:text-white text-sm w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-colors"
                    >
                      <i class="fa fa-times"></i>
                    </button>
                  </div>

                  <!-- Pass Content -->
                  <div v-if="selectedBooking" class="space-y-6 text-center">
                    <div
                      class="bg-white rounded-2xl p-6 text-[#1A1816] shadow-inner"
                    >
                      <span
                        class="text-[10px] font-bold uppercase tracking-widest text-[#9B7846] block mb-1"
                      >
                        Vamble Luxury Access Key
                      </span>
                      <h4
                        class="font-serif text-2xl font-bold text-[#243821] mb-1"
                      >
                        {{
                          selectedBooking.room?.flat_name ||
                          selectedBooking.room?.room_name ||
                          "Executive Residence"
                        }}
                      </h4>
                      <p class="text-xs text-gray-500 mb-4">
                        Booking #{{ selectedBooking.booking_no }}
                      </p>

                      <!-- Simulated QR Code -->
                      <div
                        class="w-36 h-36 mx-auto bg-gray-100 p-2 rounded-xl border-2 border-[#9B7846]/40 flex items-center justify-center mb-3"
                      >
                        <img
                          :src="`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=VAMBLE-${selectedBooking.booking_no}`"
                          alt="Room Access QR"
                          class="w-full h-full object-contain"
                        />
                      </div>
                      <span
                        class="text-[10px] uppercase tracking-widest text-gray-400 font-mono"
                        >Present at Reception Desk</span
                      >
                    </div>

                    <!-- Key Pass Details -->
                    <div
                      class="bg-white/5 rounded-2xl p-5 border border-white/10 text-left space-y-3 text-xs"
                    >
                      <div class="flex justify-between">
                        <span class="text-white/50">Primary Guest</span>
                        <span class="font-medium text-white">{{
                          selectedBooking.user?.name || userInfo?.name
                        }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-white/50">Check-In</span>
                        <span class="font-medium text-white"
                          >{{ formatDate(selectedBooking.check_in) }} (From 2:00
                          PM)</span
                        >
                      </div>
                      <div class="flex justify-between">
                        <span class="text-white/50">Check-Out</span>
                        <span class="font-medium text-white"
                          >{{ formatDate(selectedBooking.check_out) }} (By 12:00
                          PM)</span
                        >
                      </div>
                      <div class="flex justify-between">
                        <span class="text-white/50">High-Speed Wi-Fi</span>
                        <span class="font-mono text-[#c5a880] font-bold"
                          >VAMBLE-GUEST / luxury2026</span
                        >
                      </div>
                    </div>

                    <button
                      @click="printPass"
                      class="w-full bg-[#9B7846] hover:bg-[#856538] text-white py-3 rounded-full text-xs uppercase tracking-widest font-semibold transition-colors shadow-lg"
                    >
                      <i class="fa fa-print mr-1.5"></i>
                      Print Digital Pass
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>

      <!-- BOOKING SUMMARY MODAL -->
      <TransitionRoot as="template" :show="isDetailsModalOpen">
        <Dialog
          as="div"
          class="relative z-50"
          @close="isDetailsModalOpen = false"
        >
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
              class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
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
                  class="relative transform overflow-hidden rounded-3xl bg-white text-[#1A1816] text-left shadow-2xl transition-all my-4 w-full max-w-[95vw] sm:max-w-lg border border-gray-200 p-5 sm:p-8"
                >
                  <div
                    class="flex items-center justify-between pb-4 border-b border-gray-100 mb-6"
                  >
                    <h3 class="font-serif text-xl font-medium text-[#1A1816]">
                      Reservation Summary
                    </h3>
                    <button
                      @click="isDetailsModalOpen = false"
                      class="text-gray-400 hover:text-gray-700 text-sm"
                    >
                      <i class="fa fa-times"></i>
                    </button>
                  </div>

                  <div
                    v-if="selectedBooking"
                    class="space-y-4 text-sm font-sans"
                  >
                    <div
                      class="flex justify-between py-2 border-b border-gray-100"
                    >
                      <span class="text-gray-500">Booking Reference</span>
                      <span class="font-mono font-bold text-[#9B7846]"
                        >#{{ selectedBooking.booking_no }}</span
                      >
                    </div>
                    <div
                      class="flex justify-between py-2 border-b border-gray-100"
                    >
                      <span class="text-gray-500">Suite Type</span>
                      <span class="font-medium text-[#1A1816]">{{
                        selectedBooking.room?.flat_name ||
                        selectedBooking.room?.room_name
                      }}</span>
                    </div>
                    <div
                      class="flex justify-between py-2 border-b border-gray-100"
                    >
                      <span class="text-gray-500">Check-in</span>
                      <span class="font-medium text-[#1A1816]">{{
                        formatDate(selectedBooking.check_in)
                      }}</span>
                    </div>
                    <div
                      class="flex justify-between py-2 border-b border-gray-100"
                    >
                      <span class="text-gray-500">Check-out</span>
                      <span class="font-medium text-[#1A1816]">{{
                        formatDate(selectedBooking.check_out)
                      }}</span>
                    </div>
                    <div
                      class="flex justify-between py-2 border-b border-gray-100"
                    >
                      <span class="text-gray-500">Guests & Rooms</span>
                      <span class="font-medium text-[#1A1816]"
                        >{{ selectedBooking.no_of_guests || 2 }} Guests &bull;
                        {{ selectedBooking.no_of_rooms || 1 }} Room</span
                      >
                    </div>
                    <div
                      class="flex justify-between py-2 border-b border-gray-100"
                    >
                      <span class="text-gray-500">Payment Status</span>
                      <span class="font-bold text-green-700 capitalize">{{
                        selectedBooking.payment_status || "Paid"
                      }}</span>
                    </div>
                    <div
                      class="flex justify-between py-2 border-b border-gray-100"
                    >
                      <span class="text-gray-500">Total Price</span>
                      <span
                        class="font-serif font-bold text-lg text-[#243821]"
                        >{{ currencyFormat(selectedBooking.total_price) }}</span
                      >
                    </div>

                    <div class="pt-4 flex justify-end">
                      <button
                        @click="isDetailsModalOpen = false"
                        class="bg-[#243821] hover:bg-[#182716] text-white px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
    </template>
  </DefaultLayout>
</template>

<script setup>
import { ref, computed, onMounted, inject } from "vue";
import { useRouter } from "vue-router";
import DefaultLayout from "@/components/layouts/defaultLayout.vue";
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { findBookings } from "@/services/roomservice";
import { logOut } from "@/services/authservices";
import store from "@/store";
import moment from "moment";

const router = useRouter();
const currencyFormat = inject(
  "currencyFormat",
  (v) => `₦${Number(v || 0).toLocaleString()}`
);

const activeTab = ref("reservations");
const tabs = [
  {
    id: "reservations",
    label: "My Reservations",
    icon: "fa fa-calendar-check-o",
  },
  { id: "transactions", label: "Payment History", icon: "fa fa-credit-card" },
  { id: "profile", label: "Profile Information", icon: "fa fa-user-circle" },
  {
    id: "concierge",
    label: "Concierge & Support",
    icon: "fa fa-concierge-bell",
  },
];

const userInfo = computed(() => store.getters.userInfo);
const bookings = ref([]);
const loading = ref(true);

const selectedBooking = ref(null);
const isPassModalOpen = ref(false);
const isDetailsModalOpen = ref(false);

const userInitials = computed(() => {
  const name = userInfo.value?.name || "Guest";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
});

const activeBookingsCount = computed(() => {
  return bookings.value.filter(
    (b) => b.status !== "checked out" && b.status !== "cancelled"
  ).length;
});

onMounted(() => {
  if (!store.getters.token) {
    router.push("/login?redirected_from=/account");
    return;
  }
  loadBookings();
});

function loadBookings() {
  loading.value = true;
  findBookings({ pageNumber: 1, pageSize: 50 })
    .then((res) => {
      if (res.status === 200) {
        bookings.value = res.data.data || [];
      }
      loading.value = false;
    })
    .catch(() => {
      loading.value = false;
    });
}

function formatDate(d) {
  if (!d) return "—";
  return moment(d).format("MMM DD, YYYY");
}

function getStatusBadgeClass(status) {
  const s = (status || "").toLowerCase();
  if (s === "checked in")
    return "bg-green-100 text-green-800 border border-green-200";
  if (s === "checked out")
    return "bg-gray-100 text-gray-700 border border-gray-200";
  if (s === "cancelled") return "bg-red-100 text-red-800 border border-red-200";
  return "bg-[#9B7846]/10 text-[#9B7846] border border-[#9B7846]/30";
}

function openDigitalPass(booking) {
  selectedBooking.value = booking;
  isPassModalOpen.value = true;
}

function viewDetails(booking) {
  selectedBooking.value = booking;
  isDetailsModalOpen.value = true;
}

function printPass() {
  window.print();
}

function handleLogout() {
  logOut();
}
</script>

<style scoped>
@media print {
  body * {
    visibility: hidden;
  }
  .relative.z-50,
  .relative.z-50 * {
    visibility: visible;
  }
}
</style>
