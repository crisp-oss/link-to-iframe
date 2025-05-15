import { Transformer, IframeAttributes } from "../types";

/**
 * Transformer for Whimsical diagrams
 * Supports formats:
 * - whimsical.com/DIAGRAM_ID
 * - whimsical.com/DIAGRAM_NAME-DIAGRAM_ID
 */
export const whimsicalTransformer: Transformer = {
  pattern: /(?:https?:\/\/)?(?:www\.)?whimsical\.com\/(?:([a-zA-Z0-9-]+)(?:-([a-zA-Z0-9]+))?)(?:\?.*)?$/i,
  
  transform: (url: string): IframeAttributes => {
    return {
      src: `${url.replace(/\?.*$/, "")}`,
      width: 800,
      height: 600,
      frameborder: 0,
      allowfullscreen: true,
    };
  },
}; 