import { Transformer, IframeAttributes } from "../types";

/**
 * Transformer for Miro boards
 * Supports formats:
 * - miro.com/app/board/BOARD_ID/
 */
export const miroTransformer: Transformer = {
  pattern: /(?:https?:\/\/)?(?:www\.)?miro\.com\/app\/board\/([a-zA-Z0-9_-]+)\/?/i,
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes => {
    const boardId = matches[1];
    
    return {
      src: `https://miro.com/app/embed/${boardId}/`,
      width: 800,
      height: 600,
      frameborder: 0,
      allowfullscreen: true,
    };
  },
}; 