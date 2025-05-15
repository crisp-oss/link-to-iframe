import { Transformer, IframeAttributes } from "../types";

/**
 * Transformer for Google Docs links and PDFs
 * Supports formats:
 * - docs.google.com/document/d/DOC_ID/edit
 * - docs.google.com/spreadsheets/d/SHEET_ID/edit
 * - docs.google.com/presentation/d/PRESENTATION_ID/edit 
 * - docs.google.com/presentation/d/PRESENTATION_ID/edit?slide=id.SLIDE_ID
 * - docs.google.com/viewer?url=URL_TO_PDF&embedded=true
 * - any direct URL ending with .pdf
 */
export const googleDocsTransformer: Transformer = {
  patterns: [
    // Pattern for Google Docs, Sheets, and Presentations
    /(?:https?:\/\/)?(?:www\.)?docs\.google\.com\/(?:(document|spreadsheets|presentation)\/d\/([a-zA-Z0-9_-]+)(?:\/.*)?(?:\?(?:.*&)?slide=(?:id\.)?([^&#]+))?)/i,
    
    // Pattern for Google Docs PDF viewer
    /(?:https?:\/\/)?(?:www\.)?docs\.google\.com\/viewer\?url=([^&]+)(?:&.*)?/i,
    
    // Pattern for any PDF URL
    /(?:https?:\/\/)?(?:[\w.-]+(?:\/[\w\d./-]*)?)\.pdf(?:\?.*)?$/i,
  ],
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes => {
    // Since we can't access 'this' in an arrow function in the expected way,
    // we'll use a different approach to determine which pattern matched
    const input = matches.input || "";
    const isPdf = input.match(/\.pdf/i);
    const isViewer = input.includes("viewer");
    
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
    
    // Handle direct PDF URLs
    if (isPdf) {
      return {
        src: `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`,
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