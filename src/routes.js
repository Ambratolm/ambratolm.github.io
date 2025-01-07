//====================================================================================================
// @ Routes
//----------------------------------------------------------------------------------------------------
// 		Router routes.
//====================================================================================================
import HomeView from "./views/HomeView.vue";
import SearchView from "./views/SearchView.vue";
import NotFoundView from "./views/NotFoundView.vue";
import AboutView from "./views/AboutView.vue";
import ContactView from "./views/ContactView.vue";
import WorksView from "./views/WorksView.vue";

export default [
  {
    name: "home",
    path: "/",
    component: HomeView,
    $icon: "fas fa-home",
    $isNav: true,
  },
  {
    name: "works",
    path: "/works",
    component: WorksView,
    $icon: "fas fa-landmark",
    $isNav: true,
  },
  {
    name: "contact",
    path: "/contact",
    component: ContactView,
    $icon: "fas fa-envelope",
    $isNav: true,
  },
  {
    name: "about",
    path: "/about",
    component: AboutView,
    $icon: "fas fa-info-circle",
    $isNav: true,
  },
  {
    name: "search",
    path: "/search",
    component: SearchView,
  },
  {
    name: "not-found",
    path: "/:pathMatch(.*)*",
    component: NotFoundView,
  },
];
