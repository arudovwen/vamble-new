import { createApp } from "vue";
import App from "./App.vue";
import AdminApp from "./AdminApp.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import VCalendar from "v-calendar";
import VueAnimateOnScroll from "vue3-animate-onscroll";
import "vue-toast-notification/dist/theme-sugar.css";
import "v-calendar/style.css";

import "./assets/tailwind.css";

createApp(App)
  .use(store)
  .use(router)
  .use(VueAnimateOnScroll)
  .use(VCalendar, {})
  .mount("#app");
createApp(AdminApp)
  .use(store)
  .use(router)
  .use(VCalendar, {})
  .mount("#adminapp");
