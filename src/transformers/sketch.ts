import { Transformer, IframeAttributes } from "../types";

/**
 * Transformer for Sketch documents
 * Supports formats:
 * - sketch.com/s/DOCUMENT_ID
 */
export const sketchTransformer: Transformer = {
  key: "sketch",
  name: "Sketch",
  pattern: /(?:https?:\/\/)?(?:www\.)?sketch\.com\/s\/([a-zA-Z0-9]+)(?:\/.*)?$/i,
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes => {
    const documentId = matches[1];
    
    return {
      src: `https://sketch.com/embed/s/${documentId}/`,
      width: 800,
      height: 600,
      frameborder: 0,
      allowfullscreen: true,
    };
  },
}; 