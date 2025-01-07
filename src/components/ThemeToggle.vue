<script setup>
import { useDarkTheme, useCoreTheme } from "@/modules/theme";

const darkTheme = useDarkTheme();
const coreTheme = useCoreTheme();
</script>

<template>
  <div class="btn-group" role="group" aria-label="Theme Settings Group">
    <a
      @click="darkTheme.toggle()"
      v-tooltip="darkTheme.current.title"
      href="#"
      class="btn btn-secondary"
    >
      <i :class="darkTheme.current.icon" />
    </a>
    <a
      @click="coreTheme.toggle()"
      v-tooltip="coreTheme.current.title"
      href="#"
      class="btn btn-secondary"
    >
      <i :class="coreTheme.current.icon" />
    </a>
  </div>
</template>
