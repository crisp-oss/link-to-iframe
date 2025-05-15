import { Transformer } from "../types";

/**
 * Transformer for Twitter/X URLs
 * Supports formats:
 * - twitter.com/username/status/123456789
 * - x.com/username/status/123456789
 */
export const twitterTransformer: Transformer = {
  pattern: /(?:https?:\/\/)?(?:www\.)?(?:twitter\.com|x\.com)\/([^/]+)\/status\/(\d+)/i,
  transform: (url, matches) => {
    const tweetId = matches[2];
    
    return {
      src: `https://platform.twitter.com/embed/Tweet.html?id=${tweetId}`,
      width: 550,
      height: 370,
      frameborder: 0,
    };
  },
}; 