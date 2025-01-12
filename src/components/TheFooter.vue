<script setup>
import DataProfileCard from "@/components/DataProfileCard.vue";
import ThemeImage from "@/components/ThemeImage.vue";
import { useProfilesStore } from "@/modules/stores";
import { IMAGES } from "@/modules/assets";

const { logos } = IMAGES;
const profilesStore = useProfilesStore();
</script>

<template>
  <footer class="container-fluid border-top mt-4">
    <section class="text-center p-5">
      <div class="row justify-content-between">
        <div class="col">
          <div class="row justify-content-start">
            <div
              v-for="profile in profilesStore.getRandomItems(4)"
              :key="profile?.name"
              class="col-auto"
            >
              <DataProfileCard :profile="profile" view="icon" />
            </div>
          </div>
        </div>
        <div class="col">
          <ThemeImage
            :light-src="logos['ambratolm-symbol-light']"
            :dark-src="logos['ambratolm-symbol-dark']"
            width="64px"
            alt="Ambratolm Logo"
            class="mb-3"
          />
          <p>&copy; <strong>Ambratolm</strong> 2025</p>
        </div>
        <div class="col">
          <div class="row justify-content-end">
            <div
              v-for="profile in profilesStore.getRandomItems(4)"
              :key="profile?.name"
              class="col-auto"
            >
              <DataProfileCard :profile="profile" view="icon" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </footer>
</template>
