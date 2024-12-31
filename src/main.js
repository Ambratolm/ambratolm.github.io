//====================================================================================================
// @ Main
//----------------------------------------------------------------------------------------------------
// 		Application main entry point.
//====================================================================================================

//----------------------------------------------------------------------------------------------------
// # CSS Style
//----------------------------------------------------------------------------------------------------
import "@fortawesome/fontawesome-free/css/all.css";
import "animate.css";
import "halfmoon/css/halfmoon.css";
import "halfmoon/css/cores/halfmoon.cores.css";
import "./style.css";

//----------------------------------------------------------------------------------------------------
// # JS Style
//----------------------------------------------------------------------------------------------------
import "bootstrap/js/dist/collapse";
import "bootstrap/js/dist/dropdown";

//----------------------------------------------------------------------------------------------------
// # Application
//----------------------------------------------------------------------------------------------------
import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);

//----------------------------------------------------------------------------------------------------
// # Store
//----------------------------------------------------------------------------------------------------
import { createPinia } from "pinia";
const pinia = createPinia();
app.use(pinia);

//----------------------------------------------------------------------------------------------------
// # Router
//----------------------------------------------------------------------------------------------------
import routes from "./routes";
import { createWebHistory, createRouter } from "vue-router";
const router = createRouter({
  linkActiveClass: "active",
  linkExactActiveClass: "active",
  history: createWebHistory(),
  routes,
});
app.use(router);

//----------------------------------------------------------------------------------------------------
// # Global Properties
//----------------------------------------------------------------------------------------------------
import { strLimit, animateCss } from "@/core/misc";
import { capitalCase } from "change-case";
app.config.globalProperties.$navRoutes = routes.filter((route) => route.$isNav);
app.config.globalProperties.$filters = { strLimit, capitalCase };
app.config.globalProperties.$animateCss = animateCss;

//----------------------------------------------------------------------------------------------------
// # Global Directives
//----------------------------------------------------------------------------------------------------
import { imgSrcAlt, bsTooltip } from "@/core/directives";
app.directive("bsTooltip", bsTooltip);
app.directive("imgSrcAlt", imgSrcAlt);

//----------------------------------------------------------------------------------------------------
// # Application Boot
//----------------------------------------------------------------------------------------------------
app.mount("#app");
