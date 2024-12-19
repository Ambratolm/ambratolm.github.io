<script setup>
import ProfileCard from "@/components/ProfileCard.vue";
import { onMounted } from "vue";

//----------------------------------------------------------------------------------------------------
// # Profiles
//----------------------------------------------------------------------------------------------------
import { useProfilesStore } from "@/core/stores";
import PageCard from "../components/PageCard.vue";
// import { storeToRefs } from "pinia";
const profilesStore = useProfilesStore();
onMounted(async () => await profilesStore.load());
</script>

<template>
  <div>
    <PageCard
      title="Profiles"
      subtitle="My social media accounts"
      :count="profilesStore.filteredItems?.length"
      v-model="profilesStore.query"
    >
      <transition
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut"
        mode="out-in"
      >
        <div
          v-if="!profilesStore.filteredItems?.length"
          style="text-align: center"
        >
          <small>No profiles found</small>
        </div>
      </transition>
      <transition-group
        enter-active-class="animate__animated animate__bounceInUp"
        leave-active-class="animate__animated animate__bounceOutDown"
        mode="out-in"
        tag="div"
        class="grid custom-profiles-grid"
      >
        <ProfileCard
          v-for="(profile, i) in profilesStore.filteredItems"
          :key="i"
          :profile="profile"
        />
      </transition-group>
    </PageCard>
  </div>
</template>

<style scoped>
.custom-profiles-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
@media (max-width: 800px) {
  .custom-profiles-grid {
    grid-template-columns: 1fr;
  }
}
</style>
