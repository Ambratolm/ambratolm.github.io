<script setup>
import NavBar from "@/components/NavBar.vue";
import { RouterLink } from "vue-router";
import ThemeToggle from "@/components//ThemeToggle.vue";
import TheLogo from "@/components//TheLogo.vue";
import SearchBar from "@/components//SearchBar.vue";
import { onMounted, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const query = ref("");

function search(query) {
  if (!query?.trim()) return;
  router.replace({
    name: "search",
    query: { query },
  });
}

onMounted(async () => {
  await router.isReady();
  query.value = route.query["query"] || "";
});
watch(query, search);
</script>

<template>
  <header class="mb-3">
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
          <SearchBar @keydown.enter="search(query)" v-model="query" />
          <button
            @click="search(query)"
            class="btn"
            :class="$route.name === 'search' ? 'btn-primary' : 'btn-secondary'"
            aria-label="Search"
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
      </template>
    </NavBar>
  </header>

  <!-------------------------------------------------------------------------------------------------------->

  <main class="container">
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

  <footer class="container-fluid mt-4">
    <section class="text-center p-5">
      <div class="row">
        <div class="col">
          <a href="#" class="nav-link"><i class="fas fa-square" /></a>
          <a href="#" class="nav-link"><i class="fas fa-square" /></a>
          <a href="#" class="nav-link"><i class="fas fa-square" /></a>
        </div>
        <div class="col">
          <TheLogo mode="symbol" width="64px" class="pb-3" />
          <p>&copy; <strong>Ambratolm</strong> 2025</p>
        </div>
        <div class="col">
          <a href="#" class="nav-link">Some Link Link</a>
          <a href="#" class="nav-link">Some Link Some Link</a>
          <a href="#" class="nav-link">Some Link</a>
        </div>
      </div>
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
