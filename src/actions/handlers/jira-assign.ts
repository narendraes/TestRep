// NEXUS — JIRA_ASSIGN Handler
// Owner: Agent 4 (Action Engine)

import { DispatchPayload, ActionResult } from '../types';
import { substituteTokens } from '../tokens';
import { showSuccess, showError } from '../feedback';

export async function handle(payload: DispatchPayload): Promise<ActionResult> {
  const accountId = substituteTokens(payload.actionPayload['accountId'] ?? '', payload.context);
  try {
    // TODO: Agent 4 — implement via requestJira() PUT /rest/api/3/issue/{issueKey}/assignee
    showSuccess(`Assigned ${payload.context.issueKey}`);
    return { success: true, message: `Assigned to ${accountId}` };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    showError(`Failed to assign: ${message}`);
    return { success: false, message };
  }
}
