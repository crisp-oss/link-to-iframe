import { IframeAttributes, Transformer } from "../types";

/**
 * Transformer for Loom URLs
 * Handles format:
 * - https://www.loom.com/share/VIDEO_ID
 */
export const loomTransformer: Transformer = {
  pattern: /(?:https?:\/\/)?(?:www\.)?loom\.com\/share\/([a-zA-Z0-9]+)/i,
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes | null => {
    const videoId = matches[1];
    
    if (!videoId) {
      return null;
    }
    
    return {
      src: `https://www.loom.com/embed/${videoId}`,
      width: 560,
      height: 315,
      frameborder: 0,
      allowfullscreen: true,
    };
  },
}; 