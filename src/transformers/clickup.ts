import { Transformer, IframeAttributes } from "../types";

/**
 * Transformer for ClickUp tasks and documents
 * Supports formats:
 * - app.clickup.com/t/TASK_ID
 * - app.clickup.com/d/DOC_ID
 * - app.clickup.com/v/vi/DASHBOARD_ID
 */
export const clickupTransformer: Transformer = {
  patterns: [
    // Task pattern
    /(?:https?:\/\/)?(?:www\.)?app\.clickup\.com\/t\/([a-zA-Z0-9]+)(?:\?.*)?$/i,
    // Doc pattern
    /(?:https?:\/\/)?(?:www\.)?app\.clickup\.com\/d\/([a-zA-Z0-9]+)(?:\?.*)?$/i,
    // Dashboard pattern
    /(?:https?:\/\/)?(?:www\.)?app\.clickup\.com\/v\/vi\/([a-zA-Z0-9]+)(?:\?.*)?$/i,
  ],
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes => {
    const id = matches[1];
    let type = "t";
    
    if (url.includes("/d/")) {
      type = "d";
    } else if (url.includes("/v/vi/")) {
      type = "vi";
    }
    
    return {
      src: `https://app.clickup.com/embed/${type}/${id}`,
      width: 800,
      height: 600,
      frameborder: 0,
      allowfullscreen: true,
    };
  },
}; 