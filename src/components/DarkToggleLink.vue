<script setup>
import { computed } from "vue";
import { useThemeStore } from "@/core/stores";

const props = defineProps({
  darkIcon: String,
  lightIcon: String,
});

const themeStore = useThemeStore();
const icon = computed(() =>
  themeStore.isDark ? props.lightIcon : props.darkIcon,
);
</script>
<template>
  <a @click="themeStore.toggleDark()" href="#">
    <i :class="icon" /> <slot></slot>
  </a>
</template>
