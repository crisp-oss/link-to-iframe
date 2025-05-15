import { IframeAttributes, Transformer } from "../types";

/**
 * Transformer for Wikipedia URLs
 * Handles formats:
 * - en.wikipedia.org/wiki/ARTICLE_NAME
 * - en.m.wikipedia.org/wiki/ARTICLE_NAME
 * - wikipedia.org/wiki/ARTICLE_NAME
 * - And other language variants (de.wikipedia.org, fr.wikipedia.org, etc.)
 */
export const wikipediaTransformer: Transformer = {
  key: "wikipedia",
  name: "Wikipedia",
  pattern: /https?:\/\/(?:(?:([a-z]+)\.)?(?:m\.)?wikipedia\.org\/wiki\/([^#?]+)(?:\?.*)?(?:#.*)?)/i,
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes | null => {
    const lang = matches[1] || "en";  // Default to English if no language code
    const articleName = matches[2];
    
    if (!articleName) {
      return null;
    }
    
    // Create a Wikipedia embed iframe - uses a custom embed with iframe page
    return {
      src: `https://${lang}.wikipedia.org/wiki/${articleName}?printable=yes`,
      width: 800,
      height: 600,
      frameborder: 0,
      allowfullscreen: true,
      loading: "lazy",
      style: "border: 1px solid #ccc;",
    };
  },
}; 