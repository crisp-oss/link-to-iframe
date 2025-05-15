import { Transformer, IframeAttributes } from "../types";

/**
 * Transformer for Sutori presentations
 * Supports formats:
 * - sutori.com/en/story/STORY_ID
 * - www.sutori.com/en/story/STORY_ID
 */
export const sutoriTransformer: Transformer = {
  pattern: /(?:https?:\/\/)?(?:www\.)?sutori\.com\/(?:en\/)?story\/([a-zA-Z0-9_-]+)(?:\?.*)?$/i,
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes | null => {
    const storyId = matches[1];
    
    // Create the embed URL
    let src = `https://www.sutori.com/en/story/${storyId}/embed`;
    
    // Preserve query parameters
    const queryIndex = url.indexOf("?");
    if (queryIndex !== -1) {
      src += url.substring(queryIndex);
    }
    
    // Note: The actual rendering of the script tags needs to be handled separately
    // in the index.ts renderIframe function, as they're not part of the iframe itself.
    // This current implementation will only handle the iframe part.
    
    return {
      src,
      width: "100%",
      height: "600",
      frameborder: "0",
      allowfullscreen: true,
      // Custom attribute for Sutori to indicate scripts are needed
      "data-sutori-scripts": "true",
    };
  },
}; 