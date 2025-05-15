import { IframeAttributes, Transformer } from "../types";

/**
 * Transformer for Airtable URLs
 * Handles formats:
 * - airtable.com/app[ID]/[tableID]
 * - airtable.com/embed/app[ID]/[tableID]
 * - airtable.com/shr[ID] (shared view links)
 * - airtable.com/embed/shr[ID] (embed links)
 */
export const airtableTransformer: Transformer = {
  patterns: [
    // Standard shared view format
    /https?:\/\/(?:www\.)?airtable\.com\/(?:embed\/)?(shr[a-zA-Z0-9]+)(?:\?.*)?$/i,
    
    // App and table ID format
    /https?:\/\/(?:www\.)?airtable\.com\/(?:embed\/)?(app[a-zA-Z0-9]+)\/([a-zA-Z0-9]+)(?:\?.*)?$/i,
  ],
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes | null => {
    // Handle shared view links (shr format)
    if (matches[1]?.startsWith("shr")) {
      const viewId = matches[1];
      if (!viewId) return null;
      
      return {
        src: `https://airtable.com/embed/${viewId}`,
        width: "100%",
        height: 533,
        frameborder: 0,
        allowfullscreen: true,
        style: "background: transparent; border: 1px solid #ccc;",
      };
    } 
    // Handle app/table format
    else if (matches[1]?.startsWith("app")) {
      const appId = matches[1];
      const tableId = matches[2];
      if (!appId || !tableId) return null;
      
      return {
        src: `https://airtable.com/embed/${appId}/${tableId}`,
        width: "100%",
        height: 533,
        frameborder: 0,
        allowfullscreen: true,
        style: "background: transparent; border: 1px solid #ccc;",
      };
    }
    
    return null;
  },
}; 