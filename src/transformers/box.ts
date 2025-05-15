import { Transformer, IframeAttributes } from "../types";

/**
 * Transformer for Box files and folders
 * Supports formats:
 * - app.box.com/s/FILE_ID
 * - app.box.com/file/FILE_ID
 * - app.box.com/folder/FOLDER_ID
 */
export const boxTransformer: Transformer = {
  patterns: [
    // Shared link pattern
    /(?:https?:\/\/)?(?:www\.)?app\.box\.com\/s\/([a-zA-Z0-9]+)(?:\?.*)?$/i,
    // File pattern
    /(?:https?:\/\/)?(?:www\.)?app\.box\.com\/file\/([0-9]+)(?:\?.*)?$/i,
    // Folder pattern
    /(?:https?:\/\/)?(?:www\.)?app\.box\.com\/folder\/([0-9]+)(?:\?.*)?$/i,
  ],
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes => {
    // Check which pattern matched
    if (url.includes("/s/")) {
      // Shared link
      const sharedId = matches[1];
      return {
        src: `https://app.box.com/embed/s/${sharedId}`,
        width: 800,
        height: 600,
        frameborder: 0,
        allowfullscreen: true,
      };
    } else if (url.includes("/file/")) {
      // File
      const fileId = matches[1];
      return {
        src: `https://app.box.com/embed/file/${fileId}`,
        width: 800,
        height: 600,
        frameborder: 0,
        allowfullscreen: true,
      };
    } else {
      // Folder
      const folderId = matches[1];
      return {
        src: `https://app.box.com/embed/folder/${folderId}`,
        width: 800,
        height: 600,
        frameborder: 0,
        allowfullscreen: true,
      };
    }
  },
}; 