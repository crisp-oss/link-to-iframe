import { Transformer, IframeAttributes } from "../types";

/**
 * Transformer for Lucidspark whiteboards
 * Supports formats:
 * - lucid.app/lucidspark/BOARD_ID
 * - lucidspark.com/documents/view/BOARD_ID
 */
export const lucidsparkTransformer: Transformer = {
  patterns: [
    // Lucid app pattern
    /(?:https?:\/\/)?(?:www\.)?lucid\.app\/lucidspark\/([a-zA-Z0-9-]+)(?:\/.*)?(?:\?.*)?$/i,
    // Lucidspark.com pattern
    /(?:https?:\/\/)?(?:www\.)?lucidspark\.com\/documents\/view\/([a-zA-Z0-9-]+)(?:\/.*)?(?:\?.*)?$/i,
  ],
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes => {
    const boardId = matches[1];
    
    return {
      src: `https://lucid.app/embeddedboard/${boardId}/0/0`,
      width: 800,
      height: 600,
      frameborder: 0,
      allowfullscreen: true,
    };
  },
}; 