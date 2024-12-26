<script setup>
import CollectionStoreCard from "@/components/CollectionStoreCard.vue";
import WorkCard from "@/components/WorkCard.vue";
import { useWorksStore } from "@/core/stores";

const worksStore = useWorksStore();
</script>

<template>
  <CollectionStoreCard
    v-model="worksStore.query"
    :collection-store="worksStore"
  >
    <template #title><i class="fas fa-landmark" /> Works</template>
    <template #default="{ item }">
      <WorkCard :work="item" class="h-100" />
    </template>
  </CollectionStoreCard>
</template>
