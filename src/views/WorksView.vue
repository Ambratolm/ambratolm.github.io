<script setup>
import PageCard from "../components/PageCard.vue";
</script>

<template>
  <PageCard title="Works" subtitle="My projects and hobbies">
    <transition-group
      enter-active-class="animate__animated animate__bounceInUp"
      leave-active-class="animate__animated animate__bounceOutDown"
      mode="out-in"
      tag="div"
    >
      <!-- <div v-if="workStore.filteredworks" class="grid custom-works-grid">
        <ProfileCard
          v-for="(profile, i) in worksStore.filteredworks"
          :key="i"
          :profile="profile"
        />
      </div>
      <div v-else style="text-align: center"> -->
      <!-- <small>No works found</small> -->
      <!-- </div> -->
    </transition-group>
  </PageCard>
</template>

<style scoped>
.custom-works-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
@media (max-width: 800px) {
  .custom-works-grid {
    grid-template-columns: 1fr;
  }
}
</style>
