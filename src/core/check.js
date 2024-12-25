//====================================================================================================
// @ Check
//----------------------------------------------------------------------------------------------------
// 		Check common data types.
//====================================================================================================

export default {
  //----------------------------------------------------------------------------------------------------
  // # Primitives
  //----------------------------------------------------------------------------------------------------
  boolean(value) {
    return typeof value === "boolean";
  },
  number(value) {
    return typeof value === "number" && !isNaN(value);
  },
  biginit(value) {
    return typeof value === "bigint";
  },
  string(value) {
    return typeof value === "string";
  },
  symbol(value) {
    return typeof value === "symbol";
  },
  undefined(value) {
    return value === undefined;
  },
  null(value) {
    return value === null;
  },

  //----------------------------------------------------------------------------------------------------
  // # Objects
  //----------------------------------------------------------------------------------------------------
  object(value) {
    return typeof value === "object" && value !== null;
  },
  emptyObject(value) {
    return this.object(value) && !Object.getOwnPropertyNames(value).length;
  },
  array(value) {
    return value instanceof Array;
  },
  arrayLike(value) {
    return this.object(value) && !this.array(value) && "length" in value;
  },
  function(value) {
    return typeof value === "function";
  },
};
