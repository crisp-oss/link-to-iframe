import { Transformer } from "../types";

/**
 * Transformer for Figma URLs
 * Supports formats:
 * - figma.com/file/abcdef/Project-Name
 * - figma.com/proto/abcdef/Project-Name
 * - figma.com/design/abcdef/Project-Name
 */
export const figmaTransformer: Transformer = {
  pattern: /(?:https?:\/\/)?(?:www\.)?figma\.com\/(file|proto|design)\/([a-zA-Z0-9]+)(?:\/[^?]+)?/i,
  transform: (url, matches) => {
    const fileType = matches[1]; // file, proto, or design
    const fileId = matches[2];
    const fileUrl = new URL(url);
    
    // Extract node-id if present
    const nodeId = fileUrl.searchParams.get("node-id") || "0-1";
    
    // Handle different embed formats based on file type
    if (fileType === "design") {
      return {
        src: `https://embed.figma.com/design/${fileId}/${fileUrl.pathname.split("/").pop()}?node-id=${nodeId}&embed-host=share`,
        width: 800,
        height: 450,
        frameborder: 0,
        allowfullscreen: true,
      };
    } else {
      // Original behavior for file and proto
      return {
        src: `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(fileUrl.toString())}`,
        width: 800,
        height: 450,
        frameborder: 0,
        allowfullscreen: true,
      };
    }
  },
}; 