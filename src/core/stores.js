//====================================================================================================
// @ Stores
//----------------------------------------------------------------------------------------------------
// 		Manage all data stores.
//====================================================================================================
import { ref, watch, onMounted } from "vue";
import { defineStore } from "pinia";
import { importData, importImages } from "@/core/assets";
import { search } from "@/core/search";
import { camelCase } from "change-case";

//----------------------------------------------------------------------------------------------------
// # Dark Store
//----------------------------------------------------------------------------------------------------
import { useDark, useToggle } from "@vueuse/core";
export const useDarkStore = defineStore("dark", () => {
  const values = {
    valueDark: "dark",
    valueLight: "light",
  };
  const isDark = useDark({
    storageKey: "dark-mode",
    selector: "html",
    attribute: "data-bs-theme",
    ...values,
  });
  const value = computed(() =>
    isDark.value ? values.valueDark : values.valueLight,
  );
  const toggleDark = useToggle(isDark);
  return { isDark, value, toggleDark };
});

//----------------------------------------------------------------------------------------------------
// # Theme Store
//----------------------------------------------------------------------------------------------------
import { useColorMode, useCycleList } from "@vueuse/core";
import { computed } from "vue";
export const useThemeStore = defineStore("theme", () => {
  const modes = {
    default: "default",
    modern: "modern",
    elegant: "elegant",
  };
  const mode = useColorMode({
    storageKey: "theme",
    selector: "html",
    attribute: "data-bs-core",
    initialValue: "default",
    modes,
  });
  const isDefault = computed(() => mode.value === modes.default);
  const isModern = computed(() => mode.value === modes.modern);
  const isElegant = computed(() => mode.value === modes.elegant);
  const { state, next } = useCycleList(Object.values(modes), {
    initialValue: mode,
  });
  const toggleMode = () => {
    next();
    mode.value = state.value;
  };
  return { mode, isDefault, isModern, isElegant, toggleMode };
});

//----------------------------------------------------------------------------------------------------
// # Search Store
//----------------------------------------------------------------------------------------------------
export const useSearchStore = defineStore("search", () => {
  const query = ref("");
  const worksStore = useWorksStore();
  const profilesStore = useProfilesStore();
  const search = (value = query.value) => {
    worksStore.query = value;
    profilesStore.query = value;
  };
  watch(query, search);
  return { query, search };
});

//----------------------------------------------------------------------------------------------------
// # List Stores
//----------------------------------------------------------------------------------------------------
const commonQueryKeys = [
  "name",
  "username",
  "title",
  "subtitle",
  "description",
  "categories",
  "tags",
  "icon",
  "image",
];
export const useWorksStore = defineStore(
  "works",
  createListStoreSetup(importData("works", 1), [
    ...commonQueryKeys,
    ["links", ...commonQueryKeys],
  ]),
);
export const useProfilesStore = defineStore(
  "profiles",
  createListStoreSetup(importData("profiles"), commonQueryKeys),
);

//----------------------------------------------------------------------------------------------------
// # List Store Setup
//----------------------------------------------------------------------------------------------------
import random from "random";
function createListStoreSetup(dataArray, queryKeys) {
  return () => {
    const query = ref("");
    const items = ref([]);
    const filteredItems = ref([]);
    const count = computed(() => items.value.length);
    const filteredCount = computed(() => filteredItems.value.length);
    const hasItems = computed(() => items.value.length !== 0);
    const hasFilteredItems = computed(() => filteredItems.value.length !== 0);
    const isFiltered = computed(
      () => items.value.length !== 0 && query.value?.trim() !== "",
    );
    function getRandomItem() {
      return random.choice(items.value);
    }
    function getRandomItems(max = 5) {
      const randomItems = [];
      for (let i = 0; i < max; i++) {
        let randomItem = random.choice(items.value);
        randomItems.push(randomItem);
      }
      return randomItems;
    }
    function load() {
      items.value = dataArray;
      filteredItems.value = items.value.reverse();
    }
    onMounted(async () => await load());
    watch(
      query,
      (query) => (filteredItems.value = search(items.value, queryKeys, query)),
    );
    return {
      query,
      items,
      count,
      hasItems,
      filteredItems,
      filteredCount,
      hasFilteredItems,
      isFiltered,
      getRandomItem,
      getRandomItems,
      load,
    };
  };
}
