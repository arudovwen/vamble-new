import { createApp } from "vue";
import App from "./App.vue";
import AdminApp from "./AdminApp.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import VueAnimateOnScroll from "vue3-animate-onscroll";
import currencyFormat from "@/utils/formatCurrency";
import "vue-toast-notification/dist/theme-sugar.css";
import "v-calendar/style.css";
import "qalendar/dist/style.css";
import "vue3-carousel/dist/carousel.css";
import "./assets/tailwind.css";

createApp(App)
  .use(store)
  .use(router)
  .use(VueAnimateOnScroll)
  .provide("currencyFormat", currencyFormat)
  .mount("#app");
createApp(AdminApp)
  .use(store)
  .use(router)
  .provide("currencyFormat", currencyFormat)
  .mount("#adminapp");
