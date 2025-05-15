import { Transformer, IframeAttributes } from "../types";

/**
 * Transformer for Adobe XD prototypes
 * Supports formats:
 * - xd.adobe.com/view/DESIGN_ID
 * - xd.adobe.com/spec/SPEC_ID
 */
export const adobexdTransformer: Transformer = {
  key: "adobexd",
  name: "Adobe XD",
  patterns: [
    // Design view pattern
    /(?:https?:\/\/)?(?:www\.)?xd\.adobe\.com\/view\/([a-zA-Z0-9-]+)(?:\/.*)?(?:\?.*)?$/i,
    // Spec pattern
    /(?:https?:\/\/)?(?:www\.)?xd\.adobe\.com\/spec\/([a-zA-Z0-9-]+)(?:\/.*)?(?:\?.*)?$/i,
  ],
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes => {
    const id = matches[1];
    const type = url.includes("/view/") ? "view" : "spec";
    
    return {
      src: `https://xd.adobe.com/embed/${type}/${id}`,
      width: 800,
      height: 600,
      frameborder: 0,
      allowfullscreen: true,
    };
  },
}; 