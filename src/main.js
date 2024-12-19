//====================================================================================================
// @ Main
//----------------------------------------------------------------------------------------------------
// 		Main entry point.
//====================================================================================================

//----------------------------------------------------------------------------------------------------
// # CSS
//----------------------------------------------------------------------------------------------------
import "halfmoon/css/halfmoon.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "animate.css";
import "./style.css";
import "bootstrap/js/dist/collapse";

//----------------------------------------------------------------------------------------------------
// # Router
//----------------------------------------------------------------------------------------------------
import HomeView from "./views/HomeView.vue";
import WorksView from "./views/WorksView.vue";
import ProfilesView from "./views/ProfilesView.vue";
import ContactView from "./views/ContactView.vue";
import AboutView from "./views/AboutView.vue";
const routes = [
  { path: "/", component: HomeView },
  { path: "/works", component: WorksView },
  { path: "/profiles", component: ProfilesView },
  { path: "/contact", component: ContactView },
  { path: "/about", component: AboutView },
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
// # Boot
//----------------------------------------------------------------------------------------------------
import { createApp } from "vue";
import App from "./App.vue";
createApp(App).use(router).use(pinia).mount("#app");
