//====================================================================================================
// @ Animate
//----------------------------------------------------------------------------------------------------
// 		Animate DOM elements by inserting CSS animation classes.
//====================================================================================================
import check from "./check";

//----------------------------------------------------------------------------------------------------
// # AnimateCSS Animation
//----------------------------------------------------------------------------------------------------
export async function animateCss(
  element,
  animation = "flash",
  modifier = "",
  prefix = "animate__",
) {
  return await insertAnimationClassList(element, [
    `${prefix}animated`,
    `${prefix}${animation}`,
    ...(modifier ? [`${prefix}${modifier}`] : []),
  ]);
}

//----------------------------------------------------------------------------------------------------
// # FontAwesome Animation
//----------------------------------------------------------------------------------------------------
export async function animateFontAwesome(
  element,
  animation = "beat",
  infinite = false,
  prefix = "fa-",
) {
  return await insertAnimationClassList(
    element,
    [`${prefix}${animation}`],
    infinite ? "animationEnd" : "animationiteration",
  );
}

//----------------------------------------------------------------------------------------------------
// # General Animation
//----------------------------------------------------------------------------------------------------
export async function insertAnimationClassList(
  htmlElement,
  classList = [],
  cleanupEvent = "animationend",
) {
  if (check.object(htmlElement) && "$el" in htmlElement)
    htmlElement = htmlElement.$el;
  if (!htmlElement || !(htmlElement instanceof HTMLElement)) {
    console.error("Element is not a valid HTMLElement:", htmlElement);
    return;
  }
  return new Promise((resolve) => {
    htmlElement.classList.add(...classList);
    htmlElement.addEventListener(
      cleanupEvent,
      (event) => {
        event.stopPropagation();
        htmlElement.classList.remove(...classList);
        resolve("Animation Ended");
      },
      { once: true },
    );
  });
}
