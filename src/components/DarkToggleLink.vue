<script setup>
import { computed } from "vue";
import { useDarkStore } from "@/core/stores";
import { capitalCase } from "change-case";

const props = defineProps({
  darkIcon: {
    type: String,
    default: "fas fa-sun",
  },
  lightIcon: {
    type: String,
    default: "fas fa-moon",
  },
});

const darkStore = useDarkStore();
const title = computed(() => `${capitalCase(darkStore.value)} Mode`);
const icon = computed(() =>
  darkStore.isDark ? props.lightIcon : props.darkIcon,
);
</script>

<template>
  <a
    @click="darkStore.toggleDark()"
    v-bs-tooltip="{ title, placement: 'bottom' }"
    href="#"
  >
    <i :class="icon" /> <slot></slot>
  </a>
</template>
