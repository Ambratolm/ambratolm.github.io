<script setup>
import TheNavBar from "@/components/TheNavBar.vue";
</script>

<template>
  <header
    class="animate__animated animate__backInDown"
    style="margin-bottom: 20px"
    data-bs-toggle="tooltip"
    data-bs-title="I am the navbaro of the navbars :3"
  >
    <TheNavBar />
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
footer {
  background-color: var(--bs-content-bg);
  border-top: var(--bs-border-width) solid var(--bs-content-border-color);
}
</style>
