import { IframeAttributes, Transformer } from "../types";

/**
 * Transformer for Mixpanel URLs
 * Handles formats:
 * - https://mixpanel.com/project/[PROJECT_ID]/view/[DASHBOARD_ID]
 * - https://mixpanel.com/report/[PROJECT_ID]/[REPORT_ID]
 */
export const mixpanelTransformer: Transformer = {
  key: "mixpanel",
  name: "Mixpanel",
  pattern: /https?:\/\/mixpanel\.com\/(?:project|report)\/(\d+)(?:\/(?:view|dashboard))?\/(\d+)/i,
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes | null => {
    const projectId = matches[1];
    const reportId = matches[2];
    let embedUrl = "";
    
    if (url.includes("/project/")) {
      // Dashboard embed
      embedUrl = `https://mixpanel.com/embed/dashboard/${projectId}/${reportId}`;
    } else {
      // Report embed
      embedUrl = `https://mixpanel.com/embed/report/${projectId}/${reportId}`;
    }
    
    return {
      src: embedUrl,
      width: 800,
      height: 600,
      frameborder: 0,
      allowfullscreen: true,
    };
  },
}; 