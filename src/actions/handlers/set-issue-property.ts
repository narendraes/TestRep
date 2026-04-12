// NEXUS — SET_ISSUE_PROPERTY Handler
// Owner: Agent 4 (Action Engine)

import { DispatchPayload, ActionResult } from '../types';
import { substituteTokens } from '../tokens';
import { showSuccess, showError } from '../feedback';

function parseValue(value: string, type: string): unknown {
  if (type === 'number') return Number(value);
  if (type === 'boolean') return value === 'true';
  if (type === 'json') return JSON.parse(value);
  return value; // default: string
}

export async function handle(payload: DispatchPayload): Promise<ActionResult> {
  const resolvedKey = substituteTokens(payload.actionPayload['propertyKey'] ?? '', payload.context);
  const resolvedValue = substituteTokens(payload.actionPayload['propertyValue'] ?? '', payload.context);
  const valueType = payload.actionPayload['valueType'] ?? 'string';
  const parsedValue = parseValue(resolvedValue, valueType);

  try {
    // TODO: Agent 4 — implement via requestJira()
    // PUT /rest/api/3/issue/${context.issueKey}/properties/${resolvedKey}
    // body: JSON.stringify(parsedValue)
    // headers: { 'Content-Type': 'application/json' }
    showSuccess(`Set property ${resolvedKey} on ${payload.context.issueKey}`);
    return { success: true, message: `Set ${resolvedKey} = ${resolvedValue}` };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    showError(`Failed to set property: ${message}`);
    return { success: false, message };
  }
}
