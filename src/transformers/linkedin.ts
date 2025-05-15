import { Transformer, IframeAttributes } from "../types";

/**
 * Transformer for LinkedIn embedded content
 * Supports formats:
 * - linkedin.com/embed/feed/update/urn:li:activity:ACTIVITY_ID
 * - linkedin.com/posts/USER_HANDLE_POST_ID
 */
export const linkedinTransformer: Transformer = {
  key: "linkedin",
  name: "Linkedin",
  patterns: [
    // Embed feed update pattern
    /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/embed\/feed\/update\/urn:li:activity:([a-zA-Z0-9]+)(?:\?.*)?$/i,
    // Post pattern
    /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/posts\/([a-zA-Z0-9-]+)(?:[-/][a-zA-Z0-9-]+)*(?:\?.*)?$/i,
  ],
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes => {
    let src = url;
    const activityId = matches[1];
    
    // If it's not already an embed URL, convert it
    if (!url.includes("/embed/")) {
      // Extract post ID for conversion to embed URL
      // This is a simplified approach, in practice LinkedIn might require more parameters
      if (url.includes("/posts/")) {
        // For posts, we need to convert to an embed URL
        src = `https://www.linkedin.com/embed/feed/update/${activityId}`;
      }
    }
    
    // For embed URLs, ensure we preserve all parameters
    if (src.includes("/embed/")) {
      // Ensure compact parameter is set
      if (!src.includes("compact=")) {
        src = src + (src.includes("?") ? "&" : "?") + "compact=true";
      }
    }
    
    return {
      src,
      width: "100%",
      height: "0",
      frameborder: 0,
      allowfullscreen: true,
      scrolling: "no",
      allow: "encrypted-media;",
      style: "border: 0; width: 100%; height: 100%; position: absolute; top: 0; left: 0; padding-bottom: 56.25%;",
    };
  },
}; 