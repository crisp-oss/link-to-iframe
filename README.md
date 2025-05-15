# link-to-iframe

[![NPM](https://img.shields.io/npm/v/link-to-iframe.svg)](https://www.npmjs.com/package/link-to-iframe) [![Downloads](https://img.shields.io/npm/dt/link-to-iframe.svg)](https://www.npmjs.com/package/link-to-iframe)

A TypeScript package that transforms URLs from various services (YouTube, Loom, Asciinema, etc.) into embeddable iframe HTML.

**😘 Maintainer**: [@baptistejamin](https://github.com/baptistejamin)

## Who uses it?

<table>
<tr>
<td align="center"><a href="https://crisp.chat/"><img src="https://crisp.chat/favicons/favicon-256x256.png" height="64" /></a></td>
</tr>
<tr>
<td align="center">Crisp</td>
</tr>
</table>

_👋 You use this library and you want to be listed there? [Contact us](https://crisp.chat/)._

## Features

This library transforms URLs from various services into embeddable iframe HTML code:
- Automatically detects supported service URLs
- Transforms them into proper iframe embed codes
- Customizable iframe attributes
- Extensible with custom URL transformers

## Installation

```bash
npm install link-to-iframe
```

## Usage

```typescript
import { linkToIframe } from "link-to-iframe";

// YouTube example
const youtubeHtml = linkToIframe("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
console.log(youtubeHtml);
// <iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

// Loom example
const loomHtml = linkToIframe("https://www.loom.com/share/abcdef123456");
console.log(loomHtml);
// <iframe width="560" height="315" src="https://www.loom.com/embed/abcdef123456" frameborder="0" allowfullscreen></iframe>

// Custom attributes for all iframes
const customHtml = linkToIframe("https://www.youtube.com/watch?v=dQw4w9WgXcQ", {
  defaultAttributes: {
    width: 640,
    height: 360,
    style: "border: none;"
  }
});
console.log(customHtml);
// <iframe width="640" height="360" src="https://www.youtube.com/embed/dQw4w9WgXcQ" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="border: none;"></iframe>

// Get attributes object instead of HTML
const attributesObj = linkToIframe("https://www.youtube.com/watch?v=dQw4w9WgXcQ", {
  returnObject: true
});
console.log(attributesObj);
// {
//   src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
//   width: "560",
//   height: "315",
//   allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
//   allowfullscreen: true
// }

// Adding custom URL transformers
import { Transformer } from "link-to-iframe";

const vimeoTransformer: Transformer = {
  pattern: /(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(\d+)/i,
  transform: (url, matches) => {
    const videoId = matches[1];
    return {
      src: `https://player.vimeo.com/video/${videoId}`,
      allowfullscreen: true,
      frameborder: 0,
      width: 560,
      height: 315
    };
  }
};

const vimeoHtml = linkToIframe("https://vimeo.com/123456789", {
  additionalTransformers: [vimeoTransformer]
});
console.log(vimeoHtml);
// <iframe width="560" height="315" src="https://player.vimeo.com/video/123456789" allowfullscreen frameborder="0"></iframe>

// Get all available transformers
import { getAllTransformers } from "link-to-iframe";

const transformers = getAllTransformers();
console.log(transformers);
// [
//   { key: "youtube", name: "YouTube", priority: 10 },
//   { key: "loom", name: "Loom", priority: 0 },
//   ...
// ]

// Include custom transformers in the list
const customTransformer = {
  key: "custom-service",
  name: "Custom Service",
  priority: 100, // Higher priority will appear first in the sorted list
  pattern: /custom-service\.com\/video\/(\d+)/i,
  transform: (url, matches) => ({
    src: `https://custom-service.com/embed/${matches[1]}`,
    width: 560,
    height: 315,
  })
};

const allTransformers = getAllTransformers({
  includeAdditional: [customTransformer]
});
// First item will be the custom transformer due to higher priority
```

## Supported Services

Currently, the following services are supported out of the box:

- YouTube (supports formats: youtube.com/watch, youtu.be/ID, youtube.com/embed)
- Loom (supports format: loom.com/share)
- Asciinema (supports format: asciinema.org/a/ID with query parameters like theme, speed, and start time)
- Cleanshot (supports format: cleanshot.com/image/ID)
- Dailymotion (supports format: dailymotion.com/video/ID)
- Streamable (supports format: streamable.com/ID)
- TikTok (supports format: tiktok.com/@username/video/ID)
- Wistia (supports format: wistia.com/medias/ID)
- Vimeo (supports formats: vimeo.com/ID, vimeo.com/channels/staffpicks/ID, player.vimeo.com/video/ID)
- Twitch (supports formats: twitch.tv/channel, twitch.tv/videos/ID, twitch.tv/collections/ID, clips.twitch.tv/Clip)
- Twitter/X (supports formats: twitter.com/username/status/ID, x.com/username/status/ID)
- Figma (supports formats: figma.com/file/ID/Project-Name, figma.com/proto/ID/Project-Name, figma.com/design/ID/Project-Name)
- Google Maps (supports formats: google.com/maps?..., google.com/maps/place/..., goo.gl/maps/...)
- Google Docs (supports formats: docs.google.com/document/d/..., docs.google.com/spreadsheets/d/..., docs.google.com/presentation/d/...)
- Google Drive (supports embedding Google Drive files)
- TypeForm (supports formats: form.typeform.com/to/FORM_ID, [workspace].typeform.com/to/FORM_ID)
- Abstract
- InVision
- Framer
- Mixpanel
- PDF (supports embedding PDF files)
- Whimsical
- Miro
- Sketch
- Excalidraw
- Replit
- Hex
- Deepnote
- GitLab
- Jira
- Trello
- GitHub
- Slack
- Asana
- Pitch
- Dropbox
- Zoom
- OneDrive
- Amplitude
- Claap
- Box
- Linear
- LucidApp
- Monday
- LinkedIn
- Eraser
- PagerDuty
- ClickUp
- Adobe XD
- Plus
- Instagram
- Wikipedia
- SoundCloud
- Amazon
- Canva
- Airtable
- Calendly
- Cal.com
- Sutori
- Guideflow
- YouForm
- CodePen (supports formats: codepen.io/username/pen/penId, codepen.io/username/full/penId)

### Contributing New Services

The library is designed to be easy to extend and non-opinionated. Contributions for new service integrations are welcome and will be merged easily as long as they are simple enough. Contributions made with AI assistance (like GPT) are also accepted. See the custom transformer example in the Usage section for a starting point.

## API Reference

### linkToIframe(url, options)

Converts a URL to an iframe HTML string or attributes object.

**Parameters:**
- `url` (string): The URL to convert to an iframe
- `options` (object, optional): Configuration options
  - `defaultAttributes` (object, optional): Default attributes to apply to all iframes
  - `additionalTransformers` (array, optional): Additional transformers to use
  - `returnObject` (boolean, optional): Return attributes object instead of HTML string

**Returns:**
- HTML iframe string, attributes object, or null if no transformer matches

### getAllTransformers(options)

Get all available transformers with their key, name, and priority, sorted by priority (highest first).

**Parameters:**
- `options` (object, optional): Configuration options
  - `includeAdditional` (array, optional): Additional transformers to include in the list

**Returns:**
- Array of transformer info objects, each containing:
  - `key` (string): Unique identifier for the transformer
  - `name` (string): Display name of the transformer
  - `priority` (number): Priority value (higher priorities are listed first)

## Customization

You can customize the output in two ways:

1. **Default attributes**: Apply attributes to all generated iframes
2. **Custom transformers**: Add support for additional services by providing custom URL patterns and transformation logic

### Default Width and Height

By default, all iframes are rendered with a width of 560 and height of 315 pixels (standard YouTube dimensions). You can customize these values using the `defaultAttributes` option.

### Return Object Instead of HTML

By default, the `linkToIframe` function returns an HTML string. You can set the `returnObject` option to `true` to get the attributes object instead:

```typescript
const attributes = linkToIframe("https://www.youtube.com/watch?v=dQw4w9WgXcQ", {
  returnObject: true
});

// Now you can use the attributes with your own templating system
// For example, with React:
// <iframe {...attributes}></iframe>
```

This is useful if you want to:
- Use the attributes with your own templating/rendering system
- Modify the attributes before rendering
- Use with markdown or other formatting systems

## License

link-to-iframe is released under the MIT License. See the bundled LICENSE file for details. 