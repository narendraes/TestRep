// NEXUS — Action Types
// Owner: Agent 4 (Action Engine)

import { ActionType, ButtonDef } from '../storage/schema';

export interface IssueContext {
  issueKey: string;
  issueSummary: string;
  issueStatus: string;
  issueType: string;
  projectKey: string;
  userDisplayName: string;
}

export interface DispatchPayload {
  actionType: ActionType;
  actionPayload: Record<string, string>;
  context: IssueContext;
  button: ButtonDef;
}

export interface ActionResult {
  success: boolean;
  message: string;
}
