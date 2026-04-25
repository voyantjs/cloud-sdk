# Overview

`cloud-sdk` publishes one public TypeScript package:

- `@voyantjs/cloud-sdk`

Shared transport and error handling stay in a private internal package so the
public SDK boundary stays clean.

## Package boundaries

- `@voyantjs/cloud-sdk` wraps Voyant Cloud APIs such as email, search, and vault.
- `@voyant-sdk/sdk-core` contains shared request plumbing only.
