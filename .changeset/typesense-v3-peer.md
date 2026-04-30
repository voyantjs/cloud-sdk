---
"@voyantjs/cloud-sdk": patch
---

Widen the optional `typesense` peer dependency from `^2.0.0` to `>=2.0.0 <4.0.0` so consumers can install either v2 or v3 (latest stable is `3.x`). The previous range forced downstream projects onto v2 even though the `createSearchClientConfig` output shape is unchanged between v2 and v3. The dev dependency is bumped to `^3.0.6` so we develop against the current stable release.
