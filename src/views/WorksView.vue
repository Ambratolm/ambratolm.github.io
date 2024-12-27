<script setup>
import SearchBar from "@/components/SearchBar.vue";
import WorkCard from "@/components/WorkCard.vue";
import { useWorksStore } from "@/core/stores";

const worksStore = useWorksStore();
</script>
<template>
  <article class="card h-100">
    <div class="card-header text-center text-sm-start">
      <div class="row justify-content-between align-items-center">
        <div class="col">
          <h6 class="m-0 fw-normal d-block">
            <span class="title me-1">
              <i class="fas fa-landmark" /> Works Card
            </span>
            <span
              class="badge badge-sm"
              :class="
                worksStore.isFiltered
                  ? worksStore.hasFilteredItems
                    ? 'text-bg-success'
                    : 'text-bg-danger'
                  : 'text-bg-secondary'
              "
            >
              {{ worksStore.filteredCount }}
            </span>
          </h6>
        </div>
        <div class="col-lg-3 col-sm-6 mt-1 mt-sm-0">
          <SearchBar v-model="worksStore.query" />
        </div>
      </div>
    </div>
    <div class="card-body">
      <transition-group
        v-if="worksStore.hasFilteredItems"
        enter-active-class="animate__animated animate__bounceInUp"
        leave-active-class="animate__animated animate__bounceOutDown"
        mode="out-in"
        tag="div"
        class="row g-3"
      >
        <div
          v-for="(work, i) in worksStore.filteredItems"
          :key="i"
          class="col-xl-3 col-lg-3 col-md-4 col-sm-6"
        >
          <WorkCard :work="work" class="" />
        </div>
      </transition-group>
      <transition
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut"
        mode="out-in"
      >
        <small
          v-if="!worksStore.hasFilteredItems"
          class="text-secondary fst-italic"
        >
          No items found
        </small>
      </transition>
    </div>
  </article>
</template>
