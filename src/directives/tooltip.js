//====================================================================================================
// @ Tooltip
//----------------------------------------------------------------------------------------------------
// 		Tooltip directives.
//====================================================================================================
import Tooltip from "bootstrap/js/dist/tooltip";
import check from "@/core/check";

export const bsTooltip = {
  mounted(element, binding) {
    let value = getBsTooltipBindingValue(binding);
    const instance = Tooltip.getOrCreateInstance(element, {
      trigger: "hover",
      ...value,
    });
    element._tooltipInstance = instance;
  },
  updated(element, binding) {
    if (binding.value === binding.oldValue) return;
    let value = getBsTooltipBindingValue(binding);
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

function getBsTooltipBindingValue(binding) {
  let value = binding.value;
  if (check.string(value) || check.number(value))
    return { title: String(value) };
  if (check.array(value)) return { title: value.join(", ") };
  return value;
}

// function enableTooltips() {
//   [...document.querySelectorAll("[data-bs-toggle='tooltip']")].map(
//     (element) => new Tooltip(element),
//   );
// }
