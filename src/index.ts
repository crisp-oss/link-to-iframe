import { IframeAttributes, LinkToIframeOptions, Transformer, TransformerInfo } from "./types";
import { defaultTransformers } from "./transformers";

/**
 * Convert a URL to an iframe HTML string or attributes object
 * 
 * @param url URL to convert to an iframe
 * @param options Configuration options
 * @returns HTML iframe string, attributes object, or null if no transformer matches
 */
export function linkToIframe(url: string, options: LinkToIframeOptions = {}): string | IframeAttributes | null {
  const { defaultAttributes = {}, additionalTransformers = [], returnObject = false } = options;
  
  // Combine default transformers with any additional transformers
  const transformers = [...defaultTransformers, ...additionalTransformers];
  
  // Try each transformer
  for (const transformer of transformers) {
    // Check single pattern
    if (transformer.pattern) {
      const match = transformer.pattern.exec(url);
      if (match) {
        const attributes = transformer.transform(url, match);
        
        if (attributes) {
          // Merge transformer-specific attributes with default attributes
          // Default attributes take precedence
          const mergedAttributes = { ...attributes, ...defaultAttributes };
          
          // Return attributes object or rendered iframe based on options
          return returnObject ? mergedAttributes : renderIframe(mergedAttributes);
        }
      }
    }
    
    // Check multiple patterns if available
    if (transformer.patterns) {
      for (const pattern of transformer.patterns) {
        const match = pattern.exec(url);
        if (match) {
          const attributes = transformer.transform(url, match);
          
          if (attributes) {
            // Merge transformer-specific attributes with default attributes
            // Default attributes take precedence
            const mergedAttributes = { ...attributes, ...defaultAttributes };
            
            // Return attributes object or rendered iframe based on options
            return returnObject ? mergedAttributes : renderIframe(mergedAttributes);
          }
        }
      }
    }
  }
  
  // No transformer matched the URL
  return null;
}

/**
 * Get all available transformers with their key, name, and priority, sorted by priority (highest first)
 * 
 * @param options Configuration options
 * @returns Array of transformer info objects sorted by priority
 */
export function getAllTransformers(options: { includeAdditional?: Transformer[] } = {}): TransformerInfo[] {
  const { includeAdditional = [] } = options;
  
  // Combine default transformers with any additional transformers
  const allTransformers = [...defaultTransformers, ...includeAdditional];
  
  // Map transformers to TransformerInfo objects and sort by priority (higher values first)
  return allTransformers
    .map(transformer => ({
      key: transformer.key,
      name: transformer.name,
      priority: transformer.priority ?? 0
    }))
    .sort((a, b) => b.priority - a.priority);
}

/**
 * Render an iframe HTML string from attributes
 * 
 * @param attributes Iframe attributes
 * @returns HTML iframe string
 */
function renderIframe(attributes: IframeAttributes): string {
  // Create a copy to prevent modifying the original
  const processedAttributes = { ...attributes };
  
  const attributesString = Object.entries(processedAttributes)
    .map(([key, value]) => {
      // Handle boolean attributes (like allowfullscreen)
      if (typeof value === "boolean") {
        return value ? key : "";
      }
      
      return value !== undefined ? `${key}="${value}"` : "";
    })
    .filter(Boolean)
    .join(" ");
  
  const html = `<iframe ${attributesString}></iframe>`;
  
  return html;
}

export { Transformer, IframeAttributes, LinkToIframeOptions, TransformerInfo };
export * from "./transformers"; 