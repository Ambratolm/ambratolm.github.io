<script setup>
import { computed, useTemplateRef } from "vue";
import { useDarkStore } from "@/core/stores";
import { useImage } from "@vueuse/core";
import lightLogoSrc from "@images/logos/ambratolm-logo-light.png";
import darkLogoSrc from "@images/logos/ambratolm-logo-dark.png";
import lightSymbolSrc from "@images/logos/ambratolm-symbol-light.png";
import darkSymbolSrc from "@images/logos/ambratolm-symbol-dark.png";

const props = defineProps({
  mode: {
    type: String, // "logo" | "symbol"
    default: "logo",
  },
  width: {
    type: String,
    default: "180px",
  },
});

const darkStore = useDarkStore();
const src = computed(() => {
  switch (props.mode) {
    case "logo":
      return darkStore.isDark ? lightLogoSrc : darkLogoSrc;
    case "symbol":
      return darkStore.isDark ? lightSymbolSrc : darkSymbolSrc;
    default:
      return "";
  }
});
const { isLoading } = useImage({ src: src.value });
const logo = useTemplateRef("logo");
</script>
<template>
  <div>
    <div
      v-if="isLoading"
      class="placeholder placeholder-wave opacity-25 h-100"
      :style="{ width }"
    >
      <span class="visually-hidden">Ambratolm Logo is loading...</span>
    </div>
    <div v-else>
      <img
        v-if="src"
        :src="src"
        :width="width"
        @click="$animateCss('rubberBand').element = logo"
        ref="logo"
        alt="Ambratolm Logo"
      />
      <span v-else>Ambratolm</span>
    </div>
  </div>
</template>
