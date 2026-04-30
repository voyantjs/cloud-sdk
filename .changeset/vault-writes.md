---
"@voyantjs/cloud-sdk": minor
---

Add `vault.setSecret(vaultSlug, key, value)` and
`vault.deleteSecret(vaultSlug, key)` to round out the Vault namespace
alongside the existing `getSecret` / `listSecrets` / `listVaults` methods.

Backed by the new `POST /vault/v1/:vaultSlug/secrets/:key` (upsert) and
`DELETE /vault/v1/:vaultSlug/secrets/:key` endpoints in voyant-cloud, gated
by the existing `vault:write` scope. Tokens minted with the `*` wildcard
scope (the default for `voyant login`) include both reads and writes.
