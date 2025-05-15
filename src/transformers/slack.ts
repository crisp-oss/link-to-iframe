import { Transformer, IframeAttributes } from "../types";

/**
 * Transformer for Slack messages and channels
 * Supports formats:
 * - WORKSPACE.slack.com/archives/CHANNEL/TIMESTAMP
 */
export const slackTransformer: Transformer = {
  key: "slack",
  name: "Slack",
  pattern: /(?:https?:\/\/)?([a-zA-Z0-9_-]+)\.slack\.com\/archives\/([a-zA-Z0-9_-]+)(?:\/([0-9.]+))?(?:\?.*)?$/i,
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes => {
    const workspace = matches[1];
    const channel = matches[2];
    const timestamp = matches[3] || "";
    
    // Build the embed URL
    let embedUrl = `https://${workspace}.slack.com/archives/${channel}`;
    if (timestamp) {
      embedUrl += `/${timestamp}`;
    }
    embedUrl += "?embedded=true";
    
    return {
      src: embedUrl,
      width: 800,
      height: 600,
      frameborder: 0,
      allowfullscreen: true,
    };
  },
}; 