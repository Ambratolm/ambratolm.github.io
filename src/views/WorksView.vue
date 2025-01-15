<script setup>
import DataWorkCard from "@/components/DataWorkCard.vue";
import {
  useCategoriesStore,
  useLanguagesStore,
  useWorksStore,
} from "@/modules/stores";
import { useRouteQueryObject } from "@/modules/composables";

const worksStore = useWorksStore();
const categoriesStore = useCategoriesStore();
const languagesStore = useLanguagesStore();
useRouteQueryObject(worksStore);
</script>

<template>
  <section class="card">
    <header class="card-header">
      <nav class="row g-2 align-items-center">
        <div class="col-auto">
          <h6 class="p-0 m-0">
            <a
              @click="worksStore.clearQuery()"
              href="#"
              role="button"
              class="nav-link"
            >
              <i class="fas fa-landmark" /> Works
              <span
                v-tooltip="`${worksStore.items.length} items`"
                class="badge rounded-pill px-2 m-0"
                :class="
                  worksStore.isFiltered
                    ? worksStore.items.length > 0
                      ? 'text-bg-success'
                      : 'text-bg-danger'
                    : 'text-bg-secondary'
                "
              >
                {{ worksStore.items.length }}
                <span class="visually-hidden">
                  {{ worksStore.items.length }} matching search results.</span
                >
              </span>
            </a>
          </h6>
        </div>
        <div class="col">
          <fieldset class="input-group input-group-sm" role="Search">
            <input
              v-model="worksStore.query.keyword"
              type="search"
              name="search"
              placeholder="Search"
              aria-label="Search"
              class="form-control form-control-sm"
            />
            <span v-if="worksStore.query.tag" class="input-group-text">
              <i class="fas fa-hashtag me-1" /> {{ worksStore.query.tag }}
            </span>
            <button
              v-if="worksStore.query.tag"
              @click="worksStore.query.tag = ''"
              class="btn btn-sm btn-secondary"
            >
              <i class="fas fa-xmark" />
            </button>
          </fieldset>
        </div>
        <div class="col-auto">
          <!-------------------------------------------------------------------------------------------------------->
          <!-- # Categories Menu -->
          <!-------------------------------------------------------------------------------------------------------->
          <button
            type="button"
            class="btn btn-sm btn-secondary dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i
              :class="
                categoriesStore.items[worksStore.query.category]?.icon ||
                'fas fa-icons'
              "
            />
            {{
              categoriesStore.items[worksStore.query.category]?.title || "All"
            }}
          </button>
          <ul class="dropdown-menu">
            <li><h6 class="dropdown-header">Category</h6></li>
            <li>
              <a
                href="#"
                @click="worksStore.query.category = ''"
                :class="{ active: '' === worksStore.query.category }"
                class="dropdown-item"
              >
                <i class="fas fa-asterisk" /> All
              </a>
            </li>
            <li v-for="category in categoriesStore.items" :key="category.name">
              <a
                href="#"
                @click="worksStore.query.category = category.name"
                :class="{ active: category.name === worksStore.query.category }"
                class="dropdown-item"
              >
                <i :class="category.icon" /> {{ category.title }}
              </a>
            </li>
          </ul>
        </div>
        <div class="col-auto">
          <!-------------------------------------------------------------------------------------------------------->
          <!-- # Languages Menu -->
          <!-------------------------------------------------------------------------------------------------------->
          <button
            type="button"
            class="btn btn-sm btn-secondary dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i
              :class="
                languagesStore.items[worksStore.query.language]?.icon ||
                'fas fa-language'
              "
            />
            {{
              languagesStore.items[worksStore.query.language]?.title || "Any"
            }}
          </button>
          <ul class="dropdown-menu">
            <li><h6 class="dropdown-header">Language</h6></li>
            <li>
              <a
                href="#"
                @click="worksStore.query.language = ''"
                :class="{ active: '' === worksStore.query.language }"
                class="dropdown-item"
              >
                <i class="fas fa-asterisk" /> Any
              </a>
            </li>
            <li v-for="language in languagesStore.items" :key="language.name">
              <a
                href="#"
                @click="worksStore.query.language = language.name"
                :class="{ active: language.name === worksStore.query.language }"
                class="dropdown-item"
              >
                <i :class="language.icon" /> {{ language.title }}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <div class="card-body">
      <Transition
        :enter-active-class="$animate('fadeIn faster')"
        :leave-active-class="$animate('fadeOut faster')"
        mode="out-in"
      >
        <div v-if="worksStore.items.length">
          <!-- <TransitionGroup
          :enter-active-class="$animate('bounceInUp')"
          :leave-active-class="$animate('bounceOutDown')"
          :move-class="$animate('bounce')"
        > -->
          <MasonryWall
            :items="worksStore.items"
            :ssr-columns="1"
            :column-width="300"
            :gap="16"
            :key-mapper="(work) => work.name"
          >
            <template #default="{ item }">
              <DataWorkCard
                :work="item"
                :selected="{
                  categories: [worksStore.query.category],
                  languages: [worksStore.query.language],
                  tags: [worksStore.query.tag],
                }"
                @category-click="
                  (category) => (worksStore.query.category = category)
                "
                @language-click="
                  (language) => (worksStore.query.language = language)
                "
                @tag-click="(tag) => (worksStore.query.tag = tag)"
                class=""
              />
            </template>
          </MasonryWall>
          <!-- </TransitionGroup> -->
        </div>
        <div v-else class="col text-center text-secondary fst-italic p-5 m-5">
          <i class="fas fa-triangle-exclamation fa-3x" />
          <div class="mb-3">No works found.</div>
          <button
            @click="worksStore.clearQuery()"
            class="btn btn-sm btn-secondary"
          >
            Clear Filters
          </button>
        </div>
      </Transition>
    </div>

    <!-- <div class="row g-3">
        <div
          v-for="work in worksStore.items"
          :key="work.name"
          class="col-xl-3 col-lg-3 col-md-4 col-sm-6"
        >
        </div>
      </div> -->
  </section>
</template>
