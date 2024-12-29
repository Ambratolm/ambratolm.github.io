<script setup>
import NavBar from "@/components/NavBar.vue";
import { useSearchStore, useProfilesStore, useWorksStore } from "@/core/stores";
import { RouterLink } from "vue-router";
import ThemeToggle from "@/components//ThemeToggle.vue";
import TheLogo from "@/components//TheLogo.vue";
import SearchBar from "@/components//SearchBar.vue";
import SearchBadge from "./components/SearchBadge.vue";

defineProps({});

const profilesStore = useProfilesStore();
const worksStore = useWorksStore();
const searchStore = useSearchStore();
</script>

<template>
  <header class="animate__animated animate__backInDown mb-3">
    <NavBar name="main">
      <template #start>
        <div class="navbar-brand">
          <RouterLink :to="{ name: 'home' }">
            <TheLogo mode="logo" />
          </RouterLink>
        </div>
      </template>
      <template #default>
        <fieldset class="input-group my-1 my-lg-0 me-lg-3" role="Search">
          <SearchBar v-model="searchStore.query" />
          <button
            @click="searchStore.search()"
            type="button"
            class="btn btn-secondary"
          >
            <i class="fas fa-search" aria-hidden="true" />
            <span class="visually-hidden">Execute search</span>
          </button>
        </fieldset>
      </template>
      <template #collapse>
        <ul
          class="nav nav-pills flex-md-nowrap justify-content-center mb-1 mb-md-0"
        >
          <li class="nav-item">
            <RouterLink
              :to="{ name: 'home' }"
              class="nav-link d-inline-flex align-items-center position-relative text-capitalize"
            >
              <i class="fas fa-home me-1" /> Home
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink
              :to="{ name: 'works' }"
              :class="{
                'text-bg-secondary':
                  worksStore.isFiltered && $route.name != 'works',
              }"
              class="nav-link d-inline-flex align-items-center position-relative text-capitalize"
            >
              <i class="fas fa-landmark me-1" /> Works
              <SearchBadge
                v-if="worksStore.isFiltered"
                :value="worksStore.filteredCount"
              />
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink
              :to="{ name: 'profiles' }"
              :class="{
                'text-bg-secondary':
                  profilesStore.hasFilteredItems && $route.name != 'profiles',
              }"
              class="nav-link d-inline-flex align-items-center position-relative text-capitalize"
            >
              <i class="fas fa-address-card me-1" /> Profiles
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink
              :to="{ name: 'contact' }"
              class="nav-link d-inline-flex align-items-center position-relative text-capitalize"
            >
              <i class="fas fa-envelope me-1" /> Contact
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink
              :to="{ name: 'about' }"
              class="nav-link d-inline-flex align-items-center position-relative text-capitalize"
            >
              <i class="fas fa-info-circle me-1" /> About
            </RouterLink>
          </li>
          <li class="nav-item">
            <ThemeToggle />
          </li>
        </ul>
      </template>
    </NavBar>
  </header>

  <!-------------------------------------------------------------------------------------------------------->

  <main class="container animate__animated animate__backInUp">
    <Suspense>
      <RouterView v-slot="{ Component }">
        <transition
          enter-active-class="animate__animated animate__fadeIn animate__faster"
          leave-active-class="animate__animated animate__fadeOut animate__faster"
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </RouterView>
      <template #fallback><article aria-busy="true"></article></template>
    </Suspense>
  </main>

  <!-------------------------------------------------------------------------------------------------------->

  <footer class="container-fluid animate__animated animate__backInUp mt-4">
    <section class="text-center p-5">
      <p>&copy; <strong>Ambratolm</strong> 2025</p>
    </section>
  </footer>
</template>

<style scoped>
nav {
  background-color: var(--bs-content-bg);
  border-bottom: var(--bs-border-width) solid var(--bs-content-border-color);
}
.nav-item {
  margin: 2px;
}
footer {
  background-color: var(--bs-content-bg);
  border-top: var(--bs-border-width) solid var(--bs-content-border-color);
}
</style>
