<script setup>
import { strLimit } from "@/modules/utilities";
defineProps({
  profile: {
    type: Object,
    required: true,
    default: () => {},
  },
  view: {
    type: String,
    default: "full", // "full", "icon"
  },
});
</script>

<template>
  <div>
    <article
      v-if="view === 'icon'"
      v-tooltip="`${profile?.title}`"
      class="specific-w-50 specific-h-50 text-center hvr-icon-grow"
    >
      <a :href="profile?.url" target="_blank" class="nav-link">
        <i :class="profile?.icon" class="fa-3x m-1 hvr-icon" />
      </a>
    </article>
    <article v-else class="card text-center hvr-grow hvr-icon-shrink">
      <div class="card-body">
        <hgroup>
          <h5 class="card-title position-relative">
            <i :class="profile?.icon" class="fa-3x hvr-icon" />
            <span
              v-if="profile?.fund"
              title="Fund"
              class="badge rounded-pill position-absolute start-100 top-0 translate-middle text-bg-secondary"
            >
              <i class="fas fa-dollar-sign fa-2xs" />
            </span>
          </h5>
          <h5 class="card-title text-capitalize">{{ profile?.title }}</h5>
          <h6 class="card-subtitle mb-2 text-body-secondary text-capitalize">
            {{ profile?.subtitle }}
          </h6>
        </hgroup>
        <span class="text-break">
          <a
            :href="profile?.url"
            target="_blank"
            class="nav-link stretched-link text-lowercase"
          >
            <i v-if="profile?.email" class="fas fa-envelope fa-sm" />
            <i v-else-if="profile?.search" class="fas fa-search fa-sm" />
            <i v-else class="fas fa-at fa-sm" />
            {{ strLimit(profile?.username, 10) }}
          </a>
        </span>
      </div>
    </article>
  </div>
</template>
