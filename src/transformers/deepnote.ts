import { Transformer, IframeAttributes } from "../types";

/**
 * Transformer for Deepnote notebooks
 * Supports formats:
 * - deepnote.com/workspace/WORKSPACE-ID/PROJECT-NAME-PROJECT-ID
 */
export const deepnoteTransformer: Transformer = {
  pattern: /(?:https?:\/\/)?(?:www\.)?deepnote\.com\/workspace\/([a-zA-Z0-9-]+)\/([a-zA-Z0-9-]+)-([a-zA-Z0-9]+)(?:\/.*)?$/i,
  
  transform: (url: string): IframeAttributes => {
    return {
      src: `${url.replace(/\/edit.*$/, "")}/embed`,
      width: 800,
      height: 600,
      frameborder: 0,
      allowfullscreen: true,
    };
  },
}; 