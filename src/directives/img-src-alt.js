//====================================================================================================
// @ Image Source Alternative
//----------------------------------------------------------------------------------------------------
// 		Display an alternative fallback image.
//====================================================================================================
import { importImages } from "@/core/assets";

export default {
  beforeMount: SecureImageSrc,
  updated: SecureImageSrc,
};

function SecureImageSrc(element) {
  const { error, empty } = importImages();
  element.onerror = () => (element.src = error);
  if (!element.src) element.src = empty;
}
