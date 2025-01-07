<script setup>
import TheNavBar from "./components/TheNavBar.vue";
</script>

<template>
  <header class="mb-3">
    <TheNavBar />
  </header>

  <!-------------------------------------------------------------------------------------------------------->

  <main class="container">
    <RouterView />
  </main>

  <!-------------------------------------------------------------------------------------------------------->

  <footer class="container-fluid mt-4">
    <section class="text-center p-5">
      <div class="row">
        <div class="col">
          <a href="#" class="nav-link">
            <i class="fas fa-square" /> Lorem ipsum dolor sit</a
          >
        </div>
        <div class="col">
          LOGO
          <p>&copy; <strong>Ambratolm</strong> 2025</p>
        </div>
        <div class="col">
          <a href="#" class="nav-link">Lorem ipsum dolor sit</a>
        </div>
      </div>
    </section>
  </footer>
</template>
