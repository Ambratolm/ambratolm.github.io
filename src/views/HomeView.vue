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
          <div class="list-group mt-3">
            <a
              v-for="(profile, i) in randomProfiles"
              :key="i"
              href="#"
              class="list-group-item list-group-item-action d-flex justify-content-between align-items-center py-2"
            >
              <div class="specific-w-50 me-3 text-center">
                <i :class="profile?.icon" class="fa-3x" />
              </div>
              <div class="me-auto">
                <div class="fw-bold">
                  <span :title="profile?.subtitle">{{ profile?.title }}</span>
                </div>
                <span :title="profile?.subtitle" class="text-body-secondary">
                  {{ profile?.title }}
                </span>
              </div>
              <!-- <span class="badge text-bg-primary rounded-pill">$19.99</span> -->
            </a>
          </div>
        </div>
      </article>
    </div>
    <div class="col">
      <article class="card">
        <div
          class="card-header d-flex no-wrap justify-content-between align-items-center"
        >
          <h6 class="card-title m-0"><i class="fas fa-address-card" /> xxx</h6>
        </div>
        <div class="card-body text-center"></div>
      </article>
    </div>
  </section>
</template>
