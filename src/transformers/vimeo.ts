import { Transformer } from "../types";

/**
 * Transformer for Vimeo URLs
 * Supports formats:
 * - vimeo.com/123456789
 * - vimeo.com/channels/staffpicks/123456789
 * - player.vimeo.com/video/123456789
 */
export const vimeoTransformer: Transformer = {
  key: "vimeo",
  name: "Vimeo",
  pattern: /(?:https?:\/\/)?(?:www\.|player\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^/]*)\/videos\/|video\/|)(\d+)(?:|\/\?)/i,
  transform: (url, matches) => {
    const videoId = matches[1];
    
    return {
      src: `https://player.vimeo.com/video/${videoId}`,
      width: 560,
      height: 315,
      frameborder: 0,
      allow: "autoplay; fullscreen; picture-in-picture",
      allowfullscreen: true,
    };
  },
}; 