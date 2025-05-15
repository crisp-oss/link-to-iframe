import { IframeAttributes, Transformer } from "../types";

/**
 * Transformer for Dailymotion URLs
 * Handles formats:
 * - https://www.dailymotion.com/video/VIDEO_ID
 * - https://dai.ly/VIDEO_ID
 */
export const dailymotionTransformer: Transformer = {
  key: "dailymotion",
  name: "Dailymotion",
  patterns: [
    // www.dailymotion.com/video/
    /https?:\/\/(?:www\.)?dailymotion\.com\/video\/([a-zA-Z0-9]+)(?:\?.*)?/i,
    
    // dai.ly/ short URL
    /https?:\/\/dai\.ly\/([a-zA-Z0-9]+)(?:\?.*)?/i,
  ],
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes | null => {
    const videoId = matches[1];
    
    if (!videoId) {
      return null;
    }
    
    return {
      src: `https://www.dailymotion.com/embed/video/${videoId}`,
      width: 560,
      height: 315,
      frameborder: 0,
      allowfullscreen: true,
      allow: "autoplay; fullscreen",
    };
  },
}; 