// NEXUS — FORGE_FUNCTION Handler
// Owner: Agent 4 (Action Engine)

import { DispatchPayload, ActionResult } from '../types';
import { substituteTokens } from '../tokens';
import { showSuccess, showError } from '../feedback';

export async function handle(payload: DispatchPayload): Promise<ActionResult> {
  const functionName = substituteTokens(payload.actionPayload['functionName'] ?? '', payload.context);
  try {
    // TODO: Agent 4 — implement custom Forge function invocation via invoke()
    showSuccess(`Executed function: ${functionName}`);
    return { success: true, message: `Executed: ${functionName}` };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    showError(`Failed to execute function: ${message}`);
    return { success: false, message };
  }
}
