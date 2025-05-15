import { IframeAttributes, Transformer } from "../types";

/**
 * Transformer for Canva URLs
 * Handles formats:
 * - canva.com/design/DESIGN_ID/view
 * - canva.com/design/DESIGN_ID/view/SLUG
 * - www.canva.com/design/DESIGN_ID/view
 */
export const canvaTransformer: Transformer = {
  patterns: [
    // Standard design URL format
    /https?:\/\/(?:www\.)?canva\.com\/design\/([A-Za-z0-9_-]+)(?:\/view)?(?:\/[^?]+)?(?:\?.*)?$/i,
  ],
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes | null => {
    const designId = matches[1];
    
    if (!designId) {
      return null;
    }
    
    // Create a Canva embed iframe
    return {
      src: "https://www.canva.com/design/" + designId + "/view?embed&meta",
      width: "100%",
      height: "100%",
      frameborder: 0,
      allowfullscreen: true,
      allow: "fullscreen",
      style: "position: absolute; top: 0; left: 0; width: 100%; height: 100%;",
    };
  },
}; 