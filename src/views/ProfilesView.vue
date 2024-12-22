<script setup>
import ProfileCard from "@/components/ProfileCard.vue";
import { useProfilesStore } from "@/core/stores";

const profilesStore = useProfilesStore();
import { onMounted, ref } from "vue";

const randomProfile = ref(null);
const setRandomProfile = () =>
  (randomProfile.value = profilesStore.getRandomItem());
profilesStore.$subscribe(setRandomProfile);
onMounted(setRandomProfile);

const randomProfiles = ref(null);
const setRandomProfiles = () =>
  (randomProfiles.value = profilesStore.getRandomItems());
profilesStore.$subscribe(setRandomProfiles);
onMounted(setRandomProfiles);
</script>

<template>
  <section class="row g-3">
    <div class="col-md-3">
      <article class="card">
        <h6
          class="card-header fw-normal d-flex no-wrap justify-content-between align-items-center"
        >
          Random
          <button
            @click="
              setRandomProfile();
              setRandomProfiles();
            "
            class="btn btn-sm btn-secondary"
          >
            <i class="fas fa-dice" />
          </button>
        </h6>
        <div class="card-body">
          <ProfileCard
            v-if="randomProfile"
            :profile="randomProfile"
            class="h-100"
          />
          <ul class="list-group mt-3">
            <li
              v-for="(profile, i) in randomProfiles"
              :key="i"
              class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
            >
              <i :class="profile?.icon" :title="profile?.title" class="me-2" />
              <span :title="profile?.subtitle">{{ profile?.title }}</span>
              <a
                :href="profile?.url"
                :title="profile?.url"
                target="_blank"
                class="link-primary text-lowercase"
              >
                <i
                  :class="
                    profile?.search ? 'fas fa-search fa-sm' : 'far fa-at fa-sm'
                  "
                />
              </a>
            </li>
          </ul>
        </div>
      </article>
    </div>
    <div class="col">
      <article class="card">
        <div
          class="card-header d-flex no-wrap justify-content-between align-items-center"
        >
          <h6 class="card-title m-0">
            <i class="fas fa-address-card" /> Profiles
            <span
              class="badge"
              :class="
                profilesStore.isFiltered
                  ? profilesStore.hasFilteredItems
                    ? 'text-bg-success'
                    : 'text-bg-danger'
                  : 'text-bg-secondary'
              "
            >
              {{ profilesStore.filteredCount }}
            </span>
          </h6>
          <h6
            v-if="profilesStore.query"
            :title="profilesStore.query"
            class="card-title d-inline-block specific-w-200 text-truncate text-center m-0"
          >
            <i class="fas fa-search" /> {{ profilesStore.query }}
          </h6>
          <h6 class="card-subtitle text-body-secondary fw-normal m-0">
            My social media accounts
          </h6>
        </div>
        <div class="card-body text-center">
          <transition-group
            v-if="profilesStore.hasFilteredItems"
            enter-active-class="animate__animated animate__bounceInUp"
            leave-active-class="animate__animated animate__bounceOutDown"
            mode="out-in"
            tag="div"
            class="row g-3"
          >
            <div
              v-for="(profile, i) in profilesStore.filteredItems"
              :key="i"
              class="col-xl-2 col-lg-3 col-md-4 col-sm-6"
            >
              <ProfileCard :profile="profile" class="h-100" />
            </div>
          </transition-group>
          <transition
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
            mode="out-in"
          >
            <small
              v-if="!profilesStore.hasFilteredItems"
              class="text-secondary fst-italic"
            >
              No profiles found
            </small>
          </transition>
        </div>
      </article>
    </div>
  </section>
</template>
