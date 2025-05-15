import { Transformer, IframeAttributes } from "../types";

/**
 * Transformer for Eraser diagrams
 * Supports formats:
 * - app.eraser.io/workspace/WORKSPACE_ID
 */
export const eraserTransformer: Transformer = {
  pattern: /(?:https?:\/\/)?(?:www\.)?app\.eraser\.io\/workspace\/([a-zA-Z0-9_-]+)(?:\/.*)?(?:\?.*)?$/i,
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes => {
    const workspaceId = matches[1];
    
    return {
      src: `https://app.eraser.io/embed/${workspaceId}`,
      width: 800,
      height: 600,
      frameborder: 0,
      allowfullscreen: true,
    };
  },
}; 