<script setup>
import { importImages } from "@/core/assets";
import { camelCase } from "change-case";

defineProps({
  work: {
    type: Object,
    default: () => {},
  },
});

const images = importImages("works");
</script>

<template>
  <article class="card text-center">
    <img
      v-safe-image
      :src="work?.name ? images[camelCase(work?.name)] : ''"
      :alt="work?.title"
      class="card-img-top"
    />
    <div class="card-body">
      <hgroup>
        <h5 class="card-title position-relative">
          <i :class="work?.icon" class="fa-3x" />
          <span
            v-if="work?.fund"
            v-bs-tooltip="'Fund'"
            class="badge rounded-pill position-absolute start-100 top-0 translate-middle text-bg-secondary"
          >
            <i class="fas fa-dollar-sign fa-2xs" />
          </span>
        </h5>
        <h5 class="card-title text-capitalize">{{ work?.title }}</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary text-capitalize">
          {{ work?.subtitle }}
        </h6>
      </hgroup>
      <span class="text-break">
        <a
          :href="work?.url"
          :title="work?.url"
          target="_blank"
          class="link-primary text-lowercase"
        >
          <i
            :class="work?.search ? 'fas fa-search fa-sm' : 'far fa-at fa-sm'"
          />{{ work?.username }}
        </a>
      </span>
    </div>
  </article>
</template>
