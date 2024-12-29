<script setup>
defineProps({
  name: {
    type: String,
    default: "untitled",
  },
});
</script>

<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <slot name="start"></slot>
      <button
        type="button"
        data-bs-toggle="collapse"
        :data-bs-target="`#${name}-navbar-collapse`"
        :aria-controls="`${name}-navbar-collapse`"
        aria-expanded="true"
        :aria-label="`Toggle ${name} navigation`"
        class="navbar-toggler"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <slot></slot>
      <div
        class="navbar-collapse collapse mt-3 mt-lg-0"
        :id="`${name}-navbar-collapse`"
      >
        <slot name="collapse"></slot>
      </div>
    </div>
  </nav>
</template>
