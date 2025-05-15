import { IframeAttributes, Transformer } from "../types";

/**
 * Transformer for Amazon URLs
 * Handles formats:
 * - amazon.com/[path]/dp/ASIN
 * - amazon.com/gp/product/ASIN
 * - amazon.com/dp/ASIN
 * - a.co/d/ASIN
 */
export const amazonTransformer: Transformer = {
  key: "amazon",
  name: "Amazon",
  patterns: [
    // Standard product URL format
    /https?:\/\/(?:www\.)?amazon\.(?:com|co\.uk|de|fr|co\.jp|ca|in|es|it)\/(?:.+\/)?dp\/([A-Z0-9]{10})(?:\/|\?|$)/i,
    
    // Product page URL format
    /https?:\/\/(?:www\.)?amazon\.(?:com|co\.uk|de|fr|co\.jp|ca|in|es|it)\/gp\/product\/([A-Z0-9]{10})(?:\/|\?|$)/i,
    
    // Direct dp format
    /https?:\/\/(?:www\.)?amazon\.(?:com|co\.uk|de|fr|co\.jp|ca|in|es|it)\/dp\/([A-Z0-9]{10})(?:\/|\?|$)/i,
    
    // Short a.co links
    /https?:\/\/(?:www\.)?a\.co\/d\/([A-Z0-9]{10})(?:\/|\?|$)/i,
  ],
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes | null => {
    const asin = matches[1];
    
    if (!asin) {
      return null;
    }
    
    // Create an Amazon embed iframe
    return {
      src: `https://read.amazon.com/kp/card?preview=inline&linkCode=kpd&ref_=k4w_oembed&asin=${asin}&tag=kpembed-20`,
      width: "100%",
      height: "500px",
      frameborder: 0,
      allowfullscreen: true,
      style: "max-width: 600px;",
    };
  },
}; 