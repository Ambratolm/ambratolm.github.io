<script setup></script>

<template>
  <section class="card m-5 text-center">
    <div class="card-body text-center p-5">
      <h6 class="display-3 text-warning">
        <i
          class="fas fa-triangle-exclamation fa-fade fa-3x mb-3"
          aria-hidden="true"
        />
        <p class="mb-4">Page Not Found</p>
      </h6>
      <p class="lead">
        Could not find any page at <strong>{{ $route.fullPath }}</strong>
      </p>
      <a href="/" class="btn btn-lg btn-secondary px-5 mt-3">OK</a>
    </div>
  </section>
</template>

<style scoped></style>
