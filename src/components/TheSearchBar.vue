<script setup>
import { useSearchStore } from "@/core/stores";
const searchStore = useSearchStore();
</script>

<template>
  <fieldset class="input-group" role="Search">
    <input
      v-model="searchStore.query"
      type="search"
      name="search"
      placeholder="Search"
      aria-label="Search"
      class="form-control"
    />
    <button
      @click="searchStore.search()"
      type="button"
      class="btn btn-secondary"
    >
      <i class="fas fa-search" />
    </button>
  </fieldset>
</template>
