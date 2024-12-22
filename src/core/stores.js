//====================================================================================================
// @ Stores
//----------------------------------------------------------------------------------------------------
// 		All data stores.
//====================================================================================================
import { ref } from "vue";
import { defineStore } from "pinia";
import { readYaml } from "@/core/crud";
import { search } from "@/core/search";

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
  return { query };
});

//----------------------------------------------------------------------------------------------------
// # Profiles Store
//----------------------------------------------------------------------------------------------------
export const useProfilesStore = defineStore(
  "profiles",
  createListStoreSetup("profiles", [
    "title",
    "subtitle",
    "username",
    "url",
    "category",
    "tags",
    "icon",
  ]),
);

//----------------------------------------------------------------------------------------------------
// # Works Store
//----------------------------------------------------------------------------------------------------
export const useWorksStore = defineStore(
  "works",
  createListStoreSetup("works", ["title", "tags"]), // todo: add more keys
);

//----------------------------------------------------------------------------------------------------
// # List Store Setup
//----------------------------------------------------------------------------------------------------
import random from "random";
function createListStoreSetup(itemsPath, queryKeys) {
  return () => {
    const query = ref("");
    const items = ref([]);
    const filteredItems = ref([]);
    const count = computed(() => items.value.length);
    const filteredCount = computed(() => filteredItems.value.length);
    const hasItems = computed(() => items.value.length !== 0);
    const hasFilteredItems = computed(() => filteredItems.value.length !== 0);
    const isFiltered = computed(
      () => items.value.length !== 0 && query.value.trim() !== "",
    );
    function getRandomItem() {
      return random.choice(items.value);
    }
    function getRandomItems(max = 5) {
      const randomItems = [];
      // while (randomItems.length < max) {
      //   let randomItem = random.choice(items.value);
      //   if (randomItems.length > 0 && randomItems.includes(randomItem))
      //     continue;
      //   randomItems.push(randomItem);
      // }
      // return randomItems;
      for (let i = 0; i < max; i++) {
        let randomItem = random.choice(items.value);
        randomItems.push(randomItem);
      }
      return randomItems;
    }
    async function load() {
      items.value = await readYaml(itemsPath);
      filteredItems.value = items.value.reverse();
    }
    function filter() {
      filteredItems.value = search(items.value, queryKeys, query.value);
    }
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
      filter,
    };
  };
}
