import { Transformer, IframeAttributes } from "../types";

/**
 * Transformer for Linear issues and projects
 * Supports formats:
 * - linear.app/TEAM/issue/ISSUE_ID/ISSUE_NAME
 * - linear.app/TEAM/project/PROJECT_ID/PROJECT_NAME
 */
export const linearTransformer: Transformer = {
  key: "linear",
  name: "Linear",
  patterns: [
    // Issue pattern
    /(?:https?:\/\/)?(?:www\.)?linear\.app\/([a-zA-Z0-9_-]+)\/issue\/([a-zA-Z0-9_-]+)(?:\/([^/?]+))?(?:\?.*)?$/i,
    // Project pattern
    /(?:https?:\/\/)?(?:www\.)?linear\.app\/([a-zA-Z0-9_-]+)\/project\/([a-zA-Z0-9_-]+)(?:\/([^/?]+))?(?:\?.*)?$/i,
  ],
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes => {
    const team = matches[1];
    const itemId = matches[2];
    const type = url.includes("/issue/") ? "issue" : "project";
    
    return {
      src: `https://linear.app/embed/${team}/${type}/${itemId}`,
      width: 800,
      height: 600,
      frameborder: 0,
      allowfullscreen: true,
    };
  },
}; 