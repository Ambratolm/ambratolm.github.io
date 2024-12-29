//====================================================================================================
// @ Search
//----------------------------------------------------------------------------------------------------
// 		Search and filter items.
//====================================================================================================
import Fuse from "fuse.js";
import check from "./check";

//----------------------------------------------------------------------------------------------------
// # Query Search
//----------------------------------------------------------------------------------------------------
/**
 * Searches through an array of items based on a query.
 * @param {Array} items - The array of items to search through.
 * @param {String[]} keys - An an array of strings specifying which properties to search.
 * @param {string} query - The search query.
 * @returns {Array} An array of matching items.
 */
export function search(items, keys, query) {
  if (!check.string(query) || !(query = query.trim())) return items;
  const fuse = new Fuse(items, { keys });
  return fuse.search(query).map((result) => result.item);
}

//----------------------------------------------------------------------------------------------------
// # Name Search
//----------------------------------------------------------------------------------------------------
// export function find(items, key, value) {
//   if (!check.string(key) || !(key = key.trim().toLowerCase())) return;
//   return items.find(
//     (item) =>
//       check.string(item[key]) &&
//       item[key].trim().toLowerCase() === value.trim().toLowerCase(),
//   );
// }

//----------------------------------------------------------------------------------------------------
// # Tag Search
//----------------------------------------------------------------------------------------------------
// export function searchByTag(items, tag = "") {
//   if (!check.string(tag) || !(tag = tag.trim().toLowerCase())) return items;
//   return items.filter(
//     (item) =>
//       check.string(item.tags) &&
//       item.tags
//         .trim()
//         .toLowerCase()
//         .split(",")
//         .map((item) => item.trim())
//         .includes(tag),
//   );
// }

//----------------------------------------------------------------------------------------------------
// # Filter Object
//----------------------------------------------------------------------------------------------------
/**
 * Filters an object based on a custom check function.
 * @param {Object} obj - The object to filter.
 * @param {Function} [checkFn={() => true}] - Custom function to determine whether to include a key-value pair.
 * Defaults to a function that always returns true.
 * @returns {Object} A new object containing only the key-value pairs that pass the check function.
 * @example
 * const filteredObj = filterObject({a: 1, b: 2, c: 3}, (key, value) => value > 1);
 * // Result: {b: 2, c: 3}
 */
export const filterObject = (obj, checkFn = () => true) => {
  if (check.object(obj))
    return Object.fromEntries(
      Object.entries(obj).filter(([key, value]) => checkFn(key, value)),
    );
};

//----------------------------------------------------------------------------------------------------
// # Flatten Object
//----------------------------------------------------------------------------------------------------
/**
 * Flattens a nested object into a single-dimensional array.
 * @param {Object} obj - The object to flatten.
 * @param {number} depth - The maximum depth to flatten (0 for no flattening).
 * @returns {Array} A flattened array containing all values from the input object.
 * @example
 * const result = flattenObjectToArray({a: 1, b: {c: 2, d: {e: 3}}}, 2);
 * // Result: [1, 2, 3]
 */
export const flattenObjectToArray = (obj, depth) => {
  if (!check.number(depth) || depth === 0) return Object.values(obj);
  return Object.values(obj).reduce((acc, value) => {
    if (check.object(value) && !check.array(value))
      return acc.concat(flattenObjectToArray(value, depth - 1));
    else return acc.concat(value);
  }, []);
};

// export const flatten = (obj, depth, includeArrays) => {
//   if (depth === 0) return check.array(obj) ? obj : Object.values(obj);
//   if (includeArrays && check.array(obj))
//     return obj.flatMap((item) => {
//       if (check.object(item)) return flatten(item, depth - 1, includeArrays);
//       return item;
//     });
//     return Object.values(obj).flatMap((value) => {
//       if (check.object(value)) return flatten(value, depth - 1, includeArrays);
//       return value;
//     });
// };
