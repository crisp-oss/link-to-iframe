import { Transformer, IframeAttributes } from "../types";

/**
 * Transformer for Guideflow interactive product demos
 * Supports formats:
 * - app.guideflow.com/player/DEMO_ID
 * - app.guideflow.com/embed/DEMO_ID
 */
export const guideflowTransformer: Transformer = {
  key: "guideflow",
  name: "Guideflow",
  patterns: [
    // Player link pattern
    /(?:https?:\/\/)?(?:www\.)?app\.guideflow\.com\/player\/([a-zA-Z0-9_-]+)(?:\?.*)?$/i,
    // Embed link pattern
    /(?:https?:\/\/)?(?:www\.)?app\.guideflow\.com\/embed\/([a-zA-Z0-9_-]+)(?:\?.*)?$/i,
  ],
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes => {
    const demoId = matches[1];
    
    // Construct the embed URL
    let src = `https://app.guideflow.com/embed/${demoId}`;
    
    // Preserve query parameters
    const queryIndex = url.indexOf("?");
    if (queryIndex !== -1) {
      src += url.substring(queryIndex);
    }
    
    return {
      src,
      width: "100%",
      height: "0",
      style: "left: 0; width: 100%; height: 100%; position: absolute; border: 0; padding-bottom: 51.0547%; padding-top: 50px;",
      allowfullscreen: true,
    };
  },
}; 