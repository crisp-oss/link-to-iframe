import { IframeAttributes, Transformer } from "../types";

/**
 * Transformer for Framer URLs
 * Handles formats:
 * - https://framer.com/share/PROJECT_NAME--HASH
 * - https://framer.com/embed/PROJECT_NAME--HASH
 * - https://PROJECT_NAME.framer.app/
 */
export const framerTransformer: Transformer = {
  key: "framer",
  name: "Framer",
  patterns: [
    // framer.com/share or /embed
    /https?:\/\/framer\.com\/(?:share|embed)\/([^/]+)/i,
    
    // framer.app domain
    /https?:\/\/([^/]+)\.framer\.app/i,
  ],
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes | null => {
    let embedUrl = "";
    
    if (url.includes("framer.com")) {
      const projectId = matches[1];
      embedUrl = `https://framer.com/embed/${projectId}`;
    } else {
      const projectName = matches[1];
      embedUrl = `https://${projectName}.framer.app/embed`;
    }
    
    return {
      src: embedUrl,
      width: 800,
      height: 600,
      frameborder: 0,
      allowfullscreen: true,
    };
  },
}; 