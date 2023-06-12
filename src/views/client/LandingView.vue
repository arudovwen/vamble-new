<template>
  <DefaultLayout>
    <template #content>
      <BannerComponent />
      <LocalTalents />
      <KnowMore />
      <RoomsComponent />
      <ReadMore />
      <TestimonialComponent />
      <GalleryComponent />
      <NewsLetter />
    </template>
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from "@/components/layouts/defaultLayout.vue";
import BannerComponent from "@/components/landing/BannerComponent.vue";
import LocalTalents from "@/components/landing/LocalTalents.vue";
import KnowMore from "@/components/landing/KnowMore.vue";
import RoomsComponent from "@/components/landing/RoomsComponent.vue";
import TestimonialComponent from "@/components/landing/TestimonialComponent.vue";
import ReadMore from "@/components/landing/ReadMore.vue";
import NewsLetter from "@/components/landing/NewsLetter.vue";
import GalleryComponent from "@/components/landing/GalleryComponent.vue";
</script>
