<script setup>
import SearchBar from "@/components/SearchBar.vue";
import WorkCard from "@/components/WorkCard.vue";
import { useWorksStore, useCategoriesStore } from "@/core/stores";

const worksStore = useWorksStore();
const categoriesStore = useCategoriesStore();
</script>

<template>
  <article>
    <header class="container mb-3">
      <fieldset class="input-group my-1 my-lg-0 me-lg-3" role="Search">
        <span class="input-group-text">
          <h6 class="m-0">
            <a
              href="#"
              @click="worksStore.category = worksStore.tag = ''"
              class="nav-link"
            >
              <i class="fas fa-landmark" /> Works
            </a>
          </h6>
        </span>
        <button
          type="button"
          class="btn btn-secondary dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i :class="categoriesStore.current?.icon" />
          {{ categoriesStore.current?.title }}
        </button>
        <ul class="dropdown-menu">
          <li v-for="(category, i) in categoriesStore.items" :key="i">
            <a
              href="#"
              @click="worksStore.category = category.name"
              :class="{ active: category.name === worksStore.category }"
              class="dropdown-item"
            >
              <i :class="category.icon" /> {{ category.title }}
            </a>
          </li>
        </ul>
        <span v-if="worksStore.tag" class="input-group-text">
          <i class="fas fa-hashtag me-1" /> {{ worksStore.tag }}
        </span>
        <button
          v-if="worksStore.tag"
          @click="worksStore.tag = ''"
          class="btn btn-sm btn-secondary"
        >
          <i class="fas fa-xmark" />
        </button>
        <span v-if="worksStore.language" class="input-group-text">
          <i class="fas fa-language me-1" /> {{ worksStore.language }}
        </span>
        <button
          v-if="worksStore.language"
          @click="worksStore.language = ''"
          class="btn btn-sm btn-secondary"
        >
          <i class="fas fa-xmark" />
        </button>
        <SearchBar v-model="worksStore.query" />
      </fieldset>
    </header>
    <div class="container-fluid">
      <transition-group
        v-if="worksStore.hasFilteredItems"
        :enter-active-class="$animateCss('bounceInUp').class"
        :leave-active-class="$animateCss('bounceOutDown').class"
        mode="out-in"
        tag="div"
        class="row g-3"
      >
        <div
          v-for="(work, i) in worksStore.filteredItems"
          :key="i"
          class="col-xl-3 col-lg-3 col-md-4 col-sm-6"
        >
          <WorkCard
            :work="work"
            @category-click="(category) => (worksStore.category = category)"
            @tag-click="(tag) => (worksStore.tag = tag)"
            @language-click="(language) => (worksStore.language = language)"
          />
        </div>
      </transition-group>
      <transition
        :enter-active-class="$animateCss('fadeIn').class"
        :leave-active-class="$animateCss('fadeOut').class"
        mode="out-in"
      >
        <div
          v-if="!worksStore.hasFilteredItems"
          class="text-secondary fst-italic text-center p-5 m-5"
        >
          No items found
        </div>
      </transition>
    </div>
  </article>
</template>
