<script setup>
import CollectionStoreCard from "@/components/CollectionStoreCard.vue";
import ProfileCard from "@/components/ProfileCard.vue";
import { useProfilesStore } from "@/core/stores";

const profilesStore = useProfilesStore();
</script>
<template>
  <CollectionStoreCard
    v-model="profilesStore.query"
    :collection-store="profilesStore"
  >
    <template #title><i class="fas fa-address-card" /> Profiles</template>
    <template #default="{ item }">
      <ProfileCard :profile="item" class="h-100" />
    </template>
  </CollectionStoreCard>
</template>
