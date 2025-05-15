import { IframeAttributes, Transformer } from "../types";

/**
 * Transformer for Typeform URLs
 * Handles format:
 * - https://form.typeform.com/to/FORM_ID
 * - https://[WORKSPACE].typeform.com/to/FORM_ID
 */
export const typeformTransformer: Transformer = {
  patterns: [
    // form.typeform.com/to/
    /https?:\/\/form\.typeform\.com\/to\/([a-zA-Z0-9]+)/i,
    
    // [workspace].typeform.com/to/
    /https?:\/\/([a-zA-Z0-9-]+)\.typeform\.com\/to\/([a-zA-Z0-9]+)/i,
  ],
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes | null => {
    let formId;
    let workspace;
    
    if (matches[2]) {
      // It's a workspace URL
      workspace = matches[1];
      formId = matches[2];
    } else {
      // It's a form.typeform.com URL
      formId = matches[1];
    }
    
    if (!formId) {
      return null;
    }
    
    const embedSrc = workspace 
      ? `https://${workspace}.typeform.com/to/${formId}?typeform-embed=embed-widget`
      : `https://form.typeform.com/to/${formId}?typeform-embed=embed-widget`;
    
    return {
      src: embedSrc,
      width: 640,
      height: 500,
      frameborder: 0,
      allow: "camera; microphone; autoplay; encrypted-media; fullscreen; picture-in-picture;",
      allowfullscreen: true,
    };
  },
}; 