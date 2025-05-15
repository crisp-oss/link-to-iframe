import { IframeAttributes, Transformer } from "../types";

/**
 * Transformer for Notion URLs
 * Handles formats:
 * - https://www.notion.so/workspace/Page-Name-ID
 * - https://notion.so/workspace/Page-Name-ID
 * - https://www.notion.site/workspace/Page-Name-ID
 */
export const notionTransformer: Transformer = {
  key: "notion",
  name: "Notion",
  patterns: [
    // notion.so with workspace and page ID
    /https?:\/\/(?:www\.)?notion\.so\/([a-zA-Z0-9-]+)\/(?:[^/]+)-([a-zA-Z0-9]+)(?:\?.*)?/i,
    
    // notion.so with just page ID (no workspace)
    /https?:\/\/(?:www\.)?notion\.so\/(?:[^/]+)-([a-zA-Z0-9]+)(?:\?.*)?/i,
    
    // notion.site domain
    /https?:\/\/(?:www\.)?([a-zA-Z0-9-]+)\.notion\.site\/(?:[^/]+)-([a-zA-Z0-9]+)(?:\?.*)?/i,
  ],
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes | null => {
    // Different URL patterns have page IDs in different positions
    let pageId;
    
    if (matches[0].includes(".notion.site")) {
      pageId = matches[2]; // For notion.site URLs
    } else if (matches[0].includes(".notion.so/") && matches.length > 2) {
      pageId = matches[2]; // For notion.so URLs with workspace
    } else {
      pageId = matches[1]; // For notion.so URLs without workspace
    }
    
    if (!pageId) {
      return null;
    }
    
    // Notion embeds work by appending ?embed=true to the original URL
    return {
      src: `${url.split("?")[0]}?embed=true`,
      width: 800,
      height: 600,
      frameborder: 0,
      allowfullscreen: true,
      allow: "fullscreen",
    };
  },
}; 