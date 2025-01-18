<script setup>
import avatarSrc from "@/assets/images/avatar.png";
defineProps({
  post: {
    type: Object,
    required: true,
    default: () => {},
  },
});
</script>

<template>
  <article class="card hvr-glow">
    <div class="card-body text-capitlize">
      <div class="row justify-content-between align-items-start">
        <div class="col-auto">
          <RouterLink :to="{ name: 'connect' }" class="nav-link">
            <img
              v-img-src-alt
              :src="avatarSrc"
              alt="Ambratolm"
              class="border rounded-circle"
              width="60px"
            />
          </RouterLink>
        </div>
        <div class="col p-0 m-0">
          <RouterLink :to="{ name: 'connect' }" class="nav-link d-inline-block">
            <strong>Ambratolm</strong>
            <i
              class="fas fa-circle-check text-body-secondary fa-xs ms-1 me-2"
            />
          </RouterLink>
          <small v-if="post?.date" class="text-body-secondary">
            {{ post?.date }}
          </small>

          <h5 class="mb-1"><i :class="post?.icon" /> {{ post?.title }}</h5>
          <p class="lead mb-0">
            {{ post?.content }}
          </p>
          <div v-if="post?.video" class="mt-2 me-3">
            <video :src="post?.video" width="100%" height="100%" controls>
              <a :href="post?.video">Download {{ post?.name }} video</a>
            </video>
          </div>
          <div v-if="post?.embed" class="mt-2 me-3">
            <div class="card position-relative" style="padding: 75% 0 0 0">
              <iframe
                :title="post?.embed?.title"
                :src="post?.embed?.src"
                frameborder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                class="position-absolute top-0 left-0 w-100 h-100"
              >
              </iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>
