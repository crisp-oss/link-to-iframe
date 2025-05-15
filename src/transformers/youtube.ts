import { IframeAttributes, Transformer } from "../types";

/**
 * Transformer for YouTube URLs
 * Handles formats:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://youtube.com/watch?v=VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 */
export const youtubeTransformer: Transformer = {
  pattern: /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i,
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes | null => {
    const videoId = matches[1];
    
    if (!videoId) {
      return null;
    }
    
    return {
      src: `https://www.youtube.com/embed/${videoId}`,
      width: 560,
      height: 315,
      allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
      allowfullscreen: true,
    };
  },
}; 