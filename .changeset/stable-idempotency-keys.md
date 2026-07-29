---
"@voyant-travel/sdk-core": minor
"@voyant-travel/cloud-sdk": minor
---

Let callers send an `Idempotency-Key`.

`VoyantRequestOptions.idempotencyKey` sets the header on any request, and
`client.email.sendMessage` takes it as a second argument. Several Cloud API
writes accept the header so a retried request delivers once rather than twice,
and the SDK previously had no way to supply one.

The key is never generated for you. A per-attempt value would only restate "do
not deduplicate" while looking like real idempotency, and hashing the request
body would be worse: two one-time-code emails to the same address differ only
by the code, so a body hash would turn a legitimate resend into a silent replay
of the first message.
