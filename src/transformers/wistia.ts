import { IframeAttributes, Transformer } from "../types";

/**
 * Transformer for Wistia URLs
 * Handles formats:
 * - https://company-name.wistia.com/medias/VIDEO_ID
 * - https://fast.wistia.net/embed/iframe/VIDEO_ID
 * - https://wistia.com/medias/VIDEO_ID
 */
export const wistiaTransformer: Transformer = {
  key: "wistia",
  name: "Wistia",
  patterns: [
    // company-name.wistia.com/medias/ID
    /https?:\/\/(.+?)\.wistia\.com\/medias\/([a-zA-Z0-9]+)(?:\?.*)?/i,
    
    // fast.wistia.net/embed/iframe/ID
    /https?:\/\/fast\.wistia\.net\/embed\/iframe\/([a-zA-Z0-9]+)(?:\?.*)?/i,
    
    // wistia.com/medias/ID
    /https?:\/\/wistia\.com\/medias\/([a-zA-Z0-9]+)(?:\?.*)?/i,
  ],
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes | null => {
    // The video ID could be in position 1 or 2, depending on which pattern matched
    // For the first pattern, it's in position 2; for the others, it's in position 1
    const videoId = matches.length > 2 ? matches[2] : matches[1];
    
    if (!videoId) {
      return null;
    }
    
    return {
      src: `https://fast.wistia.net/embed/iframe/${videoId}`,
      width: 640,
      height: 360,
      frameborder: 0,
      allowfullscreen: true,
      allow: "autoplay; fullscreen",
    };
  },
}; 