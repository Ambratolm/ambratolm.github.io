<script setup>
import {
  useCategoriesStore,
  useLanguagesStore,
  useProfilesStore,
} from "@/modules/stores";
import DataProfileCard from "@/components/DataProfileCard.vue";
import avatarSrc from "@/assets/images/avatar.png";
import { useRouteQueryObject } from "@/modules/composables";

const profilesStore = useProfilesStore();
const categoriesStore = useCategoriesStore();
const languagesStore = useLanguagesStore();
const featuredProfiles = profilesStore.srcItems?.filter(
  (profile) => profile.feature,
);
const mainEmailProfile = profilesStore.srcItems?.find(
  (profile) => profile.email,
);
useRouteQueryObject(profilesStore);
</script>

<template>
  <section class="row g-3">
    <div class="col-md-3">
      <article class="card">
        <img v-img-src-alt :src="avatarSrc" alt="Ambratolm" class="card-img" />
        <div class="card-body">
          <article>
            <h5 class="card-title">
              Ambratolm
              <i
                class="fas fa-circle-check text-secondary"
                v-tooltip="'EL HAFID'"
              />
            </h5>
            <p class="card-text text-secondary">
              <span class="badge me-1 mb-1" title="Free">
                <i class="fas fa-crown" /> Hobbyist
              </span>
              <span class="badge me-1 mb-1" title="Artist and Graphic Designer">
                <i class="fas fa-palette" /> Graphist
              </span>
              <span class="badge me-1 mb-1" title="Video Editor">
                <i class="fas fa-clapperboard" /> Videditor
              </span>
              <span class="badge me-1 mb-1" title="Software Developer">
                <i class="fas fa-code" /> Developer
              </span>
            </p>
            <p class="card-text" style="text-justify: newspaper">
              My passion lies in the creation of multimedia experiences across
              various mediums. Programming, design, audio, and video—these are
              the fields I delve into, utilizing my own distinctive methods and
              tools. Art and technology are equally important to my work, as is
              my appreciation for gaming, movies, and entertainment. My goal is
              to create distinctive, engaging content that ventures into
              uncharted territory, without sacrificing the core values of
              creativity and innovation.
            </p>
            <a
              :href="mainEmailProfile?.url"
              :title="mainEmailProfile?.username"
              target="_blank"
              role="button"
              class="btn btn-secondary d-block w-100"
            >
              <i class="fas fa-envelope" /> Send Email
            </a>
          </article>
        </div>
      </article>
    </div>
    <div class="col">
      <!-------------------------------------------------------------------------------------------------------->
      <!-- # Featured Profiles -->
      <!-------------------------------------------------------------------------------------------------------->
      <article class="card mb-3">
        <div class="card-body">
          <div class="row justify-content-center">
            <div
              v-for="profile in featuredProfiles"
              :key="profile.name"
              class="col-auto text-center"
            >
              <DataProfileCard :profile="profile" view="icon" />
            </div>
          </div>
        </div>
      </article>
      <article class="card">
        <header class="card-header">
          <nav class="row g-2 align-items-center">
            <div class="col-auto">
              <h6 class="p-0 m-0">
                <a
                  @click="profilesStore.clearQuery()"
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
                          ? 'text-bg-success'
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
          <Transition
            :enter-active-class="$animate('bounceIn')"
            :leave-active-class="$animate('bounceOut')"
            mode="out-in"
          >
            <div v-if="profilesStore.items.length" class="row g-3">
              <TransitionGroup
                :enter-active-class="$animate('bounceInUp')"
                :leave-active-class="$animate('bounceOutDown')"
                :move-class="$animate('bounce')"
              >
                <div
                  v-for="(profile, i) in profilesStore.items"
                  :key="i"
                  class="col-xl-3 col-lg-3 col-md-4 col-sm-6"
                >
                  <DataProfileCard :profile="profile" class="h-100" />
                </div>
              </TransitionGroup>
            </div>
            <div
              v-else
              class="col text-center text-secondary fst-italic p-5 m-5"
            >
              <i class="fas fa-triangle-exclamation fa-3x" />
              <div class="mb-3">No profiles found.</div>
              <button
                @click="profilesStore.clearQuery()"
                class="btn btn-sm btn-secondary"
              >
                Clear Filters
              </button>
            </div>
          </Transition>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped></style>
