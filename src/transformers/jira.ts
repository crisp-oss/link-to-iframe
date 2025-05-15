import { Transformer, IframeAttributes } from "../types";

/**
 * Transformer for Jira issues and dashboards
 * Supports formats:
 * - ORGANIZATION.atlassian.net/browse/PROJECT-ID
 * - ORGANIZATION.atlassian.net/jira/dashboards/ID
 */
export const jiraTransformer: Transformer = {
  patterns: [
    // Issue pattern
    /(?:https?:\/\/)?([a-zA-Z0-9_-]+)\.atlassian\.net\/browse\/([a-zA-Z0-9_-]+)-([0-9]+)(?:\?.*)?$/i,
    // Dashboard pattern
    /(?:https?:\/\/)?([a-zA-Z0-9_-]+)\.atlassian\.net\/jira\/dashboards\/([0-9]+)(?:\?.*)?$/i,
  ],
  
  transform: (url: string, matches: RegExpExecArray): IframeAttributes => {
    const org = matches[1];
    
    // Check which pattern matched
    if (url.includes("/browse/")) {
      const project = matches[2];
      const issueId = matches[3];
      
      return {
        src: `https://${org}.atlassian.net/browse/${project}-${issueId}?embedded=true`,
        width: 800,
        height: 600,
        frameborder: 0,
        allowfullscreen: true,
      };
    } else {
      // Dashboard view
      const dashboardId = matches[2];
      
      return {
        src: `https://${org}.atlassian.net/jira/dashboards/${dashboardId}?embedded=true`,
        width: 800,
        height: 600,
        frameborder: 0,
        allowfullscreen: true,
      };
    }
  },
}; 