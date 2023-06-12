<template>
  <div
    :class="`scroll__top ${showScrollButton ? 'scroll__top--active' : ''}`"
    @click="scrollToTop()"
  >
    Top
  </div>
</template>

<script setup>
import { ref, onBeforeMount, onBeforeUnmount } from "vue";

const showScrollButton = ref(false);

function scrollToTop() {
  window.scrollTo(0, 0);
}
function handleScroll() {
  if (window.scrollY > window.innerHeight * 1.05) {
    showScrollButton.value = true;
  } else {
    showScrollButton.value = false;
  }
}

onBeforeMount(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
<style lang="scss" scoped>
.scroll__top {
  position: fixed;
  bottom: 30px;
  right: 20px;
  background-color: var(--black);
  font-size: 12px;
  padding: 10px 5px;
  border-radius: 4px;
  color: var(--white);
  cursor: pointer;
  opacity: 0;
  transition: 0.3s ease-in-out;

  &.scroll__top--active {
    opacity: 0.8;
  }
}
</style>
