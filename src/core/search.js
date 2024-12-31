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
