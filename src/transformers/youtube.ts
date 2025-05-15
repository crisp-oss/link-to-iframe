import { IframeAttributes, Transformer } from "../types";

/**
 * Transformer for YouTube URLs
 * Handles formats:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://youtube.com/watch?v=VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://m.youtube.com/watch?v=VIDEO_ID
 * - https://gaming.youtube.com/watch?v=VIDEO_ID
 * - https://music.youtube.com/watch?v=VIDEO_ID
 * - https://www.youtube.com/shorts/VIDEO_ID
 */
export const youtubeTransformer: Transformer = {
  key: "youtube",
  name: "YouTube",
  priority: 10,
  patterns: [
    // www.youtube.com/watch?v=
    /https?:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/i,
    
    // m.youtube.com/watch?v=
    /https?:\/\/m\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/i,
    
    // youtu.be/
    /https?:\/\/youtu\.be\/([a-zA-Z0-9_-]{11})/i,
    
    // www.youtube.com/embed/
    /https?:\/\/www\.youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/i,
    
    // youtube.com/embed/
    /https?:\/\/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/i,
    
    // gaming.youtube.com/watch?v=
    /https?:\/\/gaming\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/i,
    
    // music.youtube.com/watch?v=
    /https?:\/\/music\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/i,
    
    // www.youtube.com/shorts/
    /https?:\/\/www\.youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/i,
  ],
  
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