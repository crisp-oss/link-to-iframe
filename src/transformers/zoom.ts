import { Transformer, IframeAttributes } from "../types";

/**
 * Transformer for Zoom recordings
 * Supports formats:
 * - zoom.us/rec/share/RECORDING_ID
 * - zoom.us/recording/detail?meeting_id=MEETING_ID
 */
export const zoomTransformer: Transformer = {
  patterns: [
    // Recording share pattern
    /(?:https?:\/\/)?(?:www\.)?zoom\.us\/rec\/share\/([a-zA-Z0-9_-]+)(?:\?.*)?$/i,
    // Recording detail pattern
    /(?:https?:\/\/)?(?:www\.)?zoom\.us\/recording\/detail\?meeting_id=([a-zA-Z0-9_-]+)(?:&.*)?$/i,
  ],
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes => {
    let recordingId;
    
    // Check which pattern matched
    if (url.includes("/rec/share/")) {
      recordingId = matches[1];
    } else {
      // For detail URLs, extract the meeting_id parameter
      recordingId = matches[1];
    }
    
    return {
      src: `https://zoom.us/rec/embed/${recordingId}`,
      width: 800,
      height: 600,
      frameborder: 0,
      allowfullscreen: true,
      allow: "microphone; camera; fullscreen",
    };
  },
}; 