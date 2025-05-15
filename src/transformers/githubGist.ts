import { Transformer } from "../types";

/**
 * Transformer for GitHub Gist URLs
 * Supports formats:
 * - gist.github.com/username/gistId
 */
export const githubGistTransformer: Transformer = {
  pattern: /(?:https?:\/\/)?(?:www\.)?gist\.github\.com\/([^/]+)\/([a-zA-Z0-9]+)/i,
  transform: (url, matches) => {
    const username = matches[1];
    const gistId = matches[2];
    
    return {
      src: `data:text/html;charset=utf-8,
      <head><base target="_blank"></head>
      <body>
        <script src="https://gist.github.com/${username}/${gistId}.js"></script>
        <style>
          * { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; }
          body { margin: 0; padding: 16px; }
          .gist .blob-wrapper { max-height: 350px; overflow: auto; }
        </style>
      </body>`,
      width: 680,
      height: 400,
      frameborder: 0,
    };
  },
}; 