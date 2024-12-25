<script setup>
import WorkCard from "@/components/WorkCard.vue";
import { useWorksStore } from "@/core/stores";

const worksStore = useWorksStore();
</script>

<template>
  <article class="card h-100">
    <div class="card-header text-center text-sm-start">
      <div class="row justify-content-between align-items-center">
        <div class="col">
          <small>
            <i class="fas fa-landmark" /> Works
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
          </small>
        </div>
        <div class="col-sm-3 mt-1 mt-sm-0">
          <fieldset class="input-group" role="Search">
            <div class="input-group-text">
              <i class="fas fa-search fa-xs" />
            </div>
            <input
              v-model="worksStore.query"
              type="search"
              name="search"
              placeholder="Search"
              aria-label="Search"
              class="form-control form-control-sm"
            />
          </fieldset>
        </div>
      </div>
    </div>
    <div class="card-body text-center">
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
          class="col-xl-2 col-lg-3 col-md-4 col-sm-6"
        >
          <WorkCard :work="work" class="h-100" />
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
          No works found
        </small>
      </transition>
    </div>
  </article>
</template>
