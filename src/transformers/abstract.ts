import { IframeAttributes, Transformer } from "../types";

/**
 * Transformer for Abstract URLs
 * Handles formats:
 * - https://share.abstract.com/[SHARE_ID]
 * - https://app.abstract.com/share/[SHARE_ID]
 */
export const abstractTransformer: Transformer = {
  pattern: /https?:\/\/(?:share|app)\.abstract\.com\/(?:share\/)?([a-zA-Z0-9-]+)/i,
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes | null => {
    const shareId = matches[1];
    
    if (!shareId) {
      return null;
    }
    
    return {
      src: `https://app.abstract.com/embed/share/${shareId}`,
      width: 800,
      height: 600,
      frameborder: 0,
      allowfullscreen: true,
    };
  },
}; 