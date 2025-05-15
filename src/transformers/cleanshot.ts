import { IframeAttributes, Transformer } from "../types";

/**
 * Transformer for Cleanshot URLs
 * Handles format:
 * - https://cln.sh/ID (alphanumeric ID)
 */
export const cleanshotTransformer: Transformer = {
  patterns: [
    // cln.sh/ID format
    /https?:\/\/cln\.sh\/([a-zA-Z0-9]+)(?:\?.*)?/i,
  ],
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes | null => {
    const id = matches[1];
    
    if (!id) {
      return null;
    }
    
    return {
      src: `https://cln.sh/${id}/embed`,
      width: "100%",
      height: 600,
      frameborder: 0,
      allowfullscreen: true,
      allow: "clipboard-write",
      style: "overflow: hidden; margin: 0px; border: 0px; display: inline-block; float: none; visibility: visible;",
    };
  },
}; 