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
  /** Unique key identifier for the transformer */
  key: string;
  
  /** Display name of the transformer */
  name: string;
  
  /** Priority of the transformer (higher values are processed first) */
  priority?: number;
  
  /** Regular expression that matches the URL pattern */
  pattern?: RegExp;
  
  /** Multiple regular expressions that match URL patterns */
  patterns?: RegExp[];
  
  /** Function to transform a URL into iframe attributes */
  transform: (url: string, matches: RegExpExecArray) => IframeAttributes | null;
}

export interface LinkToIframeOptions {
  /** Default attributes to apply to all iframes */
  defaultAttributes?: Partial<IframeAttributes>;
  
  /** Additional transformers to use */
  additionalTransformers?: Transformer[];

  /** Return the attributes object instead of HTML string */
  returnObject?: boolean;
}

export interface TransformerInfo {
  key: string;
  name: string;
  priority: number;
} 