<script setup>
import { IMAGES } from "@/modules/assets";
import ThemeImage from "@/components/ThemeImage.vue";
import ThemeToggle from "@/components/ThemeToggle.vue";
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const searchQuery = ref(route.query["q"] || "");
const { logos } = IMAGES;

function search(query) {
  if (!query?.trim()) return;
  router.replace({
    name: "search",
    query: { q: searchQuery.value },
  });
}
watch(searchQuery, search);
</script>

<template>
  <nav class="navbar navbar-expand-lg border-bottom">
    <div class="container-fluid">
      <div class="navbar-brand align-self-center">
        <RouterLink :to="{ name: 'home' }">
          <ThemeImage
            :light-src="logos['ambratolm-logo-light']"
            :dark-src="logos['ambratolm-logo-dark']"
            width="180px"
            alt="Ambratolm Logo"
          />
        </RouterLink>
      </div>
      <button
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#main-navbar-collapse"
        aria-controls="main-navbar-collapse"
        aria-expanded="true"
        aria-label="Toggle main navigation"
        class="navbar-toggler"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <fieldset class="input-group my-1 my-lg-0 me-lg-3" role="Search">
        <input
          v-model="searchQuery"
          type="search"
          name="search"
          placeholder="Search"
          aria-label="Search"
          class="form-control z-0"
        />
        <button
          @click="search(searchQuery)"
          class="btn"
          :class="$route.name === 'search' ? 'btn-primary' : 'btn-secondary'"
          aria-label="Search"
        >
          <i class="fas fa-search" aria-hidden="true" />
          <span class="visually-hidden">Execute search</span>
        </button>
      </fieldset>
      <div
        class="navbar-collapse collapse mt-3 mt-lg-0"
        id="main-navbar-collapse"
      >
        <ul
          class="nav nav-pills flex-md-nowrap justify-content-center mb-1 mb-md-0"
        >
          <li
            v-for="{ name, $icon } in $navRoutes"
            :key="name"
            class="nav-item"
          >
            <RouterLink
              :to="{ name }"
              class="nav-link d-inline-flex align-items-center position-relative text-capitalize"
            >
              <i :class="$icon" class="me-1" aria-hidden="true" /> {{ name }}
            </RouterLink>
          </li>
          <li class="nav-item ms-3">
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
}
.nav-item {
  margin: 2px;
}
</style>
