<script setup>
import SearchBar from "@/components/SearchBar.vue";
import WorkCard from "@/components/WorkCard.vue";
import NavBar from "@/components/NavBar.vue";
import { useWorksStore, useCategoriesStore } from "@/core/stores";
import TheLogo from "@/components/TheLogo.vue";

const worksStore = useWorksStore();
const categoriesStore = useCategoriesStore();
</script>

<template>
  <article class="card">
    <div class="card-header p-0">
      <NavBar name="works">
        <template #start>
          <TheLogo mode="symbol" width="32px" class="me-2 mb-1 mb-md-0" />
          <!-- <h5 class="m-0"><i class="fas fa-landmark" /> Profiles</h5> -->
          <!-- <button class="btn btn-secondary">
            <i class="fas fa-landmark" /> <b>Works</b>
          </button> -->
        </template>
        <template #default>
          <fieldset class="input-group my-1 my-lg-0 me-lg-3" role="Search">
            <span class="input-group-text">
              <h6 class="m-0"><i class="fas fa-landmark" /> Profiles</h6>
            </span>
            <SearchBar v-model="worksStore.query" class="" />
          </fieldset>
        </template>
        <template #collapse>
          <ul
            class="nav nav-pills flex-md-nowrap justify-content-center mb-1 mb-md-0"
          >
            <li
              v-for="(category, i) in categoriesStore.items"
              :key="i"
              class="nav-item"
            >
              <button
                @click="worksStore.category = category.name"
                :class="{ active: category.name === worksStore.category }"
                v-bs-tooltip="category.title"
                class="nav-link d-inline-flex align-items-center text-capitalize"
              >
                <i :class="category.icon" />
              </button>
            </li>
          </ul>
        </template>
      </NavBar>
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
          <WorkCard
            :work="work"
            @category-click="(category) => (worksStore.category = category)"
          />
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
