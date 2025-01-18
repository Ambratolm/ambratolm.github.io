<script setup>
import DataWorkCard from "@/components/DataWorkCard.vue";
import { useWorksStore, usePostsStore } from "@/modules/stores";
import { ref } from "vue";
import DataPostCard from "@/components/DataPostCard.vue";
import { useIntervalFn } from "@vueuse/core";
import { vElementHover } from "@vueuse/components";

const worksStore = useWorksStore();
const postsStore = usePostsStore();
const randomWorks = ref();
randomizeWorks();
function randomizeWorks() {
  randomWorks.value = worksStore.getRandomItems(4);
}

const { pause, resume } = useIntervalFn(
  randomizeWorks,
  1000 + 4000 * Math.random(),
);
function onRandomWorksCardHover(hovered) {
  if (hovered) pause();
  else resume();
}
</script>

<template>
  <section class="container-fluid g-0">
    <div class="row g-3 mb-3">
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
        <DataWorkCard
          :work="worksStore.getItem('mini-games')"
          @category-click="
            (cat) => $router.push({ name: 'works', query: { cat } })
          "
          @language-click="
            (lang) => $router.push({ name: 'works', query: { lang } })
          "
          @tag-click="(tag) => $router.push({ name: 'works', query: { tag } })"
          class="mb-3"
        />
      </div>
      <div class="col order-first order-lg-last">
        <div class="row g-3">
          <div v-for="post in postsStore.items" :key="post.name" class="col-12">
            <DataPostCard :post="post" />
          </div>
        </div>
      </div>
    </div>

    <article
      v-element-hover="[onRandomWorksCardHover, { delayEnter: 0 }]"
      class="card"
    >
      <div
        class="card-header d-flex no-wrap justify-content-between align-items-center"
      >
        <h6 class="card-title m-0">
          <i class="fas fa-landmark" /> Random Works
        </h6>
        <button
          @click="randomizeWorks()"
          title="Randomize"
          class="btn btn-sm btn-secondary"
        >
          <i class="fas fa-dice fa-bounce" />
        </button>
      </div>
      <div class="card-body specific-h-300 overflow-y-auto g-0">
        <div class="row g-3 m-auto">
          <div
            v-for="randomWork in randomWorks"
            :key="randomWork.name"
            class="col-lg-3 col-sm-6 col-12"
          >
            <DataWorkCard
              :work="randomWork"
              @click="
                worksStore.query.keyword = randomWork.name;
                $router.push({
                  name: 'works',
                });
              "
              @category-click="
                (cat) => $router.push({ name: 'works', query: { cat } })
              "
              @language-click="
                (lang) => $router.push({ name: 'works', query: { lang } })
              "
              @tag-click="
                (tag) => $router.push({ name: 'works', query: { tag } })
              "
              :hidden="{
                categories: true,
                languages: true,
                tags: true,
                links: true,
              }"
              :class="$animate('pulse')"
              style="cursor: pointer"
            />
          </div>
        </div>
      </div>
    </article>
  </section>
</template>
