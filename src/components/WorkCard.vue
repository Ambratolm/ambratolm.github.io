<script setup>
const props = defineProps({
  work: {
    type: Object,
    default: () => {},
  },
});
console.log(props.work);
</script>

<template>
  <article class="card">
    <img
      v-img-src-alt
      :src="work?.image"
      :alt="work?.title"
      class="card-img-top"
    />
    <div class="card-body pb-1">
      <h5 class="card-title"><i :class="work?.icon" /> {{ work?.title }}</h5>
      <div class="card-text mb-1 text-capitalize">
        <small
          v-for="(category, i) in work?.categories"
          :key="i"
          class="card-text badge text-bg-secondary"
        >
          {{ category }}
        </small>
      </div>
      <p class="card-text lh-1">
        {{ work?.description }}
      </p>
    </div>
    <ul class="list-group list-group-flush">
      <li
        v-for="(link, i) in work?.links"
        :key="i"
        class="list-group-item list-group-item-action"
      >
        <i :class="link.icon" />
        <div>
          <a :href="link.url" :title="link.url">{{ link.title }}</a>
        </div>
        <span class="text-body-secondary">{{ link.description }}</span>
      </li>
    </ul>
    <!-- <div class="accordion accordion-flush" id="links">
      <div v-for="(link, i) in work?.links" :key="i" class="accordion-item">
        <h2 class="accordion-header">
          <button
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="`#${work?.name}-link-${i}`"
            aria-expanded="false"
            :aria-controls="`#${work?.name}-link-${i}`"
          >
            <i :class="link.icon" />&nbsp; {{ link.title }}
          </button>
        </h2>
        <div
          :id="`${work?.name}-link-${i}`"
          class="accordion-collapse collapse"
          data-bs-parent="#links"
        >
          <div class="accordion-body text-body-secondary lh-1">
            <p>{{ link.description }}</p>
            <a :href="link.url" target="_blank" class="card-link">Visit</a>
          </div>
        </div>
      </div>
    </div> -->

    <div class="card-body">
      <a href="#" class="card-link">Card link</a>
      <a href="#" class="card-link">Another link</a>
    </div>
    <div class="card-footer">
      <!-- <a
        href=""
        v-for="(tag, i) in work?.tags"
        :key="i"
        class="badge text-bg-secondary"
      >
        <small> #{{ tag }} </small>
      </a> -->
    </div>
  </article>

  <!-- <article class="card text-center">
    <img
      v-img-src-alt
      :src="work?.image"
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
  </article> -->
</template>
