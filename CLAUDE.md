# NEXUS — Claude Code Instructions

## Project
Forge app for Jira Cloud. Smart Actions & Buttons.
Jira board: https://narendev.atlassian.net/jira/software/c/projects/DO/boards/68
Confluence: https://narendev.atlassian.net/wiki/spaces/FD/pages/213319681

## Stack
- Atlassian Forge (Jira Cloud)
- TypeScript
- Forge UI Kit 2 (NOT Custom UI — never use iframes)
- @forge/storage Entity Store (NOT external DB)
- @forge/api, @forge/bridge, @forge/ui

## Architecture Rules — NEVER BREAK THESE

1. STORAGE: Never call storage.get() or storage.set() directly from a component.
   Always go through src/storage/client.ts.

2. STORAGE READS: One storage.get() per component mount only.
   Cache result in component state. Never read in a loop or per-render.

3. NULL SAFETY: Always default storage reads to empty arrays/objects.
   `const buttons = (await getButtons()) ?? [];`
   Never assume storage keys exist on a fresh install.

4. NO BACKGROUND JOBS: Do not add scheduled functions or triggers.
   All Forge invocations must be user-triggered only.

5. NO EXTERNAL CALLS ON RENDER: requestJira() only fires on button click.
   Never call Jira REST API during component render/mount.

6. UI KIT 2 ONLY: Never use Custom UI or iframes. All UI in Forge UI Kit 2.

7. DISPATCHER PATTERN: All button click handlers must call dispatch() in
   src/actions/dispatcher.ts. Never add action logic directly in render components.

8. TOKEN SUBSTITUTION: Always run substituteTokens() before using any
   user-configured payload string in a URL, comment, property key, or value.

9. ERROR HANDLING: Every requestJira() call must have try/catch.
   Call showError() from src/actions/feedback.ts on failure.
   Call showSuccess() on success (except OPEN_URL and OPEN_MODAL).

10. TYPES: Use interfaces from src/storage/schema.ts and src/actions/types.ts.
    Never use `any`. Extend interfaces rather than inline type declarations.

## Action Types (8 total)
OPEN_URL | OPEN_MODAL | JIRA_TRANSITION | JIRA_COMMENT |
JIRA_ASSIGN | COPY_TEXT | SET_ISSUE_PROPERTY | FORGE_FUNCTION

## Placement Types (4 total)
panel | glance | action | page

## Storage Keys
- smartactions:buttons        → ButtonDef[]
- smartactions:project:{id}   → ProjectConfig
- smartactions:version        → string

## Supported Tokens
{{issue.key}} {{issue.summary}} {{issue.status}} {{issue.type}}
{{project.key}} {{user.displayName}} {{date}}

## Feature Build Order
F1 → F2 → F3 → F4 → F5 → F6
Do NOT start F4 before F3 storage is working.

## Jira Story Tracking
When completing a story, note the DO-xx key in your commit message.
Format: `feat(DO-21): initialize Forge app and folder structure`

## Testing
- Run `forge lint` before every commit
- Manual test guide: docs/testing-guide.md
- Deploy checklist: docs/deployment-checklist.md

## MCP Servers in use
- Atlassian MCP: https://mcp.atlassian.com/v1/mcp
- GitHub MCP: configured in .mcp.json

## Agents
See AGENTS.md for multi-agent roles and responsibilities.
