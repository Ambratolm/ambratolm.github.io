<script setup>
defineProps({
  work: {
    type: Object,
    default: () => {},
  },
});
</script>

<template>
  <article class="card">
    <img
      v-img-src-alt
      :src="work?.image"
      :alt="work?.title"
      class="card-img-top"
    />
    <div class="card-body m-0 pb-2">
      <h5 class="card-title"><i :class="work?.icon" /> {{ work?.title }}</h5>
      <p class="card-text text-secondary lh-1 mb-2">
        {{ work?.description }}
      </p>
    </div>
    <div class="list-group list-group-flush">
      <a
        v-for="(link, i) in work?.links"
        :key="i"
        :href="link.url"
        :title="link.url"
        target="_blank"
        class="list-group-item list-group-item-action d-flex justify-content-between align-items-center px-2"
      >
        <div class="specific-w-50 me-2 text-center">
          <i :class="link.icon" :title="link.title" class="fa-2x" />
        </div>
        <div class="w-100">
          <div class="fw-bold">{{ link.title }}</div>
          <p
            :title="link.description"
            class="text-body-secondary pe-2 py-1 m-0 lh-1"
          >
            {{ $filters.strLimit(link.description, 60) }}
          </p>
        </div>
      </a>
    </div>
    <div class="card-footer">
      <button
        @click="console.log(category)"
        v-for="(category, i) in work?.categories"
        :key="i"
        class="btn btn-sm btn-secondary fw-bold text-lowercase me-1 mb-1"
      >
        <i class="fas fa-tag" /> {{ category }}
      </button>
      <button
        @click="console.log(language)"
        v-for="(language, i) in work?.languages"
        :key="i"
        class="btn btn-sm btn-secondary text-lowercase me-1 mb-1"
      >
        <i class="fas fa-language" /> {{ language }}
      </button>
      <button
        @click="console.log(tag)"
        v-for="(tag, i) in work?.tags"
        :key="i"
        class="btn btn-sm btn-secondary text-lowercase fst-italic me-1 mb-1"
      >
        <i class="fas fa-hashtag" /> {{ tag }}
      </button>
    </div>
  </article>
</template>
