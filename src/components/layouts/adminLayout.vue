<template>
  <section
    class="relative h-screen flex overflow-hidden font-sans bg-[#FAF8F5]"
  >
    <!-- Desktop Left Navigation Sidebar -->
    <aside
      class="hidden lg:block w-[270px] h-full bg-[#132212] border-r border-[#9B7846]/20 shrink-0 z-20"
    >
      <AdminSideBar />
    </aside>

    <!-- Mobile Slide-out Drawer -->
    <TransitionRoot as="template" :show="isMobileSidebarOpen">
      <Dialog as="div" class="relative z-50 lg:hidden" @close="isMobileSidebarOpen = false">
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

        <div class="fixed inset-0 overflow-hidden z-50 flex">
          <TransitionChild
            as="template"
            enter="transform transition ease-in-out duration-300"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transform transition ease-in-out duration-300"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel class="relative w-[280px] max-w-[85vw] h-full bg-[#132212] shadow-2xl flex flex-col">
              <!-- Close Button on Mobile Drawer -->
              <button
                @click="isMobileSidebarOpen = false"
                class="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-white/10 text-white/70 hover:text-white flex items-center justify-center text-xs"
                aria-label="Close sidebar"
              >
                <i class="fa fa-times"></i>
              </button>
              <div class="h-full overflow-y-auto" @click="isMobileSidebarOpen = false">
                <AdminSideBar />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Main Workspace -->
    <main
      class="flex-1 h-full overflow-auto flex flex-col bg-[#FAF8F5] relative min-w-0"
    >
      <header
        class="h-[68px] sm:h-[72px] px-4 sm:px-8 border-b border-[#9B7846]/15 bg-white/85 backdrop-blur-md sticky top-0 z-10"
      >
        <AdminTopBar @toggle-sidebar="isMobileSidebarOpen = !isMobileSidebarOpen" />
      </header>

      <div class="flex-1 px-3.5 sm:px-8 py-4 sm:py-8 max-w-7xl w-full mx-auto">
        <slot name="content"></slot>
      </div>
    </main>
  </section>
</template>

<script setup>
import { ref } from "vue";
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import AdminSideBar from "../navigation/AdminSideBar.vue";
import AdminTopBar from "../navigation/AdminTopBar.vue";

const isMobileSidebarOpen = ref(false);
</script>
