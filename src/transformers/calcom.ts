import { Transformer, IframeAttributes } from "../types";

/**
 * Transformer for Cal.com scheduling links
 * Supports formats:
 * - cal.com/USERNAME/EVENT_TYPE
 * - app.cal.com/USERNAME/EVENT_TYPE
 */
export const calcomTransformer: Transformer = {
  key: "calcom",
  name: "Cal.com",
  patterns: [
    // Cal.com main domain
    /(?:https?:\/\/)?(?:www\.)?cal\.com\/([a-zA-Z0-9_-]+)(?:\/([a-zA-Z0-9_-]+))?(?:\?.*)?$/i,
    // Cal.com app subdomain
    /(?:https?:\/\/)?(?:www\.)?app\.cal\.com\/([a-zA-Z0-9_-]+)(?:\/([a-zA-Z0-9_-]+))?(?:\?.*)?$/i,
  ],
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes => {
    const username = matches[1];
    const eventType = matches[2] || "";
    
    // Base embed URL - use app.cal.com for embedding
    let src = `https://app.cal.com/embed/${username}`;
    
    // Add event type if present
    if (eventType) {
      src += `/${eventType}`;
    }
    
    // Preserve query parameters but exclude any embed-specific params that might be added later
    const queryIndex = url.indexOf("?");
    if (queryIndex !== -1) {
      src += url.substring(queryIndex);
    }
    
    return {
      src,
      width: "100%", 
      height: "650px",
      frameborder: 0,
      scrolling: "no",
      style: "border: none; min-width: 320px; min-height: 630px; border-radius: 8px;",
      allow: "autoplay; camera; microphone; fullscreen; payment;",
    };
  },
}; 