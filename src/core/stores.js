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
// # Theme Store
//----------------------------------------------------------------------------------------------------
import { useDark, useToggle } from "@vueuse/core";
export const useThemeStore = defineStore("theme", () => {
  const isDark = useDark({
    storageKey: "color-scheme",
    selector: "html",
    attribute: "data-bs-theme",
    valueDark: "dark",
    valueLight: "light",
  });
  const toggleDark = useToggle(isDark);
  return { isDark, toggleDark };
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
function createListStoreSetup(itemsPath, queryKeys) {
  return () => {
    const query = ref("");
    const items = ref([]);
    const filteredItems = ref([]);
    async function load() {
      items.value = await readYaml(itemsPath);
      filteredItems.value = items.value.reverse();
    }
    function filter() {
      filteredItems.value = search(items.value, queryKeys, query.value);
    }
    return { query, items, filteredItems, load, filter };
  };
}
