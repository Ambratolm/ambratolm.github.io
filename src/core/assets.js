//====================================================================================================
// @ Assets
//----------------------------------------------------------------------------------------------------
// 		Access assets folder files.
//====================================================================================================
import { sep, basename, extname } from "path";
import { camelCase } from "change-case";
import { load } from "js-yaml";
import { flattenObject, flattenObjectToArray, resolveKeys } from "./utils";

//----------------------------------------------------------------------------------------------------
// # Assets
//----------------------------------------------------------------------------------------------------
const DATA = getDocuments(importCollection("data"));
const IMAGES = getDocuments(importCollection("images"), {
  hasLiteralKey: true,
});
// const VIDEOS = getGroupItems(importGroup("videos"), { hasLiteralKey: true });
//----------------------------------------------------------------------------------------------------
const categories = DATA.categories;
const languages = DATA.languages;
const works = flattenObjectToArray(DATA.works, 2);
const worksImages = flattenObject(IMAGES.works, 2);
for (const work of works) {
  work.categories = resolveKeys(work.categories, categories);
  work.languages = resolveKeys(work.languages, languages);
  work.image = worksImages[work.image] || worksImages["_default"];
}
const profiles = DATA.profiles;
const logos = IMAGES.logos;
//----------------------------------------------------------------------------------------------------
export { categories, languages, works, profiles, logos };

//----------------------------------------------------------------------------------------------------
// # Assets Documents
//----------------------------------------------------------------------------------------------------
function getDocuments(
  collection = {},
  {
    startKey = "",
    hasFullKey = false,
    hasLiteralKey = false,
    isFlat = false,
  } = {},
) {
  const { name, items, parseFn } = collection;
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
// # Assets Collection
//----------------------------------------------------------------------------------------------------
function importCollection(name = "") {
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
  return items ? { name, items, parseFn } : undefined;
}
