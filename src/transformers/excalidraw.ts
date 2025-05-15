import { Transformer, IframeAttributes } from "../types";

/**
 * Transformer for Excalidraw drawings
 * Supports formats:
 * - excalidraw.com/#DRAWING_ID
 */
export const excalidrawTransformer: Transformer = {
  pattern: /(?:https?:\/\/)?(?:www\.)?excalidraw\.com\/#([a-zA-Z0-9_-]+)(?:\?.*)?$/i,
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes => {
    const drawingId = matches[1];
    
    return {
      src: `https://excalidraw.com/#${drawingId}`,
      width: 800,
      height: 600,
      frameborder: 0,
      allowfullscreen: true,
    };
  },
}; 