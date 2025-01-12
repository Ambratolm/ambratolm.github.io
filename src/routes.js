//====================================================================================================
// @ Routes
//----------------------------------------------------------------------------------------------------
// 		Router routes.
//====================================================================================================
import HomeView from "./views/HomeView.vue";
import NotFoundView from "./views/NotFoundView.vue";
import ConnectView from "./views/ConnectView.vue";
import WorksView from "./views/WorksView.vue";

export default [
  {
    name: "home",
    path: "/",
    component: HomeView,
    meta: {
      title: "Home",
      icon: "fas fa-home",
      isNav: true,
    },
  },
  {
    name: "works",
    path: "/works",
    component: WorksView,
    meta: {
      title: "Works",
      icon: "fas fa-landmark",
      isNav: true,
    },
  },
  {
    name: "connect",
    path: "/connect",
    component: ConnectView,
    meta: {
      title: "Connect",
      icon: "fas fa-circle-nodes",
      isNav: true,
    },
  },
  {
    name: "not-found",
    path: "/:pathMatch(.*)*",
    component: NotFoundView,
    meta: {
      title: "Not Found",
    },
  },
];
