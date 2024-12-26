<script setup>
import SearchBar from "@/components/SearchBar.vue";
defineProps({
  collectionStore: {
    type: Object,
    default: () => ({
      filteredItems: [],
      hasFilteredItems: false,
      filteredCount: 0,
      isFiltered: false,
      query: "",
    }),
  },
});
const query = defineModel({
  type: String,
  default: "",
});
</script>

<template>
  <article class="card h-100">
    <div class="card-header text-center text-sm-start">
      <div class="row justify-content-between align-items-center">
        <div class="col">
          <h6 class="m-0 fw-normal d-block">
            <span class="me-1">
              <slot name="title"><i class="fas fa-question" /> Untitled</slot>
            </span>
            <span
              class="badge badge-sm"
              :class="
                collectionStore.isFiltered
                  ? collectionStore.hasFilteredItems
                    ? 'text-bg-success'
                    : 'text-bg-danger'
                  : 'text-bg-secondary'
              "
            >
              {{ collectionStore.filteredCount }}
            </span>
          </h6>
        </div>
        <div class="col-lg-3 col-sm-6 mt-1 mt-sm-0">
          <SearchBar v-model="query" />
        </div>
      </div>
    </div>
    <div class="card-body">
      <transition-group
        v-if="collectionStore.hasFilteredItems"
        enter-active-class="animate__animated animate__bounceInUp"
        leave-active-class="animate__animated animate__bounceOutDown"
        mode="out-in"
        tag="div"
        class="row g-3"
      >
        <div
          v-for="(item, i) in collectionStore.filteredItems"
          :key="i"
          class="col-xl-2 col-lg-3 col-md-4 col-sm-6"
        >
          <slot :item="item"></slot>
        </div>
      </transition-group>
      <transition
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut"
        mode="out-in"
      >
        <small
          v-if="!collectionStore.hasFilteredItems"
          class="text-secondary fst-italic"
        >
          No items found
        </small>
      </transition>
    </div>
  </article>
</template>
