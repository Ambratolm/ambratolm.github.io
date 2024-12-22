<script setup>
defineProps({
  name: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "fas fa-link",
  },
  hasBadge: {
    type: Boolean,
    default: false,
  },
  count: {
    type: Number,
    default: 0,
  },
});
</script>

<template>
  <RouterLink
    :to="{ name }"
    class="nav-link d-inline-flex align-items-center position-relative text-capitalize"
    :class="{
      'text-bg-secondary': hasBadge && $route.name != name,
    }"
  >
    <i :class="`${icon} me-1`" /> {{ title || name }}
    <small
      v-if="hasBadge"
      class="badge rounded-pill position-absolute top-0 start-100 translate-middle z-3"
      :class="count > 0 ? 'text-bg-success' : 'text-bg-danger'"
    >
      {{ count }}
      <span class="visually-hidden">
        {{ title || name }} matching search query are found</span
      >
    </small>
  </RouterLink>
</template>
