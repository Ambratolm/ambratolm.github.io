//====================================================================================================
// @ Safe Img
//----------------------------------------------------------------------------------------------------
// 		Display a fallback image.
//====================================================================================================
import { importImages } from "@/core/assets";

export default {
  beforeMount(element) {
    const images = importImages();
    element.onerror = () => (element.src = images.error);
    if (!element.src) element.src = images.empty;
  },
};
