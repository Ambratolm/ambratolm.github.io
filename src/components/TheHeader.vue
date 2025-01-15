<script setup>
import { IMAGES } from "@/modules/assets";
import ThemeImage from "@/components/ThemeImage.vue";
import ThemeToggle from "@/components/ThemeToggle.vue";
import {
  useGeneralStore,
  useWorksStore,
  useProfilesStore,
} from "@/modules/stores";
import SearchBadge from "./SearchBadge.vue";

const { logos } = IMAGES;
const generalStore = useGeneralStore();
const worksStore = useWorksStore();
const profilesStore = useProfilesStore();
</script>

<template>
  <header class="mb-3">
    <nav class="navbar navbar-expand-lg border-bottom">
      <div class="container-fluid">
        <div class="navbar-brand align-self-center">
          <RouterLink :to="{ name: 'home' }">
            <ThemeImage
              @click="$animate('rubberBand', $event)"
              :light-src="logos['ambratolm-logo-light']"
              :dark-src="logos['ambratolm-logo-dark']"
              width="180px"
              alt="Ambratolm Logo"
              class="hvr-skew-backward"
            />
          </RouterLink>
        </div>
        <button
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#main-navbar-collapse"
          aria-controls="main-navbar-collapse"
          aria-expanded="true"
          aria-label="Toggle main navigation"
          class="navbar-toggler"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <fieldset class="input-group my-1 my-lg-0 me-lg-3" role="Search">
          <input
            v-model="generalStore.query.keyword"
            type="search"
            name="search"
            placeholder="Search"
            aria-label="Search"
            class="form-control z-0"
          />
          <button
            @click="generalStore.filter()"
            class="btn btn-secondary"
            aria-label="Search"
          >
            <i class="fas fa-search" aria-hidden="true" />
            <span class="visually-hidden">Execute search</span>
          </button>
        </fieldset>
        <div
          class="navbar-collapse collapse mt-3 mt-lg-0"
          id="main-navbar-collapse"
        >
          <ul
            class="nav nav-pills flex-md-nowrap justify-content-center mb-1 mb-md-0"
          >
            <li
              v-for="{ name, meta } in $navRoutes"
              :key="name"
              class="nav-item"
            >
              <RouterLink
                :to="{ name }"
                class="nav-link d-inline-flex align-items-center position-relative text-capitalize"
                :class="
                  (name === 'works' && worksStore.isFiltered) ||
                  (name === 'connect' && profilesStore.isFiltered)
                    ? 'border'
                    : ''
                "
              >
                <i :class="meta?.icon" class="me-1" aria-hidden="true" />
                {{ meta?.title }}
                <Transition
                  :enter-active-class="$animate('flash')"
                  :leave-active-class="$animate('fadeOut')"
                  mode="out-in"
                >
                  <SearchBadge
                    v-if="name === 'works' && worksStore.isFiltered"
                    :name="name"
                    :value="worksStore.items.length"
                  />
                </Transition>
                <Transition
                  :enter-active-class="$animate('flash')"
                  :leave-active-class="$animate('fadeOut')"
                  mode="out-in"
                >
                  <SearchBadge
                    v-if="name === 'connect' && profilesStore.isFiltered"
                    :name="name"
                    :value="profilesStore.items.length"
                  />
                </Transition>
              </RouterLink>
            </li>
            <li class="nav-item ms-3">
              <ThemeToggle />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
nav {
  background-color: var(--bs-content-bg);
}
.nav-item {
  margin: 2px;
}
</style>
