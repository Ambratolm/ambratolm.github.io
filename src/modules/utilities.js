//====================================================================================================
// @ Utilities
//----------------------------------------------------------------------------------------------------
// 		Utility functions for common tasks.
//====================================================================================================
import Fuse from "fuse.js";

//----------------------------------------------------------------------------------------------------
// # Search Fuzzy
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
// # Search Exact
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
// # Pick Random (One/Many)
//----------------------------------------------------------------------------------------------------
export function pickOne(items = []) {
  return items[Math.floor(Math.random() * items.length)];
}
export function pickMany(items = [], max = 1) {
  const elements = [];
  function getRandomElement(arr) {
    if (elements.length < max) {
      const index = Math.floor(Math.random() * arr.length);
      const element = arr.splice(index, 1)[0];
      elements.push(element);
      return getRandomElement(arr);
    } else return elements;
  }
  return getRandomElement([...items]);
}

//----------------------------------------------------------------------------------------------------
// # Resolve Keys
//----------------------------------------------------------------------------------------------------
export function resolveKeys(keys = [], refObj = {}) {
  return keys?.map((key) => refObj[key]);
}

//----------------------------------------------------------------------------------------------------
// # Get Object Entries
//----------------------------------------------------------------------------------------------------
export function getObjectEntries(obj = {}, includeFalsy = false) {
  const entries = Object.entries(obj).map(([key, value]) =>
    value || includeFalsy ? { [key]: value } : undefined,
  );
  return includeFalsy ? entries : entries.filter(Boolean);
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

//----------------------------------------------------------------------------------------------------
// # Limit String
//----------------------------------------------------------------------------------------------------
export function limitString(value, size = 50, dotsSuffix = "...") {
  value = value ? String(value) : "";
  return value
    ? value.length <= size
      ? value
      : value.substr(0, size) + dotsSuffix
    : "";
}

//----------------------------------------------------------------------------------------------------
// # Prefix Suffix Strings
//----------------------------------------------------------------------------------------------------
/**
 * @example affixSubStrings("wordA wordB", "<", ">"); // Returns "<wordA> <wordB>"
 */
function affixSubStrings(str = "", separator = " ", prefix = "", suffix = "") {
  return str
    .split(separator)
    .filter(Boolean)
    .map((subStr) => `${prefix}${subStr}${suffix}`)
    .join(separator);
}
/**
 * @example affixStrings(["wordA", "wordB"], "<", ">"); // Returns ["<wordA>", "<wordB>"]
 */
// function affixStrings(strList = [], prefix = "", suffix = "") {
//   return strList.map((str) => `${prefix}${str}${suffix}`);
// }

//----------------------------------------------------------------------------------------------------
// # CSS Class Insertion
//----------------------------------------------------------------------------------------------------
export function useCssLibrary(classes = "", prefix = "", element = null) {
  classes = affixSubStrings(classes, " ", prefix);
  return element
    ? insertCssClass(element, classes.split(" "), "animationend")
    : classes;
}
function insertCssClass(
  htmlElement = new HTMLElement(),
  cssClassList = [],
  cleanupEventName = "",
) {
  if (!(htmlElement instanceof HTMLElement)) {
    console.error("Element is not a valid HTMLElement:", htmlElement);
    return;
  }
  htmlElement.classList.add(...cssClassList);
  if (!cleanupEventName) return { htmlElement, cssClassList };
  return new Promise((resolve) => {
    htmlElement.addEventListener(
      cleanupEventName,
      (event) => {
        event.stopPropagation();
        htmlElement.classList.remove(...cssClassList);
        resolve({
          htmlElement,
          cssClassList,
          event,
        });
      },
      { once: true },
    );
  });
}
