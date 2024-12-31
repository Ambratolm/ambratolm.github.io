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
// # Categories Store
//----------------------------------------------------------------------------------------------------
export const useCategoriesStore = defineStore("categories", () => {
  const worksStore = useWorksStore();
  const items = ref(getData("categories"));
  const current = ref(null);
  const setCurrent = (name) =>
    (current.value = items.value.find(
      (category) => category.name === (name || ""),
    ));
  setCurrent(worksStore.category.value);
  watch(
    () => worksStore.category,
    (name) => setCurrent(name),
  );
  function getCategory(name) {
    return items.value.find((category) => category.name === (name || ""));
  }
  return { items, current, getCategory };
});

//----------------------------------------------------------------------------------------------------
// # Collection Stores
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

//----------------------------------------------------------------------------------------------------
// # List Store Setup
//----------------------------------------------------------------------------------------------------
import random from "random";
// import { useStorage } from "@vueuse/core";
/**
 * Creates a Pinia `useStore` for managing a collection of items.
 * @param {string} name - Name of the collection store.
 * @param {Function} itemsArrayFn - Function to generate initial array of items.
 * @param {Object} queryKeys - Query keys for searching.
 * @returns {Object} Pinia `useStore` instance with reactive state and actions.
 */
function defineCollectionStore(name, itemsArrayFn, queryKeys) {
  return defineStore(name, () => {
    {
      const category = ref("");
      const tag = ref("");
      const language = ref("");
      const query = ref("");
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
      function filterAndSearch() {
        filteredItems.value = search(
          items.value.filter(
            (item) =>
              (!category.value || item.categories?.includes(category.value)) &&
              (!tag.value || item.tags?.includes(tag.value)) &&
              (!language.value || item.languages?.includes(language.value)),
          ),
          queryKeys,
          query.value,
        );
      }
      watch(category, filterAndSearch);
      watch(tag, filterAndSearch);
      watch(language, filterAndSearch);
      watch(query, filterAndSearch);
      // useStorage(`query-${name}`, query);
      return {
        query,
        category,
        tag,
        language,
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
