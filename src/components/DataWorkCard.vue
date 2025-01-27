<script setup>
import { limitString } from "@/modules/utilities";
defineProps({
  work: {
    type: Object,
    required: true,
    default: () => {},
  },
  selected: {
    type: Object,
    default: () => ({
      categories: [],
      languages: [],
      tags: [],
    }),
  },
  hidden: {
    type: Object,
    default: () => ({
      categories: false,
      languages: false,
      tags: false,
      links: false,
    }),
  },
});
defineEmits(["category-click", "language-click", "tag-click"]);
</script>

<template>
  <article class="card hvr-glow">
    <img
      v-img-src-alt
      :src="work?.image"
      :alt="work?.title"
      class="card-img-top"
    />
    <div class="card-body m-0 py-2">
      <h5 class="card-title mb-1">
        <i :class="work?.icon" class="hvr-icon" /> {{ work?.title }}
      </h5>
      <p class="card-text text-secondary lh-1 mb-2">
        {{ work?.description }}
      </p>
      <div v-if="!hidden.categories">
        <button
          @click="$emit('category-click', category.name)"
          v-for="(category, i) in work?.categories"
          :key="i"
          class="btn btn-sm fw-bold text-capitalize me-1"
          :class="
            selected.categories?.includes(category.name)
              ? 'btn-primary disabled'
              : 'btn-secondary'
          "
        >
          <i :class="category.icon" />
          {{ category.title }}
        </button>
        <button
          @click="$emit('language-click', language.name)"
          v-for="(language, i) in work?.languages"
          :key="i"
          class="btn btn-sm text-capitalize me-1"
          :class="
            selected.languages?.includes(language.name)
              ? 'btn-primary disabled'
              : 'btn-secondary'
          "
        >
          <i :class="language.icon" /> {{ language.title }}
        </button>
      </div>
    </div>
    <div v-if="!hidden.links" class="list-group list-group-flush">
      <a
        v-for="(link, i) in work?.links"
        :key="i"
        :href="link.url"
        :title="link.url"
        target="_blank"
        class="list-group-item list-group-item-action d-flex justify-content-between align-items-center p-2 hvr-icon-grow"
      >
        <div class="specific-w-50 me-2 text-center">
          <i :class="link.icon" :title="link.title" class="fa-2x hvr-icon" />
        </div>
        <div class="w-100">
          <div class="fw-bold">{{ link.title }}</div>
          <p
            :title="link.description"
            class="text-body-secondary pe-2 py-0 m-0 lh-1"
          >
            {{ limitString(link.description, 50) }}
          </p>
        </div>
      </a>
    </div>
    <div v-if="!hidden.tags" class="card-footer">
      <button
        @click="$emit('tag-click', tag)"
        v-for="(tag, i) in work?.tags"
        :key="i"
        class="btn btn-sm text-lowercase fst-italic me-1 mb-1"
        :class="
          selected.tags?.includes(tag)
            ? 'btn-primary disabled'
            : 'btn-secondary'
        "
      >
        <i class="fas fa-hashtag" /> {{ tag }}
      </button>
    </div>
  </article>
</template>
