import { Transformer, IframeAttributes } from "../types";

/**
 * Transformer for Lucid app documents
 * Supports formats:
 * - lucid.app/documents/embedded/DOCUMENT_ID
 * - lucid.app/documents/view/DOCUMENT_ID
 * - lucid.app/embeds/link?document=DOCUMENT_ID&clientId=CLIENT_ID
 */
export const lucidAppTransformer: Transformer = {
  key: "lucidapp",
  name: "Lucid App",
  patterns: [
    // Embedded document pattern
    /(?:https?:\/\/)?(?:www\.)?lucid\.app\/documents\/embedded\/([a-zA-Z0-9-]+)(?:\/.*)?(?:\?.*)?$/i,
    // Viewable document pattern
    /(?:https?:\/\/)?(?:www\.)?lucid\.app\/documents\/view\/([a-zA-Z0-9-]+)(?:\/.*)?(?:\?.*)?$/i,
    // Embed link pattern with clientId parameter
    /(?:https?:\/\/)?(?:www\.)?lucid\.app\/embeds\/link\?document=([a-zA-Z0-9-]+)(?:&clientId=([a-zA-Z0-9]+))?(?:&.*)?$/i,
  ],
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes => {
    const documentId = matches[1];
    let src = `https://lucid.app/embeds/link?document=${documentId}`;
    
    // Check if this is the embed link format with a clientId parameter
    if (url.includes("/embeds/link") && matches[2]) {
      const clientId = matches[2];
      src = `https://lucid.app/embeds/link?document=${documentId}&clientId=${clientId}`;
    }
    
    return {
      src,
      width: "100%",
      height: "480px",
      frameborder: 0,
      allowfullscreen: true,
      style: "border: 0",
    };
  },
}; 