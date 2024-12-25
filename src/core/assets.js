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
export const importData = (collectionName, flatDepth) =>
  importArray("data", collectionName, flatDepth);
export const importImages = (collectionName = "", isFlat) =>
  importObject("images", collectionName, isFlat);

//----------------------------------------------------------------------------------------------------
// # Asset Group Serving
//----------------------------------------------------------------------------------------------------
const importArray = (groupName, collectionName, flatDepth) => {
  const groupItems = importGroupItemsAsNested(groupName);
  return collectionName
    ? flattenObjectToArray(groupItems[collectionName] || {}, flatDepth)
    : flattenObjectToArray(groupItems, flatDepth);
};
const importObject = (groupName, collectionName, isFlat) => {
  const groupItems = isFlat
    ? importGroupItemsAsFlat(groupName)
    : importGroupItemsAsNested(groupName);

  return collectionName
    ? isFlat
      ? filterObject(groupItems, (key) => key.startsWith(collectionName))
      : groupItems[collectionName] || {}
    : groupItems;
};

//----------------------------------------------------------------------------------------------------
// # Asset Group
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
// # Asset Group Transformation
//----------------------------------------------------------------------------------------------------
function shortPath(path, dirName) {
  return path.split(`/${dirName}/`)[1].replace(extname(path), "");
}
function importGroupItemsAsFlat(groupName) {
  const group = importGroup(groupName);
  if (!group) return {};
  const { name, items, parseFn } = group;
  const output = {};
  const isParsable = check.function(parseFn);
  for (const [key, value] of Object.entries(items)) {
    let newKey = shortPath(key, name)
      .split(sep)
      .map((keyPart) => camelCase(keyPart))
      .join(sep);
    output[newKey] = isParsable ? parseFn(value) : value;
  }
  return output;
}
function importGroupItemsAsNested(groupName) {
  const group = importGroup(groupName);
  if (!group) return {};
  const { name, items, parseFn } = group;
  const output = {};
  const isParsable = check.function(parseFn);
  for (const [key, value] of Object.entries(items)) {
    let asset = output;
    const newKey = shortPath(key, name);
    const keyParts = newKey.split(sep);
    const lastKeyPartsIndex = keyParts.length - 1;
    for (let i = 0; i < lastKeyPartsIndex; i++) {
      const keyPart = camelCase(keyParts[i]);
      if (!asset[keyPart]) asset[keyPart] = {};
      asset = asset[keyPart];
    }
    asset[camelCase(keyParts[lastKeyPartsIndex])] = isParsable
      ? parseFn(value)
      : value;
  }
  return output;
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
