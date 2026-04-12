# NEXUS — Multi-Agent Structure

## How to use this with Claude Code

Run each agent in a separate terminal with its own Claude Code session.
Each agent owns specific files and features. Agents should NOT edit files
outside their assigned scope without checking with the orchestrator.

---

## Agent 0 — Orchestrator (you / main terminal)

**Role:** Coordinates agents, reviews PRs, manages Jira status updates,
runs forge deploy.

**Commands this agent runs:**
- forge lint
- forge deploy --environment development
- forge install
- git merge / PR review

**Files owned:** CLAUDE.md, AGENTS.md, manifest.yml, package.json,
docs/deployment-checklist.md

---

## Agent 1 — Storage & Schema (Terminal 1)

**Prompt to start:**
"You are Agent 1 — Storage & Schema for the NEXUS Forge app.
Read CLAUDE.md first. Your sole responsibility is:
- src/storage/schema.ts (TypeScript interfaces)
- src/storage/client.ts (typed get/set/delete wrappers)
- docs/storage-schema.md
Do not touch any other files. Ask before any change to shared interfaces."

**Stories owned:** DO-22 (manifest), DO-23 (schema)

---

## Agent 2 — Admin UI (Terminal 2)

**Prompt to start:**
"You are Agent 2 — Admin UI for the NEXUS Forge app.
Read CLAUDE.md first. Your sole responsibility is:
- src/admin/global-settings.tsx (F2 — Global button manager)
- src/admin/project-settings.tsx (F3 — Per-project config)
You depend on src/storage/client.ts being complete (Agent 1).
Do not implement action logic — call dispatch() from src/actions/dispatcher.ts."

**Stories owned:** DO-25, DO-26, DO-27, DO-28 (F2), DO-29, DO-30 (F3)

---

## Agent 3 — Rendering Engine (Terminal 3)

**Prompt to start:**
"You are Agent 3 — Rendering Engine for the NEXUS Forge app.
Read CLAUDE.md first. Your sole responsibility is:
- src/render/issue-panel.tsx
- src/render/issue-glance.tsx
- src/render/issue-action.tsx
- src/render/project-page.tsx
You depend on src/storage/client.ts (Agent 1) and src/actions/dispatcher.ts (Agent 4).
One storage.get() per mount only. Cache in component state. Never read in a loop."

**Stories owned:** DO-31, DO-32, DO-33, DO-34 (F4)

---

## Agent 4 — Action Engine (Terminal 4)

**Prompt to start:**
"You are Agent 4 — Action Execution Engine for the NEXUS Forge app.
Read CLAUDE.md first. Your sole responsibility is:
- src/actions/dispatcher.ts
- src/actions/types.ts
- src/actions/tokens.ts
- src/actions/feedback.ts
- src/actions/handlers/*.ts (all 8 handlers)
All handlers must: run substituteTokens() on payloads, call requestJira() with
try/catch, call showSuccess/showError from feedback.ts, set loading state.
Do not touch storage or render files."

**Stories owned:** DO-35 through DO-42, DO-47 (F5)

---

## Agent 5 — QA & Lint (Terminal 5, used in F6)

**Prompt to start:**
"You are Agent 5 — QA for the NEXUS Forge app.
Read CLAUDE.md first. Your sole responsibility is:
- Running forge lint and fixing any warnings
- Writing docs/testing-guide.md
- Writing docs/deployment-checklist.md
- Verifying each action type manually via forge tunnel
- Checking storage quota: forge usage
Do not modify source files except to fix lint errors."

**Stories owned:** DO-44, DO-45, DO-46 (F6)

---

## Coordination Rules

1. Agent 1 (Storage) must finish schema.ts and client.ts BEFORE Agents 2, 3, 4 start.
2. Agent 4 (Actions) must finish dispatcher.ts and types.ts BEFORE Agent 3 starts.
3. All agents run `forge lint` before committing.
4. Commit format: `feat(DO-xx): short description`
5. One PR per story. Orchestrator merges.
6. Never force push to main.
