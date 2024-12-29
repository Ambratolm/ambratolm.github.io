<script setup>
defineProps({
  value: {
    type: Number,
    default: 0,
  },
});
</script>
<template>
  <span
    class="badge rounded-pill position-absolute top-0 start-100 translate-middle z-3"
    :class="value > 0 ? 'text-bg-success' : 'text-bg-danger'"
  >
    {{ value }}
    <span class="visually-hidden">{{ value }} matching search results</span>
  </span>
</template>
