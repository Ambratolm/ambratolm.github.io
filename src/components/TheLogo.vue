<script setup>
import { computed, useTemplateRef } from "vue";
import { useDarkStore } from "@/core/stores";
import { useImage } from "@vueuse/core";
import { animateCss } from "@/core/animate";
import lightLogoSrc from "@images/logos/ambratolm-logo-light.png";
import darkLogoSrc from "@images/logos/ambratolm-logo-dark.png";

const darkStore = useDarkStore();
const logoSrc = computed(() => (darkStore.isDark ? lightLogoSrc : darkLogoSrc));
const { isLoading } = useImage({ src: logoSrc.value });
const logo = useTemplateRef("logo");
</script>
<template>
  <div
    v-if="isLoading"
    class="placeholder placeholder-wave opacity-25 h-100"
    style="width: 180px"
  >
    <span class="visually-hidden">Ambratolm Logo is loading...</span>
  </div>
  <img
    v-else
    :src="logoSrc"
    @click="animateCss(logo, 'rubberBand', '')"
    ref="logo"
    alt="Ambratolm Logo"
    width="180px"
  />
</template>
