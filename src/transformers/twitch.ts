import { Transformer } from "../types";

/**
 * Transformer for Twitch URLs
 * Supports formats:
 * - twitch.tv/channel
 * - twitch.tv/videos/123456789
 * - twitch.tv/collections/abcdef
 * - clips.twitch.tv/Clip
 */
export const twitchTransformer: Transformer = {
  key: "twitch",
  name: "Twitch",
  pattern: /(?:https?:\/\/)?(?:www\.|clips\.)?twitch\.tv\/(?:(videos|collections)\/)?([a-zA-Z0-9_-]+)/i,
  transform: (url, matches) => {
    const type = matches[1] || "";
    const id = matches[2];
    let src = "";
    
    if (type === "videos") {
      src = `https://player.twitch.tv/?video=${id}&parent=${window.location.hostname}`;
    } else if (type === "collections") {
      src = `https://player.twitch.tv/?collection=${id}&parent=${window.location.hostname}`;
    } else if (url.includes("clips.twitch.tv") || url.includes("twitch.tv/clip")) {
      src = `https://clips.twitch.tv/embed?clip=${id}&parent=${window.location.hostname}`;
    } else {
      src = `https://player.twitch.tv/?channel=${id}&parent=${window.location.hostname}`;
    }
    
    return {
      src,
      width: 560,
      height: 315,
      frameborder: 0,
      allowfullscreen: true,
    };
  },
}; 