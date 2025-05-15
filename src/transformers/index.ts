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
import { googleDocsTransformer } from "./google-docs-pdf";
import { googleDriveTransformer } from "./google-drive";
import { typeformTransformer } from "./typeform";
import { abstractTransformer } from "./abstract";
import { invisionTransformer } from "./invision";
import { framerTransformer } from "./framer";
import { mixpanelTransformer } from "./mixpanel";
import { pdfTransformer } from "./pdf";
import { whimsicalTransformer } from "./whimsical";
import { miroTransformer } from "./miro";
import { sketchTransformer } from "./sketch";
import { excalidrawTransformer } from "./excalidraw";
import { replitTransformer } from "./replit";
import { hexTransformer } from "./hex";
import { deepnoteTransformer } from "./deepnote";
import { gitlabTransformer } from "./gitlab";
import { jiraTransformer } from "./jira";
import { trelloTransformer } from "./trello";
import { githubTransformer } from "./github";
import { slackTransformer } from "./slack";
import { asanaTransformer } from "./asana";
import { pitchTransformer } from "./pitch";
import { dropboxTransformer } from "./dropbox";
import { zoomTransformer } from "./zoom";
import { onedriveTransformer } from "./onedrive";
import { amplitudeTransformer } from "./amplitude";
import { claapTransformer } from "./claap";
import { boxTransformer } from "./box";
import { linearTransformer } from "./linear";
import { lucidAppTransformer } from "./lucidapp";
import { mondayTransformer } from "./monday";
import { linkedinTransformer } from "./linkedin";
import { eraserTransformer } from "./eraser";
import { pagerdutyTransformer } from "./pagerduty";
import { clickupTransformer } from "./clickup";
import { adobexdTransformer } from "./adobexd";
import { plusTransformer } from "./plus";
import { instagramTransformer } from "./instagram";
import { wikipediaTransformer } from "./wikipedia";
import { soundcloudTransformer } from "./soundcloud";
import { amazonTransformer } from "./amazon";
import { canvaTransformer } from "./canva";
import { airtableTransformer } from "./airtable";
import { calendlyTransformer } from "./calendly";
import { calcomTransformer } from "./calcom";
import { sutoriTransformer } from "./sutori";
import { guideflowTransformer } from "./guideflow";
import { youformTransformer } from "./youform";

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
export { googleDocsTransformer } from "./google-docs-pdf";
export { googleDriveTransformer } from "./google-drive";
export { typeformTransformer } from "./typeform";
export { abstractTransformer } from "./abstract";
export { invisionTransformer } from "./invision";
export { framerTransformer } from "./framer";
export { mixpanelTransformer } from "./mixpanel";
export { pdfTransformer } from "./pdf";
export { whimsicalTransformer } from "./whimsical";
export { miroTransformer } from "./miro";
export { sketchTransformer } from "./sketch";
export { excalidrawTransformer } from "./excalidraw";
export { replitTransformer } from "./replit";
export { hexTransformer } from "./hex";
export { deepnoteTransformer } from "./deepnote";
export { gitlabTransformer } from "./gitlab";
export { jiraTransformer } from "./jira";
export { trelloTransformer } from "./trello";
export { githubTransformer } from "./github";
export { slackTransformer } from "./slack";
export { asanaTransformer } from "./asana";
export { pitchTransformer } from "./pitch";
export { dropboxTransformer } from "./dropbox";
export { zoomTransformer } from "./zoom";
export { onedriveTransformer } from "./onedrive";
export { amplitudeTransformer } from "./amplitude";
export { claapTransformer } from "./claap";
export { boxTransformer } from "./box";
export { linearTransformer } from "./linear";
export { lucidAppTransformer } from "./lucidapp";
export { mondayTransformer } from "./monday";
export { linkedinTransformer } from "./linkedin";
export { eraserTransformer } from "./eraser";
export { pagerdutyTransformer } from "./pagerduty";
export { clickupTransformer } from "./clickup";
export { adobexdTransformer } from "./adobexd";
export { plusTransformer } from "./plus";
export { instagramTransformer } from "./instagram";
export { wikipediaTransformer } from "./wikipedia";
export { soundcloudTransformer } from "./soundcloud";
export { amazonTransformer } from "./amazon";
export { canvaTransformer } from "./canva";
export { airtableTransformer } from "./airtable";
export { calendlyTransformer } from "./calendly";
export { calcomTransformer } from "./calcom";
export { sutoriTransformer } from "./sutori";
export { guideflowTransformer } from "./guideflow";
export { youformTransformer } from "./youform";

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
  googleDocsTransformer,
  googleDriveTransformer,
  typeformTransformer,
  abstractTransformer,
  invisionTransformer,
  framerTransformer,
  mixpanelTransformer,
  pdfTransformer,
  whimsicalTransformer,
  miroTransformer,
  sketchTransformer,
  excalidrawTransformer,
  replitTransformer,
  hexTransformer,
  deepnoteTransformer,
  gitlabTransformer,
  jiraTransformer,
  trelloTransformer,
  githubTransformer,
  slackTransformer,
  asanaTransformer,
  pitchTransformer,
  dropboxTransformer,
  zoomTransformer,
  onedriveTransformer,
  amplitudeTransformer,
  claapTransformer,
  boxTransformer,
  linearTransformer,
  lucidAppTransformer,
  mondayTransformer,
  linkedinTransformer,
  eraserTransformer,
  pagerdutyTransformer,
  clickupTransformer,
  adobexdTransformer,
  plusTransformer,
  instagramTransformer,
  wikipediaTransformer,
  soundcloudTransformer,
  amazonTransformer,
  canvaTransformer,
  airtableTransformer,
  calendlyTransformer,
  calcomTransformer,
  sutoriTransformer,
  guideflowTransformer,
  youformTransformer,
]; 