import { Transformer, IframeAttributes } from "../types";

/**
 * Transformer for Amplitude dashboards and charts
 * Supports formats:
 * - analytics.amplitude.com/org/PROJECT/dashboard/DASHBOARD_ID
 * - analytics.amplitude.com/org/PROJECT/chart/CHART_ID
 */
export const amplitudeTransformer: Transformer = {
  pattern: /(?:https?:\/\/)?(?:www\.)?analytics\.amplitude\.com\/([a-zA-Z0-9_-]+)\/([a-zA-Z0-9_-]+)\/(?:dashboard|chart)\/([a-zA-Z0-9_-]+)(?:\?.*)?$/i,
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes => {
    const org = matches[1];
    const project = matches[2];
    const id = matches[3];
    const type = url.includes("/dashboard/") ? "dashboard" : "chart";
    
    return {
      src: `https://analytics.amplitude.com/embed/${org}/${project}/${type}/${id}`,
      width: 800,
      height: 600,
      frameborder: 0,
      allowfullscreen: true,
    };
  },
}; 