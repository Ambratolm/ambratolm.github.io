<script setup>
import { watch } from "vue";
import { useProfilesStore } from "@/core/stores";
import { useSearchStore } from "@/core/stores";
import { useWorksStore } from "../core/stores";
const searchStore = useSearchStore();
const profilesStore = useProfilesStore();
const worksStore = useWorksStore();
watch(
  () => searchStore.query,
  (query) => {
    worksStore.query = query;
    profilesStore.query = query;
    worksStore.filter();
    profilesStore.filter();
  },
);
</script>

<template>
  <fieldset class="input-group" role="Search">
    <input
      ref="search"
      v-model="searchStore.query"
      type="search"
      name="search"
      placeholder="Search"
      aria-label="Search"
      class="form-control"
    />
  </fieldset>
</template>
