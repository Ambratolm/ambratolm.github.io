//====================================================================================================
// @ Main
//----------------------------------------------------------------------------------------------------
// 		Application main entry point.
//====================================================================================================

//----------------------------------------------------------------------------------------------------
// # CSS
//----------------------------------------------------------------------------------------------------
import "@fortawesome/fontawesome-free/css/all.css";
import "animate.css";
import "halfmoon/css/halfmoon.css";
import "halfmoon/css/cores/halfmoon.cores.css";
import "./style.css";

//----------------------------------------------------------------------------------------------------
// # JS
//----------------------------------------------------------------------------------------------------
import "bootstrap/js/dist/collapse";
import "bootstrap/js/dist/dropdown";

//----------------------------------------------------------------------------------------------------
// # Router
//----------------------------------------------------------------------------------------------------
import HomeView from "./views/HomeView.vue";
import WorksView from "./views/WorksView.vue";
import ProfilesView from "./views/ProfilesView.vue";
import ContactView from "./views/ContactView.vue";
import AboutView from "./views/AboutView.vue";
const routes = [
  { name: "home", path: "/", component: HomeView },
  { name: "works", path: "/works", component: WorksView },
  { name: "profiles", path: "/profiles", component: ProfilesView },
  { name: "contact", path: "/contact", component: ContactView },
  { name: "about", path: "/about", component: AboutView },
];
import { createWebHistory, createRouter } from "vue-router";
const router = createRouter({
  linkActiveClass: "active",
  linkExactActiveClass: "active",
  history: createWebHistory(),
  routes,
});

//----------------------------------------------------------------------------------------------------
// # Store
//----------------------------------------------------------------------------------------------------
import { createPinia } from "pinia";
const pinia = createPinia();

//----------------------------------------------------------------------------------------------------
// # Application
//----------------------------------------------------------------------------------------------------
import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);
app.use(router).use(pinia);
app.config.globalProperties.$filters = {
  strLimit(value, size = 50, dotsSuffix = "...") {
    value = value ? String(value) : "";
    return value
      ? value.length <= size
        ? value
        : value.substr(0, size) + dotsSuffix
      : "";
  },
};

//----------------------------------------------------------------------------------------------------
// # Global Directives
//----------------------------------------------------------------------------------------------------
import bsTooltip from "@/directives/bs-tooltip";
import imgSrcAlt from "@/directives/img-src-alt";
app.directive("bsTooltip", bsTooltip);
app.directive("imgSrcAlt", imgSrcAlt);

//----------------------------------------------------------------------------------------------------
// # Boot
//----------------------------------------------------------------------------------------------------
app.mount("#app");
