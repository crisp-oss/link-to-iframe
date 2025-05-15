import { Transformer, IframeAttributes } from "../types";

/**
 * Transformer for OneDrive files
 * Supports formats:
 * - 1drv.ms/u/SHARE_ID
 * - onedrive.live.com/?cid=FOLDER_ID&id=ITEM_ID
 */
export const onedriveTransformer: Transformer = {
  patterns: [
    // Short link pattern
    /(?:https?:\/\/)?(?:www\.)?1drv\.ms\/([uf])\/([a-zA-Z0-9!_-]+)(?:\?.*)?$/i,
    // Full link pattern
    /(?:https?:\/\/)?(?:www\.)?onedrive\.live\.com\/(?:.*cid=([a-zA-Z0-9]+)&id=([a-zA-Z0-9]+).*)$/i,
  ],
  
  transform: (url: string): IframeAttributes => {
    // OneDrive uses a special format for embedded content
    // Encode the entire URL as it is and pass to the embed endpoint
    const encodedUrl = encodeURIComponent(url);
    const embedUrl = `https://onedrive.live.com/embed?cid=${encodedUrl}`;
    
    return {
      src: embedUrl,
      width: 800,
      height: 600,
      frameborder: 0,
      allowfullscreen: true,
    };
  },
}; 