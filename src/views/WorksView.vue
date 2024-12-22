<script setup></script>

<template>
  <section>
    Works - My projects and hobbies
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
  </section>
</template>
