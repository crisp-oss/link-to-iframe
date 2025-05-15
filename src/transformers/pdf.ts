import { Transformer, IframeAttributes } from "../types";

/**
 * Transformer for PDF URLs
 * Uses Google Docs Viewer to render PDFs in iframes
 * Supports any direct URL ending with .pdf
 */
export const pdfTransformer: Transformer = {
  key: "pdf",
  name: "Pdf",
  pattern: /(?:https?:\/\/)?(?:[\w.-]+(?:\/[\w\d./-]*)?)\.pdf(?:\?.*)?$/i,
  priority: 100,
  
  transform: (url: string): IframeAttributes => {
    return {
      src: `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`,
      width: 800,
      height: 600,
      frameborder: 0,
      allowfullscreen: true,
    };
  },
}; 