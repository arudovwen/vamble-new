import { createApp } from "vue";
import App from "./App.vue";
import AdminApp from "./AdminApp.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import VueAnimateOnScroll from "vue3-animate-onscroll";
import "./assets/tailwind.css";

createApp(App).use(store).use(router).use(VueAnimateOnScroll).mount("#app");
createApp(AdminApp).use(store).use(router).mount("#adminapp");
