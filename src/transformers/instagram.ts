import { IframeAttributes, Transformer } from "../types";

/**
 * Transformer for Instagram URLs
 * Handles formats:
 * - instagram.com/p/CODE
 * - instagram.com/reel/CODE
 * - instagram.com/tv/CODE
 * - www.instagram.com/p/CODE
 * - www.instagram.com/reel/CODE
 * - www.instagram.com/tv/CODE
 */
export const instagramTransformer: Transformer = {
  patterns: [
    // Standard post format
    /https?:\/\/(?:www\.)?instagram\.com\/p\/([a-zA-Z0-9_-]+)(?:\/)?(?:\?.*)?$/i,
    
    // Reels format
    /https?:\/\/(?:www\.)?instagram\.com\/reel\/([a-zA-Z0-9_-]+)(?:\/)?(?:\?.*)?$/i,
    
    // IGTV format
    /https?:\/\/(?:www\.)?instagram\.com\/tv\/([a-zA-Z0-9_-]+)(?:\/)?(?:\?.*)?$/i,
  ],
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes | null => {
    const postId = matches[1];
    
    if (!postId) {
      return null;
    }
    
    // Create an Instagram embed iframe
    return {
      src: `https://www.instagram.com/p/${postId}/embed/`,
      width: 400,
      height: 480,
      frameborder: 0,
      scrolling: "no",
      allowtransparency: true,
      allowfullscreen: true,
    };
  },
}; 