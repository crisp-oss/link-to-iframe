import { Transformer } from "../types";
import { youtubeTransformer } from "./youtube";
import { loomTransformer } from "./loom";

// Export individual transformers
export { youtubeTransformer } from "./youtube";
export { loomTransformer } from "./loom";

// Default array of transformers
export const defaultTransformers: Transformer[] = [
  youtubeTransformer,
  loomTransformer,
]; 