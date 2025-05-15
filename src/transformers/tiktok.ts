import { IframeAttributes, Transformer } from "../types";

/**
 * Transformer for TikTok URLs
 * Handles formats:
 * - https://www.tiktok.com/@username/video/VIDEO_ID
 * - https://vm.tiktok.com/SHORTCODE/
 * - https://m.tiktok.com/v/VIDEO_ID.html
 */
export const tiktokTransformer: Transformer = {
  patterns: [
    // Standard format: tiktok.com/@username/video/ID
    /https?:\/\/(?:www\.)?tiktok\.com\/@[^/]+\/video\/(\d+)(?:\?.*)?/i,
    
    // Mobile format: m.tiktok.com/v/ID.html
    /https?:\/\/m\.tiktok\.com\/v\/(\d+)(?:\.html)?(?:\?.*)?/i,
    
    // Short URL format: vm.tiktok.com/SHORTCODE/
    /https?:\/\/(?:vm|vt)\.tiktok\.com\/([a-zA-Z0-9]+)(?:\?.*)?/i,
  ],
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes | null => {
    const videoId = matches[1];
    
    if (!videoId) {
      return null;
    }
    
    // For short URLs (vm.tiktok.com), we'd need to follow redirects to get the actual video ID
    // Since we can't do that here, we'll only handle direct video IDs properly
    
    // Use TikTok's iframe embed format
    return {
      src: /^\d+$/.test(videoId) 
        ? `https://www.tiktok.com/embed/v2/${videoId}` 
        : `https://www.tiktok.com/embed/v2/${url}`, // For short URLs, pass the full URL
      width: 325,
      height: 580,
      frameborder: 0,
      allowfullscreen: true,
      scrolling: "no",
      allow: "encrypted-media;",
    };
  },
}; 