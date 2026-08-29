# NEXUS — Storage Schema Documentation

> Owner: Agent 1 (Storage & Schema)

## Storage Keys

| Key | Type | Description |
|-----|------|-------------|
| `smartactions:buttons` | `ButtonDef[]` | Global list of all configured smart action buttons |
| `smartactions:project:{id}` | `ProjectConfig` | Per-project button configuration and overrides |
| `smartactions:version` | `string` | Schema version for migration support |

## Interfaces

See `src/storage/schema.ts` for TypeScript definitions.

## Rules

- All storage access must go through `src/storage/client.ts`
- Never call `storage.get()` or `storage.set()` directly from components
- Always handle null returns with `?? []` or `?? {}`
- One `storage.get()` per component mount only — cache in state
