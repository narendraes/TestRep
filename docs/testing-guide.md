# NEXUS — Testing Guide

> Owner: Agent 5 (QA & Lint)

## Pre-commit Checks

1. Run `forge lint` — must pass with zero warnings
2. Verify no `any` types in TypeScript files
3. Verify no direct `storage.get()` / `storage.set()` calls outside `src/storage/client.ts`

## Manual Testing via Forge Tunnel

```shell
forge tunnel
```

### Test Matrix — Action Types

| Action Type | Test Steps | Expected Result |
|-------------|-----------|-----------------|
| OPEN_URL | Click button with URL payload | Browser opens target URL |
| OPEN_MODAL | Click button with modal key | Modal dialog appears |
| JIRA_TRANSITION | Click button with transition ID | Issue status changes |
| JIRA_COMMENT | Click button with comment template | Comment added to issue |
| JIRA_ASSIGN | Click button with account ID | Issue assigned |
| COPY_TEXT | Click button with text template | Text copied to clipboard |
| SET_ISSUE_PROPERTY | Click button with key/value | Property set on issue |
| FORGE_FUNCTION | Click button with function key | Custom function executes |

### Test Matrix — Placements

| Placement | Location | Verify |
|-----------|----------|--------|
| panel | Issue detail → right sidebar | Buttons render, click works |
| glance | Issue detail → glance section | Buttons render, click works |
| action | Issue actions menu | Menu item appears, click works |
| page | Project sidebar page | Buttons render, click works |

## Storage Quota

```shell
forge usage
```

Ensure app stays within Forge storage limits.
