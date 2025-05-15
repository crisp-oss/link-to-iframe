import { Transformer, IframeAttributes } from "../types";

/**
 * Transformer for Replit
 * Supports formats:
 * - replit.com/@USERNAME/PROJECT_NAME
 */
export const replitTransformer: Transformer = {
  pattern: /(?:https?:\/\/)?(?:www\.)?replit\.com\/@([a-zA-Z0-9_-]+)\/([a-zA-Z0-9_-]+)(?:\?.*)?$/i,
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes => {
    const username = matches[1];
    const projectName = matches[2];
    
    return {
      src: `https://replit.com/@${username}/${projectName}?embed=true`,
      width: 800,
      height: 600,
      frameborder: 0,
      allowfullscreen: true,
    };
  },
}; 