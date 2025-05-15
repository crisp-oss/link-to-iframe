import { Transformer, IframeAttributes } from "../types";

/**
 * Transformer for Asana tasks and projects
 * Supports formats:
 * - app.asana.com/0/PROJECT_ID/TASK_ID
 * - app.asana.com/0/PROJECT_ID
 */
export const asanaTransformer: Transformer = {
  key: "asana",
  name: "Asana",
  pattern: /(?:https?:\/\/)?(?:www\.)?app\.asana\.com\/0\/([0-9]+)(?:\/([0-9]+))?(?:\?.*)?$/i,
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes => {
    const projectId = matches[1];
    const taskId = matches[2] || "";
    
    // Build the embed URL
    let embedUrl = `https://app.asana.com/embed/${projectId}`;
    if (taskId) {
      embedUrl += `/${taskId}`;
    }
    
    return {
      src: embedUrl,
      width: 800,
      height: 600,
      frameborder: 0,
      allowfullscreen: true,
    };
  },
}; 