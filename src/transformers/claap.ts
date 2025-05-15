import { Transformer, IframeAttributes } from "../types";

/**
 * Transformer for Claap videos
 * Supports formats:
 * - claap.io/r/VIDEO_ID
 * - app.claap.io/r/VIDEO_ID
 */
export const claapTransformer: Transformer = {
  key: "claap",
  name: "Claap",
  pattern: /(?:https?:\/\/)?(?:www\.|app\.)?claap\.io\/r\/([a-zA-Z0-9_-]+)(?:\?.*)?$/i,
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes => {
    const videoId = matches[1];
    
    return {
      src: `https://app.claap.io/embed/r/${videoId}`,
      width: 800,
      height: 600,
      frameborder: 0,
      allowfullscreen: true,
      allow: "fullscreen; picture-in-picture",
    };
  },
}; 