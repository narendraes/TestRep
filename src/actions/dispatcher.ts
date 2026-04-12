// NEXUS — Action Dispatcher
// Owner: Agent 4 (Action Engine)
// All button click handlers route through dispatch().

import { DispatchPayload, ActionResult } from './types';

export async function dispatch(payload: DispatchPayload): Promise<ActionResult> {
  switch (payload.actionType) {
    case 'OPEN_URL':
      return (await import('./handlers/open-url')).handle(payload);
    case 'OPEN_MODAL':
      return (await import('./handlers/open-modal')).handle(payload);
    case 'JIRA_TRANSITION':
      return (await import('./handlers/jira-transition')).handle(payload);
    case 'JIRA_COMMENT':
      return (await import('./handlers/jira-comment')).handle(payload);
    case 'JIRA_ASSIGN':
      return (await import('./handlers/jira-assign')).handle(payload);
    case 'COPY_TEXT':
      return (await import('./handlers/copy-text')).handle(payload);
    case 'SET_ISSUE_PROPERTY':
      return (await import('./handlers/set-issue-property')).handle(payload);
    case 'FORGE_FUNCTION':
      return (await import('./handlers/forge-function')).handle(payload);
    default:
      return { success: false, message: `Unknown action type: ${payload.actionType}` };
  }
}
