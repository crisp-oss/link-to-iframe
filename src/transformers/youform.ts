import { Transformer, IframeAttributes } from "../types";

/**
 * Transformer for Youform form builder
 * Supports formats:
 * - app.youform.com/forms/FORM_ID
 */
export const youformTransformer: Transformer = {
  key: "youform",
  name: "Youform",
  pattern: /(?:https?:\/\/)?(?:www\.)?app\.youform\.com\/forms\/([a-zA-Z0-9_-]+)(?:\?.*)?$/i,
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes => {
    const formId = matches[1];
    
    // Construct the embed URL
    let src = `https://app.youform.com/forms/${formId}`;
    
    // Preserve query parameters
    const queryIndex = url.indexOf("?");
    if (queryIndex !== -1) {
      src += url.substring(queryIndex);
    }
    
    return {
      src,
      width: "100%",
      height: "600px",
      style: "top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;",
      allowfullscreen: true,
    };
  },
}; 