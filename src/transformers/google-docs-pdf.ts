import { Transformer, IframeAttributes } from "../types";

/**
 * Transformer for Google Docs links
 * Supports formats:
 * - docs.google.com/document/d/DOC_ID/edit
 * - docs.google.com/spreadsheets/d/SHEET_ID/edit
 * - docs.google.com/presentation/d/PRESENTATION_ID/edit 
 * - docs.google.com/presentation/d/PRESENTATION_ID/edit?slide=id.SLIDE_ID
 * - docs.google.com/viewer?url=URL_TO_PDF&embedded=true
 */
export const googleDocsTransformer: Transformer = {
  key: "google-docs",
  name: "Google Docs",
  patterns: [
    // Pattern for Google Docs, Sheets, and Presentations
    /(?:https?:\/\/)?(?:www\.)?docs\.google\.com\/(?:(document|spreadsheets|presentation)\/d\/([a-zA-Z0-9_-]+)(?:\/.*)?(?:\?(?:.*&)?slide=(?:id\.)?([^&#]+))?)/i,
    
    // Pattern for Google Docs PDF viewer
    /(?:https?:\/\/)?(?:www\.)?docs\.google\.com\/viewer\?url=([^&]+)(?:&.*)?/i,
  ],
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes => {
    // Check if it's a viewer URL
    const isViewer = matches.input?.includes("viewer");
    
    // Handle Google Docs PDF viewer URLs
    if (isViewer) {
      const pdfUrl = decodeURIComponent(matches[1]);
      return {
        src: `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`,
        width: 800,
        height: 600,
        frameborder: 0,
        allowfullscreen: true,
      };
    }
    
    // Handle Google Docs/Sheets/Slides URLs
    const docType = matches[1]; // document, spreadsheets, or presentation
    const docId = matches[2];
    const slideId = matches[3]; // May be undefined
    
    // Build the source URL, adding slide parameter if present
    let src = `https://docs.google.com/${docType}/d/${docId}/preview`;
    if (docType === "presentation" && slideId) {
      src += `?slide=id.${slideId}`;
    }
    
    return {
      src,
      width: 800,
      height: 600,
      frameborder: 0,
      allowfullscreen: true,
    };
  },
}; 