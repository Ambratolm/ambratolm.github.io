//====================================================================================================
// @ Misc
//----------------------------------------------------------------------------------------------------
// 		Use miscellaneous utilities.
//====================================================================================================
import check from "./check";

//----------------------------------------------------------------------------------------------------
// # Filter Object
//----------------------------------------------------------------------------------------------------
export const filterObject = (obj, fn = () => true) => {
  if (check.object(obj))
    return Object.fromEntries(
      Object.entries(obj).filter(([key, value]) => fn(key, value)),
    );
};

//----------------------------------------------------------------------------------------------------
// # Flatten Object
//----------------------------------------------------------------------------------------------------
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

// function capitalize(str) {
//   if (str === null || str.length === 0) return str;
//   return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
// }

// export function choice(items) {
//     return items[Math.floor(Math.random() * items.length)];
// }
