import { Transformer, IframeAttributes } from "../types";

/**
 * Transformer for GitHub repositories and files
 * Supports formats:
 * - github.com/USERNAME/REPOSITORY
 * - github.com/USERNAME/REPOSITORY/blob/BRANCH/PATH/TO/FILE
 */
export const githubTransformer: Transformer = {
  pattern: /(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9_-]+)\/([a-zA-Z0-9_-]+)(?:\/blob\/([a-zA-Z0-9_.-]+)\/(.+))?/i,
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes => {
    const username = matches[1];
    const repository = matches[2];
    
    // Check if it's a file or repository
    if (url.includes("/blob/")) {
      const branch = matches[3];
      const filePath = matches[4];
      
      // File view
      return {
        src: `https://github.com/${username}/${repository}/blob/${branch}/${filePath}`,
        width: 800,
        height: 600,
        frameborder: 0,
        allowfullscreen: true,
      };
    } else {
      // Repository view
      return {
        src: `https://github.com/${username}/${repository}`,
        width: 800,
        height: 600,
        frameborder: 0,
        allowfullscreen: true,
      };
    }
  },
}; 