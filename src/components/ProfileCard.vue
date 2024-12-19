<script setup>
defineProps({
  profile: Object,
});
</script>

<template>
  <article class="card text-center">
    <div class="card-body">
      <hgroup>
        <h5 class="card-title"><i :class="profile.icon" class="fa-3x" /></h5>
        <h5 class="card-title">{{ profile.title }}</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary">
          {{ profile.subtitle }}
        </h6>
      </hgroup>
      <a
        :href="profile.url"
        :title="profile.url"
        target="_blank"
        class="card-link stretched-link"
      >
        <i class="far fa-at"></i> {{ profile.username }}
      </a>
    </div>
  </article>
</template>
