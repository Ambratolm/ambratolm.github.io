<script setup>
import { useThemeStore } from "@/core/stores";
const themeStore = useThemeStore();
</script>
<template>
  <img
    v-if="themeStore.isDark"
    src="@/assets/logos/ambratolm-logo-light.png"
    alt="Ambratolm"
    width="180"
  />
  <img
    v-else
    src="@/assets/logos/ambratolm-logo-dark.png"
    alt="Ambratolm"
    width="180"
  />
</template>
