// NEXUS — Storage Schema
// Owner: Agent 1 (Storage & Schema)
// All TypeScript interfaces for the NEXUS app live here.

export type ActionType =
  | 'OPEN_URL'
  | 'OPEN_MODAL'
  | 'JIRA_TRANSITION'
  | 'JIRA_COMMENT'
  | 'JIRA_ASSIGN'
  | 'COPY_TEXT'
  | 'SET_ISSUE_PROPERTY'
  | 'FORGE_FUNCTION';

export type PlacementType = 'panel' | 'glance' | 'action' | 'page';

export type ButtonStyle = 'primary' | 'secondary' | 'danger';

export interface VisibilityCondition {
  issueTypes?: string[];
  statusCategories?: string[];
}

export interface ButtonDef {
  id: string;
  label: string;
  icon: string;
  style: ButtonStyle;
  actionType: ActionType;
  actionPayload: Record<string, string>;
  visibilityCondition?: VisibilityCondition;
  createdAt: string;
}

export interface ProjectButtonConfig {
  enabled: boolean;
  placements: PlacementType[];
}

export interface ProjectConfig {
  buttons: Record<string, ProjectButtonConfig>;
}
