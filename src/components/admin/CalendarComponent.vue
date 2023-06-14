<template>
  <div class="bg-white rounded-lg border shadow text-left overflow-hidden p-6">
    <Qalendar :events="events" :config="config" />
  </div>
</template>
<script setup>
import { Qalendar } from "qalendar";

const events = [
  // ...
  {
    title: "Advanced algebra",
    with: "Chandler Bing",
    time: { start: "2023-05-16 12:05", end: "2023-05-16 13:35" },
    color: "yellow",
    isEditable: true,
    id: "753944708f0f",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores assumenda corporis doloremque et expedita molestias necessitatibus quam quas temporibus veritatis. Deserunt excepturi illum nobis perferendis praesentium repudiandae saepe sapiente voluptatem!",
  },
  {
    title: "Ralph on holiday",
    with: "Rachel Greene",
    time: { start: "2023-05-10", end: "2023-05-22" },
    color: "green",
    isEditable: true,
    id: "5602b6f589fc",
  },
  // ...
];
const config = {
  // see configuration section
};
</script>
<style></style>
