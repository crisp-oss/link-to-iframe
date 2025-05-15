import { IframeAttributes, LinkToFrameOptions, Transformer } from "./types";
import { defaultTransformers } from "./transformers";

/**
 * Convert a URL to an iframe HTML string
 * 
 * @param url URL to convert to an iframe
 * @param options Configuration options
 * @returns HTML iframe string or null if no transformer matches
 */
export function linkToFrame(url: string, options: LinkToFrameOptions = {}): string | null {
  const { defaultAttributes = {}, additionalTransformers = [] } = options;
  
  // Combine default transformers with any additional transformers
  const transformers = [...defaultTransformers, ...additionalTransformers];
  
  // Try each transformer
  for (const transformer of transformers) {
    const match = transformer.pattern.exec(url);
    if (match) {
      const attributes = transformer.transform(url, match);
      
      if (attributes) {
        // Merge transformer-specific attributes with default attributes
        // Default attributes take precedence
        return renderIframe({ ...attributes, ...defaultAttributes });
      }
    }
  }
  
  // No transformer matched the URL
  return null;
}

/**
 * Render an iframe HTML string from attributes
 * 
 * @param attributes Iframe attributes
 * @returns HTML iframe string
 */
function renderIframe(attributes: IframeAttributes): string {
  const attributesString = Object.entries(attributes)
    .map(([key, value]) => {
      // Handle boolean attributes (like allowfullscreen)
      if (typeof value === "boolean") {
        return value ? key : "";
      }
      
      return value !== undefined ? `${key}="${value}"` : "";
    })
    .filter(Boolean)
    .join(" ");
  
  return `<iframe ${attributesString}></iframe>`;
}

export { Transformer, IframeAttributes, LinkToFrameOptions };
export * from "./transformers"; 