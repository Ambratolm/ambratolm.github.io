<script setup>
import { computed } from "vue";
import { useImage } from "@vueuse/core";
import { useDarkTheme } from "@/modules/composables";

const props = defineProps({
  lightSrc: {
    type: String,
    required: true,
  },
  darkSrc: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: "Image",
  },
  width: {
    type: String,
    default: "180px",
  },
  height: {
    type: String,
    default: "auto",
  },
});

const darkTheme = useDarkTheme();
const src = computed(() => (darkTheme.isDark ? props.lightSrc : props.darkSrc));
const { isLoading } = useImage({ src: src.value });
</script>

<template>
  <div>
    <div
      v-if="isLoading"
      class="placeholder placeholder-wave opacity-25"
      :style="{ width, height }"
    >
      <span class="visually-hidden">{{ alt }} is loading...</span>
    </div>
    <div v-else>
      <img v-if="src" :src="src" :alt="alt" :width="width" :height="height" />
      <span v-else>{{ alt }}</span>
    </div>
  </div>
</template>
