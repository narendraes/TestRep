// NEXUS — JIRA_TRANSITION Handler
// Owner: Agent 4 (Action Engine)

import { DispatchPayload, ActionResult } from '../types';
import { substituteTokens } from '../tokens';
import { showSuccess, showError } from '../feedback';

export async function handle(payload: DispatchPayload): Promise<ActionResult> {
  const transitionId = substituteTokens(payload.actionPayload['transitionId'] ?? '', payload.context);
  try {
    // TODO: Agent 4 — implement via requestJira() POST /rest/api/3/issue/{issueKey}/transitions
    showSuccess(`Transitioned ${payload.context.issueKey}`);
    return { success: true, message: `Transitioned to ${transitionId}` };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    showError(`Failed to transition: ${message}`);
    return { success: false, message };
  }
}
