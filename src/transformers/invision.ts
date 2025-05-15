import { IframeAttributes, Transformer } from "../types";

/**
 * Transformer for InVision URLs
 * Handles formats:
 * - https://projects.invisionapp.com/share/[PROJECT_ID]
 * - https://[workspace].invisionapp.com/prototype/[PROJECT_NAME]/[SCREEN_ID]
 */
export const invisionTransformer: Transformer = {
  key: "invision",
  name: "Invision",
  patterns: [
    // Projects share link
    /https?:\/\/projects\.invisionapp\.com\/share\/([A-Z0-9]+)/i,
    
    // Workspace prototype link
    /https?:\/\/([a-zA-Z0-9-]+)\.invisionapp\.com\/prototype\/([^/]+)\/([a-zA-Z0-9]+)/i,
  ],
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes | null => {
    let embedUrl = "";
    
    if (url.includes("projects.invisionapp.com/share/")) {
      const projectId = matches[1];
      embedUrl = `https://projects.invisionapp.com/embed/${projectId}`;
    } else {
      const workspace = matches[1];
      const projectName = matches[2];
      const screenId = matches[3];
      embedUrl = `https://${workspace}.invisionapp.com/embed/prototype/${projectName}/${screenId}`;
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