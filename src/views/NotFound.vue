<template>
  <DefaultLayout>
    <template #content>
      <div class="notfound py-20">
        <img
          class="notfound__image"
          width="200"
          src="@/assets/images/nofound.svg"
        />

        <h1 class="notfound__h1">404 ERROR</h1>
        <h2 class="notfound__h2">WHOOPS, IT SEEMS YOU ARE LOST!!</h2>
        <router-link to="/">
          <button class="notfound__btn">Go back home</button>
        </router-link>
      </div>
    </template>
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from "@/components/layouts/defaultLayout.vue";
</script>

<style lang="scss" scoped>
.notfound {
  margin-top: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .notfound__h1 {
    font-size: 52px;
    font-weight: 600;
    @media screen and (max-width: 768px) {
      font-size: 32px;
    }
  }
  .notfound__h2 {
    font-size: 24px;
    font-weight: 600;
    @media screen and (max-width: 768px) {
      font-size: 16px;
    }
  }
  .notfound__btn {
    padding: 8px 24px;
    outline: none;
    border: 1px solid var(--black);
    font-size: 16px;
    background-color: var(--black);
    color: var(--white);
    cursor: pointer;
    border-radius: 4px;
    &:hover {
      opacity: 0.8;
      -webkit-animation: heartbeat 1.5s ease-in-out both;
      animation: heartbeat 1.5s ease-in-out both;
    }
  }
}
</style>
