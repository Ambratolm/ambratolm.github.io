<script setup>
import { computed } from "vue";
import { useDarkStore } from "@/core/stores";
import { useThemeStore } from "@/core/stores";
import { capitalCase } from "change-case";

const props = defineProps({
  modeIcons: {
    type: Object,
    default: () => ({
      dark: "fas fa-sun",
      light: "fas fa-moon",
    }),
  },
  themeIcons: {
    type: Object,
    default: () => ({
      default: "fas fa-square",
      modern: "fas fa-diamond",
      elegant: "fas fa-crown",
    }),
  },
});

const darkStore = useDarkStore();
const modeTitle = computed(() => `${capitalCase(darkStore.value)} Mode`);
const modeIcon = computed(() =>
  darkStore.isDark ? props.modeIcons.light : props.modeIcons.dark,
);

const themeStore = useThemeStore();
const themeTitle = computed(() => `${capitalCase(themeStore.mode)} Theme`);
const themeIcon = computed(() => {
  if (themeStore.isModern) return props.themeIcons.modern;
  if (themeStore.isElegant) return props.themeIcons.elegant;
  return props.themeIcons.default;
});
</script>

<template>
  <div class="btn-group" role="group" aria-label="Theme Settings Group">
    <a
      @click="darkStore.toggleDark()"
      v-bs-tooltip="{ title: modeTitle, placement: 'bottom' }"
      href="#"
      class="btn btn-secondary"
    >
      <i :class="modeIcon" /> <slot></slot>
    </a>
    <a
      v-bs-tooltip="{ title: themeTitle, placement: 'bottom' }"
      href="#"
      @click="themeStore.toggleMode()"
      class="btn btn-secondary"
    >
      <i :class="themeIcon" /> <slot></slot>
    </a>
  </div>
</template>
