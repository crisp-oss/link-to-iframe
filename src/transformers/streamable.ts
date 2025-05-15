import { IframeAttributes, Transformer } from "../types";

/**
 * Transformer for Streamable URLs
 * Handles format:
 * - https://streamable.com/VIDEO_ID
 */
export const streamableTransformer: Transformer = {
  key: "streamable",
  name: "Streamable",
  patterns: [
    // streamable.com/ID
    /https?:\/\/(?:www\.)?streamable\.com\/([a-zA-Z0-9]+)(?:\?.*)?/i,
  ],
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes | null => {
    const videoId = matches[1];
    
    if (!videoId) {
      return null;
    }
    
    return {
      src: `https://streamable.com/o/${videoId}`,
      width: 560,
      height: 315,
      frameborder: 0,
      allowfullscreen: true,
      allow: "autoplay; fullscreen",
    };
  },
}; 