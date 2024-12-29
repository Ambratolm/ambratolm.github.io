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
export const getData = (collectionName, { flatDepth = 1 } = {}) =>
  flattenObjectToArray(
    getGroupItems(ASSETS.data, { startKey: collectionName }),
    flatDepth,
  );
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
 * @param {boolean} [options.hasFullKey=true] - Whether to include full keys.
 * @param {boolean} [options.isFlat=false] - Whether to flatten nested structures.
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
    if (isFlat) output[key] = parseFn ? parseFn(value) : value;
    else current[key] = parseFn ? parseFn(value) : value;
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

//----------------------------------------------------------------------------------------------------
// (Old way using AJAX)
//----------------------------------------------------------------------------------------------------
// # Client
//----------------------------------------------------------------------------------------------------
// import axios from "axios";
// const client = axios.create({
//   baseURL: "data",
//   withCredentials: false,
//   headers: {
//     Accept: "text/yaml",
//     "Content-Type": "text/yaml",
//   },
// });
//----------------------------------------------------------------------------------------------------
// # Operations
//----------------------------------------------------------------------------------------------------
// export const createYaml = async (path, data) =>
//   load((await client.post(`${path}.yml`, data)).data);
// export const readYaml = async (path) =>
//   load((await client.get(`${path}.yml`)).data);
// export const updateYaml = async (path, data) =>
//   load(await client.put(`${path}.yml`, data).data);
// export const deleteYaml = async (path) =>
//   load(await client.delete(`${path}.yml`).data);
