import { Transformer, IframeAttributes } from "../types";

/**
 * Transformer for GitLab snippets and repositories
 * Supports formats:
 * - gitlab.com/USERNAME/REPO
 * - gitlab.com/USERNAME/REPO/-/blob/BRANCH/PATH/TO/FILE
 * - gitlab.com/snippets/SNIPPET_ID
 */
export const gitlabTransformer: Transformer = {
  patterns: [
    // Repository or file pattern
    /(?:https?:\/\/)?(?:www\.)?gitlab\.com\/([a-zA-Z0-9_.-]+)\/([a-zA-Z0-9_.-]+)(?:\/-\/blob\/([a-zA-Z0-9_.-]+)\/(.+))?/i,
    // Snippet pattern
    /(?:https?:\/\/)?(?:www\.)?gitlab\.com\/snippets\/([a-zA-Z0-9]+)(?:\/.*)?$/i,
  ],
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes => {
    // Check which pattern matched based on the URL
    if (url.includes("/snippets/")) {
      // Handle GitLab snippet
      const snippetId = matches[1];
      return {
        src: `https://gitlab.com/snippets/${snippetId}/embed`,
        width: 800,
        height: 600,
        frameborder: 0,
        allowfullscreen: true,
      };
    } else if (url.includes("/-/blob/")) {
      // Handle GitLab file
      const username = matches[1];
      const repo = matches[2];
      const branch = matches[3];
      const filePath = matches[4];
      
      return {
        src: `https://gitlab.com/${username}/${repo}/-/blob/${branch}/${filePath}?embed=true`,
        width: 800,
        height: 600,
        frameborder: 0,
        allowfullscreen: true,
      };
    } else {
      // Handle GitLab repository
      const username = matches[1];
      const repo = matches[2];
      
      return {
        src: `https://gitlab.com/${username}/${repo}`,
        width: 800,
        height: 600,
        frameborder: 0,
        allowfullscreen: true,
      };
    }
  },
}; 