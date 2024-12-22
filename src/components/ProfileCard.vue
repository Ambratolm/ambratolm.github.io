<script setup>
defineProps({
  profile: {
    type: Object,
    default: () => {},
  },
});
</script>

<template>
  <article class="card text-center">
    <div class="card-body">
      <hgroup>
        <h5 class="card-title position-relative">
          <i :class="profile?.icon" class="fa-3x" />
          <span
            v-if="profile?.fund"
            v-bs-tooltip="'Fund'"
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
          :title="profile?.url"
          target="_blank"
          class="link-primary text-lowercase"
        >
          <i
            :class="profile?.search ? 'fas fa-search fa-sm' : 'far fa-at fa-sm'"
          />{{ profile?.username }}
        </a>
      </span>
    </div>
  </article>
</template>
