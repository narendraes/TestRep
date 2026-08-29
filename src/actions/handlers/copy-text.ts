// NEXUS — COPY_TEXT Handler
// Owner: Agent 4 (Action Engine)

import { DispatchPayload, ActionResult } from '../types';
import { substituteTokens } from '../tokens';
import { showSuccess } from '../feedback';

export async function handle(payload: DispatchPayload): Promise<ActionResult> {
  const text = substituteTokens(payload.actionPayload['copyTemplate'] ?? '', payload.context);
  // TODO: Agent 4 — implement clipboard copy via navigator.clipboard.writeText()
  showSuccess('Copied to clipboard');
  return { success: true, message: `Copied: ${text}` };
}
