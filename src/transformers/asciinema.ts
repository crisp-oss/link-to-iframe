import { IframeAttributes, Transformer } from "../types";

/**
 * Transformer for Asciinema URLs
 * Handles format:
 * - https://asciinema.org/a/ID (numeric or alphanumeric)
 * - https://asciinema.org/a/ID?t=25&speed=2&theme=nord
 */
export const asciinemaTransformer: Transformer = {
  patterns: [
    // asciinema.org/a/ID with any query parameters
    /https?:\/\/asciinema\.org\/a\/([a-zA-Z0-9]+)(?:\?.*)?/i,
  ],
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes | null => {
    const id = matches[1];
    
    if (!id) {
      return null;
    }
    
    // Extract optional parameters from URL
    let theme = "asciinema";
    let speed = "1";
    let startTime = "0";
    
    const urlObj = new URL(url);
    if (urlObj.searchParams.has("theme")) {
      theme = urlObj.searchParams.get("theme") || theme;
    }
    if (urlObj.searchParams.has("speed")) {
      speed = urlObj.searchParams.get("speed") || speed;
    }
    if (urlObj.searchParams.has("t")) {
      startTime = urlObj.searchParams.get("t") || startTime;
    }
    
    return {
      src: `https://asciinema.org/a/${id}/iframe?size=normal&autoplay=false&loop=false&theme=${theme}&speed=${speed}&t=${startTime}&preload=true&cols=80&rows=24&i=true&idleTimeLimit=2`,
      width: "100%",
      height: 480,
      frameborder: 0,
      allowfullscreen: true,
      scrolling: "no",
      style: "overflow: hidden; margin: 0px; border: 0px; display: inline-block; float: none; visibility: visible;",
    };
  },
}; 