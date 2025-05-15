import { Transformer, IframeAttributes } from "../types";

/**
 * Transformer for Hex notebooks
 * Supports formats:
 * - app.hex.tech/UUID/app/APP_ID
 */
export const hexTransformer: Transformer = {
  key: "hex",
  name: "Hex",
  pattern: /(?:https?:\/\/)?(?:www\.)?app\.hex\.tech\/([a-zA-Z0-9-]+)\/app\/([a-zA-Z0-9-]+)(?:\?.*)?$/i,
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes => {
    const uuid = matches[1];
    const appId = matches[2];
    
    return {
      src: `https://app.hex.tech/embed/${uuid}/app/${appId}`,
      width: 800,
      height: 600,
      frameborder: 0,
      allowfullscreen: true,
    };
  },
}; 