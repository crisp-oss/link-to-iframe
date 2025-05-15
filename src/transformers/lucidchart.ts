import { Transformer, IframeAttributes } from "../types";

/**
 * Transformer for Lucidchart diagrams
 * Supports formats:
 * - lucid.app/lucidchart/DIAGRAM_ID
 * - lucidchart.com/documents/view/DIAGRAM_ID
 */
export const lucidchartTransformer: Transformer = {
  patterns: [
    // Lucid app pattern
    /(?:https?:\/\/)?(?:www\.)?lucid\.app\/lucidchart\/([a-zA-Z0-9-]+)(?:\/.*)?(?:\?.*)?$/i,
    // Lucidchart.com pattern
    /(?:https?:\/\/)?(?:www\.)?lucidchart\.com\/documents\/view\/([a-zA-Z0-9-]+)(?:\/.*)?(?:\?.*)?$/i,
  ],
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes => {
    const diagramId = matches[1];
    
    return {
      src: `https://lucid.app/embeddedchart/${diagramId}/0/0`,
      width: 800,
      height: 600,
      frameborder: 0,
      allowfullscreen: true,
    };
  },
};