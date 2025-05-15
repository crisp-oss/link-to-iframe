import { Transformer, IframeAttributes } from "../types";

/**
 * Transformer for PagerDuty dashboards and incidents
 * Supports formats:
 * - ACCOUNT.pagerduty.com/incidents/INCIDENT_ID
 * - ACCOUNT.pagerduty.com/dashboards/DASHBOARD_ID
 */
export const pagerdutyTransformer: Transformer = {
  patterns: [
    // Incident pattern
    /(?:https?:\/\/)?([a-zA-Z0-9_-]+)\.pagerduty\.com\/incidents\/([a-zA-Z0-9_-]+)(?:\?.*)?$/i,
    // Dashboard pattern
    /(?:https?:\/\/)?([a-zA-Z0-9_-]+)\.pagerduty\.com\/dashboards\/([a-zA-Z0-9_-]+)(?:\?.*)?$/i,
  ],
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes => {
    const account = matches[1];
    const id = matches[2];
    const type = url.includes("/incidents/") ? "incidents" : "dashboards";
    
    return {
      src: `https://${account}.pagerduty.com/embed/${type}/${id}`,
      width: 800,
      height: 600,
      frameborder: 0,
      allowfullscreen: true,
    };
  },
}; 