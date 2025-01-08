<script setup>
import {
  useCategoriesStore,
  useLanguagesStore,
  useProfilesStore,
} from "@/modules/stores";
import DataProfileCard from "@/components/DataProfileCard.vue";

const profilesStore = useProfilesStore();
const categoriesStore = useCategoriesStore();
const languagesStore = useLanguagesStore();
</script>

<template>
  <section class="row g-3">
    <div class="col-md-3">
      <article class="card border">
        <img v-img-src-alt :src="undefined" alt="" class="card-img" />
        <div class="card-body">
          <article>
            <h5 class="card-title">Ambratolm</h5>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <button type="button" class="btn btn-secondary d-block w-100">
              <i class="fas fa-envelope" /> Send Message
            </button>
          </article>
        </div>
      </article>
    </div>
    <div class="col">
      <article class="card border mb-3">
        <div class="card-body">Main Profiles here...</div>
      </article>
      <article class="card border">
        <header class="card-header">
          <nav class="row g-2 align-items-center">
            <div class="col-auto">
              <h6 class="p-0 m-0">
                <a
                  @click="
                    profilesStore.query.category =
                      profilesStore.query.language =
                      profilesStore.query.tag =
                      profilesStore.query.keyword =
                        ''
                  "
                  href="#"
                  role="button"
                  class="nav-link"
                >
                  <i class="fas fa-address-book" /> Profiles
                  <span
                    v-tooltip="`${profilesStore.items.length} items`"
                    class="badge rounded-pill px-2 m-0"
                    :class="
                      profilesStore.isFiltered
                        ? profilesStore.items.length > 0
                          ? 'text-bg-primary'
                          : 'text-bg-danger'
                        : 'text-bg-secondary'
                    "
                  >
                    {{ profilesStore.items.length }}
                    <span class="visually-hidden">
                      {{ profilesStore.items.length }} matching search
                      results.</span
                    >
                  </span>
                </a>
              </h6>
            </div>
            <div class="col">
              <fieldset class="input-group input-group-sm" role="Search">
                <input
                  v-model="profilesStore.query.keyword"
                  type="search"
                  name="search"
                  placeholder="Search"
                  aria-label="Search"
                  class="form-control form-control-sm"
                />
                <span v-if="profilesStore.query.tag" class="input-group-text">
                  <i class="fas fa-hashtag me-1" />
                  {{ profilesStore.query.tag }}
                </span>
                <button
                  v-if="profilesStore.query.tag"
                  @click="profilesStore.query.tag = ''"
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
                    categoriesStore.items[profilesStore.query.category]?.icon ||
                    'fas fa-icons'
                  "
                />
                {{
                  categoriesStore.items[profilesStore.query.category]?.title ||
                  "All"
                }}
              </button>
              <ul class="dropdown-menu">
                <li><h6 class="dropdown-header">Category</h6></li>
                <li>
                  <a
                    href="#"
                    @click="profilesStore.query.category = ''"
                    :class="{ active: '' === profilesStore.query.category }"
                    class="dropdown-item"
                  >
                    <i class="fas fa-asterisk" /> All
                  </a>
                </li>
                <li
                  v-for="category in categoriesStore.items"
                  :key="category.name"
                >
                  <a
                    href="#"
                    @click="profilesStore.query.category = category.name"
                    :class="{
                      active: category.name === profilesStore.query.category,
                    }"
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
                    languagesStore.items[profilesStore.query.language]?.icon ||
                    'fas fa-language'
                  "
                />
                {{
                  languagesStore.items[profilesStore.query.language]?.title ||
                  "Any"
                }}
              </button>
              <ul class="dropdown-menu">
                <li><h6 class="dropdown-header">Language</h6></li>
                <li>
                  <a
                    href="#"
                    @click="profilesStore.query.language = ''"
                    :class="{ active: '' === profilesStore.query.language }"
                    class="dropdown-item"
                  >
                    <i class="fas fa-asterisk" /> Any
                  </a>
                </li>
                <li
                  v-for="language in languagesStore.items"
                  :key="language.name"
                >
                  <a
                    href="#"
                    @click="profilesStore.query.language = language.name"
                    :class="{
                      active: language.name === profilesStore.query.language,
                    }"
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
          <div class="row g-3">
            <div
              v-for="profile in profilesStore.items"
              :key="profile.name"
              class="col-xl-3 col-lg-3 col-md-4 col-sm-6"
            >
              <DataProfileCard :profile="profile" class="h-100 border" />
            </div>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped></style>
