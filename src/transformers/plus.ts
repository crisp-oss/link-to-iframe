import { Transformer, IframeAttributes } from "../types";

/**
 * Transformer for Plus whiteboard and docs
 * Supports formats:
 * - plus.app.co/TEAM/whiteboard/WHITEBOARD_ID
 * - plus.app.co/TEAM/docs/DOC_ID
 */
export const plusTransformer: Transformer = {
  key: "plus",
  name: "Plus",
  pattern: /(?:https?:\/\/)?(?:www\.)?plus\.app\.co\/([a-zA-Z0-9_-]+)\/(?:whiteboard|docs)\/([a-zA-Z0-9_-]+)(?:\/.*)?(?:\?.*)?$/i,
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes => {
    const team = matches[1];
    const id = matches[2];
    const type = url.includes("/whiteboard/") ? "whiteboard" : "docs";
    
    return {
      src: `https://plus.app.co/embed/${team}/${type}/${id}`,
      width: 800,
      height: 600,
      frameborder: 0,
      allowfullscreen: true,
    };
  },
}; 