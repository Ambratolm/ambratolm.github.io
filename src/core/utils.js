//====================================================================================================
// @ Utilities
//----------------------------------------------------------------------------------------------------
// 		Utility functions for common tasks.
//====================================================================================================
import Fuse from "fuse.js";
import random from "random";

//----------------------------------------------------------------------------------------------------
// # Fuzzy Search
//----------------------------------------------------------------------------------------------------
/**
 * @example searchFuzzy(works, ["categories.name", "tags"], "game windows")
 */
export function searchFuzzy(items = [], keys = [], query = "") {
  if (!query) return items;
  if (typeof keys === "string") keys = [keys];
  const fuse = new Fuse(items, { keys });
  return fuse.search(query).map((result) => result.item);
}

//----------------------------------------------------------------------------------------------------
// # Exact Search
//----------------------------------------------------------------------------------------------------
/**
 * @example searchExact(works, { "categories.name": "game", tags: "windows" })
 */
export function searchExact(items = [], query = {}, operator = "$and") {
  const queryExpressions = getObjectEntries(query);
  if (queryExpressions.length <= 0) return items;
  const fuse = new Fuse(items, {
    keys: Object.keys(query),
    threshold: 0,
    distance: 0,
  });
  return fuse
    .search({ [operator]: queryExpressions })
    .map((result) => result.item);
}

//----------------------------------------------------------------------------------------------------
// # Random Pick
//----------------------------------------------------------------------------------------------------
export function getRandomItem(items) {
  return random.choice(items);
}
export function getRandomItems(items, max = 5) {
  const randomItems = [];
  for (let i = 0; i < max; i++) {
    let randomItem = random.choice(items);
    randomItems.push(randomItem);
  }
  return randomItems;
}

//----------------------------------------------------------------------------------------------------
// # Resolve Keys
//----------------------------------------------------------------------------------------------------
export function resolveKeys(keys = [], refObj = {}) {
  return keys?.map((key) => refObj[key]);
}

//----------------------------------------------------------------------------------------------------
// # Title
//----------------------------------------------------------------------------------------------------
export function getObjectEntries(obj = {}, includeFalsyValue = false) {
  const entries = Object.entries(obj).map(([key, value]) =>
    value || includeFalsyValue ? { [key]: value } : undefined,
  );
  return includeFalsyValue ? entries : entries.filter(Boolean);
}

//----------------------------------------------------------------------------------------------------
// # Filter Object
//----------------------------------------------------------------------------------------------------
// export function filterObject(obj = {}, checkFn = () => true) {
//   return Object.fromEntries(
//     Object.entries(obj).filter(([key, value]) => checkFn(key, value)),
//   );
// }

//----------------------------------------------------------------------------------------------------
// # Flatten Object
//----------------------------------------------------------------------------------------------------
export function flattenObject(obj = {}, depth = 0) {
  const output = {};
  function recursiveFlatten(currentObj, currentDepth /** prefix = "" **/) {
    if (currentDepth <= 0) return;
    for (let [key, value] of Object.entries(currentObj)) {
      // let newKey = prefix ? `${prefix}.${key}` : key;
      if (typeof value === "object" && value !== null)
        recursiveFlatten(value, currentDepth - 1);
      else output[key] = value;
    }
  }
  recursiveFlatten(obj, depth);
  return output;
}

//----------------------------------------------------------------------------------------------------
// # Flatten Object To Array
//----------------------------------------------------------------------------------------------------
export function flattenObjectToArray(obj = {}, depth = 0) {
  return Object.values(obj).reduce((acc, value) => {
    if (
      typeof value === "object" &&
      value !== null &&
      !(value instanceof Array)
    )
      return acc.concat(flattenObjectToArray(value, depth - 1));
    else return acc.concat(value);
  }, []);
}
