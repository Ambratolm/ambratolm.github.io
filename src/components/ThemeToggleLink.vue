<script setup>
import { computed } from "vue";
import { useThemeStore } from "@/core/stores";
import { capitalCase } from "change-case";

const props = defineProps({
  defaultIcon: { type: String, default: "fas fa-square" },
  modernIcon: { type: String, default: "fas fa-diamond" },
  elegantIcon: { type: String, default: "fas fa-crown" },
});

const themeStore = useThemeStore();
const title = computed(() => `${capitalCase(themeStore.mode)} Theme`);
const icon = computed(() => {
  if (themeStore.isModern) return props.modernIcon;
  if (themeStore.isElegant) return props.elegantIcon;
  return props.defaultIcon;
});
</script>
<template>
  <a
    v-bs-tooltip="{ title, placement: 'bottom' }"
    href="#"
    @click="themeStore.toggleMode()"
  >
    <i :class="icon" /> <slot></slot>
  </a>
</template>
