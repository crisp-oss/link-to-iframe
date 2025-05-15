import { Transformer } from "../types";

/**
 * Transformer for Google Maps URLs
 * Supports formats:
 * - google.com/maps?...
 * - google.com/maps/place/...
 * - goo.gl/maps/... (short URLs)
 */
export const googleMapsTransformer: Transformer = {
  key: "google-maps",
  name: "Google Maps",
  pattern: /(?:https?:\/\/)?(?:www\.)?(?:google\.com\/maps|goo\.gl\/maps)\/(?:place\/)?([^?]+)?(?:\?[^?]+)?/i,
  transform: (url) => {
    // Extract the source URL and convert it to an embed URL
    let embedUrl = url;
    
    // If it's already a maps embed URL, use it directly
    if (!url.includes("maps/embed")) {
      // Parse the URL
      const urlObj = new URL(url);
      
      // Google Maps embed URL structure
      if (url.includes("google.com/maps")) {
        let query = "";
        
        // For place URLs
        if (url.includes("/place/")) {
          query = url.split("/place/")[1].split("?")[0];
        } 
        // For regular map URLs with query parameters
        else if (urlObj.searchParams.has("q")) {
          query = urlObj.searchParams.get("q") || "";
        }
        
        if (query) {
          embedUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(query)}`;
        } else {
          // If we can't extract a query, use the original URL in an iframe src
          embedUrl = `https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&center=${urlObj.searchParams.get("center") || "0,0"}&zoom=${urlObj.searchParams.get("zoom") || "10"}`;
        }
      }
    }
    
    return {
      src: embedUrl,
      width: 600,
      height: 450,
      frameborder: 0,
      style: "border:0",
      allowfullscreen: true,
      loading: "lazy",
      referrerpolicy: "no-referrer-when-downgrade",
    };
  },
}; 