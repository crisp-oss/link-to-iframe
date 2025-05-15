import { Transformer } from "../types";
import { youtubeTransformer } from "./youtube";
import { loomTransformer } from "./loom";
import { asciinemaTransformer } from "./asciinema";
import { cleanshotTransformer } from "./cleanshot";

// Export individual transformers
export { youtubeTransformer } from "./youtube";
export { loomTransformer } from "./loom";
export { asciinemaTransformer } from "./asciinema";
export { cleanshotTransformer } from "./cleanshot";

// Default array of transformers
export const defaultTransformers: Transformer[] = [
  youtubeTransformer,
  loomTransformer,
  asciinemaTransformer,
  cleanshotTransformer,
]; 