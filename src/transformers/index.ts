import { Transformer } from "../types";
import { youtubeTransformer } from "./youtube";
import { loomTransformer } from "./loom";
import { asciinemaTransformer } from "./asciinema";
import { cleanshotTransformer } from "./cleanshot";
import { dailymotionTransformer } from "./dailymotion";
import { streamableTransformer } from "./streamable";
import { tiktokTransformer } from "./tiktok";
import { wistiaTransformer } from "./wistia";

// Export individual transformers
export { youtubeTransformer } from "./youtube";
export { loomTransformer } from "./loom";
export { asciinemaTransformer } from "./asciinema";
export { cleanshotTransformer } from "./cleanshot";
export { dailymotionTransformer } from "./dailymotion";
export { streamableTransformer } from "./streamable";
export { tiktokTransformer } from "./tiktok";
export { wistiaTransformer } from "./wistia";

// Default array of transformers
export const defaultTransformers: Transformer[] = [
  youtubeTransformer,
  loomTransformer,
  asciinemaTransformer,
  cleanshotTransformer,
  dailymotionTransformer,
  streamableTransformer,
  tiktokTransformer,
  wistiaTransformer,
]; 