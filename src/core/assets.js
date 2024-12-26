//====================================================================================================
// @ Assets
//----------------------------------------------------------------------------------------------------
// 		Access assets folder files.
//====================================================================================================
import check from "./check";
import { sep, extname } from "path";
import { camelCase } from "change-case";
import { flattenObjectToArray, filterObject } from "./misc";

//----------------------------------------------------------------------------------------------------
// # Serve
//----------------------------------------------------------------------------------------------------
const ASSETS = {
  data: importGroup("data"),
  images: importGroup("images"),
  videos: importGroup("videos"),
};
export const importData = (collectionName, flatDepth) =>
  importArray(ASSETS.data, collectionName, flatDepth);
export const importImages = (collectionName, isFlat) =>
  importObject(ASSETS.images, collectionName, isFlat);

//----------------------------------------------------------------------------------------------------
// # Assets Group Serving
//----------------------------------------------------------------------------------------------------
const importArray = (group, collectionName, flatDepth) => {
  const groupItems = importGroupItemsAsNested(group);
  return collectionName
    ? flattenObjectToArray(groupItems[collectionName] || {}, flatDepth)
    : flattenObjectToArray(groupItems, flatDepth);
};
const importObject = (group, collectionName, isFlat) => {
  const groupItems = isFlat
    ? importGroupItemsAsFlat(group)
    : importGroupItemsAsNested(group);

  return collectionName
    ? isFlat
      ? filterObject(groupItems, (key) => key.startsWith(collectionName))
      : groupItems[collectionName] || {}
    : groupItems;
};

//----------------------------------------------------------------------------------------------------
// # Assets Group Importation
//----------------------------------------------------------------------------------------------------
function importGroupItemsAsFlat(group) {
  return importGroupItems(group, flattenGroupItems);
}
function importGroupItemsAsNested(group) {
  return importGroupItems(group, nestGroupItems);
}
function importGroupItems(group, transformFn) {
  if (!group) return {};
  if (!check.function(transformFn)) return group.items;
  const output = {};
  for (const [key, value] of Object.entries(group.items))
    transformFn({ key, value, output }, group);
  return output;
}

//----------------------------------------------------------------------------------------------------
// # Assets Group Transformation
//----------------------------------------------------------------------------------------------------
function shortPath(path, dirName) {
  return path.split(`/${dirName}/`)[1].replace(extname(path), "");
}
function flattenGroupItems(key, value, output, name, parseFn) {
  let newKey = shortPath(key, name)
    .split(sep)
    .map((keyPart) => camelCase(keyPart))
    .join(sep);
  output[newKey] = parseFn ? parseFn(value) : value;
}
function nestGroupItems({ key, value, output }, { name, parseFn }) {
  let current = output;
  const newKey = shortPath(key, name);
  const keyParts = newKey.split(sep);
  const lastKeyPartsIndex = keyParts.length - 1;
  for (let i = 0; i < lastKeyPartsIndex; i++) {
    const keyPart = camelCase(keyParts[i]);
    if (!current[keyPart]) current[keyPart] = {};
    current = current[keyPart];
  }
  current[camelCase(keyParts[lastKeyPartsIndex])] = parseFn
    ? parseFn(value)
    : value;
}

//----------------------------------------------------------------------------------------------------
// # Assets Group
//----------------------------------------------------------------------------------------------------
import { load } from "js-yaml";
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
