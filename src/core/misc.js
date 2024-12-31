//====================================================================================================
// @ Misc
//----------------------------------------------------------------------------------------------------
// 		Use miscellaneous utilities.
//====================================================================================================
import check from "./check";

//----------------------------------------------------------------------------------------------------
// # String Limit
//----------------------------------------------------------------------------------------------------
/**
 * Limits the length of a string to a specified size and adds an ellipsis suffix if truncated.
 * @param {string} [value=""] - The input string to limit.
 * @param {number} [size=50] - Maximum length of the resulting string.
 * @param {string} [dotsSuffix="..."] - Suffix to append when string is truncated.
 * @returns {string} The limited string or the original string if it fits within the size limit.
 * @example strLimit("Hello, world!", 5); // Returns "Hel..."
 */
export function strLimit(value, size = 50, dotsSuffix = "...") {
  value = value ? String(value) : "";
  return value
    ? value.length <= size
      ? value
      : value.substr(0, size) + dotsSuffix
    : "";
}

/**
 * Applies prefix and suffix to string or array of strings recursively.
 * @param {string|string[]} str - The input string or array of strings.
 * @param {string} [prefix=""] - The prefix to apply before each string.
 * @param {string} [suffix=""] - The suffix to apply after each string.
 * @returns {string|array} The modified string(s) or array of strings.
 * @example
 * strPreSuffix("foo", "bar "); // Returns "bar foo "
 * strPreSuffix(["baz", "qux"], "pre ", "post "); // Returns ["pre baz post ", "pre qux post "]
 */
function strPreSuffix(str, prefix = "", suffix = "") {
  if (check.string(str)) str = `${prefix}${str}${suffix}`;
  else if (check.array(str))
    str = str.map((str) => strPreSuffix(str, prefix, suffix));
  return str;
}

//----------------------------------------------------------------------------------------------------
// # CSS Frameworks Handling
//----------------------------------------------------------------------------------------------------
export function animateCss(...classList) {
  return useCssLibrary(["animated", ...classList], "animate__");
}
/**
 * Creates a utility object for managing CSS classes.
 * @param {string[]} [classList=[]] - An array of CSS class names to apply.
 * @param {string} [prefix=""] - A prefix to add to each class name.
 * @returns {Object} An object with methods to get and set the CSS classes.
 */
function useCssLibrary(classList = [], prefix = "") {
  const classListStr = strPreSuffix(classList, prefix).join(" ");
  return {
    /** @returns {string} The output string of CSS classes. */
    get class() {
      return classListStr;
    },
    /**  @param {HTMLElement} element - Setting this to an element will immediately apply the CSS classes to. */
    set element(element) {
      insertCssClass(element, classList, prefix, "animationend");
    },
  };
}

//----------------------------------------------------------------------------------------------------
// # CSS Class Insertion
//----------------------------------------------------------------------------------------------------
/**
 * Dynamically inserts CSS classes into an HTML element and removes them when the specified event occurs.
 * @param {HTMLElement} htmlElement - The target HTML element to modify.
 * @param {string|string[]} [classList=[]] - One or more CSS class names to add.
 * @param {string} [classPrefix=""] - Optional prefix to prepend to each class name.
 * @param {string} [cleanupEvent=""] - Event name to trigger cleanup.
 * @returns {Promise<string>} A promise that resolves with "Cleanup" when the cleanup event fires.
 * @throws {Error} If the provided element is not a valid HTMLElement.
 * @example await insertCssClass(document.getElementById('my-element'), ['flash', 'fast'], "animate__", "animationend");
 */
function insertCssClass(
  htmlElement,
  classList = [],
  classPrefix = "",
  cleanupEvent = "",
) {
  if (check.object(htmlElement) && "$el" in htmlElement)
    htmlElement = htmlElement.$el;
  if (!htmlElement || !(htmlElement instanceof HTMLElement)) {
    console.error("Element is not a valid HTMLElement:", htmlElement);
    return;
  }
  if (check.string(classList)) classList = [classList];
  if (classPrefix) classList = strPreSuffix(classList, classPrefix);
  htmlElement.classList.add(...classList);
  if (!cleanupEvent) return { htmlElement, classList };
  return new Promise((resolve) => {
    htmlElement.addEventListener(
      cleanupEvent,
      (event) => {
        event.stopPropagation();
        htmlElement.classList.remove(...classList);
        resolve({
          event,
          htmlElement,
          classList,
        });
      },
      { once: true },
    );
  });
}
