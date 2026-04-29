---
"@voyantjs/cloud-sdk": patch
---

Fix `TypeError: Illegal invocation` when calling the SDK from Cloudflare
Workers (workerd). The bundled `VoyantTransport` previously stored the
global `fetch` as a class property and invoked it via `this.fetchImpl(...)`,
which workerd rejects because `fetch` must be called with `globalThis` as
the receiver. The transport now binds `fetch` to `globalThis` at
construction time, so the documented happy-path snippets work on Workers
without consumers having to pass a wrapped `fetch`.
