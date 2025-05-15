import { Transformer } from "../types";
import { youtubeTransformer } from "./youtube";
import { loomTransformer } from "./loom";
import { asciinemaTransformer } from "./asciinema";
import { cleanshotTransformer } from "./cleanshot";
import { dailymotionTransformer } from "./dailymotion";
import { streamableTransformer } from "./streamable";
import { tiktokTransformer } from "./tiktok";
import { wistiaTransformer } from "./wistia";
import { vimeoTransformer } from "./vimeo";
import { twitchTransformer } from "./twitch";
import { twitterTransformer } from "./twitter";
import { figmaTransformer } from "./figma";
import { googleMapsTransformer } from "./googleMaps";
import { codepenTransformer } from "./codepen";

// Export individual transformers
export { youtubeTransformer } from "./youtube";
export { loomTransformer } from "./loom";
export { asciinemaTransformer } from "./asciinema";
export { cleanshotTransformer } from "./cleanshot";
export { dailymotionTransformer } from "./dailymotion";
export { streamableTransformer } from "./streamable";
export { tiktokTransformer } from "./tiktok";
export { wistiaTransformer } from "./wistia";
export { vimeoTransformer } from "./vimeo";
export { twitchTransformer } from "./twitch";
export { twitterTransformer } from "./twitter";
export { figmaTransformer } from "./figma";
export { googleMapsTransformer } from "./googleMaps";
export { codepenTransformer } from "./codepen";

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
  vimeoTransformer,
  twitchTransformer,
  twitterTransformer,
  figmaTransformer,
  googleMapsTransformer,
  codepenTransformer,
]; 