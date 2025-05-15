import { Transformer, IframeAttributes } from "../types";

/**
 * Transformer for Monday.com boards
 * Supports formats:
 * - view.monday.com/BOARD_ID
 * - view.monday.com/embed/BOARD_ID
 */
export const mondayTransformer: Transformer = {
  patterns: [
    // Regular view pattern
    /(?:https?:\/\/)?(?:www\.)?view\.monday\.com\/([a-zA-Z0-9-]+)(?:\?.*)?$/i,
    // Embed pattern
    /(?:https?:\/\/)?(?:www\.)?view\.monday\.com\/embed\/([a-zA-Z0-9-]+)(?:\?.*)?$/i,
  ],
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes => {
    const boardId = matches[1];
    let src = `https://view.monday.com/embed/${boardId}`;
    
    // Preserve any query parameters
    const queryIndex = url.indexOf("?");
    if (queryIndex !== -1) {
      const queryParams = url.substring(queryIndex);
      src = `https://view.monday.com/embed/${boardId}${queryParams}`;
    }
    
    return {
      src,
      width: "100%",
      height: "650px",
      frameborder: 0,
      allowfullscreen: true,
      style: "border: 0; position: absolute; top: 0; left: 0; width: 100%; height: 100%",
    };
  },
}; 