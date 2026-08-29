// NEXUS — Storage Client
// Owner: Agent 1 (Storage & Schema)
// All storage reads/writes go through this module.
// Components must NEVER call storage.get() or storage.set() directly.

import { storage } from '@forge/api';
import { ButtonDef, ProjectConfig } from './schema';

const KEYS = {
  buttons: 'smartactions:buttons',
  projectConfig: (id: string) => `smartactions:project:${id}`,
  version: 'smartactions:version',
};

export async function getButtons(): Promise<ButtonDef[]> {
  const result = await storage.get(KEYS.buttons);
  return result ?? [];
}

export async function saveButtons(buttons: ButtonDef[]): Promise<void> {
  await storage.set(KEYS.buttons, buttons);
}

export async function getProjectConfig(projectId: string): Promise<ProjectConfig> {
  const result = await storage.get(KEYS.projectConfig(projectId));
  return result ?? { buttons: {} };
}

export async function saveProjectConfig(projectId: string, config: ProjectConfig): Promise<void> {
  await storage.set(KEYS.projectConfig(projectId), config);
}

export async function deleteButton(buttonId: string): Promise<void> {
  const buttons = await getButtons();
  const filtered = buttons.filter((b) => b.id !== buttonId);
  await saveButtons(filtered);
}

export async function getVersion(): Promise<string> {
  const result = await storage.get(KEYS.version);
  return result ?? '0.0.0';
}

export async function setVersion(version: string): Promise<void> {
  await storage.set(KEYS.version, version);
}
