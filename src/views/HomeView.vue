<script setup>
import DataWorkCard from "@/components/DataWorkCard.vue";
import { useWorksStore, usePostsStore } from "@/modules/stores";
import { ref } from "vue";
import DataPostCard from "@/components/DataPostCard.vue";

const worksStore = useWorksStore();
const postsStore = usePostsStore();
const randomWork = ref(worksStore.getRandomItem());
</script>

<template>
  <section class="row g-3">
    <div class="col-lg-3">
      <DataWorkCard
        :work="worksStore.getItem('flower-in-pain')"
        @category-click="
          (cat) => $router.push({ name: 'works', query: { cat } })
        "
        @language-click="
          (lang) => $router.push({ name: 'works', query: { lang } })
        "
        @tag-click="(tag) => $router.push({ name: 'works', query: { tag } })"
        class="mb-3"
      />
      <article class="card">
        <div
          class="card-header d-flex no-wrap justify-content-between align-items-center"
        >
          <h6 class="card-title m-0">
            <i class="fas fa-landmark" /> Random Work
          </h6>
          <button
            @click="randomWork = worksStore.getRandomItem()"
            title="Randomize"
            class="btn btn-sm btn-secondary"
          >
            <i class="fas fa-dice" />
          </button>
        </div>
        <div class="card-body">
          <DataWorkCard
            :work="randomWork"
            @category-click="
              (cat) => $router.push({ name: 'works', query: { cat } })
            "
            @language-click="
              (lang) => $router.push({ name: 'works', query: { lang } })
            "
            @tag-click="
              (tag) => $router.push({ name: 'works', query: { tag } })
            "
          />
        </div>
      </article>
    </div>
    <div class="col order-first order-lg-last">
      <div class="row g-3">
        <div v-for="post in postsStore.items" :key="post.name" class="col-12">
          <DataPostCard :post="post" />
        </div>
      </div>
    </div>
  </section>
</template>
