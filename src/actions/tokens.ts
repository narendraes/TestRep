// NEXUS — Token Substitution
// Owner: Agent 4 (Action Engine)
// Always run substituteTokens() before using any user-configured payload string.

import { IssueContext } from './types';

export function substituteTokens(template: string, context: IssueContext): string {
  const now = new Date();
  const tokenMap: Record<string, string> = {
    '{{issue.key}}': context.issueKey,
    '{{issue.summary}}': context.issueSummary,
    '{{issue.status}}': context.issueStatus,
    '{{issue.type}}': context.issueType,
    '{{project.key}}': context.projectKey,
    '{{user.displayName}}': context.userDisplayName,
    '{{date}}': now.toISOString().split('T')[0],
  };

  let result = template;
  for (const [token, value] of Object.entries(tokenMap)) {
    result = result.replaceAll(token, value);
  }

  // FR-5.10: Unknown tokens resolve to [unknown token] — no crash
  result = result.replaceAll(/\{\{[^}]+\}\}/g, '[unknown token]');

  return result;
}
