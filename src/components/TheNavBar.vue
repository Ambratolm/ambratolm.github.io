<script setup>
import { RouterLink } from "vue-router";
import ThemeToggle from "./ThemeToggle.vue";
import TheLogo from "./TheLogo.vue";
import SearchBar from "./SearchBar.vue";
import { useProfilesStore, useWorksStore } from "@/core/stores";
import NavBarRouterLink from "./NavBarRouterLink.vue";
import { useSearchStore } from "@/core/stores";

const profilesStore = useProfilesStore();
const worksStore = useWorksStore();
const searchStore = useSearchStore();
</script>

<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <RouterLink :to="{ name: 'home' }" class="navbar-brand">
        <TheLogo />
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
      <SearchBar
        v-model="searchStore.query"
        :has-button="true"
        @search="searchStore.search()"
        class="my-1 my-lg-0 me-lg-3"
      />
      <div class="navbar-collapse collapse mt-3 mt-lg-0" id="navbar-collapse">
        <ul
          class="nav nav-pills flex-md-nowrap justify-content-center mb-1 mb-md-0"
        >
          <li class="nav-item">
            <NavBarRouterLink name="home" icon="fas fa-home" />
          </li>
          <li class="nav-item">
            <NavBarRouterLink
              name="works"
              icon="fas fa-landmark"
              :has-badge="worksStore.isFiltered"
              :count="worksStore.filteredCount"
            />
          </li>
          <li class="nav-item">
            <NavBarRouterLink
              name="profiles"
              icon="fas fa-address-card"
              :has-badge="profilesStore.isFiltered"
              :count="profilesStore.filteredCount"
            />
          </li>
          <li class="nav-item">
            <NavBarRouterLink name="contact" icon="fas fa-envelope" />
          </li>
          <li class="nav-item">
            <NavBarRouterLink name="about" icon="fas fa-info-circle" />
          </li>
          <li class="nav-item">
            <ThemeToggle />
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
nav {
  background-color: var(--bs-content-bg);
  border-bottom: var(--bs-border-width) solid var(--bs-content-border-color);
}
.nav-item {
  margin: 2px;
}
</style>
