// NEXUS — User Feedback
// Owner: Agent 4 (Action Engine)
// Call showSuccess() on success, showError() on failure after every action.

export function showSuccess(message: string): void {
  // TODO: Agent 4 — implement using Forge UI Kit 2 flag/toast
  console.log(`[NEXUS SUCCESS] ${message}`);
}

export function showError(message: string): void {
  // TODO: Agent 4 — implement using Forge UI Kit 2 flag/toast
  console.error(`[NEXUS ERROR] ${message}`);
}
