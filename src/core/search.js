//====================================================================================================
// @ Search
//----------------------------------------------------------------------------------------------------
// 		Search and filter items.
//====================================================================================================
import Fuse from "fuse.js";
import check from "./check";

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
// # Query Search
//----------------------------------------------------------------------------------------------------
export function search(items, keys, query = "") {
  if (!check.string(query) || !(query = query.trim())) return items;
  const fuse = new Fuse(items, { keys });
  return fuse.search(query).map((result) => result.item);
}

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
