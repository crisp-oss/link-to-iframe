import { Transformer, IframeAttributes } from "../types";

/**
 * Transformer for Calendly scheduling links
 * Supports formats:
 * - calendly.com/USERNAME/EVENT_TYPE
 */
export const calendlyTransformer: Transformer = {
  pattern: /(?:https?:\/\/)?(?:www\.)?calendly\.com\/([a-zA-Z0-9_-]+)(?:\/([a-zA-Z0-9_-]+))?(?:\?.*)?$/i,
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes => {
    const username = matches[1];
    const eventType = matches[2] || "";
    
    // Base embed URL
    let src = `https://calendly.com/${username}`;
    
    // Add event type if present
    if (eventType) {
      src += `/${eventType}`;
    }
    
    // Preserve query parameters
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
      style: "border: 0; min-width: 320px; min-height: 630px;",
    };
  },
}; 