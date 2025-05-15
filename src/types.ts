export interface IframeAttributes {
  src: string;
  width?: string | number;
  height?: string | number;
  frameborder?: string | number;
  allow?: string;
  allowfullscreen?: boolean;
  [key: string]: string | number | boolean | undefined;
}

export interface Transformer {
  /** Regular expression that matches the URL pattern */
  pattern: RegExp;
  
  /** Function to transform a URL into iframe attributes */
  transform: (url: string, matches: RegExpExecArray) => IframeAttributes | null;
}

export interface LinkToFrameOptions {
  /** Default attributes to apply to all iframes */
  defaultAttributes?: Partial<IframeAttributes>;
  
  /** Additional transformers to use */
  additionalTransformers?: Transformer[];
} 