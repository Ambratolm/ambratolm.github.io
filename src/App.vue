<script setup>
import TheHeader from "./components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";
import { useTitle } from "@vueuse/core";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const title = computed(() => {
  const websiteTitle = "Ambratolm";
  const pageTitle = route.name === "home" ? "" : route.meta?.title;
  return pageTitle ? `${websiteTitle} - ${pageTitle}` : websiteTitle;
});
useTitle(title);
</script>

<template>
  <TheHeader />

  <main class="container">
    <RouterView />
  </main>

  <TheFooter />
</template>

<style scoped>
footer {
  background-color: var(--bs-content-bg);
}
</style>
