<script setup>
import { useWorksStore } from "@/core/stores";

const worksStore = useWorksStore();
</script>

<template>
  <section>
    <h1>Home</h1>
    <p v-for="work in worksStore.items" :key="work.name">
      {{ work.title }}
    </p>
  </section>
</template>
