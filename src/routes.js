//====================================================================================================
// @ Routes
//----------------------------------------------------------------------------------------------------
// 		Router routes.
//====================================================================================================
import HomeView from "./views/HomeView.vue";
import WorksView from "./views/WorksView.vue";
import ProfilesView from "./views/ProfilesView.vue";
import ContactView from "./views/ContactView.vue";
import AboutView from "./views/AboutView.vue";
import SearchView from "./views/SearchView.vue";
import NotFoundView from "./views/NotFoundView.vue";

export default [
  {
    name: "home",
    path: "/",
    component: HomeView,
    $isNav: true,
    $icon: "fas fa-home",
  },
  {
    name: "works",
    path: "/works",
    component: WorksView,
    $isNav: true,
    $icon: "fas fa-landmark",
  },
  {
    name: "profiles",
    path: "/profiles",
    component: ProfilesView,
    $isNav: true,
    $icon: "fas fa-address-card",
  },
  {
    name: "contact",
    path: "/contact",
    component: ContactView,
    $isNav: true,
    $icon: "fas fa-envelope",
  },
  {
    name: "about",
    path: "/about",
    component: AboutView,
    $isNav: true,
    $icon: "fas fa-info-circle",
  },
  {
    name: "search",
    path: "/search",
    component: SearchView,
  },
  {
    name: "404",
    path: "/:pathMatch(.*)*",
    component: NotFoundView,
  },
];
