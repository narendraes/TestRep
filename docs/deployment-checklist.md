# NEXUS — Deployment Checklist

> Owner: Agent 5 (QA & Lint) / Orchestrator

## Pre-Deploy Checks

- [ ] `forge lint` passes with zero warnings
- [ ] No `any` types in TypeScript files
- [ ] No direct `storage.get()` / `storage.set()` calls outside `src/storage/client.ts`
- [ ] No `requestJira()` calls on component render — only on user action
- [ ] All `requestJira()` calls wrapped in try/catch
- [ ] `showSuccess` or `showError` called after every action
- [ ] Storage null returns handled with `?? []` or `?? {}`
- [ ] Commit messages follow format: `feat(DO-xx): description`

## Development Deploy

```shell
forge lint
forge deploy --environment development
forge install --upgrade --environment development
forge tunnel   # verify via hot reload
forge usage    # check quota
```

## Staging Deploy

```shell
forge lint
forge deploy --environment staging
forge install --upgrade --environment staging
```

### Staging Smoke Test

- [ ] Global Settings: create/edit/delete a button
- [ ] Project Settings: enable button, assign placements, save
- [ ] Issue Panel: buttons render, click fires action
- [ ] Issue Glance: buttons render with count badge
- [ ] Issue Action Menu: NEXUS items appear in "..." menu
- [ ] Project Page: buttons render in grid layout
- [ ] All 8 action types execute successfully
- [ ] SET_ISSUE_PROPERTY: verify via REST GET after click
- [ ] Token substitution: tokens resolve correctly in payloads
- [ ] Visibility conditions: buttons hidden when conditions not met
- [ ] Error handling: error flag shown on failure
- [ ] No double-submit: button disabled while action in-flight

## Production Deploy

- [ ] All staging smoke tests pass
- [ ] `develop` branch merged to `main`
- [ ] No force pushes to `main`

```shell
forge deploy --environment production
forge install --upgrade --environment production
forge usage   # verify quota post-deploy
```
