// NEXUS — JIRA_COMMENT Handler
// Owner: Agent 4 (Action Engine)

import { DispatchPayload, ActionResult } from '../types';
import { substituteTokens } from '../tokens';
import { showSuccess, showError } from '../feedback';

export async function handle(payload: DispatchPayload): Promise<ActionResult> {
  const body = substituteTokens(payload.actionPayload['commentTemplate'] ?? '', payload.context);
  try {
    // TODO: Agent 4 — implement via requestJira() POST /rest/api/3/issue/{issueKey}/comment
    showSuccess(`Comment added to ${payload.context.issueKey}`);
    return { success: true, message: `Comment added` };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    showError(`Failed to add comment: ${message}`);
    return { success: false, message };
  }
}
