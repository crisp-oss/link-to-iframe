import { Transformer, IframeAttributes } from "../types";

/**
 * Transformer for Pitch presentations
 * Supports formats:
 * - app.pitch.com/app/presentation/PRESENTATION_ID
 * - app.pitch.com/app/presentation/PRESENTATION_ID/SLIDE_ID
 */
export const pitchTransformer: Transformer = {
  pattern: /(?:https?:\/\/)?(?:www\.)?app\.pitch\.com\/app\/presentation\/([a-zA-Z0-9-]+)(?:\/([a-zA-Z0-9-]+))?(?:\?.*)?$/i,
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes => {
    const presentationId = matches[1];
    const slideId = matches[2] || "";
    
    // Build the embed URL
    let embedUrl = `https://app.pitch.com/app/embed/presentation/${presentationId}`;
    if (slideId) {
      embedUrl += `/${slideId}`;
    }
    
    return {
      src: embedUrl,
      width: 800,
      height: 600,
      frameborder: 0,
      allowfullscreen: true,
    };
  },
}; 