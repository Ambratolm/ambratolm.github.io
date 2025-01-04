//====================================================================================================
// @ Directives
//----------------------------------------------------------------------------------------------------
// 		Directives.
//====================================================================================================
// import { getImages } from "@/core/assets";
import Tooltip from "bootstrap/js/dist/tooltip";

//----------------------------------------------------------------------------------------------------
// # Image Source Alternative Directive
//----------------------------------------------------------------------------------------------------
// export const imgSrcAlt = {
//   beforeMount: SecureImageSrc,
//   updated: SecureImageSrc,
// };
// function SecureImageSrc(element) {
//   const { error, empty } = getImages();
//   element.onerror = () => (element.src = error);
//   if (!element.src) element.src = empty;
// }

//----------------------------------------------------------------------------------------------------
// # Bootstrap Tooltip Directive
//----------------------------------------------------------------------------------------------------
export const bsTooltip = {
  mounted(element, binding) {
    const value = parseBootstrapTooltipValue(binding.value);
    const instance = Tooltip.getOrCreateInstance(element, {
      trigger: "hover",
      ...value,
    });
    element._tooltipInstance = instance;
  },
  updated(element, binding) {
    if (binding.value === binding.oldValue) return;
    const value = parseBootstrapTooltipValue(binding.value);
    const instance =
      element._tooltipInstance || Tooltip.getOrCreateInstance(element);
    if (value.title) instance.setContent({ ".tooltip-inner": value.title });
    Object.assign(instance._config, value);
  },
  async unmounted(element) {
    const instance = element._tooltipInstance;
    if (instance) {
      await instance.dispose();
      delete element._tooltipInstance;
    }
  },
};
function parseBootstrapTooltipValue(value) {
  if (typeof value === "string" || (typeof value === "number" && !isNaN(value)))
    return { title: String(value) };
  if (value instanceof Array) return { title: value.join(", ") };
  return value;
}
