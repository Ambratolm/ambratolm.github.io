//====================================================================================================
// @ Theme
//----------------------------------------------------------------------------------------------------
// 		Reactive theme with data persistence
//====================================================================================================
import { useDark, useColorMode, useToggle, useCycleList } from "@vueuse/core";
import { computed, reactive } from "vue";

//----------------------------------------------------------------------------------------------------
// # Dark Theme
//----------------------------------------------------------------------------------------------------
export function useDarkTheme() {
  const modes = {
    dark: {
      name: "dark",
      title: "Dark Mode",
      icon: "fas fa-moon",
    },
    light: {
      name: "light",
      title: "Light Mode",
      icon: "fas fa-sun",
    },
  };
  const isDark = useDark({
    storageKey: "theme-dark",
    selector: "html",
    attribute: "data-bs-theme",
    valueDark: modes.dark.name,
    valueLight: modes.light.name,
  });
  const current = computed(() => (isDark.value ? modes.dark : modes.light));
  const toggle = useToggle(isDark);
  return reactive({ toggle, current, modes });
}

//----------------------------------------------------------------------------------------------------
// # Core Theme
//----------------------------------------------------------------------------------------------------
export function useCoreTheme() {
  const themes = {
    default: {
      name: "default",
      title: "Default Theme",
      icon: "fas fa-square",
    },
    modern: {
      name: "modern",
      title: "Modern Theme",
      icon: "fas fa-diamond",
    },
    elegant: {
      name: "elegant",
      title: "Elegant Theme",
      icon: "fas fa-crown",
    },
  };
  const theme = useColorMode({
    storageKey: "theme",
    selector: "html",
    attribute: "data-bs-core",
    initialValue: "default",
    modes: {
      default: themes.default.name,
      modern: themes.modern.name,
      elegant: themes.elegant.name,
    },
  });
  const current = computed(() => themes[theme.value]);
  const { state, next } = useCycleList(Object.values(themes), {
    initialValue: theme,
  });
  const toggle = () => {
    theme.value = state.value.name;
    next();
  };
  return reactive({ toggle, current, themes });
}
