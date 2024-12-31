//====================================================================================================
// @ Assets
//----------------------------------------------------------------------------------------------------
// 		Access assets folder files.
//====================================================================================================
import check from "./check";
import { sep, basename, extname } from "path";
import { camelCase } from "change-case";
import { flattenObjectToArray } from "./search";

//----------------------------------------------------------------------------------------------------
// # Assets
//----------------------------------------------------------------------------------------------------
const ASSETS = {
  data: importGroup("data"),
  images: importGroup("images"),
  videos: importGroup("videos"),
};
/**
 * Retrieves data from ASSETS.data based on the given collection name.
 * @param {string} collectionName - The name of the collection to retrieve data from.
 * @param {Object} [options={}] - Configuration options for the retrieval.
 * @param {number} [options.flatDepth=1] - Depth of flattening for nested objects.
 * @returns {Promise<Array<T>>} A promise resolving to an array of flattened objects.
 * @example const data = await getData('works', { flatDepth: 2 });
 */
export const getData = (collectionName, { flatDepth = 1 } = {}) =>
  flattenObjectToArray(
    getGroupItems(ASSETS.data, { startKey: collectionName }),
    flatDepth,
  );
/**
 * Retrieves images from ASSETS.images based on the given collection name.
 * @param {string} collectionName - The name of the image collection to retrieve.
 * @param {Object} [options={}] - Configuration options for the retrieval.
 * @param {boolean} [options.isFlat=true] - Whether to return flat data structure.
 * @param {boolean} [options.hasLiteralKey=false] - Whether to include literal keys in the result.
 * @returns {Promise<Array<T>>} A promise resolving to an array of images.
 * @example const images = await getImages('works',  { hasLiteralKey: true });
 */
export const getImages = (
  collectionName,
  { isFlat = true, hasLiteralKey = false } = {},
) =>
  getGroupItems(ASSETS.images, {
    startKey: collectionName,
    isFlat,
    hasLiteralKey,
  });

//----------------------------------------------------------------------------------------------------
// # Assets Group Items
//----------------------------------------------------------------------------------------------------
/**
 * Gets processed group items.
 * @param {Object} group - The group object containing items to process.
 * @param {Object} [options={}] - Optional configuration options.
 * @param {string} [options.startKey] - Starting key for filtering items.
 * @param {boolean} [options.hasFullKey] - Whether to have full path keys.
 * @param {boolean} [options.hasLiteralKey] - Whether to have string literal keys.
 * @param {boolean} [options.isFlat] - Whether to flatten nested structures.
 * @returns {Object} Processed group items.
 */
function getGroupItems(
  group,
  { startKey, hasFullKey, hasLiteralKey, isFlat } = {},
) {
  if (!check.object(group)) return {};
  const { name, items, parseFn } = group;
  const output = {};
  for (let [key, value] of Object.entries(items)) {
    key = key.split(`/${name}/`)[1].replace(extname(key), "");
    if (startKey && !key.startsWith(startKey)) continue;
    let current = output;
    const keyParts = key.split(sep);
    for (let i = 0; i < keyParts.length - 1; i++) {
      if (!hasLiteralKey) keyParts[i] = camelCase(keyParts[i]);
      if (isFlat) continue;
      const keyPart = keyParts[i];
      if (!current[keyPart]) current[keyPart] = {};
      current = current[keyPart];
    }
    key = hasFullKey
      ? keyParts.join(sep)
      : hasLiteralKey
        ? basename(key)
        : camelCase(basename(key));
    value = parseFn ? parseFn(value) : value;
    if (!value) continue;
    if (isFlat) output[key] = value;
    else current[key] = value;
  }
  return output;
}

//----------------------------------------------------------------------------------------------------
// # Assets Group
//----------------------------------------------------------------------------------------------------
import { load } from "js-yaml";
/**
 * Imports a group of assets.
 * @param {String} name - Group name
 * @returns {Object|Null} - { name, items, parseFn }
 */
function importGroup(name) {
  let items;
  let parseFn;
  switch (name) {
    case "data":
      items = import.meta.glob("@data/**/*.(yml|yaml)", {
        query: "?raw",
        import: "default",
        eager: true,
      });
      parseFn = load;
      break;
    case "images":
      items = import.meta.glob("@images/**/*.(png|jpg|jpeg|gif|bmp|webp)", {
        import: "default",
        eager: true,
      });
      break;
    case "videos":
      items = import.meta.glob("@videos/**/*.mp4", {
        import: "default",
        eager: true,
      });
      break;
  }
  return items ? { name, items, parseFn } : null;
}
