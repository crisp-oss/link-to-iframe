import { Transformer, IframeAttributes } from "../types";

/**
 * Transformer for Trello boards and cards
 * Supports formats:
 * - trello.com/b/BOARD_ID/BOARD_NAME
 * - trello.com/c/CARD_ID/CARD_NAME
 */
export const trelloTransformer: Transformer = {
  patterns: [
    // Board pattern
    /(?:https?:\/\/)?(?:www\.)?trello\.com\/b\/([a-zA-Z0-9]+)(?:\/([^/?]+))?(?:\?.*)?$/i,
    // Card pattern
    /(?:https?:\/\/)?(?:www\.)?trello\.com\/c\/([a-zA-Z0-9]+)(?:\/([^/?]+))?(?:\?.*)?$/i,
  ],
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes => {
    // Check which pattern matched
    if (url.includes("/b/")) {
      // Board view
      const boardId = matches[1];
      
      return {
        src: `https://trello.com/b/${boardId}/embed`,
        width: 800,
        height: 600,
        frameborder: 0,
        allowfullscreen: true,
      };
    } else {
      // Card view
      const cardId = matches[1];
      
      return {
        src: `https://trello.com/c/${cardId}/embed`,
        width: 800,
        height: 600,
        frameborder: 0,
        allowfullscreen: true,
      };
    }
  },
}; 