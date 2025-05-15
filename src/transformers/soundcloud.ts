import { IframeAttributes, Transformer } from "../types";

/**
 * Transformer for SoundCloud URLs
 * Handles formats:
 * - soundcloud.com/artist/track
 * - soundcloud.com/artist/sets/album
 * - soundcloud.com/playlists/playlist
 * - m.soundcloud.com/artist/track
 */
export const soundcloudTransformer: Transformer = {
  key: "soundcloud",
  name: "Soundcloud",
  patterns: [
    // Standard track pattern
    /https?:\/\/(?:www\.|m\.)?soundcloud\.com\/([^/]+)\/(?!sets|playlists)([^/]+)(?:\?.*)?$/i,
    
    // Sets/album pattern
    /https?:\/\/(?:www\.|m\.)?soundcloud\.com\/([^/]+)\/sets\/([^/]+)(?:\?.*)?$/i,
    
    // Playlists pattern
    /https?:\/\/(?:www\.|m\.)?soundcloud\.com\/playlists\/([^/]+)(?:\?.*)?$/i,
  ],
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes | null => {
    let embedUrl;
    
    if (url.includes("/playlists/")) {
      // Handle playlists differently as they have a different URL structure
      const playlistId = matches[1];
      if (!playlistId) return null;
      
      embedUrl = `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/${playlistId}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`;
    } else if (url.includes("/sets/")) {
      // Handle albums/sets
      const username = matches[1];
      const setName = matches[2];
      if (!username || !setName) return null;
      
      embedUrl = `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/${setName}&user_id=${username}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`;
    } else {
      // Handle regular tracks
      const username = matches[1];
      const trackName = matches[2];
      if (!username || !trackName) return null;
      
      embedUrl = `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${trackName}&user_id=${username}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`;
    }
    
    return {
      src: embedUrl,
      width: 100,
      height: 400,
      frameborder: "no",
      scrolling: "no",
      allow: "autoplay",
    };
  },
}; 