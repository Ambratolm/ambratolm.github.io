//====================================================================================================
// @ Stores
//----------------------------------------------------------------------------------------------------
// 		Manage all data stores.
//====================================================================================================
import { works, profiles, languages } from "./assets";
import { searchFuzzy, searchExact } from "./utils";
import { ref } from "vue";
import { defineStore } from "pinia";

//----------------------------------------------------------------------------------------------------
// # Works Store
//----------------------------------------------------------------------------------------------------
export const useWorksStore = defineStore("works", () => {
  const allItems = ref(works);
  const items = ref(works);
  const query = {
    category: ref(null),
    language: ref(null),
    tag: ref(""),
    keyword: ref(""),
  };
  function find() {
    return searchExact(items.value, {
      "categories.name": "",
      languages: "",
      tags: "",
    });
  }
  function filter() {
    return searchFuzzy(items, ["name"], query.keyword);
  }
  return { allItems, items, query, find, filter };
});
