import { Transformer, IframeAttributes } from "../types";

/**
 * Transformer for Google Drive links
 * Supports formats:
 * - drive.google.com/file/d/FILE_ID/view
 */
export const googleDriveTransformer: Transformer = {
  key: "google-drive",
  name: "Google Drive",
  patterns: [
    // Pattern for Google Drive files
    /(?:https?:\/\/)?(?:www\.)?drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)(?:\/.*)?/i,
  ],
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes => {
    const fileId = matches[1];
    return {
      src: `https://drive.google.com/file/d/${fileId}/preview`,
      width: 800,
      height: 600,
      frameborder: 0,
      allowfullscreen: true,
    };
  },
}; 