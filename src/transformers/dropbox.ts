import { Transformer, IframeAttributes } from "../types";

/**
 * Transformer for Dropbox files and folders
 * Supports formats:
 * - dropbox.com/s/FILE_ID/FILENAME
 * - dropbox.com/sh/FOLDER_ID/FOLDER_NAME
 */
export const dropboxTransformer: Transformer = {
  patterns: [
    // File pattern
    /(?:https?:\/\/)?(?:www\.)?dropbox\.com\/s\/([a-zA-Z0-9]+)\/([^?]+)(?:\?.*)?$/i,
    // Folder pattern
    /(?:https?:\/\/)?(?:www\.)?dropbox\.com\/sh\/([a-zA-Z0-9]+)\/([^?]+)(?:\?.*)?$/i,
  ],
  
  transform: (url: string): IframeAttributes => {
    // Convert any Dropbox link to embedded version
    const embedUrl = url.replace("www.dropbox.com", "www.dropbox.com/embed");
    
    return {
      src: embedUrl,
      width: 800,
      height: 600,
      frameborder: 0,
      allowfullscreen: true,
    };
  },
}; 