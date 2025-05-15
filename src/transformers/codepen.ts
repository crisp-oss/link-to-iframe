import { Transformer } from "../types";

/**
 * Transformer for CodePen URLs
 * Supports formats:
 * - codepen.io/username/pen/penId
 * - codepen.io/username/full/penId
 */
export const codepenTransformer: Transformer = {
  pattern: /(?:https?:\/\/)?(?:www\.)?codepen\.io\/([^/]+)\/(?:pen|full)\/([a-zA-Z0-9]+)/i,
  transform: (url, matches) => {
    const username = matches[1];
    const penId = matches[2];
    const isFull = url.includes("/full/");
    
    // Default to the pen view unless full is explicitly requested
    const defaultTab = isFull ? "result" : "result,js,css,html";
    
    return {
      src: `https://codepen.io/${username}/embed/${penId}?default-tab=${defaultTab}&theme-id=light`,
      width: 800,
      height: 500,
      frameborder: 0,
      allowfullscreen: true,
      loading: "lazy",
    };
  },
}; 