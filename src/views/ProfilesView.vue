<script setup>
import SearchBar from "@/components/SearchBar.vue";
import ProfileCard from "@/components/ProfileCard.vue";
import { useProfilesStore } from "@/core/stores";

const profilesStore = useProfilesStore();
</script>

<template>
  <article class="card h-100">
    <div class="card-header text-center text-sm-start">
      <div class="row justify-content-between align-items-center">
        <div class="col">
          <h6 class="m-0 fw-normal d-block">
            <span class="title me-1">
              <i class="fas fa-address-card" /> Profiles
            </span>
            <span
              class="badge badge-sm"
              :class="
                profilesStore.isFiltered
                  ? profilesStore.hasFilteredItems
                    ? 'text-bg-success'
                    : 'text-bg-danger'
                  : 'text-bg-secondary'
              "
            >
              {{ profilesStore.filteredCount }}
            </span>
          </h6>
        </div>
        <div class="col-lg-3 col-sm-6 mt-1 mt-sm-0">
          <SearchBar v-model="profilesStore.query" />
        </div>
      </div>
    </div>
    <div class="card-body">
      <transition-group
        v-if="profilesStore.hasFilteredItems"
        :enter-active-class="$animateCss('bounceInUp').class"
        :leave-active-class="$animateCss('bounceOutDown').class"
        mode="out-in"
        tag="div"
        class="row g-3"
      >
        <div
          v-for="(profile, i) in profilesStore.filteredItems"
          :key="i"
          class="col-xl-2 col-lg-3 col-md-4 col-sm-6"
        >
          <ProfileCard
            :profile="profile"
            @mouseenter="
              $animateCss('pulse', 'faster').element = $event.toElement
            "
          />
        </div>
      </transition-group>
      <transition
        :enter-active-class="$animateCss('fadeIn').class"
        :leave-active-class="$animateCss('fadeOut').class"
        mode="out-in"
      >
        <div
          v-if="!profilesStore.hasFilteredItems"
          class="text-secondary fst-italic text-center"
        >
          No items found
        </div>
      </transition>
    </div>
  </article>
</template>
