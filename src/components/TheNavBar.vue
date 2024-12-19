<script setup>
import { watch } from "vue";
import { RouterLink } from "vue-router";
import DarkToggleLink from "./DarkToggleLink.vue";
import TheLogo from "./TheLogo.vue";

//----------------------------------------------------------------------------------------------------
// # Search Query
//----------------------------------------------------------------------------------------------------
import { useProfilesStore } from "@/core/stores";
const profilesStore = useProfilesStore();
watch(
  () => profilesStore.query,
  () => profilesStore.filter(),
);

//----------------------------------------------------------------------------------------------------
// # Animate
//----------------------------------------------------------------------------------------------------
import { useTemplateRef } from "vue";
import { animateCss } from "@/core/animate";
const logo = useTemplateRef("logo");
</script>

<template>
  <nav
    class="navbar navbar-expand-md"
    style="
      background-color: var(--bs-content-bg);
      border-bottom: var(--bs-border-width) solid var(--bs-content-border-color);
    "
  >
    <div class="container-fluid">
      <RouterLink to="/" class="navbar-brand">
        <TheLogo @click="animateCss(logo, 'rubberBand', '')" ref="logo" />
      </RouterLink>
      <button
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbar-collapse"
        aria-controls="navbar-collapse"
        aria-expanded="true"
        aria-label="Toggle Navigation"
        class="navbar-toggler"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="navbar-collapse collapse" id="navbar-collapse">
        <fieldset class="input-group" role="Search">
          <input
            ref="search"
            v-model="profilesStore.query"
            type="search"
            name="search"
            placeholder="Search"
            aria-label="Search"
            class="form-control"
          />
          <button class="btn btn-primary text-nowrap">
            <i class="fa fa-search" />
          </button>
        </fieldset>
        <ul class="navbar-nav ms-auto text-center">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/works" class="nav-link">Works</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/profiles" class="nav-link">Profiles</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/contact" class="nav-link">Contact</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/about" class="nav-link">About</RouterLink>
          </li>
          <li class="nav-item">
            <DarkToggleLink
              light-icon="fa-solid fa-sun"
              dark-icon="fa-solid fa-moon"
              class="nav-link"
              title="Toggle Dark Theme"
            />
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* nav {
  border-bottom: 1px solid var(--pico-muted-border-color);
}
ul.custom-navbar-search-item {
  display: flex;
  align-items: center;
  flex: 1;
}
ul.custom-navbar-search-item li {
  flex: 1;
}
ul.custom-navbar-search-item li input {
  width: 100%;
}
@media (max-width: 1000px) {
  nav,
  nav ul {
    flex-direction: column;
    align-items: center;
  }
  .custom-navbar-links-item {
    display: flex;
    flex-direction: row;
  }
} */
</style>
