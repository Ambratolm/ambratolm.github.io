//====================================================================================================
// @ Stores
//----------------------------------------------------------------------------------------------------
// 		Manage all data stores.
//====================================================================================================
import { DATA } from "./assets";
import { searchFuzzy, searchExact, pickOne, pickMany } from "./utilities";
import { ref, reactive, computed, watch } from "vue";
import { defineStore } from "pinia";

//----------------------------------------------------------------------------------------------------
// # Common Search Query Keys
//----------------------------------------------------------------------------------------------------
const KEYS = [
  "name",
  "title",
  "username",
  "subtitle",
  "description",
  "categories",
  "languages",
  "tags",
  "icon",
  "image",
];

//----------------------------------------------------------------------------------------------------
// # Works Store
//----------------------------------------------------------------------------------------------------
export const useCategoriesStore = defineSimpleArrayStore(
  "categories",
  DATA.categories,
);
export const useLanguagesStore = defineSimpleArrayStore(
  "languages",
  DATA.languages,
);
export const useProfilesStore = defineFiltrableArrayStore(
  "profiles",
  DATA.profiles,
  KEYS,
);
export const useWorksStore = defineFiltrableArrayStore("works", DATA.works, [
  ...KEYS,
  ["links", ...KEYS],
]);

//----------------------------------------------------------------------------------------------------
// # General Store Logic
//----------------------------------------------------------------------------------------------------
function defineSimpleArrayStore(name = "", srcItems = []) {
  return defineStore(name, () => ({ items: ref(srcItems) }));
}
function defineFiltrableArrayStore(name = "", srcItems = [], keys = []) {
  return defineStore(name, () => createFiltrableArrayStore(srcItems, keys));
}
function createFiltrableArrayStore(srcItems = [], keys = []) {
  const items = ref(srcItems);
  const query = reactive({
    category: "",
    language: "",
    tag: "",
    keyword: "",
  });
  const isFiltered = computed(
    () =>
      srcItems.length !== 0 &&
      (srcItems.length !== items.value.length ||
        Object.values(query).every(Boolean)),
  );
  function filter() {
    items.value = searchFuzzy(
      searchExact(srcItems, {
        "categories.name": query.category,
        "languages.name": query.language,
        tags: query.tag,
      }),
      keys,
      query.keyword,
    );
  }
  function randomItem() {
    return pickOne(items.value);
  }
  function randomItems(max = 5) {
    return pickMany(items.value, max);
  }
  watch(query, filter);
  return {
    srcItems,
    items,
    query,
    isFiltered,
    filter,
    randomItem,
    randomItems,
  };
}
