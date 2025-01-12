//====================================================================================================
// @ Composables
//----------------------------------------------------------------------------------------------------
// 		Vue composables
//====================================================================================================
import { useDark, useColorMode, useToggle, useCycleList } from "@vueuse/core";
import {
  computed,
  reactive,
  toRef,
  toValue,
  watch,
  getCurrentInstance,
  onMounted,
} from "vue";
import { useRouteQuery } from "@vueuse/router";

//----------------------------------------------------------------------------------------------------
// # Route Query Object
//----------------------------------------------------------------------------------------------------
export function useRouteQueryObject({
  routeQueryDef = {},
  query = {},
  setQuery = () => {},
}) {
  const routeQuery = reactive(
    Object.fromEntries(
      Object.entries(query).map(([key]) => [
        key,
        useRouteQuery(routeQueryDef[key] || key),
      ]),
    ),
  );
  function setRouteQuery(newQuery = {}, denyFalsy = false) {
    for (const key in newQuery) {
      if (!Object.prototype.hasOwnProperty.call(routeQuery, key)) continue;
      const value = toValue(newQuery[key]);
      if (denyFalsy && !value) continue;
      routeQuery[key] = value || undefined;
    }
  }
  // function clearRouteQuery() {
  //   for (const key in routeQuery) routeQuery[key] = undefined;
  // }
  watch(query, (newQuery) => setRouteQuery(newQuery, false));
  watch(routeQuery, setQuery);
  if (getCurrentInstance()) {
    onMounted(() => {
      setRouteQuery(query, true);
      setQuery(routeQuery);
    });
  }
  return { routeQuery };
}

//----------------------------------------------------------------------------------------------------
// # Query
//----------------------------------------------------------------------------------------------------
export function useQuery(initQuery = {}) {
  const query = reactive({ ...initQuery });
  function setQuery(newQuery = {}) {
    for (const key in newQuery) {
      if (!Object.prototype.hasOwnProperty.call(query, key)) continue;
      const value = toValue(newQuery[key]);
      // if (value)
      query[key] = toRef(value);
    }
  }
  function clearQuery() {
    for (const key in query) query[key] = "";
  }
  return { query, setQuery, clearQuery };
}

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
  return reactive({ toggle, current, modes, isDark });
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
