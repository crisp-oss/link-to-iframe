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
import { linkToFrame } from "link-to-iframe";

// YouTube example
const youtubeHtml = linkToFrame("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
console.log(youtubeHtml);
// <iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

// Loom example
const loomHtml = linkToFrame("https://www.loom.com/share/abcdef123456");
console.log(loomHtml);
// <iframe width="560" height="315" src="https://www.loom.com/embed/abcdef123456" frameborder="0" allowfullscreen></iframe>

// Custom attributes for all iframes
const customHtml = linkToFrame("https://www.youtube.com/watch?v=dQw4w9WgXcQ", {
  defaultAttributes: {
    width: 640,
    height: 360,
    style: "border: none;"
  }
});
console.log(customHtml);
// <iframe width="640" height="360" src="https://www.youtube.com/embed/dQw4w9WgXcQ" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="border: none;"></iframe>

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

const vimeoHtml = linkToFrame("https://vimeo.com/123456789", {
  additionalTransformers: [vimeoTransformer]
});
console.log(vimeoHtml);
// <iframe width="560" height="315" src="https://player.vimeo.com/video/123456789" allowfullscreen frameborder="0"></iframe>
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
- PDF (supports embedding PDF files)
- CodePen (supports formats: codepen.io/username/pen/penId, codepen.io/username/full/penId)
- Typeform (supports formats: form.typeform.com/to/FORM_ID, [workspace].typeform.com/to/FORM_ID)

### Contributing New Services

The library is designed to be easy to extend and non-opinionated. Contributions for new service integrations are welcome and will be merged easily as long as they are simple enough. Contributions made with AI assistance (like GPT) are also accepted. See the custom transformer example in the Usage section for a starting point.

## Customization

You can customize the output in two ways:

1. **Default attributes**: Apply attributes to all generated iframes
2. **Custom transformers**: Add support for additional services by providing custom URL patterns and transformation logic

### Default Width and Height

By default, all iframes are rendered with a width of 560 and height of 315 pixels (standard YouTube dimensions). You can customize these values using the `defaultAttributes` option.

## License

link-to-iframe is released under the MIT License. See the bundled LICENSE file for details. 