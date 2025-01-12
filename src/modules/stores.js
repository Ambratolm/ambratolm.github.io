//====================================================================================================
// @ Stores
//----------------------------------------------------------------------------------------------------
// 		Manage all data stores.
//====================================================================================================
import { DATA } from "./assets";
import { searchFuzzy, searchExact, pickOne, pickMany } from "./utilities";
import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import { useQuery } from "./composables";

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
export const useWorksStore = defineFiltrableArrayStore("works", DATA.works, [
  ...KEYS,
  ["links", ...KEYS],
]);
export const useProfilesStore = defineFiltrableArrayStore(
  "profiles",
  DATA.profiles,
  KEYS,
);
export const usePostsStore = defineFiltrableArrayStore(
  "posts",
  DATA.posts,
  KEYS,
);
export const useGeneralStore = defineStore("general", () => {
  const worksStore = useWorksStore();
  const profilesStore = useProfilesStore();
  const { query, setQuery, clearQuery } = useQuery({
    category: "",
    language: "",
    tag: "",
    keyword: "",
  });
  function filter() {
    worksStore.setQuery(query);
    profilesStore.setQuery(query);
  }
  watch(query, filter);
  return { query, setQuery, clearQuery, filter };
});

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
  const { query, setQuery, clearQuery } = useQuery({
    category: "",
    language: "",
    tag: "",
    keyword: "",
  });
  const routeQueryDef = {
    category: "cat",
    language: "lang",
    tag: "tag",
    keyword: "q",
  };
  const isFiltered = computed(
    () =>
      srcItems.length !== 0 &&
      (srcItems.length !== items.value.length ||
        Object.values(query).some(Boolean)),
  );
  function filter(query) {
    items.value = searchFuzzy(
      searchExact(srcItems, {
        "categories.name": query.category,
        "languages.name": query.language,
        tags: query.tag,
      }),
      keys,
      query.keyword?.trim(),
    );
  }
  watch(query, filter);
  return {
    srcItems,
    items,
    query,
    routeQueryDef,
    isFiltered,
    setQuery,
    clearQuery,
    filter: () => filter(query),
    getRandomItem: () => pickOne(srcItems),
    getRandomItems: (max = 5) => pickMany(srcItems, max),
    getItem: (name) => srcItems.find((item) => item.name === name),
  };
}
