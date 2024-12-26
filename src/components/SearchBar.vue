<script setup>
defineProps({
  hasButton: {
    type: Boolean,
    default: false,
  },
});
const query = defineModel({
  type: String,
  default: "",
});
defineEmits(["search"]);
</script>

<template>
  <fieldset class="input-group" role="Search">
    <!-- <div class="position-relative">
      <label
        for="search-input"
        class="position-absolute top-50 start-0 translate-middle-y z-1 text-body-secondary ps-2"
      >
        <i class="fas fa-search" aria-hidden="true" />
        <span class="visually-hidden">Search</span>
      </label>
    </div> -->
    <!-- <div class="input-group-text">
      <i class="fas fa-search" />
    </div> -->
    <input
      v-model="query"
      type="search"
      name="search"
      placeholder="Search"
      aria-label="Search"
      class="form-control z-0"
    />
    <button
      v-if="hasButton"
      @click="$emit('search')"
      type="button"
      class="btn btn-secondary"
    >
      <i class="fas fa-search" aria-hidden="true" />
      <span class="visually-hidden">Execute search</span>
    </button>
  </fieldset>
</template>
