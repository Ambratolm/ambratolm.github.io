//====================================================================================================
// @ Stores
//----------------------------------------------------------------------------------------------------
// 		Manage all data stores.
//====================================================================================================
import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { getData, getImages } from "@/core/assets";
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
    storageKey: "theme-dark",
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
  useStorage("query", query);
  return { query, search };
});

//----------------------------------------------------------------------------------------------------
// # List Stores
//----------------------------------------------------------------------------------------------------
const COMMON_QUERY_KEYS = [
  "name",
  "username",
  "title",
  "subtitle",
  "description",
  "categories",
  "tags",
  "icon",
  "image",
  "languages",
];
export const useWorksStore = defineCollectionStore(
  "works",
  (name) => {
    const works = getData(name, { flatDepth: 2 });
    const worksImages = getImages(name, { hasLiteralKey: true });
    for (const work of works)
      work.image = worksImages[work.image] || worksImages["_default"];
    return works;
  },
  [...COMMON_QUERY_KEYS, ["links", ...COMMON_QUERY_KEYS]],
);
export const useProfilesStore = defineCollectionStore(
  "profiles",
  getData,
  COMMON_QUERY_KEYS,
);
export const useCategoriesStore = defineCollectionStore(
  "categories",
  getData,
  [],
);

//----------------------------------------------------------------------------------------------------
// # List Store Setup
//----------------------------------------------------------------------------------------------------
import random from "random";
import { useStorage } from "@vueuse/core";
function defineCollectionStore(name, itemsArrayFn, queryKeys) {
  return defineStore(name, () => {
    {
      const query = ref("");
      const category = ref("");
      const items = ref(itemsArrayFn(name));
      const filteredItems = ref(items.value);
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
      watch(
        query,
        (query) =>
          (filteredItems.value = search(items.value, queryKeys, query)),
      );
      watch(
        category,
        (category) =>
          (filteredItems.value = category
            ? items.value.filter((item) => item.categories?.includes(category))
            : items.value),
      );
      useStorage(`query-${name}`, query);
      return {
        query,
        category,
        items,
        count,
        hasItems,
        filteredItems,
        filteredCount,
        hasFilteredItems,
        isFiltered,
        getRandomItem,
        getRandomItems,
      };
    }
  });
}
