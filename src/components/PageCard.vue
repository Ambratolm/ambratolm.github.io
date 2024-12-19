<script setup>
defineProps({
  title: String,
  subtitle: String,
  count: Number,
});
const query = defineModel();
</script>

<template>
  <article class="card">
    <header class="card-header text-center">
      <hgroup>
        <h5 class="card-title">
          {{ title }}
          <small v-if="count !== undefined" class="badge text-bg-primary">
            {{ count }}
          </small>
        </h5>
        <h6 class="card-subtitle text-body-secondary">{{ subtitle }}</h6>
        <h6 class="sub-title mt-3" v-if="query?.trim()">
          <span class="badge text-bg-primary" data-bs-theme="dark">
            <i class="fas fa-search" /> {{ query }}
            <!-- <a @click="query = ''" href="#" class="secondary">
              <i class="fas fa-close" />
            </a> -->
            <button
              @click="query = ''"
              type="button"
              class="btn-close"
              aria-label="Close"
            />
          </span>
        </h6>
      </hgroup>
    </header>
    <section class="card-body">
      <slot></slot>
    </section>
    <footer class="card-footer"></footer>
  </article>
</template>
